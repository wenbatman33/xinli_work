<template lang="pug">
//- 版本資訊
.flex.flex-col.flex-grow.items-stretch.bg-version
  //- 導覽欄
  BasicNav.bg-white(:title='t("version_title")')
    //- 左側
    template(#left)
      //- 返回
      BackButton

  //- 頁面內容
  .flex.flex-col.items-center.px-8.pb-16
    //- 圖示
    img.w-30.h-30.mt-16(:src='iconApp')

    //- 版本
    .flex.flex-row.items-center.headline2.text-primary.mt-8 
      span {{ t("version_current") }}
      span.ml-2 {{ version }}

    //- 版權
    .body3.text-primary.opacity-40.mt-2 {{ t("version_copyright") }}

    //- 簡介
    .paragraph1.text-primary.opacity-40.mt-16 {{ t("version_description") }}
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';

  /**
   * Static icons
   */
  const iconApp = staticImgUrl('icon-app.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Version
   */
  const version = computed(() => {
    return window.APP_VERSION;
  });
</script>

<style scoped lang="scss">
  .bg-version {
    background-color: #f5f5f5;
  }
</style>
