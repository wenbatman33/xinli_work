<template lang="pug">
//- 基礎導覽欄
.grid.grid-cols-nav.items-center.pt-4.px-2
  //- 左側
  .grid.grid-rows-side.justify-items-start
    slot(name='left')
    .invisible
      slot(name='right')

  //- 中間
  slot(name='center')
    .flex.flex-row.justify-center.items-center
      .headline3(:class="textColorClass") {{ title }}

  //- 右側
  .grid.grid-rows-side.justify-items-end
    slot(name='right')
    .invisible
      slot(name='left')
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Title
     */
    title?: string;

    /**
     * Text color
     */
    textColor?: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Text color class
   */
  const textColorClass = computed(() => {
    if (props.textColor === 'white') {
      return ['text-white'];
    } else {
      return ['text-primary'];
    }
  });
</script>

<style scoped lang="scss">
  .grid-cols-nav {
    grid-template-columns: auto 1fr auto;
  }

  .grid-rows-side {
    grid-template-rows: 1fr 0;
  }
</style>
