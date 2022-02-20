<template lang="pug">
  .container-fluid
    .d-flex.justify-content-start.align-items-center
      el-breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item
          a(@click="$emit('close')") 竟猜日报
        el-breadcrumb-item {{ date }}
    .row.my-2
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="total")
        el-table-column(label="赛事时间", prop="date", align="center", width="120")
        el-table-column(label="类型", prop="typeName", align="center")
        el-table-column(label="联赛", prop="name", align="center")
        el-table-column(label="主队/客队", align="center")
          span(slot-scope="{ row }") {{ `${row.home}/${row.guest}` }}
        el-table-column(label="投注总额", align="center")
          span(slot-scope="{ row }") {{ row.totalPoint | formatMoney }}
        el-table-column(label="投注人次", prop="totalPeople", align="center")
        el-table-column(label="人均投注额", align="center")
          span(slot-scope="{ row }") {{ row.avgPoint | formatMoney }}
        el-table-column(label="输赢金额", align="center")
          span(slot-scope="{ row }") {{ row.totalWinPoint | formatMoney }}
        el-table-column(label="投注胜率", align="center")
          span(slot-scope="{ row }") {{ (row.avgWin * 100) || 0 }}%
        el-table-column(label="操作", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary(@click="goToGameTable(row)") 查看
</template>

<script>
import { getTimeBetRecordAPI, getTimeBetRecordTotalAPI } from '@/api/dreamCity/record';

export default {
  data() {
    return {
      tableData: [],
      tableTotal: [],
    }
  },
  props: ['date'],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getTimeBetRecordAPI({
        date: this.date
      })
      .then(response => {
        this.tableData = response.data.data;
      });

      getTimeBetRecordTotalAPI({
        date: this.date
      })
      .then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          '',
          '',
          '',
          this.$options.filters.formatMoney(total.totalPoint),
          total.totalPeople,
          this.$options.filters.formatMoney(total.avgPoint),
          this.$options.filters.formatMoney(total.totalWinPoint),
          `${(total.avgWin * 100) || 0} %`,
        ];
      })
    },
    total() {
      return this.tableTotal;
    },
    goToGameTable(row) {
      this.$emit('game', row.gameId, `【${row.name}】 ${row.home} vs ${row.guest}`);
    }
  }
}
</script>
