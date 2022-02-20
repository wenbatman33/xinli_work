import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { clearPending } from '@/api';
import { LocalStorageKeys } from '@/utils/constants';
import Lobby from '@/views/Lobby.vue';
import Blank from '@/views/Blank.vue';

/**
 * Define routes
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/promotion',
    name: 'Promotion',
    redirect: '/promotion/list',
    component: Blank,
    children: [
      {
        path: 'list',
        name: 'PromotionList',
        component: () => import('@/views/promotion/List.vue'),
      },
      {
        path: 'detail/:id',
        name: 'PromotionDetail',
        component: () => import('@/views/promotion/Detail.vue'),
      },
    ],
  },
  {
    path: '/bet',
    name: 'Bet',
    redirect: '/bet/list',
    component: Blank,
    children: [
      {
        path: 'list',
        name: 'BetList',
        component: () => import('@/views/bet/List.vue'),
      },
      {
        path: 'detail/:id',
        name: 'BetDetail',
        component: () => import('@/views/bet/Detail.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/force',
    name: 'Force',
    redirect: '/force/phase2sms',
    component: Blank,
    children: [
      {
        path: 'phase2phone',
        name: 'ForcePhase2Phone',
        component: () => import('@/views/force/Phase2Phone.vue'),
      },
      {
        path: 'phase2sms',
        name: 'ForcePhase2Sms',
        component: () => import('@/views/force/Phase2Sms.vue'),
      },
      {
        path: 'password',
        name: 'ForcePassword',
        component: () => import('@/views/force/Password.vue'),
      },
    ],
  },
  {
    path: '/forget',
    name: 'Forget',
    redirect: '/forget/verify',
    component: () => import('@/views/Forget.vue'),
    children: [
      {
        path: 'verify',
        name: 'ForgetVerify',
        component: () => import('@/views/forget/Verify.vue'),
      },
      {
        path: 'reset',
        name: 'ForgetReset',
        component: () => import('@/views/forget/Reset.vue'),
      },
    ],
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: () => import('@/views/Deposit.vue'),
  },
  {
    path: '/deposit/order/:id',
    name: 'DepositOrder',
    component: () => import('@/views/deposit/Order.vue'),
  },
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: () => import('@/views/Withdrawal.vue'),
  },
  {
    path: '/withdrawal/order/:id',
    name: 'WithdrawalOrder',
    component: () => import('@/views/withdrawal/Order.vue'),
  },
  {
    path: '/withdrawal/management',
    name: 'WithdrawalManagement',
    component: () => import('@/views/withdrawal/Management.vue'),
  },
  {
    path: '/gamepage',
    name: 'GamePage',
    component: () => import('@/views/GamePage.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('@/views/Transaction.vue'),
  },
  {
    path: '/security',
    name: 'Security',
    component: () => import('@/views/Security.vue'),
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/Personal.vue'),
  },
  {
    path: '/letter',
    name: 'Letter',
    redirect: '/letter/list',
    component: Blank,
    children: [
      {
        path: 'list',
        name: 'LetterList',
        component: () => import('@/views/letter/List.vue'),
      },
      {
        path: 'detail/:id',
        name: 'LetterDetail',
        component: () => import('@/views/letter/Detail.vue'),
      },
    ],
  },
  {
    path: '/announcement',
    name: 'Announcement',
    redirect: '/announcement/list',
    component: Blank,
    children: [
      {
        path: 'list',
        name: 'AnnouncementList',
        component: () => import('@/views/announcement/List.vue'),
      },
      {
        path: 'detail/:id',
        name: 'AnnouncementDetail',
        component: () => import('@/views/announcement/Detail.vue'),
      },
    ],
  },
  {
    path: '/helpCenter',
    name: 'HelpCenter',
    component: () => import('@/views/HelpCenter.vue'),
  },
  {
    path: '/version',
    name: 'Version',
    component: () => import('@/views/Version.vue'),
  },
  {
    path: '/inapp',
    name: 'InApp',
    component: () => import('@/views/InApp.vue'),
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('@/views/Forbidden.vue'),
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('@/views/Maintenance.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

/**
 * Create vue router instance
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Register before navigate interceptor
 */
router.beforeEach((to) => {
  // Clear pending api request
  clearPending();

  // Scroll to window top
  window.scrollTo(0, 0);

  // Update token if query parameter exists
  const token = to.query.token?.toString() || '';
  if (token.length > 5) {
    window.localStorage.setItem(LocalStorageKeys.TOKEN, token);
  }

  // Force two phase phone
  if (window.localStorage.getItem(LocalStorageKeys.FORCE_TWO_PHASE) == '1') {
    if (to.path != '/force/phase2phone') {
      return {
        path: '/force/phase2phone',
      };
    } else {
      return;
    }
  }

  // Force two phase sms
  if (window.localStorage.getItem(LocalStorageKeys.FORCE_TWO_PHASE) == '3') {
    if (to.path != '/force/phase2sms') {
      return {
        path: '/force/phase2sms',
      };
    } else {
      return;
    }
  }

  // Force change password
  if (window.localStorage.getItem(LocalStorageKeys.FORCE_CHANGE_PASSWORD) == '1') {
    if (to.path != '/force/password') {
      return {
        path: '/force/password',
      };
    } else {
      return;
    }
  }
});

export default router;
