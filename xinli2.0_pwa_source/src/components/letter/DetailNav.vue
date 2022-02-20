<template lang="pug">
//- 公告導覽欄
BasicNav.bg-white(:title='t(`letter_detail`)')
  //- 左側
  template(#left)
    //- 關閉
    BackButton(:src='iconClosePrimary')
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>
