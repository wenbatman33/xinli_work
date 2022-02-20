<template lang="pug">
//- 滾動數字
.flex.flex-row.items-center.overflow-hidden
  //- 數字列表
  NumberItem(v-for='item in stringArray', :text='item')
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import NumberItem from '@/components/vip/NumberItem.vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Text for rolling
     */
    text?: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * String array
   */
  const stringArray = computed(() => {
    return (props.text || '').split('');
  });
</script>
