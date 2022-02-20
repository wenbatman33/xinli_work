<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
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
    <LetterModal @register="registerLetterModal" @success="reload"></LetterModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getInboxSetting } from '/@/api/operator/inbox';
  import { useModal } from '/@/components/Modal';
  import LetterModal from './LetterModal.vue';

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '200px',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updatedAt',
      width: '180px',
      sorter: (a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      },
    },
    {
      title: '最后执行人',
      dataIndex: 'updatedUser',
      width: '120px',
    },
  ]
  const [registerTable, { reload }] = useTable({
    api: getInboxSetting,
    columns,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const [registerLetterModal, { openModal: openLetterModal }] = useModal();

  const handleEdit = (record) => {
    openLetterModal(true, record);
  };

</script>
