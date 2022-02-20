import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const systemManage: AppRouteModule = {
  path: '/systemManage',
  name: 'SystemManage',
  component: LAYOUT,
  redirect: '/systemManage/system',
  meta: {
    icon: 'ant-design:setting-twotone',
    title: '系统管理',
    orderNo: 11,
  },
  children: [
    {
      path: 'loginSwitch',
      name: 'loginSwitch',
      component: () => import('/@/views/systemManage/loginSwitch/index.vue'),
      meta: {
        title: '注册与登入相关开关',
      },
    },
    {
      path: 'systemSwitch',
      name: 'systemSwitch',
      component: () => import('/@/views/systemManage/systemSwitch/index.vue'),
      meta: {
        title: '系统开关',
      },
    },
    {
      path: 'domainManage',
      name: 'domainManage',
      component: () => import('/@/views/systemManage/domainManage/index.vue'),
      meta: {
        title: '域名管理',
      },
    },
    {
      path: 'smsVendor',
      name: 'smsVendor',
      component: () => import('/@/views/systemManage/smsVendor/index.vue'),
      meta: {
        title: '简讯商切换',
      },
    },
  ],
};

export default systemManage;
