import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const finance_report: AppRouteModule = {
  path: '/finance_report',
  name: 'FinanceReport',
  component: LAYOUT,
  redirect: '/finance_report/bankcard_report',
  meta: {
    icon: 'ant-design:area-chart-outlined',
    title: t('routes.finance_report.title'),
    orderNo: 73,
    fnKey: '__menu_finance_report',
  },
  children: [
    {
      path: 'bankcard_report',
      name: 'Bankcard_Report',
      component: () => import('/@/views/finance_report/bankcard_report/index.vue'),
      meta: {
        title: t('routes.finance_report.bankcardReport'),
        hideMenu: false,
        // fnKey: '__menu_bankcard_report',
      },
    },
    {
      path: 'hour_reconciliation',
      name: 'Hour_reconciliation',
      component: () => import('/@/views/finance_report/hour_reconciliation/index.vue'),
      meta: {
        title: '三方整点对帐表',
        hideMenu: false,
      },
    },
    {
      path: 'day_reconciliation',
      name: 'day_reconciliation',
      component: () => import('/@/views/finance_report/day_reconciliation/index.vue'),
      meta: {
        title: '商户号每日对帐表',
        hideMenu: false,
      },
    },
    {
      path: 'paychannel_report',
      name: 'Paychannel_Report',
      component: () => import('/@/views/finance_report/paychannel_report/index.vue'),
      meta: {
        title: t('routes.finance_report.paychannelReport'),
        hideMenu: false,
        // fnKey: '__menu_paychannel_report',
      },
    },
    {
      path: 'usdt_report',
      name: 'USDT_Report',
      component: () => import('/@/views/finance_report/usdt_report/index.vue'),
      meta: {
        title: 'U帐户明细',
        hideMenu: false,
        // fnKey: '__menu_usdt_datily_detail',
      },
    },
    {
      path: 'daily_reached_report',
      name: 'Daily_reached_Report',
      component: () => import('/@/views/finance_report/daily_reached_report/index.vue'),
      meta: {
        title: t('routes.finance_report.dailyReachedReport'),
        hideMenu: false,
        fnKey: '__menu_daily_reached_report',
      },
    },
    {
      path: 'single_reached_report',
      name: 'Single_reached_Report',
      component: () => import('/@/views/finance_report/single_reached_report/index.vue'),
      meta: {
        title: t('routes.finance_report.singleReachedReport'),
        hideMenu: false,
        fnKey: '__menu_single_reached_report',
      },
    },
    {
      path: 'member_report',
      name: 'Member_Report',
      component: () => import('/@/views/finance_report/member_report/index.vue'),
      meta: {
        title: t('routes.finance_report.memberReport'),
        hideMenu: false,
        fnKey: '__menu_member_deposit_report',
      },
    },
  ],
};

export default finance_report;
