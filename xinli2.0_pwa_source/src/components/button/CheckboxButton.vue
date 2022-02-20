<template lang="pug">
//- 基礎勾選框
BasicButton(rounded='normal', textColor='primary', @click='handleButtonClick')
  //- 水平排列
  .flex.flex-row.items-center.p-2
    //- 勾選圖示
    img.w-6.h-6(:src='icon')

    //- 標題
    .ml-2
      slot
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconCheckboxChecked = staticImgUrl('icon-checkbox-checked.svg');
  const iconCheckboxUncheck = staticImgUrl('icon-checkbox-uncheck.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Checked status
     */
    checked?: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update checked
     */
    (e: 'update:checked', show: boolean): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emits
   */
  const emit = defineEmits<Emits>();

  /**
   * Checked icon
   */
  const icon = computed(() => {
    if (props.checked === true) {
      return iconCheckboxChecked;
    } else {
      return iconCheckboxUncheck;
    }
  });

  /**
   * Handle button clicked
   */
  const handleButtonClick = () => {
    emit('update:checked', props.checked !== true);
  };
</script>
