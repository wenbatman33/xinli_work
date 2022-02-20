<template lang="pug">
//- 提款頁面
.flex-grow.grid.grid-rows-content.justify-stretch
  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0

  //- 導覽欄(relative)
  Nav.relative.z-20

  //- 頁面內容
  .flex.flex-col.items-stretch.pb-6.bg-white.px-8
    //- 中心錢包
    .grid.grid-cols-center-wallet.gap-2.items-center.mt-6
      //- 金額區塊
      .flex.flex-col.items-stretch
        //- 標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_centerWallet") }}

        //- 金額
        .subtitle1.text-primary.mt-2 {{ money }}

      //- 回收
      BasicButton(:loading='postRecycleLoading', bg='accent10', text-color='accent', size='medium', @click='handleRecycleClick') {{ t("withdrawal_recycle") }}

    //- 所有遊戲錢包
    .grid.grid-cols-center-wallet.gap-2.items-center.mt-4
      //- 金額區塊
      .flex.flex-col.items-stretch
        //- 標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_allGameWallet") }}

        //- 刷新中
        Loading.mt-4(v-if='getBalanceLoading', type='spinner', size='12px')

        //- 金額
        .subtitle2.text-primary.mt-2(v-else) {{ money }}

      //- 刷新
      BasicButton.rounded-full(@click='handleBlanaceRefresh')
        img.w-6.h-6.rounded-full(:src='iconRefreshCirclePrimary')

    //- 提款類型
    .grid.grid-cols-2.p-1.bg-type.rounded-md.mt-7
      //- 銀行卡提款
      BasicButton(:bg='withdrawalType == 1 ? "#ffffff" : undefined', size='medium', rounded='md', @click='handleBankcardTypeClick')
        .subtitle2.text-primary(:class='withdrawalType == 1 ? "opacity-100" : "opacity-60"') {{ t("withdrawalManagement_bankcard") }}

      //- 虛擬貨幣提款
      BasicButton(:bg='withdrawalType == 2 ? "#ffffff" : undefined', size='small', rounded='md', @click='handleAltcoinTypeClick')
        .subtitle2.text-primary(:class='withdrawalType == 2 ? "opacity-100" : "opacity-60"') {{ t("withdrawalManagement_altcoin") }}

    //- 銀行卡提款表單
    .flex.flex-col.items-stretch(v-if='withdrawalType == 1')
      //- 提領金額標題
      .grid.grid-cols-amount.gap-2.items-center.mt-6
        //- 提領金額標題
        .subtitle1.text-primary {{ t("withdrawal_amount") }}

        //- 單筆限額標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_amountLimit") }}

        //- 單筆限額數值
        .body2.text-primary 
          span {{ commaFormat(100) }}
          span -
          span {{ commaFormat(200000, false) }}

      //- 提領金額輸入框
      BasicField.mt-4(:value='amount', :error='amountError', :placeholder='t("withdrawal_amountPlaceholder")', type='number', @update:value='handleUpdateAmount')
        template(#left)
          img.w-4.h-4.ml-4(:src='iconRmbPrimary')
        template(#right)
          BasicButton(text-color='accent', size='medium', @click='handleAllAmountClick') {{ t("common_all") }}

      //- 銀行卡標題
      .subtitle1.text-primary.mt-6 {{ t("withdrawal_chooseBankcard") }}

      //- 銀行卡按鈕
      BasicButton.mt-4.bg-field(content='stretch', @click='handleBankcardClick')
        .grid.grid-cols-bankcard.gap-2.items-center.p-4
          img.w-4.h-4(:src='iconCreditCardPrimary')
          .body1.text-primary.text-left.px-2(v-if='selectedBankcard') {{ selectedBankcard.bankNo }}
          .body1.text-primary.text-left.opacity-40.px-2(v-else) {{ t("withdrawal_bankcardPlaceholder") }}
          img.w-4.h-4(:src='iconTriangleDownPrimary')

    //- 虛擬貨幣提款表單
    .flex.flex-col.items-stretch(v-if='withdrawalType == 2')
      //- 提示
      .body2.text-primary.opacity-40.mt-4
        span ●
        span.ml-2 {{ t("withdrawal_altcoinHint") }}

      //- 虛擬貨幣類型
      .grid.grid-cols-2.gap-2.mt-4
        //- 錢包類型
        .flex.flex-col.items-stretch
          //- 錢包類型標題
          .subtitle1.text-primary {{ t("withdrawal_altcoinWalletType") }}

          //- 錢包類型按鈕
          BasicButton.mt-4.bg-field(content='stretch', @click='handleAltcoinWalletTypeClick')
            .grid.grid-cols-altcoin-dropdown.items-center.gap-4.p-4
              .body1.text-primary.text-left.px-2 {{ altcoinWalletType.name }}
              img.w-4.h-4(:src='iconTriangleDownPrimary')

        //- 貨幣類型
        .flex.flex-col.items-stretch
          //- 貨幣類型標題
          .subtitle1.text-primary {{ t("withdrawal_altcoinCoinType") }}

          //- 貨幣類型按鈕
          BasicButton.mt-4.bg-field(content='stretch', @click='handleAltcoinCoinTypeClick')
            .grid.grid-cols-altcoin-dropdown.items-center.gap-4.p-4
              .body1.text-primary.text-left.px-2 {{ altcoinCoinType.name }}
              img.w-4.h-4(:src='iconTriangleDownPrimary')

      //- 提領地址標題
      .subtitle1.text-primary.mt-6 {{ t("withdrawal_altcoinAddress") }}

      //- 提領地址按鈕
      BasicButton.mt-4.bg-field(content='stretch', @click='handleAltcoinClick')
        .grid.grid-cols-altcoin-dropdown.items-center.gap-4.p-4
          .body1.text-primary.text-left.px-2(v-if='selectedAltcoin') {{ selectedAltcoin.address }}
          .body1.text-primary.text-left.opacity-40.px-2(v-else) {{ t("withdrawal_altcoinAddressPlaceholder") }}
          img.w-4.h-4(:src='iconTriangleDownPrimary')

      //- 提領金額標題
      .subtitle1.text-primary.mt-6 {{ t("withdrawal_amount") }}

      //- 提領金額輸入框
      BasicField.mt-4(:value='amount', :error='amountError', :placeholder='t("withdrawal_amountPlaceholder")', type='number', @update:value='handleUpdateAmount')
        template(#left)
          img.w-4.h-4.ml-4(:src='iconRmbPrimary')
        template(#right)
          BasicButton(text-color='accent', size='medium', @click='handleAllAmountClick') {{ t("common_all") }}

      //- 提領金額換算
      .flex.flex-row.items-center.mt-4
        .headline3.text-primary
          span ≈
          span.ml-1 {{ exchangeAmount }}
          span.ml-1 USDT
        BasicButton.ml-2.rounded-full
          img.w-5.h-5.rounded-full(:src='iconInfoPrimary40')

      //- 參考匯率
      .body2.text-primary.opacity-40.mt-1
        span {{ t("withdrawal_altcoinExchange") }}
        span.ml-2 {{ exchangeRate }}

  //- 按鈕
  .px-8.pt-2.pb-12.flex.flex-col.items-stretch
    //- 提款
    BasicButton(:loading='postWithdrawalLoading', :disabled='postWithdrawalDisabled', bg='accent100', size='large', @click='handlePostWithdrawalClick') {{ t("common_confirm") }}

  //- 銀行卡彈窗
  BankcardPopup(v-model:show='showBankcardPopup', @clickItem='handleBankcardItemClick')

  //- 虛擬貨幣彈窗
  AltcoinPopup(v-model:show='showAltcoinPopup', @clickItem='handleAltcoinItemClick')

//- 虛擬貨幣錢包類型彈窗
AltcoinTypePopup(v-model:show='showAltcoinWalletTypePopup', v-model:selected='altcoinWalletType', :list='altcoinWalletTypeList')

//- 虛擬貨幣貨幣類型彈窗
AltcoinTypePopup(v-model:show='showAltcoinCoinTypePopup', v-model:selected='altcoinCoinType', :list='altcoinCoinTypeList')

//- 手機號碼彈窗
PhonePopup(:show='showPhonePopup', :originalPhone='meData?.phone', @click-close='handlePhonePopupCloseClick', @refresh='handleRefreshPhone')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { getMe } from '@/api/member/member';
  import { postRecycle } from '@/api/game/game';
  import { getMemberMoney } from '@/api/money/wallet';
  import { useMemberStore } from '@/store/member-store';
  import { getBalanceCurrent } from '@/api/game/balance';
  import { staticImgUrl, errorImg, commaFormat } from '@/utils';
  import { getWithdrawal, postWithdrawal } from '@/api/payment/withdrawal';
  import Nav from '@/components/withdrawal/Nav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import PhonePopup from '@/components/security/PhonePopup.vue';
  import AltcoinPopup from '@/components/withdrawal/AltcoinPopup.vue';
  import BankcardPopup from '@/components/withdrawal/BankcardPopup.vue';
  import AltcoinTypePopup from '@/components/withdrawal/AltcoinTypePopup.vue';
  import type { MeData } from '@/api/member/model/member-model';
  import type { BankcardItem, USDTItem } from '@/api/member/model/member-model';
  import type { GetWithdrawalResponseData } from '@/api/payment/model/withdrawal-model';

  /**
   * Static icons
   */
  const iconRmbPrimary = staticImgUrl('icon-rmb-primary.svg');
  const iconRefreshCirclePrimary = staticImgUrl('icon-refresh-circle-primary.svg');
  const iconTriangleDownPrimary = staticImgUrl('icon-triangle-down-primary.svg');
  const iconCreditCardPrimary = staticImgUrl('icon-credit-card-primary.svg');
  const iconInfoPrimary40 = staticImgUrl('icon-info-primary40.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Member store
   */
  const memberStore = useMemberStore();

  /**
   * Get withdrawal data loading status
   */
  const getWithdrawalDataLoading = ref(false);

  /**
   * Get me loading status
   */
  const getMeLoading = ref(false);

  /**
   * Get money loading status
   */
  const getMoneyLoading = ref(false);

  /**
   * Get balance loading status
   */
  const getBalanceLoading = ref(false);

  /**
   * Post recycle loading status
   */
  const postRecycleLoading = ref(false);

  /**
   * Posting withdrawal data
   */
  const postWithdrawalLoading = ref(false);

  /**
   * Show bankcard popup
   */
  const showBankcardPopup = ref(false);

  /**
   * Show altcoin popup
   */
  const showAltcoinPopup = ref(false);

  /**
   * Show altcoin wallet type popup
   */
  const showAltcoinWalletTypePopup = ref(false);

  /**
   * Show altcoin coin type popup
   */
  const showAltcoinCoinTypePopup = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData | undefined>();

  /**
   * Withdrawal data
   */
  const withdrawalData = ref<GetWithdrawalResponseData>({});

  /**
   * Amount
   */
  const balance = ref('');

  /**
   * Withdrawal type
   */
  const withdrawalType = ref(1);

  /**
   * Altcoin wallet type list
   */
  const altcoinWalletTypeList = ref([
    {
      id: 1,
      name: 'ERC20',
    },
    {
      id: 2,
      name: 'TRC20',
    },
  ]);

  /**
   * Altcoin type
   */
  const altcoinWalletType = ref(altcoinWalletTypeList.value[0]);

  /**
   * Altcoin coin type list
   */
  const altcoinCoinTypeList = ref([
    {
      id: 1,
      name: 'USDT',
    },
  ]);

  /**
   * Altcoin coin type
   */
  const altcoinCoinType = ref(altcoinCoinTypeList.value[0]);

  /**
   * Amount
   */
  const amount = ref('');

  /**
   * Amount error
   */
  const amountError = ref('');

  /**
   * Selected bankcard
   */
  const selectedBankcard = ref<BankcardItem | undefined>(undefined);

  /**
   * Selected altcoin
   */
  const selectedAltcoin = ref<USDTItem | undefined>(undefined);

  /**
   * Show phone popup
   */
  const showPhonePopup = computed(() => {
    return meData.value != undefined && meData.value?.phoneCert != '1';
  });

  /**
   * Member money
   */
  const money = computed(() => {
    return commaFormat(memberStore.getMoney);
  });

  /**
   * Exchange rate
   */
  const exchangeRate = computed(() => {
    if (altcoinWalletType.value.id == 1) {
      // ERC
      return withdrawalData.value.exchangeRateERC || 0;
    } else if (altcoinWalletType.value.id == 2) {
      // TRC
      return withdrawalData.value.exchangeRateTRC || 0;
    } else {
      // Unexpected
      return 0;
    }
  });

  /**
   * Exchange amount
   */
  const exchangeAmount = computed(() => {
    return commaFormat(Number(amount.value) * exchangeRate.value, true);
  });

  /**
   * Post withdrawal button disabled
   */
  const postWithdrawalDisabled = computed(() => {
    if (withdrawalType.value == 1) {
      // 銀行卡提款
      return !amount.value || !selectedBankcard.value;
    } else if (withdrawalType.value == 2) {
      // 虛擬貨幣提款
      return !altcoinWalletType.value || !altcoinCoinType.value || !selectedAltcoin.value || !amount.value;
    }
    return true;
  });

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn refreshing on
      getMeLoading.value = true;

      // Get me data
      const response = await getMe();
      meData.value = response?.data?.data || {};
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      getMeLoading.value = false;
    }
  };

  /**
   * Get withdrawal data
   */
  const getWithdrawalData = async () => {
    try {
      // Turn on loading status
      getWithdrawalDataLoading.value = true;

      // Get withdrawal data
      const response = await getWithdrawal();

      // Update withdrawal data
      withdrawalData.value = response.data?.data || {};
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getWithdrawalDataLoading.value = false;
    }
  };

  /**
   * Get money
   */
  const getMoney = async () => {
    try {
      // Turn on loading status
      getMoneyLoading.value = true;

      // Get member money
      const response = await getMemberMoney();

      // Update money
      memberStore.updateMoney(response?.data?.data?.money || 0);
      memberStore.updateLockMoney(response?.data?.data?.lockMoney || 0);
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getMoneyLoading.value = false;
    }
  };

  /**
   * Get balance list
   */
  const getBalanceList = async () => {
    try {
      // Turn on loading status
      getBalanceLoading.value = true;

      // Get game balance list
      const response = await getBalanceCurrent();

      // Update balance
      const balanceList = response.data?.data?.list || [];
      const total = balanceList.reduce((acc, curr) => {
        return acc + (curr.moeny || 0);
      }, 0);
      balance.value = commaFormat(total);
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getBalanceLoading.value = false;
    }
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
   * Hancle balance refresh
   */
  const handleBlanaceRefresh = () => {
    getBalanceList();
  };

  /**
   * Handle bankcard type button clicked
   */
  const handleBankcardTypeClick = () => {
    withdrawalType.value = 1;
  };

  /**
   * Handle altcoin type button clicked
   */
  const handleAltcoinTypeClick = () => {
    withdrawalType.value = 2;
  };

  /**
   * Handle update amount
   */
  const handleUpdateAmount = (newAmount: string) => {
    amount.value = newAmount;
    amountError.value = '';
  };

  /**
   * Handle all amount button click
   */
  const handleAllAmountClick = () => {
    amount.value = money.value;
  };

  /**
   * Handle bankcard button click
   */
  const handleBankcardClick = () => {
    showBankcardPopup.value = true;
  };

  /**
   * Handle bankcard item click
   */
  const handleBankcardItemClick = (item?: BankcardItem) => {
    selectedBankcard.value = item;
    showBankcardPopup.value = false;
  };

  /**
   * Handle altcoin button click
   */
  const handleAltcoinClick = () => {
    showAltcoinPopup.value = true;
  };

  /**
   * Handle altcoin item click
   */
  const handleAltcoinItemClick = (item?: USDTItem) => {
    // Update selected altcoin
    selectedAltcoin.value = item;

    // Update wallet type
    if (selectedAltcoin.value?.type == 1) {
      // ERC
      altcoinWalletType.value = altcoinWalletTypeList.value[0];
    } else if (selectedAltcoin.value?.type == 2) {
      // TRC
      altcoinWalletType.value = altcoinWalletTypeList.value[1];
    }

    // Hide popup
    showAltcoinPopup.value = false;
  };

  /**
   * Handle altcoin wallet type button click
   */
  const handleAltcoinWalletTypeClick = () => {
    showAltcoinWalletTypePopup.value = true;
  };

  /**
   * Handle altcoin coin type button click
   */
  const handleAltcoinCoinTypeClick = () => {
    showAltcoinCoinTypePopup.value = true;
  };

  /**
   * Handle post withdrawal button clicked
   */
  const handlePostWithdrawalClick = async () => {
    try {
      // Turn on loading status
      postWithdrawalLoading.value = true;

      // Compute type
      let type = 0;
      if (withdrawalType.value == 1) {
        // 1: 銀行卡
        type = 1;
      } else if (withdrawalType.value == 2 && altcoinWalletType.value?.id == 1) {
        // 2: USDT-ERC
        type = 2;
      } else if (withdrawalType.value == 2 && altcoinWalletType.value?.id == 2) {
        // 3: USDT-TRC
        type = 3;
      }

      // Compute id
      let id: string | number;
      if (withdrawalType.value == 1) {
        // 1: 銀行卡
        id = selectedBankcard.value?.bankNo || '';
      } else {
        // 2: USDT-ERC
        // 3: USDT-TRC
        id = selectedAltcoin.value?.address || '';
      }

      // Post withdrawal
      const response = await postWithdrawal({
        type,
        id,
        amount: Number(amount.value),
      });

      // Navigate withdrawal order
      const orderId = response?.data?.data?.id || 0;
      router.push({
        path: `/withdrawal/order/${orderId}`,
      });
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      postWithdrawalLoading.value = false;
    }
  };

  /**
   * Handle phone popup close button clicked
   */
  const handlePhonePopupCloseClick = () => {
    router.back();
    return true;
  };

  /**
   * Handle update phone
   */
  const handleRefreshPhone = () => {
    getMeData();
    getWithdrawalData();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Get me data
    getMeData();

    // Get withdrawal data
    getWithdrawalData();

    // Get money
    getMoney();

    // Get balance list
    getBalanceList();
  });
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .grid-cols-center-wallet {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-game-wallet {
    grid-template-columns: 1fr auto;
  }

  .bg-type {
    background: rgba(7, 31, 68, 0.03);
  }

  .grid-cols-amount {
    grid-template-columns: 1fr auto auto;
  }

  .grid-cols-bankcard {
    grid-template-columns: auto 1fr auto;
  }

  .bg-field {
    background: rgba(7, 31, 68, 0.03);
    border-radius: 4px;
  }

  .grid-cols-altcoin-dropdown {
    grid-template-columns: 1fr auto;
  }
</style>
