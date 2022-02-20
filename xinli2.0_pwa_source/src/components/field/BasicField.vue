<template lang="pug">
//- 基礎輸入框
.flex.flex-col.items-stretch
  //- 輸入框與圖示
  .grid.items-center.bg-field.rounded(:class='[gridTemplateColumns, border]')
    //- 左側
    slot(name='left')
      .flex.flex-row.items-center(v-if='iconLeft')
        BasicButton(rounded='normal', @click='handleLeftClick')
          .p-4
            img.w-4.h-4(:src='iconLeft')
        .w-px.h-6.bg-white.opacity-20(v-if='iconLeftWhite')
        .w-px.h-6.bg-primary.opacity-20(v-else)

    //- 輸入框
    Field.px-4.py-3.bg-transparent(:type='type', :modelValue='value', :placeholder='placeholder', :error='errorVisible', autocomplete='off', :border='false', @update:modelValue='handleUpdateValue')

    //- 右側
    slot(name='right')
      BasicButton(v-if='iconRight', rounded='normal', @click='handleRightClick')
        .p-4
          img.w-4.h-4(:src='iconRight')

  //- 錯誤訊息
  .body2.text-systemError.mt-2px(v-if='errorVisible') {{ error }}
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import { Field } from 'vant';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { FieldType } from 'vant';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Field type
     */
    type?: FieldType;

    /**
     * Field value
     */
    value?: string;

    /**
     * Field placeholder
     */
    placeholder?: string;

    /**
     * Icon left
     */
    iconLeft?: string;

    /**
     * Icon left white
     */
    iconLeftWhite?: boolean;

    /**
     * Icon right
     */
    iconRight?: string;

    /**
     * Error message
     */
    error?: string;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update value
     */
    (e: 'update:value', value: string): void;

    /**
     * Click left button
     */
    (e: 'clickLeft'): void;

    /**
     * Click right button
     */
    (e: 'clickRight'): void;
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
   * Component slots
   */
  const slots = useSlots();

  /**
   * Error message visible
   */
  const errorVisible = computed(() => {
    if (props?.error === undefined) {
      return false;
    } else if (props?.error?.length === 0) {
      return false;
    } else {
      return true;
    }
  });

  /**
   * Grid template columns
   */
  const gridTemplateColumns = computed(() => {
    const left = props.iconLeft || slots.left;
    const right = props.iconRight || slots.right;
    if (left && right) {
      return 'grid-cols-left-right';
    } else if (left) {
      return 'grid-cols-left';
    } else if (right) {
      return 'grid-cols-right';
    } else {
      return 'grid-cols-1';
    }
  });

  /**
   * Border
   */
  const border = computed(() => {
    if (errorVisible.value) {
      return 'border border-systemError';
    } else {
      return '';
    }
  });

  /**
   * Handle left icon clicked
   */
  const handleLeftClick = () => {
    emit('clickLeft');
  };

  /**
   * Handle update field value
   * @param value New field value
   */
  const handleUpdateValue = (value: string) => {
    emit('update:value', value);
  };

  /**
   * Handle right icon clicked
   */
  const handleRightClick = () => {
    emit('clickRight');
  };
</script>

<style scoped lang="scss">
  .bg-field {
    background-color: rgba(7, 31, 68, 0.03);
    backdrop-filter: blur(6px);
  }

  .grid-cols-left {
    grid-template-columns: auto 1fr;
  }

  .grid-cols-right {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-left-right {
    grid-template-columns: auto 1fr auto;
  }
</style>
