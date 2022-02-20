import type { AppRouteModule } from '/@/router/types';

import { PAGE } from '/@/router/constant';

const member: AppRouteModule = {
  path: '/memberDetail',
  name: 'memberDetailPage',
  component: PAGE,
  meta: {
    title: '会员明細',
    orderNo: 2,
    hideMenu: true,
  },
  children: [
    {
      path: 'detail/:id',
      name: 'memberDetail',
      component: () => import('/@/views/member/detail/index.vue'),
      meta: {
        title: '会员明细',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        fnKey: '__menu_member_detail'
      },
    },
    {
      path: 'log/:memberAccount',
      name: 'logDetail',
      component: () => import('/@/views/member/detail/Log.vue'),
      meta: {
        title: '会员明细操作记录',
        hideMenu: true,
        // fnKey: '__menu_member_detail'
      },
    },
    {
      path: 'walletLog/:id',
      name: 'walletLog',
      component: () => import('/@/views/member/walletLog/index.vue'),
      meta: {
        title: '钱包操作记录',
        hideMenu: true,
        // fnKey: '__menu_wallet_log'
      },
    },
  ],
};

export default member;
