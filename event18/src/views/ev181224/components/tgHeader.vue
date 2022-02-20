<template lang="pug">
  header
    .container-fluid
      .top.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-2.py-2
            //- .col-md-6.col-12.mb-md-0.mb-2.text-md-left.text-center {{ now }}
            .col-md-6.col-4.px-2.mb-2.text-left
              a.login(:href='siteHost+"/news"') 公告
            .col-md-6.col-8.px-1.text-right
              div(v-if='MemberLogined')
                span {{UserName}} 您好
              div(v-else)
                span
                  a.login(@click.prevent='loginDialogShow=true') 登录
                  span.px-1 或
                  a.register(:href='siteHost+"/register"') 注册
      .nav.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-2.py-3
            .col-md-6.col-4.text-left
                a(:href='siteHost')
                  img.logo(src='/static/img/logo.svg')
            .col-md-6.col-8.text-right.d-flex.justify-content-center.flex-column
              div
                a.btn1(:href='siteHost+"/promotion"') 优惠活动
                //- a.btn1(onclick="LC_API.open_chat_window();") 在线客服
                a.btn2(:href='siteHost+"/member/bonus/3"') 领奖中心
    el-dialog(:visible.sync='loginDialogShow', width='90%', append-to-body)
      tgLogin(@loginDialogHide='loginDialogHide')
</template>

<script>
import moment from 'moment';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import { mapState } from 'vuex';

let loop = '';
export default {
  nema: 'tgHeader',
  data() {
    return {
      loginDialogShow: false,
      now: '',
    };
  },
  components: {
    tgLogin,
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
  },
  beforeDestroy() {
    cancelAnimationFrame(loop);
  },
  mounted() {
    const vm = this;
    const d = new Date();
    const timezone = d.getTimezoneOffset() / -60;
    function nowTime() {
      vm.now = `GMT${timezone} ${moment().utc(timezone).format('YYYY-MM-DD HH:mm:ss')}`;
      loop = requestAnimationFrame(nowTime);
    }
    nowTime();
  },
};
</script>
<style scoped lang="scss">
</style>
