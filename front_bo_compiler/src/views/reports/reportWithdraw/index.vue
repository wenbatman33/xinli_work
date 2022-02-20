<template lang="pug">
  .withdraw
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
      el-button(@click="getData(timeRangeType)" size="small") 搜寻
    el-radio-group(v-model="tabPosition" @change="changeTab" style="margin-bottom: 30px")
      el-radio-button(:label="1") 依人数
      el-radio-button(:label="2") 依金额区间
    .d-flex.justify-content-between.align-items-center
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") 时间区间：{{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) 时间区间：{{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") 时间区间：{{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      span(v-if="tableDataSummary.length > 0") 最后更新时间：{{ tableDataSummary[0].reportMaxUpdateAt }}
    //- 依人数
    .d-flex.flex-column(v-if="tabPosition === 1")
      el-table(:data="tableDataSummary" border style="width: 100%")
        el-table-column(label="合计", header-align="center", align="center", width="120")
        el-table-column(v-if="fieldPerms.repMemberSignUpCnt" label="唯一提款人数", header-align="center", align="center")
          span -
        el-table-column(v-if="fieldPerms.withdrawCount", label="提款次数", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawCount | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawAmount", label="提款金额", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(label="人均提款金额", header-align="center", align="center")
          span -
        el-table-column(v-if="fieldPerms.withdrawFee", label="手续费", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawFee | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawActualAmount", label="实付金额", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawActualAmount | formatMoney }}
        el-table-column(label="提款比", header-align="center", align="center")
          span -
      el-table(:data="tableData" border style="width: 100%")
        el-table-column(label="日期", prop="reportDate", header-align="center", align="center", width="120")
        el-table-column(v-if="fieldPerms.withdrawPeople", label="唯一提款人数", header-align="center", align="center")
          template(slot-scope="{ row }")
            el-link(type="primary" @click="openWithdrawUniPayMemberTable(row)") {{ row.withdrawPeople | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawCount", label="提款次数", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawCount | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawAmount", label="提款金额", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawAmountAvg", header-align="center", align="center")
          template(slot="header")
            span(@click="openWithdrawAmountAvgImage") 人均提款金额
              i.el-icon-data-analysis
          span(slot-scope="{ row }") {{ row.withdrawAmountAvg | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawFee", label="手续费", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawFee | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawActualAmount", label="实付金额", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawActualAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawRate", label="提款比", header-align="center", align="center")
          span(slot-scope="{ row }") {{ (row.withdrawRate * 100) | formatMoney }}%
    //- 依金额区间
    .d-flex.flex-column(v-else-if="tabPosition === 2")
      el-table(:data="tableDataSummary" border style="width: 100%")
        el-table-column(header-align="center", align="center", width="120")
          template(slot="header")
            span(@click="openResultImage") 合计
              i.el-icon-data-analysis
        el-table-column(v-if="fieldPerms.withdrawSpacing100", label="0~100", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing100 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing500", label="101~500", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing500 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing1000", label="501~1,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing1000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing2000", label="1,001~2,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing2000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing6000", label="2,001~6,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing6000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing10000", label="6,000~10,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing10000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing20000", label="10,001~20,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing20000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing20000Up", label="两万以上", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing20000Up | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacingTotal", label="小计", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacingTotal | formatMoney }}

      el-table(:data="tableData" border style="width: 100%")
        el-table-column(prop="reportDate", label="日期", header-align="center", align="center", width="120")
        el-table-column(v-if="fieldPerms.withdrawSpacing100", label="0~100", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing100 }}
        el-table-column(v-if="fieldPerms.withdrawSpacing500", label="101~500", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing500 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing1000", label="501~1,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing1000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing2000", label="1,001~2,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing2000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing6000", label="2,001~6,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing6000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing10000", label="6,000~10,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing10000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing20000", label="10,001~20,000", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing20000 | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacing20000Up", label="两万以上", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacing20000Up | formatMoney }}
        el-table-column(v-if="fieldPerms.withdrawSpacingTotal", label="小计", header-align="center", align="center")
          span(slot-scope="{ row }") {{ row.withdrawSpacingTotal | formatMoney }}

    el-dialog(:visible.sync="withdrawAmountAvgTable", width="90%")
      ve-histogram(:data="chartTableData" :settings="chartSettings" :extend="extend" :tooltip-visible="false")
    el-dialog(:visible.sync="withdrawAmountSpacingTable", width="90%", height="75vh")
      ve-pie(:data="chartTableData" :extend="pieExtend" :tooltip-visible="false")
    el-dialog(:visible.sync="withdrawUniPayMemberTable", title="提款报表/唯一提款人数清单" width="90%")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", align="center", width="160")
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
  getWithdrawPeopleListReportAPI,
  getWithdrawPeopleSumReportAPI,
  getWithdrawSpacingListReportAPI,
  getWithdrawSpacingSumReportAPI,
  getWithdrawUniPayMemberReportAPI
} from '@/api/reports/withdraw.js';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    this.extend = {
      title : {
        text: '提款金额区间比例',
        x: 'center',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        show: true,
      },
      series: {
        label: {
          show: true,
        }
      }
    }
    this.pieExtend = {
       title : {
        text: '提款金额区间比例',
        x: 'center',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        show: true,
      },
      series: {
        center: ['55%', '50%'],
        label: {
          show: true,
          formatter: '【{b}】{d}% ({c})',
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '25',
              fontWeight: 'bold'
            }
          }
        },
      }
    }
    this.chartSettings = {
      'showLine': 'withdrawAmountAvg',
      labelMap: {
        'withdrawAmountAvg': '人均提款金额',
      },
    }
    return {
      tabPosition: 1,
      timeRangeType: 1,
      dayDateTime: [],
      weekDateTimeStart: '',
      weekDateTimeEnd: '',
      monthDateTime: [],
      tableData: [],
      tableDataSummary: [],
      detailTable: [],
      chartTableData: {},
      withdrawUniPayMemberTable: false,
      withdrawAmountAvgTable: false,
      withdrawAmountSpacingTable: false,
    }
  },
  methods: {
    getData(datepickertype) {
      let temp = {};
      let params;
      if (datepickertype === 1) {
        params = {
          dateType: 'D',
          dateStart: this.dayDateTime[0],
          dateEnd: this.dayDateTime[1],
          orderBy: 'date',
          sort: 'desc',
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
      } else if (datepickertype === 2) {
        if (! (this.weekDateTimeStart && this.weekDateTimeEnd)) {
          return this.$message.error('请选择资料区间');
        }
        params = {
          dateType: 'W',
          dateStart: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeEnd : this.weekDateTimeStart,
          dateEnd: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeStart : this.weekDateTimeEnd,
          orderBy: 'date',
          sort: 'desc',
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
      } else if (datepickertype === 3) {
        if (! this.monthDateTime.length) {
          return this.$message.error('请选择资料区间');
        }
        params = {
          dateType: 'M',
          dateStart: this.monthDateTime[0],
          dateEnd: this.monthDateTime[1],
          orderBy: 'date',
          sort: 'desc',
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        });
      }
      if (this.tabPosition === 1) {
        getWithdrawPeopleListReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
        getWithdrawPeopleSumReportAPI(temp).then(res => {
          this.tableDataSummary = res.data.data;
        }).catch(() => {});
      } else {
        getWithdrawSpacingListReportAPI(temp).then(res => {
          this.tableData = res.data.data;
        }).catch(() => {});
        getWithdrawSpacingSumReportAPI(temp).then(res => {
          this.tableDataSummary = res.data.data;
        }).catch(() => {});
      }
    },
    changeTab() {
      this.getData(this.timeRangeType);
    },
    openWithdrawAmountAvgImage() {
      this.chartTableData = {};
      this.withdrawAmountAvgTable = true;
      Object.assign(this.chartTableData, {
        columns: ['reportDate', 'withdrawAmountAvg'],
        rows: this.tableData,
      });
    },
    openResultImage() {
      this.chartTableData = {};
      this.withdrawAmountSpacingTable = true;
      Object.assign(this.chartTableData, {
        columns: ['金额区间', '提款用户'],
        rows: [
          { '金额区间': '0~100', '提款用户': this.tableDataSummary[0].withdrawSpacing100 },
          { '金额区间': '101~500', '提款用户': this.tableDataSummary[0].withdrawSpacing1000 },
          { '金额区间': '501~1,000', '提款用户': this.tableDataSummary[0].withdrawSpacing1000 },
          { '金额区间': '1,001~2,000', '提款用户': this.tableDataSummary[0].withdrawSpacing2000 },
          { '金额区间': '2,001~6,000', '提款用户': this.tableDataSummary[0].withdrawSpacing20000 },
          { '金额区间': '6,001~10,000', '提款用户': this.tableDataSummary[0].withdrawSpacing20000Up },
          { '金额区间': '10,001~20,000', '提款用户': this.tableDataSummary[0].withdrawSpacing500 },
          { '金额区间': '两万以上', '提款用户': this.tableDataSummary[0].withdrawSpacing6000 },
        ]
      });
    },
    openWithdrawUniPayMemberTable(data) {
      let params = {};
      this.withdrawUniPayMemberTable = true;
      params = {
        calculateDate: data.reportDate,
      }
      if (this.timeRangeType === 1) {
        params.dateType = 'D';
        getWithdrawUniPayMemberReportAPI(params).then(res => {
          this.detailTable = res.data.data;
        });
      } else if (this.timeRangeType === 2) {
        params.dateType = 'W';
        getWithdrawUniPayMemberReportAPI(params).then(res => {
          this.detailTable = res.data.data;
        });
      } else {
        params.dateType = 'M';
        getWithdrawUniPayMemberReportAPI(params).then(res => {
          this.detailTable = res.data.data;
        });
      }
    },
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 7);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.dayDateTime = [startDate, endDate];

    getWithdrawPeopleListReportAPI({
      dateType: 'D',
      dateStart: this.dayDateTime[0],
      dateEnd: this.dayDateTime[1],
      orderBy: 'date',
      sort: 'desc',
    }).then(res => {
      this.tableData = res.data.data;
    })
    getWithdrawPeopleSumReportAPI({
      dateType: 'D',
      dateStart: this.dayDateTime[0],
      dateEnd: this.dayDateTime[1],
    }).then(res => {
      this.tableDataSummary = res.data.data;
    });
  }
}
</script>
