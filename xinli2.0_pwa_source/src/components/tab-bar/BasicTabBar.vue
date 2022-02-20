<template lang="pug">
//- 標籤欄
Tabbar.z-50.h-auto(:model-value='path', :fixed='fixed', active-color='#F0453A', inactive-color='#071F44', border, safe-area-inset-bottom)
  //- 標籤列表
  TabbarItem.py-2(v-for='item in tabList', :name='item.path', :to='item.path', :icon='item.icon') {{ item.title }}
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { Tabbar, TabbarItem } from 'vant';
  import { staticImgUrl } from '@/utils';

  /**
   * Static icons
   */
  const iconHomeActive = staticImgUrl('icon-home-active.svg');
  const iconHomeInactive = staticImgUrl('icon-home-inactive.svg');
  const iconPromotionActive = staticImgUrl('icon-promotion-active.svg');
  const iconPromotionInactive = staticImgUrl('icon-promotion-inactive.svg');
  const iconBetActive = staticImgUrl('icon-bet-active.svg');
  const iconBetInactive = staticImgUrl('icon-bet-inactive.svg');
  const iconProfileActive = staticImgUrl('icon-profile-active.svg');
  const iconProfileInactive = staticImgUrl('icon-profile-inactive.svg');

  /**
   * Component props interface
   */
  interface Props {
    fixed: boolean;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const route = useRoute();

  /**
   * Route path
   */
  const path = computed(() => {
    return route.path;
  });

  /**
   * Tab list
   */
  const tabList = computed(() => {
    return [
      {
        path: '/',
        title: t('app_lobby'),
        icon: path.value === '/' ? iconHomeActive : iconHomeInactive,
      },
      {
        path: '/promotion/list',
        title: t('app_promotion'),
        icon: path.value === '/promotion/list' ? iconPromotionActive : iconPromotionInactive,
      },
      {
        path: '/bet/list',
        title: t('app_bet'),
        icon: path.value === '/bet/list' ? iconBetActive : iconBetInactive,
      },
      {
        path: '/profile',
        title: t('app_profile'),
        icon: path.value === '/profile' ? iconProfileActive : iconProfileInactive,
      },
    ];
  });
</script>
