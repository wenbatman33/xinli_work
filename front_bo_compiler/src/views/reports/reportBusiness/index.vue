<template lang="pug">
  .deposit
    .d-flex.justify-content-around.align-items-center.mb-4
      .d-flex.justify-content-around.align-items-center
        el-radio(v-model="rangeType", label="D") 日
        el-radio(v-model="rangeType", label="W") 周
        el-radio(v-model="rangeType", label="M") 月
      el-date-picker(
        v-if="rangeType === 'D'"
        v-model="date['D']",
        type="daterange",
        value-format="yyyy-MM-dd",
        range-separator="至",
        start-placeholder="开始日期"
        end-placeholder="结束日期",
        :clearable="false"
      )
      .d-flex(v-else-if="rangeType === 'W'")
        el-date-picker.mr-4(
          :value="date['W'][0]",
          @input="value => date['W'][0] = $options.filters.formatWeek(value)",
          type="week",
          format="yyyy 第 WW 周",
          placeholder="选择周",
          :clearable="false"
        )
        el-date-picker(
          :value="date['W'][1]",
          @input="value => date['W'][1] = $options.filters.formatWeek(value)",
          type="week",
          format="yyyy 第 WW 周",
          placeholder="选择周",
          :clearable="false"
        )
      el-date-picker(
        v-else-if="rangeType === 'M'"
        v-model="date['M']",
        type="monthrange",
        value-format="yyyy-MM-dd",
        start-placeholder="开始月份",
        end-placeholder="结束月份",
        :clearable="false"
      )
      el-button(@click="getData()" size="small") 搜寻
    .d-flex.justify-content-end(v-if="total.length > 0 && total[0].reportMaxUpdateAt") 最后更新时间：{{ total[0].reportMaxUpdateAt }}
    //- 報表 总计
    .d-flex.justify-content-end
      el-button(type="info", size="mini", icon="el-icon-s-data", @click="memberDistributionVisible = true") 查看人數分析圖
    .d-flex
      el-table(:data="total", border)
        el-table-column(v-if="fieldPerms.repBusinessBetSum", label="总投注金额", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessBetSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessWinSum", label="公司盈利", align="center")
          span(slot-scope="{ row }", :class="row.repBusinessWinSum < 0 ? 'text-danger' : ''")
            | {{ row.repBusinessWinSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessKillPercent", label="杀数", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessKillPercent | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessDepositSum", label="总存款", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessDepositSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessWithdrawSum", label="总提款", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessWithdrawSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessDepoWithDiffer", label="存提差", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessDepoWithDiffer | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessBonusSum", label="红利派发金额", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openBonusTable()") {{ row.repBusinessBonusSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repMemberSignUpCnt", label="注册人数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openMemberTable('singUp')") {{ row.repMemberSignUpCnt | formatMoney }}
        el-table-column(v-if="fieldPerms.repMemberActiveCnt", label="活跃人数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openMemberTable('activeMember')") {{ row.repMemberActiveCnt | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessBetCnt", label="唯一投注人数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openMemberTable('memberCnt')") {{ row.repBusinessMemberCnt | formatMoney }}
        el-table-column(v-if="fieldPerms.repMemberSignUpAndDepositCnt", label="注册且存款", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openMemberTable('depositMember')") {{ row.repMemberSignUpAndDepositCnt | formatMoney }}
    //- 報表 本體
    .d-flex.mt-2
      el-table(:data="tableData", border)
        el-table-column(v-if="fieldPerms.repBusinessGameType", label="类型", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openTypeTable(row.repBusinessGameType)")
            | {{ row.repBusinessGameType.display }}
        el-table-column(v-if="fieldPerms.repBusinessGameGroup", label="厂商", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openGroupTable(row.repBusinessGameGroup)")
            | {{ row.repBusinessGameGroup.display }}
        el-table-column(v-if="fieldPerms.repBusinessBetSum", align="center")
          template(slot="header")
            span 投注金额
            i.el-icon-pie-chart.c-pointer.text-primary.ml-1(@click="openPieOrLine('repBusinessBetSum')")
          span(slot-scope="{ row }") {{ row.repBusinessBetSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessWinSum", align="center")
          template(slot="header")
            span 公司盈利
            i.el-icon-data-analysis.c-pointer.text-primary.ml-1(@click="openPieOrLine('repBusinessWinSum')")
          span(slot-scope="{ row }", :class="row.repBusinessWinSum < 0 ? 'text-danger' : ''")
            | {{ row.repBusinessWinSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessKillPercent", align="center")
          template(slot="header")
            span 杀数
            i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openPieOrLine('repBusinessKillPercent')")
          span(slot-scope="{ row }") {{ row.repBusinessKillPercent | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessMemberCnt", align="center")
          template(slot="header")
            span 唯一投注人数
            i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openPieOrLine('repBusinessMemberCnt')")
          el-link.text-primary(
            slot-scope="{ row }",
            @click="openMemberTable('memberCnt', row.repBusinessGameType.value, row.repBusinessGameGroup.value)"
          ) {{ row.repBusinessMemberCnt | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessBetCnt", align="center")
          template(slot="header")
            span 投注次数
            i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openPieOrLine('repBusinessBetCnt')")
          span(slot-scope="{ row }") {{ row.repBusinessBetCnt | formatMoney }}
    //- 查看人数分析 长条图
    el-dialog(:visible.sync="memberDistributionVisible")
      ve-histogram(
        :data="memberDistributionData",
        :settings="{ yAxisType: ['KMB']}",
        :extend="{ series: { label: { show: true, position: 'inside' }} }",
        :tooltip-visible="false",
      )
    //- 注册人数 活跃人数 唯一投注人数 会员table
    el-dialog(:visible.sync="memberTableVisible", top="5vh", width="90%", :title="memberTableTitle", @close="memberTableClose", :modal-append-to-body="false")
      span(v-if="date[rangeType].length !== 0") {{ date[rangeType][0] }} ~ {{ date[rangeType][1] }}
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
    //- 红利列表
    el-dialog(:visible.sync="bonusTableVisible", top="5vh", title="营运报表 / 红利派发人数", :modal-append-to-body="false")
      span(v-if="date[rangeType].length !== 0") {{ date[rangeType][0] }} ~ {{ date[rangeType][1] }}
      el-table(:data="bonusData", height="66vh")
        el-table-column(label="日期", prop="reportDate", align="center")
        el-table-column(v-if="fieldPerms.repBusinessBonusSum", label="红利派发金额", align="center")
          span(slot-scope="{ row }") {{ row.repBusinessBonusSum | formatMoney }}
        el-table-column(v-if="fieldPerms.repBusinessMemberCnt", label="红利派发人数", prop="repBusinessMemberCnt", align="center")
    //- 投注金额 圆饼图; 杀数、唯一投注、投注次数 折线图; 盈利 長條圖;
    el-dialog(:visible.sync="pieOrLineVisible", :title="pieOrLineTitle", :modal-append-to-body="false")
      el-switch(
        v-model="orderByType",
        active-value="repBusinessGameGroup",
        active-text="依厂商",
        active-color="#13ce66",
        inactive-value="repBusinessGameType",
        inactive-text="依游戏类型",
        inactive-color="#13ce66",
        @change="openPieOrLine()"
      )
      ve-pie(
        v-if="pieOrLineDataField === 'repBusinessBetSum'",
        :data="pieOrLineData",
      )
      ve-histogram(
        v-else-if="pieOrLineDataField === 'repBusinessWinSum'",
        :data="pieOrLineData",
        :settings="{labelMap: {value: '盈利'}}"
      )
      ve-line(v-else, :data="pieOrLineData", :legend-visible="false")
    //- 类型、厂商 报表
    el-dialog(:visible.sync="typeAndGroupTableVisible", :title="typeAndGroupTableTitle", width="90%", :modal-append-to-body="false")
      el-table(:data="typeAndGroupTableData", border)
        el-table-column(label="合計", align="center")
          el-table-column(label="日期", prop="reportDate", align="center", width="180")
        el-table-column(align="center")
          span(slot="header") {{ typeAndGroupTableTotal.repBusinessBetSum | formatMoney }}
          el-table-column(v-if="fieldPerms.repBusinessBetSum", align="center")
            template(slot="header")
              span 投注金额
              i.el-icon-pie-chart.c-pointer.text-primary.ml-1(@click="openTypeAndGroupPieOrLine('repBusinessBetSum')")
            span(slot-scope="{ row }") {{ row.repBusinessBetSum | formatMoney }}
        el-table-column(align="center")
          span(slot="header") {{ typeAndGroupTableTotal.repBusinessWinSum | formatMoney }}
          el-table-column(v-if="fieldPerms.repBusinessWinSum", align="center")
            template(slot="header")
              span 公司盈利
              i.el-icon-data-analysis.c-pointer.text-primary.ml-1(@click="openTypeAndGroupPieOrLine('repBusinessWinSum')")
            span(slot-scope="{ row }", :class="row.repBusinessWinSum < 0 ? 'text-danger' : ''")
              | {{ row.repBusinessWinSum | formatMoney }}
        el-table-column(align="center")
          span(slot="header") {{ typeAndGroupTableTotal.repBusinessKillPercent | formatMoney }}
          el-table-column(v-if="fieldPerms.repBusinessKillPercent", align="center")
            template(slot="header")
              span 杀数
              i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openTypeAndGroupPieOrLine('repBusinessKillPercent')")
            span(slot-scope="{ row }") {{ row.repBusinessKillPercent | formatMoney }}
        el-table-column(align="center")
          span(slot="header") X
          el-table-column(v-if="fieldPerms.repBusinessMemberCnt", align="center")
            template(slot="header")
              span 唯一投注人数
              i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openTypeAndGroupPieOrLine('repBusinessMemberCnt')")
            span(slot-scope="{ row }") {{ row.repBusinessMemberCnt | formatMoney }}
        el-table-column(align="center")
          span(slot="header") {{ typeAndGroupTableTotal.repBusinessBetCnt | formatMoney }}
          el-table-column(v-if="fieldPerms.repBusinessBetCnt", align="center")
            template(slot="header")
              span 投注次数
              i.el-icon-s-marketing.c-pointer.text-info.ml-1(@click="openTypeAndGroupPieOrLine('repBusinessBetCnt')")
            span(slot-scope="{ row }") {{ row.repBusinessBetCnt | formatMoney }}
    //- 游戏类型或厂商报表内的 投注金额、盈利 圆饼图 杀数、唯一投注、投注次数 折线图
    el-dialog(:visible.sync="typeAndGroupPieOrLineVisible", :title="typeAndGroupPieOrLineTitle", :modal-append-to-body="false")
      ve-pie(
        v-if="typeAndGroupPieOrLineDataField === 'repBusinessBetSum'",
        :data="typeAndGroupPieOrLineData"
      )
      ve-histogram(
        v-else-if="typeAndGroupPieOrLineDataField === 'repBusinessWinSum'",
        :data="typeAndGroupPieOrLineData",
        :settings="{labelMap: {value: '盈利'}}"
      )
      ve-line(v-else, :data="typeAndGroupPieOrLineData", :legend-visible="false")
</template>

<script>
import {
  getBusinessReportAPI,
  getBusinessReportTotalAPI,
  getBusinessReportMemberAPI,
  getBusinessReportBonusListAPI,
  getBusinessReportByTypeAPI,
  getBusinessReportByGroupAPI
} from '@/api/reports/business';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    return {
      rangeType: 'D',
      date: {
        'D': [],
        'W': {
          0: '',
          1: ''
        },
        'M': []
      },
      tableData: [],
      total: [],
      memberTable: [],
      memberDistributionVisible: false,
      memberTableVisible: false,
      memberTableTitle: '',
      memberTableType: '',
      memberTableGameType: null,
      memberTableGameGroup: null,
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      bonusData: [],
      bonusTableVisible: false,
      orderByType: 'repBusinessGameGroup',
      pieOrLineVisible: false,
      pieOrLineData: {},
      pieOrLineTitle: '',
      pieOrLineDataField: '',
      typeAndGroupTableVisible: false,
      typeAndGroupTableData: [],
      typeAndGroupTableTotal: {},
      typeAndGroupTableTitle: '',
      typeAndGroupPieOrLineVisible: false,
      typeAndGroupPieOrLineData: {},
      typeAndGroupPieOrLineTitle: '',
      typeAndGroupPieOrLineDataField: '',
    }
  },
  computed: {
    memberDistributionData() {
      if (! this.total.length) return;
      return {
        columns: ['类型', '人数'],
        rows: [
          { '类型': '注册人数', '人数': this.total[0].repMemberSignUpCnt },
          { '类型': '唯一投注人数', '人数': this.total[0].repBusinessMemberCnt },
          { '类型': '注册存款人数', '人数': this.total[0].repMemberSignUpAndDepositCnt },
        ]
      }
    }
  },
  methods: {
    getData() {
      const date = this.computedDate(this.date[this.rangeType][0], this.date[this.rangeType][1]);
      const params = {
        dateType: this.rangeType,
        startDate: date[0],
        endDate: date[1]
      };

      getBusinessReportAPI(params).then(response => {
        this.tableData = response.data.data;
      });

      getBusinessReportTotalAPI(params).then(response => {
        this.total = response.data.data;
      })
    },
    computedDate(fitst, second) {
      return fitst > second ? [second, fitst] : [fitst, second];
    },
    openMemberTable(type, gameType, gameGroup) {
      const date = this.computedDate(this.date[this.rangeType][0], this.date[this.rangeType][1]);
      const memberTableType = type || this.memberTableType;
      gameType = gameType || this.memberTableGameType;
      gameGroup = gameGroup || this.memberTableGameGroup;
      if (gameType) this.memberTableGameType = gameType;
      if (gameGroup) this.memberTableGameGroup = gameGroup;

      getBusinessReportMemberAPI[memberTableType]({
        dateType: this.rangeType,
        startDate: date[0],
        endDate: date[1],
        per_page: this.pageSize,
        page: this.currentPage,
        ...(gameType && { game_type_id: gameType }),
        ...(gameGroup && { game_group_id: gameGroup }),
      })
      .then(response => {
        this.memberTable = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;

        this.memberTableVisible = true;
        this.memberTableType = memberTableType;
        this.memberTableTitle = {
          singUp: '营运报表 / 注册人数',
          activeMember: '营运报表 / 活跃人数',
          memberCnt: '营运报表 / 唯一投注人数',
          depositMember: '营运报表 / 注册且存款人数',
        }[memberTableType];
      })
    },
    memberTableClose() {
      this.currentPage = 1;
      this.memberTableGameType = null;
      this.memberTableGameGroup = null;
    },
    openBonusTable() {
      const date = this.computedDate(this.date[this.rangeType][0], this.date[this.rangeType][1]);

      getBusinessReportBonusListAPI({
        dateType: this.rangeType,
        startDate: date[0],
        endDate: date[1],
        sort: 'created_at'
      })
      .then(response => {
        this.bonusData = response.data.data;
        this.bonusTableVisible = true;
      })
    },
    openPieOrLine(dataField) {
      dataField = dataField || this.pieOrLineDataField

      this.pieOrLineData = {
        columns: ['key', 'value'],
        rows: this.tableData.reduce((result, item) => {
          const key = item[this.orderByType].display || '其他';
          const value = item[dataField];
          const index = result.findIndex(el => el.key === key);

          if (index === -1) {
            result.push({ key, value });
          } else {
            result[index].value += value;
          }

          return result;
        }, []),
      };

      this.pieOrLineTitle = {
        repBusinessBetSum: '投注金额比例',
        repBusinessWinSum: '盈利比例',
        repBusinessBetCnt: '唯一投注人数',
        repBusinessMemberCnt: '投注次数',
        repBusinessKillPercent: '杀数'
      }[dataField];

      this.pieOrLineDataField = dataField;
      this.pieOrLineVisible = true;
    },
    openTypeTable(gameType) {
      const date = this.computedDate(this.date[this.rangeType][0], this.date[this.rangeType][1]);
      const params = {
        dateType: this.rangeType,
        startDate: date[0],
        endDate: date[1],
        game_type_id: gameType.value
      };

      Promise.all([getBusinessReportByTypeAPI.table(params), getBusinessReportByTypeAPI.total(params)])
      .then(response => {
        this.typeAndGroupTableData = response[0].data.data;
        this.typeAndGroupTableTotal = response[1].data.data[0];
        this.typeAndGroupTableTitle = `营运报表 / ${gameType.display}`;
        this.typeAndGroupTableVisible = true;
      });
    },
    openGroupTable(gameGroup) {
      const date = this.computedDate(this.date[this.rangeType][0], this.date[this.rangeType][1]);
      const params = {
        dateType: this.rangeType,
        startDate: date[0],
        endDate: date[1],
        game_group_id: gameGroup.value
      };

      Promise.all([getBusinessReportByGroupAPI.table(params), getBusinessReportByGroupAPI.total(params)])
      .then(response => {
        this.typeAndGroupTableData = response[0].data.data;
        this.typeAndGroupTableTotal = response[1].data.data[0];
        this.typeAndGroupTableTitle = `营运报表 / ${gameGroup.display}`;
        this.typeAndGroupTableVisible = true;
      });
    },
    openTypeAndGroupPieOrLine(dataField) {
      dataField = dataField || this.typeAndGroupPieOrLineDataField

      this.typeAndGroupPieOrLineData = {
        columns: ['key', 'value'],
        rows: this.typeAndGroupTableData.map(item => {
          return {
            key: item.reportDate,
            value: item[dataField]
          }
        }),
      };

      this.typeAndGroupPieOrLineTitle = {
        repBusinessBetSum: '投注金额比例',
        repBusinessWinSum: '盈利比例',
        repBusinessBetCnt: '唯一投注人数',
        repBusinessMemberCnt: '投注次数',
        repBusinessKillPercent: '杀数'
      }[dataField];

      this.typeAndGroupPieOrLineDataField = dataField;
      this.typeAndGroupPieOrLineVisible = true;
    }
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 7);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.date['D'] = [startDate, endDate];

    this.getData();
  }
}
</script>
