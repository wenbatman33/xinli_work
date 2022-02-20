<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button @click="handleCreateGroup"> 新增域名群组 </a-button>
        <a-button type="primary" @click="handleCreateDomain"> 新增域名 </a-button>
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
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <GroupModal @register="registerModal" @success="handleSuccess" />
    <DomainModal @register="DomainModal" @success="handleSuccess" />
    <DeleteModal @register="DeleteModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, nextTick, toRaw } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDomains } from '/@/api/systemManage/systemManage';

  import { useModal } from '/@/components/Modal';
  import GroupModal from './GroupModal.vue';
  import DomainModal from './DomainModal.vue';
  import DeleteModal from './DeleteModal.vue';

  import { columns } from './data';

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, PageWrapper, GroupModal, TableAction, DomainModal, DeleteModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [DomainModal, { openModal: openDomainModal }] = useModal();
      const [DeleteModal, { openModal: openDeleteModal }] = useModal();
      const [registerTable, { reload, expandAll, getDataSource }] = useTable({
        title: '',
        api: getDomains,
        columns,
        pagination: false,
        isTreeTable: true,
        striped: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreateGroup() {
        openModal(true, {
          isUpdate: false,
        });
      }
      function handleCreateDomain() {
        openDomainModal(true, {
          groupList: toRaw(getDataSource()).map(item => {
            return {
              key: item.id,
              label: item.name,
              value: item.id,
            };
          }),
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        if (record.groupID){
          openDomainModal(true, {
          groupList: toRaw(getDataSource()).map(item => {
            return {
              key: item.id,
              label: item.name,
              value: item.id,
            };
          }),
          record,
          isUpdate: true,
        });
        }else{
          openModal(true, {
            record,
            isUpdate: true,
          });
        }    
      }

      function handleDelete(record: Recordable) {
        openDeleteModal(true, {
          record,
          deleteGroup: record.groupID ? false : true,
        });
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
        DomainModal,
        DeleteModal,
        handleCreateGroup,
        handleCreateDomain,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
