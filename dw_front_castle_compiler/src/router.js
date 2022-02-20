import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/index.vue';
import maintain from '@/views/maintain.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/detail', name: 'detail', component: () => import(/* webpackChunkName: "detail" */ '@/views/detail.vue') },
    { path: '/cart', name: 'cart', component: () => import(/* webpackChunkName: "cart" */ '@/views/cart.vue') },
    { path: '/exchange', name: 'exchange', component: () => import(/* webpackChunkName: "exchange" */ '@/views/exchange.vue') },
    { path: '/oder', name: 'oder', component: () => import(/* webpackChunkName: "oder" */ '@/views/oder.vue') },
    { path: '/mission', name: 'mission', component: () => import(/* webpackChunkName: "mission" */ '@/views/mission.vue') },
    { path: '/signature', name: 'signature', component: () => import(/* webpackChunkName: "signature" */ '@/views/signature.vue') },
    { path: '/bet', name: 'bet', component: () => import(/* webpackChunkName: "bet" */ '@/views/bet.vue') },
    { path: '/betlog', name: 'betlog', component: () => import(/* webpackChunkName: "betlog" */ '@/views/betlog.vue') },
    { path: '/betrule', name: 'betrule', component: () => import(/* webpackChunkName: "betrule" */ '@/views/betrule.vue') },
    { path: '/betgame', name: 'betgame', component: () => import(/* webpackChunkName: "betgame.vue" */ '@/views/betgame.vue') },
    { 
      path: '/maintain',
      components: { maintainRouterView: maintain },
    },
    { path: '*', redirect: '/' },
  ],
});

const checkEntryPage = (to) => {
  let Allow;
  if (
    to.name === 'index' ||
    to.name === 'detail' ||
    to.name === 'mission' ||
    to.name === 'maintain' ||
    to.name === 'bet'
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
});
router.beforeEach((to, from, next) => {
  try {
    // for app
    if (to.query.token && to.query.finger) {
      window.localStorage.setItem('JWT_TOKEN', to.query.token);
      window.localStorage.setItem('Finger', to.query.finger);
    }
    if (!window.localStorage.JWT_TOKEN) {
      window.localStorage.removeItem('LC_API_ID');
      window.localStorage.removeItem('LC_API_EMAIL');
      window.LC_API.set_visitor_name('GUEST');
      window.LC_API.set_visitor_email('');
      if (checkEntryPage(to)) {
        next();
      } else {
        next('/');
      }
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
  setTimeout(() => NProgress.start());
});

export default router;
