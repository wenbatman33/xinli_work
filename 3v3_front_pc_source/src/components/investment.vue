<template lang="pug">
.page
  .headBg
  .p-3.h-100.d-flex.flex-column
    //- 標题
    h2.text-white.mt-3
      .icon(:style="`background-image: url(${acconutBookIcon})`")
      span.ml-2 投资纪录
    //- 狀態card
    .row.no-gutters.mt-4.mb-2
      .d-flex.overflow-auto.w-100(style="height: 100px;")
        .statusCard.d-flex.flex-row.mb-2
          .statusCard-icon
            img(:src="img_transaction")
          .info.d-flex.flex-column.justify-content-center
            .title.mb-2 交易笔数
            .content {{ count }} 笔
        .statusCard.d-flex.flex-row.mb-2
          .statusCard-icon
            img(:src="img_money")
          .info.d-flex.flex-column.justify-content-center
            .title.mb-2 金额总计
            .content ¥{{ amountSum | toMoney }}
        .statusCard.d-flex.flex-row.mb-2
          .statusCard-icon
            img(:src="img_money")
          .info.d-flex.flex-column.justify-content-center
            .title.mb-2(style="color: red") 有效流水
            .content ¥{{ bet_amount_sum | toMoney }}
        .statusCard.d-flex.flex-row.mb-2
          .statusCard-icon
            img(:src="img_plant")
          .info.d-flex.flex-column.justify-content-center
            .title.mb-2 预估获利
            .content ¥{{ orderProfitSum | toMoney }}
        .statusCard.d-flex.flex-row.mb-2
          .statusCard-icon
            img(:src="img_plant")
          .info.d-flex.flex-column.justify-content-center
            .title.mb-2(style="color: red") 实际损益
            .content ¥{{ realProfitSum | toMoney }}
    .d-flex.justify-content-between.align-items-center
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
      b-pagination.m-0(
        v-model="currentPage"
        :total-rows="count"
        :per-page="perPage"
        @change="getData"
      )
    //- 表格
    .table3V3Wrap.overflow-auto.mt-4(style="height: calc(100vh - 280px)")
      table.table3V3.mb-4
        thead
          tr
            th.text-center(style="white-space: nowrap") 单号
            th.text-center(style="white-space: nowrap") 交易时间
            th.text-center(style="white-space: nowrap") 开赛时间
            th.text-center(style="white-space: nowrap") 赛事
            th.text-center(style="white-space: nowrap") 内容
            th.text-center(style="white-space: nowrap") 交易金额
            th.text-center(style="white-space: nowrap") 获利%
            th.text-center(style="white-space: nowrap") 投资状态
            th.text-center(style="white-space: nowrap") 投资结果
            th.text-center(style="white-space: nowrap") 预估获利
            th.text-center(style="white-space: nowrap") 实际损益
        tbody
          tr(v-for='item in tableData')
            td.text-center {{ item.order_sn }}
            td.text-center {{ item.transaction_time | toDateTime }}
            td.text-center {{ item.esdt | toDateTime }}
            td.text-center {{ item.ht }} vs {{ item.ot }}
            td.text-center {{ item.name }}
            td.text-center ¥{{ item.amount | toMoney }}
            td.text-center {{ item.profit | toPercent }}
            td.text-center {{ statusMap[item.status] }}
            td.text-center {{ resultMap[item.result] }}
            td.text-center ¥{{ item.profit_money | toMoney }}
            td.text-center(v-if="item.result === 0")
            td.text-center(v-else)
              | ¥{{ item.real_profit | toMoney }}
</template>

<script>
import moment from 'moment';

export default {
  name: 'investment',
  data() {
    return {
      acconutBookIcon: `${process.env.VUE_APP_STATIC}/img/account-book-white.svg`,
      img_transaction: `${process.env.VUE_APP_STATIC}/img/pic-transaction.png`,
      img_money: `${process.env.VUE_APP_STATIC}/img/pic-money.png`,
      img_plant: `${process.env.VUE_APP_STATIC}/img/pic-plant.png`,
      pickerOptions: {
        disabledDate(time) {
          return time > moment().endOf('day') || time < moment().subtract(2, 'months').startOf('day');
        },
      },
      date: [
        moment().subtract(7, 'days').startOf('day'),
        moment().endOf('day'),
      ],
      currentPage: 1,
      perPage: 30,
      tableData: [],
      count: 0,
      amountSum: 0,
      bet_amount_sum: 0,
      orderProfitSum: 0,
      realProfitSum: 0,
      statusMap: {
        0: '成功',
        1: '取消',
      },
      resultMap: {
        0: '未出结果',
        1: '赢',
        2: '输',
      },
    };
  },
  methods: {
    moment,
    getData(page = 1) {
      this.$http.post('order/listAll', {
        page,
        size: this.perPage,
        start_time: moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss'),
        end_time: moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss'),
      }).then((res) => {
        this.tableData = res.data.data.list;
        this.count = res.data.data.total;
        this.currentPage = res.data.data.pageno;
        this.amountSum = res.data.data.order_amount_sum;
        this.bet_amount_sum = res.data.data.bet_amount_sum;
        this.orderProfitSum = res.data.data.order_profit_sum;
        this.realProfitSum = res.data.data.real_profit_sum;
      });
    },
  },
  created() {
    const data = {
      page: 1,
      size: this.perPage,
    };

    this.$http.post('order/listAll', data).then((res) => {
      this.tableData = res.data.data.list;
      this.count = res.data.data.total;
      this.currentPage = res.data.data.pageno;
      this.amountSum = res.data.data.order_amount_sum;
      this.bet_amount_sum = res.data.data.bet_amount_sum;
      this.orderProfitSum = res.data.data.order_profit_sum;
      this.realProfitSum = res.data.data.real_profit_sum;
    });
  },
};
</script>

<style lang="scss" scoped>
.statusCard{
  width: 224px;
  height: 88px;
  padding: 0 16px;
  margin-right: 16px;
  border-radius: 8px;
  box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
  background-color: #ffffff;
  flex-shrink: 0;
  .statusCard-icon{
    line-height: 88px;
    margin-right: 8px;
  }
  .info{
    .title{
      font-size: 10px;
      line-height: 1;
      color: #8e8e93;
    }
    .content{
      font-size: 16px;
      font-weight: 600;
    }
  }
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}
</style>
