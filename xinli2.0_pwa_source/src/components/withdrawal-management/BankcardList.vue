<template lang="pug">
//- 下拉刷新
PullRefresh.relative.z-10.flex-grow(v-model='getBankcardListLoading', @refresh='handleRefresh')
  //- 銀行卡列表
  .flex.flex-col.items-stretch.pb-6
    //- 添加銀行卡
    BasicButton.mx-4.mt-4.shadow(content='stretch', bg='white100', rounded='normal', @click='handleAddClick')
      //- 按鈕內容
      .flex.flex-row.items-center.p-4
        //- 添加圖示
        img.w-6.h-6(:src='iconPlusPriamary')

        //- 添加標題
        .subtitle1.text-primary.opacity-60.pl-4 {{ t("withdrawalManagement_bankcardAdd") }}

    //- 添加其他姓名銀行卡
    BasicButton.mx-4.mt-2.shadow(v-if='allowOtherBankCard', content='stretch', bg='white100', rounded='normal', @click='handleAddOtherNameClick')
      //- 按鈕內容
      .flex.flex-row.items-center.p-4
        //- 添加圖示
        img.w-6.h-6(:src='iconPlusPriamary')

        //- 添加標題
        .subtitle1.text-primary.opacity-60.pl-4 {{ t("withdrawalManagement_bankcardAddOtherName") }}

    //- 銀行卡列表空白
    .flex.flex-col.items-center.mt-20(v-if='bankcardListEmpty')
      img.w-18.h-18(:src='iconEmptyBankcard')
      .body1.text-primary.opacity-40.mt-8 {{ t("withdrawalManagement_bankcardEmpty") }}

    //- 銀行卡物件列表
    BankcardItem(v-else, v-for='item in bankcardList', :item='item', @clickItem='handleItemClick')

  //- 真實姓名彈窗(添加本人銀行卡前綁定姓名)
  RealNamePopup(v-model:show='showRealNamePopup', @refresh='handleRealNameVerified')

  //- 手機號碼彈窗(大客添加他人銀行卡前綁定手機)
  PhonePopup(v-model:show='showPhonePopup', @refresh='handlePhoneVerified')

  //- 簡訊驗證彈窗(大客添加他人銀行卡前驗證手機)
  SmsPopup(v-model:show='showSmsPopup', :phone='phone', @refresh='handleSmsVerified')

  //- 添加銀行卡彈窗
  AddBankcardPopup(v-model:show='showAddBankcardPopup', :realName='realName', @refresh='handleRefresh')

  //- 添加銀行卡彈窗
  AddBankcardPopup(v-model:show='showAddOtherBankcardPopup', :realName='otherBankCardName', :otherBankcard='true', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { defineEmits, ref, computed, onMounted } from 'vue';
  import { PullRefresh } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { getMe, getBankcards } from '@/api/member/member';
  import BasicButton from '@/components/button/BasicButton.vue';
  import PhonePopup from '@/components/security/PhonePopup.vue';
  import RealNamePopup from '@/components/security/RealNamePopup.vue';
  import SmsPopup from '@/components/withdrawal-management/SmsPopup.vue';
  import BankcardItem from '@/components/withdrawal-management/BankcardItem.vue';
  import AddBankcardPopup from '@/components/withdrawal-management/AddBankcardPopup.vue';
  import type { MeData, BankcardItem as BankcardItemClass } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconPlusPriamary = staticImgUrl('icon-plus-primary.svg');
  const iconEmptyBankcard = staticImgUrl('icon-empty-bankcard.svg');

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click item
     */
    (e: 'clickItem', item?: BankcardItemClass): void;
  }

  /**
   * Component emit
   */
  const emit = defineEmits<Emits>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Get me loading status
   */
  const getMeLoading = ref(false);

  /**
   * Get bankcard list loading status
   */
  const getBankcardListLoading = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Bankcard list
   */
  const bankcardList = ref<BankcardItemClass[]>([]);

  /**
   * Show real name popup
   */
  const showRealNamePopup = ref(false);

  /**
   * Show phone popup
   */
  const showPhonePopup = ref(false);

  /**
   * Show sms popup
   */
  const showSmsPopup = ref(false);

  /**
   * Show add bankcard popup
   */
  const showAddBankcardPopup = ref(false);

  /**
   * Show add other bankcard popup
   */
  const showAddOtherBankcardPopup = ref(false);

  /**
   * Real name
   */
  const realName = computed(() => {
    return meData.value.name || '';
  });

  /**
   * Phone
   */
  const phone = computed(() => {
    return meData.value.phone || '';
  });

  /**
   * Phone verified
   */
  const phoneVerified = computed(() => {
    return meData.value.phoneCert == '1';
  });

  /**
   * Other bankcard name
   */
  const otherBankCardName = computed(() => {
    return meData.value.otherBankCardName || '';
  });

  /**
   * Allow other bankcard
   */
  const allowOtherBankCard = computed(() => {
    return meData.value.allowOtherBankCard == true;
  });

  /**
   * Bankcard list empty
   */
  const bankcardListEmpty = computed(() => {
    return bankcardList.value.length === 0;
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
   * Get bankcard list
   */
  const getBankcardList = async () => {
    try {
      // Turn refreshing on
      getBankcardListLoading.value = true;

      // Get bankcard list
      const response = await getBankcards();
      bankcardList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      getBankcardListLoading.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getMeData();
    getBankcardList();
  };

  /**
   * Handle real name verified
   */
  const handleRealNameVerified = () => {
    getMeData();
    showAddBankcardPopup.value = true;
  };

  /**
   * Handle phone verified
   */
  const handlePhoneVerified = () => {
    getMeData();
    showAddOtherBankcardPopup.value = true;
  };

  /**
   * Handle sms verified
   */
  const handleSmsVerified = () => {
    showAddOtherBankcardPopup.value = true;
  };

  /**
   * Handle add button clicked
   */
  const handleAddClick = () => {
    if (getMeLoading.value) {
      // Skip if getting me data
    } else if (!realName.value) {
      showRealNamePopup.value = true;
    } else {
      showAddBankcardPopup.value = true;
    }
  };

  /**
   * Handle add other name button clicked
   */
  const handleAddOtherNameClick = () => {
    if (getMeLoading.value) {
      // Skip if getting me data
    } else if (!phoneVerified.value) {
      showPhonePopup.value = true;
    } else {
      showSmsPopup.value = true;
    }
  };

  /**
   * Handle item clicked
   */
  const handleItemClick = (item?: BankcardItemClass) => {
    emit('clickItem', item);
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMeData();
    getBankcardList();
  });
</script>
