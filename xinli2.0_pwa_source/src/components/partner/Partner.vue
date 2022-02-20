<template lang="pug">
//- 合作夥伴
.flex.flex-col.items-stretch
  //- 合作夥伴標題
  .flex.flex-row.justify-center
    .subtitle3.text-white.opacity-30 {{ t("partner_title") }}

  //- 合作夥伴列表
  .grid.grid-cols-5.justify-center.items-center.mt-2.px-4
    //- 新利
    .flex.flex-col.items-center
      img.w-10.h-10(:src='iconPartner18')
      .body3.text-white.opacity-40.mt-2 {{ t("partner_xinli") }}

    //- 分隔線
    .flex.flex-col.justify-center.items-center
      .w-px.h-6.bg-white.opacity-10

    //- 德甲門興
    .flex.flex-col.items-center
      img.w-10.h-10(:src='iconPartnerMonchen')
      .body3.text-white.opacity-40.mt-2 {{ t("partner_monchen") }}

    //- 分隔線
    .flex.flex-col.justify-center.items-center
      .w-px.h-6.bg-white.opacity-10

    //- Pagcor
    .flex.flex-col.items-center
      img.w-10.h-10(:src='iconPartnerPagcor')
      .body3.text-white.opacity-40.mt-2 {{ t("partner_pagcor") }}
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';

  /**
   * Static icons
   */
  const iconPartner18 = staticImgUrl('icon-partner-18.svg');
  const iconPartnerMonchen = staticImgUrl('icon-partner-monchen.svg');
  const iconPartnerPagcor = staticImgUrl('icon-partner-pagcor.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>

<style scoped lang="scss">
  .grid-cols-partner {
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
  }
</style>
