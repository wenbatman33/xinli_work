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
      path: '/promotion', name: 'promotion', meta: { title: '优惠' }, component: promotion,
    },
    { 
      path: '/promotionDetail/:id', name: 'promotionDetail', meta: { title: '优惠说明' }, component: promotionDetail,
    },
    { 
      path: '/news', name: 'news', meta: { title: '公告' }, component: news,
    },
    { path: '/newsDetail/:id', name: 'newsDetail', component: newsDetail },
    {
      path: '/login', name: 'login', meta: { title: '个人' }, component: login,
    },
    { path: '/register', name: 'register', component: register },
    {
      path: '/forget', name: 'forget', meta: { title: '忘记密码' }, component: forget,
    },
    {
      path: '/member', name: 'member', meta: { title: '会员' }, component: member,
    },
    { path: '/member/overview', meta: { title: '钱包' }, component: tgOverview },
    {
      path: '/member/cashier',
      component: tgCashier,
      children: [
        { path: '1', meta: { title: '出纳台' }, component: tgCashier1 },
        { path: '2', meta: { title: '出纳台' }, component: tgCashier2 },
        { path: '3', meta: { title: '出纳台' }, component: tgCashier3 },
      ],
    },
    {
      path: '/member/cashieraddbank', name: 'cashieraddbank', meta: { title: '添加银行卡' }, component: tgCashierAddBank,
    },
    {
      path: '/cashierResult', name: 'cashierResult', meta: { title: '存款明细' }, component: cashierResult,
    },
    {
      path: '/member/bonus',
      component: tgBonus,
      name: 'bonus',
      children: [
        { path: '1', meta: { title: '领奖' }, component: tgReturnData },
        { path: '2', meta: { title: '领奖' }, component: tgRescueData },
        { path: '3', meta: { title: '领奖' }, component: tgBonusData },
      ],
    },
    { path: '/member/bonusdetail', meta: { title: '领奖明细' }, component: tgBonusDetail }, 
    {
      path: '/member/records/:switch', name: 'records', meta: { title: '资金纪录' }, component: tgRecords,
    },
    {
      path: '/member/recordsdetail/', name: 'recordsdetail', meta: { title: '交易明细' }, component: tgRecordsDetail,
    },
    {
      path: '/member/betrecords/:switch', name: 'betrecords', meta: { title: '流水纪录' }, component: tgBetRecords,
    },
    {
      path: '/member/account',
      component: tgAccount,
      children: [
        { path: '1', meta: { title: '个人资料' }, component: tgAccount1 },
        { path: '2', meta: { title: '修改密码' }, component: tgAccount2 },
      ],
    },
    { path: '/member/inbox', meta: { title: '站內信' }, component: tgInbox },
    { path: '/member/inboxdetail/:id', meta: { title: '站內信' }, component: tgInboxDetail },
    {
      path: '/faqs', name: 'faqs', meta: { title: '帮助中心' }, component: faqs,
    },
    {
      path: '/faqs_mb', name: 'faqs_mb', meta: { title: '帮助中心' }, component: faqs_mb,
    },
    {
      path: '/vip', name: 'vip', vipinfo: { title: 'VIP 独享权益' }, component: vip,
    },
    {
      path: '/vip_mb', name: 'vip_mb', vipinfo: { title: 'VIP 独享权益' }, component: vip_mb,
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
