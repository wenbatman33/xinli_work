<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="bannerCategoryTable" @edit-end="handleEditEnd">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增公告</a-button>
      </template>
      <template class="flex justify-between" #action="{ record }">
        <TableAction
          :actions="[
            {
              label: record.hidden === true ? '显示' : '不显示',
              onClick: () => hiddenActions(record),
            },
          ]"
          :dropDownActions="[
            { label: '编辑', onClick: () => handleEdit(record) },
            { label: '删除', onClick: () => handleDelete(record) },
          ]"
        />
      </template>
    </BasicTable>
    <AnnounceModal @register="announceModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, createVNode } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import type { FormProps } from '/@/components/Form';
  import { tableColumns } from './components/tableData';
  import type { EditRecordRow } from '/@/components/Table';

  import { searchSchemas } from './components/searchSchemas';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getAnnouncement,
    deleteAnnouncement,
    putAnnouncement,
  } from '/@/api/operator/announcement';
  import AnnounceModal from './components/AnnounceModal.vue';

  // 新增公告
  const handleCreate = () => openAnnouncemModal(true, { mode: 'Create' });
  // 編輯公告
  const handleEdit = (record: EditRecordRow) => {
    openAnnouncemModal(true, { record, mode: 'Edit' });
  };
  const handleSuccess = () => reload();
  // 删除公告
  const handleDelete = (record: EditRecordRow) => showConfirm(record);

  const hiddenActions = (record: EditRecordRow) => {
    const payload = {
      id: record.id,
      sort: record.sort,
      top: record.top,
      title: record.title,
      start: record.start,
      context: record.context,
      hidden: !record.hidden,
    };
    putAnnouncement(payload).then(() => reload());
  };
  const handleEditEnd = (row: EditRecordRow) => {
    const payload = {
      id: row.record.id,
      sort: Number(row.record.sort),
      top: row.record.top,
      title: row.record.title,
      start: row.record.start,
      context: row.record.context,
      hidden: row.record.hidden,
    };
    putAnnouncement(payload).then(() => reload());
  };

  const showConfirm = (record: EditRecordRow) => {
    Modal.confirm({
      title: '确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        deleteAnnouncement({ id: record.id }).then(() => {
          message.success('删除成功');
          reload();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
    const data = await getAnnouncement(query);
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

  const [bannerCategoryTable, { reload }] = useTable({
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
  const [announceModal, { openModal: openAnnouncemModal }] = useModal();
</script>
