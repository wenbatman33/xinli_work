import jwtDecode from 'jwt-decode';
import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/index.vue';
import register from '@/views/register.vue';
import login from '@/views/login.vue';
import forget from '@/views/forget.vue';
// ////////////////////////////////////////////////////////////////
const member = () => import(/* webpackChunkName: "member" */ '@/views/member.vue');
const tgOverview = () => import(/* webpackChunkName: "tgOverview" */ '@/components/tgMember/tgOverview.vue');
const tgCashier = () => import(/* webpackChunkName: "tgCashier" */ '@/components/tgMember/tgCashier.vue');
const tgCashier1 = () => import(/* webpackChunkName: "tgCashier1" */ '@/components/tgMember/tgCashier1.vue');
const tgCashier2 = () => import(/* webpackChunkName: "tgCashier2" */ '@/components/tgMember/tgCashier2.vue');
const cashierResult = () => import(/* webpackChunkName: "cashierResult" */ '@/views/cashierResult.vue');
// ////////////////////////////////////////////////////////////////
const tgBonus = () => import(/* webpackChunkName: "tgBonus" */ '@/components/tgMember/tgBonus.vue');
const tgBonus1 = () => import(/* webpackChunkName: "tgBonus1" */ '@/components/tgMember/tgBonus1.vue');
const tgBonus2 = () => import(/* webpackChunkName: "tgBonus2" */ '@/components/tgMember/tgBonus2.vue');
const tgBonus3 = () => import(/* webpackChunkName: "tgBonus3" */ '@/components/tgMember/tgBonus3.vue');
const tgRecords = () => import(/* webpackChunkName: "tgRecords" */ '@/components/tgMember/tgRecords.vue');
const tgRecords1 = () => import(/* webpackChunkName: "tgRecords1" */ '@/components/tgMember/tgRecords1.vue');
const tgRecords2 = () => import(/* webpackChunkName: "tgRecords2" */ '@/components/tgMember/tgRecords2.vue');
const tgAccount = () => import(/* webpackChunkName: "tgAccount" */ '@/components/tgMember/tgAccount.vue');
const tgAccount1 = () => import(/* webpackChunkName: "tgAccount1" */ '@/components/tgMember/tgAccount1.vue');
const tgAccount2 = () => import(/* webpackChunkName: "tgAccount2" */ '@/components/tgMember/tgAccount2.vue');
const tgInbox = () => import(/* webpackChunkName: "tgInbox" */ '@/components/tgMember/tgInbox.vue');
// ////////////////////////////////////////////////////////////////
const promotion = () => import(/* webpackChunkName: "promotion" */ '@/views/promotion.vue');
const promotionDetail = () => import(/* webpackChunkName: "promotionDetail" */ '@/views/promotionDetail.vue');
// ///////////////////////////////////////////////////////////////
const news = () => import(/* webpackChunkName: "news" */ '@/views/news.vue');
const newsDetail = () => import(/* webpackChunkName: "newsDetail" */ '@/views/newsDetail.vue');
// ///////////////////////////////////////////////////////////////
const game = () => import(/* webpackChunkName: "game" */ '@/views/game.vue');
const collection = () => import(/* webpackChunkName: "collection" */ '@/views/collection.vue');
const recently = () => import(/* webpackChunkName: "recently" */ '@/views/recently.vue');
const recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/recommend.vue');
// ///////////////////////////////////////////////////////////////
const faq = () => import(/* webpackChunkName: "faq" */ '@/views/faq.vue');
// ///////////////////////////////////////////////////////////////
const vip = () => import(/* webpackChunkName: "vip" */ '@/views/vip.vue');
// ///////////////////////////////////////////////////////////////
const applyAgency = () => import(/* webpackChunkName: "applyAgency" */ '@/views/applyAgency.vue');
// ///////////////////////////////////////////////////////////////
const postMsg = () => import(/* webpackChunkName: "postMsg" */ '@/views/postMsg.vue');
const seatvr = () => import(/* webpackChunkName: "seatvr" */ '@/views/seatvr.vue');
const seat = () => import(/* webpackChunkName: "seat" */ '@/views/seat.vue');
// ///////////////////////////////////////////////////////////////
const unsubscribe = () => import(/* webpackChunkName: "unsubscribe" */ '@/views/unsubscribe.vue');
const error403 = () => import(/* webpackChunkName: "error403" */ '@/views/error403.vue');
const error404 = () => import(/* webpackChunkName: "error404" */ '@/views/error404.vue');
const error505 = () => import(/* webpackChunkName: "error505" */ '@/views/error505.vue');

