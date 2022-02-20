import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/promotion',
      component: () => import('@/views/Promotion.vue'),
      children: [
        {
          path: '',
          name: 'promotion',
          component: () => import(/* webpackChunkName: "promotion" */ '@/components/bl_Promotion/bl_Promotion.vue'),
        },
      ],
    },
    {
      path: '/my',
      component: () => import('@/views/My.vue'),
      children: [
        {
          path: '',
          name: 'member',
          component: () => import(/* webpackChunkName: "member" */ '@/components/bl_My/bl_My.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'transactionlog',
          name: 'transactionlog',
          component: () => import(/* webpackChunkName: "transactionlog" */ '@/components/bl_My/bl_TransactionLog/bl_TransactionLog.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'mypromotion',
          name: 'mypromotion',
          component: () => import(/* webpackChunkName: "mypromotion" */ '@/components/bl_My/bl_MyPromotion/bl_MyPromotion.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'cycle/:id',
          name: 'cycle',
          component: () => import(/* webpackChunkName: "cycle" */ '@/components/bl_Promotion/bl_CyclePromotion.vue'),
        },
        {
          path: 'betting',
          name: 'betting',
          component: () => import(/* webpackChunkName: "betting" */ '@/components/bl_My/bl_Betting/bl_Betting.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'personal',
          name: 'personal',
          component: () => import(/* webpackChunkName: "personal" */ '@/components/bl_My/bl_Personal/bl_Personal.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import(/* webpackChunkName: "detail" */ '@/components/bl_My/bl_Detail/bl_Detail.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import(/* webpackChunkName: "notice" */ '@/components/bl_My/bl_Notice/bl_Notice.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'inbox',
          name: 'inbox',
          component: () => import(/* webpackChunkName: "inbox" */ '@/components/bl_My/bl_Inbox/bl_Inbox.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/agency',
      name: 'agency',
      component: () => import(/* webpackChunkName: "agency" */ '@/views/Agency.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    { path: '/games', name: 'games', component: () => import(/* webpackChunkName: "Games" */ '@/views/Games.vue') },
    { path: '/bet', name: 'bet', component: () => import(/* webpackChunkName: "Bet" */ '@/views/Bet.vue') },
    { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue') },
    { path: '/faq', name: 'faq', component: () => import(/* webpackChunkName: "Faq" */ '@/views/Faq.vue') },
    { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue') },
    { path: '/register', name: 'register', component: () => import(/* webpackChunkName: "Register" */ '@/views/Register.vue') },
    { path: '/forget', name: 'forget', component: () => import(/* webpackChunkName: "Forget" */ '@/views/Forget.vue') },
    // for App team
    { path: '/forApp', component: () => import(/* webpackChunkName: "App_deposit" */'@/components/bl_AppTeam/App_Deposit.vue') },
    { path: '/forApp/promotionDetail', component: () => import(/* webpackChunkName: "App_promotionDetail" */'@/components/bl_AppTeam/App_PromotionDetail.vue') },
    { path: '/forApp/bet', component: () => import(/* webpackChunkName: "App_bet" */'@/components/bl_AppTeam/App_bet.vue') },
    { path: '/forApp/about', component: () => import(/* webpackChunkName: "App_about" */'@/components/bl_AppTeam/App_about.vue') },
    { path: '/forApp/faq', component: () => import(/* webpackChunkName: "App_faq" */'@/components/bl_AppTeam/App_faq.vue') },
    { path: '/forApp/agency', component: () => import(/* webpackChunkName: "App_agency" */'@/components/bl_AppTeam/App_agency.vue') },

    { path: '/test', name: 'test', component: () => import('@/components/test.vue') },
    { path: '/maintain', name: 'maintain', component: () => import('@/views/Maintain.vue') },
    { path: '/appdownload', name: 'appdownload', component: () => import('@/views/appdownload.vue') },
    { path: '/vip', name: 'vip', component: () => import('@/views/Vip.vue') },
    {
      path: '/event',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ '@/components/event/index.vue'),
      children: [
        { path: '20200201', component: () => import(/* webpackChunkName: "event" */ '@/components/event/20200201/index.vue')},
      ],
    },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (window.localStorage.getItem('JWT_TOKEN')) {
      next();
    } else {
      // 暫存登入前的連結導向
      // TODO:缺少 tempOutsideLink 開啟的方法參數
      window.localStorage.setItem('tempLink', to.path);
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
