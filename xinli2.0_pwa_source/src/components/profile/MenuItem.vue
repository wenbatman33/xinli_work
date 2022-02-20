<template lang="pug">
//- 我的選項
BasicButton(bg='white100', content='stretch', :rounded='firstItem ? "tmd" : lastItem ? "bmd" : singleItem ? "md" : ""')
  //- 選項內容
  .w-full.grid.grid-cols-menu-item.items-center.p-4
    //- 左側圖示
    img.w-5.h-5(:src='leftIcon')

    //- 標題文字
    .body1.text-primary.text-left.px-4 {{ titleText }}

    //- 數值文字
    .body1.text-primary.opacity-40(:class='valueText ? "pr-4" : "pr-0"') {{ valueText }}

    //- 數值圖示
    div(:class='valueIcon ? "pr-4" : "pr-0"')
        img.h-4(:class='valueIcon ? "w-auto" : "w-0"', :src='valueIcon')

    //- 右側圖示
    img.w-auto.h-5(:src='rightIcon')
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Left side icon
     */
    leftIcon?: string;

    /**
     * Right side icon
     */
    rightIcon?: string;

    /**
     * Title text
     */
    titleText?: string;

    /**
     * Value text
     */
    valueText?: string;

    /**
     * Value icon
     */
    valueIcon?: string;

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
    grid-template-columns: auto 1fr auto auto auto;
  }
</style>
