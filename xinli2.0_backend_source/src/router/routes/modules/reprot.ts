import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const report: AppRouteModule = {
  path: '/report',
  name: 'Report',
  component: LAYOUT,
  redirect: '/report/deposit',
  meta: {
    icon: 'la:digital-tachograph',
    title: t('routes.report.title'),
    orderNo: 74,
  },
  children: [
    {
      path: 'deposit',
      name: 'DepositReport',
      component: () => import('/@/views/report/deposit/index.vue'),
      meta: {
        title: t('routes.report.depositReport'),
      },
    },
    {
      path: 'withdraw',
      name: 'WithdrawReport',
      component: () => import('/@/views/report/withdraw/index.vue'),
      meta: {
        title: t('routes.report.withdrawReport'),
      },
    },
  ],
};

export default report;
