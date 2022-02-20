<template lang="pug">
//- 信息選項
BasicButton(bg='white100', content='stretch', :rounded='firstItem ? "tmd" : lastItem ? "bmd" : singleItem ? "md" : ""')
  //- 選項內容
  .w-full.grid.grid-cols-menu-item.items-center.p-4
    //- 左側內容
    .flex.flex-col.items-stretch
      //- 標題文字
      .body2.text-primary.text-left.opacity-40 {{ titleText }}

      //- 數值文字
      .body1.text-primary.text-left.pt-2(v-if='valueText') {{ valueText }}

    //- 右側文字或圖示
    .caption.text-primary.opacity-40(v-if='rightText') {{ rightText }}
    img.w-auto.h-5(v-else-if='rightIcon', :src='rightIcon')
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Right side icon
     */
    rightIcon?: string;

    /**
     * Right side text
     */
    rightText?: string;

    /**
     * Title text
     */
    titleText?: string;

    /**
     * Value text
     */
    valueText?: string;

    /**
     * First menu item
     */
    firstItem?: boolean;

    /**
     * Last menu item
     */
    lastItem?: boolean;

    /**
     * Single menu item
     */
    singleItem?: boolean;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .grid-cols-menu-item {
    grid-template-columns: 1fr auto;
  }
</style>
