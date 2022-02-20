import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const operator: AppRouteModule = {
  path: '/operator',
  name: 'Operator',
  component: LAYOUT,
  redirect: '/operator/banner',
  meta: {
    orderNo: 70,
    icon: 'websymbol:updown-circle',
    title: t('routes.operator.title'),
    fnKey: '__menu_operator',
  },
  children: [
    {
      path: 'banner',
      name: 'Banner',
      meta: {
        title: t('routes.operator.banner'),
        ignoreKeepAlive: false,
        fnKey: '__menu_banner',
      },
      component: () => import('/@/views/operator/banner/index.vue'),
    },
    {
      path: 'bannercat',
      name: 'Banner Category',
      meta: {
        title: t('routes.operator.bannerCat'),
        ignoreKeepAlive: true,
        fnKey: '__menu_bannercat',
      },
      component: () => import('/@/views/operator/bannerCat/index.vue'),
    },
    {
      path: 'announcement',
      name: 'Announcement',
      meta: {
        title: t('routes.operator.announcement'),
        ignoreKeepAlive: true,
        fnKey: '__menu_announcement',
      },
      component: () => import('/@/views/operator/announcement/index.vue'),
    },
    {
      path: 'inboxList',
      name: 'InboxList',
      meta: {
        title: '站内信发送列表',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/operator/inboxList/index.vue'),
    },
    {
      path: 'systemLetter',
      name: 'SystemLetter',
      meta: {
        title: '系统站内信',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/operator/systemLetter/index.vue'),
    },
  ],
};

export default operator;
