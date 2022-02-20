import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const risk: AppRouteModule = {
  path: '/risk_control',
  name: 'risk',
  component: LAYOUT,
  redirect: '/risk_control/first_review',
  meta: {
    icon: 'ant-design:alert-outlined',
    title: '风控',
    orderNo: 6,
  },
  children: [
    {
      path: 'first_review',
      name: 'first_review',
      component: () => import('/@/views/risk_control/first_review/index.vue'),
      meta: {
        title: '初审模组',
        fnKey: '__menu_new_member_audit'
      },
    },
    {
      path: 'member_device_ghost',
      name: 'member_device_ghost',
      component: () => import('/@/views/risk_control/member_device_ghost/index.vue'),
      meta: {
        title: '會員同裝置',
        fnKey: '__menu_member_device_ghost'
      },
    },
    {
      path: 'adjustment',
      name: 'Adjustment',
      component: () => import('/@/views/risk_control/adjustment/index.vue'),
      meta: {
        title: '手动上下分',
        fnKey: '__menu_adjustment_management'
      },
    },
    {
      path: 'adjustmentList',
      name: 'AdjustmentList',
      component: () => import('/@/views/risk_control/adjustment_list/index.vue'),
      meta: {
        title: '手动上下分会员清单',
        fnKey: '__menu_adjustment_management'
      },
    },
  ],
};

export default risk;
