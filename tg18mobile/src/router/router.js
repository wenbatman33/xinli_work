import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/index.vue';
import register from '@/views/register.vue';
import login from '@/views/login.vue';
import forget from '@/views/forget.vue';
// / ///////////////////////////////////////////////////////////////
import member from '@/views/member.vue';
import tgOverview from '@/components/tgMember/tgOverview.vue';
import tgCashier from '@/components/tgMember/tgCashier.vue';
import tgCashier1 from '@/components/tgMember/tgCashier1.vue';
import tgCashier2 from '@/components/tgMember/tgCashier2.vue';
import tgCashier3 from '@/components/tgMember/tgCashier3.vue';
import tgCashierAddBank from '@/components/tgMember/tgCashierAddBank.vue';
import cashierResult from '@/views/cashierResult.vue';
// / ///////////////////////////////////////////////////////////////
import tgBonus from '@/components/tgMember/tgBonus.vue';
import tgBonusDetail from '@/components/tgMember/tgBonusDetail.vue';
import tgReturnData from '@/components/tgMember/tgBonusContent/tgReturnData.vue';
import tgRescueData from '@/components/tgMember/tgBonusContent/tgRescueData.vue';
import tgBonusData from '@/components/tgMember/tgBonusContent/tgBonusData.vue';
// / ///////////////////////////////////////////////////////////////
import tgRecords from '@/components/tgMember/tgRecords.vue';
import tgRecordsDetail from '@/components/tgMember/tgRecordsDetail.vue';
import tgBetRecords from '@/components/tgMember/tgBetRecords.vue';
// / ///////////////////////////////////////////////////////////////
import tgAccount from '@/components/tgMember/tgAccount.vue';
import tgAccount1 from '@/components/tgMember/tgAccount1.vue';
import tgAccount2 from '@/components/tgMember/tgAccount2.vue';
import tgInbox from '@/components/tgMember/tgInbox.vue';
import tgInboxDetail from '@/components/tgMember/tgInboxDetail.vue';
// / ///////////////////////////////////////////////////////////////
import promotion from '@/views/promotion.vue';
import promotionDetail from '@/views/promotionDetail.vue';
// / ///////////////////////////////////////////////////////////////
import news from '@/views/news.vue';
import newsDetail from '@/views/newsDetail.vue';
// / ///////////////////////////////////////////////////////////////
import game from '@/views/game.vue';
import tgGames from '@/components/tgGames/tgGames.vue';
import tgCollection from '@/components/tgGames/tgCollection.vue';
import tgRecently from '@/components/tgGames/tgRecently.vue';
import tgRecommend from '@/components/tgGames/tgRecommend.vue';
// / ///////////////////////////////////////////////////////////////
import faqs from '@/views/faqs.vue';
import faqs_mb from '@/views/faqs_mb.vue';
// ///////////////////////////////////////////////////////////////
import vip from '@/views/vip.vue';
import vip_mb from '@/views/vip_mb.vue';
// ///////////////////////////////////////////////////////////////
import unsubscribe from '@/views/unsubscribe.vue';
import error403 from '@/views/error403.vue';
import error404 from '@/views/error404.vue';
import error505 from '@/views/error505.vue';
import seatvr from '@/views/seatvr.vue';
import seat from '@/views/seat.vue';
import postMsg from '@/views/postMsg.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    {
      path: '/games',
      name: 'games',
      component: game,
      children: [
        // {
        //   path: 'group', 
        //   component: tgGames, 
        //   children: [
        //     { path: 'pt' },
        //     { path: 'pg' },
        //     { path: 'pp' },
        //   ], 
        // },
        { path: 'slot', name: 'slot', component: tgGames },
        { path: 'fishing', name: 'fishing', component: tgGames },
        { path: 'board', name: 'board', component: tgGames },
        { path: 'collection', name: 'collection', component: tgCollection },
        { path: 'recently', name: 'recently', component: tgRecently },
        { path: 'recommend', name: 'recommend', component: tgRecommend },
      ],
    },
    { 
      path: '/promotion', name: 'promotion', meta: { title: '??????' }, component: promotion,
    },
    { 
      path: '/promotionDetail/:id', name: 'promotionDetail', meta: { title: '????????????' }, component: promotionDetail,
    },
    { 
      path: '/news', name: 'news', meta: { title: '??????' }, component: news,
    },
    { path: '/newsDetail/:id', name: 'newsDetail', component: newsDetail },
    {
      path: '/login', name: 'login', meta: { title: '??????' }, component: login,
    },
    { path: '/register', name: 'register', component: register },
    {
      path: '/forget', name: 'forget', meta: { title: '????????????' }, component: forget,
    },
    {
      path: '/member', name: 'member', meta: { title: '??????' }, component: member,
    },
    { path: '/member/overview', meta: { title: '??????' }, component: tgOverview },
    {
      path: '/member/cashier',
      component: tgCashier,
      children: [
        { path: '1', meta: { title: '?????????' }, component: tgCashier1 },
        { path: '2', meta: { title: '?????????' }, component: tgCashier2 },
        { path: '3', meta: { title: '?????????' }, component: tgCashier3 },
      ],
    },
    {
      path: '/member/cashieraddbank', name: 'cashieraddbank', meta: { title: '???????????????' }, component: tgCashierAddBank,
    },
    {
      path: '/cashierResult', name: 'cashierResult', meta: { title: '????????????' }, component: cashierResult,
    },
    {
      path: '/member/bonus',
      component: tgBonus,
      name: 'bonus',
      children: [
        { path: '1', meta: { title: '??????' }, component: tgReturnData },
        { path: '2', meta: { title: '??????' }, component: tgRescueData },
        { path: '3', meta: { title: '??????' }, component: tgBonusData },
      ],
    },
    { path: '/member/bonusdetail', meta: { title: '????????????' }, component: tgBonusDetail }, 
    {
      path: '/member/records/:switch', name: 'records', meta: { title: '????????????' }, component: tgRecords,
    },
    {
      path: '/member/recordsdetail/', name: 'recordsdetail', meta: { title: '????????????' }, component: tgRecordsDetail,
    },
    {
      path: '/member/betrecords/:switch', name: 'betrecords', meta: { title: '????????????' }, component: tgBetRecords,
    },
    {
      path: '/member/account',
      component: tgAccount,
      children: [
        { path: '1', meta: { title: '????????????' }, component: tgAccount1 },
        { path: '2', meta: { title: '????????????' }, component: tgAccount2 },
      ],
    },
    { path: '/member/inbox', meta: { title: '?????????' }, component: tgInbox },
    { path: '/member/inboxdetail/:id', meta: { title: '?????????' }, component: tgInboxDetail },
    {
      path: '/faqs', name: 'faqs', meta: { title: '????????????' }, component: faqs,
    },
    {
      path: '/faqs_mb', name: 'faqs_mb', meta: { title: '????????????' }, component: faqs_mb,
    },
    {
      path: '/vip', name: 'vip', vipinfo: { title: 'VIP ????????????' }, component: vip,
    },
    {
      path: '/vip_mb', name: 'vip_mb', vipinfo: { title: 'VIP ????????????' }, component: vip_mb,
    },
    { path: '/unsubscribe', name: 'unsubscribe', component: unsubscribe },
    { path: '/error403', name: 'error403', component: error403 },
    { path: '/error404', name: 'error404', component: error404 },
    { path: '/error505', name: 'error505', component: error505 },
    { path: '/postMsg', name: 'postMsg', component: postMsg },
    { path: '/seatvr', name: 'seatvr', component: seatvr },
    { path: '/seat', name: 'seat', component: seat },
    { path: '*', redirect: '/' },
  ],
});
