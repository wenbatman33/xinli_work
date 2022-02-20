<template lang="pug">
  .container-fluid
    .d-flex.justify-content-between.align-items-center
      el-select(v-model="status", @change="getData()")
        el-option(label="全部", :value="null")
        el-option(v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value")
      div
        span.mx-3 存款总额：{{ total.paymentSumAmount | formatMoney }}
        span.mx-3 最高金额：{{ total.paymentMaxAmount | formatMoney }}
        span.mx-3 存款次数：{{ total.paymentCompletedCnt }}
        span.mx-3 平均金额：{{ total.paymentAvgAmount | formatMoney }}
      el-pagination(
        :background="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    el-table(:data="tableData" height="calc(100vh - 580px)")
      el-table-column(v-if="fieldPerms.transDepAllOrderId" label="交易单号", prop="transDepAllOrderId", align="center")
      el-table-column(v-if="fieldPerms.transDepAllStatus" label="状态", prop="transDepAllStatus.display", align="center")
      el-table-column(v-if="fieldPerms.transDepAllPayTypeBankCode" label="交易类型", prop="transDepAllPayTypeBankCode", align="center")
      el-table-column(v-if="fieldPerms.transDepAllSuccessTime" label="交易时间", prop="transDepAllSuccessTime", align="center")
      el-table-column(v-if="fieldPerms.transDepAllAmount" label="交易金额", align="center")
        span(slot-scope="{ row }") {{ row.transDepAllAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.transDepAllDepositFee" label="存款手续费", align="center")
        span(slot-scope="{ row }") {{ row.transDepAllDepositFee | formatMoney }}
      el-table-column(
        v-if="fieldPerms.transDepAllAmount && fieldPerms.transDepAllDepositFee",
        label="实际上分金额",
        align="center"
      )
        span(slot-scope="{ row }") {{ (row.transDepAllAmount - row.transDepAllDepositFee) | formatMoney }}
      el-table-column(v-if="fieldPerms.transDepAllNote" label="备注", prop="transDepAllNote", align="center")
</template>

<script>
import { getMemberCashRecordPaymentAPI, getMemberCashRecordPaymentSumAPI } from '@/api/record/record';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      total: {},
      status: null,
      statusOption: [
        {
          value: 0,
          label: '初始化'
        },
        {
          value: 1,
          label: '新建'
        },
        {
          value: 2,
          label: '处理中'
        },
        {
          value: 3,
          label: '交易完成'
        },
        {
          value: 4,
          label: '交易失败'
        },
        {
          value: 5,
          label: '交易异常'
        },
      ],
    }
  },
  props: ['fieldPerms', 'memberId', 'dateTime'],
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getTotal();
      this.getData();
    },

    getData() {
      getMemberCashRecordPaymentAPI(this.memberId, {
        memberId: this.memberId,
        type: 1,
        dateStart: this.dateTime[0],
        dateEnd: this.dateTime[1],
        status: this.status,
        page: this.currentPage,
        perPage: this.pageSize,
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      }).catch(() => {});
    },

    getTotal() {
      getMemberCashRecordPaymentSumAPI(this.memberId, {
        memberId: this.memberId,
        type: 1,
        dateStart: this.dateTime[0],
        dateEnd: this.dateTime[1],
      }).then(response => {
        this.total = response.data.data[0];
      }).catch(() => {});
    },
  },
}
</script>

