<template lang='pug'>
.container-fluid.navi
  div(v-if='MemberLogined')
    .nav_top
      .row.no-gutters
        .col-xs-4.col-sm-4.col-md-4.col-lg-4.col-xl-4.text-left
          ul.px-2.m-0
            li
              img.logo.my-0.mx-3(src="/static/img/logo.svg" width='100')
        .col-xs-8.col-sm-8.col-md-8.col-lg-8.col-xl-8
          ul.text-right(v-if='MemberLogined')
            li
              span.mx-2 您好, {{UserName}}
            li |
            li.naviLink(@click='cashierDialog_1_Show') 存款
            li |
            li.naviLink(@click='cashierDialog_3_Show') 转账
            li |
            li.naviLink(onclick='window.close();') 退出
          ul.text-right(v-if='!MemberLogined')
            a(href=`${process.env.VUE_APP_tgHOST}`)
              li.naviLink-underLine 登录
            li.naviLink 或
            a(href=`${process.env.VUE_APP_tgHOST}`)
              li.naviLink-underLine 注册
    el-dialog(:visible.sync='cashierDialog_1', width='900px')
      tgCashier1(@cashierDialog_1_Hide='cashierDialog_1_Hide')
    el-dialog(:visible.sync='cashierDialog_2', width='900px')
      tgCashier2(@cashierDialog_2_Hide='cashierDialog_2_Hide')
    el-dialog(:visible.sync='cashierDialog_3', width='900px')
      tgOverview(@cashierDialog_3_Hide='cashierDialog_3_Hide')
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import tgCashier1 from '@/components/tgMember/tgCashier1.vue';
import tgCashier2 from '@/components/tgMember/tgCashier2.vue';
import tgOverview from '@/components/tgMember/tgOverview.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';

const loop = '';
export default {
  components: {
    tgCashier1,
    tgCashier2,
    tgOverview,
  },
  data() {
    return {
      cashierDialog_1: false,
      cashierDialog_2: false,
      cashierDialog_3: false,
      getLoginNullData: false,
      now: '',
      member: {
        userName: '',
        password: '',
      },
      topNavi: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberInboxList',
      'MemberLogined',
      'MemberWallet',
    ]),
    unReadedMailLength() {
      try {
        const unReadedMail = this.MemberInboxList.data_list.filter(mail => mail.Status === '0');
        return unReadedMail.length ? unReadedMail.length : '0';
      } catch (e) {
        return e;
      }
    },
  },
  methods: {
    formInput() {
      this.getLoginNullData = false;
    },
    logOut() {
      this.$store.dispatch('member/MemberLogout');
    },
    loginDialog_Show() {
      this.loginDialog = true;
    },
    registerDialog_Show() {
      this.registerDialog = true;
    },
    loginDialog_Hide() {
      this.loginDialog = false;
    },
    registerDialog_Hide() {
      this.registerDialog = false;
    },
    checkToken() {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      return token;
    },
    cashierDialog_1_Show() {
      const payload = { Device: '1' };
      const vm = this;
      const token = this.checkToken();
      if (token.login_status === 'login') {
        axios.post(`${process.env.VUE_APP_APIHOST}/Payment/GetCashierChannel/`, payload)
          .then((res) => {
            if (res.data.status === 1) {
              vm.cashierDialog_1 = true;
            } else {
              vm.$message({
                showClose: true,
                message: res.data.error_message,
                type: 'error',
                duration: 1500,
                center: true,
                onClose() {
                  window.location = `${process.env.VUE_APP_tgHOST}/member/account/1`;
                },
              });
            }
          });
      } else {
        vm.$message({
          showClose: true,
          message: '您已经退出,请再次登录',
          type: 'error',
          duration: 1500,
          center: true,
          onClose() {
            window.location = `${process.env.VUE_APP_tgHOST}/login`;
          },
        });
      }
    },
    cashierDialog_2_Show() {
      const vm = this;
      const data = {};
      const token = this.checkToken();
      data.UserName = token.username;
      data.Type = 'Detail';
      if (token.login_status === 'login') {
        axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
          .then((res) => {
            if (res.data.status === 1) {
              vm.cashierDialog_2 = true;
            } else {
              vm.$message({
                showClose: true,
                message: res.data.error_message,
                type: 'error',
                duration: 1500,
                center: true,
                onClose() {
                  window.location = `${process.env.VUE_APP_tgHOST}/member/account/1`;
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        vm.$message({
          showClose: true,
          message: '您已经退出,请再次登录',
          type: 'error',
          duration: 1500,
          center: true,
          onClose() {
            window.location = `${process.env.VUE_APP_tgHOST}/login`;
          },
        });
      }
    },
    cashierDialog_3_Show() {
      this.cashierDialog_3 = true;
    },
    cashierDialog_1_Hide() {
      this.cashierDialog_1 = false;
    },
    cashierDialog_2_Hide() {
      this.cashierDialog_2 = false;
    },
    cashierDialog_3_Hide() {
      this.cashierDialog_3 = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .currentTime{
    width: 188px;
  }
  .navi{
    position: relative;
    color: #fff;
  }
  .nav_top{
    position: relative;
    z-index: 1;
    line-height: 48px;
    height: 48px;
    background-image: linear-gradient(87deg, #002766, #001332);
    border-top: 3px solid #fadb14;
    color: #fff;
    text-align: center;
    ul{
      height: 45px;
      line-height: 40px;
      li{
        font-size: 13px;
        line-height: 1;
        color: #fff;
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
    border-top: 3px solid #fadb14;
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
    line-height: 40px;
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
