<template lang="pug">
//- 充值頁面
.flex-grow.grid.grid-rows-content.justify-stretch
  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0

  //- 導覽欄(relative)
  Nav.relative.z-20

  //- 頁面內容
  .flex.flex-col.items-stretch.pb-6.bg-white
    //- 公告讀取中
    .flex.flex-col.items-center.justify-center.h-20.mt-2.px-4(v-if='getAnnouncementLoading')
      Loading(type='spinner', size='24px')

    //- 公告
    .grid.grid-cols-announcement.gap-2.items-center.bg-announcement.py-2.px-4(v-else-if='!announcementEmpty')
      //- 公告圖示
      img.w-4.h-4(:src='iconNoticePrimary30')

      //- 公告內容
      Swiper.w-full.h-10(direction='vertical', :modules='[Autoplay]', :autoplay='{ delay: 3500, disableOnInteraction: false }', :loop='true')
        SwiperSlide.flex.flex-row.items-center(v-for='item in announcementList')
          .max-h-10.paragraph2.text-primary.opacity-40.overflow-hidden.overflow-ellipsis {{ `${item.description}${item.description}` }}

    //- 渠道列表讀取中
    .flex.flex-col.items-center.justify-center.h-20.mt-2.px-4(v-if='getDepositDataLoading')
      Loading(type='spinner', size='24px')

    //- 渠道空白
    .flex.flex-col.items-center.mt-20.px-14(v-else-if='depositEmpty')
      //- 圖示
      img.w-18.h-18(:src='iconEmptyDeposit')

      //- 提示
      .mt-6.body2.text-primary.opacity-40 {{ t("deposit_maintenance") }}

    //- 渠道選項
    .flex.flex-col.items-stretch(v-else)
      //- 渠道標題
      .subtitle1.text-primary.mt-4.px-4 {{ t("deposit_chooseGateway") }}

      //- 渠道列表
      .grid.grid-cols-gateway.gap-1.items-stretch.mt-1.px-4
        BasicButton.h-20.mt-1.bg-gateway(v-for='item in depositList', :class='{ selected: item.selected }', content='stretch', @click='handleDepositItemClick(item)')
          //- 維護中
          .flex.flex-col.items-center.justify-center.h-20(v-if='item.maintain == 1')
            img.z-10.w-5.h-5.opacity-10(:src='item.icon || ""', @error='errorImg')
            .z-10.body2.text-primary.opacity-40.mt-1 {{ item.name }}
            .z-20.absolute.top-4.left-0.right-0.body2.text-systemError.text-center {{ t("game_maintenance") }}

          //- 正常
          .relative.flex.flex-col.items-center.justify-center.h-20(v-else)
            img.z-10.w-5.h-5(:src='item.icon || ""', @error='errorImg')
            .z-10.body2.text-primary.mt-1 {{ item.name }}
            .z-10.body3.text-accent.opacity-90 {{ item.tooltip }}
            img.z-20.absolute.top-0.left-0.w-8.h-8(v-if='item.isRecommend', :src='iconDepositRecommend')

      //- 建議
      .flex.flex-row.body2.text-accent.opacity-80.mt-2.px-4(v-if='selectedDeposit?.note')
        span ●
        span.ml-2 {{ selectedDeposit?.note }}

    //- 真實姓名讀取中
    .flex.flex-col.items-center.justify-center(v-if='getMeLoading')
      Loading.px-4.mt-6(type='spinner', size='24px')

    //- 真實姓名填寫
    .flex.flex-col.items-stretch(v-else-if='realNameEmpty')
      //- 完善茲資料標題
      .subtitle1.text-primary.mt-6.px-4 {{ t("deposit_fillData") }}

      //- 填寫真實姓名提示
      .body1.text-primary.opacity-60.mt-2.px-4 {{ t("deposit_fillRealName") }}

      //- 真實姓名輸入框
      .mt-2.px-4
        BasicField(v-model:value='realName', :iconLeft='iconUserPrimary', :placeholder='t("deposit_fillRealNamePlaceholder")')

      //- 提示訊息1
      .body2.text-primary.opacity-40.mt-4.px-4
        span ●
        span.ml-2 {{ t("deposit_fillRealNameHint1") }}

      //- 提示訊息2
      .body2.text-primary.opacity-40.mt-2.px-4
        span ●
        span.ml-2 {{ t("deposit_fillRealNameHint2") }}

    //- 充值選項填寫
    .flex.flex-col.items-stretch(v-else-if='selectedDeposit')
      //- 充值金額標題
      .subtitle1.text-primary.mt-6.px-4 {{ t("deposit_chooseAmount") }}

      //- 充值金額列表
      .grid.grid-cols-gateway.gap-1.items-stretch.mt-1.px-4
        BasicButton.mt-1.bg-amount-item(v-for='item in amountList', content='stretch', @click='handleAmountItemClick(item)')
          .flex.flex-col.items-center.justify-center.h-8
            .subtitle2.text-primary {{ commaFormat(item, true) }}

      //- 充值金額輸入框
      .flex.flex-col.items-stretch.mt-4.px-4
        BasicField(:value='amount', :error='amountError', :placeholder='t("deposit_amountPlaceholder")', type='number', @update:value='handleUpdateAmount')
          template(#left)
            img.w-4.h-4.ml-4(:src='iconRmbPrimary')
          template(#right)
            .body2.text-primary.mr-4(v-if='amountLimit')
              span {{ t("deposit_amountLimit") }}
              span.ml-1 {{ amountLimit }}

      //- 匯率
      .flex.flex-row.items-center.mt-2.px-4(v-if='isAltcoinSelected')
        .headline3.text-primary 
          span {{ exchangeAmount }}
          span.ml-2 USDT
        BasicButton.ml-2.rounded-full(@click='handleExchangeInfoClick')
          img.w-5.h-5(:src='iconInfoPrimary40')

      //- 參考匯率
      .body2.text-primary.opacity-40.mt-1.px-4(v-if='isAltcoinSelected')
        span {{ t("deposit_exchangeRate") }}
        span.ml-2 {{ "1 USDT = " }}
        span(v-if='isERCSelected') {{ commaFormat(exchangeRateERC) }}
        span(v-else-if='isTRCSelected') {{ commaFormat(exchangeRateTRC) }}
        span(v-else) {{ commaFormat(0) }}

      //- 充值錢包標題
      .subtitle1.text-primary.mt-6.px-4 {{ t("deposit_chooseWallet") }}

      //- 充值錢包按鈕
      .flex.flex-col.items-stretch.mt-4.px-4
        BasicButton.bg-field(content='stretch', @click='handleWalletTypeClick')
          .grid.grid-cols-wallet.gap-4.items-center.p-4
            .body1.text-primary {{ t("deposit_centerWallet") }}
            .flex.flex-row.items-center.justify-end
              Loading(v-if='getMoneyLoading', type='spinner', size='12px')
              .body1.text-accent(v-else) {{ money }}
            img.w-4.h-4(:src='iconTriangleDownPrimary')

      //- 持卡人姓名標題
      .subtitle1.text-primary.mt-6.px-4(v-if='selectedDeposit.needRealName') {{ t("deposit_chooseWallet") }}

      //- 持卡人姓名
      .headline2.text-primary.mt-2.px-4(v-if='selectedDeposit.needRealName') {{ realName }}

      //- 持卡人姓名提示
      .headline2.text-primary.opacity-40.mt-2.px-4(v-if='selectedDeposit.needRealName') {{ t("deposit_realNameHint") }}

      //- 我沒有虛擬貨幣按鈕
      .flex.flex-col.items-stretch.mt-6.px-4(v-if='isAltcoinSelected')
        BasicButton.bg-field(content='stretch', @click='handleBuyAltcoinClick')
          .grid.grid-cols-wallet.gap-4.items-center.p-4
            img.w-5.h-5(:src='iconCoinAccent60')
            .body1.text-accent.text-left {{ t("deposit_buyERC") }}
            img.w-4.h-4(:src='iconArrowRightAccent')

      //- 虛擬貨幣教學
      .flex.flex-row.items-stretch.justify-center.mt-6.px-4(v-if='isAltcoinSelected')
        .subtitle1.text-primary.opacity-60 {{ t("deposit_learnERC") }}
        BasicButton.ml-2.rounded-full(@click='handleAltcoinHelpClick')
          img.w-5.h-5(:src='iconQuestionPrimary60')

  //- 按鈕
  .px-8.pt-2.pb-12.flex.flex-col.items-stretch
    //- 提交真實信名
    BasicButton(v-if='realNameEmpty', :loading='putRealNameLoading', :disabled='postRealNameDisabled', bg='accent100', size='large', @click='handlePostRealNameClick') {{ t("deposit_fillRealNameSubmit") }}

    //- 提交存款單
    BasicButton(v-else, :loading='postDepositLoading', :disabled='postDepositDisabled', bg='accent100', size='large', @click='handlePostDepositClick') {{ t("common_confirm") }}

  //- 錢包類型彈窗
  WalletTypePopup(v-model:show='showWalletTypePopup', v-model:selected='walletType', :list='walletTypeList')

  //- 瀏覽器阻擋提示彈窗
  BlockHintPopup

  //- 手機號碼彈窗
  PhonePopup(:show='showPhonePopup', :originalPhone='meData?.phone', @click-close='handlePhonePopupCloseClick', @refresh='handleRefreshPhone')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading, Dialog, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { getBanner } from '@/api/event/event';
  import { getMemberMoney } from '@/api/money/wallet';
  import { getMe, putName } from '@/api/member/member';
  import { useMemberStore } from '@/store/member-store';
  import { getDeposit, postDeposit } from '@/api/payment/deposit';
  import { staticImgUrl, errorImg, commaFormat } from '@/utils';
  import Nav from '@/components/deposit/Nav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import PhonePopup from '@/components/security/PhonePopup.vue';
  import BlockHintPopup from '@/components/deposit/BlockHintPopup.vue';
  import WalletTypePopup from '@/components/deposit/WalletTypePopup.vue';
  import type { MeData } from '@/api/member/model/member-model';
  import type { BannerItem } from '@/api/event/model/event-model';
  import type { DepositItem } from '@/api/payment/model/deposit-model';
  import 'swiper/css';

  /**
   * Static icons
   */
  const iconNoticePrimary30 = staticImgUrl('icon-notice-primary30.svg');
  const iconEmptyDeposit = staticImgUrl('icon-empty-deposit.svg');
  const iconDepositRecommend = staticImgUrl('icon-deposit-recommend.svg');
  const iconUserPrimary = staticImgUrl('icon-user-primary.svg');
  const iconRmbPrimary = staticImgUrl('icon-rmb-primary.svg');
  const iconTriangleDownPrimary = staticImgUrl('icon-triangle-down-primary.svg');
  const iconInfoPrimary40 = staticImgUrl('icon-info-primary40.svg');
  const iconCoinAccent60 = staticImgUrl('icon-coin-accent60.svg');
  const iconArrowRightAccent = staticImgUrl('icon-arrow-right-accent.svg');
  const iconQuestionPrimary60 = staticImgUrl('icon-question-primary60.svg');

  /**
   * Selectable deposit item
   */
  interface SelectableDepositItem extends DepositItem {
    selected?: boolean;
  }

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
   * Get announcement loading
   */
  const getAnnouncementLoading = ref(false);

  /**
   * Get me loading status
   */
  const getMeLoading = ref(false);

  /**
   * Get money loading status
   */
  const getMoneyLoading = ref(false);

  /**
   * Getting deposit data
   */
  const getDepositDataLoading = ref(false);

  /**
   * Putting real name data
   */
  const putRealNameLoading = ref(false);

  /**
   * Posting deposit data
   */
  const postDepositLoading = ref(false);

  /**
   * Show wallet type popup
   */
  const showWalletTypePopup = ref(false);

  /**
   * Wallet type list
   */
  const walletTypeList = ref([
    {
      id: 1,
      name: t('deposit_centerWallet'),
    },
  ]);

  /**
   * Wallet type
   */
  const walletType = ref(walletTypeList.value[0]);

  /**
   * Me data
   */
  const meData = ref<MeData | undefined>();

  /**
   * Announcement list
   */
  const announcementList = ref<BannerItem[]>([]);

  /**
   * Deposit list
   */
  const depositList = ref<SelectableDepositItem[]>([]);

  /**
   * Real name
   */
  const realName = ref('');

  /**
   * Amount
   */
  const amount = ref('');

  /**
   * Amount error
   */
  const amountError = ref('');

  /**
   * ERC exchange rage
   */
  const exchangeRateERC = ref(0);

  /**
   * TRC exchange rage
   */
  const exchangeRateTRC = ref(0);

  /**
   * Show phone popup
   */
  const showPhonePopup = computed(() => {
    return meData.value != undefined && meData.value?.phoneCert != '1';
  });

  /**
   * Announcement empty
   */
  const announcementEmpty = computed(() => {
    return !announcementList.value || announcementList.value.length == 0;
  });

  /**
   * Deposit empty
   */
  const depositEmpty = computed(() => {
    return !depositList.value || depositList.value.length == 0;
  });

  /**
   * Real name empty
   */
  const realNameEmpty = computed(() => {
    return meData.value?.name == undefined || meData.value?.name?.length == 0;
  });

  /**
   * Selected deposit
   */
  const selectedDeposit = computed(() => {
    return depositList.value.find((element) => element.selected == true);
  });

  /**
   * ERC type selected
   */
  const isERCSelected = computed(() => {
    const name = selectedDeposit.value?.name || '';
    const erc1 = name.indexOf('ERC') >= 0;
    const erc2 = name.indexOf('erc') >= 0;
    return erc1 || erc2;
  });

  /**
   * TRC type selected
   */
  const isTRCSelected = computed(() => {
    const name = selectedDeposit.value?.name || '';
    const trc1 = name.indexOf('TRC') >= 0;
    const trc2 = name.indexOf('trc') >= 0;
    return trc1 || trc2;
  });

  /**
   * Altcoin type selected
   */
  const isAltcoinSelected = computed(() => {
    return isERCSelected.value || isTRCSelected.value;
  });

  /**
   * Exchange amount
   */
  const exchangeAmount = computed(() => {
    if (isERCSelected.value) {
      return Number(amount.value) * exchangeRateERC.value;
    } else if (isTRCSelected.value) {
      return Number(amount.value) * exchangeRateTRC.value;
    } else {
      return 0;
    }
  });

  /**
   * Amount list
   */
  const amountList = computed(() => {
    const count = 4;
    const lower = selectedDeposit.value?.lower || 0;
    const upper = selectedDeposit.value?.upper || 0;
    const step = Math.round((upper - lower) / (count - 1));
    const array: number[] = [];
    for (let i = 0; i < count; i++) {
      if (i == 0) {
        array[i] = lower;
      } else if (i == count - 1) {
        array[i] = upper;
      } else {
        array[i] = lower + step * i;
      }
    }
    return array;
  });

  /**
   * Amount limit
   */
  const amountLimit = computed(() => {
    const selected = selectedDeposit.value;
    if (selected) {
      const lower = selected?.lower || 0;
      const upper = selected?.upper || 0;
      return `${lower}~${upper}`;
    } else {
      return undefined;
    }
  });

  /**
   * Member money
   */
  const money = computed(() => {
    return commaFormat(memberStore.getMoney);
  });

  /**
   * Post real name button disabled
   */
  const postRealNameDisabled = computed(() => {
    return !realName.value;
  });

  /**
   * Post deposit button disabled
   */
  const postDepositDisabled = computed(() => {
    return !selectedDeposit.value || !amount.value || Number(amount.value) <= 0;
  });

  /**
   * Get announcement
   */
  const getAnnouncement = async () => {
    try {
      // Turn loading on
      getAnnouncementLoading.value = true;

      // Get banner
      const response = await getBanner({
        categortyID: 9,
      });

      // Update announcement list
      announcementList.value = response?.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getAnnouncementLoading.value = false;
    }
  };

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
   * Get deposit data
   */
  const getDepositData = async () => {
    try {
      // Turn loading on
      getDepositDataLoading.value = true;

      // Get deposit data
      const response = await getDeposit();

      // Update deposit list
      const list = response?.data?.data?.list || [];
      depositList.value = list.map((element, index) => {
        return {
          ...element,
          selected: index == 0,
        };
      });

      // Update ERC exchange rate
      exchangeRateERC.value = response?.data?.data?.exchangeRateERC || 0;

      // Update TRC exchange rate
      exchangeRateTRC.value = response?.data?.data?.exchangeRateTRC || 0;
    } catch (error) {
      // Exception handled by interceptor
    } finally {
      // Turn loading off
      getDepositDataLoading.value = false;
    }
  };

  /**
   * Handle deposit item clicked
   */
  const handleDepositItemClick = (item: SelectableDepositItem) => {
    depositList.value.forEach((element) => {
      element.selected = element.id == item.id;
    });
  };

  /**
   * Handle exchange info clicked
   */
  const handleExchangeInfoClick = () => {
    Dialog({
      title: t('deposit_exchangeTitle'),
      message: t('deposit_exchangeMessage'),
      confirmButtonText: t('common_confirm'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * Handle update amount
   */
  const handleUpdateAmount = (newAmount: string) => {
    amount.value = newAmount;
    amountError.value = '';
  };

  /**
   * Handle amount item clicked
   */
  const handleAmountItemClick = (item: number) => {
    amount.value = String(item);
    amountError.value = '';
  };

  /**
   * Handle wallet type button clicked
   */
  const handleWalletTypeClick = () => {
    showWalletTypePopup.value = true;
  };

  /**
   * Handle post real name clicked
   */
  const handlePostRealNameClick = async () => {
    try {
      // Turn loading on
      putRealNameLoading.value = true;

      // Put real name
      const response = await putName({
        name: realName.value,
      });

      // Refresh me data
      await getMeData();

      // Notify put success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('deposit_fillRealNameSubmitSuccess'),
      });
    } catch (error) {
      // Exception handled by interceptor
    } finally {
      // Turn loading off
      putRealNameLoading.value = false;
    }
  };

  /**
   * Handle confirm button clicked
   */
  const handlePostDepositClick = async () => {
    try {
      // Validate amount limit
      const amountValue = Number(amount.value);
      const lower = selectedDeposit.value?.lower || 0;
      const upper = selectedDeposit.value?.upper || 0;
      if (amountValue < lower) {
        amountError.value = `${t('deposit_amountLimit')} ${lower}~${upper}`;
        return;
      }
      if (upper > 0 && amountValue > upper) {
        amountError.value = `${t('deposit_amountLimit')} ${lower}~${upper}`;
        return;
      }

      // Turn loading on
      postDepositLoading.value = true;

      // Post deposit
      const response = await postDeposit({
        id: selectedDeposit.value?.id,
        amount: amountValue,
        realName: meData.value?.name,
      });

      // Navigate deposit order
      const id = response.data?.data?.id || 0;
      router.push({
        path: `/deposit/order/${id}`,
      });
    } catch (error) {
      // Exception handled by interceptor
    } finally {
      // Turn loading off
      postDepositLoading.value = false;
    }
  };

  /**
   * Handle buy altcoin button clicked
   */
  const handleBuyAltcoinClick = () => {};

  /**
   * Handle altcoin help button clicked
   */
  const handleAltcoinHelpClick = () => {};

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
    getDepositData();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMoney();
    getMeData();
    getDepositData();
    getAnnouncement();
  });
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .grid-cols-announcement {
    grid-template-columns: auto 1fr;
  }

  .bg-announcement {
    background: rgba(7, 31, 68, 0.03);
  }

  .grid-cols-gateway {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .bg-gateway {
    background: rgba(7, 31, 68, 0.03);
    border-radius: 6px;
    &.selected {
      border: 2px solid #f0453a;
    }
  }

  .grid-cols-amount {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .bg-amount-item {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .bg-field {
    background: rgba(7, 31, 68, 0.03);
    border-radius: 4px;
  }

  .grid-cols-wallet {
    grid-template-columns: auto 1fr auto;
  }
</style>
