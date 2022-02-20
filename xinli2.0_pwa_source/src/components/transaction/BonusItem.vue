<template lang="pug">
//- 充值物件
.flex.flex-col.items-stretch.p-4.mx-4.mt-2.shadow.rounded.bg-white
  //- 標題
  .grid.grid-cols-key-value.gap-2
    //- 紅利
    .subtitle1.text-primary {{ t("transaction_bonus") }}

    //- 金額
    .subtitle1.text-primary.text-right.break-all {{ commaFormat(item?.bonus) }}

  //- 狀態
  .subtitle2.mt-2
    span.text-systemSuccess(v-if='item?.status == "2"') {{ item?.statusStr }}
    span.text-primary.opacity-40(v-else) {{ item?.statusStr }}

  //- 分隔線
  .h-px.bg-split.mt-2

  //- 存入
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 存入標題
    .body2.text-primary.opacity-40 {{ t("transaction_in") }}

    //- 存入值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.bonusIn }}

  //- 訂單號
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 訂單號標題
    .body2.text-primary.opacity-40 {{ t("transaction_sn") }}

    //- 訂單號
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.orderNo }}

  //- 時間
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 時間標題
    .body2.text-primary.opacity-40 {{ t("transaction_time") }}

    //- 時間值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.updatedAt }}

  //- 類型
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 類型標題
    .body2.text-primary.opacity-40 {{ t("transaction_type") }}

    //- 類型值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.typeName }}

  //- 說明
  .grid.grid-cols-key-value.gap-2.mt-2(v-if='item?.description')
    //- 說明標題
    .body2.text-primary.opacity-40 {{ t("transaction_desc") }}

    //- 說明值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.description }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { commaFormat } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { BonusRecordItem } from '@/api/payment/model/record-model';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Recharge item
     */
    item?: BonusRecordItem;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Refresh transaction list
     */
    (e: 'refresh'): void;
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
   * Vue i18n
   */
  const { t } = useI18n();
</script>

<style scoped lang="scss">
  .grid-cols-key-value {
    grid-template-columns: auto 1fr;
  }

  .bg-split {
    background: rgba(7, 31, 68, 0.05);
  }
</style>
