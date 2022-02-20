<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()"
      )
      el-input.ml-3(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()")
    .justify-content-end
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
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="getSummaries", max-height="70vh", :height="`${89 + tableData.length * 43.72}px`")
        el-table-column(label="任务日期", prop="date", align="center", width="120")
        el-table-column(label="会员帐号", align="center")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.account",
              :memberId="row.memberId",
              :groups="row.memberGroup && row.memberGroup.map(group => group.name)"
            )
        //- 任务id 4 为每日红包 需多一栏红包时段
        el-table-column(v-if="$route.query.id === 4", label="红包时段", prop="time", align="center", width="120")
        el-table-column(label="获得梦基金", align="center", width="120")
          span(slot-scope="{ row }") {{ row.point | formatMoney }}
        el-table-column(label="梦基金派发时间", prop="sendAt", align="center", width="180")
        el-table-column(label="状态", prop="status.display", align="center", width="100")
        el-table-column(label="备注", prop="note", align="center")
</template>

<script>
import debounce from 'lodash/debounce';
import { getParticipationAPI } from '@/api/dreamCity/task';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: []
    }
  },
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      return this.$message.error('无此活动');
    }

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
      getParticipationAPI(this.$route.query.id, {
        per_page: this.pageSize,
        page: this.currentPage,
        start_time: this.timeRange[0],
        end_time: this.timeRange[1],
        account: this.account
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    getSummaries({ columns, data }) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
        } else if (column.label === '获得梦基金') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            const sum = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);

            sums[index] = this.$options.filters.formatMoney(sum);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });

      return sums;
    }
  }
}
</script>
