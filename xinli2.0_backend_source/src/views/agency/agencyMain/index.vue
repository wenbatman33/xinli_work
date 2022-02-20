<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      :dataSource="state.agencyGroupsList"
      @register="agencyGroupTable"
      :loading="loading"
    >
      <template #toolbar>
        <div class="flex items-center justify-end">
          <a-button type="primary" @click="handleAddAgencyModel">新增代理</a-button>
        </div>
        <div class="flex items-center justify-end">
          <a-button type="primary" @click="exportXlsx">汇出</a-button>
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
      <template #promotionLinks="{ record }">
        <span v-for="item in record.promotionLinks" :key="item">
          {{ item.promotionLink + ' ' }}
        </span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '編輯',
              onClick: () => handleActive(record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AddAgencyModel @register="AddAgencyModel" @reload="reloadEmit" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref, computed } from 'vue';
  import { Tag, DatePicker, TimePicker } from 'ant-design-vue';
  import type { FormProps } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import { getAgencyListTypeItem } from '/@/api/agency/model/agencyModel';
  import { getAgencyList } from '/@/api/agency/agency';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { searchSchemas } from './components/searchSchemas';
  import AddAgencyModel from './AddAgencyModel.vue';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { useModal } from '/@/components/Modal';
  import moment from 'moment';
  interface State {
    loading: boolean;
    searching: boolean;
    agencyGroupsList: any;
    agencyTypeList: getAgencyListTypeItem[];
  }
  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
      DatePicker,
      TimePicker,
      Tag,
      AddAgencyModel,
    },
    setup() {
      const loading = ref(false);
      const { hasPermission } = usePermission();
      const [AddAgencyModel, { openModal: openAddAgencyModel }] = useModal();
      const handleAddAgencyModel = () => openAddAgencyModel(true);
      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        agencyGroupsList: [],
        agencyTypeList: [],
      });
      const statusMapper = {
        1: '待審核',
        2: '同意',
        3: '拒絕',
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

      const exportXlsx = () => {
        jsonToSheetXlsx({
          data: state.agencyGroupsList,
          filename: '代理列表.xlsx',
          write2excelOpts: { bookType: 'xlsx' },
        });
      };
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

      function handleActive(record: Recordable) {
        // go('/member/detail/' + record.id);
        window.open('/agencyDetail/detail/' + record.id);
      }

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
        hasPermission,
        state,
        agencyGroupTable,
        handleActive,
        reloadEmit,
        loading,
        setFieldValue,
        convertMoment,
        statusMapper,
        statusColorMapper,
        exportXlsx,
        handleAddAgencyModel,
        AddAgencyModel,
      };
    },
  });
</script>
<style lang="less" scoped></style>
