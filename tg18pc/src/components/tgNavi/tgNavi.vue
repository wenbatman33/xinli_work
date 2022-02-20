<template lang='pug'>
div
  .container-fluid.navi
    .nav_top
      .container
        .d-flex.justify-content-between
          ul
            li.currentTime.text-left
              span.text-left {{ now }}
            li.naviLink
              router-link(to='/news' v-on:click.native='GA_signindex_news(MemberLogined)') 公告
              .notify(v-if='newsNotify')
            li.naviLink.ml-2
              router-link(to='/vip') VIP俱樂部
            //- 代理連結
            li.naviLink
              router-link(to='/applyAgency') 加入代理
          ul(v-if='MemberLogined')
            li(v-if='MemberVIPData')
              span 您好, 
              router-link(to='/vip')
                .badge.px-2.mx-1
                  span(v-if='MemberVIPData.UserLevel<=1') 铁 
                  i.el-icon-star-on(v-if='MemberVIPData.UserLevel>=2')
                  span(v-if='MemberVIPData.UserLevel>=2') {{ MemberVIPData.UserLevel-1 }}  
              span {{ UserName }}
            li |
            li.naviLink
              router-link(to='/member/account/1'  v-on:click.native='GA_member(MemberLogined)') 会员中心 
            li |
            li.naviLink(@click='cashierDialog_1_Show') 存款
            li |
            li.naviLink(@click='cashierDialog_3_Show') 转账
            li |
            li.naviLink(@click='cashierDialog_2_Show') 提款
            li |
            li.naviLink
              router-link(to='/member/inbox' v-on:click.native='GA_inbox(MemberLogined)')
                span 站内信
                span(v-if='MemberLogined && unReadedMailLength') ({{unReadedMailLength}})
            li |
            li.naviLink(v-if='MemberWallet')
              router-link(to='/member/overview' v-on:click.native='GA_wallet(MemberLogined)')
                span 錢包
                span(v-if='MemberLogined') : ￥{{ MemberWallet.Cash | commaFormat}}
            li |
            li.naviLink(@click='logOut') 退出
          ul(v-else='')
            li.naviLink-underLine
              router-link(to='/login' v-on:click.native='GA_home_login()') 登录
            li.naviLink 或
            li.naviLink-underLine
              router-link(to='/register' v-on:click.native='GA_home_register()') 注册
    .nav_bottom
      .container
        .nav_bottomInner
          .logo
            router-link(to='/')
              img(src='/static/img/logo.svg')
          .logined
            ul.loginedMenu
              li.slot(@mouseenter='slotListShow=true',@mouseleave='slotListShow=false')
                router-link(:to='"/slot?game="+slotProvider[0].GroupName', v-bind:class="[getUrlID==='slot' ? 'active': '']", v-on:click.native='GA_home_headerslot(MemberLogined)') 老虎机
                  i.el-icon-caret-bottom
                .List.p-3(v-if='slotListShow')
                  tgProviderSlot
              li.slot(@mouseenter='fishingListShow=true', @mouseleave='fishingListShow=false')
                router-link(:to='"/fishing?game="+fishingProvider[0].GroupName', v-bind:class="[getUrlID==='fishing' ? 'active': '']", v-on:click.native='GA_home_headerfish(MemberLogined)') 捕鱼机
                  i.el-icon-caret-bottom
                .List.p-3(v-if='fishingListShow')
                  tgProviderFishing
              li.slot(@mouseenter='boardListShow=true', @mouseleave='boardListShow=false')
                router-link(:to='"/board?game="+boardProvider[0].GroupName', v-bind:class="[getUrlID==='board' ? 'active': '']", v-on:click.native='GA_home_headerboard(MemberLogined)') 棋牌游戏
                  i.el-icon-caret-bottom
                .List.p-3(v-if='boardListShow')
                  tgProviderBoard
              li.slot(@mouseenter='arcadeListShow=true', @mouseleave='arcadeListShow=false')
                router-link(:to='"/arcade?game="+arcadeProvider[0].GroupName', v-bind:class="[getUrlID==='arcade' ? 'active': '']", v-on:click.native='GA_home_headerarcade(MemberLogined)') 街机游戏
                  i.el-icon-caret-bottom
                .List.p-3(v-if='arcadeListShow')
                  tgProviderArcade
              //- li
              //-   router-link(to='/blackjack?game=pt' v-on:click.native='GA_home_event(MemberLogined)') 21點
              //- li
              //-   router-link(to='/vip',v-bind:class="[getUrlID==='vip' ? 'active': '']",) VIP 俱乐部
              li
                router-link(to='/promotion', v-on:click.native='GA_home_event(MemberLogined)',v-bind:class="[getUrlID==='promotion' ? 'active': '']",) 优惠活动
              li(@click='GA_home_service(MemberLogined)') 在线客服
              li(@click='gotoBonus').btn.btn-outline-tgYellow
                span 领奖中心 
                span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.totalCnt>0') {{MemberOfferCount.totalCnt}}
  el-dialog(:visible.sync='loginDialogVisible', width='500px')
    tgLogin(@loginDialogHide='loginDialogHide')
  el-dialog(:visible.sync='cashierDialog_1', width='900px')
    tgCashier1(@cashierDialog_1_Hide='cashierDialog_1_Hide')
  el-dialog(:visible.sync='cashierDialog_2', width='900px')
    tgCashier2(@cashierDialog_2_Hide='cashierDialog_2_Hide')
  el-dialog(:visible.sync='cashierDialog_3', width='900px')
    tgOverview(@cashierDialog_3_Hide='cashierDialog_3_Hide')
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import tgProviderSlot from '@/components/tgProvider/tgProviderSlot.vue';
import tgProviderFishing from '@/components/tgProvider/tgProviderFishing.vue';
import tgProviderBoard from '@/components/tgProvider/tgProviderBoard.vue';
import tgProviderArcade from '@/components/tgProvider/tgProviderArcade.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgCashier1 from '@/components/tgMember/tgCashier1.vue';
import tgCashier2 from '@/components/tgMember/tgCashier2.vue';
import tgOverview from '@/components/tgMember/tgOverview.vue';
import { mapState } from 'vuex';

