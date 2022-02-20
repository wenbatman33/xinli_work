<template lang='pug'>
  .AgencyPlan
    .col-12.my-5
      .title 最佳佣金计画：我们提供直接收入＋二级代理业绩奖励
      p 只要是您推荐加入的会员，就可以让您获得佣金收入，
        br
        | 更棒的是经由您所推荐的会员，同样也成为代理后，我们将其视为您的『 二级代理 』
    .col-12.my-5
      .title 实际且灵活的二级代理制度
      p 我们将提供二级代理业绩的 5% 额外奖励给您
        br
        | 您不需要担心二级代理的佣金会因此而减少，额外奖励的费用由我们全额支付 ！
      .AgencyTable
        table.w-100
          tr
            th 活跃会员
            th ≥ 3 人
            th ≥ 5 人
            th ≥ 5 人
            th ≥ 5 人
            th ≥ 15 人
            th ≥ 25 人
          tr
            td.tdBlack 
              span 佣金比例
            td.tdWhite.proportion 15%
            td.tdWhite.proportion 20%
            td.tdWhite.proportion 25%
            td.tdWhite.proportion 30%
            td.tdWhite.proportion 35%
            td.tdWhite.proportion 40%
          tr
            td.tdBlack 
              span 当月净盈利
            td.tdBlack 
              span ￥1 ～ ￥50,000
            td.tdBlack 
              span ¥50,001 ～ ¥150,000
            td.tdBlack 
              span ¥150,001 ～ ¥300,000
            td.tdBlack 
              span ¥300,001 ～ ¥500,000
            td.tdBlack 
              span ¥500,001 ～ ¥1,000,000
            td.tdBlack 
              span ¥1,000,001 ～ Max
    .col-12.my-5
      .title 佣金计算方式
      table.AgencyTable.w-100
        tr
          th 结算方式
          th 佣金计算
        tr
          td.tdBlack 
            span 月结总佣金
          td.tdBlack 
            span 当月净盈利(游戏平台合计负盈利-平台费用-存提手续费-会员红利-会员反水)x佣金比例+当月代理返水
            span.highLight + 二级当月佣金提成
    .col-12.my-5
      .title 二级代理佣金奖励
      img(:src='picImg')
      p.text-center
        .AgencyTableLine
          span 您可获得当月二级代理当月佣金提成
            br
            | 作为您的额外收入  
    .col-12.my-5
      .title 佣金细则
      p 
        span 1. 活跃用户是指当月存款金额超过 100 元，并且于相关游戏进行一次有效投注。
        br
        span 2. 缴交给平台的费用为总输赢的 13%。
        br
        span 3. 合作伙伴佣金将会派发至代理錢包，只需于代理后台按照提款操作即可。
        br
        span 4. 合作伙伴佣金最低提取金额为 100 元，佣金不满 100 元将累计至下月。
        br
        span 5. 您的梦工厂帐号不能加入您的代理会员统计业绩。
    .col-12.my-5
      el-button.btn.w-50(type='primary', @click='gotoIndex')
        span 返回首页
</template>
<script>
export default {
  data() {
    return {
      picImg: `${window.CDN_ASSETS}/static/img/agency/pic-reward.png`,
    };
  },
  methods: {
    gotoIndex() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
<style lang="scss" scoped>
.AgencyPlan{
  .title {
    font-size: 1.5rem;
    color: $DW_ColorLight;
    margin: 6px 0;
  }
  p{
    font-size: 14px;
    line-height: 2;
    color: #fff;
  }
}
.AgencyTableLine{
  color: #fff;
  width: 250px;
  margin: auto;
  border-top: 1px solid $DW_ColorLight;
  border-bottom: 1px solid $DW_ColorLight;
}
.AgencyTable{
  table, th, td{
    border: 1px solid $DW_ColorLight;
  }
  th{
    padding: 6px;
    background-color: $DW_ColorAlpha_30;
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
    font-size: 2rem;
  }
  .highLight{
    color: $DW_ColorLight;
  }
}
</style>
