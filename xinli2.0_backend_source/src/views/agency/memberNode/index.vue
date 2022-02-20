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
          <a-button type="primary" @click="handlememberNodeModel">設定會員轉線</a-button>
        </div>
        <div class="flex items-center justify-end">
          <a-button type="primary" @click="exportXlsx">汇出 excel</a-button>
        </div>
      </template>

      <template #form-Time="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.startTime])"
            @update:value="setFieldValue(schema.componentProps.startTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.startTime])"
            @update:value="setFieldValue(schema.componentProps.startTime, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.endTime])"
            @update:value="setFieldValue(schema.componentProps.endTime, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.endTime])"
            @update:value="setFieldValue(schema.componentProps.endTime, $event)"
          />
        </div>
      </template>
    </BasicTable>
    <memberNodeModel @register="memberNodeModel" @reload="reloadEmit" />
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
  import { getAgencyNodeList } from '/@/api/agency/agency';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { searchSchemas } from './components/searchSchemas';
  import memberNodeModel from './memberNodeModel.vue';
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
      DatePicker,
      TimePicker,
      memberNodeModel,
    },
    setup() {
      const loading = ref(false);
      const { hasPermission } = usePermission();
      const [memberNodeModel, { openModal: openmemberNodeModel }] = useModal();
      const handlememberNodeModel = () => openmemberNodeModel(true);
      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        agencyGroupsList: [],
        agencyTypeList: [],
      });

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
            const response = await getAgencyNodeList(query);
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
        exportXlsx,
        handlememberNodeModel,
        memberNodeModel,
      };
    },
  });
</script>
<style lang="less" scoped></style>
