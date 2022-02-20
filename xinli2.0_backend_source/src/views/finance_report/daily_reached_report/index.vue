<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Daily reached report table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table toolbar start -->
      <template #toolbar>
        <div class="flex flex-row items-center">
          <span class="px-4">{{ title }}</span>
          <a-button type="primary" @click="reload">手动更新</a-button>
          <a-button class="ml-2" type="primary" @click="handleExport">匯出報表</a-button>
        </div>
      </template>
      <!-- Table toolbar end -->
    </BasicTable>
    <!-- Daily reached report table end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { BasicTable, FormProps, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { getServiceDropdown } from '/@/api/payment/payChannelService';
  import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
  import { postChannelDepositReport, getChannelDepositReport } from '/@/api/report/channel';
  import { dailyReachedRepportColumns } from './components/tableData';
  import { dailyReachedReportSchemas } from './components/formSchemas';
  import moment from 'moment';

  /**
   * 線路統計資訊
   */
  interface ChannelStatistics {
    /**
     * 名稱
     */
    name?: string;

    /**
     * Item key
     */
    key: number;

    /**
     * 金額
     */
    amount: number;

    /**
     * 數量
     */
    count: number;
  }

  /**
   * Component state interface
   */
  interface State {
    /**
     * 报表最后更新时间
     */
    updatedAt: string;

    /**
     * 支付方式列表
     */
    serviceCode: DropdownItem[];

    /**
     * 線路統計列表
     */
    channelStatisticsList: ChannelStatistics[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DailyReachedReport',
    components: {
      PageWrapper,
      BasicTable,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        updatedAt: '',
        serviceCode: [],
        channelStatisticsList: [],
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
          schemas: dailyReachedReportSchemas(state.serviceCode),
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        };
      });

      // Finance table definition
      const [registerTable, { reload, getDataSource, setColumns }] = useTable({
        formConfig,
        showSummary: true,
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: dailyReachedRepportColumns,
        pagination: {
          pageSize: 9999,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        },
        summaryFunc: () => {
          const summary = {
            date: '合计',
            time: '-',
          };
          state.channelStatisticsList?.forEach((element) => {
            summary[`${element.name}_amount`] = element.amount?.toLocaleString() || 0;
            summary[`${element.name}_count`] = element.count?.toLocaleString() || 0;
          });
          return [summary];
        },
        api: async (arg) => {
          // Retrieve arguments
          const reportDateStart = moment(arg.reportDateStart).format('YYYY-MM-DD');
          const reportDateEnd = moment(arg.reportDateEnd).format('YYYY-MM-DD');
          const reportHourStart = moment(arg.reportDateEnd).format('HH');
          const reportHourEnd = moment(arg.reportDateEnd).format('HH');
          const payChannelServiceID = arg.payChannelServiceID;
          const serviceCode = arg.serviceCode;

          // Post calculation
          await postChannelDepositReport({
            reportDate: reportDateStart,
            reportHour: reportHourStart,
          });

          // Get report
          const response = await getChannelDepositReport({
            reportDateStart,
            reportDateEnd,
            reportHourStart,
            reportHourEnd,
            payChannelServiceID,
            serviceCode,
          });

          // Compute channel list
          let channelObject = response?.channels || {};
          let channelList: string[] = [];
          channelList = channelList.concat(Object.values(channelObject));
          channelList = channelList.concat('TOTAL');

          // Update table columns
          let newColumns: BasicColumn[] = [];
          newColumns = newColumns.concat(dailyReachedRepportColumns);
          for (let i = 0; i < channelList.length; i++) {
            const channelName = channelList[i];
            newColumns = newColumns.concat({
              title: channelName,
              dataIndex: channelName,
              children: [
                {
                  title: `订单金额`,
                  dataIndex: `${channelName}_amount`,
                },
                {
                  title: `笔数`,
                  dataIndex: `${channelName}_count`,
                },
              ],
            });
          }
          await setColumns(newColumns);

          // Compute statistics info
          let channelStatisticsList: ChannelStatistics[] = [];
          for (let i = 0; i < channelList.length; i++) {
            channelStatisticsList[i] = {
              name: channelList[i],
              key: i,
              amount: 0,
              count: 0,
            };
          }

          const reportObject = response?.list || {};
          const reportList = Object.values(reportObject);
          for (let i = 0; i < reportList.length; i++) {
            const report: any = reportList[i];
            for (let j = 0; j < channelStatisticsList.length; j++) {
              const channelStatistics = channelStatisticsList[j];
              if (channelStatistics) {
                const channelName = channelStatistics.name || '';
                let channelAmount = 0;
                try {
                  channelAmount = Number(report[`${channelName}_amount`]) || 0;
                  report[`${channelName}_amount`] = channelAmount.toLocaleString();
                } catch (e) {
                  channelAmount = 0;
                }
                let channelCount = 0;
                try {
                  channelCount = Number(report[`${channelName}_count`]) || 0;
                  report[`${channelName}_count`] = channelCount.toLocaleString();
                } catch (e) {
                  channelCount = 0;
                }
                channelStatistics.amount += channelAmount;
                channelStatistics.count += channelCount;
              }
            }
          }

          state.channelStatisticsList = channelStatisticsList;

          // Update time
          state.updatedAt = response?.updatedAt || '';

          // Return report list
          return reportList;
        },
      });

      // Handle export button clicked
      const handleExport = () => {
        jsonToSheetXlsx({
          data: getDataSource(),
          filename: '每日进帐统计.xlsx',
          write2excelOpts: { bookType: 'xlsx' },
        });
      };

      // On component mounted
      onMounted(() => {
        // Init methods
        getServiceDropdown().then((response) => {
          state.serviceCode = response.serviceCode || [];
        });
      });
      return {
        state,
        title,
        reload,
        handleExport,
        registerTable,
      };
    },
  });
</script>
