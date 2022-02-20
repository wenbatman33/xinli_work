<template lang="pug">
.page
  .headBg
  .mt-3.p-3
    //- 標题
    h2.text-white
      img(:src="img_stock")
      span.ml-2 历史帐务
    //- 狀態card
    .row.no-gutters.my-4
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(0)", :class="{active: selectBtnNum===0}")
        span.mr-2
          img(:src="img_weekly")
        span 本周帐务
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(1)", :class="{active: selectBtnNum===1}")
        span.mr-2
          img(:src="img_weekly")
        span 上周帐务
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(2)", :class="{active: selectBtnNum===2}")
        span.mr-2
          img(:src="img_monthly")
        span 本周帐务
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(3)", :class="{active: selectBtnNum===3}")
        span.mr-2
          img(:src="img_monthly")
        span 上月帐务
    //- 表格
    .row.no-gutters.my-4
      .table3V3Wrap
        table.table3V3
          thead
            tr
              th.text-center 帐务日期
              th.text-center 交易金额
              th.text-center 实货量
              th.text-center 投资结算
              th.text-center
          tbody
            tr(v-for='item in tableData')
              td.text-center {{item.creatTimeAt}}
              td.text-center {{item.amount}}
              td.text-center {{item.items}}
              td.text-center {{item.bonus}}
              td.text-center
                router-link(to="/historydetail") 查看
          tfoot
            tr
              td.text-center 共有 {{tableData.length}} 笔资料
              td.text-center
              td.text-center
              td.text-center
              td.text-center
</template>

<script>
export default {
  name: 'history',
  components: {},
  data() {
    return {
      selectBtnNum: 0,
      img_stock: `${process.env.VUE_APP_STATIC}/img/stock.png`,
      img_weekly: `${process.env.VUE_APP_STATIC}/img/weekly.svg`,
      img_monthly: `${process.env.VUE_APP_STATIC}/img/monthly.svg`,
      imgUrl: `${process.env.VUE_APP_STATIC}/img/pic-transaction.png`,
      tableData: [
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
        {
          creatTimeAt: '2020/03/04 02:26:20',
          amount: '$$$$$$$$$',
          items: '100',
          game: '比赛队伍名称 vs 比赛队伍名称',
          bonus: '$$$$$$$$$',
          result: '内容文字',
        },
      ],
    };
  },
  methods: {
    clickHandle(num) {
      this.selectBtnNum = num;
    },
  },
};
</script>
<style lang="scss" scoped>
.active{
  color: #ffffff;
  border-color: #f76b1c !important;
  background: #f76b1c !important;
  span{
    color: #ffffff;
  }
  img{
    filter:invert(100%);
  }
}
.statusCard{
  width: 224px;
  height: 88px;
  padding: 0 16px;
  margin-right: 16px;
  border-radius: 8px;
  box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
  background-color: #ffffff;
  .icon{
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
</style>
