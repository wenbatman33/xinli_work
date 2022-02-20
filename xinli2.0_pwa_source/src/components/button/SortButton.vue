<template lang="pug">
//- 刷新按鈕
BasicButton.w-12.h-12.shadow-refresh(bg='#ffffff', rounded='full')
  img.w-5.h-5(:src='iconSortBetPrimary')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconSortBetPrimary = staticImgUrl('icon-sort-bet-primary.svg');
</script>

<style scoped lang="scss">
  .shadow-refresh {
    filter: drop-shadow(0px 8px 13px rgba(7, 31, 68, 0.1));
  }
</style>
