<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增站内信</a-button>
      </template>
      <template #title="{ record }">
        <a href="#" @click.prevent="handleEdit(record)">{{ record.title }}</a>
      </template>
      <template #memberCount="{ record }">
        <a href="#" @click.prevent="openMemberModal(true, record)">{{ record.memberCount }}</a>
      </template>
      <template class="flex justify-between" #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '操作记录',
              onClick: () => alert('尚未开放'),
            },
          ]"
          :dropDownActions="[
            { 
              label: '回收', 
              popConfirm: {
                title: '是否确认回收?',
                confirm: handleCancel.bind(null, record),
              },
              ifShow: () => {
                return new Date(record.sendAt) > new Date();
              },
            },
            { label: record.status === '' ? '查看':'编辑', onClick: () => handleEdit(record) },
          ]"
        />
      </template>
    </BasicTable>
    <LetterModal @register="registerLetterModal" @success="reload"></LetterModal>
    <MemberModal @register="registerMemberModal"></MemberModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getInboxList, cancelLetter } from '/@/api/operator/inbox';
  import type { EditRecordRow } from '/@/components/Table';

  import { searchSchemas } from './components/searchSchemas';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import type { FormProps } from '/@/components/Form';
  import LetterModal from './components/LetterModal.vue';
  import MemberModal from './components/MemberModal.vue';

  // 新增公告
  const handleCreate = () => openLetterModal(true, { mode: 'Create' });
  // 編輯公告
  const handleEdit = (record: EditRecordRow) => {
    openLetterModal(true, { record, mode: 'Edit' });
  };

  const removeEmptyQuery = (queryObject: any) => {
    const query = queryObject;
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined || query[key] === '') {
        delete query[key];
      } else {
        query[key] = String(query[key]);
      }
    });
    return query;
  };

  const fetchData = async (obj) => {
    const query = removeEmptyQuery(Object.assign({}, obj));
    const data = await getInboxList(query);
    return data.list || [];
  };

  // Form config
  const formConfig = computed<FormProps>(() => {
    return {
      labelWidth: 70,
      showResetButton: false,
      showSubmitButton: true,
      autoSubmitOnEnter: true,
      autoAdvancedLine: 1,
      schemas: searchSchemas(),
    };
  });

  const [registerTable, { reload }] = useTable({
    api: fetchData,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    showTableSetting: true,
    formConfig: formConfig,
    bordered: true,
    handleSearchInfoFn: (info) => info,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });
  const [registerLetterModal, { openModal: openLetterModal }] = useModal();
  const [registerMemberModal, { openModal: openMemberModal }] = useModal();

  const handleCancel = (record) => {
    console.log(record);
    cancelLetter({ letterSettingId: record.letterSettingId }).then(() => {
      message.success('回收成功');
      reload();
    });
  }
</script>
