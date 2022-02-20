import store from '@/store';
import { Message } from 'element-ui';
import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '../lang';
import admin from '../components/admin.vue';
import announcement from '../components/announcement.vue';
import connect from '../components/connect.vue';
import discount from '../components/discount.vue';
import cashFlow from '../components/cashFlow.vue';
import faq from '../components/faq.vue';
import history from '../components/history.vue';
import historyDetail from '../components/historyDetail.vue';
import investment from '../components/investment.vue';
import marketList from '../components/marketList.vue';
import promotion from '../components/promotion.vue';
import transaction from '../components/transaction.vue';
import Home from '../views/Home.vue';


// 重寫 vue-router 的 push 方法，升級成 vue-cli 4.x 以上出現的 bug
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../components/dashboard'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'marketList',
        name: 'marketList',
        component: marketList,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'investment',
        name: 'investment',
        component: investment,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'history',
        name: 'history',
        component: history,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'historydetail',
        name: 'historydetail',
        component: historyDetail,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'outside',
        beforeEnter: () => {
          window.open('https://www.leisu.com/', '_blank');
        },
      },
      {
        path: 'announcement',
        name: 'announcement',
        component: announcement,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'discount',
        name: 'discount',
        component: discount,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'connect',
        name: 'connect',
        component: connect,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'admin',
        name: 'admin',
        component: admin,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'cashFlow',
        name: 'cashFlow',
        component: cashFlow,
        meta: {
          requiresAuth: true,
        },
        beforeEnter(to, from, next) {
          if (Number(window.localStorage.getItem('is_demo')) === 0) {
            next();
          } else {
            Message.error(i18n.t('server.isDemo'));
            next({ name: 'dashboard' });
          }
        },
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: transaction,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'promotion',
        name: 'promotion',
        component: promotion,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'faq',
        name: 'faq',
        component: faq,
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/down',
    name: 'down',
    component: () => import('@/views/down.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  let isLogin = false;
  if (token !== null && token.length > 0 && token !== undefined) {
    isLogin = true;
  }
  if (to.meta.requiresAuth) {
    if (isLogin) {
      next();
    } else {
      store.dispatch('admin/setLoginModal', true);
      next(from);
    }
  } else {
    next();
  }
});

export default router;
