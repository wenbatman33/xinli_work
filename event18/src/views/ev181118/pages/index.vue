<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container
    .row.my-md-5.my-4.d-flex.justify-content-center
      .col-md-10.col-11.whiteTableHeader.text-center
        .whiteTableTitle
          img.my-1(src='/static/ev181118/title_1.svg')
    .row.no-gutters.py-md-5.py-4.mainWrap.d-flex.justify-content-center
      .col-12.text-center
        p.heavy 18打老虎！登录送好礼~~
        p 所有验证手机号码与信箱并绑定银行卡的虎粉们，依 2018/11/01 ～ 2018/11/17 期间登录网站天数，即可获得不同奖励呦 ~
      .col-md-10.col-11.mt-3.text-left
        p.heavy 一、免费送红利：
      .col-md-10.col-11.mb-3.datalist
        ul.row.no-gutters.d-flex.justify-content-between.text-center.th
          li.col-3.py-2.px-1 条件
          li.col-3.py-2.px-1 红利
          li.col-3.py-2.px-1 红利领取有效流水限制
          li.col-3.py-2.px-1 提款有效流水限制
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-3.py-2.px-1 登陆 1 ～ 3 天
          li.col-3.py-2.px-1 
            .row.no-gutters
              .col 老虎城俊男美女飞吻一枚
                img(src='/static/ev181118/icon-lips.svg')
          li.col-3.py-2.px-1
            .row.no-gutters
              .col
                img(src='/static/ev181118/icon-lips.svg')
          li.col-3.py-2.px-1
            .row.no-gutters
              .col
                img(src='/static/ev181118/icon-lips.svg')
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-3.py-2.px-1 登陆 4 ～ 7 天
          li.col-3.py-2.px-1 18
          li.col-3.py-2.px-1 20 倍
          li.col-3.py-2.px-1 450
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-3.py-2.px-1 登陆 8 ～ 12 天
          li.col-3.py-2.px-1 38
          li.col-3.py-2.px-1 20 倍
          li.col-3.py-2.px-1 950
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-3.py-2.px-1 登陆 13 天以上
          li.col-3.py-2.px-1 88
          li.col-3.py-2.px-1 20 倍
          li.col-3.py-2.px-1 2200
      .col-md-10.col-11.pb-3.text-left
        p.impot_orange ※此红利将于申请后24小时内发送，请至PG夜戏貂蝉游戏中领取~红利金额会显示于游戏的红利钱包中，当满足领取红利流水限制时即可把红利转入现金钱包。若红利于11/23 23:59前尚未满足红利流水限制条件，红利钱包與优惠将清空无法领取。
        p.impot_orange ※提款有效流水限制以获得红利后的流水开始做计算。
        .row.no-gutters
      .col-md-10.col-11.mt-3.text-left
        p.heavy 二、储值超优惠：
          span.impot_orange （限量188名）
      .col-md-10.col-11.mb-3.datalist
        ul.row.no-gutters.d-flex.justify-content-between.text-center.th
          li.col-3.py-2.px-1 条件
          li.col-3.py-2.px-1 奖励
          li.col-3.py-2.px-1 最高红利
          li.col-3.py-2.px-1 提款有效流水限制
        ul.row.no-gutters.d-flex.justify-content-between.text-center
          li.col-3.py-2.px-1 11/18当天首笔存款
          li.col-3.py-2.px-1 回馈50%
          li.col-3.py-2.px-1 777
          li.col-3.py-2.px-1 20倍(存款+红利)
      .col-md-10.col-11.pb-3.text-left
        p.impot_orange ※请特别注意需在存款前确认已验证手机号码与信箱并绑定银行卡，以免资格不符！
        p.impot_orange ※申请首笔储值红利时，请务必确认中心钱包内的余额为存款金额的50%以上，以免资格判定不符而无法领取红利~
        //- a.impot(@click.prevent='gotoP1') <<进行补登哦！>>
      //- .col-md-10.col-11.py-3.text-center
        p.heavy 注意事项
        p ＊请特别注意需在 
          span 存款前 
          | 确认已「 
          span 验证手机号码与信箱 
          | 」并「 
          span 绑定银行卡 
          | 」，以免资格不符！
        p ＊申请首笔储值回馈金需有「 
          span 存款记录、中心钱包 
          | 」余额做资格判定，请勿在领取前 
          span 异动中心钱包存款额度
          | ，以免资格不符无法领取回馈金。
      .col-12.text-center
        .row.no-gutters.my-2.d-flex.justify-content-center
          .col-lg-3.col-md-3.col-10.my-2.mx-3
            a.btn_style(@click.prevent='gotoP1') 查看登录记录
          .col-lg-3.col-md-3.col-10.my-2.mx-3
            a.btn_style(:href='siteHost+"/member/bonus/3"') 我要申请回馈
    .row.my-md-5.my-4.d-flex.justify-content-center
      .col-md-10.col-11.whiteTableHeader.text-center
        .whiteTableTitle
          img.my-1(src='/static/ev181118/title_2.svg')
    .row.no-gutters.py-md-5.py-4.mb-5.mainWrap.d-flex.justify-content-center
      .col-12.text-left
        div.depiction.py-3.px-md-5.px-4
          p.my-2 1、免费送红利符合资格的会员，将于2018/11/18 12:00过后显示于『 
            a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
            | 』、储值超优惠符合资格的会员将在存款20分钟内显示于『 
            a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
            | 』，请会员3日内（最迟红利领取时间）至『 
            a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
            | 』申请。一旦申请即无法取消，逾期未申请将视同放弃。
            span.impot_orange (于PG游戏内放弃红利不等于取消已申请的资格，请特别注意！)
          //- .row.no-gutters
            .col-12.text-center
              a(:href='siteHost+"/member/bonus/1"')
                img(src='/static/ev181118/pic-GetBonus.png')
          //- p.my-2 
          //-   span 2、每日投注流水计算时间为00:00~23:59，以系统记录时间为主，隔日将归0重新计算。
          p.my-2.impot_orange 2、此存款优惠将无法与其他存款优惠一起申请。
          p.my-2.impot_orange 3、非开放中游戏、非老虎机类游戏、多旋转老虎机、老虎机奖金翻倍投注将不计算在有效流水内。
          p.my-2 4、每位会员只能享有一次优惠，且同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，18老虎城将保留或取消会员优惠彩金的权利。
          p.my-2 5、任何会员[个人/团体/组织]以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不需事先作任何通知。
          p.my-2 6、18老虎城禁止未达18周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有彩金及账户。
          p.my-2 7、18老虎城官方有权在不事先通知玩家的情况下，延长，缩短，终止或修改该活动，对本活动拥有最终解释权。
          p.my-2 8、更多18老虎城优惠请随时咨询「在线客服」或查看「 
            a.link_blue(:href='siteHost+"/news"') 18老虎城 
            | 」公告。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import tgHeader from '@/views/ev181118/components/tgHeader.vue';
import tgBanner from '@/views/ev181118/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181118/components/tgFooter.vue';
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

</style>

