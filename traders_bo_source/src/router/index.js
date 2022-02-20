import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // }
]
/** 共用的Router設定 */
const nonepathRouter = { path: '*', redirect: '/', hidden: true }
/** 廠商的Router設定 */
export const customerRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // ====  merchant 商户管理 ====
  {
    path: '/merchantOperator',
    component: Layout,
    name: 'MerchantOperator',
    meta: { title: '商户管理' },
    alwaysShow: true,
    redirect: 'noRedirect',
    children: [
      {
        path: 'oder',
        name: 'MerchantOperatorOrder',
        component: () => import('@/views/merchantOperator/order'),
        meta: { title: '商户代收订单', icon: 'documentation' }
      },
      {
        path: 'info',
        name: 'MerchantOperatorInfo',
        component: () => import('@/views/merchantOperator/info'),
        meta: { title: '商户资讯', icon: 'documentation' }
      }
    ]
  },
  nonepathRouter
]

/**
 * 管理權限
 * adminRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const adminRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  // ====  operating 營運系統 ====
  {
    path: '/operating',
    component: Layout,
    name: 'Operating',
    meta: { title: '營運系統' },
    alwaysShow: true,
    redirect: 'noRedirect',
    children: [
      {
        path: 'distributor',
        name: 'OperatingDistributor',
        component: () => import('@/views/operating/distributor'),
        meta: { title: '代理管理', icon: 'distributor' }
      },
      {
        path: 'trader',
        name: 'OperatingTraderDistributor',
        component: () => import('@/views/operating/trader'),
        meta: { title: '交易员管理', icon: 'distributor' }
      },
      {
        path: 'order',
        name: 'OperatingOrder',
        component: () => import('@/views/operating/order'),
        meta: { title: '訂單', icon: 'wallet' }
      },
      {
        path: 'point',
        name: 'OperatingPoint',
        component: () => import('@/views/operating/point'),
        meta: { title: '点数', icon: 'wallet' }
      }
    ]
  },

  // ==== system 系統管理 ====
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系統管理' },
    alwaysShow: true,
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        name: 'SystemIndex',
        component: () => import('@/views/system/index'),
        meta: { title: '使用者管理', icon: 'user' }
      }
    ]
  },
  nonepathRouter
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
