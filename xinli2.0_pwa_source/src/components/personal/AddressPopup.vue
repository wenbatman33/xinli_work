<template lang="pug">
//- 通訊地址彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("personal_address")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

      //- 右側
      template(#right)
        //- 客服
        ChatButton

    //- 頁面內容
    .flex.flex-col.items-stretch.overflow-y-auto.px-8
      //- 提示
      .body1.text-primary.opacity-40.mt-8 {{ t("personal_address_remainder") }}

      //- 省份
      DropDownButton.mt-6(:loading='getProvinceListLoading', :titleText='province?.name || t("personal_address_province")', @click='handleProvinceClick')

      //- 城市
      DropDownButton.mt-6(:loading='getCitiesListLoading', :titleText='city?.name || t("personal_address_city")', @click='handleCityClick')

      //- 城區
      DropDownButton.mt-6(:loading='getStateListLoading', :titleText='state?.name || t("personal_address_state")', @click='handleStateClick')

      //- 街道
      DropDownButton.mt-6(:loading='getStreetListLoading', :titleText='street?.name || t("personal_address_street")', @click='handleStreetClick')

      //- 詳細
      BasicField.mt-6(v-model:value='address', :placeholder='t("personal_address_detail")')

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='putDetailLoading', bg='accent100', size='large', @click='handleConfirmClick') {{ t("common_confirm") }}

  //- 省份彈窗
  RegionPopup(v-model:show='showProvincesPopup', :selected='province', :list='provincesList', :title='t("personal_address_provincesPicker")', @update:selected='handleUpdateProvince')

  //- 城市彈窗
  RegionPopup(v-model:show='showCitiesPopup', :selected='city', :list='citiesList', :title='t("personal_address_citiesPicker")', @update:selected='handleUpdateCity')

  //- 區域彈窗
  RegionPopup(v-model:show='showStatePopup', :selected='state', :list='stateList', :title='t("personal_address_statePicker")', @update:selected='handleUpdateState')

  //- 街道彈窗
  RegionPopup(v-model:show='showStreetPopup', :selected='street', :list='streetList', :title='t("personal_address_streetPicker")', @update:selected='handleUpdateStreet')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { getMe, putDetail } from '@/api/member/member';
  import { getProvinces, getCities, getState, getStreet } from '@/api/member/region';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import RegionPopup from '@/components/personal/RegionPopup.vue';
  import DropDownButton from '@/components/button/DropDownButton.vue';
  import type { MeData } from '@/api/member/model/member-model';
  import type { RegionItem } from '@/api/member/model/region-model';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update show
     */
    (e: 'update:show', show: boolean): void;

    /**
     * Refresh personal data
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
   * Get province list loading status
   */
  const getProvinceListLoading = ref(false);

  /**
   * Get cities list loading status
   */
  const getCitiesListLoading = ref(false);

  /**
   * Get state list loading status
   */
  const getStateListLoading = ref(false);

  /**
   * Get street list loading status
   */
  const getStreetListLoading = ref(false);

  /**
   * Show region popup
   */
  const showProvincesPopup = ref(false);

  /**
   * Show city popup
   */
  const showCitiesPopup = ref(false);

  /**
   * Show area popup
   */
  const showStatePopup = ref(false);

  /**
   * Show street popup
   */
  const showStreetPopup = ref(false);

  /**
   * Patch loading status
   */
  const putDetailLoading = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData | undefined>();

  /**
   * Provinces list
   */
  const provincesList = ref<RegionItem[]>([]);

  /**
   * Cities list
   */
  const citiesList = ref<RegionItem[]>([]);

  /**
   * State list
   */
  const stateList = ref<RegionItem[]>([]);

  /**
   * Street list
   */
  const streetList = ref<RegionItem[]>([]);

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
  const address = ref('');

  /**
   * Is getting region
   */
  const isGettingRegion = () => {
    return getProvinceListLoading.value || getCitiesListLoading.value || getStateListLoading.value || getStreetListLoading.value;
  };

  /**
   * Get provinces list
   */
  const getProvincesList = async () => {
    try {
      // Turn on loading status
      getProvinceListLoading.value = true;

      // Get me data
      const meResponse = await getMe();

      // Update me data
      meData.value = meResponse?.data?.data;

      // Update address
      address.value = meData.value?.address || '';

      // Get province list
      const provinceResponse = await getProvinces();

      // Update province list
      provincesList.value = provinceResponse?.data?.data?.list || [];

      // Compute selected province
      const selectedProvince = provincesList.value.find((element) => {
        return element.id == meData.value?.provinceID;
      });

      // If province item found
      if (selectedProvince) {
        // Select province
        await handleUpdateProvince(selectedProvince);

        // Compute selected city
        const selectedCity = citiesList.value.find((element) => {
          return element.id == meData.value?.cityID;
        });

        // If city item found
        if (selectedCity) {
          // Select city
          await handleUpdateCity(selectedCity);

          // Compute selected state
          const selectedState = stateList.value.find((element) => {
            return element.id == meData.value?.stateID;
          });

          // If state item found
          if (selectedState) {
            // Select state
            await handleUpdateState(selectedState);

            // Compute selected street
            const selectedStreet = streetList.value.find((element) => {
              return element.id == meData.value?.streetID;
            });

            // If street item found
            if (selectedStreet) {
              // Select street
              await handleUpdateStreet(selectedStreet);
            }
          }
        }
      }
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getProvinceListLoading.value = false;
    }
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    emit('update:show', false);
  };

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle province button clicked
   */
  const handleProvinceClick = () => {
    if (!isGettingRegion()) {
      showProvincesPopup.value = true;
    }
  };

  /**
   * Handle city button clicked
   */
  const handleCityClick = () => {
    if (!isGettingRegion() && province.value && citiesList.value) {
      showCitiesPopup.value = true;
    }
  };

  /**
   * Handle state button clicked
   */
  const handleStateClick = () => {
    if (!isGettingRegion() && city.value && streetList.value) {
      showStatePopup.value = true;
    }
  };

  /**
   * Handle street button clicked
   */
  const handleStreetClick = () => {
    if (!isGettingRegion() && state.value && streetList.value) {
      showStreetPopup.value = true;
    }
  };

  /**
   * Handle update province
   */
  const handleUpdateProvince = async (selected?: RegionItem) => {
    try {
      // Turn on loading status
      getCitiesListLoading.value = true;

      // Update selected province
      province.value = selected;

      // Clear cities list
      citiesList.value = [];
      stateList.value = [];
      streetList.value = [];
      city.value = undefined;
      state.value = undefined;
      street.value = undefined;

      // Get cities list
      const response = await getCities({
        upid: selected?.id,
      });

      // Update cities list
      citiesList.value = response?.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getCitiesListLoading.value = false;
    }
  };

  /**
   * Handle update city
   */
  const handleUpdateCity = async (selected?: RegionItem) => {
    try {
      // Turn on loading status
      getStateListLoading.value = true;

      // Update selected citiy
      city.value = selected;

      // Clear state list
      stateList.value = [];
      streetList.value = [];
      state.value = undefined;
      street.value = undefined;

      // Get state list
      const response = await getState({
        upid: selected?.id,
      });

      // Update state list
      stateList.value = response?.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getStateListLoading.value = false;
    }
  };

  /**
   * Handle update state
   */
  const handleUpdateState = async (selected?: RegionItem) => {
    try {
      // Turn on loading status
      getStreetListLoading.value = true;

      // Update selected state
      state.value = selected;

      // Clear state list
      streetList.value = [];
      street.value = undefined;

      // Get street list
      const response = await getStreet({
        upid: selected?.id,
      });

      // Update street list
      streetList.value = response?.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getStreetListLoading.value = false;
    }
  };

  /**
   * Handle update street
   */
  const handleUpdateStreet = (selected?: RegionItem) => {
    street.value = selected;
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn refreshing on
      putDetailLoading.value = true;

      // Put detail
      await putDetail({
        provinceID: province.value?.id,
        cityID: city.value?.id,
        stateID: state.value?.id,
        streetID: street.value?.id,
        address: address.value,
      });

      // Notify update success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('common_updateSuccess'),
      });

      // Refresh me data
      emit('refresh');

      // Hide popup
      emit('update:show', false);
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      putDetailLoading.value = false;
    }
  };

  /**
   * On component mounted
   */
  watch(
    () => props.show,
    (show) => {
      if (show) {
        getProvincesList();
      }
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }
</style>