let loop = '';
export default {
  components: {
    tgLogin,
    tgProviderSlot,
    tgProviderFishing,
    tgProviderBoard,
    tgProviderArcade,
    tgCashier1,
    tgCashier2,
    tgOverview,
  },
  data() {
    return {
      cashierDialog_1: false,
      cashierDialog_2: false,
      cashierDialog_3: false,
      loginDialogVisible: false,
      registerDialogVisible: false,
      getLoginNullData: false,
      slotListShow: false,
      fishingListShow: false,
      boardListShow: false,
      arcadeListShow: false,
      now: '',
      member: {
        userName: '',
        password: '',
      },
      topNavi: '',
    };
  },
  computed: {
    ...mapState('index', [
      'slotProvider',
      'fishingProvider',
      'boardProvider',
      'arcadeProvider',
    ]),
    ...mapState('news', [
      'newsNotify',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberVIPData',
      'MemberInboxList',
      'MemberLogined',
      'MemberWallet',
      'MemberOfferCount',
    ]),
    unReadedMailLength() {
      try {
        const unReadedMail = this.MemberInboxList.data_list.filter(mail => mail.Status === '0');
        return unReadedMail.length ? unReadedMail.length : '0';
      } catch (e) {
        return 0;
      }
    },
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  methods: {
    formInput() {
      this.getLoginNullData = false;
    },
    logOut() {
      window.localStorage.removeItem('JWT_TOKEN');
      window.location.reload();
      // this.$store.dispatch('member/MemberLogout');
    },
    loginDialogHide() {
      this.loginDialogVisible = false;
      router.push('/member/bonus/1');
    },
    checkToken() {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      return token;
    },
    cashierDialog_1_Show() {
      this.GA_save(this.MemberLogined); 
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
                  router.push('/member/account/1');
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
            router.push('/login');
          },
        });
      }
    },
    cashierDialog_2_Show() {
      this.GA_withdraw(this.MemberLogined);
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
                  router.push('/member/account/1');
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
            router.push('/login');
          },
        });
      }
    },
    cashierDialog_3_Show() {
      this.GA_transfer(this.MemberLogined);
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
    gotoBonus() {
      if (this.MemberLogined) {
        router.push('/member/bonus/1');
        this.GA_signindex_bonus(this.MemberLogined);
      } else {
        this.loginDialogVisible = true;
        this.GA_signindex_bonus(this.MemberLogined);
      }
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
      vm.now = `GMT+${timezone} ${moment().utc(timezone).format('YYYY-MM-DD HH:mm:ss')}`;
      loop = requestAnimationFrame(nowTime);
    }
    nowTime();
  },
};
</script>
<style lang='scss' scoped>
  .badge{
    color: #fff;
    border-radius: 18px;
    background-color: #1890ff;
  }
  .currentTime{
    width: 188px;
  }
  .navi{
    position: relative;
    z-index: 30;
  }
  .nav_top{
    position: relative;
    z-index: 10;
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
    line-height: 72px;
    height: 72px;
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
    line-height: 72px;
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
      z-index: 10;
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
    height: 73px;
    letter-spacing:1px;
    li{
      display: inline-block;
      margin-left: 45px;
      font-size: 14px;
      color:#fff;
      text-decoration: none;
      cursor: pointer;
    }
    a{
      height: 71px;
      display: inline-block;
      margin-left: 6px;
      color:#fff;
      text-decoration: none;
      &:hover{
        color: #fadb14!important;
        border-bottom: #fadb14 2px solid;
      }
    }
    .active{
      color: #fadb14!important;
      border-bottom: #fadb14 2px solid;
    }
  }
  .List{
    position: absolute;
    min-width: 300px;
    margin-top: -2px;
    margin-left: 0;
    z-index: 30;
    background: rgba(8,24,60,.9);
  }
</style>
