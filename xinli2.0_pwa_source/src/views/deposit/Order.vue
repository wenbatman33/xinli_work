<template lang="pug">
//- 提款單
.flex-grow.grid.grid-rows-content.justify-stretch
  //- 導覽欄(fixed)
  OrderNav.fixed.z-30.top-0.left-0.right-0(:title='title')

  //- 導覽欄(relative)
  OrderNav.relative.z-20(:title='title')

  //- 下拉刷新
  PullRefresh#screenshot.relative.z-20.flex-grow(v-model='getDetailDataLoading', @refresh='handleRefresh')
    //- 頁面內容
    .flex.flex-col.items-stretch
      //- 讀取中
      .flex.flex-col.items-center.bg-gray.px-4.py-6(v-if='getDetailDataLoading')
        Loading(type='spinner', size='24px')

      //- 已取消
      .flex.flex-col.items-center.bg-gray.px-4.py-6(v-else-if='cancelled')
        //- 圖示
        img.w-18.h-18(:src='iconCircleCheckGrayOutline')

        //- 標題
        .subtitle1.text-primary.opacity-60.mt-4 {{ t("deposit_order_cancel_success") }}

      //- 已逾時
      .flex.flex-col.items-center.bg-gray.px-4.py-6(v-else-if='expired')
        //- 圖示
        img.w-18.h-18(:src='iconTimeoutGray')

        //- 標題
        .subtitle1.text-primary.opacity-60.mt-4 {{ t("deposit_order_timeout_title") }}

        //- 訊息
        .paragraph2.text-accent.text-center.whitespace-pre-wrap.opacity-70.mt-4 {{ t("deposit_order_timeout_message") }}

      //- 灰色資訊區塊
      .flex.flex-col.items-stretch.bg-gray.px-4.pb-6(v-else)
        //- 水平排列
        .flex.flex-row.items-center.justify-center.mt-6
          //- 有效時間標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_availableTime") }}

          //- 有效時間
          .ml-1.subtitle2.text-accent {{ availableTime }}

        //- 水平排列
        .flex.flex-row.items-center.justify-center.mt-4
          //- 金額
          .headline2.text-primary {{ amount }}

          //- 複製
          img.w-5.h-5.ml-1(:src='iconCopyPrimary40', @click='handleCopyAmountClick')

        //- 提示
        .body3.text-primary.text-center.opacity-40.mt-2 {{ t("deposit_order_amountHint") }}

        //- 銀行卡資訊
        .flex.flex-col.items-stretch.px-4.py-6.bg-white.rounded.mt-6(v-if='type == 1')
          //- 銀行
          .grid.grid-cols-info.gap-3.items-center
            //- 圖示
            img.w-6.h-6(:src='""', @error='errorImg')

            //- 名稱
            .headline3.text-primary {{ bankName }}

            //- 提示
            .body3.text-primary.opacity-40 {{ t("deposit_order_oneTimeHint") }}

          //- 卡號
          .grid.grid-cols-info.gap-3.items-center.mt-6
            //- 標題
            .body2.text-primary.opacity-40 {{ t("deposit_order_bankcardNumber") }}

            //- 數值
            .subtitle2.text-primary.text-right {{ bankcard }}

            //- 複製
            BasicButton(bg='primary5', textColor='primary', size='medium', rounded='full', @click='handleCopyBankcardClick') {{ t("deposit_order_copy") }}

          //- 戶名
          .grid.grid-cols-info.gap-3.items-center.mt-6
            //- 標題
            .body2.text-primary.opacity-40 {{ t("deposit_order_bankAccountName") }}

            //- 數值
            .subtitle2.text-primary.text-right {{ bankcardOwner }}

            //- 複製
            BasicButton(bg='primary5', textColor='primary', size='medium', rounded='full', @click='handleCopyBankcardOwnerClick') {{ t("deposit_order_copy") }}

          //- 附言
          .grid.grid-cols-info.gap-3.items-center.mt-6
            //- 標題
            .body2.text-primary.opacity-40 {{ t("deposit_order_bankNote") }}

            //- 數值
            .subtitle2.text-primary.text-right {{ prompt }}

            //- 複製
            BasicButton(bg='primary5', textColor='primary', size='medium', rounded='full', @click='handleCopyPromptClick') {{ t("deposit_order_copy") }}

        //- QR code
        .flex.flex-col.self-center.items-center.justify-center.w-52.h-52.mt-6.bg-white(v-if='type == 2 || type == 3')
          img.w-36.h-36(:src='url', @error='errorImg')

        //- 保存螢幕截圖
        BasicButton.mt-4(v-if='type == 2 || type == 3', bg='accent10', textColor='accent', size='large', @click='handleScreenshot') {{ t("deposit_order_screenshot") }}

      //- 白色區塊
      .flex.flex-col.items-stretch.px-1
        //- 銀行卡資訊
        .grid.grid-cols-info.gap-3.bg-gray.mt-6.mx-7.p-4.rounded(v-if='type == 3')
          //- 圖示
          img.w-6.h-6(:src='""', @error='errorImg')

          .flex.flex-col.items-stretch
            //- 名稱
            .subtitle1.text-primary {{ bankName || "-" }}

            //- 卡號
            .body1.text-primary.opacity-60.mt-1 {{ bankcard || "-" }}

        //- 渠道
        .grid.grid-cols-info.gap-2.mt-4.px-7
          //- 標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_gateway") }}

          //- 數值
          .col-span-2.subtitle2.text-primary.text-right {{ payChannelName }}

        //- 金額
        .grid.grid-cols-info.gap-2.mt-4.px-7
          //- 標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_depositAmount") }}

          //- 數值
          .col-span-2.subtitle2.text-primary.text-right {{ amount }}

        //- 實付
        .grid.grid-cols-info.gap-2.mt-4.px-7
          //- 標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_paymentAmount") }}

          //- 數值
          .col-span-2.subtitle2.text-accent.text-right {{ payAmount }}

        //- 錢包
        .grid.grid-cols-info.gap-2.mt-4.px-7
          //- 標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_targetWallet") }}

          //- 數值
          .col-span-2.subtitle2.text-primary.text-right {{ t("deposit_centerWallet") }}

        //- 編號
        .grid.grid-cols-info.gap-2.mt-4.items-center.px-7
          //- 標題
          .body2.text-primary.opacity-40 {{ t("deposit_order_orderSerial") }}

          //- 數值
          .subtitle2.text-primary.text-right {{ id }}

          //- 複製
          img.w-4.h-4(:src='iconCopyPrimary40', @click='handleCopyIdClick')

        //- 分隔線
        .h-px.bg-primary.opacity-5.mt-6

        //- 注意事項標題
        .subtitle1.text-primary.mt-6.px-8 {{ t("deposit_order_noticeTitle") }}

        //- 注意事項1
        .body2.text-accent.opacity-70.mt-2.px-8
          span ●
          span.ml-2 {{ t("deposit_order_noticeContent1") }}

        //- 注意事項2
        .body2.text-primary.opacity-40.mt-2.px-8
          span ●
          span.ml-2 {{ t("deposit_order_noticeContent2") }}

        //- 注意事項3
        .body2.text-primary.opacity-40.mt-2.px-8
          span ●
          span.ml-2 {{ t("deposit_order_noticeContent3") }}

        //- 注意事項4
        .body2.text-primary.opacity-40.mt-2.px-8
          span ●
          span.ml-2 {{ t("deposit_order_noticeContent4") }}

        //- 注意事項5
        .body2.text-primary.opacity-40.mt-2.px-8
          span ●
          span.ml-2 {{ t("deposit_order_noticeContent5") }}

    //- 按鈕
    .px-8.pt-8.pb-12.flex.flex-col.items-stretch
      //- 再建一筆
      BasicButton(v-if='cancelled || expired', :loading='cancelLoading', bg='accent10', textColor='accent', size='large', @click='handleRetryClick') {{ t("deposit_order_timeout_retry") }}

      //- 取消
      BasicButton(v-else, :loading='cancelLoading', bg='accent10', textColor='accent', size='large', @click='handleCancelClick') {{ t("deposit_order_cancel") }}

      //- 查看交易紀錄
      BasicButton.mt-4(bg='accent100', size='large', @click='handleRecordClick') {{ t("deposit_order_viewTransactionRecord") }}
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { PullRefresh, Loading, Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { DEPOSIT_AVAILABLE_MINUTES } from '@/utils/constants';
  import { getDepositDetail, postDepositCancel } from '@/api/payment/deposit';
  import { staticImgUrl, errorImg, commaFormat, copy } from '@/utils';
  import OrderNav from '@/components/deposit/OrderNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import html2canvas from 'html2canvas';
  import type { Dayjs } from 'dayjs';
  import type { GetDepositDetailResponseData } from '@/api/payment/model/deposit-model';

  /**
   * Static icons
   */
  const iconCopyPrimary40 = staticImgUrl('icon-copy-primary40.svg');
  const iconCircleCheckGrayOutline = staticImgUrl('icon-circle-check-gray-outline.svg');
  const iconTimeoutGray = staticImgUrl('icon-timeout-gray.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const route = useRoute();
  const router = useRouter();

  /**
   * Countdown interval
   */
  const countdownInterval = ref<NodeJS.Timeout>();

  /**
   * Cancelled
   */
  const cancelled = ref(false);

  /**
   * Get detail data loading
   */
  const getDetailDataLoading = ref(false);

  /**
   * Cancel loading
   */
  const cancelLoading = ref(false);

  /**
   * Detail data
   */
  const detailData = ref<GetDepositDetailResponseData | undefined>(undefined);

  /**
   * Current time
   */
  const currentTime = ref(dayjs());

  /**
   * Title
   */
  const title = computed(() => {
    if (cancelled.value) {
      return t('deposit_order_cancel_title');
    } else {
      return t('deposit_order_title');
    }
  });

  /**
   * Type
   * 1:R5-1 站內顯示銀行卡資訊
   * 2:R5-2-A 站內顯示 QR Code(無銀行卡)
   * 3:R5-2-B 站內顯示 QR Code(有銀行卡)
   * 4:R5-3 跳轉三方出納台
   */
  const type = computed(() => {
    return detailData.value?.cashierType || 0;
  });

  /**
   * Expired time
   */
  const expiredTime = computed(() => {
    const effectiveTime = detailData.value?.effectiveTime || 0;
    return dayjs(effectiveTime * 1000);
  });

  /**
   * Expired
   */
  const expired = computed(() => {
    return expiredTime.value.isBefore(dayjs());
  });

  /**
   * Order id
   */
  const id = computed(() => {
    return String(route.params.id) || '';
  });

  /**
   * Available time
   */
  const availableTime = computed(() => {
    const diffInSecond = expiredTime.value.diff(currentTime.value, 'second');
    const minute = Math.max(Math.floor(diffInSecond / 60), 0);
    const minutePrefix = minute < 10 ? '0' : '';
    const second = Math.max(Math.floor(diffInSecond % 60), 0);
    const secondPrefix = second < 10 ? '0' : '';
    return `${minutePrefix}${minute}:${secondPrefix}${second}`;
  });

  /**
   * Amount
   */
  const amount = computed(() => {
    return commaFormat(detailData.value?.amount);
  });

  /**
   * Bank name
   */
  const bankName = computed(() => {
    return detailData.value?.bankName || '';
  });

  /**
   * Bankcard
   */
  const bankcard = computed(() => {
    return detailData.value?.bankcard || '';
  });

  /**
   * Bankcard owner
   */
  const bankcardOwner = computed(() => {
    return detailData.value?.bankcardOwner || '';
  });

  /**
   * Prompt
   */
  const prompt = computed(() => {
    return detailData.value?.prompt || '';
  });

  /**
   * Pay channel name
   */
  const payChannelName = computed(() => {
    return detailData.value?.payChannelName || '';
  });

  /**
   * Pay amount
   */
  const payAmount = computed(() => {
    return commaFormat(detailData.value?.payAmount);
  });

  /**
   * Url
   */
  const url = computed(() => {
    return detailData.value?.url || '';
  });

  /**
   * Get detail data
   */
  const getDetailData = async () => {
    try {
      // Turn on loading status
      getDetailDataLoading.value = true;

      // Get detail data
      const response = await getDepositDetail({
        id: id.value,
      });

      // Update detail data
      detailData.value = response?.data?.data;

      // Open url
      if (detailData.value?.cashierType == 4) {
        const url = detailData.value?.url || '';
        if (url) {
          window.open(url, '_blank');
        }
      }
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getDetailDataLoading.value = false;
    }
  };

  /**
   * Handle refresh
   */
  const handleRefresh = () => {
    getDetailData();
  };

  /**
   * Handle copy amount button clicked
   */
  const handleCopyAmountClick = () => {
    copy(String(detailData.value?.amount || 0));
  };

  /**
   * Handle copy bankcard button clicked
   */
  const handleCopyBankcardClick = () => {
    copy(bankcard.value);
  };

  /**
   * Handle copy bankcard owner button clicked
   */
  const handleCopyBankcardOwnerClick = () => {
    copy(bankcardOwner.value);
  };

  /**
   * Handle copy prompt button clicked
   */
  const handleCopyPromptClick = () => {
    copy(prompt.value);
  };

  /**
   * Handle copy id button clicked
   */
  const handleCopyIdClick = () => {
    copy(id.value);
  };

  /**
   * Handle screenshot clicked
   */
  const handleScreenshot = () => {
    var wrapper = document.getElementById('screenshot');
    if (wrapper != null) {
      html2canvas(wrapper).then((canvas) => {
        var a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        a.download = 'screenshot.jpg';
        a.click();
      });
    }
  };

  /**
   * Handle retry button clicked
   */
  const handleRetryClick = () => {
    router.replace({
      path: '/deposit',
    });
  };

  /**
   * Handle cancel button clicked
   */
  const handleCancelClick = async () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      title: t('deposit_order_cancelTitle'),
      message: t('deposit_order_cancelMessage'),
      confirmButtonText: t('deposit_order_cancelConfirm'),
      cancelButtonText: t('common_cancel'),
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async () => {
      try {
        // Turn on loading status
        cancelLoading.value = true;

        // Post cancel
        const response = await postDepositCancel({
          id: id.value,
        });

        // Update cancelled
        cancelled.value = true;
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        cancelLoading.value = false;
      }
    });
  };

  /**
   * Handle record button clicked
   */
  const handleRecordClick = () => {
    router.push({
      path: '/transaction',
    });
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Get detail data
    getDetailData();

    // Start count down interval
    countdownInterval.value = setInterval(() => {
      currentTime.value = dayjs();
    }, 1000);
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    // Clear count down interval
    if (countdownInterval.value) {
      clearInterval(countdownInterval.value);
    }
  });
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .bg-gray {
    background: rgba(7, 31, 68, 0.03);
  }

  .grid-cols-info {
    grid-template-columns: auto 1fr auto;
  }
</style>
