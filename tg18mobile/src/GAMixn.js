import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-124274863-1',
});

const GAMixin = {
  methods: {
    GA_mlogin_login() {
      this.$ga.event('登錄', 'click', 'mlogin_login');
    },
    GA_mlogin_forgotpw() {
      this.$ga.event('忘記密碼', 'click', 'mlogin_forgotpw');
    },
    GA_mlogin_register() {
      this.$ga.event('注冊', 'click', 'mlogin_register');
    },
    // GA_register_successmobile(UserName) {
    //   this.$ga.event('註冊', 'click', 'register_successmobile', UserName);
    // },
    GA_login_forgotpwmobile() {
      this.$ga.event('註冊', 'click', 'login_forgotpwmobile');
    },
    GA_login_registermobile() {
      this.$ga.event('註冊', 'click', 'login_registermobile');
    },
    GA_register_successmobile() {
      this.$ga.event('註冊', 'click', 'register_successmobile');
    },
    GA_mregister_fail() {
      this.$ga.event('註冊', 'click', 'mregister_fail');
    },
    GA_mregister_login() {
      this.$ga.event('登錄', 'click', 'mregister_login');
    },
    GA_home_newsmobile() {
      this.$ga.event('公告', 'click', 'home_newsmobile');
    },
    GA_home_eventmobile() {
      this.$ga.event('活動主頁', 'click', 'home_eventmobile');
    },
    GA_home_bonusmobile() {
      this.$ga.event('領獎中心', 'click', 'home_bonusmobile');
    },
    GA_home_bannermobile(Sn) {
      this.$ga.event('各活動頁', 'click', 'home_bannermobile', Sn);
    },
    GA_home_platformobile(value) {
      // console.log(value);
      this.$ga.event('平台連結', 'click', 'home_platformobile', value);
    },
    GA_home_platformfishmobile(value) {
      // console.log(value);
      this.$ga.event('平台連結', 'click', 'home_platformfishmobile', value);
    },
    GA_home_platforboardmobile(value) {
      // console.log(value);
      this.$ga.event('平台連結', 'click', 'home_platforboardmobile', value);
    },
    GA_home_servicemobile(Logined) {
      if (Logined) {
        this.$ga.event('在線客服', 'click', 'signhome_servicemobile');
      } else {
        this.$ga.event('在線客服', 'click', 'home_servicemobile');
      }
      window.LC_API.open_chat_window();
    },
    GA_home_inboxmobile() {
      this.$ga.event('置底入口', 'click', 'home_inboxmobile');
    },
    GA_home_walletmobile(GAlabel) {
      this.$ga.event('置底入口', 'click', GAlabel);
    },
    GA_game_bannermobile(value) {
      this.$ga.event('各活動頁', 'click', 'game_bannermobile', value);
    },
    GA_game_platformmobile() {
      this.$ga.event('遊戲平台', 'click', 'game_platformmobile');
    },
    GA_game_hotplaymobile() {
      this.$ga.event('推薦遊戲', 'click', 'game_hotplaymobile');
    },
    GA_game_collectplaymobile(GAlabel) {
      this.$ga.event('收藏清單', 'click', GAlabel);
    },
    GA_game_play(GAcategory, GAaction, GAlabel, Sn) {
      this.$ga.event(GAcategory, GAaction, GAlabel, Sn);
    },
    GA_wallet_takeallmobile() {
      this.$ga.event('轉帳', 'click', 'wallet_takeallmobile');
    },
    GA_member_fastinmobile(value) {
      this.$ga.event('轉帳', 'click', 'member_fastinmobile', value);
    },
    GA_member_fastoutmobile(value) {
      this.$ga.event('轉帳', 'click', 'member_fastoutmobile', value);
    },
    GA_wallet_updatemobile(value) {
      this.$ga.event('更新錢包', 'click', 'wallet_updatemobile', value);
    },
    GA_cashier_savemobile() {
      this.$ga.event('存款', 'click', 'cashier_savemobile');
    },
    GA_cashier_transfermobile() {
      this.$ga.event('轉帳', 'click', 'cashier_transfermobile');
    },
    GA_cashier_withdrawmobile() {
      this.$ga.event('提款', 'click', 'cashier_withdrawmobile');
    },
    GA_member_savemobile() {
      this.$ga.event('存款', 'click', 'member_savemobile');
    },
    GA_member_transfermobile() {
      this.$ga.event('轉帳', 'click', 'member_transfermobile');
    },
    GA_member_transfermobile2(value) {
      this.$ga.event('轉帳', 'click', 'member_transfermobile2', value);
    },
    GA_member_withdrawmobile() {
      this.$ga.event('提款', 'click', 'member_withdrawmobile');
    },
  },
};

export default GAMixin;
