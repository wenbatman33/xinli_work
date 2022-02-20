<template lang='pug'>
  .AgencyPlan
    .col-12.my-5
      h2 最佳佣金计画：我们提供直接收入＋二级代理业绩奖励
      p 只要是您推荐加入的会员，就可以让您获得佣金收入，
        br
        | 更棒的是经由您所推荐的会员，同样也成为代理后，我们将其视为您的『 二级代理 』
    .col-12.my-5
      h2 实际且灵活的二级代理制度
      p 我们将提供二级代理业绩的 10% 额外奖励给您
        br
        | 您不需要担心二级代理的佣金会因此而减少，额外奖励的费用由我们全额支付 ！
      table.AgencyTable.w-100
        tr
          th 
          th 月活跃人数 ≥ 3 人
          th 月活跃人数 ≥ 5 人
          th 月活跃人数 ≥ 25 人
          th 月活跃人数 ≥ 50 人
        tr
          td.tdBlack 
            span 每月佣金比例
          td.tdWhite.proportion 35%
          td.tdWhite.proportion 40%
          td.tdWhite.proportion 45%
          td.tdWhite.proportion 50%
        tr
          td.tdBlack 
            span 贡献净盈利
          td.tdBlack 
            span ¥1 ～ ¥50,000
          td.tdBlack 
            span ¥50,001 ～ ¥350,000
          td.tdBlack 
            span ¥350,001 ～ ¥1,300,000
          td.tdBlack 
            span ¥1,300,000 ～ Max
    .col-12.my-5
      h2 佣金计算方式
      table.AgencyTable.w-100
        tr
          th 结算方式
          th 佣金计算
        tr
          td.tdBlack 
            span 月结总佣金
          td.tdBlack 
            span ( 淨盈利：老虎机＋捕鱼＋棋牌类型游戏合计负盈利 - 会员红利 - 存提手续费 - 平台费用 ) × 佣金比例
            span.highLight ＋二级收入提成
    .col-12.my-5
      h2 二级代理佣金奖励
      img(src='/static/img/tgAgency/pic-reward.png')
      p.text-center
        .AgencyTableLine
          span 您可获得当月二级代理当月佣金提成
            br
            | 作为您的额外收入  
    .col-12.my-5
      h2 佣金细则
      p 
        span 1. 活跃用户是指当月存款金额超过 100 元，并且于相关游戏进行一次有效投注。
        br
        span 2. 缴交给平台的费用为总输赢的 15%。
        br
        span 3. 合作伙伴佣金将会派发至代理錢包，只需于代理后台按照提款操作即可。
        br
        span 4. 合作伙伴佣金最低提取金额为 100 元，佣金不满 100 元将累计至下月。
        br
        span 5. 您的老虎城帐号不能加入您的下线统计业绩。
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.AgencyPlan{
  h2 {
    color: #dfab31;
  }
  p{
    font-size: 16px;
    line-height: 2;
    color: #fff;
  }
}
.AgencyTableLine{
  color: #fff;
  width: 250px;
  margin: auto;
  border-top: 1px solid #dfab31;
  border-bottom: 1px solid #dfab31;
}
.AgencyTable{
  table, th, td{
    border: 1px solid #dfab31;
  }
  th{
    padding: 6px;
    background-color: rgba(223, 171, 49, 0.4);
    color: #fff;
  }
  .tdWhite{
    background: #fff;
    color: #000;
  }
  .tdBlack{
    background: #000;
    color: #fff;
  }
  td{
    padding: 6px;
    vertical-align: middle;
    background: #FFF
    // background: rgba(180,155,200,.24);
  }
  .proportion{
    font-size: 48px;
  }
  .highLight{
    color: #dfab31;
  }
}
</style>
