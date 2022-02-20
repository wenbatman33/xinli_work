<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      :dataSource="state.agencyGroupsList"
      @register="agencyGroupTable"
      :loading="loading"
    >
      <template #form-applyTime="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.applicationStartTime])"
            @update:value="setFieldValue(schema.componentProps.applicationStartTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.applicationStartTime])"
            @update:value="setFieldValue(schema.componentProps.applicationStartTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.applicationEndTime])"
            @update:value="setFieldValue(schema.componentProps.applicationEndTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.applicationEndTime])"
            @update:value="setFieldValue(schema.componentProps.applicationEndTime, $event)"
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
      <template #auditStatus="{ record }">
        <Tag :color="statusColorMapper[record.auditStatus]">
          {{ statusMapper[record.auditStatus] }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="record.auditStatus == 1"
          :actions="[
            {
              label: '审核',
              onClick: () => handleAuditActive(record),
              ifShow: !hasPermission(['XXbtn_childAgency_audit']),
            },
            {
              label: '詳細',
              onClick: () => handleActive(record),
            },
          ]"
        />
        <TableAction
          v-if="record.auditStatus != 1"
          :actions="[
            {
              label: '詳細',
              onClick: () => handleActive(record),
            },
          ]"
        />
      </template>
    </BasicTable>

    <DetailModel @register="addDetailModel" @reload="reloadEmit" />
    <AuditModel @register="addAuditModel" @reload="reloadEmit" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref, computed } from 'vue';
  import { Tag, DatePicker, TimePicker } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import DetailModel from './components/DetailModel.vue';
  import AuditModel from './components/AuditModel.vue';
  import type { FormProps } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import { getAgencyListTypeItem } from '/@/api/agency/model/agencyModel';
  import { getAgencyList } from '/@/api/agency/childapplication';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { searchSchemas } from './components/searchSchemas';
  import moment from 'moment';
  interface State {
    loading: boolean;
    searching: boolean;
    agencyGroupsList: any;
    agencyTypeList: getAgencyListTypeItem[];
  }
  export default defineComponent({
    components: {
      DetailModel,
      AuditModel,
      PageWrapper,
      BasicTable,
      TableAction,
      DatePicker,
      TimePicker,
      Tag,
    },
    setup() {
      const [addDetailModel, { openModal: openDetailModel }] = useModal();
      const [addAuditModel, { openModal: openAuditModel }] = useModal();

      const loading = ref(false);
      const { hasPermission } = usePermission();
      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        agencyGroupsList: [],
        agencyTypeList: [],
      });
      const statusMapper = {
        1: '待审核',
        2: '同意',
        3: '拒绝',
      };
      const statusColorMapper = {
        1: 'yellow',
        2: 'green',
        3: 'red',
      };
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
      // Data table definition
      const [agencyGroupTable, { reload, getForm }] = useTable({
        api: async (args: Object) => {
          try {
            const query = Object.assign({}, args);
            Object.keys(query).forEach((key) => {
              if (query[key] === undefined || query[key] === '') {
                delete query[key];
              }
            });
            const response = await getAgencyList(query);
            //默认分层资料
            state.agencyGroupsList = response?.list || [];
            return response?.list || [];
          } catch (e) {
            // Exception handle by http utils
          } finally {
            // Revert loading state
            loading.value = false;
          }
        },
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
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
      });

      // Handle active button clicked
      const handleActive = (record: Recordable) =>
        openDetailModel(true, {
          record,
        });
      const handleAuditActive = (record: Recordable) =>
        openAuditModel(true, {
          record,
        });
      onMounted(() => {});

      const reloadEmit = () => {
        reload();
      };

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

      return {
        addDetailModel,
        addAuditModel,
        hasPermission,
        state,
        agencyGroupTable,
        handleActive,
        handleAuditActive,
        reloadEmit,
        loading,
        setFieldValue,
        convertMoment,
        statusMapper,
        statusColorMapper,
      };
    },
  });
</script>
<style lang="less" scoped></style>
