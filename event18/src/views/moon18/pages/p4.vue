<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.content.py-3
    .col.px-lg-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 活动说明
          ||
        .col-12.eventcaption.pt-md-0.pt-2
          p 邀请好友大吉大利，好友首储后可与好友共享 20% 吃机金回馈，好友越多吃机金就越多，返还无上限！
        .col-12.eventcontent.py-md-1.py-1
          .row.no-gutters.d-flex.justify-content-center
            .col-md-10.col-12.datalist
              ul.row.no-gutters.d-flex.justify-content-between.text-center
                li.col-2.py-2.px-1 对象
                li.col-2.py-2.px-1 存款金额
                li.col-4.py-2.px-1 吃机金回馈比例
                li.col-2.py-2.px-1 提款有效流水限制
                li.col-2.py-2.px-1 提款最低限额
              ul.row.no-gutters.d-flex.justify-content-between.text-center
                li.col-2.py-2.px-1 您与好友
                li.col-2.py-2.px-1 ≧  100
                li.col-4.py-2.px-1 您与好友首笔存款 10%
                li.col-2.py-2.px-1 20 倍
                li.col-2.py-2.px-1 回饋金X10
        .col-12.pb-md-5.pb-3
          .row.no-gutters.d-flex.justify-content-center
            .col-md-10.col-12.datalist.text-left.des
              span ＊第三重送的回馈金提款最低限额说明：
              br
              span 1、宝宝A存款100元，获得红利18元后，提款至少需要100+18X10=280元以上
              br
              span 2、宝宝B存款100元，先提款100元后，申请获得红利18元，再次提款至少需要18X10=180元以上 
        .col-12.eventcontent.pb-md-5.pb-3
          p ＊受邀好友需为 2018/9/22 12:00 后新创 18老虎城 帐号且绑定银行卡的会员（ 新利18快速注册会员除外 ）
          p ＊邀请者与受邀好友无法互相申请（例：A 首储后填写B的邀请码，B 之后首储无法再填写 A 的邀请码，但可以填写他人的邀请码）
  .row.no-gutters.notes.py-md-5.py-2.px-3.d-flex.flex-column.justify-content-center.text-center
    .col-12.py-5
      span.notestitle 活动条款
    .col-md-8.offset-md-2.col-12.pb-4.pl-3.text-left
      ol
        li 受邀好友需于 2018/9/30 前、邀请者需于 2018/10/1 前申请完毕，一旦申请即无法取消，逾期未申请将视同放弃。
        li 非老虎机类游戏、多旋转老虎机、老虎机奖金翻倍投注将不计算在有效流水内。
        li 每位新会员只能享有一次优惠，且同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，18老虎城将保留或取消会员优惠彩金的权利。
        li 任何会员【 个人/团体/组织 】以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不需事先作任何通知。
        li 18老虎城禁止未达 18 周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有彩金及账户。
        li 18老虎城官方有权在不事先通知玩家的情况下，延长，缩短，终止或修改该活动，对本活动拥有最终解释权。
        li 更多 18老虎城 优惠请随时咨询 在线客服 
          |或查看 
          a(:href='siteHost+"/news"') 18老虎城公告 
          |。
  tgFooter
</template>
<script>
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('index', [
      'siteHost',
    ]),
  },
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
  },
};
</script>
<style lang="scss" scoped>
.des{
  span{
    font-size: 12px;
    color: #fff;
  }
}
</style>

