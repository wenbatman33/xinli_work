<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="bannerCategoryTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增广告类别</a-button>
      </template>
      <template class="flex justify-between" #action="{ record }">
        <TableAction
          :actions="[
            {
              label: record.hidden === true ? '不显示' : '显示',
              onClick: () => hiddenActions(record),
            },
            {
              label: '编辑',
              onClick: () => handleEdit(record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <CategoryModal @register="lockBankCardModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBannerCategory, putBannerCategory } from '/@/api/operator/banner';
  import type { EditRecordRow } from '/@/components/Table';

  import CategoryModal from './components/CategoryModal.vue';

  const [lockBankCardModal, { openModal: openCategoryModal }] = useModal();
  // 新增广告分类
  const handleCreate = () => {
    openCategoryModal(true, { mode: 'Create' });
  };
  const handleEdit = (record: EditRecordRow) => {
    openCategoryModal(true, { record, mode: 'Edit' });
  };
  const handleSuccess = () => {
    reload();
  };

  const hiddenActions = (record: EditRecordRow) => {
    const payload = {
      id: record.id,
      name: record.name,
      description: record.description,
      hidden: !record.hidden,
    };
    putBannerCategory(payload).then(() => {
      reload();
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
    const data = await getBannerCategory(query);
    return data.list || [];
  };

  const [bannerCategoryTable, { reload }] = useTable({
    api: fetchData,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    showTableSetting: true,
    formConfig: {
      showResetButton: false,
      showSubmitButton: false,
      autoSubmitOnEnter: false,
    },
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
</script>
