import type { AppRouteModule } from '/@/router/types';

import { PAGE } from '/@/router/constant';

const withdrawal: AppRouteModule = {
  path: '/withdrawal',
  name: 'withdrawal',
  component: PAGE,
  meta: {
    title: 'Withdrawal',
    hideMenu: true,
  },
  children: [
    {
      path: 'financial/check/:sn',
      name: 'FinancialCheck',
      component: () => import('/@/views/withdrawal/financial_check/index.vue'),
      meta: {
        title: '提款审核',
        fnKey: '__menu_withdrawal',
      },
    },
    {
      path: 'payout/:sn',
      name: 'Payout',
      component: () => import('/@/views/withdrawal/payout/index.vue'),
      meta: {
        title: '出款',
        fnKey: '__menu_withdrawal',
      },
    },
  ],
};

export default withdrawal;
