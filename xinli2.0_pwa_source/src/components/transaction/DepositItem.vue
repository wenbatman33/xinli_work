<template lang="pug">
//- 充值物件
.flex.flex-col.items-stretch.p-4.mx-4.mt-2.shadow.rounded.bg-white
  //- 標題
  .grid.grid-cols-key-value.gap-2
    //- 紅利
    .subtitle1.text-primary
      span {{ t("transaction_deposit") }}
      span.ml-2 {{ item?.payment }}

    //- 金額
    .subtitle1.text-primary.text-right.break-all {{ commaFormat(item?.amount) }}

  //- 狀態/截止時間/匯率
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 狀態
    .subtitle2
      span.text-systemSuccess(v-if='item?.status == "3"') {{ item?.statusStr }}
      span.text-primary.opacity-40(v-else) {{ item?.statusStr }}

    //- 截止時間
    .body2.text-primary.text-right.break-all(v-if='expireTime') {{ expireTime }}

    //- 匯率
    .body2.text-primary.text-right.break-all(v-else-if='usdtAmount') {{ usdtAmount }}

  //- 分隔線
  .h-px.bg-split.mt-2

  //- 存入
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 存入標題
    .body2.text-primary.opacity-40 {{ t("transaction_in") }}

    //- 存入值
    .body2.text-primary.text-right.break-all.opacity-40 {{ t("deposit_centerWallet") }}

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

  //- 類型
  .grid.grid-cols-key-value.gap-2.mt-2
    //- 類型標題
    .body2.text-primary.opacity-40 {{ t("transaction_type") }}

    //- 類型值
    .body2.text-primary.text-right.break-all.opacity-40 {{ item?.payment }}

  //- 取消訂單
  BasicButton.mt-2(v-if='expireTime', :loading='cancelLoading', bg='accent10', textColor='accent', size='medium', @click='handleCancelClick') {{ t("transaction_cancel") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch, onMounted, onUnmounted } from 'vue';
  import { Dialog, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { commaFormat } from '@/utils';
  import { postDepositCancel } from '@/api/payment/deposit';
  import { DEPOSIT_AVAILABLE_MINUTES } from '@/utils/constants';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { DepositRecordItem } from '@/api/payment/model/record-model';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Recharge item
     */
    item?: DepositRecordItem;
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
   * Expire time interval
   */
  const expireTimeInterval = ref<NodeJS.Timeout>();

  /**
   * Current time
   */
  const currentTime = ref<Dayjs>();

  /**
   * Cancel loading
   */
  const cancelLoading = ref(false);

  /**
   * Expire time
   */
  const expireTime = computed(() => {
    let createTime: Dayjs;
    try {
      createTime = dayjs(props.item?.createdAt || '', 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      createTime = dayjs().add(-1, 'year');
    }
    const expireTime = createTime.add(DEPOSIT_AVAILABLE_MINUTES, 'minute');
    if (props.item?.status == '1' && expireTime.isAfter(currentTime.value)) {
      const diffInSecond = expireTime.diff(currentTime.value, 'second');
      const minute = Math.floor(diffInSecond / 60);
      const minutePrefix = minute < 10 ? '0' : '';
      const second = Math.floor(diffInSecond % 60);
      const secondPrefix = second < 10 ? '0' : '';
      return `${minutePrefix}${minute}:${secondPrefix}${second} ${t('transaction_toTime')}`;
    } else {
      return undefined;
    }
  });

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

  /**
   * Handle cancel button clicked
   */
  const handleCancelClick = () => {
    // Show confirmation dialog
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      title: t('transaction_cancelTitle'),
      message: t('transaction_cancelMessage'),
      confirmButtonText: t('transaction_cancelConfirm'),
      cancelButtonText: t('transaction_cancelBack'),
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async () => {
      try {
        // Turn loading on
        console.log('start cancel');
        cancelLoading.value = true;

        // Post cancel
        await postDepositCancel({
          id: props.item?.id,
        });

        // Notify cancel success
        Toast({
          position: 'bottom',
          teleport: '#toast-container',
          message: t('common_cancelSuccess'),
        });

        // Notify refresh
        emit('refresh');
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn loading off
        console.log('end cancel');
        cancelLoading.value = false;
      }
    });
  };

  /**
   * Watch expire time changed
   */
  watch(
    () => expireTime.value,
    (value, oldValue) => {
      // When available changed to expired
      if (!value && oldValue) {
        // Notify refresh the deposit record list
        emit('refresh');
      }
    }
  );

  /**
   * On component mounted
   */
  onMounted(() => {
    expireTimeInterval.value = setInterval(() => {
      currentTime.value = dayjs();
    }, 1000);
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    if (expireTimeInterval.value) {
      clearInterval(expireTimeInterval.value);
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
