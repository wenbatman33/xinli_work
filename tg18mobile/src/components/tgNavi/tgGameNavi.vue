<template lang='pug'>
  .container-fluid.navi
    .nav_top
      .row
        .el-col-xs-12.col-sm-12.col-md-4.col-lg-4.col-xl-4
          ul
            li.currentTime
              span {{ now }}
            li.naviLink
              a(href="/") 最新公告
              .notify
        ul.el-col-xs-12.col-sm-12.col-md-8.col-lg-8.col-xl-8.text-right(v-if="getIslogin")
          li.naviLink
            a(href="/member/account/1") 会员中心 |
          li.naviLink
            a(href="/member/cashier/3") 钱包转账 |
          li.naviLink
            a(href="/membercashier/2") 线上提款 |
          li.naviLink
            a(href="/member/cashier/1") 线上存款 |
          li.naviLink
            a(href="/member/member/inbox") 站内信(4) |
          li.naviLink(@click="logOut") 登出
        ul(v-else="")
          li.naviLink-underLine
            router-link(to="/login") 登陆
          li.naviLink 或
          li.naviLink-underLine
            router-link(to="/register") 注册
    //- 燈箱區塊
    //- el-dialog(title='建立使用者', :visible.sync='registerDialogVisible', width='30%')
    //-   span 建立使用者
    //-   span.dialog-footer(slot='footer')
    //-     el-button(@click='registerDialogVisible = false') 取 消
    //-     el-button(type='primary', @click='registerDialogVisible = false') 确 定
    //- el-dialog(title='使用者登入', :visible.sync='loginDialogVisible', width='30%')
    //-   span 使用者登入
    //-   span.dialog-footer(slot='footer')
    //-     el-button(@click='loginDialogVisible = false') 取 消
    //-     el-button(type='primary', @click='loginDialogVisible = false') 确 定
</template>
<script>
import moment from 'moment';
import { mapState, mapMutations, mapGetters } from 'vuex';

let loop = '';
export default {
  data() {
    return {
      loginDialogVisible: false,
      registerDialogVisible: false,
      getLoginNullData: false,
      now: '',
      member: {
        userName: '',
        password: '',
      },
      topNavi: '',
    };
  },
  filters: {
    moment(date) {
      return moment().format('UT YYYY/MM/DD HH:mm:ss');
    },
  },
  computed: {
    getIslogin() {
      return this.$store.state.member.MemberLogined;
    },
  },
  methods: {
    formInput() {
      this.getLoginNullData = false;
    },
    logOut() {      
      this.$store.dispatch('member/MemberLogout');
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
      vm.now = `GMT${timezone} ${moment().utc(timezone).format('YYYY/MM/DD HH:mm:ss')}`;
      loop = requestAnimationFrame(nowTime);
    }
    nowTime();
  },
};
</script>
<style lang="scss" scoped>
  .currentTime{
    width: 188px;
  }
  .navi{
    position: relative;
    z-index: 3;
  }
  .nav_top{
    position: relative;
    z-index: 1;
    line-height: 36px;
    height: 36px;
    background: #fadb14;
    color: #fff;
    text-align: center;
    ul{
      li{
        font-size: 13px;
        line-height: 1;
        color: #1a2233;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }

  .nav_bottom{
    line-height: 88px;
    height: 88px;
    background-image: linear-gradient(87deg, #002766, #001332);
    box-shadow: 0 1px 16px 0 rgba(0, 0, 0, 0.8);
  }
  .error {
    font-size: 12px;
    color: red;
  }
  .ta_r{
    text-align: right;
  }
  .loginInput{
    width: 200px;
  }
  .logo{
    vertical-align: middle;
    line-height: 88px;
    img{
      vertical-align: middle;
    }
  }
  .nav_bottomInner{
    display: flex;
    justify-content: space-between;
  }
  .logined{
    color: #fff;
  }
  .logOut{
    text-decoration: underline;
    cursor: pointer;
  }
  .naviLink{
    cursor: pointer;
    position: relative;
    a{
      font-size: 13px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #1a2233;
      text-decoration: none;
    }
    .notify{
      position:absolute;
      top: -4px;
      right: -4px;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: #ff4949;
      z-index: 1;
    }
  }
  .naviLink-underLine{
    a{
      font-size: 13px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #1a2233;
      text-decoration: underline;
    }
  }
  ul.loginedMenu{
    li{
      display: inline-block;
      margin-left: 6px;
      color:#fff;
      text-decoration: none;
    }
    a{
      display: inline-block;
      margin-left: 6px;
      color:#fff;
      text-decoration: none;
    }
  }
</style>
