<template lang="pug">
//- 問答物件
BasicButton(content='left', @click='handleFaqClick')
  .p-4.body1.text-primary.opacity-60 
    span ‧
    span.pl-2 {{ item?.title }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Faq item
   */
  export interface FaqItemClass {
    categoryName?: string;
    title?: string;
    isVideo?: boolean;
    videoUrl?: string;
    content?: string;
  }

  /**
   * Component props interface
   */
  interface Props {
    item?: FaqItemClass;
  }

  /**
   * Component emits interface
   */
  interface Emits {
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
   * Handle faq item clicked
   */
  const handleFaqClick = () => {
    emits('clickFaq', props?.item);
  };
</script>
