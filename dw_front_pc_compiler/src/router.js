import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/index.vue';
import NProgress from 'nprogress';
import games from '@/views/games.vue';
import bet from '@/views/bet.vue';
import my from '@/views/my.vue';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/games', name: 'games', component: games },
    { path: '/bet', name: 'bet', component: bet },
    { 
      // my
      path: '/my', 
      name: 'my',
      component: my,
      children: [
        { path: 'personal', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/personal.vue') },
        { path: 'transactionlog', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/transactionlog.vue') },
        { path: 'betting', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/betting.vue') },
        { path: 'detail', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/detail.vue') },
        { path: 'bankcard', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/bankcard.vue') },
        { path: 'inbox', component: () => import(/* webpackChunkName: "memberShip" */ '@/components/bl_my/inbox.vue') },
        // mypromotion & cycle
        { path: 'mypromotion', component: () => import(/* webpackChunkName: "mypromotion" */ '@/components/bl_Promotion/mypromotion.vue') },
        { path: 'cycle/:id', component: () => import(/* webpackChunkName: "mypromotion" */ '@/components/bl_Promotion/cycle.vue') },
      ],
    },
    { path: '/faq', name: 'faq', component: () => import(/* webpackChunkName: "faq" */ '@/views/faq.vue') },
    { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue') },
    { path: '/promotion', name: 'promotion', component: () => import(/* webpackChunkName: "promotion" */ '@/views/promotion.vue') },
    { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue') },
    { path: '/register', name: 'register', component: () => import(/* webpackChunkName: "register" */ '@/views/register.vue') },
    { path: '/loading', name: 'loading', component: () => import(/* webpackChunkName: "loading" */ '@/views/loading.vue') },
    { path: '/maintain', name: 'maintain', component: () => import(/* webpackChunkName: "maintaining" */ '@/views/maintain.vue') },
    { path: '/agency', name: 'agency', component: () => import(/* webpackChunkName: "agency" */ '@/views/agency.vue') },
    { path: '/appdownload', name: 'appdownload', component: () => import(/* webpackChunkName: "appdownload" */ '@/views/appdownload.vue') },
    { path: '/vip', name: 'vip', component: () => import(/* webpackChunkName: "vip" */ '@/views/vip.vue') },
    { 
      // Campaign
      path: '/event',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ '@/components/event/index.vue'),
      children: [
        // name為'campaign' 不需要登入
        { path: '20200201', name: 'event20200201', component: () => import(/* webpackChunkName: "event" */ '@/components/event/20200201/index.vue') },
      ],
    },
    { path: '*', redirect: '/' },
  ],
});

const checkEntryPage = (to) => {
  let Allow;
  if (
    to.name === 'index' ||
    to.name === 'games' ||
    to.name === 'promotion' ||
    to.name === 'faq' ||
    to.name === 'about' ||
    to.name === 'test' ||
    to.name === 'loading' ||
    to.name === 'login' ||
    to.name === 'register' ||
    to.name === 'appdownload' ||
    to.name === 'maintain' ||
    to.name === 'event' ||
    to.name === 'vip'

  ) {
    Allow = true;
  } else {
    Allow = false;
  }
  return Allow;
};
router.afterEach((to, from, next) => {
  setTimeout(() => NProgress.done(), 300);
  if (document.getElementById('mainContent')) document.getElementById('mainContent').scrollTop = 0;
  if (to.path === '/' && to.hash === '#app') {
    setTimeout(() => {
      window.document.getElementById('mainContent').scrollTop = 850;
    }, 1000);
  }
});
router.beforeEach((to, from, next) => {
  // 因為 pc 沒有my page 轉跳personal
  if (to.name === 'my') {
    next('/my/personal');
  }
  try {
    // 
    if (!window.localStorage.JWT_TOKEN) {
      if (checkEntryPage(to)) {
        next();
      } else {
        // 暫存登入前的連結導向
        window.localStorage.setItem('tempLink', to.path);
        next('/login');
      }
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
  setTimeout(() => NProgress.start());
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
