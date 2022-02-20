<template lang="pug">
//- 遊戲錢包彈窗
Popup.h-full.bg-background(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.flex.flex-col.items-stretch.justify-stretch.pb-12
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("profile_gameWallet")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

      //- 右側
      template(#right)
        //- 刷新
        .p-2(v-if='getWalletTypeListLoading')
          Loading(type='spinner', size='16px')
        BasicButton(v-else, rounded='full', @click='handleRefreshClick')
          //- 關閉圖示
          img.p-2(:src='iconRefreshPrimary')

    //- 遊戲列表
    .mt-4.px-8.grid.grid-cols-2.gap-1.items-stretch.pb-12
      //- 遊戲物件
      .flex.flex-col.items-center.bg-balance.p-4(v-for='item in walletTypeList')
        //- 名稱
        .subtitle2.text-primary {{ item.displayName }}

        //- 讀取中
        .p-2(v-if='item.loading')
          Loading(type='spinner', size='16px')

        //- 金額
        .body2.text-primary.opacity-40(v-else) {{ commaFormat(item.money) }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, PullRefresh } from 'vant';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, commaFormat } from '@/utils';
  import { getBalanceSingle } from '@/api/game/balance';
  import { getGameGroupWalletType } from '@/api/game/game-group';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { BalanceItem } from '@/api/game/model/balance-model';
  import type { WalletTypeItem } from '@/api/game/model/game-group-model';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconRefreshPrimary = staticImgUrl('icon-refresh-primary.svg');

  /**
   * Loading wallet type item
   */
  interface LoadingWalletTypeItem extends WalletTypeItem {
    money?: number;
    loading?: boolean;
  }

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
     * Refresh balance
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
   * Get wallet type list loading status
   */
  const getWalletTypeListLoading = ref(false);

  /**
   * Wallet type list
   */
  const walletTypeList = ref<LoadingWalletTypeItem[]>([]);

  /**
   * Get wallet type list
   */
  const getWalletTypeList = async () => {
    try {
      // Turn on loading status
      getWalletTypeListLoading.value = true;

      // Get wallet type list
      const response = await getGameGroupWalletType();

      // Update wallet type list
      const list = response?.data?.data?.list || [];
      walletTypeList.value = list.map((element) => {
        return {
          ...element,
          money: 0,
          loading: true,
        };
      });

      // Get single balance
      walletTypeList.value.forEach((element) => {
        getBalanceSingle({ id: element.id })
          .then((response) => {
            element.money = response.data?.data?.moeny || 0;
          })
          .finally(() => {
            element.loading = false;
          });
      });
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getWalletTypeListLoading.value = false;
    }
  };

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    emit('update:show', false);
  };

  /**
   * Handle refresh button clicked
   */
  const handleRefreshClick = () => {
    getWalletTypeList();
    emit('refresh');
  };

  /**
   * Watch show prop changed
   */
  watch(
    () => props.show,
    (show) => {
      if (show) {
        getWalletTypeList();
      }
    }
  );
</script>

<style scoped lang="scss">
  .bg-balance {
    background: rgba(7, 31, 68, 0.03);
    border-radius: 4px;
  }
</style>
