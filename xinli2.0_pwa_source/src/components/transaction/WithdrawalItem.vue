<template lang="pug">
//- 充值物件
.flex.flex-col.items-stretch.p-4.mx-4.mt-2.shadow.rounded.bg-white
  //- 標題
  .grid.grid-cols-key-value.gap-2
    //- 紅利
    .subtitle1.text-primary
      span {{ t("transaction_withdrawal") }}
      span.ml-2 {{ item?.payment }}

    //- 金額
    .subtitle1.text-primary.text-right.break-all {{ commaFormat(item?.amount) }}

  //- 狀態/匯率
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 狀態
    .subtitle2
      span.text-systemSuccess(v-if='item?.status == "5"') {{ item?.statusStr }}
      span.text-primary.opacity-40(v-else) {{ item?.statusStr }}

    //- 匯率
    .body2.text-primary.text-right.break-all(v-if='usdtAmount') {{ usdtAmount }}

  //- 分隔線
  .h-px.bg-split.mt-2

  //- 存入
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 存入標題
    .body2.text-primary.opacity-40 {{ t("transaction_in") }}

    //- 存入值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.to }}

  //- 訂單號
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 訂單號標題
    .body2.text-primary.opacity-40 {{ t("transaction_sn") }}

    //- 訂單號
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.id }}

  //- 時間
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 時間標題
    .body2.text-primary.opacity-40 {{ t("transaction_time") }}

    //- 時間值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.createdAt }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { commaFormat } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { WithdrawalRecordItem } from '@/api/payment/model/record-model';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Recharge item
     */
    item?: WithdrawalRecordItem;
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

  /**
   * USDT amount
   */
  const usdtAmount = computed(() => {
    const payment = props.item?.payment || '';
    const amount = props.item?.amount || 0;
    const exchangeRate = props.item?.exchangeRate || 0;
    if (payment == 'USDT' && amount > 0 && exchangeRate > 0) {
      const usdtAmount = amount * exchangeRate;
      return `= ${commaFormat(usdtAmount, true)} USDT`;
    } else {
      return undefined;
    }
  });
</script>

<style scoped lang="scss">
  .grid-cols-key-value {
    grid-template-columns: auto 1fr;
  }

  .bg-split {
    background: rgba(7, 31, 68, 0.05);
  }
</style>
