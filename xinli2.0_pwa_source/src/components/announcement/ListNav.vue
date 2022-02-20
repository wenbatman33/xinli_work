<template lang="pug">
//- 公告導覽欄
BasicNav.bg-white(:title='t(`notice`)')
  //- 左側
  template(#left)
    //- 返回
    BackButton
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>
