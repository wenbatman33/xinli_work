<template lang="pug">
  .container-fluid
    .d-flex.justify-content-center
      el-date-picker(
        v-model="datetime",
        type="datetimerange",
        :picker-options="pickerOptions",
        value-format="yyyy-MM-dd HH:mm:ss",
        :default-time="['00:00:00', '23:59:59']",
        start-placeholder="开始时间",
        end-placeholder="结束时间",
        align="right",
        @change="getData()",
        :clearable="false"
      )
    .row.mt-3
      el-table(:data="logData", height="75vh", stripe)
        el-table-column(type="expand")
          template(slot-scope="{ row }")
            el-form(label-position="left", class="log-table-expand")
              el-form-item(v-for="(content, key) in row.logContent", :label="key")
                span {{ content }}
        el-table-column(label="异动日期", width="180", align="center", prop="logCreatedAt")
        el-table-column(label="资料表", align="center", prop="logTable")
        el-table-column(label="ID", width="80", align="center", prop="logTableId")
        el-table-column(label="行为", align="center", prop="logActionType", width="80")
</template>

<script>
import { getAdminUserUseLogAPI } from '@/api/log';

export default {
  data() {
    return {
      datetime: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近1天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近3天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近1周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近1个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
        ]
      },
      logData: [],
    }
  },
  created() {
    const today = new Date();
    const todayString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split('T')[0];
    const lastMonth = new Date(today.setMonth(today.getMonth() - 3));
    const lastMonthString = new Date(lastMonth.getTime() - (lastMonth.getTimezoneOffset() * 60000 )).toISOString().split('T')[0];

    this.datetime = [`${lastMonthString} 00:00:00`, `${todayString} 23:59:59`];

    this.getData();
  },
  methods: {
    getData() {

      getAdminUserUseLogAPI({
        excuteUserid: this.$route.query.id,
        startTime: this.datetime[0],
        endTime: this.datetime[1]
      }).then(response => {
        this.logData = response.data.data;
      })
    }
  }
}
</script>
