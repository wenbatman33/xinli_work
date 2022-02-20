<template lang="pug">
  .container-fluid
    .d-flex.justify-content-between.align-items-center
      el-breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item
          a(@click="$emit('home')") 竟猜日报
        el-breadcrumb-item
          a(@click="$emit('close')") {{ date }}
        el-breadcrumb-item {{ gameTitle }}
      div(style="width: 500px")
        el-input(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()")
    .row.my-2
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="total")
        el-table-column(label="会员帐号", prop="account", align="center")
        el-table-column(label="投注时间", prop="betTime", align="center", width="160")
        el-table-column(label="投注内容", prop="betTeam", align="center")
        el-table-column(label="投注金额", align="center")
          span(slot-scope="{ row }") {{ row.betPoint | formatMoney }}
        el-table-column(label="输赢金额", align="center")
          span(slot-scope="{ row }") {{ row.winPoint | formatMoney }}
</template>

<script>
import debounce from 'lodash/debounce';
import { getGameBetRecordAPI, getGameBetRecordTotalAPI } from '@/api/dreamCity/record';

export default {
  data() {
    return {
      tableData: [],
      tableTotal: [],
      account: ''
    }
  },
  props: ['date', 'game', 'gameTitle'],
  created() {
    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      getGameBetRecordAPI({
        date: this.date,
        game_id: this.game,
        account: this.account
      })
      .then(response => {
        this.tableData = response.data.data;
      });

      getGameBetRecordTotalAPI({
        date: this.date,
        game_id: this.game
      })
      .then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          '',
          '',
          this.$options.filters.formatMoney(total.betPoint),
          this.$options.filters.formatMoney(total.winPoint)
        ];
      })
    },
    total() {
      return this.tableTotal;
    }
  }
}
</script>
