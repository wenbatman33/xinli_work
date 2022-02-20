<template lang="pug">
//- 下拉按鈕
BasicButton(bg='#071F4408', content='stretch', rounded='md')
  //- 選項內容
  .w-full.grid.grid-cols-drop-down-button.items-center.p-4
    //- 標題文字
    .body1.text-primary.text-left {{ titleText }}
    
    //- 讀取中
    Loading(v-if='loading', type='spinner', size='16px')

    //- 右側圖示
    img.w-auto.h-5(v-else, :src='iconTriangleDownPrimary')
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { Loading } from 'vant';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconTriangleDownPrimary = staticImgUrl('icon-triangle-down-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Title text
     */
    titleText?: string;

    /**
     * Loading
     */
    loading?: boolean;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .grid-cols-drop-down-button {
    grid-template-columns: 1fr auto;
  }
</style>
