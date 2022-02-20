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
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="total", max-height="75vh", :height="`${90 + tableData.length * 44}px`")
        el-table-column(label="日期", prop="reportDate", align="center", width="120")
        el-table-column(label="佣金派发人数", align="center", width="100")
          span(slot-scope="{ row }") {{ row.commissionPersonCount | formatMoney }}
        el-table-column(label="佣金派发金额", align="center", width="100")
          span(slot-scope="{ row }") {{ row.commissionAmount | formatMoney }}
        el-table-column(label="存款次数", align="center", width="100")
          span(slot-scope="{ row }") {{ row.depositCount | formatMoney }}
        el-table-column(label="存款金额", align="center")
          span(slot-scope="{ row }") {{ row.depositAmount | formatMoney }}
        el-table-column(label="存款次数", align="center")
          span(slot-scope="{ row }") {{ row.withdrawCount | formatMoney }}
        el-table-column(label="提款金额", align="center", width="100")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(label="存提手续费", align="center")
          span(slot-scope="{ row }") {{ row.feeAmount | formatMoney }}
        el-table-column(label="上分人数", align="center")
          span(slot-scope="{ row }") {{ row.assignPersonCount | formatMoney }}
        el-table-column(label="上分金额", align="center")
          span(slot-scope="{ row }") {{ row.assignAmount | formatMoney }}
        el-table-column(label="代理钱包馀额", align="center")
          span(slot-scope="{ row }") {{ row.userCashAmount | formatMoney }}
</template>

<script>
import { getWalletRecordAPI, getWalletRecordSumAPI } from '@/api/agency/record.js';

export default {
  data() {
    return {
      tableData: [],
      tableTotal: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      timeRange: []
    }
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-01`;
    this.timeRange = [startDate, endDate];

    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        dateStart: this.timeRange[0],
        dateEnd: this.timeRange[1],
      }

      getWalletRecordAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });

      getWalletRecordSumAPI(APIParams).then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          this.$options.filters.formatMoney(total.commissionPersonCountSum),
          this.$options.filters.formatMoney(total.commissionAmountSum),
          this.$options.filters.formatMoney(total.depositCountSum),
          this.$options.filters.formatMoney(total.depositAmountSum),
          this.$options.filters.formatMoney(total.withdrawCountSum),
          this.$options.filters.formatMoney(total.withdrawAmountSum),
          this.$options.filters.formatMoney(total.feeAmountSum),
          '',
          this.$options.filters.formatMoney(total.assignAmountSum),
        ];
      });
    },
    total() {
      return this.tableTotal;
    },
  }
}
</script>
