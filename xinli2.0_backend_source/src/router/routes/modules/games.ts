import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const games: AppRouteModule = {
  path: '/games',
  name: 'Games',
  component: LAYOUT,
  redirect: '/games/gameGroup',
  meta: {
    icon: 'carbon:game-console',
    title: t('routes.games.title'),
    orderNo: 3,
    fnKey: '__menu_game_management',
  },
  children: [
    {
      path: 'gameAgency',
      name: 'GameAgency Console',
      component: () => import('/@/views/games/gameAgency/index.vue'),
      meta: {
        title: t('routes.games.gameAgency'),
        hideMenu: false,
        // fnKey: '__menu_game_agency',
      },
    },
    {
      path: 'gameGroup',
      name: 'GameGroup Console',
      component: () => import('/@/views/games/gameGroup/index.vue'),
      meta: {
        title: t('routes.games.gameGroup'),
        hideMenu: false,
        fnKey: '__menu_game_group',
      },
    },
    {
      path: 'game',
      name: 'GAme',
      component: () => import('/@/views/games/game/index.vue'),
      meta: {
        title: t('routes.games.game'),
        hideMenu: false,
        fnKey: '__menu_game',
      },
    },
    {
      path: 'gameLog',
      name: 'GameLog',
      component: () => import('/@/views/games/gameLog/index.vue'),
      meta: {
        title: '流水测试',
        hideMenu: false,
        // fnKey: '__menu_betting_log',
      },
    },
  ],
};

export default games;
