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
        @change="getData()"
      )
    .row.mt-3
      el-scrollbar(v-if="logData.length")
        el-timeline
          el-timeline-item(
            v-for="(log, index) in logData",
            :key="index",
            :timestamp="`${log.logCreatedAt} ${log.userAccount}`",
            placement="top"
          )
            el-card
              h4 {{ log.logTitle }}
              h6 资料变动
              p(v-for="(before, key) of JSON.parse(log.logBeforeValue)")
                el-tag.mr-2(type="success") {{ key }}
                span {{ before }}
                i.el-icon-right.mx-3
                span {{ JSON.parse(log.logAfterValue)[key] }}
              template(v-if="log.logRouteParameters")
                h6 传递资料
                el-scrollbar
                  el-tag.mr-2(v-for="(parameter, key) in JSON.parse(log.logRouteParameters)", type="info")
                    span {{ key }}
                    i.el-icon-right.mx-3
                    span {{ parameter }}
      el-alert(v-else, type="warning", title="暂无资料", show-icon, center)
</template>

<script>
import { getUserActionLogAPI } from '@/api/acl/account';

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
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        id: this.$route.query.id,
        action_type: 'W',
        route_as: '群组设置'
      }

      if (this.datetime) {
        APIParams['starttime'] = this.datetime[0]
        APIParams['starttime'] = this.datetime[1];
      }

      getUserActionLogAPI(APIParams).then(response => {
        this.logData = response.data.data;
      })
    }
  }
}
</script>
