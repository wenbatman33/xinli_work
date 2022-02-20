<template lang="pug">
//- 維護頁
.flex.flex-col.flex-grow.items-center.px-8.pb-16(:style='bg')
  //- 圖示
  img.w-16.h-16.mt-16(:src='iconMaintenanceLogo')

  //- 標題
  .headline1.text-primary.mt-10 {{ t("maintenance_title") }}

  //- 說明
  .paragraph2.text-primary.text-center.opacity-40.mt-6 {{ t("maintenance_content") }}

  //- 聯繫客服
  BasicButton.mt-6(bg='accent100', size='large') {{ t("forbidden_concat") }}

  //- 圖示
  img.h-64.mt-14(:src='iconMaintenance')
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconMaintenance = staticImgUrl('icon-maintenance.png');
  const iconMaintenanceLogo = staticImgUrl('icon-maintenance-logo.svg');
  const iconMaintenanceBackground = staticImgUrl('icon-maintenance-background.png');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Background
   */
  const bg = computed(() => {
    return {
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundImage: `url(${iconMaintenanceBackground})`,
    };
  });
</script>
