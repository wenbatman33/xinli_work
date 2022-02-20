<template lang="pug">
  .vendor
    .d-flex.justify-content-around.align-items-center.mb-4
      .d-flex.justify-content-around.align-items-center
        el-radio(v-model="timeRangeType" :label='1') 日
        el-radio(v-model="timeRangeType" :label='2') 周
        el-radio(v-model="timeRangeType" :label='3') 月
      el-date-picker(
        v-if="timeRangeType === 1"
        v-model="dayDateTime",
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false"
      )
      .d-flex(v-else-if="timeRangeType === 2")
        el-date-picker.mr-4(
          :value="weekDateTimeStart"
          @input="value => weekDateTimeStart = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :clearable="false"
        )
        el-date-picker(
          :value="weekDateTimeEnd"
          @input="value => weekDateTimeEnd = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :clearable="false"
        )
      el-date-picker(
        v-else-if="timeRangeType === 3"
        v-model="monthDateTime",
        type="monthrange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :clearable="false"
      )
      el-button(@click="getData()" size="small") 搜寻
    .d-flex.justify-content-between.align-items-center.flex-wrap.mb-4
      .d-flex.align-items-center
        span 选择类型：
        el-select(v-model='type' placeholder='全部' @change="getGroup")
          el-option(label="全部", :value="null")
          el-option(v-for='item in typeOption' :key='item.value' :label="item.label" :value="item.value")
      .d-flex.align-items-center
        span 选择厂商：
        el-select(v-model='group' placeholder='全部' @change="getGame")
          el-option(label="全部", :value="null")
          el-option(v-for='item in groupOption' :key='item.id' :label="item.name" :value="item.id")
      .d-flex.align-items-center
        span 選擇游戏：
        el-select(v-model='game' placeholder='全部' @change="getData()")
          el-option(label="全部", :value="null")
          el-option(v-for='item in gameOption' :key='item.id' :label="item.game_name" :value="item.id")
    .d-flex.justify-content-between.align-items-center
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") 时间区间：{{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) 时间区间：{{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") 时间区间：{{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      span(v-if="lastUpdateTime") 最后更新时间：{{ lastUpdateTime[0].reportMaxUpdateAt }}
    el-table(:data="tableData" border style="width: 100%")
      el-table-column(v-if="fieldPerms.memberUserAccount" label="会员帐号", header-align="center", align="center")
        template(slot-scope="{ row }")
          member-display(
            :memberName="row.memberUserAccount",
            :memberId="row.memberUserId",
            :groups="row.memberUserGroup && row.memberUserGroup.map(group => group.name)"
          )
      el-table-column(v-if="fieldPerms.betCount" label="投注次数", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.betCount | formatMoney }}
      el-table-column(v-if="fieldPerms.betAmount" label="总流水", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link.text-primary(
            v-if="fieldPerms.memberUserId && row.memberUserId",
            @click="openGameLog(row.memberUserId)"
          ) {{ row.betAmount | formatMoney }}
          span(v-else) {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betKillPercent" label="杀数", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.betKillPercent | formatMoney }}%
      el-table-column(v-if="fieldPerms.betWinAmount" label="公司盈利", header-align="center", align="center")
        span(slot-scope="{ row }", :class="row.betWinAmount < 0 ? 'text-danger' : ''")
          | {{ row.betWinAmount | formatMoney }}
    //- 游戏纪录 drawer
    el-drawer(:visible.sync="gameLogDrawerVisible", size="70%", title="游戏纪录", direction="rtl", destroy-on-close)
      betRecord(
        :memberInfo="member",
        :fieldPerms="fieldPerms",
        :canShowBetRecordLog="true",
        :date="dateFormat"
      )
</template>

<script>
import {
  getDayBetReportAPI,
  getWeekBetReportAPI,
  getMonthBetReportAPI,
  getBetReportGameListAPI,
  getBetReportReportMaxUpdatedAtAPI
} from '@/api/reports/winner.js';
import { getMemberAPI } from '@/api/member/member';
import betRecord from '@/components/Records/betRecord.vue';

export default {
  components: { betRecord },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    return {
      timeRangeType: 1,
      dayDateTime: [],
      weekDateTimeStart: '',
      weekDateTimeEnd: '',
      monthDateTime: [],
      type: null,
      group: null,
      game: null,
      typeOption: [
        {
          label: '体育赛事',
          value: 1,
        },
        {
          label: '真人娱乐',
          value: 2,
        },
        // {
        //   label: '电子竞技',
        //   value: 3,
        // },
        {
          label: '彩票投注',
          value: 4,
        },
        {
          label: '棋牌游戏',
          value: 5,
        },
        {
          label: '电子游艺',
          value: 6,
        },
        // {
        //   label: '捕鱼游戏',
        //   value: 7,
        // }
      ],
      groupOption: [],
      gameOption: [],
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      lastUpdateTime: null,
      member: {},
      gameLogDrawerVisible: false
    }
  },
  computed: {
    dateFormat() {
      switch (this.timeRangeType) {
        case 1:
          return [
            this.dayDateTime[0],
            this.dayDateTime[1]
          ]
        case 2:
          return [
            this.weekDateTimeStart,
            this.weekDateTimeEnd
          ]
        case 3:
          return [
            this.monthDateTime[0],
            this.monthDateTime[1]
          ]
        default:
          return []
      }
    }
  },
  watch: {
    timeRangeType() {
      this.tableData = [];
    }
  },
  methods: {
    getGroup() {
      this.group = null;
      this.game = null;
      this.gameOption = [];
      if (this.type) {
        getBetReportGameListAPI({
          game_type: this.type,
        }).then(res => {
          this.groupOption = res.data.data;
        });
      } else {
        this.groupOption = [];
      }
      this.getData();
    },
    getGame() {
      this.game = null;
      if (this.group) {
        getBetReportGameListAPI({
          game_type: this.type,
          game_group_id: this.group,
        }).then(res => {
          this.gameOption = res.data.data;
        });
      } else {
        this.gameOption = [];
      }
      this.getData();
    },
    getData() {
      const datepickertype = this.timeRangeType;

      if (datepickertype === 1) {
        let temp = {};
        const params = {
          gameTypeId: this.type,
          gameGroupId: this.group,
          gameListId: this.game,
          dateStart: this.dayDateTime[0],
          dateEnd: this.dayDateTime[1],
          page: this.currentPage,
          per_page: this.pageSize,
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
        getDayBetReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
      } else if (datepickertype === 2) {
        if (! (this.weekDateTimeStart && this.weekDateTimeEnd)) {
          return this.$message.error('请选择资料区间');
        }
        let temp = {};
        const params = {
          gameTypeId: this.type,
          gameGroupId: this.group,
          gameListId: this.game,
          dateStart: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeEnd : this.weekDateTimeStart,
          dateEnd: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeStart : this.weekDateTimeEnd,
          page: this.currentPage,
          per_page: this.pageSize,
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
        getWeekBetReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
      } else if (datepickertype === 3) {
        if (! this.monthDateTime.length) {
          return this.$message.error('请选择资料区间');
        }
        let temp = {};
        const params = {
          gameTypeId: this.type,
          gameGroupId: this.group,
          gameListId: this.game,
          dateStart: this.monthDateTime[0],
          dateEnd: this.monthDateTime[1],
          page: this.currentPage,
          per_page: this.pageSize,
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        });
        getMonthBetReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
      }
    },
    openGameLog(id) {
      getMemberAPI(id).then(response => {
        this.member = response.data.data[0];
        this.gameLogDrawerVisible = true;
      });
    }
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 7);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.dayDateTime = [startDate, endDate];

    this.getData();
    getBetReportReportMaxUpdatedAtAPI().then(res => {
      this.lastUpdateTime = res.data.data;
    })
  }
}
</script>
