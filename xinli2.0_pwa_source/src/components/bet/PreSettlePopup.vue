<template lang="pug">
//- 提前結算彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .flex.flex-col.items-stretch
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("bet_earlierSettle")')
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 頁面內容
    .flex.flex-col.items-stretch.px-6
      //- 投注額標題
      .body2.text-primary.opacity-40.mt-2(v-if='preSettleAll') {{ t("bet_earlierSettleBet") }}

      //- 選擇投注額標題
      .body2.text-primary.opacity-40.mt-2(v-else) {{ t("bet_earlierSettleBetHint") }}

      //- 投注額
      .headline2.text-primary {{ commaFormat(preSettleBalance) }}

      //- 選擇投注額滑塊
      Slider.mt-8(v-if='!preSettleAll', v-model='preSettleAmount', :min='0', :max='preSettleBalance', buttonSize='80px', :step='0.01', active-color='#000000')
        template(#button)
          .flex.flex-col.items-center
            .bg-all.px-2.rounded-full
              .body3.text-primary.opacity-40.whitespace-nowrap.overflow-hidden.overflow-ellipsis
                span(v-if='preSettleAmount == preSettleBalance') {{ t("common_all") }}
                span(v-else) {{ t("common_part") }}
            .w-7.h-7.mt-2.bg-white.rounded-full.shadow-slider
            .bg-all.mt-2.px-2.opacity-0
              .body3.text-primary.opacity-40.whitespace-nowrap.overflow-hidden.overflow-ellipsis
                span(v-if='preSettleAmount == preSettleBalance') {{ t("common_all") }}
                span(v-else) {{ t("common_part") }}

      //- 金額標題
      .body2.text-primary.opacity-40.mt-6 {{ t("bet_earlierSettleAmount") }}

      //- 金額
      .headline2.text-accent {{ commaFormat(preSettleAmount) }}

      //- 按鈕
      .grid.grid-cols-2.gap-2.mt-10.pb-12
        //- 取消
        BasicButton(size='large', bg='accent10', textColor='accent', @click='handleCloseClick') 
          .whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ t("common_cancel") }}

        //- 確認
        BasicButton(:loading='postLoading', size='large', bg='accent100', @click='handleConfirmClick') 
          .whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ t("bet_earlierSettleConfirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Slider, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, commaFormat } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { CombinedLogItem } from '@/api/game/model/log-model';

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

    /**
     * Log item
     */
    item?: CombinedLogItem;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update show
     */
    (e: 'update:show', show: boolean): void;
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
   * Pre settle amount
   */
  const preSettleAmount = ref(0);

  /**
   * Post loading
   */
  const postLoading = ref(false);

  /**
   * Pre settle balance
   */
  const preSettleBalance = computed(() => {
    if (props.item) {
      if ('preSettleBalance' in props.item) {
        return props.item.preSettleBalance || 0;
      }
    }
    return 0;
  });

  /**
   * Pre settle all
   */
  const preSettleAll = computed(() => {
    if (props.item) {
      return preSettleBalance.value == props.item.winAmount;
    }
    return false;
  });

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
   * Handle confirm clicked
   */
  const handleConfirmClick = () => {
    // Turn loading on
    postLoading.value = true;

    // Test
    setTimeout(() => {
      // Turn loading off
      postLoading.value = false;

      // Hide popup
      emit('update:show', false);

      // Notify settle success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('bet_earlierSettleSuccess'),
      });
    }, 3000);
  };

  watch(
    () => props.item,
    () => {
      preSettleAmount.value = preSettleBalance.value || 0;
    }
  );
</script>

<style scoped lang="scss">
  .bg-all {
    background: rgba(7, 31, 68, 0.03);
  }

  .shadow-slider {
    box-shadow: 0px 2px 6px rgba(7, 31, 68, 0.1);
  }
</style>
