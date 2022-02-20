import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const payment: AppRouteModule = {
  path: '/payment',
  name: 'Payment',
  component: LAYOUT,
  redirect: '/payment/finance',
  meta: {
    icon: 'la:money-bill',
    title: t('routes.payment.title'),
    orderNo: 11,
    fnKey: '__menu_payment',
  },
  children: [
    {
      path: 'finance',
      name: 'Finance',
      component: () => import('/@/views/payment/finance/index.vue'),
      meta: {
        title: t('routes.payment.finance'),
        hideMenu: false,
        fnKey: '__menu_finance',
      },
    },
    {
      path: 'pay_channel_service',
      name: 'Pay_Channel_Service',
      component: () => import('/@/views/payment/pay_channel_service/index.vue'),
      meta: {
        title: t('routes.payment.payChannelService'),
        hideMenu: false,
        fnKey: '__menu_pay_channel_service',
      },
    },
    {
      path: 'pay_channel',
      name: 'Pay_Channel',
      component: () => import('/@/views/payment/pay_channel/index.vue'),
      meta: {
        title: t('routes.payment.payChannel'),
        hideMenu: false,
        fnKey: '__menu_pay_channel',
      },
    },
    {
      path: 'pay_group',
      name: 'Pay_Group',
      component: () => import('/@/views/payment/pay_group/index.vue'),
      meta: {
        title: t('routes.payment.payGroup'),
        hideMenu: false,
        fnKey: '__menu_pay_bankgroup',
      },
    },
    {
      path: 'pay_bank_group',
      name: 'Pay_Bank_Group',
      component: () => import('/@/views/payment/pay_bank_group/index.vue'),
      meta: {
        title: t('routes.payment.payBankGroup'),
        hideMenu: false,
        fnKey: '__menu_pay_bankgroup',
      },
    },
    {
      path: 'pay_bank_card',
      name: 'Pay_Bank_Card',
      component: () => import('/@/views/payment/pay_bank_card/index.vue'),
      meta: {
        title: t('routes.payment.payBankCard'),
        hideMenu: false,
        fnKey: '__menu_bankcard',
      },
    },
    {
      path: 'pay_u',
      name: 'Pay_U',
      component: () => import('/@/views/payment/pay_u/index.vue'),
      meta: {
        title: 'U帐户管理',
        hideMenu: false,
      },
    },
  ],
};

export default payment;
