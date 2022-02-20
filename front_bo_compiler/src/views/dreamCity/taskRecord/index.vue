<template lang="pug">
  .container-fluid
    div(v-if="! date")
      .d-flex.justify-content-around.align-items-top
        el-radio-group(v-model="type", size="medium", @change="getData()")
          el-radio-button(:label="1") 依项目
          el-radio-button(:label="2") 依数量
        el-date-picker.mx-3(
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
      .row
        el-table(:data="tableData", border, stripe, height="75vh")
          template(v-if="type === 1")
            el-table-column(label="日期", prop="date", align="center", width="120")
            el-table-column(label="会员总数", align="center")
              span(slot-scope="{ row }") {{ row.totalMember | formatMoney }}
            el-table-column(label="完成任一任务人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedAnyTask(row.date)")
                | {{ row.totalCount | formatMoney }}
            el-table-column(label="完善资料人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTask(0, row.date)")
                | {{ row.totalPersonInfo | formatMoney }}
            el-table-column(label="签到人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTask(1, row.date)")
                | {{ row.totalSignature | formatMoney }}
            el-table-column(label="分享人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTask(2, row.date)")
                | {{ row.totalShare | formatMoney }}
            el-table-column(label="红包人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTask(3, row.date)")
                | {{ row.totalBonus | formatMoney }}
          template(v-else)
            el-table-column(label="日期", prop="date", align="center", width="120")
            el-table-column(label="会员总数", align="center")
              span(slot-scope="{ row }") {{ row.totalMember | formatMoney }}
            el-table-column(label="完成0项任务人数", align="center")
              span(slot-scope="{ row }") {{ row.success0 | formatMoney }}
            el-table-column(label="完成1项任务人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTaskCount(1, row.date)")
                | {{ row.success1 | formatMoney }}
            el-table-column(label="完成2项任务人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTaskCount(2, row.date)")
                | {{ row.success2 | formatMoney }}
            el-table-column(label="完成3项任务人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTaskCount(3, row.date)")
                | {{ row.success3 | formatMoney }}
            el-table-column(label="完成4项任务人数", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="showCompletedTaskCount(4, row.date)")
                | {{ row.success4 | formatMoney }}
    template(v-if="date")
      template(v-if="count")
        .d-flex.justify-content-between.align-items-center
          el-page-header.mb-2(@back="goBack", :content="`${date} 完成${count}项任务名单`")
        .row
          el-table(:data="completedTaskCountTableData", border, stripe, height="75vh")
            el-table-column(label="会员帐号", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="goToCashLog(row.memberAccount)") {{ row.memberAccount }}
            el-table-column(label="每日签到", prop="completeCount", align="center")
            el-table-column(label="每日分享/次", prop="shareCount", align="center")
            el-table-column(label="每日红包/次", prop="bonusCount", align="center")
            el-table-column(label="当日获得点数", align="center")
              span(slot-scope="{ row }") {{ row.obtainPoint | formatMoney }}
            el-table-column(label="当日消耗点数", align="center")
              span(slot-scope="{ row }") {{ row.consumePoint | formatMoney }}
      template(v-if="taskType > -1")
        .d-flex.justify-content-between.align-items-center
          el-page-header.mb-2(@back="taskGoBack", :content="`${date}【${taskList[taskType]}】`")
        .row
          el-table(:data="completedTaskTableData", border, stripe, height="75vh")
            el-table-column(label="会员帐号", align="center")
              el-link.text-primary(slot-scope="{ row }", @click="goToCashLog(row.memberAccount)") {{ row.memberAccount }}
            el-table-column(label="获得点数", align="center")
              span(slot-scope="{ row }") {{ row.sum | formatMoney }}
            el-table-column(label="梦基金馀额", align="center")
              span(slot-scope="{ row }") {{ row.memberRemainPoint | formatMoney }}
            el-table-column(label="备注", prop="note", align="center", show-overflow-tooltip)
</template>

<script>
import {
  getTaskRecordAPI,
  getCompletedAnyTaskAPI,
  getCompletedTaskCountAPI,
  getCompletedTaskAPI
} from '@/api/dreamCity/record';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
      type: 1,
      date: '',
      count: 0,
      completedTaskCountTableData: [],
      taskType: -1,
      taskList: {
        0: '完善资料人数',
        1: '签到人数',
        2: '分享人数',
        3: '红包人数'
      }
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
      getTaskRecordAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_date: this.timeRange[0],
        end_date: this.timeRange[1],
        type: this.type
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    showCompletedAnyTask(date) {
      getCompletedAnyTaskAPI({ date }).then(response => {
        this.count = '任一';
        this.date = date;
        this.completedTaskCountTableData = response.data.data;
      });
    },
    showCompletedTaskCount(count, date) {
      getCompletedTaskCountAPI(count, { date }).then(response => {
        this.count = count;
        this.date = date;
        this.completedTaskCountTableData = response.data.data;
      });
    },
    showCompletedTask(type, date) {
      getCompletedTaskAPI({ type, date }).then(response => {
        this.taskType = type;
        this.date = date;
        this.completedTaskTableData = response.data.data;
      });
    },
    goBack() {
      this.date = '';
      this.count = 0;
    },
    taskGoBack() {
      this.date = '';
      this.taskType = -1;
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
