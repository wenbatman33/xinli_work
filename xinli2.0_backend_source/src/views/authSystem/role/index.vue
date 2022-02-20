<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar v-if="hasPermission(['btn_role_add'])">
        <a-button type="primary" @click="handleCreate"> 新增群组 </a-button>
      </template>
      <template #authList="{ record }">
        <a-button type="link" color="warning" @click="handleAuth(record)"> 权限列表 </a-button>
      </template>
      <template #menuList="{ record }">
        <a-button type="link" color="success" @click="handleMenu(record)"> 选单列表 </a-button>
      </template>
      <template #hasAuths="{ record }">
        <a-button type="link" @click="handleHasAuth(record)"> 检视帐号 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="RoleModal" @success="handleSuccess" />
    <RoleAccountModal @register="RoleAccountModal" />
    <RoleAuthDrawer @register="RoleAuthDrawer" @success="handleAuthSuccess" />
    <RoleMenuDrawer @register="RoleMenuDrawer" @success="handleMenuSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoles } from '/@/api/authSystem/system';

  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import RoleAccountModal from './RoleAccountModal.vue';
  import { useDrawer } from '/@/components/Drawer';
  import RoleAuthDrawer from './RoleAuthDrawer.vue';
  import RoleMenuDrawer from './RoleMenuDrawer.vue';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  import { columns, searchFormSchema } from './role.data';
  import { usePermissionStoreWithOut } from '/@/store/modules/permission';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'RoleManagement',
    components: { PageWrapper, BasicTable, RoleModal, RoleAccountModal, RoleAuthDrawer, RoleMenuDrawer , TableAction },
    setup() {
      const userStore = useUserStoreWithOut();
      const permissionStore = usePermissionStoreWithOut();
      const { hasPermission } = usePermission();
      const [RoleModal, { openModal: openRoleModal }] = useModal();
      const [RoleAccountModal, { openModal: openAccountModal }] = useModal();
      const [RoleAuthDrawer, { openDrawer: openRoleAuthDrawer }] = useDrawer();
      const [RoleMenuDrawer, { openDrawer: openRoleMenuDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getRoles,
        columns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        beforeFetch(searchForm) {
          let search = {};
          searchForm.pageSize = 1000;
          for(let key in searchForm){
            if (searchForm[key] !== undefined){
              Object.assign(search, {[key]: searchForm[key]});
            }
          }
          return search;
        },
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openRoleModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openRoleModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }
      
      function handleAuthSuccess() {
        reload();
        userStore.getUserInfoAction();
      }

      function handleMenuSuccess() {
        reload();
        userStore.getUserInfoAction();
        permissionStore.buildRoutesAction();
      }

      function handleAuth(record: Recordable) {
        openRoleAuthDrawer(true, {
          record,
        });
      }
      function handleMenu(record: Recordable) {
        openRoleMenuDrawer(true, {
          record,
        });
      }
      function handleHasAuth(record: Recordable) {
        openAccountModal(true, {
          record,
          isUpdate: true,
        })
      }

      return {
        hasPermission,
        registerTable,
        RoleModal,
        RoleAccountModal,
        RoleAuthDrawer,
        RoleMenuDrawer,
        handleCreate,
        handleEdit,
        handleSuccess,
        handleAuthSuccess,
        handleMenuSuccess,
        handleAuth,
        handleMenu,
        handleHasAuth,
      };
    },
  });
</script>
