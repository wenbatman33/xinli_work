<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增使用者</a-button>
        <a-button type="primary" @click="editMyPW">修改自身密码</a-button>
      </template>
      <template #roles="{ record }">
        {{ record.roles.map(item=>item.roleName).toString() }}
      </template>
      <template #dept="{ record }">
        <Tag color="green">
          {{ deptNameList[record.deptID] }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '修改密码',
              onClick: handlePasswordEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <PasswordModal @register="passwordModal" />
    <MyPasswordModal @register="myPasswordModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, computed } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, getDeptList, getRoles } from '/@/api/authSystem/system';
  import { PageWrapper } from '/@/components/Page';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import PasswordModal from './PasswordModal.vue';
  import MyPasswordModal from './MyPasswordModal.vue';
  import type { FormProps } from '/@/components/Form';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { DeptParams } from '/@/api/authSystem/model/systemModel';

  interface State {
    depts: DeptParams[],
    fnGroups: [],
  }

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, Tag, PageWrapper, AccountModal, TableAction, PasswordModal, MyPasswordModal},
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const [passwordModal, { openModal: openPasswordModal }] = useModal();
      const [myPasswordModal, { openModal: openMyPasswordModal }] = useModal();
      const selectItems = reactive<State>({
        depts: [],
        fnGroups: [],
      });

      onMounted(() => {
        getDeptList().then(res=>{ 
          selectItems.depts = res.list || [];
        });
        getRoles({}).then(res=>{
          selectItems.fnGroups = res.list || [];
        })
      })

      const deptNameList = computed(()=>{
        return [''].concat(selectItems.depts.map(dept=>dept.deptName));
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        const { fnGroups, depts } = selectItems;
        return {
          labelWidth: 80,
          schemas: searchFormSchema(fnGroups, depts),
          autoSubmitOnEnter: true,
        };
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        api: getAccountList,
        rowKey: 'adminID',
        columns,
        formConfig: formConfig,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        beforeFetch(searchForm) {
          let search = {};
          searchForm.pageSize = 1000;
          searchForm.roleID = searchForm.roles;
          for(let key in searchForm){
            if (searchForm[key] !== undefined && searchForm[key] !== '') {
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          return search;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
          selectItems,
        });
      }

      function editMyPW(){
        openMyPasswordModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          selectItems,
        });
      }

      function handlePasswordEdit(record: Recordable) {
        openPasswordModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          // const result = updateTableDataRecord(values.id, values);
          // console.log(result);
          reload();
        } else {
          reload();
        }
      }

      function handleView(record: Recordable) {
        go('/authSystem/account_detail/' + record.id);
      }

      return {
        registerTable,
        registerModal,
        passwordModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleView,
        handlePasswordEdit,
        deptNameList,
        editMyPW,
        myPasswordModal
      };
    },
  });
</script>
