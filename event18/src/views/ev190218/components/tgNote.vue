<template lang='pug'>
  .col-12.p-2.p-md-5.evNote
    .row.no-gutters.evHeader
      .col-12.text-center
        |活动条款
    .row.no-gutters.text-left
      //- .col-12.evCaption
        |evCaption
      .col-12.evContent
        ul.depiction
          li 参与本活动同时，即视同接受本活动之活动内容及相关条款，且无法同时参与18老虎城其他存款活动；所有存款、投注、流水计算与活动时间均以系统数据为准。本页内容最迟于三日内同步；全勤金红利请先于活动页面绑定账号方可符合领取资格，如未至本活动页绑定账号，前面完成的每日任务将不计算于活动中。
          li 活动期间内符合资格的会员，红利申请与提款要求将依照各平台规则：
          br
          p 
            a(:href='siteHost') 18老虎城 
            |：本活动红利将于条件达成后显示于『 
            a(:href='siteHost+"/member/bonus/3"') 领奖中心 
            |』，请会员在 5 日内至官网申请，否则视同放弃资格。活动一旦申请即无法取消，逾期未申请将视同放弃。每日回馈红利与全勤金红利需满足 8 倍红利倍数即可转账提款。此优惠 18老虎城 限量前 2,000 名。
          br
          p 
            a.LuckWebSite(@click.prevent='goLuckWebSite') 新利18Luck 
            |：当日达成任务后，次日中午 12 点后即可领取相对应红利；领奖时间统一在 3/8 23:59:59 前领奖完毕，否则视同放弃领奖资格。本活动回馈红利需满足棋牌游戏产品 3 倍有效流水即可申请提款。
          br
          li 活动中 18老虎城 红利可转入任何可选择转入之游戏产品 (随时间随机出现)；且有效流水计算方式依各游戏产品返水派发规范为主； 新利18Luck 之所有无效或被取消之投注都不列入有效流水计算，实际结算结果以系统结算数据为主。
          li 此活动只适用于拥有一个独立账户的玩家，同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，将保留取消或回收玩家优惠红利及其相关盈利的权利。
          li 优惠皆为玩家而设，若发现任何会员(个人/团体/组织)以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，且不事先作任何通知。
          li 官方禁止未满 18 周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有红利彩金及账户；并有权在不事先通知玩家的情况下，延长、缩短、终止或修改该活动，且为避免个人文字理解差异，官方拥有优惠活动最终解释权。
          li 更多优惠请查看「 
            a(:href='siteHost+"/news"') 18老虎城 
            |」与「 
            a.LuckWebSite(@click.prevent='goLuckWebSite') 新利18Luck 
            |」公告，或随时咨询「 在线客服 」。
</template>
<script>
import axios from 'axios';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    ...mapState('index', [
      'siteHost',
    ]),
  },
  methods: {
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    goLuckWebSite() {
      if (this.isMobile) {
        window.open('https://m.xl18.org/');
      } else {
        window.open('https://www.xl18.org/zh-cn/');
      }
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
  },
};
</script>
<style scoped lang='scss'>
</style>
