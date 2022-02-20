<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .row.no-gutters.content.py-3
    .col.px-lg-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 活动说明
          ||
        .col-12.eventcaption.pt-md-0.pt-2
          p 2018 / 9 / 22 12：00 ～ 2018 / 9 / 30 23：59（ GMT＋8 ）
          p 新注册帐号立马获得 18 元奖励金、首次储值并回填好友专属码，您与好友再获得储值金额的 10% 回馈金。
            br
            |也可再分享活动给其他好友，继续获得好友更多吃机回馈金
        .col-10.offset-1.eventcontent.py-md-4.py-2
          .row.no-gutters
            .col-md-4.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src="/static/moon18/pic-compaign-4.png")
              span 注册新帐号
              span 立马拿 18 元奖励金
              a(:href='siteHost+"/register"')
                button.btn.px-4.py-2.mt-4(type="button") 注册帐号
            .col-md-4.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src="/static/moon18/pic-compaign-2.png")
              span 首次储值
              span 回填邀请码再赚 10%
              button.btn.px-4.py-2.mt-4(type="button" @click.prevent='gotoP2') 填邀请码
            .col-md-4.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src="/static/moon18/pic-compaign-1.png")
              span 与友同乐
              span 继续获得更多回馈金
              button.btn.px-4.py-2.mt-4(type="button" @click.prevent='gotoP1') 邀请好友
  .row.no-gutters.notes.py-md-5.py-2.px-3.d-flex.flex-column.justify-content-center.text-center
    .col-12.py-5
      span.notestitle 温馨小贴士
    .col-md-8.offset-md-2.col-12.pb-4.pl-3.text-left
      ol
        li 活动期间首储后，请于 2018/9/30 前点击「确认申请」按钮进行申请，一旦申请即无法取消，逾期未申请将视同放弃。
        li 首笔储值资格判定以系统入账时间为主。
        li 资料填写完毕后吃机金将于 48 小时内派发至中心钱包内，请务必确认填写正确的推荐人邀请码。
        li 活动吃机金一经申请之后不得取消，每位新首笔存款用户仅可申请一次活动吃机金。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import router from '@/views/moon18/router/router';
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loginDialogShow: false,
    };
  },
  methods: {
    gotoP1() {
      if (this.MemberLogined) {
        router.push('/p1');
      } else {
        this.loginDialogShow = true;
      }
    },
    gotoP2() {
      if (this.MemberLogined) {
        router.push('/p2');
      } else {
        this.loginDialogShow = true;
      }
    },
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
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
    tgLogin,
  },
};
</script>
