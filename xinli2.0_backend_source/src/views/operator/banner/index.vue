<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="bannerCategoryTable" @edit-end="handleEditEnd">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增广告</a-button>
      </template>
      <template class="flex justify-between" #action="{ record }">
        <TableAction
          :actions="[
            {
              label: record.hidden === true ? '显示' : '隐藏',
              onClick: () => hiddenActions(record),
            },
          ]"
          :dropDownActions="[
            { label: '编辑', onClick: () => handleEdit(record) },
            { label: '删除', onClick: () => handleDelete(record) },
          ]"
        />
      </template>

      <template #bannerCategoryID="{ record }">
        <p>{{ filterAllCategory(record.bannerCategoryID) }}</p>
      </template>

      <template #statusStr="{ record }">
        <p :style="record.statusStr === '上架中' ? { color: '#01A39D' } : { color: '#D0C9D6' }">{{
          record.statusStr
        }}</p>
      </template>

      <template #imageWeb="{ record }">
        <div
          class="flex items-center justify-center overflow-hidden rounded"
          style="width: 100px; height: 100px"
        >
          <Image
            v-if="record.imageWeb"
            style="width: 100%; border-radius: 4px"
            :src="imagePath + record.imageWeb"
            :fallback="errorImg"
          />
          <span v-else>--</span>
        </div>
      </template>

      <template #imageH5="{ record }">
        <div
          class="flex items-center justify-center overflow-hidden"
          style="width: 100px; height: 100px"
        >
          <Image
            v-if="record.imageH5"
            style="width: 100%; border-radius: 4px"
            :src="imagePath + record.imageH5"
            :fallback="errorImg"
          />
          <span v-else>--</span>
        </div>
      </template>
    </BasicTable>
    <BannerModal
      :allCategory="state.allCategory"
      :dropdown="promotionDropdownRes.device"
      @register="bannerModal"
      @success="handleSuccess"
    />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, nextTick, createVNode } from 'vue';
  import { message, Modal, Image } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import BannerModal from './components/BannerModal.vue';
  import { useModal } from '/@/components/Modal';
  import { tableColumns } from './components/tableData';
  import { getBanner, getBannerCategoryDropdown } from '/@/api/operator/banner';
  import type { FormProps } from '/@/components/Form';
  import type { EditRecordRow } from '/@/components/Table';
  import type { BannerCategoryItem } from '/@/api/operator/model/bannerModel';

  import { putBanner, deleteBanner } from '/@/api/operator/banner';
  import { searchSchemas } from './components/searchSchemas';

  import { useGlobSetting } from '/@/hooks/setting';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { getPromotionDropdown } from '/@/api/promotion/list';

  import type { DropdownItem } from '/@/api/promotion/model/listModel';

  const imagePath = useGlobSetting().apiUrl + '/file/';

  const state = reactive({
    allCategory: [] as BannerCategoryItem[],
  });
  const [bannerModal, { openModal: openBannerModal }] = useModal();
  // 新增广告
  const handleCreate = () => openBannerModal(true, { mode: 'Create' });
  // 编辑广告
  const handleEdit = (record: EditRecordRow) => {
    openBannerModal(true, { record, mode: 'Edit' });
  };
  const handleSuccess = () => reload();

  const handleDelete = (record: EditRecordRow) => showConfirm(record);

  const showConfirm = (record: EditRecordRow) => {
    Modal.confirm({
      title: '确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        deleteBanner({ id: record.id }).then(() => {
          message.success('删除成功');
          reload();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const filterAllCategory = (id: number) => {
    const res = state.allCategory.filter((item) => item.bannerCategoryID === id);
    return res.length > 0 ? res[0].name : '';
  };
  const hiddenActions = (record: EditRecordRow) => {
    const payload = {
      id: record.id,
      bannerCategoryID: record.bannerCategoryID,
      description: record.description,
      title: record.title,
      start: record.start,
      hidden: !record.hidden,
    };
    putBanner(payload).then(() => reload());
  };
  const handleEditEnd = (row: EditRecordRow) => {
    const payload = {
      id: row.record.id,
      bannerCategoryID: row.record.bannerCategoryID,
      description: row.record.description,
      title: row.record.title,
      start: row.record.start,
      hidden: row.record.hidden,
      sort: Number(row.record.sort),
    };
    putBanner(payload).then(() => reload());
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
  const promotionDropdownRes = reactive({
    device: [] as DropdownItem[],
  });
  const fetchDropdownData = async () => {
    const dropdownRes = await getPromotionDropdown();
    promotionDropdownRes.device = dropdownRes.device || [];
  };
  const fetchData = async (obj) => {
    const query = removeEmptyQuery(Object.assign({}, obj));
    const data = await getBanner(query);
    await fetchDropdownData();
    return data.list || [];
  };

  // Form config
  const formConfig = computed<FormProps>(() => {
    const { allCategory } = state;
    const { device } = promotionDropdownRes;
    return {
      labelWidth: 70,
      showResetButton: false,
      showSubmitButton: true,
      autoSubmitOnEnter: true,
      autoAdvancedLine: 1,
      schemas: searchSchemas(allCategory, device),
    };
  });

  const [bannerCategoryTable, { reload, redoHeight }] = useTable({
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
  const getCategory = async () => {
    const { list } = await getBannerCategoryDropdown();
    state.allCategory = list;
  };
  nextTick(() => {
    redoHeight();
  });
  onMounted(() => {
    getCategory();
  });
  const errorImg =
    'data:image/png;base64,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';
</script>
