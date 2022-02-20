import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const agency: AppRouteModule = {
  path: '/agency',
  name: 'Agency',
  component: LAYOUT,
  redirect: '/games/gameGroup',
  meta: {
    icon: 'ant-design:partition-outlined',
    title: '代理系统',
    orderNo: 3,
    // fnKey: '__menu_agency_management',
  },
  children: [
    {
      path: 'deposit',
      name: 'AgencyDeposit',
      component: () => import('/@/views/agency/deposit/index.vue'),
      meta: {
        title: t('routes.agency.deposit'),
        fnKey: '__menu_agency_deposit',
      },
    },
    {
      path: 'withdrawal',
      name: 'AgencyWithdrawal',
      component: () => import('/@/views/agency/withdrawal/index.vue'),
      meta: {
        title: t('routes.agency.withdrawal'),
        fnKey: '__menu_agency_withdrawal',
      },
    },
    {
      path: 'agencyGroup',
      name: 'AgencyGroupConsole',
      component: () => import('/@/views/agency/agencyGroup/index.vue'),
      meta: {
        title: '佣金群组管理',
        hideMenu: false,
        // fnKey: '__menu_agency_group',
      },
    },
    {
      path: 'agencyapplication',
      name: 'agencyapplication',
      component: () => import('/@/views/agency/agencyapplication/index.vue'),
      meta: {
        title: '代理申請列表',
        hideMenu: false,
        // fnKey: '__menu_agency_group',
      },
    },
    {
      path: 'childapplication',
      name: 'Childapplication',
      component: () => import('/@/views/agency/childapplication/index.vue'),
      meta: {
        title: '二代申請列表',
        hideMenu: false,
        // fnKey: '__menu_agency_group',
      },
    },
    {
      path: 'agencyMain',
      name: 'AgencyMain',
      component: () => import('/@/views/agency/agencyMain/index.vue'),
      meta: {
        title: '代理列表',
        hideMenu: false,
        // fnKey: '__menu_agency_group',
      },
    },
    {
      path: 'memberNode',
      name: 'MemberNode',
      component: () => import('/@/views/agency/memberNode/index.vue'),
      meta: {
        title: '會員轉線設定',
        hideMenu: false,
        // fnKey: '__menu_agency_group',
      },
    },
    {
      path: 'wallet',
      name: 'AgencyWallet',
      component: () => import('/@/views/agency/wallet/index.vue'),
      meta: {
        title: '代理钱包管理',
        hideMenu: false,
      }
    },
    {
      path: 'commission',
      name: 'Commission',
      component: () => import('/@/views/agency/commission/index.vue'),
      meta: {
        title: '佣金派发',
        // fnKey: '__menu_agency_group',
      },
    },
  ],
};

export default agency;
