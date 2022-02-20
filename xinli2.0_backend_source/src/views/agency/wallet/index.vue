<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      @register="agencyGroupTable"
    >
      <template #toolbar>
        <div class="flex items-center justify-end">
          <a-button type="primary" @click="handleAdjustModal">手动上下分</a-button>
        </div>
        <div class="flex items-center justify-end">
          <a-button type="primary" @click="exportXlsx">汇出 excel</a-button>
        </div>
      </template>

      <template #form-applyTime="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.applyStartTime])"
            @update:value="setFieldValue(schema.componentProps.applyStartTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.applyStartTime])"
            @update:value="setFieldValue(schema.componentProps.applyStartTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.applyEndTime])"
            @update:value="setFieldValue(schema.componentProps.applyEndTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.applyEndTime])"
            @update:value="setFieldValue(schema.componentProps.applyEndTime, $event)"
          />
        </div>
      </template>
      <template #form-reviewTime="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.reviewStartTime])"
            @update:value="setFieldValue(schema.componentProps.reviewStartTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.reviewStartTime])"
            @update:value="setFieldValue(schema.componentProps.reviewStartTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.reviewEndTime])"
            @update:value="setFieldValue(schema.componentProps.reviewEndTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.reviewEndTime])"
            @update:value="setFieldValue(schema.componentProps.reviewEndTime, $event)"
          />
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '审核',
              onClick: () => handleReviewModal(record),
              ifShow: record.status === 3,
            },
            {
              label: '详细',
              onClick: () => handleReviewModal(record, true),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AdjustModal @register="adjustModalregister" @success="reload"></AdjustModal>
    <ReviewModal @register="reviewModalregister" @success="reload"></ReviewModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import type { FormProps } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import { getList } from '/@/api/agency/wallet';
  import AdjustModal from './AdjustModal.vue';
  import { searchSchemas } from './components/searchSchemas';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { useModal } from '/@/components/Modal';
  import moment from 'moment';
  import ReviewModal from './ReviewModal.vue';

  const [adjustModalregister, { openModal: openAdjustModal }] = useModal();
  const [reviewModalregister, { openModal: openReviewModal }] = useModal();

  const formConfig = computed<FormProps>(() => {
    return {
      showResetButton: false,
      showAdvancedButton: false,
      schemas: searchSchemas(),
      baseColProps: {
        style: {
          padding: '0px 4px',
        },
      },
    };
  });

  const handleAdjustModal = () => {
    openAdjustModal(true);
  };

  const handleReviewModal = (record:any, readOnly:boolean = false) => {
    openReviewModal(true, {record, readOnly});
  };

  const exportXlsx = () => {
    jsonToSheetXlsx({
      data: getDataSource(),
      filename: '代理钱包管理.xlsx',
      write2excelOpts: { bookType: 'xlsx' },
    });
  };

  // Data table definition
  const [agencyGroupTable, { reload, getForm, getDataSource }] = useTable({
    api: getList,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    formConfig: formConfig,
    beforeFetch(searchForm) {
      let search = {};
      for (let key in searchForm) {
        if (searchForm[key] !== undefined) {
          Object.assign(search, { [key]: searchForm[key] });
        }
      }
      return search;
    },
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const setFieldValue = (field: string, value: any) => {
    if (!value) {
      getForm().setFieldsValue({ [`${field}`]: undefined });
      return;
    }
    let str = moment(new Date(value)).format('YYYY-MM-DD HH:mm');

    getForm().setFieldsValue({ [`${field}`]: str });
  };

  const convertMoment = (str?: string) => {
    if (str === '') {
      return undefined;
    }
    if (str === undefined) {
      return undefined;
    }
    try {
      return moment(str);
    } catch (e) {
      return undefined;
    }
  };
</script>
