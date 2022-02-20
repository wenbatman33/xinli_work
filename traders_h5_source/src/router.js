import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index.vue';
import Signup from '@/views/Signup.vue';
import SignupSetProfile from '@/views/SignupSetProfile.vue';

import Login from '@/views/Login.vue';
import Forget from '@/views/Forget.vue';
import Invite from '@/views/Invite.vue';
import RestPassword from '@/views/RestPassword.vue';
import Oder from '@/views/Oder.vue';
import OderDetail from '@/views/OderDetail.vue';
import WalletWithDraw from '@/views/WalletWithDraw.vue';
import TraderManage from '@/views/TraderManage.vue';


import ForgetPassword from '@/views/ForgetPassword.vue';
import Point from '@/views/Point.vue';
import Account from '@/views/Account.vue';

// ////////////////////////////////////////////////////////////////////////////////////

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/forget', name: 'Forget', component: Forget },
    { path: '/forgetpassword', name: 'ForgetPassword', component: ForgetPassword },
    // 
    {
      path: '/', name: 'Index', component: Index, meta: { requiresAuth: true }, 
    },
    {
      path: '/restpassword', name: 'RestPassword', component: RestPassword, meta: { requiresAuth: true }, 
    },
    {
      path: '/setprofile', name: 'setprofile', component: SignupSetProfile, meta: { requiresAuth: true }, 
    },
    {
      path: '/invite', name: 'Invite', component: Invite, meta: { requiresAuth: true }, 
    },
    // ////////////////////////////////////////////////////////////////////////////
    {
      path: '/oder', name: 'Oder', component: Oder, meta: { requiresAuth: true }, 
    },
    {
      path: '/oderdetail', name: 'OderDetail', component: OderDetail, meta: { requiresAuth: true }, 
    },
    {
      path: '/walletwithdraw', name: 'WalletWithDraw', component: WalletWithDraw, meta: { requiresAuth: true }, 
    },
    {
      path: '/point', name: 'Point', component: Point, meta: { requiresAuth: true }, 
    },
    {
      path: '/tradermanage', name: 'TraderManage', component: TraderManage, meta: { requiresAuth: true }, 
    },
    
    {
      path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true }, 
    },
    { path: '*', redirect: '/login' },
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

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
