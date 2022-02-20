<template lang="pug">
//- 一般訊息頁面
.flex.flex-col.flex-grow.items-stretch.bg-personal
  //- 導覽欄
  BasicNav.bg-white(:title='t("personal")')
    //- 左側
    template(#left)
      //- 關閉
      BackButton

    //- 右側
    template(#right)
      //- 客服
      ChatButton

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 一般訊息內容
    .flex.flex-col.items-stretch.px-4.pb-6
      //- 通訊地址
      MenuItem.mt-4(:titleText='t("personal_address")', :valueText='address || t("common_unset")', :rightIcon='iconArrowRightPrimary40', :firstItem='true', @click='handleAddressClick')

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 微信
      MenuItem(:titleText='t("personal_weixin")', :valueText='weixin || t("common_unset")', :rightIcon='iconArrowRightPrimary40', @click='handleWeixinClick')

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- QQ
      MenuItem(:titleText='t("personal_qq")', :valueText='qq || t("common_unset")', :rightIcon='iconArrowRightPrimary40', @click='handleQQClick')

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 性別
      MenuItem(:titleText='t("personal_gender")', :valueText='gender || t("common_unset")', :rightIcon='iconArrowRightPrimary40', @click='handleGenderClick')

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 生日
      MenuItem(
        :titleText='t("personal_birthday")',
        :valueText='birthday || t("common_unset")',
        :rightIcon='iconArrowRightPrimary40',
        :rightText='meData.birthday ? t("common_modifyMaunally") : ""',
        :lastItem='true',
        @click='handleBirthdayClick'
      )

  //- 地址彈窗
  AddressPopup(v-model:show='showAddressPopup', @refresh='handleRefresh')

  //- 微信號彈窗
  WeixinPopup(v-model:show='showWeixinPopup', @refresh='handleRefresh')

  //- QQ號彈窗
  QQPopup(v-model:show='showQQPopup', @refresh='handleRefresh')

  //- 性別彈窗
  GenderPopup(v-model:show='showGenderPopup', :selected='meData.gender', @refresh='handleRefresh')

  //- 生日彈窗
  BirthdayPopup(v-model:show='showBirthdayPopup', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PullRefresh } from 'vant';
  import { staticImgUrl } from '@/utils';
  import { getMe } from '@/api/member/member';
  import { getProvinces, getCities, getState, getStreet } from '@/api/member/region';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import MenuItem from '@/components/personal/MenuItem.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import AddressPopup from '@/components/personal/AddressPopup.vue';
  import WeixinPopup from '@/components/personal/WeixinPopup.vue';
  import QQPopup from '@/components/personal/QQPopup.vue';
  import GenderPopup from '@/components/personal/GenderPopup.vue';
  import BirthdayPopup from '@/components/personal/BirthdayPopup.vue';
  import dayjs from 'dayjs';
  import type { MeData } from '@/api/member/model/member-model';
  import type { RegionItem } from '@/api/member/model/region-model';

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Province
   */
  const province = ref<RegionItem>();

  /**
   * City
   */
  const city = ref<RegionItem>();

  /**
   * State
   */
  const state = ref<RegionItem>();

  /**
   * Street
   */
  const street = ref<RegionItem>();

  /**
   * Address
   */
  const address = computed(() => {
    if (refreshing.value) {
      return t('common_unset');
    } else {
      const pro = province.value?.name || '';
      const cit = city.value?.name || '';
      const sta = state.value?.name || '';
      const str = street.value?.name || '';
      const add = meData.value.address || '';
      return `${pro}${cit}${sta}${str}${add}` || t('common_unset');
    }
  });

  /**
   * Weixin
   */
  const weixin = computed(() => {
    return meData.value.wechatID || t('common_unset');
  });

  /**
   * QQ
   */
  const qq = computed(() => {
    return meData.value.qqID || t('common_unset');
  });

  /**
   * Gender
   */
  const gender = computed(() => {
    if (meData.value.gender == 1) {
      return t('personal_gender_male');
    }
    if (meData.value.gender == 2) {
      return t('personal_gender_female');
    }
    return t('common_unset');
  });

  /**
   * Birthday
   */
  const birthday = computed(() => {
    if (!meData.value.birthday) {
      return t('common_unset');
    } else {
      try {
        return dayjs(meData.value.birthday, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      } catch (e) {
        return meData.value.birthday;
      }
    }
  });

  /**
   * Show address popup
   */
  const showAddressPopup = ref(false);

  /**
   * Show weixin popup
   */
  const showWeixinPopup = ref(false);

  /**
   * Show qq popup
   */
  const showQQPopup = ref(false);

  /**
   * Show gender popup
   */
  const showGenderPopup = ref(false);

  /**
   * Show birthday popup
   */
  const showBirthdayPopup = ref(false);

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get me data
      const meResponse = await getMe();

      // Update me data
      meData.value = meResponse?.data?.data || {};

      // Get province list
      const provinceResponse = await getProvinces();

      // Update province
      province.value = provinceResponse?.data?.data?.list?.find((element) => {
        return element.id == meData.value?.provinceID;
      });

      // If contains province id
      if (meData.value?.provinceID) {
        // Get cities list
        const citiesResponse = await getCities({
          upid: meData.value?.provinceID,
        });

        // Update city
        city.value = citiesResponse?.data?.data?.list?.find((element) => {
          return element.id == meData.value?.cityID;
        });
      }

      // If contains city id
      if (meData.value?.cityID) {
        // Get state list
        const stateResponse = await getState({
          upid: meData.value?.cityID,
        });

        // Update state
        state.value = stateResponse?.data?.data?.list?.find((element) => {
          return element.id == meData.value?.stateID;
        });
      }

      // If contains state id
      if (meData.value?.stateID) {
        // Get street list
        const streetResponse = await getStreet({
          upid: meData.value?.stateID,
        });

        // Update street
        street.value = streetResponse?.data?.data?.list?.find((element) => {
          return element.id == meData.value?.streetID;
        });
      }
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      refreshing.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getMeData();
  };

  /**
   * Handle address button clicked
   */
  const handleAddressClick = () => {
    if (!refreshing.value) {
      showAddressPopup.value = true;
    }
  };

  /**
   * Handle weixin button clicked
   */
  const handleWeixinClick = () => {
    if (!refreshing.value) {
      showWeixinPopup.value = true;
    }
  };

  /**
   * Handle QQ button clicked
   */
  const handleQQClick = () => {
    if (!refreshing.value) {
      showQQPopup.value = true;
    }
  };

  /**
   * Handle gender button clicked
   */
  const handleGenderClick = () => {
    if (!refreshing.value) {
      showGenderPopup.value = true;
    }
  };

  /**
   * Handle birthday button clicked
   */
  const handleBirthdayClick = () => {
    if (refreshing.value) {
      return;
    }
    if (meData.value.birthday == undefined || meData.value.birthday.length == 0) {
      showBirthdayPopup.value = true;
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMeData();
  });
</script>

<style scoped lang="scss">
  .bg-personal {
    background-color: #f5f5f5;
  }
</style>
