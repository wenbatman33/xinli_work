<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around.align-items-center
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
      el-input.ml-3(v-model="account", placeholder="请输入代理帐号", @input="debounceGetData()")
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
    .row
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(v-if="fieldPerms.paymentOrderUpdatedAt", label="日期", prop="paymentOrderUpdatedAt", align="center", width="160")
        el-table-column(v-if="fieldPerms.agencyCode", label="代理编号", prop="agencyCode", align="center")
        el-table-column(v-if="fieldPerms.agencyAccount", label="代理帐号", prop="agencyAccount", align="center")
        el-table-column(v-if="fieldPerms.agencyName", label="代理名称", prop="agencyName", align="center")
        el-table-column(v-if="fieldPerms.paymentOrderType", label="交易类型", prop="paymentOrderType.display", align="center")
        el-table-column(v-if="fieldPerms.paymentCashOld", label="交易前", align="center")
          span(slot-scope="{ row }") {{ row.paymentCashOld | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentCashNew", label="交易后", align="center")
          span(slot-scope="{ row }") {{ row.paymentCashNew | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentAmount", label="交易金额", align="center")
          span(slot-scope="{ row }") {{ row.paymentAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepAllDepositFee", label="交易手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepAllDepositFee | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentOrderId", label="交易单号", prop="paymentOrderId", align="center")
        el-table-column(v-if="fieldPerms.TransWDAllNote", label="备注", prop="TransWDAllNote", align="center", show-overflow-tooltip)
</template>

<script>
import debounce from 'lodash/debounce';
import { getAgencyCashLogsAPI } from '@/api/agency/cashLog';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.timeRange = [startDate, endDate];

    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      getAgencyCashLogsAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_time: this.timeRange[0] + ' 00:00:00',
        end_time: this.timeRange[1] + ' 23:59:59',
        account: this.account
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    }
  }
}
</script>
