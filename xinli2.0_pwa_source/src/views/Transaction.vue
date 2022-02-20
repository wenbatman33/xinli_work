<template lang="pug">
//- 交易紀錄頁面
.flex.flex-col.flex-grow.items-stretch.bg-transaction
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0(:categoryList='categoryList', :time='time')

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0(:category='category', :categoryList='categoryList', :time='time', @clickTime='handleTimeClick', @update:category='handleUpdateCategory')

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 無紀錄
    .flex.flex-col.items-center.pt-24(v-if='empty')
      //- 圖示
      img.w-18.h-18(:src='iconEmptyTrade')

      //- 內容
      .body1.text-primary.opacity-40.mt-6 {{ t("transaction_recharge_empty") }}

    //- 交易紀錄列表
    .flex.flex-col.items-stretch.pt-2.pb-6(v-else)
      //- 充值物件列表
      DepositItem(v-if='category.id == 0', v-for='item in depositRecordList', :item='item', @refresh='handleRefresh')

      //- 提款物件列表
      WithdrawalItem(v-else-if='category.id == 1', v-for='item in withdrawalRecordList', :item='item')

      //- 轉帳物件列表
      BonusItem(v-else-if='category.id == 2', v-for='item in []', :item='item')

      //- 紅利物件列表
      BonusItem(v-else-if='category.id == 3', v-for='item in bonusRecordList', :item='item')

  //- 時間彈窗
  TimePopup(v-model:show='showTimePopup', :selected='time', :list='timeList', @update:selected='handleUpdateTime')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PullRefresh } from 'vant';
  import { staticImgUrl } from '@/utils';
  import { getBonusRecord, getDepositRecord, getWithdrawalRecord } from '@/api/payment/record';
  import Nav from '@/components/transaction/Nav.vue';
  import TimePopup from '@/components/bet/TimePopup.vue';
  import BonusItem from '@/components/transaction/BonusItem.vue';
  import DepositItem from '@/components/transaction/DepositItem.vue';
  import WithdrawalItem from '@/components/transaction/WithdrawalItem.vue';
  import dayjs from 'dayjs';
  import type { BonusRecordItem, DepositRecordItem, WithdrawalRecordItem } from '@/api/payment/model/record-model';

  /**
   * Static icons
   */
  const iconEmptyTrade = staticImgUrl('icon-empty-trade.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Time list
   */
  const timeList = ref([
    {
      id: 0,
      name: t('common_24hour'),
    },
    {
      id: 1,
      name: t('common_48hour'),
    },
    {
      id: 2,
      name: t('common_1week'),
    },
    {
      id: 3,
      name: t('common_1month'),
    },
  ]);

  /**
   * Time
   */
  const time = ref(timeList.value[0]);

  /**
   * Category list
   */
  const categoryList = ref([
    {
      id: 0,
      name: t('transaction_deposit'),
    },
    {
      id: 1,
      name: t('transaction_withdrawal'),
    },
    {
      id: 2,
      name: t('transaction_transfer'),
    },
    {
      id: 3,
      name: t('transaction_bonus'),
    },
  ]);

  /**
   * Category selected
   */
  const category = ref(categoryList.value[0]);

  /**
   * Getting deposit list
   */
  const getDepositListLoading = ref(false);

  /**
   * Getting withdrawal list
   */
  const getWithdrawalListLoading = ref(false);

  /**
   * Getting transfer list
   */
  const getTransferListLoading = ref(false);

  /**
   * Getting bonus list
   */
  const getBonusListLoading = ref(false);

  /**
   * Show time popup
   */
  const showTimePopup = ref(false);

  /**
   * Deposit record list
   */
  const depositRecordList = ref<DepositRecordItem[]>([]);

  /**
   * Withdrawal record list
   */
  const withdrawalRecordList = ref<WithdrawalRecordItem[]>([]);

  /**
   * Transfer record list
   */
  const transferRecordList = ref([]);

  /**
   * Bonus record list
   */
  const bonusRecordList = ref<BonusRecordItem[]>([]);

  /**
   * Refreshing status
   */
  const refreshing = computed(() => {
    if (category.value.id == 0) {
      // 充值
      return getDepositListLoading.value;
    } else if (category.value.id == 1) {
      // 提款
      return getWithdrawalListLoading.value;
    } else if (category.value.id == 2) {
      // 轉帳
      return getTransferListLoading.value;
    } else if (category.value.id == 3) {
      // 紅利
      return getBonusListLoading.value;
    } else {
      // 其他
      return false;
    }
  });

  /**
   * List empty status
   */
  const empty = computed(() => {
    if (category.value.id == 0) {
      // 充值
      return depositRecordList.value.length == 0;
    } else if (category.value.id == 1) {
      // 提款
      return withdrawalRecordList.value.length == 0;
    } else if (category.value.id == 2) {
      // 轉帳
      return transferRecordList.value.length == 0;
    } else if (category.value.id == 3) {
      // 紅利
      return bonusRecordList.value.length == 0;
    } else {
      // 其他
      return true;
    }
  });

  /**
   * Get start time parameter
   */
  const getStartTime = () => {
    if (time.value.id == 0) {
      // 24小時
      return dayjs().add(-24, 'hour').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 1) {
      // 48小時
      return dayjs().add(-48, 'hour').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 2) {
      // 1週
      return dayjs().add(-1, 'week').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 3) {
      // 1月
      return dayjs().add(-1, 'month').format('YYYY-MM-DD HH:mm:ss');
    } else {
      // 其他
      return '';
    }
  };

  /**
   * Get end time parameter
   */
  const getEndTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  };

  /**
   * Get deposit record list
   */
  const getDepositRecordList = async () => {
    try {
      // Turn loading on
      getDepositListLoading.value = true;

      // Get deposit record list
      const response = await getDepositRecord({
        startTime: getStartTime(),
        endTime: getEndTime(),
      });

      // Update deposit record list
      depositRecordList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getDepositListLoading.value = false;
    }
  };

  /**
   * Get withdrawal record list
   */
  const getWithdrawalRecordList = async () => {
    try {
      // Turn loading on
      getWithdrawalListLoading.value = true;

      // Get withdrawal record list
      const response = await getWithdrawalRecord({
        startTime: getStartTime(),
        endTime: getEndTime(),
      });

      // Update withdrawal record list
      withdrawalRecordList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getWithdrawalListLoading.value = false;
    }
  };

  /**
   * Get transfer record list
   */
  const getTransferRecordList = async () => {};

  /**
   * Get bonus record list
   */
  const getBonusRecordList = async () => {
    try {
      // Turn loading on
      getBonusListLoading.value = true;

      // Get bonus record list
      const response = await getBonusRecord({
        startTime: getStartTime(),
        endTime: getEndTime(),
      });

      // Update bonus record list
      bonusRecordList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getBonusListLoading.value = false;
    }
  };

  /**
   * Get transaction list
   */
  const getTransactionList = () => {
    if (category.value.id == 0) {
      // 充值
      getDepositRecordList();
    } else if (category.value.id == 1) {
      // 提款
      getWithdrawalRecordList();
    } else if (category.value.id == 2) {
      // 轉帳
      getTransferRecordList();
    } else if (category.value.id == 3) {
      // 紅利
      getBonusRecordList();
    }
  };

  /**
   * Handle time button clicked
   */
  const handleTimeClick = () => {
    showTimePopup.value = true;
  };

  /**
   * Handle update category
   */
  const handleUpdateCategory = (slected: { id: number; name: string }) => {
    category.value = slected;
    getTransactionList();
  };

  /**
   * Handle update time
   */
  const handleUpdateTime = (slected: { id: number; name: string }) => {
    time.value = slected;
    getTransactionList();
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getTransactionList();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getTransactionList();
  });
</script>

<style scoped lang="scss">
  .bg-transaction {
    background-color: #f5f5f5;
  }
</style>
