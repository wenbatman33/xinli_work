import type { AppRouteModule } from '/@/router/types';

import { PAGE } from '/@/router/constant';

const member: AppRouteModule = {
  path: '/agencyDetail',
  name: 'agencyDetailPage',
  component: PAGE,
  meta: {
    title: '会员明細',
    orderNo: 2,
    hideMenu: true,
  },
  children: [
    {
      path: 'detail/:id',
      name: 'agencyDetail',
      component: () => import('/@/views/agency/agencyMain/detail/index.vue'),
      meta: {
        title: '代理明细',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        // fnKey: '__menu_agency_detail',
      },
    },
  ],
};

export default member;
