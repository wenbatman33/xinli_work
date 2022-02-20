<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Member report table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table toolbar start -->
      <template #toolbar>
        <div class="flex flex-row items-center">
          <a-button type="primary" @click="reload">手动更新</a-button>
          <a-button class="ml-2" type="primary" @click="handleExport">匯出報表</a-button>
        </div>
      </template>
      <!-- Table toolbar end -->

      <!-- Form reportDate template start -->
      <template #form-reportDate="{ values }">
        <div class="flex flex-row items-center">
          <DatePicker
            class="flex-grow"
            format="YYYY/MM/DD"
            :allowClear="false"
            :value="convertMoment(values['reportDateStart'])"
            @update:value="setFieldValue('reportDateStart', $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            class="flex-grow"
            format="YYYY/MM/DD"
            :allowClear="false"
            :value="convertMoment(values['reportDateEnd'])"
            @update:value="setFieldValue('reportDateEnd', $event)"
          />
        </div>
      </template>
      <!-- Form date template end -->

      <!-- Table member name column start -->
      <template #memberName="{ record }">
        <MemberReportMemberName :record="record" />
      </template>
      <!-- Table member name column end -->
    </BasicTable>
    <!-- Member report table end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { BasicTable, FormProps, useTable } from '/@/components/Table';
  import { getPayGroups } from '/@/api/payment/payGroup';
  import { getDepositMemberReport, postDepositMemberReport } from '/@/api/report/deposit';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { memberReportColumns } from './components/tableData';
  import { memberReportSchemas } from './components/formSchemas';
  import MemberReportMemberName from './components/MemberReportMemberName.vue';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /**
     * 报表最后更新时间
     */
    updatedAt: string;

    /**
     * 三方金流群組列表
     */
    payGroups: GetPayGroupsResponse[];

    /**
     * 銀行卡金流群組列表
     */
    bankcardGroups: GetPayGroupsResponse[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'SingleReachedReport',
    components: {
      PageWrapper,
      BasicTable,
      DatePicker,
      MemberReportMemberName,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        updatedAt: '',
        payGroups: [],
        bankcardGroups: [],
      });

      // Title
      const title = computed(() => {
        return `报表最后更新时间：${state.updatedAt}`;
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          schemas: memberReportSchemas(state.payGroups || [], state.bankcardGroups || []),
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        };
      });

      // Member report table definition
      const [registerTable, { reload, getForm, getDataSource }] = useTable({
        title,
        formConfig,
        showIndexColumn: true,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: memberReportColumns,
        pagination: {
          pageSize: 20,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        },
        api: async (arg) => {
          // Retrieve arguments
          const reportDateStart = moment(arg.reportDateStart).format('YYYY-MM-DD');
          const reportDateEnd = moment(arg.reportDateEnd).format('YYYY-MM-DD');
          const currency = arg.currency != Number.MIN_VALUE ? arg.currency : undefined;
          const pageSize = arg.pageSize > 0 ? arg.pageSize : 20;
          const paymentGroup = arg.paymentGroup != Number.MIN_VALUE ? arg.paymentGroup : undefined;
          const bankcardGroup =
            arg.bankcardGroup != Number.MIN_VALUE ? arg.bankcardGroup : undefined;

          // Post member report
          await postDepositMemberReport({
            reportDate: reportDateStart,
          });

          // Get member report
          const response = await getDepositMemberReport({
            reportDateStart,
            reportDateEnd,
            currency,
            pageSize,
            paymentGroup,
            bankcardGroup,
          });

          // Update date
          state.updatedAt = response?.updatedAt || '';

          // Return data list
          return response.list || [];
        },
      });

      // Convert string to moment
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

      // Set field value
      const setFieldValue = (field: string, value: any) => {
        const formattedStr = value.format('YYYY-MM-DD HH:mm:ss');
        getForm().setFieldsValue({ [`${field}`]: formattedStr });
      };

      // Handle export button clicked
      const handleExport = () => {
        jsonToSheetXlsx({
          data: getDataSource(),
          filename: '会员存款统计表.xlsx',
          write2excelOpts: { bookType: 'xlsx' },
        });
      };

      // On component mounted
      onMounted(() => {
        // Init pay groups
        getPayGroups({ type: 1 }).then((response: any) => {
          state.payGroups = response.list || [];
        });

        // Init bankcard groups
        getPayGroups({ type: 2 }).then((response: any) => {
          state.bankcardGroups = response.list || [];
        });
      });
      return {
        title,
        reload,
        handleExport,
        registerTable,
        convertMoment,
        setFieldValue,
      };
    },
  });
</script>
