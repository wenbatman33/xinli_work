<template lang="pug">
.page
  .headBg
  .p-3.h-100.d-flex.flex-column
    //- 標题
    h2.text-white.mt-3
      .icon(:style="`background-image: url(${transactionIcon})`")
      span.ml-2 交易记录
    //- 搜寻
    .row.no-gutters.my-4.d-flex.justify-content-between.align-items-center
      b-form-select.w-25(
        v-model="type"
        :options="filterOptions"
        @change="getData(type)"
      )
      el-date-picker(
        v-model="date"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions"
        @change="getData(1)"
      )
    //- 表格
    .table3V3Wrap.overflow-auto(style="height: calc(100vh - 220px)")
      table.table3V3
        thead
          tr
            th.text-center(style="white-space: nowrap;") 交易日期
            th.text-center(style="white-space: nowrap;") 交易订单号
            th.text-center(style="white-space: nowrap;") 交易类别
            th.text-center(style="white-space: nowrap;") 交易金额
            th.text-center(style="white-space: nowrap;") 交易状态
            th.text-center(style="white-space: nowrap;") 备注
            th.text-center(style="white-space: nowrap;") 馀额
        tbody
          tr(v-for="item in tableData")
            td.text-center {{ item.created_at | toDateTime }}
            td.text-center {{ item.wallet_order_sn }}
            td.text-center {{ typeMap[item.type] }}
            td.text-center ¥{{ item.amount | toMoney }}
            td.text-center {{ status[item.status] }}
            td.text-center {{ item.remark_for_user }}
            td.text-center ¥{{ item.balance | toMoney }}
    b-pagination.mt-3.mb-0.d-flex.justify-content-end(
      v-model="currentPage"
      :total-rows="count"
      :per-page="perPage"
      @change="getData"
    )
</template>

<script>
import moment from 'moment';

export default {
  name: 'transaction',
  data() {
    return {
      transactionIcon: `${process.env.VUE_APP_STATIC}/img/transaction-white.svg`,
      filterOptions: [
        {
          value: null,
          text: '全部',
        },
        {
          value: 1,
          text: '充值',
        },
        {
          value: 2,
          text: '提现',
        },
        // {
        //   value: 3,
        //   text: '投资',
        // },
        {
          value: 4,
          text: '红利',
        },
        {
          value: 5,
          text: '手动上分',
        },
        {
          value: 6,
          text: '异常扣除',
        },
        // {
        //   value: 7,
        //   text: '派彩',
        // },
        // {
        //   value: 8,
        //   text: '保本退回',
        // },
        {
          value: 9,
          text: '退水',
        },
        // {
        //   value: 10,
        //   text: '取消订单',
        // },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time > moment().endOf('day') || time < moment().subtract(2, 'months').startOf('day');
        },
      },
      date: [
        moment().subtract(7, 'days').startOf('day'),
        moment().endOf('day'),
      ],
      typeMap: {
        1: '充值',
        2: '提现',
        3: '投资',
        4: '红利',
        5: '手动上分',
        6: '异常扣除',
        7: '派彩',
        8: '保本退回',
        9: '退水',
        10: '取消订单',
      },
      status: {
        1: '审核中',
        2: '审核中',
        3: '成功',
        4: '失敗',
        5: '超时失效',
        6: '处理中',
      },
      currentPage: 1,
      perPage: 30,
      count: 0,
      tableData: [],
      type: null,
    };
  },
  created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.getData();
  },
  methods: {
    moment,
    getData(page = 1) {
      const params = {
        pageno: page,
        pagesize: this.perPage,
        type: this.type,
        startTime: moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss'),
      };

      this.$http.get('member/wallet', { params }).then((res) => {
        this.tableData = res.data.data.list;
        this.count = res.data.data.total;
        this.currentPage = res.data.data.pageno;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}
</style>
