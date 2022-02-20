<template lang="pug">
  .container-fluid
    div(v-show="! date")
      .d-flex.justify-content-end
        el-date-picker(
          v-model="timeRange",
          type="daterange",
          value-format="yyyy-MM-dd",
          :clearable="false",
          @change="getAllData()",
          style="min-width: 300px"
        )
      .row.my-2
        el-table(:data="allData", border, stripe, show-summary, :summary-method="total", max-height="75vh", :height="`${90 + allData.length * 44}px`")
          el-table-column(
            v-for="(header, index) in tableHeader",
            :key="index",
            :label="header",
            align="center"
          )
            template(slot-scope="{ row }")
              el-link.text-primary(v-if="index === 0", @click="showDayDetail(row[index])") {{ row[index] }}
              span(v-else) {{ row[index] | formatMoney }}
    template(v-if="date")
      .d-flex.justify-content-between.align-items-center
        el-page-header(@back="goBack", :content="`${date} 获点与耗点名单`")
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
        el-table(:data="tableData", border, stripe, height="75vh", @sort-change="sortChange")
          el-table-column(label="会员帐号", prop="member_id", align="center", sortable="custom")
            el-link.text-primary(slot-scope="{ row }", @click="goToCashLog(row.memberAccount)") {{ row.memberAccount }}
          el-table-column(label="当日获得点数", prop="obtain_point", align="center", sortable="custom")
            span(slot-scope="{ row }") {{ row.obtainPoint | formatMoney }}
          el-table-column(label="当日消耗点数", prop="consume_point", align="center", sortable="custom")
            span(slot-scope="{ row }") {{ row.consumePoint | formatMoney }}
</template>

<script>
import { getDreamCashRecordAPI, getDateDreamCashRecordAPI } from '@/api/dreamCity/record';

export default {
  data() {
    return {
      allData: [],
      timeRange: [],
      tableHeader: [],
      tableFooter: [],
      date: '',
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
    }
  },
  created() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.timeRange = [startDate, endDate];

    this.getAllData();
  },
  methods: {
    getAllData() {
      getDreamCashRecordAPI({
        sdate: this.timeRange[0] + ' 00:00:00',
        edate: this.timeRange[1] + ' 23:59:59'
      })
      .then(response => {
        this.tableHeader = response.data.data.shift();
        this.allData = response.data.data;
        this.tableFooter = response.data.data.pop().map((data, index) => {
          return index ? this.$options.filters.formatMoney(data) : data;
        });
      })
    },
    total() {
      return this.tableFooter;
    },
    showDayDetail(date) {
      this.getData(date).then(() => {
        this.date = date;
      });
    },
    getData(date) {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
      }

      if (this.dir) {
        APIParams.dir = this.dir;
        APIParams.sort_by = this.sortBy;
      }

      return getDateDreamCashRecordAPI(date ? date : this.date, APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    goBack() {
      this.date = '';
    },
    sortChange({ prop, order }) {
      this.sortBy = prop;
      this.dir = { descending: 'desc', ascending: 'asc' }[order] || '';
      this.getData();
    },
    goToCashLog(account) {
      this.$router.push({
        path: '/dreamCashLog',
        query: { account, date: this.date }
      })
    }
  }
}
</script>
