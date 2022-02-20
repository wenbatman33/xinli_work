<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="设定权限"
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
          ref="treeRef"
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

  export default defineComponent({
    name: 'RoleAuthDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      let allRoleFns: roleFnItem[] = [];
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
          const fnList = await getFnList({pageSize: 500});
          treeData.value = fnList.filter(item=>!item.fnKey.includes('__menu')) as any as TreeItem[];
        }
        // 可能會是空陣列所以給any
        allRoleFns = (await getRoleFns(data.record.roleID)).list;
        const roleFn:any[] = allRoleFns.filter(item=>!item.fnKey.includes('__menu')).map(fn=>fn.fnID);
        getTree().setCheckedKeys(roleFn);
        setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const sendFns: number[] = toRaw(values.menu).concat(allRoleFns.filter(item=>item.fnKey.includes('__menu')).map(fn=>fn.fnID));
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
      };
    },
  });
</script>
<style lang="scss" scoped>
::v-deep(.vben-basic-tree){
  .scrollbar__wrap{
    overflow: hidden;
  }
}
</style>