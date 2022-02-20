import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
// ////////////////////////////////////////////////////////////////////////////
import My from '@/views/My.vue';
import Game from '@/views/Game.vue';
import GameDetail from '@/views/GameDetail.vue';
import Betting from '@/views/Betting.vue';
import BettingSuccess from '@/views/BettingSuccess.vue';
import BetLog from '@/views/BetLog.vue';
import Deposit from '@/views/Deposit.vue';
import DepositTransfer from '@/views/DepositTransfer.vue';
import Withdraw from '@/views/Withdraw.vue';
import Promotion from '@/views/Promotion.vue';
import PromotionDetail from '@/views/PromotionDetail.vue';
import News from '@/views/News.vue';
import NewsDetail from '@/views/NewsDetail.vue';
import TransactionLog from '@/views/TransactionLog.vue';
// ////////////////////////////////////////////////////////////////////////////

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/promotion', name: 'Promotion', component: Promotion },
    // ////////////////////////////////////////////////////////////////////////////
    {
      path: '/my', name: 'My', component: My, meta: { requiresAuth: true }, 
    },
    {
      path: '/game', name: 'Game', component: Game, meta: { requiresAuth: true }, 
    },
    {
      path: '/gamedetail', name: 'GameDetail', component: GameDetail, meta: { requiresAuth: true }, 
    },
    {
      path: '/betting', name: 'Betting', component: Betting, meta: { requiresAuth: true }, 
    },
    {
      path: '/bettingsuccess', name: 'BettingSuccess', component: BettingSuccess, meta: { requiresAuth: true }, 
    },
    {
      path: '/betlog', name: 'betlog', component: BetLog, meta: { requiresAuth: true }, 
    },
    {
      path: '/deposit', name: 'Deposit', component: Deposit, meta: { requiresAuth: true }, 
    },
    {
      path: '/deposittransfer', name: 'DepositTransfer', component: DepositTransfer, meta: { requiresAuth: true }, 
    },
    {
      path: '/withdraw', name: 'Withdraw', component: Withdraw, meta: { requiresAuth: true }, 
    },
    
    {
      path: '/promotiondetail', name: 'PromotionDetail', component: PromotionDetail, meta: { requiresAuth: false }, 
    },
    {
      path: '/news', name: 'News', component: News, meta: { requiresAuth: true }, 
    },
    {
      path: '/newsdetail', name: 'NewsDetail', component: NewsDetail, meta: { requiresAuth: true }, 
    },
    {
      path: '/transactionLog', name: 'TransactionLog', component: TransactionLog, meta: { requiresAuth: true },
    },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (window.localStorage.getItem('JWT_TOKEN')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
router.afterEach((to, from, next) => {
  setTimeout(() => {
    document.getElementById('mainContent').scrollTop = 0;
  }, 100);
});


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
