import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const vip: AppRouteModule = {
  path: '/vip',
  name: 'VIP',
  component: LAYOUT,
  redirect: '/vip/vipList',
  meta: {
    icon: 'ant-design:trophy-twotone',
    title: 'VIP',
    orderNo: 6,
  },
  children: [
    {
      path: 'vipList',
      name: 'vipList',
      component: () => import('/@/views/vip/vipList/index.vue'),
      meta: {
        title: 'VIP 系统',
      },
    },
  ],
};

export default vip;
