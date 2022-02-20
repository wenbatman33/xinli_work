<template lang="pug">
//- 獎勵物件
BasicButton.mx-3.mt-2(rounded='normal', content='stretch')
  //- 物件內容
  .flex.flex-col.items-stretch.p-4.bg-white.rounded
    //- 獎勵項目
    .grid.grid-cols-item.gap-2.items-center
      //- 項目圖示
      img.w-4.h-4(:src='iconPormotionInactive')

      //- 項目名稱
      .body2.text-primary.text-left.opacity-80 {{ item }}

    //- 獎勵資訊
    .grid.grid-cols-info.gap-8.items-center
      //- 獎勵名稱
      .body1.text-primary {{ name }}

      //- 獎勵金額
      .headline1.text-accent.text-right ¥ {{ amount }}

      //- 詳細
      .body2.text-primary.opacity-60 详情
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconPormotionInactive = staticImgUrl('icon-promotion-inactive.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Item
     */
    item?: string;

    /**
     * Name
     */
    name?: string;

    /**
     * Amount
     */
    amount?: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
  .grid-cols-item {
    grid-template-columns: auto 1fr;
  }

  .grid-cols-info {
    grid-template-columns: auto 1fr auto;
  }
</style>
