<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增权限 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AuthModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, nextTick, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getFnList, deleteFn } from '/@/api/authSystem/system';

  import { useModal } from '/@/components/Modal';
  import AuthModal from './AuthModal.vue';

  import { columns, searchFormSchema } from './auth.data';

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, PageWrapper, AuthModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, expandAll }] = useTable({
        title: '',
        api: getFnList,
        columns,
        pagination: false,
        isTreeTable: true,
        striped: true,
        useSearchForm: true,
        searchInfo: searchInfo,
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
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        titleHelpMessage: '选单的权限key 一律以 __menu 开头',
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteFn(record.fnID).then(()=>{
          reload();
        })
      }

      function handleSuccess() {
        reload();
      }
      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
