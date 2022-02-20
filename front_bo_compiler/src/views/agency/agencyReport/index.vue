<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around
      el-radio-group(v-model="agencyType", size="small", @change="getData()")
        el-radio-button(label="all") 全部
        el-radio-button(label="1") 佣金
        el-radio-button(label="2") 电销
      el-date-picker.mx-3(
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
        el-table-column(label="总注册数", align="center")
          span(slot-scope="{ row }") {{ row.totalMemberCount | formatMoney }}
        el-table-column(label="注册人数", align="center")
          span(slot-scope="{ row }") {{ row.newMemberCount | formatMoney }}
        el-table-column(label="活跃人数", align="center")
          span(slot-scope="{ row }") {{ row.activeMemberCount | formatMoney }}
        el-table-column(label="总流水", align="center")
          span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
        el-table-column(label="存提差", align="center")
          span(slot-scope="{ row }") {{ row.disparityAmount | formatMoney }}
        el-table-column(label="存款总额", align="center")
          span(slot-scope="{ row }") {{ row.depositAmount | formatMoney }}
        el-table-column(label="存款人数", align="center")
          span(slot-scope="{ row }") {{ row.depositPersonCount | formatMoney }}
        el-table-column(label="提款总额", align="center")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(label="提款人数", align="center")
          span(slot-scope="{ row }") {{ row.withdrawPersonCount | formatMoney }}
        el-table-column(label="公司输赢", align="center")
          span(slot-scope="{ row }") {{ row.profitAmount | formatMoney }}
        el-table-column(label="代理钱包馀额", align="center", width="120")
          span(slot-scope="{ row }") {{ row.userCashAmount | formatMoney }}
</template>

<script>
import { getAgencyRecordAPI, getAgencyRecordSumAPI } from '@/api/agency/record.js';

export default {
  data() {
    return {
      tableData: [],
      tableTotal: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      agencyType: 'all',
      timeRange: [],
    }
  },
  created() {
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
        dateEnd: this.timeRange[1]
      }

      if (this.agencyType !== 'all') {
        APIParams.agencyType = +this.agencyType;
      }

      getAgencyRecordAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });

      getAgencyRecordSumAPI(APIParams).then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          '',
          this.$options.filters.formatMoney(total.newMemberCountSum),
          '',
          this.$options.filters.formatMoney(total.betAmountSum),
          this.$options.filters.formatMoney(total.disparityAmountSum),
          this.$options.filters.formatMoney(total.depositAmountSum),
          '',
          this.$options.filters.formatMoney(total.withdrawAmountSum),
          '',
          this.$options.filters.formatMoney(total.profitAmountSum),
        ];
      });
    },
    total() {
      return this.tableTotal;
    },
  }
}
</script>
