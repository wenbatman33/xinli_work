<template lang="pug">
  .vendor
    .d-flex.justify-content-around.align-items-center.mb-4
      .d-flex.justify-content-around.align-items-center
        el-radio(v-model="timeRangeType" :label='1') 日
        el-radio(v-model="timeRangeType" :label='2') 週
        el-radio(v-model="timeRangeType" :label='3') 月
      el-date-picker(
        v-if="timeRangeType === 1"
        v-model="dayDateTime",
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期",
        :clearable="false"
      )
      .d-flex(v-else-if="timeRangeType === 2")
        el-date-picker.mr-4(
          :value="weekDateTimeStart"
          @input="value => weekDateTimeStart = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周",
          :clearable="false"
        )
        el-date-picker(
          :value="weekDateTimeEnd"
          @input="value => weekDateTimeEnd = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周",
          :clearable="false"
        )
      el-date-picker(
        v-else-if="timeRangeType === 3"
        v-model="monthDateTime",
        type="monthrange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始月份"
        end-placeholder="结束月份",
        :clearable="false"
      )
      el-button(@click="getData()" size="small") 搜寻
    .d-flex.justify-content-between.align-items-center.flex-wrap.mb-4
      .d-flex.align-items-center
        span 選擇類型：
        el-select(v-model='type' placeholder='請選擇' @change="getGroup")
          el-option(label="全部", :value="null")
          el-option(v-for='item in typeOption' :key='item.value' :label="item.label" :value="item.value")
      .d-flex.align-items-center
        span 選擇廠商：
        el-select(v-model='group' placeholder='請選擇' @change="getGame")
          el-option(label="全部", :value="0")
          el-option(v-for='item in groupOption' :key='item.id' :label="item.name" :value="item.id")
      .d-flex.align-items-center
        span 選擇遊戲：
        el-select(v-model='game' placeholder='請選擇' @change="getData")
          el-option(label="全部", :value="0")
          el-option(v-for='item in gameOption' :key='item.id' :label="item.game_name" :value="item.id")
    .d-flex.justify-content-between.align-items-center
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") 時間區間：{{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) 時間區間：{{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") 時間區間：{{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      span(v-if="lastUpdateTime") 最後更新時間：{{ lastUpdateTime[0].reportMaxUpdateAt }}
    el-table(:data="tableData" border style="width: 100%")
      el-table-column(label="日期", header-align="center", align="center")
        span(slot-scope="{ row }") {{ row.reportDate }}
      el-table-column(v-if="fieldPerms.betUniqueMemberCnt" label="唯一投注人數", header-align="center", align="center")
        el-link.text-primary(slot-scope="{ row }", @click="openMemberTable(row.reportDate)")
          span {{ row.betUniqueMemberCnt | formatMoney }}
      el-table-column(v-if="fieldPerms.betCount" label="投注次數", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.betCount | formatMoney }}
      el-table-column(v-if="fieldPerms.betAmount" header-align="center", align="center")
        template(slot="header")
          span(@click="openImage(1)") 總流水
            i.el-icon-data-analysis
        template(slot-scope="{ row }")
          span {{ row.betAmount | formatMoney }}
      el-table-column(v-if="fieldPerms.betKillPercent" header-align="center", align="center")
        template(slot="header")
          span(@click="openImage(1)") 殺數
            i.el-icon-data-analysis
        template(slot-scope="{ row }")
          span {{ row.betKillPercent | formatMoney }}%
      el-table-column(v-if="fieldPerms.betWinAmount" header-align="center", align="center")
        template(slot="header")
          span(@click="openImage(2)") 公司盈利
            i.el-icon-data-analysis
        span(slot-scope="{ row }", :class="row.betWinAmount < 0 ? 'text-danger' : ''")
          | {{ row.betWinAmount | formatMoney }}
    el-dialog(:visible.sync="dialogVisible1")
      ve-histogram(:data="chartTableData1" :settings="chartSettings" :extend="extend" :tooltip-visible="false")
    el-dialog(:visible.sync="dialogVisible2")
      ve-histogram(:data="chartTableData2" :settings="chartSettings" :extend="extend" :tooltip-visible="false")
    //- 注册人数 活跃人数 唯一投注人数 会员table
    el-dialog(:visible.sync="memberTableVisible", top="5vh", width="90%", title="唯一投注人數", @close="memberTableClose", :modal-append-to-body="false")
      //- 分页 表格上方
      .justify-content-end
        el-pagination(
          :background="true",
          :hide-on-single-page="true",
          :pager-count="5",
          layout="sizes, prev, pager, next, jumper, total",
          :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
          :page-size="pageSize",
          :total="dataTotal",
          :current-page.sync="currentPage",
          @current-change="openMemberTable()",
          @size-change="size => { pageSize = size; openMemberTable() }"
        )
      .row
        el-table(:data="memberTable", height="66vh")
          el-table-column(v-if="fieldPerms.memberUserAccount", label="帳號", align="center", width="160")
            template(slot-scope="{ row }")
              router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.id } }")
                | {{ row.memberUserAccount }}
          el-table-column(v-if="fieldPerms.backendMemberRealname", prop="backendMemberRealname", label="姓名", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberGroupList", label="群组", align="center", width="200")
            template(slot-scope="{ row }")
              el-tooltip(v-if="row.backendMemberGroupList.length > 3")
                div(slot="content")
                  el-tag.m-1(v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
                el-badge.mt-2(:value="row.backendMemberGroupList.length", type="warning")
                  el-tag {{ row.backendMemberGroupList[0] && row.backendMemberGroupList[0].memberGroupGroupName }}
              el-tag.m-1(v-else, v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
          el-table-column(v-if="fieldPerms.backendMemberIp", prop="backendMemberIp", label="IP", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
          el-table-column(v-if="fieldPerms.backendMemberLastLoginAt", prop="backendMemberLastLoginAt", label="最后登入", align="center", width="180", show-overflow-tooltip)
          el-table-column(v-if="fieldPerms.backendMemberLastLoginDevice", prop="backendMemberLastLoginDevice", label="设备", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberLastLoginBrowser", prop="backendMemberLastLoginBrowser", label="浏览器", align="center", width="80")
          el-table-column(v-if="fieldPerms.backendMemberMemberNote", label="备注", align="center", width="220")
            template(slot-scope="{ row }")
              .member--note(v-for="note in row.backendMemberMemberNote", :key="note.id")
                .member--note--type
                  span {{ note.memberNoteType.display[0] }}
                .member--note--content
                  .member--note--datetime {{ note.memberNoteCreatedAt }}
                  line-clamp(:content="note.memberNoteNote")
</template>

<script>
import {
  getDayBetReportAPI,
  getWeekBetReportAPI,
  getMonthBetReportAPI,
  getBetReportReportMaxUpdatedAtAPI,
  getBetReportGameListAPI,
  getBetReportUniqueBetMemberCntAPI
} from '@/api/reports/vendor.js';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    this.extend = {
      'xAxis.0.axisLabel.rotate': 45
    }
    this.chartSettings = {
      'showLine': 'betKillPercent',
      axisSite: { right: ['betKillPercent'] },
      labelMap: {
        'betAmount': '總流水',
        'betKillPercent': '殺數',
        'betWinAmount': '公司盈利',
      },
    }
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
      dialogVisible1: false,
      dialogVisible2: false,
      chartTableData1: {},
      chartTableData2: {},
      memberTableVisible: false,
      memberTable: [],
      memberTempDate: null
    }
  },
  methods: {
    openImage(type) {
      if (type === 1) {
        this.chartTableData1 = {};
        this.dialogVisible1 = true;
        Object.assign(this.chartTableData1, {
          columns: ['reportDate', 'betAmount', 'betKillPercent'],
          rows: this.tableData,
        });
      } else {
        this.chartTableData2 = {};
        this.dialogVisible2 = true;
        Object.assign(this.chartTableData2, {
          columns: ['reportDate', 'betWinAmount'],
          rows: this.tableData,
        });
      }
    },
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
          dateEnd: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeStart : this.weekDateTimeEnd
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
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
        getMonthBetReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
      }
    },
    openMemberTable(date) {
      date = date || this.memberTempDate;
      getBetReportUniqueBetMemberCntAPI({
        dateType: { 1: 'D', 2: 'W', 3: 'M' }[this.timeRangeType],
        gameTypeId: this.type,
        gameGroupId: this.group,
        gameListId: this.game,
        dateStart: date,
        dateEnd: date,
        page: this.currentPage,
        per_page: this.pageSize,
      })
      .then(response => {
        this.memberTable = response.data.data;
        this.memberTempDate = date;
        this.memberTableVisible = true;
      })
    },
    memberTableClose() {
      this.currentPage = 1;
      this.memberTempDate = null;
    },
  },
  mounted() {
    getBetReportReportMaxUpdatedAtAPI().then(res => {
      this.lastUpdateTime = res.data.data;
    })

    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 7);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.dayDateTime = [startDate, endDate];

    this.getData();
  }
}
</script>
