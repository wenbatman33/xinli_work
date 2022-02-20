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
    .row.my-2
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="total")
        el-table-column(label="赛事日期", prop="date", align="center", width="120")
        el-table-column(label="竞猜场数", prop="totalGame", align="center")
        el-table-column(label="投注总额", align="center")
          span(slot-scope="{ row }") {{ row.totalPoint | formatMoney }}
        el-table-column(label="投注人次", prop="totalPeople", align="center")
        el-table-column(label="人均投注额", align="center")
          span(slot-scope="{ row }") {{ row.avgPoint | formatMoney }}
        el-table-column(label="投注胜率", align="center")
          span(slot-scope="{ row }") {{ (row.avgWin * 100) || 0 }}%
        el-table-column(label="操作", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary(@click="$emit('time', row.date)") 查看
</template>

<script>
import { getBetRecordAPI, getBetRecordTotalAPI } from '@/api/dreamCity/record';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      timeRange: [],
      tableTotal: [],
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
      getBetRecordAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_date: this.timeRange[0],
        end_date: this.timeRange[1]
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });

      getBetRecordTotalAPI({
        start_date: this.timeRange[0],
        end_date: this.timeRange[1]
      })
      .then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          total.totalGame,
          this.$options.filters.formatMoney(total.totalPoint),
          total.totalPeople,
          this.$options.filters.formatMoney(total.avgPoint),
          `${(total.avgWin * 100) || 0} %`,
        ];
      })
    },
    total() {
      return this.tableTotal;
    }
  }
}
</script>
