import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const cashflow: AppRouteModule = {
  path: '/cashflow',
  name: 'Cashflow',
  component: LAYOUT,
  redirect: '/cashflow/deposit',
  meta: {
    icon: 'la:images',
    title: t('routes.cashflow.title'),
    orderNo: 5,
    fnKey: '__menu_cashflow',
  },
  children: [
    {
      path: 'deposit',
      name: 'Deposit',
      component: () => import('/@/views/cashflow/deposit/index.vue'),
      meta: {
        title: t('routes.cashflow.deposit'),
        fnKey: '__menu_deposit',
      },
    },
    {
      path: 'withdrawal',
      name: 'Withdrawal',
      component: () => import('/@/views/cashflow/withdrawal/index.vue'),
      meta: {
        title: t('routes.cashflow.withdrawal'),
        fnKey: '__menu_withdrawal',
      },
    },
    {
      path: 'payout_navi',
      name: 'PayoutNavi',
      meta: {
        title: t('routes.cashflow.payoutNavi'),
        fnKey: '__menu_withdrawal',
      },
    },
  ],
};

export default cashflow;
