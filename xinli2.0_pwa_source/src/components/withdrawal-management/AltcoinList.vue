<template lang="pug">
//- 下拉刷新
PullRefresh.relative.z-10.flex-grow(v-model='getAltcoinListLoading', @refresh='handleRefresh')
  //- 虛擬貨幣提領地址列表
  .flex.flex-col.items-stretch.pb-6
    //- 添加提領地址
    BasicButton.mx-4.mt-4.shadow(content='stretch', bg='white100', rounded='normal', @click='handleAddClick')
      //- 按鈕內容
      .flex.flex-row.items-center.p-4
        //- 添加圖示
        img.w-6.h-6(:src='iconPlusPriamary')

        //- 添加標題
        .subtitle1.text-primary.opacity-60.pl-4 {{ t("withdrawalManagement_altcoinAdd") }}

    //- 虛擬貨幣列表空白
    .flex.flex-col.items-center.mt-20(v-if='altcoinListEmpty')
      img.w-18.h-18(:src='iconEmptyAltcoin')
      .body1.text-primary.opacity-40.mt-8 {{ t("withdrawalManagement_altcoinEmpty") }}

    //- 虛擬貨幣提領地址物件列表
    AltcoinItem(v-for='item in altcoinList', :item='item', @click-item='handleItemClick', @refresh='handleRefresh')

  //- 添加虛擬貨幣提領地址彈窗
  AddAltcoinPopup(v-model:show='showAddAltcoinPopup', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { defineEmits, ref, computed, onMounted } from 'vue';
  import { PullRefresh } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { getUDSTS } from '@/api/member/member';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AltcoinItem from '@/components/withdrawal-management/AltcoinItem.vue';
  import AddAltcoinPopup from '@/components/withdrawal-management/AddAltcoinPopup.vue';
  import type { USDTItem } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconPlusPriamary = staticImgUrl('icon-plus-primary.svg');
  const iconEmptyAltcoin = staticImgUrl('icon-empty-altcoin.svg');

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click item
     */
    (e: 'clickItem', item?: USDTItem): void;
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
   * Get altcoin list loading status
   */
  const getAltcoinListLoading = ref(false);

  /**
   * Show add altcoin popup
   */
  const showAddAltcoinPopup = ref(false);

  /**
   * Altcoin list
   */
  const altcoinList = ref<USDTItem[]>([]);

  /**
   * Altcoin list empty
   */
  const altcoinListEmpty = computed(() => {
    return altcoinList.value.length === 0;
  });

  /**
   * Get altcoin list
   */
  const getAltcoinList = async () => {
    try {
      // Turn refreshing on
      getAltcoinListLoading.value = true;

      // Get altcoin list
      const response = await getUDSTS();

      // Update altcoin list
      altcoinList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      getAltcoinListLoading.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getAltcoinList();
  };

  /**
   * Handle add button clicked
   */
  const handleAddClick = () => {
    showAddAltcoinPopup.value = true;
  };

  /**
   * Handle item clicked
   */
  const handleItemClick = (item?: USDTItem) => {
    emit('clickItem', item);
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getAltcoinList();
  });
</script>
