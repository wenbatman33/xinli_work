<template lang="pug">
//- 分類物件
.flex.flex-col.items-stretch
  //- 分類按鈕
  BasicButton(content='left', @click='handleCategoryClick')
    .p-4.headline3.text-primary {{ item?.categoryName }}

  //- 問答物件列表
  FaqItem(v-for='faq in (item?.faqList || [])', :item='faq', @click-faq='handleFaqClick(faq)')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import FaqItem from '@/components/help-center/FaqItem.vue';
  import type { FaqItemClass } from '@/components/help-center/FaqItem.vue';

  /**
   * Category item interface
   */
  export interface CategoryItemClass {
    id?: number;
    categoryName?: string;
    faqList?: FaqItemClass[];
  }

  /**
   * Component props interface
   */
  interface Props {
    item?: CategoryItemClass;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Category clicked
     */
    (e: 'clickCategory', item?: CategoryItemClass): void;

    /**
     * Faq clicked
     */
    (e: 'clickFaq', item?: FaqItemClass): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emits
   */
  const emits = defineEmits<Emits>();

  /**
   * Handle category item clicked
   */
  const handleCategoryClick = () => {
    emits('clickCategory', props.item);
  };

  /**
   * Handle faq item clicked
   */
  const handleFaqClick = (item?: FaqItemClass) => {
    emits('clickFaq', item);
  };
</script>
