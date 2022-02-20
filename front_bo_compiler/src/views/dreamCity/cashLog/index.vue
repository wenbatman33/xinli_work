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
      el-input.ml-3(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()", @input.once="firstInput()")
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
      el-table(:data="tableData", border, stripe, height="75vh", :empty-text="emptyText")
        el-table-column(label="時間", prop="date", align="center", width="160")
        el-table-column(label="交易类型", prop="transType", align="center")
        el-table-column(label="交易金额", align="center")
          span(slot-scope="{ row }") {{ row.transAmount | formatMoney }}
        el-table-column(label="交易前", align="center")
          span(slot-scope="{ row }") {{ row.transBefore | formatMoney }}
        el-table-column(label="交易后", align="center")
          span(slot-scope="{ row }") {{ row.transAfter | formatMoney }}
        el-table-column(label="备注", prop="note", align="center", show-overflow-tooltip)
</template>

<script>
import debounce from 'lodash/debounce';
import { getCashLogAPI } from '@/api/dreamCity/record';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
      emptyText: '请先输入会员帐号',
    }
  },
  created() {
    if (this.$route.query.account) {
      this.account = this.$route.query.account;
      this.timeRange = [this.$route.query.date, this.$route.query.date];
    } else {
      const now = new Date();
      const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
      now.setDate(now.getDate() - 30);
      const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
      this.timeRange = [startDate, endDate];
    }

    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      getCashLogAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        sdate: this.timeRange[0] + ' 00:00:00',
        edate: this.timeRange[1] + ' 23:59:59',
        account: this.account
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    firstInput() {
      setTimeout(() => {
        this.emptyText = '暂无数据';
      }, 1000);
    }
  }
}
</script>
