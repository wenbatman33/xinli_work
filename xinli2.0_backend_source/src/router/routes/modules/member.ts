import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const member: AppRouteModule = {
  path: '/member',
  name: 'member',
  component: LAYOUT,
  redirect: '/member/list',
  meta: {
    icon: 'ant-design:user-outlined',
    title: '会员管理',
    orderNo: 2,
    fnKey: '__menu_member_list'
  },
  children: [
    {
      path: 'list',
      name: 'memberList',
      component: () => import('/@/views/member/index.vue'),
      meta: {
        title: '会员列表',
      },
    },
    {
      path: 'tag',
      name: 'tagSystem',
      component: () => import('/@/views/member/tag/index.vue'),
      meta: {
        title: '标签系统',
      },
    },
    {
      path: 'loginLog',
      name: 'loginLog',
      component: () => import('/@/views/member/loginLog/index.vue'),
      meta: {
        title: '会员登入记录',
      },
    },
  ],
};

export default member;
