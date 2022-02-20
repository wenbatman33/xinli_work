<template lang="pug">
  //- 游戏纪录 drawer
  .p-4(v-if="detailDisplay")
    .d-flex.align-items-center.mb-5
      span.mr-5 玩家帐号：{{ memberInfo.memberUserAccount }}
      el-date-picker(
        v-model="memberBetDetailRecordDate"
        type="datetimerange"
        range-separator="至"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getDetailData(gameId)"
        :clearable="false"
        :default-time="['00:00:00', '23:59:59']"
      )
    .d-flex.justify-content-around.align-items-center
      el-tag(type="info", closable, @close="closeDetail()", size="large") {{ gameTitle }}
      el-pagination(
        :background="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getDetailData(gameId) }"
      )
    el-table.mb-4(:data="memberBetDetailRecordSumTableData", border, key="table1-1")
      el-table-column(width="80", align="center")
        span 合计
      el-table-column(v-if="fieldPerms.betGameAccount", prop="betGameAccount", label="游戏帐号", width="120", align="center")
      el-table-column(v-if="fieldPerms.betKillPercent", prop="betKillPercent", label="杀数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betWinAmount", label="总输赢", width="120", align="center")
        span(slot-scope="{ row }", :class="row.betWinAmount < 0 ? 'text-danger' : ''")
          | {{ row.betWinAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betMaxUpdateAt", prop="betMaxUpdateAt", label="最后投注时间", width="180", align="center")
      el-table-column(v-if="fieldPerms.betCount", prop="betCount", label="总投注次数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betAmount", label="总有效流水", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betGameCash", label="总平台余额", align="center")
        span(slot-scope="{ row }") {{ row.betGameCash | formatMoney }}
    el-table(v-if="fieldPerms.betLogSatus", :data="memberBetDetailRecordTableData", border, height="45vh", key="table1-2")
      el-table-column(v-if="fieldPerms.reportDate", prop="betTime", label="投注时间", width="160", align="center")
      el-table-column(v-if="fieldPerms.betId", prop="betId", label="投注单号", width="130", align="center")
      el-table-column(v-if="fieldPerms.betLogSatus", prop="betLogSatus.display", label="状态", width="120", align="center")
      el-table-column(v-if="fieldPerms.betTotalAmount", label="投注金额", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betTotalAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betAmount", label="有效流水", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betWinAmount", label="输赢金额", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betWinAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betNote", prop="betNote", label="投注内容", align="center")

  .p-4(v-else)
    .d-flex.align-items-center.mb-5
      span.mr-5 玩家帐号：{{ memberInfo.memberUserAccount }}
      el-date-picker(
        v-model="memberBetRecordDate"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getData()",
        :clearable="false"
      )
    el-table.mb-4(:data="memberBetRecordSumTableData", border, key="table2-1")
      el-table-column(width="120", align="center")
        span 合计
      el-table-column(v-if="fieldPerms.betKillPercent", prop="betKillPercent", label="杀数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betWinAmount", label="总输赢", width="120", align="center")
        span(slot-scope="{ row }", :class="row.betWinAmount < 0 ? 'text-danger' : ''")
          | {{ row.betWinAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betMaxUpdateAt", prop="betMaxUpdateAt", label="最后投注时间", width="160", align="center")
      el-table-column(v-if="fieldPerms.betCount", prop="betCount", label="总投注次数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betTotalAmount", label="总投注金额", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betTotalAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betAmount", label="总有效流水", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betGameCash", label="总平台余额", align="center")
        span(slot-scope="{ row }") {{ row.betGameCash | formatMoney }}
    el-table(:data="memberBetRecordTableData", border, height="45vh", key="table2-2")
      el-table-column(v-if="fieldPerms.gameManGroupName", prop="gameManGroupName", label="平台", width="120", align="center")
      el-table-column(v-if="fieldPerms.betGameAccount", prop="betGameAccount", label="游戏帐号", width="120", align="center")
      el-table-column(v-if="fieldPerms.betKillPercent", prop="betKillPercent", label="杀数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betWinAmount", label="公司盈利", width="120", align="center")
        span(slot-scope="{ row }", :class="row.betWinAmount < 0 ? 'text-danger' : ''")
          | {{ row.betWinAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betMaxUpdateAt", prop="betMaxUpdateAt", label="最后投注时间", width="160", align="center")
      el-table-column(v-if="fieldPerms.betCount", prop="betCount", label="投注次数", width="120", align="center")
      el-table-column(v-if="fieldPerms.betTotalAmount", label="投注金额", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betTotalAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betAmount", label="有效流水", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betGameCash", label="平台余额", width="120", align="center")
        span(slot-scope="{ row }") {{ row.betGameCash | formatMoney }}
      el-table-column(v-if="canShowBetRecordLog", align="center")
        el-button(slot-scope="{ row }", type="text", @click="openDetail(row)") 看明细
</template>

<script>
import {
  getMemberBetRecordAllSumAPI,
  getMemberBetRecordAllAPI,
  getMemberBetRecordGameGroupSumAPI,
  getMemberBetRecordGameGroupAPI,
} from '@/api/record/record';

export default {
  props: {
    fieldPerms: Object,
    memberInfo: Object,
    canShowBetRecordLog: {
      type: Boolean,
      default: false
    },
    date: Array
  },
  data() {
    return {
      detailDisplay: false,
      memberBetRecordDate: [],
      memberBetRecordSumTableData: [],
      memberBetRecordTableData: [],
      memberBetDetailRecordDate: [],
      memberBetDetailRecordStartTime: '00:00:00',
      memberBetDetailRecordEndTime: '23:59:59',
      memberBetDetailRecordSumTableData: [],
      memberBetDetailRecordTableData: [],
      memberBetDetailRecordGameId: 0,
      gameId: 0,
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1
    }
  },
  methods: {
    getData() {
      getMemberBetRecordAllSumAPI({
        account: this.memberInfo.memberUserAccount,
        dateStart: this.memberBetRecordDate[0],
        dateEnd: this.memberBetRecordDate[1],
      }).then(res => {
        this.memberBetRecordSumTableData = res.data.data;
      }).catch(() => {});

      getMemberBetRecordAllAPI({
        account: this.memberInfo.memberUserAccount,
        dateStart: this.memberBetRecordDate[0],
        dateEnd: this.memberBetRecordDate[1],
      }).then(res => {
        this.memberBetRecordTableData = res.data.data;
      }).catch(() => {});
    },
    openDetail({ gameManGroupId: id, gameManGroupName }) {
      this.gameId = id;
      this.memberBetDetailRecordDate.push(this.memberBetRecordDate[0] + ' 00:00:00');
      this.memberBetDetailRecordDate.push(this.memberBetRecordDate[1] + ' 23:59:59');
      this.gameTitle = gameManGroupName;
      this.getDetailData(id);
      this.detailDisplay = true;
    },
    closeDetail() {
      this.gameId = 0;
      this.memberBetDetailRecordDate = [];
      this.memberBetDetailRecordSumTableData = [];
      this.memberBetDetailRecordTableData = [];
      this.gameTitle = '';
      this.detailDisplay = false;
    },
    getDetailData(id) {
      if (! this.memberBetDetailRecordDate) {
        return this.$message.error('请选择日期');
      }
      getMemberBetRecordGameGroupSumAPI({
        account: this.memberInfo.memberUserAccount,
        gameGroupId: id,
        dateStart: this.memberBetDetailRecordDate[0],
        dateEnd: this.memberBetDetailRecordDate[1],
      }).then(res => {
        this.memberBetDetailRecordSumTableData = res.data.data;
      }).catch(() => {});

      getMemberBetRecordGameGroupAPI({
        account: this.memberInfo.memberUserAccount,
        gameGroupId: id,
        dateStart: this.memberBetDetailRecordDate[0],
        dateEnd: this.memberBetDetailRecordDate[1],
        page: this.currentPage,
        per_page: this.pageSize,
      }).then(response => {
        this.memberBetDetailRecordTableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      }).catch(() => {});
    },
  },
  created() {
    if (this.date) {
      this.memberBetRecordDate = this.date;
    } else {
      const now = new Date();
      this.memberBetRecordDate = [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`]
    }

    this.getData();
  }
}
</script>
