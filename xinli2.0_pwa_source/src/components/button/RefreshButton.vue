<template lang="pug">
//- 排序按鈕
BasicButton.w-12.h-12.shadow-refresh(bg='#ffffff', rounded='full')
  img.w-5.h-5(:src='iconRefreshAccent')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconRefreshAccent = staticImgUrl('icon-refresh-accent.svg');
</script>

<style scoped lang="scss">
  .shadow-refresh {
    filter: drop-shadow(0px 8px 13px rgba(7, 31, 68, 0.1));
  }
</style>
