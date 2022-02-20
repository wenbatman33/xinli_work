<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="设定选单"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'fnName', key: 'fnID' }"
          checkable
          toolbar
          checkStrictly 
          ref="treeRef"
          @check="checkTree"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, toRaw } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { authFormSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';

  import { getFnList, getRoleFns, setRoleFns } from '/@/api/authSystem/system';
  import { roleFnItem } from '/@/api/authSystem/model/systemModel';
  import { remove } from 'lodash-es';

  export default defineComponent({
    name: 'RoleMenuDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      let allRoleFns: roleFnItem[] = [];
      let fnList:any = [];
      
      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: authFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          fnList = (await getFnList({pageSize: 500})).filter(item=>item.fnKey.includes('__menu'));
          treeData.value = fnList as any as TreeItem[];
        }
        // 可能會是空陣列所以給any
        allRoleFns = (await getRoleFns(data.record.roleID)).list;
        const menuFn:any[] = allRoleFns.filter(item=>item.fnKey.includes('__menu')).map(fn=>fn.fnID);
        // const parents: number[] = fnList.filter(fn=>fn.children.length > 0).map(fn=>fn.fnID);
        // remove(menuFn, (fn:number)=>{
        //   return parents.includes(fn);
        // });
        getTree().setCheckedKeys(menuFn);
        getTree().expandAll(true);
        setFieldsValue({
          ...data.record,
        });
      });

      function checkTree(key, e){
        const target = e.node;
        const children = target.children.map(child=>child.key);
        let checkedKeys: number[] = getTree().getCheckedKeys().checked;
        if (target.checked === true){
          //執行event時checked狀態還沒被修改，所以邏輯要反過來
          remove(checkedKeys, (fn:number)=>{
            return children.includes(fn);
          });
          getTree().setCheckedKeys(checkedKeys);
        }else{
          checkedKeys = [...new Set(checkedKeys.concat(children))];
          getTree().setCheckedKeys(checkedKeys);
        }
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          // 取得原始Fn結構，將Fn扁平化後整理出選中Fn的parentID
          // let parents: number[] = [];
          // const flatFns = fnList.map(item=>item.children).flat();
          // values.menu.forEach(menu => {
          //   flatFns.forEach(fn =>{
          //     if (menu === fn.fnID){
          //       parents.push(fn.parentID);
          //     }
          //   })
          // });
          // Unique化、原始選中清單concat(選中的parentID)concat(非選單的權限)
          // const sendFns: number[] = Array.from(new Set(toRaw(values.menu).concat(parents).concat(allRoleFns.filter(item=>!item.fnKey.includes('__menu')).map(fn=>fn.fnID))));
          
          // checkStrictly為true的時候，menu會分成checked跟halfchecked，未作調整時則無
          const sendFns: number[] = toRaw(values.menu.checked ? values.menu.checked : values.menu).concat(allRoleFns.filter(item=>!item.fnKey.includes('__menu')).map(fn=>fn.fnID));
          // console.log(sendFns)
          const params = {
            roleID: parseInt(values.roleID, 10),
            fnIDs: sendFns
          }
          await setRoleFns(params);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        treeRef,
        treeData,
        checkTree
      };
    },
  });
</script>
<style lang="scss" scoped>
::v-deep(.vben-basic-tree){
  .scrollbar__wrap{
    overflow: hidden;
  }
  .scrollbar__bar{
    display: none;
  }
}
</style>