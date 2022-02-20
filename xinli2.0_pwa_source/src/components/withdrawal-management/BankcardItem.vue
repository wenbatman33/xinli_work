<template lang="pug">
//- 銀行卡物件
BasicButton.mx-4.mt-2.shadow(content='stretch', bg='white100', rounded='normal', @click='handleItemClick')
  //- 按鈕內容
  .grid.grid-cols-content.gap-4.items-center.p-4
    //- 銀行圖示
    img.w-6.h-6(:src='icon', @error='errorImg')

    //- 銀行卡資訊
    .grid.grid-cols-1.gap-2.items-stretch
      //- 帳號名稱
      .subtitle1.text-primary.text-left(v-if='bankAccount') {{ bankAccount }}

      //- 帳號
      .body1.text-primary.text-left.opacity-60 {{ bankNo }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';
  import { errorImg } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { BankcardItem } from '@/api/member/model/member-model';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Bankcard item
     */
    item?: BankcardItem;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click item
     */
    (e: 'clickItem', item?: BankcardItem): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emit
   */
  const emit = defineEmits<Emits>();

  /**
   * Icon
   */
  const icon = computed(() => {
    return props?.item?.bankCode || '';
  });

  /**
   * Bank account
   */
  const bankAccount = computed(() => {
    return props?.item?.bankAccount || '';
  });

  /**
   * Bank no
   */
  const bankNo = computed(() => {
    return props?.item?.bankNo || '';
  });

  /**
   * Handle item clicked
   */
  const handleItemClick = () => {
    emit('clickItem', props.item);
  };
</script>

<style scoped lang="scss">
  .grid-cols-content {
    grid-template-columns: auto 1fr;
  }
</style>
