<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container
    .row.mt-5.d-flex.justify-content-center
      .col-10.whiteTableHeader.text-center
        img.tiger(src='/static/ev181001/tiger.png')
    .row.py-5.px-2.mainWrap.d-flex.justify-content-center
      .col-12.text-center
        img(src='/static/ev181001/title_1.png')
        p.my-5 2018/10/1 00 : 00 ～ 2018/10/10 23 : 59 (GMT+8)
      .col-md-10.col-11.datalist.p-0
        ul.row.no-gutters.d-flex.justify-content-between.text-center.th
          li.col-2.py-2.px-1 投注游戏
          li.col-2.py-2.px-1 每款游戏有效流水要求
          li.col-2.py-2.px-1 悬赏金
          li.col-3.py-2.px-1 提款有效流水限制
          li.col-3.py-2.px-1 提款最低限额
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-2.py-2.px-1 5 款
          li.col-2.py-2.px-1 1688
          li.col-2.py-2.px-1 8
          li.col-3.py-2.px-1 1 倍
          li.col-3.py-2.px-1 悬赏金X10
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-2.py-2.px-1 8 款
          li.col-2.py-2.px-1 2688
          li.col-2.py-2.px-1 38
          li.col-3.py-2.px-1 1 倍
          li.col-3.py-2.px-1 悬赏金X10
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-2.py-2.px-1 10 款
          li.col-2.py-2.px-1 3688
          li.col-2.py-2.px-1 118
          li.col-3.py-2.px-1 1 倍
          li.col-3.py-2.px-1 悬赏金X10
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-2.py-2.px-1 15 款
          li.col-2.py-2.px-1 5688
          li.col-2.py-2.px-1 388
          li.col-3.py-2.px-1 1 倍
          li.col-3.py-2.px-1 悬赏金X10
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-2.py-2.px-1 20 款
          li.col-2.py-2.px-1 8688
          li.col-2.py-2.px-1 1088
          li.col-3.py-2.px-1 1 倍
          li.col-3.py-2.px-1 悬赏金X10
      p.my-2  例：宝宝当日完成8款老虎机类型游戏，且8款游戏都有打到流水2688，次日即可获得38打虎悬赏金
      p.my-2.heavy  ＊提款最低限额说明：宝宝A获得悬赏金38元后，提款至少需要38X10=380元以上
      .col-12.text-center
        a(@click.prevent='gotoP1')
          img.m-2(src='/static/ev181001/btn_1.png')
        a(:href='siteHost+"/member/bonus/3"')
          img.m-2(src='/static/ev181001/btn_2.png')
    .row.mb-5.d-flex.justify-content-center
      .col-10.whiteTableFooter.text-center
    .row.mt-5.d-flex.justify-content-center
      .col-10.whiteTableHeader.text-center
        img.tiger(src='/static/ev181001/tiger.png')
    .row.py-5.px-2.mainWrap.d-flex.justify-content-center
      .col-12.text-center
        img(src='/static/ev181001/title_3.png')
      .col-12.text-left
        div.depiction.px-5.py-3
          p.my-2 1、活动期间内符合活动条件资格的会员将于隔日中午12点后显示于 
            a(:href='siteHost+"/member/bonus/3"') 领奖中心 
            | ，请会员10/11前至 
            a(:href='siteHost+"/member/bonus/3"') 领奖中心 
            | 申请，申请后将于48小时内自动派发到用户中心钱包。一旦申请即无法取消，逾期未申请将视同放弃。
            a(:href='siteHost+"/member/bonus/3"')
              img(src='/static/ev181001/des.jpg' width='150')
          p.my-2 2、每日投注流水计算时间为00:00~23:59，以系统记录时间为主，隔日将归0重新计算。
          p.my-2.heavy 3、非开放中游戏、非老虎机类游戏、多旋转老虎机、老虎机奖金翻倍投注将不计算在有效流水内。
          p.my-2 4、每位新会员只能享有一次优惠，且同一住址、电话号码﹑电子邮箱地址、IP(例如网吧，其他公共用计算机)﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请(如关联账号)之行为，18老虎城将保留或取消会员优惠彩金的权利。
          p.my-2 5、任何会员【 个人/团体/组织 】以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不需事先作任何通知。
          p.my-2 5、18老虎城禁止未达 18 周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有彩金及账户。
          p.my-2 6、18老虎城官方有权在不事先通知玩家的情况下，延长，缩短，终止或修改该活动，对本活动拥有最终解释权。
          p.my-2 7、更多18老虎城优惠请随时咨询 在线客服 或查看 
            a(:href='siteHost+"/news"') 18老虎城 
            | 公告。
    .row.mb-5.d-flex.justify-content-center
      .col-10.whiteTableFooter.text-center
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import tgHeader from '@/views/ev181001/components/tgHeader.vue';
import tgBanner from '@/views/ev181001/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181001/components/tgFooter.vue';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  components: {
    tgHeader,
    tgBanner,
    tgFooter,
    tgLogin,
  },
  data() {
    return {
      loginDialogShow: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    ...mapState('index', [
      'siteHost',
    ]),
  },
  methods: {
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoP1() {
      if (this.MemberLogined) {
        router.push('/p1');
      } else {
        this.loginDialogShow = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.datalist {
  width: 100%;
  color: #DE220C;
  font-size: 14px;
  border: 1px solid #DE220C;
  ul, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul.th{
    background: #DE220C !important;
    color: #fff;
  }
  ul {
    border-bottom: 1px solid #DE220C;
    &:first-child {
      background: rgba(217,217,217,0.1);
    };
    &:last-child {
      border-bottom: none;
    };
  };
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #DE220C;
    &:last-child {
      border-right: none;
    };
  };
};
a{
  cursor: pointer;
}
.heavy{
  font-weight: bold !important;;
  color: #2d2d2d !important;
}
</style>

