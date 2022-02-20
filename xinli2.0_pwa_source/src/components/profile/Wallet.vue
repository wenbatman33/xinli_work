<template lang="pug">
//- 錢包資訊
.flex.flex-col.items-stretch
  //- 錢包總額
  .grid.grid-cols-wallet-title.gap-2.px-4(v-if='authorized()')
    //- 錢包總額資訊
    .flex.flex-col.items-stretch
      //- 標題列
      BasicButton(content='left', @click='handleWalletExpendClick')
        .flex.flex-row.items-center.py-2
          //- 箭頭
          img.w-4.h-4.opacity-60(:src='walletExpended ? iconArrowUpWhite : iconArrowDownWhite')

          //- 標題
          .body2.text-white.ml-2 {{ t("profile_totalAmount") }}

      //- 錢包總額讀取中
      .mt-2.py-1(v-if='refreshMoneyLoading')
        Loading(type='spinner', size='24px')

      //- 錢包總額
      .headline1.text-white.mt-2(v-else) {{ money }}

    //- 刷新
    .flex.flex-row.items-center
      BasicButton(rounded='full', @click='handleRefreshMoneyClick')
        img.w-5.h-5(:src='iconRefreshCircleWhite')

  //- 各錢包資訊外框
  .flex.flex-col.items-stretch.px-4.mt-4(v-if='authorized() && walletExpended')
    //- 各錢包資訊內容
    .flex.flex-col.items-stretch.border-wallet.p-4
      //- 中心錢包
      .grid.grid-cols-wallet-info.items-center.gap-2
        //- 中心錢包資訊
        .flex.flex-col.items-stretch
          //- 中心錢包標題
          .body2.text-white.opacity-70 {{ t("profile_centerAmount") }}

          //- 中心錢包讀取中
          .mt-2.py-1(v-if='refreshMoneyLoading')
            Loading(type='spinner', size='12px')

          //- 中心錢包金額
          .subtitle1.text-white(v-else) {{ money }}

        //- 一鍵轉中心
        BasicButton(bg='white20', size='small', rounded='full', :loading='postRecycleLoading', @click='handleRecycleClick') {{ t("profile_transferCenter") }}

      //- 遊戲錢包
      .grid.grid-cols-wallet-info.items-center.gap-2.mt-4
        //- 遊戲錢包資訊
        .flex.flex-col.items-stretch
          //- 遊戲錢包標題
          .body2.text-white.opacity-70 {{ t("profile_gamesAmount") }}

          //- 遊戲錢包讀取中
          .mt-2.py-1(v-if='getBalanceLoading')
            Loading(type='spinner', size='12px')

          //- 遊戲錢包金額
          .subtitle1.text-white(v-else) {{ balance }}

        //- 查看錢包
        BasicButton(bg='white20', size='small', rounded='full', @click='handleBlanaceClick') {{ t("profile_checkWallet") }}

      //- 鎖定錢包
      .flex.flex-col.items-stretch.mt-4
        //- 鎖定錢包標題
        .body2.text-white.opacity-70 {{ t("profile_lockedAmount") }}

        //- 鎖定錢包金額
        .subtitle1.text-white {{ lockMoney }}

  //- 遊戲錢包彈窗
  BalancePopup(v-model:show='showBalancePopup', :loading='getBalanceLoading', @refresh='handleBlanaceRefresh')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { postRecycle } from '@/api/game/game';
  import { getMemberMoney } from '@/api/money/wallet';
  import { useMemberStore } from '@/store/member-store';
  import { getBalanceCurrent } from '@/api/game/balance';
  import { staticImgUrl, authorized, commaFormat } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import BalancePopup from '@/components/profile/BalancePopup.vue';
  import type { BalanceItem } from '@/api/game/model/balance-model';

  /**
   * Static icons
   */
  const iconArrowUpWhite = staticImgUrl('icon-arrow-up-white.svg');
  const iconArrowDownWhite = staticImgUrl('icon-arrow-down-white.svg');
  const iconRefreshCircleWhite = staticImgUrl('icon-refresh-circle-white.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Member store
   */
  const memberStore = useMemberStore();

  /**
   * Wallet block expended status
   */
  const walletExpended = ref(false);

  /**
   * Refresh money loading status
   */
  const refreshMoneyLoading = ref(false);

  /**
   * Post recycle api loading status
   */
  const postRecycleLoading = ref(false);

  /**
   * Get balance loading
   */
  const getBalanceLoading = ref(false);

  /**
   * Show balance popup
   */
  const showBalancePopup = ref(false);

  /**
   * Balance list
   */
  const balanceList = ref<BalanceItem[]>([]);

  /**
   * Member money
   */
  const money = computed(() => {
    return commaFormat(memberStore.getMoney);
  });

  /**
   * Member lock money
   */
  const lockMoney = computed(() => {
    return commaFormat(memberStore.getLockMoney);
  });

  /**
   * Balance total
   */
  const balance = computed(() => {
    const total = balanceList.value.reduce((acc, curr) => {
      return acc + (curr.moeny || 0);
    }, 0);
    return commaFormat(total);
  });

  /**
   * Refresh money
   */
  const refreshMoney = async () => {
    if (authorized()) {
      try {
        // Turn on loading status
        refreshMoneyLoading.value = true;

        // Get member money
        const response = await getMemberMoney();

        // Update money
        memberStore.updateMoney(response?.data?.data?.money || 0);
        memberStore.updateLockMoney(response?.data?.data?.lockMoney || 0);
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        refreshMoneyLoading.value = false;
      }
    }
  };

  /**
   * Get balance list
   */
  const getBalanceList = async () => {
    if (authorized()) {
      try {
        // Turn on loading status
        getBalanceLoading.value = true;

        // Get game balance list
        const response = await getBalanceCurrent();

        // Update balance list
        balanceList.value = response.data?.data?.list || [];
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        getBalanceLoading.value = false;
      }
    }
  };

  /**
   * Handle wallet expend button clicked
   */
  const handleWalletExpendClick = () => {
    walletExpended.value = !walletExpended.value;
  };

  /**
   * Handle refresh money button clicked
   */
  const handleRefreshMoneyClick = () => {
    // Refresh money
    refreshMoney();

    // Get balance list
    getBalanceList();
  };

  /**
   * Handle recycle button clicked
   */
  const handleRecycleClick = async () => {
    try {
      // Turn on loading status
      postRecycleLoading.value = true;

      // Post recycle
      const response = await postRecycle();

      // Update money
      memberStore.updateMoney(response?.data?.data?.money || 0);
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      postRecycleLoading.value = false;
    }
  };

  /**
   * Hancle balance button clicked
   */
  const handleBlanaceClick = () => {
    showBalancePopup.value = true;
  };

  /**
   * Hancle balance refresh
   */
  const handleBlanaceRefresh = () => {
    getBalanceList();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Refresh money
    refreshMoney();

    // Get balance list
    getBalanceList();
  });
</script>

<style scoped lang="scss">
  .grid-cols-wallet-title {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-wallet-info {
    grid-template-columns: 1fr auto;
  }

  .border-wallet {
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
</style>
