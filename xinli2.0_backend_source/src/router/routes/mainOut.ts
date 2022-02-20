import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';

/**
 * 無框架的畫面測試-之後提款審核頁面會使用到
 */
export const TEST_ROUTE: AppRouteRecordRaw = {
  path: '/testPage',
  name: 'Test Page',
  component: () => import('/@/views/payment/pay_group/test.vue'),
  meta: {
    title: 'TEST_PAGE',
  },
};

export const mainOutRoutes: AppRouteModule[] = [TEST_ROUTE];
export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
