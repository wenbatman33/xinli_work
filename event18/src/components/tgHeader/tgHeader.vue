<template lang="pug">
  header
    .container-fluid
      .top.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-1.py-1
            //- .col-md-6.col-12.mb-md-0.mb-2.text-md-left.text-center {{ now }}
            .col-md-6.col-4.px-1.mb-1.text-left
              a.login(:href='siteHost+"/news"' target='_blank') 公告
            .col-md-6.col-8.px-1.text-right
              div(v-if='MemberLogined')
                span {{UserName}} 您好 | 
                  a.login(@click.prevent='logout') 退出
              div(v-else)
                span
                  a.login(@click.prevent='loginDialogShow=true') 登录
                  span.px-1 或
                  a.register(:href='siteHost+"/register"' target='_blank') 注册
      .nav.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-1.py-1
            .col-md-6.col-4.text-left
                a(:href='siteHost')
                  img.logo(src='/static/img/logo.svg')
            .col-md-6.col-8.text-right.d-flex.justify-content-center.flex-column
              div
                a.btn1(:href='siteHost+"/promotion"' target='_blank') 优惠活动
                //- a.btn1(onclick="LC_API.open_chat_window();") 在线客服
                a.btn2(:href='siteHost+"/member/bonus/3"' target='_blank') 领奖中心
    el-dialog(v-if='isMobile' :visible.sync='loginDialogShow', width='90%', append-to-body)
      tgLogin(@loginDialogHide='loginDialogHide')
    el-dialog(v-else :visible.sync='loginDialogShow', width='40%', append-to-body)
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
      isMobile: false,
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
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    logout() {
      this.$store.dispatch('member/MemberLogout');
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
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
/*-- Header --*/

header {
  width: 100%;
  height: auto;
  box-shadow: 0 1px 16px 0 rgba(0,0,0,0.4);
  position: relative;
  z-index: 10;
  .top {
    width: 100%;
    background: rgba(250,219,20,1);
    color: rgba(38,38,38,1);
    font-size: 12px;
    a.forget {
      color: rgba(38,38,38,1);
      text-decoration: none;
    };
    a.login, a.register {
      cursor: pointer;
      color: rgba(38,38,38,1);
      text-decoration: underline;
    };
  };
  .nav {
    width: 100%;
    background: linear-gradient(90deg, rgba(0,39,102,1), rgba(0,19,50,1));
    img.logo {
      width: 100%;
      max-width: 160px;
    };
    a {
      margin-right: 15px;
      &:hover {
        text-decoration: none;
      };
    };
    a:last-child {
      margin-right: 0px;
    };
    a.btn1 {
      padding: 5px 10px;
      color: rgba(255,255,255,1);
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: rgba(255,255,255,1);
      };
    };
    a.btn2 {
      padding: 3px 6px;
      color: rgba(250,219,20,1);
      font-size: 14px;
      border: 1px solid rgba(250,219,20,1);
      border-radius: 4px;
    }
  };
}
</style>
