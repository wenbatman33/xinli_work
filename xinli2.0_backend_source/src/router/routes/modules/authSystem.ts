import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const authSystem: AppRouteModule = {
  path: '/authSystem',
  name: 'AuthSystem',
  component: LAYOUT,
  redirect: '/authSystem/account',
  meta: {
    orderNo: 1,
    icon: 'ant-design:lock-outlined',
    title: t('routes.demo.system.moduleName'),
    fnKey: '__menu_system',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
        fnKey: '__menu_system_account',
      },
      component: () => import('/@/views/authSystem/account/index.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
        fnKey: '__menu_system_role',
      },
      component: () => import('/@/views/authSystem/role/index.vue'),
    },
    {
      path: 'auth',
      name: 'AuthManagement',
      meta: {
        title: t('routes.demo.system.auth'),
        ignoreKeepAlive: true,
        fnKey: '__menu_system_auth',
      },
      component: () => import('/@/views/authSystem/auth/index.vue'),
    },
    {
      path: 'authLog',
      name: 'AuthLog',
      meta: {
        title: '权限操作记录',
        fnKey: '__menu_account_and_auth_log',
      },
      component: () => import('/@/views/authSystem/authLog/index.vue'),
    },
  ],
};

export default authSystem;
