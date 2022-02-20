<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Withdrawal table start -->
    <div ref="tableDom">
      <BasicTable size="small" @register="registerTable">
        <!-- Table toolbar start -->
        <template #toolbar>
          <div class="flex flex-row items-center">
            <span class="px-4">{{ title }}</span>
            <a-button type="primary" @click="handleExport">汇出</a-button>
          </div>
        </template>
        <!-- Table toolbar end -->

        <template #form-dateType="{ field, values }">
          <Select :value="values[field]" @change="dateTypeChange">
            <Option :value="1">日報</Option>
            <Option :value="2">週報</Option>
            <Option :value="3">月報</Option>
          </Select>
        </template>
        <!-- Report date from template start -->
        <template #form-reportDate="{ values }">
          <div class="flex flex-row items-center">
            <div class="datePicker" v-if="state.dateType === 1">
              <DatePicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateStart'])"
                @update:value="setFieldValue('reportDateStart', $event)"
              />
              <span class="flex-shrink-0 px-4">～</span>
              <DatePicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateEnd'])"
                @update:value="setFieldValue('reportDateEnd', $event)"
              />
            </div>

            <div class="weekPicker" v-if="state.dateType === 2">
              <WeekPicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateStart'])"
                @update:value="setFieldValue('reportDateStart', $event)"
              />
              <span class="flex-shrink-0 px-4">～</span>
              <WeekPicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateEnd'])"
                @update:value="setFieldValue('reportDateEnd', $event)"
              />
            </div>
            
            <div class="monthPicker" v-if="state.dateType === 3">
              <MonthPicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateStart'])"
                @update:value="setFieldValue('reportDateStart', $event)"
              />
              <span class="flex-shrink-0 px-4">～</span>
              <MonthPicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values['reportDateEnd'])"
                @update:value="setFieldValue('reportDateEnd', $event)"
              />
            </div>
          </div>
        </template>
        <!-- Report date from template end -->
      </BasicTable>
    </div>
    <!-- Withdrawal table end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { DatePicker, Select } from 'ant-design-vue';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import {
    withdrawPeopleRepportColumns,
    withdrawAmountRangeRepportColumns,
  } from './components/tableData';
  import { withdrawalSchemas } from './components/formSchemas';
  import {
    getWithdrawPeopleReport,
    getWithdrawPeopleWeekReport,
    getWithdrawPeopleMonthReport,
    getWithdrawAmountRangeReport,
    getWithdrawAmountRangeWeekReport,
    getWithdrawAmountRangeMonthReport,
    postWithdrawPeopleReport,
    postWithdrawPeopleWeekReport,
    postWithdrawPeopleMonthReport,
    postWithdrawAmountRangeReport,
    postWithdrawAmountRangeWeekReport,
    postWithdrawAmountRangeMonthReport,
  } from '/@/api/report/withdraw';
  import {
    WithdrawPeopleReportItem,
    WithdrawAmountRangeReportItem,
    GetWithdrawReportParams,
    GetWithdrawPeopleReportResultModel,
    GetWithdrawAmountRangeReportResultModel,
    PostWithdrawReportData,
  } from '/@/api/report/model/withdrawModel';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /**
     * 最後更新時間
     */
    updatedAt?: string;

    /**
     * 報表類型
     */
    reportType: string;

    /**
     * 人數存款報表資訊
     */
    peopleReportData?: GetWithdrawPeopleReportResultModel;

    /**
     * 金額區間存款報表資訊
     */
    amountRangeReportData?: GetWithdrawAmountRangeReportResultModel;

    dateType: number;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'WithdrawReport',
    components: {
      PageWrapper,
      BasicTable,
      DatePicker,
      WeekPicker: DatePicker.WeekPicker,
      MonthPicker: DatePicker.MonthPicker,
      Select,
      Option: Select.Option,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        updatedAt: '',
        reportType: '1',
        dateType: 1,
      });

      // Table title
      const title = computed(() => {
        return `最后更新时间：${state.updatedAt || ''}`;
      });

      // Total amount range report values
      const totalAmount = computed(() => {
        try {
          const totalAmount100 = state.amountRangeReportData?.totalAmount100 || 0;
          const totalAmount500 = state.amountRangeReportData?.totalAmount500 || 0;
          const totalAmount1000 = state.amountRangeReportData?.totalAmount1000 || 0;
          const totalAmount2000 = state.amountRangeReportData?.totalAmount2000 || 0;
          const totalAmount6000 = state.amountRangeReportData?.totalAmount6000 || 0;
          const totalAmount10000 = state.amountRangeReportData?.totalAmount10000 || 0;
          const totalAmount20000 = state.amountRangeReportData?.totalAmount20000 || 0;
          const totalAmountMore20000 = state.amountRangeReportData?.totalAmountMore20000 || 0;
          const sum =
            totalAmount100 +
            totalAmount500 +
            totalAmount1000 +
            totalAmount2000 +
            totalAmount6000 +
            totalAmount10000 +
            totalAmount20000 +
            totalAmountMore20000;
          return Number(sum).toLocaleString();
        } catch (e) {
          return '0';
        }
      });

      // Table definition
      const [registerTable, { getForm, setColumns, getDataSource }] = useTable({
        showSummary: true,
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        pagination: {
          pageSize: 9999,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        },
        columns: withdrawPeopleRepportColumns,
        formConfig: {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          schemas: withdrawalSchemas,
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        },
        summaryFunc: () => {
          if (getForm().getFieldsValue()['reportType'] == 1) {
            // 人數報表
            return [
              {
                reportDate: '合计',
                uniquePeople: '-',
                firstPeople: '-',
                withdrawNum: state.peopleReportData?.totalWithdrawNum?.toLocaleString() || 0,
                amount: state.peopleReportData?.totalAmount?.toLocaleString() || 0,
                avgAmount: '-',
                fee: state.peopleReportData?.totalFee?.toLocaleString() || 0,
                actualAmount: state.peopleReportData?.totalActualAmount?.toLocaleString() || 0,
                withdrawRate: '-',
              },
            ];
          } else {
            // 金額區間報表
            return [
              {
                reportDate: '合计',
                amount100: state.amountRangeReportData?.totalAmount100?.toLocaleString() || 0,
                amount500: state.amountRangeReportData?.totalAmount500?.toLocaleString() || 0,
                amount1000: state.amountRangeReportData?.totalAmount1000?.toLocaleString() || 0,
                amount2000: state.amountRangeReportData?.totalAmount2000?.toLocaleString() || 0,
                amount6000: state.amountRangeReportData?.totalAmount6000?.toLocaleString() || 0,
                amount10000: state.amountRangeReportData?.totalAmount10000?.toLocaleString() || 0,
                amount20000: state.amountRangeReportData?.totalAmount20000?.toLocaleString() || 0,
                amountMore20000:
                  state.amountRangeReportData?.totalAmountMore20000?.toLocaleString() || 0,
                sum: totalAmount.value,
              },
            ];
          }
        },
        api: async (arg) => {
          // Post body data
          const postBody: PostWithdrawReportData = {
            reportDate: arg.reportDateStart,
          };

          // Query params
          const getQuery: GetWithdrawReportParams = {
            reportDateStart: arg.reportDateStart,
            reportDateEnd: arg.reportDateEnd,
          };

          // Query report data
          let peopleReportList: WithdrawPeopleReportItem[] | undefined;
          let amountRangeReportList: WithdrawAmountRangeReportItem[] | undefined;
          let peopleResponse: GetWithdrawPeopleReportResultModel | undefined;
          let amountRangeResponse: GetWithdrawAmountRangeReportResultModel | undefined;
          if (arg.reportType == 1) {
            // 人數報表
            if (state.dateType == 1) {
              // 日報
              await postWithdrawPeopleReport(postBody);
              peopleResponse = await getWithdrawPeopleReport(getQuery);
            } else if (state.dateType == 2) {
              // 週報
              await postWithdrawPeopleWeekReport(postBody);
              peopleResponse = await getWithdrawPeopleWeekReport(getQuery);
            } else {
              // 月報
              await postWithdrawPeopleMonthReport(postBody);
              peopleResponse = await getWithdrawPeopleMonthReport(getQuery);
            }

            // Store report list
            peopleReportList = peopleResponse?.list;

            // Update table columns
            setColumns(withdrawPeopleRepportColumns);
          } else {
            // 金額區間報表
            if (state.dateType == 1) {
              // 日報
              await postWithdrawAmountRangeReport(postBody);
              amountRangeResponse = await getWithdrawAmountRangeReport(getQuery);
            } else if (state.dateType == 2) {
              // 週報
              await postWithdrawAmountRangeWeekReport(postBody);
              amountRangeResponse = await getWithdrawAmountRangeWeekReport(getQuery);
            } else {
              // 月報
              await postWithdrawAmountRangeMonthReport(postBody);
              amountRangeResponse = await getWithdrawAmountRangeMonthReport(getQuery);
            }

            // Store report list
            amountRangeReportList = amountRangeResponse?.list;

            // Update table columns
            setColumns(withdrawAmountRangeRepportColumns);
          }

          // Update header
          const updateAtStr = peopleResponse?.updatedAt || amountRangeResponse?.updatedAt;
          try {
            state.updatedAt = moment(updateAtStr, 'YYYY-MM-DD HH:mm:ss').format(
              'YYYY/MM/DD HH:mm:ss'
            );
          } catch (e) {
            state.updatedAt = updateAtStr || '';
          }

          // Update footer
          state.reportType = arg.reportType;
          state.peopleReportData = peopleResponse;
          state.amountRangeReportData = amountRangeResponse;

          // Return report list
          return peopleReportList || amountRangeReportList || [];
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
        let str;
        if (value.format) {
          str = dateCoverter(value, field);
        } else {
          str = value.toString();
        }
        getForm().setFieldsValue({ [`${field}`]: str });
      };

      // Handle export button clicked
      const handleExport = () => {
        jsonToSheetXlsx({
          data: getDataSource(),
          filename: '存款报表.xlsx',
          write2excelOpts: { bookType: 'xlsx' },
        });
      };

      const dateCoverter = (value, field) => {
        let str;
        if (state.dateType === 2){
          if (field === 'reportDateStart') {
            str = value.startOf('week').format('YYYY-MM-DD');
          } else if (field === 'reportDateEnd') {
            str = value.endOf('week').format('YYYY-MM-DD');
          }
        }else if (state.dateType === 3){
          if (field === 'reportDateStart') {
            str = value.startOf('month').format('YYYY-MM-DD');
          } else if (field === 'reportDateEnd') {
            str = value.endOf('month').format('YYYY-MM-DD');
          }
        }else{
          str = value.format('YYYY-MM-DD');
        }
        return str;
      }

      const dateTypeChange = (val) => {
        if (val == 1) {
          // 日報
          state.dateType = 1;
        } else if (val == 2) {
          // 週報
          state.dateType = 2;
        } else {
          // 月報
          state.dateType = 3;
        }
        const form = getForm().getFieldsValue();
        setFieldValue('reportDateStart', moment(form.reportDateStart));
        setFieldValue('reportDateEnd', moment(form.reportDateEnd));
      }
      
      return {
        state,
        title,
        totalAmount,
        registerTable,
        convertMoment,
        setFieldValue,
        handleExport,
        dateTypeChange,
      };
    },
  });
</script>
