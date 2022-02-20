import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-124274863-1',
});

const GAMixin = {
  methods: {
    GA_register_success() {
      this.$ga.event('注冊', 'click', 'register_success');
    },
    GA_register_fail() {
      this.$ga.event('注冊', 'click', 'register_fail');
    },
    GA_login_login() {
      this.$ga.event('登錄', 'click', 'login_login');
    },
    GA_login_forgotpw() {
      this.$ga.event('忘記', 'click', 'login_forgotpw');
    },
    GA_login_register() {
      this.$ga.event('注冊', 'click', 'login_register');
    },
    GA_home_login() {
      this.$ga.event('登錄', 'click', 'home_login');
    },
    GA_home_register() {
      this.$ga.event('注冊', 'click', 'home_register');
    },
    GA_signindex_bonus(Logined) {
      if (Logined) {
        this.$ga.event('領獎中心', 'click', 'signindex_bonus');
      } else {
        this.$ga.event('領獎中心', 'click', 'home_bonus');
      }
    },
    GA_signindex_news(Logined) {
      if (Logined) {
        this.$ga.event('公告', 'click', 'signindex_news');
      } else {
        this.$ga.event('公告', 'click', 'home_news');
      }
    },
    GA_home_event(Logined) {
      if (Logined) {
        this.$ga.event('活動主頁', 'click', 'signindex_event');
      } else {
        this.$ga.event('活動主頁', 'click', 'home_event');
      } 
    },
    GA_home_headerslot(Logined) {
      if (Logined) {
        this.$ga.event('平台連結', 'click', 'signhome_headerslot');
      } else {
        this.$ga.event('平台連結', 'click', 'home_headerslot');
      } 
    },
    GA_home_headerfish(Logined) {
      if (Logined) {
        this.$ga.event('平台連結', 'click', 'signhome_headerfish');
      } else {
        this.$ga.event('平台連結', 'click', 'home_headerfish');
      } 
    },
    GA_home_headerboard(Logined) {
      if (Logined) {
        this.$ga.event('平台連結', 'click', 'signhome_headerboard');
      } else {
        this.$ga.event('平台連結', 'click', 'home_headerboard');
      } 
    },
    GA_home_headerarcade(Logined) {
      if (Logined) {
        this.$ga.event('平台連結', 'click', 'signhome_headerarcade');
      } else {
        this.$ga.event('平台連結', 'click', 'home_headerarcade');
      } 
    },
    GA_home_service(Logined) {
      if (Logined) {
        this.$ga.event('在線客服', 'click', 'signindex_service');
      } else {
        this.$ga.event('在線客服', 'click', 'home_service');
      }
      window.LC_API.open_chat_window();
    },
    GA_member() {
      this.$ga.event('會員中心', 'click', 'signindex_member');
    },
    GA_save() {
      this.$ga.event('存款', 'click', 'signindex_save');
    },
    GA_transfer() {
      this.$ga.event('轉帳', 'click', 'signindex_transfer');
    },
    GA_withdraw() {
      this.$ga.event('提款', 'click', 'signindex_withdraw');
    },
    GA_inbox() {
      this.$ga.event('站內信', 'click', 'signindex_inbox');
    },
    GA_wallet() {
      this.$ga.event('中心錢包', 'click', 'signindex_wallet');
    },
    GA_wallet_personwallet() {
      this.$ga.event('中心錢包', 'click', 'signindex_personwallet');
    },
    GA_wallet_takeall() {
      this.$ga.event('中心錢包', 'click', 'signindex_wallet');
      this.$ga.event('轉帳', 'click', 'signindex_takeall');
    },
    GA_personwallet() {
      this.$ga.event('中心錢包', 'click', 'signindex_personwallet');
    },
    GA_home_platform(value) {
      this.$ga.event('平台連結', 'click', 'home_platform', value);
    },
    GA_home_banner(value) {
      this.$ga.event('各活動頁', 'click', 'home_banner', value);
    },
    GA_game_banner(value) {
      this.$ga.event('各活動頁', 'click', 'game_banner', value);
    },
    GA_game_platform() {
      this.$ga.event('遊戲平台', 'click', 'game_platform');
    },
    GA_game_recommend() {
      this.$ga.event('熱門推薦', 'click', 'game_recommend');
    },
    GA_game_collection() {
      this.$ga.event('收藏清單', 'click', 'game_collection');
    },
    GA_game_recently() {
      this.$ga.event('最近玩過', 'click', 'game_recently');
    },
    GA_game_play(GAcategory, GAaction, GAlabel, Sn) {
      this.$ga.event(GAcategory, GAaction, GAlabel, Sn);
    },
    GA_event_decribe(value) { 
      this.$ga.event('各活動頁', 'click', 'event_decribe', value);
    },
    GA_member_inbox(value) {
      this.$ga.event('站內信', 'click', 'member_inbox', value);
    },
    GA_wallet_update(value) {
      this.$ga.event('更新錢包', 'click', 'wallet_update', value);
    },
    GA_transfer2(GAlabel, value) {
      this.$ga.event('轉帳', 'click', GAlabel, value);
    },
    GA_fastin(GAlabel, value) {
      this.$ga.event('轉帳', 'click', GAlabel, value);
    },
    GA_fastout(GAlabel, value) {
      this.$ga.event('轉帳', 'click', GAlabel, value);
    },
    
    GA_cashier_save() {
      this.$ga.event('存款', 'click', 'cashier_save');
    },
    GA_cashier_transfer() {
      this.$ga.event('轉帳', 'click', 'cashier_transfer');
    },
    GA_cashier_withdraw() {
      this.$ga.event('提款', 'click', 'cashier_withdraw');
    },
  },
};

export default GAMixin;
