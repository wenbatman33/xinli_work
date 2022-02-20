<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable size="small" @register="registerTable1" @edit-end="handleNote">
      <!-- Table toolbar start -->
      <template #toolbar>
        <div class="flex flex-row items-center">
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
          <!-- <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            class="flex-grow"
            format="YYYY/MM/DD"
            :allowClear="false"
            :value="convertMoment(values['reportDateEnd'])"
            @update:value="setFieldValue('reportDateEnd', $event)"
          /> -->
        </div>
      </template>
      <!-- Form date template end -->

    </BasicTable>
    <div class="subTable" v-show="state.table2.list" @edit-end="handleNote">
      <BasicTable size="small" @register="registerTable2"></BasicTable>
    </div>
    <div class="subTable" v-show="state.table3.list" @edit-end="handleNote">
      <BasicTable size="small" @register="registerTable3"></BasicTable>
    </div>
    <div class="subTable" v-show="state.table4.list" @edit-end="handleNote">
      <BasicTable size="small" @register="registerTable4"></BasicTable>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getList, setNote } from '/@/api/report/daily';
  import { tableColumn } from './components/tableData';
  import { searchSchema } from './components/formSchemas';
  import moment from 'moment';

  const rawData = ref({});
  const shiftKeys = ref([]);
  const state = reactive({
    table1: {},
    table2: {},
    table3: {},
    table4: {},
  });
  const initState = () => {
    state.table1 = {};
    state.table2 = {};
    state.table3 = {};
    state.table4 = {};
  }
  // Form config
  const formConfig = computed(() => {
    return {
      showResetButton: false,
      showAdvancedButton: true,
      autoSubmitOnEnter: true,
      schemas: searchSchema(),
      baseColProps: {
        style: {
          padding: '0px 4px',
        },
      },
    };
  });

  const handleSummary = (tableData) => {
    const totalStartingSystemBalance = tableData.reduce((prev, next) => {
      prev += next.startingSystemBalance;
      return prev;
    }, 0);
    const totalDepositAmount = tableData.reduce((prev, next) => {
      prev += next.depositAmount;
      return prev;
    }, 0);
    const totalPayoutAmount = tableData.reduce((prev, next) => {
      prev += next.payoutAmount;
      return prev;
    }, 0);
    const totalPayoutNum = tableData.reduce((prev, next) => {
      prev += next.payoutNum;
      return prev;
    }, 0);
    const totalSettlementUAmount = tableData.reduce((prev, next) => {
      prev += next.settlementUAmount;
      return prev;
    }, 0);
    const totalSettlementUNum = tableData.reduce((prev, next) => {
      prev += next.settlementUNum;
      return prev;
    }, 0);
    const totalFrozenAmount = tableData.reduce((prev, next) => {
      prev += next.frozenAmount;
      return prev;
    }, 0);
    const totalEndingSystemBalance = tableData.reduce((prev, next) => {
      prev += next.endingSystemBalance;
      return prev;
    }, 0);
    const totalEndingChannelBalance = tableData.reduce((prev, next) => {
      prev += next.endingChannelBalance;
      return prev;
    }, 0);
    const totalEndingBalanceDiff = tableData.reduce((prev, next) => {
      prev += next.endingBalanceDiff;
      return prev;
    }, 0);
    return [
      {
        serviceCode: '合计 ',
        startingSystemBalance: totalStartingSystemBalance.toFixed(2),
        depositAmount: totalDepositAmount.toFixed(2),
        payoutAmount: totalPayoutAmount.toFixed(2),
        payoutNum: totalPayoutNum,
        settlementUAmount: totalSettlementUAmount.toFixed(2),
        settlementUNum: totalSettlementUNum,
        frozenAmount: totalFrozenAmount.toFixed(2),
        endingSystemBalance: totalEndingSystemBalance.toFixed(2),
        endingChannelBalance: totalEndingChannelBalance.toFixed(2),
        endingBalanceDiff: totalEndingBalanceDiff.toFixed(2),
      }
    ]
  };

  // Member report table definition
  const [registerTable1, { reload, getForm, getDataSource, setProps: setTable1Props }] = useTable({
    title: '',
    formConfig,
    showIndexColumn: false,
    showTableSetting: true,
    useSearchForm: true,
    bordered: true,
    columns: tableColumn,
    showSummary: true,
    pagination: false,
    canResize: false,
    summaryFunc: handleSummary,
    api: async (arg) => {
      // Retrieve arguments
      let params = arg;
      params.reportDateStart = moment(arg.reportDateStart).format('YYYY-MM-DD');
      params.reportDateEnd = moment(arg.reportDateStart).format('YYYY-MM-DD');
      params = shiftConverter(params);

      // Get report
      setTable1Props({title: ''});
      initState();
      const response = (await getList(params)).list;
      rawData.value = response || {};
      shiftKeys.value = Object.keys(response) || [];
      Object.values(response).forEach((value, index) => {
        state['table' + (index + 1)] = value;
      });
      setTable1Props({title: getShift(0)});
      setTimeout(() => {
        setTable2Props({title: getShift(1)});
        setTable3Props({title: getShift(2)});
        setTable4Props({title: getShift(3)});
      }, 0);
      const firstTable = response[getShift(0)].list;
      // Return data list
      return firstTable || [];
    },
  });
  const [registerTable2, { setProps: setTable2Props }] = useTable({
    title: '',
    showIndexColumn: false,
    bordered: true,
    columns: tableColumn,
    showSummary: true,
    pagination: false,
    canResize: false,
    dataSource: computed(() => {
      return state.table2.list;
    }),
    summaryFunc: handleSummary,
  });
  const [registerTable3, { setProps: setTable3Props }] = useTable({
    title: '',
    showIndexColumn: false,
    bordered: true,
    columns: tableColumn,
    showSummary: true,
    pagination: false,
    canResize: false,
    dataSource: computed(() => {
      return state.table3.list;
    }),
    summaryFunc: handleSummary,
  });
  const [registerTable4, { setProps: setTable4Props }] = useTable({
    title: '',
    showIndexColumn: false,
    bordered: true,
    columns: tableColumn,
    showSummary: true,
    pagination: false,
    canResize: false,
    dataSource: computed(() => {
      return state.table4.list;
    }),
    summaryFunc: handleSummary,
  });

  const handleNote = ({ record, value }: Recordable) => {
    setNote({
      id: record.id || '',
      note: value || '',
    });
  };

  const getShift = (index) => {
    return shiftKeys.value[index] || null;
  }

  const shiftConverter = (params) => {
    if (params.shift === 1){
      params.reportHourStart = 0;
      params.reportHourEnd = 6;
    }
    if (params.shift === 2){
      params.reportHourStart = 8;
      params.reportHourEnd = 14;
    }
    if (params.shift === 3){
      params.reportHourStart = 16;
      params.reportHourEnd = 22;
    }
    return params;
  }

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
</script>
<style lang="scss" scoped>
.subTable {
  padding: 0 16px 16px;
}
::v-deep(.vben-basic-table .ant-table-footer .ant-table-body){
  overflow-y: auto !important;
}
</style>