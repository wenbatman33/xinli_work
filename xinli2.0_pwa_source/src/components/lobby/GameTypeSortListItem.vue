<template lang="pug">
//- 分類排序物件
.flex.flex-col.items-stretch.bg-white
  //- 物件內容
  .grid.grid-cols-category.gap-4.items-center.p-4
    //- 分類圖示
    img.w-5.h-5(:src='iconPormotionInactive')

    //- 分類名稱
    .subtitle1.text-primary {{ name }}

    //- 排序圖示
    img.w-5.h-5.cursor-move(:src='iconArrangePrimary')

  //- 分隔線
  .h-px.bg-primary.opacity-10
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { staticImgUrl } from '@/utils';
  import type { GameType } from '@/api/game/model/game-group-model';

  /**
   * Static icons
   */
  const iconPormotionInactive = staticImgUrl('icon-promotion-inactive.svg');
  const iconArrangePrimary = staticImgUrl('icon-arrange-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Game type
     */
    gameType?: GameType;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Name
   */
  const name = computed(() => {
    return props.gameType?.name || '';
  });
</script>

<style scoped lang="scss">
  .grid-cols-category {
    grid-template-columns: auto 1fr auto;
  }
</style>
