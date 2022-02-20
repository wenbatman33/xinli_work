<template lang="pug">
//- 信息選項
BasicButton(bg='white100', content='stretch', :rounded='firstItem ? "tmd" : lastItem ? "bmd" : singleItem ? "md" : undefined')
  //- 選項內容
  .w-full.grid.grid-cols-menu-item.items-center.p-4
    //- 左側內容
    .flex.flex-col.items-stretch
      //- 標題文字
      .body2.text-primary.text-left.opacity-40 {{ titleText }}

      //- 數值文字
      .body1.text-primary.text-left.pt-2(v-if='valueText') {{ valueText }}

    //- 狀態
    .px-2.caption.text-blueLightBg(v-if='status === "verified"') {{ t('common_verified') }}
    .px-2.caption.text-accent(v-else-if='status === "unverified"') {{ t('common_unverified') }}
    .px-2.caption.text-accent(v-else-if='status === "unset"') {{ t('common_unset') }}
    .w-0(v-else)

    //- 右側文字或圖示
    .caption.text-primary.opacity-40(v-if='rightText') {{ rightText }}
    img.w-auto.h-5(v-else-if='rightIcon', :src='rightIcon')
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useI18n } from 'vue-i18n';
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
     * Status
     */
     status?: 'verified' | 'unset' | 'unverified';

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

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>

<style scoped lang="scss">
  .grid-cols-menu-item {
    grid-template-columns: 1fr auto auto;
  }
</style>