// const member = () => import(/* webpackChunkName: " */ '@/views/member.vue');
// const tgOverview = () => import(/* webpackChunkName: " */ '@/components/tgMember/tgOverview.vue');
// const tgCashier = () => import(/* webpackChunkName: " */ '@/views/member.vue');
// const tgCashier1 = () => import(/* webpackChunkName: " */ '@/views/member.vue');
// const tgCashier2 = () => import(/* webpackChunkName: " */ '@/views/member.vue');
// const cashierResult = () => import(/* webpackChunkName: " */ '@/views/member.vue');

const pageLoaded = false;

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/slot', name: 'slot', component: game },
    { path: '/fishing', name: 'fishing', component: game },
    { path: '/board', name: 'board', component: game },
    { path: '/arcade', name: 'arcade', component: game },
    // { path: '/pt', name: 'pt', component: game },
    // { path: '/pg', name: 'pg', component: game },
    // { path: '/pp', name: 'pp', component: game },
    { path: '/collection', name: 'collection', component: collection },
    { path: '/recently', name: 'recently', component: recently },
    { path: '/recommend', name: 'recommend', component: recommend },
    { path: '/promotion', name: 'promotion', component: promotion },
    { path: '/promotionDetail/:id', name: 'promotionDetail', component: promotionDetail },
    { path: '/news', name: 'news', component: news },
    { path: '/newsDetail/:id', name: 'newsDetail', component: newsDetail },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    { path: '/forget', name: 'forget', component: forget },
    {
      path: '/member',
      name: 'member',
      component: member,
      children: [
        { path: 'overview', component: tgOverview },
        {
          path: 'cashier',
          component: tgCashier,
          children: [
            { path: '1', component: tgCashier1 },
            { path: '2', component: tgCashier2 },
            { path: '3', component: tgOverview },
          ],
        },
        {
          path: 'bonus',
          component: tgBonus,
          children: [
            { path: '1', component: tgBonus1 },
            { path: '2', component: tgBonus2 },
            { path: '3', component: tgBonus3 },
          ],
        },
        {
          path: 'records',
          component: tgRecords,
          children: [
            { path: 'sum', component: tgRecords1 },
            { path: 'bet', component: tgRecords2 },
          ],
        },
        {
          path: 'account',
          component: tgAccount,
          children: [
            { path: '1', component: tgAccount1 },
            { path: '2', component: tgAccount2 },
          ],
        },
        { path: 'inbox', component: tgInbox },
      ],
    },
    { path: '/faq', name: 'faq', component: faq },
    { path: '/vip', name: 'vip', component: vip },
    { path: '/applyAgency', name: 'applyAgency', component: applyAgency },
    { path: '/unsubscribe', name: 'unsubscribe', component: unsubscribe },
    { path: '/error403', name: 'error403', component: error403 },
    { path: '/error404', name: 'error404', component: error404 },
    { path: '/error505', name: 'error505', component: error505 },
    { path: '/cashierResult', name: 'cashierResult', component: cashierResult },
    { path: '/postMsg', name: 'postMsg', component: postMsg },
    { path: '/seatvr', name: 'seatvr', component: seatvr },
    { path: '/seat', name: 'seat', component: seat },
    { path: '*', redirect: '/error404' },
  ],
});

const checkEntryPage = (to) => {
  let Allow;
  if (to.name === 'login' ||
  to.name === 'index' ||
  to.name === 'register' ||
  to.name === 'forget' ||
  to.name === 'slot' ||
  to.name === 'fishing' ||
  to.name === 'board' ||
  to.name === 'arcade' ||
  to.name === 'recommend' ||
  to.name === 'collection' ||
  to.name === 'recently' ||
  to.name === 'news' ||
  to.name === 'unsubscribe' ||
  to.name === 'faq' ||
  to.name === 'promotion' ||
  to.name === 'promotionDetail' ||
  to.name === 'postMsg' ||
  to.name === 'vip' ||
  to.name === 'error403' ||
  to.name === 'error404' ||
  to.name === 'error505') {
    Allow = true;
  } else {
    Allow = false;
  }
  return Allow;
};

router.beforeEach((to, from, next) => {
  // window.scrollTo(0, 0);
  try {
    const token = jwtDecode(window.localStorage.JWT_TOKEN);
    if (token.login_status) {
      if (token.login_status === 'login') {
        next();
      } else if (token.login_status === 'logout' || token.login_status === 'loginfail') {
        if (checkEntryPage(to)) {
          next();
        } else {
          next({
            name: 'login',
          });
        }
      } else if (token.login_status === 'expired') {
        // 判斷是否逾期
        window.localStorage.setItem('JWT_TOKEN_Overdue', '登录时间逾期 请重新登录');
        next({
          name: 'index',
        });
      } else {
        next();
      }
    }
  } catch (e) {
    next();
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
  // console.log(to);
});

export default router;
