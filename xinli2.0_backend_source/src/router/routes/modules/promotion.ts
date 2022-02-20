import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const finance_report: AppRouteModule = {
  path: '/promotion',
  name: 'Promotion',
  component: LAYOUT,
  redirect: '/promotion/list',
  meta: {
    icon: 'ant-design:red-envelope-outlined',
    title: t('routes.promotion.title'),
    orderNo: 73,
    fnKey: '__menu_promotion',
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('/@/views/promotion/list/index.vue'),
      meta: {
        title: t('routes.promotion.promotionList'),
        hideMenu: false,
        fnKey: '__menu_promotion_list',
      },
    },
    {
      path: 'batch',
      name: 'Batch',
      component: () => import('/@/views/promotion/batch/index.vue'),
      meta: {
        title: t('routes.promotion.promotionBatch'),
        hideMenu: false,
        fnKey: '__menu_promotion_batch',
      },
    },
    {
      path: 'apply',
      name: 'Apply',
      component: () => import('/@/views/promotion/apply/index.vue'),
      meta: {
        title: t('routes.promotion.promotionApply'),
        hideMenu: false,
        fnKey: '__menu_promotion_apply',
      },
    },
    {
      path: 'launched_list',
      name: 'LaunchedList',
      component: () => import('/@/views/promotion/launched_list/index.vue'),
      meta: {
        title: t('routes.promotion.promotionLaunchedList'),
        hideMenu: false,
        fnKey: '__menu_promotion_public',
      },
    },
  ],
};

export default finance_report;
