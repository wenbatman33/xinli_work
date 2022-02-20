<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Single reached report table start -->
    <BasicTable size="small" @register="registerTable" @edit-end="handleEditEnd">
      <!-- Table toolbar start -->
      <template #toolbar>
        <div class="flex flex-row items-center">
          <span class="px-4">{{ title }}</span>
          <a-button type="primary" @click="reload">手动更新</a-button>
          <a-button class="ml-2" type="primary" @click="handleExport">匯出報表</a-button>
        </div>
      </template>
      <!-- Table toolbar end -->

      <!-- Table Report hour title start -->
      <template #reportHourTitle>
        <span>
          时
          <BasicHelp class="ml-2" text="每小时进行统计，显示为结束时间点，往前统计一小时" />
        </span>
      </template>
      <!-- Table Report hour title end -->

      <!-- Table Amount title start -->
      <template #amountTitle>
        <span>
          订单金额
          <BasicHelp class="ml-2" text="完成的存款单包含USDT以人民币记录显示" />
        </span>
      </template>
      <!-- Table Amount title end -->
    </BasicTable>
    <!-- Single reached report table end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { BasicHelp } from '/@/components/Basic';
  import { PageWrapper } from '/@/components/Page';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { BasicTable, useTable } from '/@/components/Table';
  import { singleReachedRepportColumns } from './components/tableData';
  import { singleReachedReportSchemas } from './components/formSchemas';
  import {
    postChannelDepositReport,
    getChannelSingleChannelDepositReport,
    putChannelSingleChannelDepositNote,
  } from '/@/api/report/channel';
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
     * 總订单金额
     */
    totalAmount: number;

    /**
     * 總笔数
     */
    totalDepositNum: number;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'SingleReachedReport',
    components: {
      PageWrapper,
      BasicHelp,
      BasicTable,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        updatedAt: '',
        totalAmount: 0,
        totalDepositNum: 0,
      });

      // Title
      const title = computed(() => {
        return `报表最后更新时间：${state.updatedAt}`;
      });

      // Finance table definition
      const [registerTable, { reload, getDataSource }] = useTable({
        showSummary: true,
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: singleReachedRepportColumns,
        pagination: {
          pageSize: 9999,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        },
        formConfig: {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          autoAdvancedLine: 1,
          schemas: singleReachedReportSchemas,
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        },
        summaryFunc: () => {
          return [
            {
              reportDate: '合计',
              reportHour: '-',
              amount: state.totalAmount?.toLocaleString() || 0,
              depositNum: state.totalDepositNum?.toLocaleString() || 0,
              note: '-',
            },
          ];
        },
        api: async (arg) => {
          // Retrieve arguments
          const reportDateStart = moment(arg.reportDateStart).format('YYYY-MM-DD');
          const reportDateEnd = moment(arg.reportDateEnd).format('YYYY-MM-DD');
          const reportHourStart = moment(arg.reportDateEnd).format('HH');
          const reportHourEnd = moment(arg.reportDateEnd).format('HH');
          const payChannelServiceID = arg.payChannelServiceID;

          // Post calculation
          await postChannelDepositReport({
            reportDate: reportDateStart,
            reportHour: reportHourStart,
          });

          // Get report
          const response = await getChannelSingleChannelDepositReport({
            reportDateStart,
            reportDateEnd,
            reportHourStart,
            reportHourEnd,
            payChannelServiceID,
          });

          // Update statistics info
          state.totalDepositNum = response?.totalDepositNum || 0;
          state.totalAmount = response?.totalAmount || 0;
          state.updatedAt = response?.updatedAt || '';

          // Return report list
          return response.list || [];
        },
      });

      // Handle table column edit end
      const handleEditEnd = ({ record, value }: Recordable) => {
        putChannelSingleChannelDepositNote({
          id: record.id || '',
          note: value || '',
        });
      };

      // Handle export button clicked
      const handleExport = () => {
        jsonToSheetXlsx({
          data: getDataSource(),
          filename: '单一线路进款表.xlsx',
          write2excelOpts: { bookType: 'xlsx' },
        });
      };
      return {
        state,
        title,
        reload,
        handleEditEnd,
        handleExport,
        registerTable,
      };
    },
  });
</script>
