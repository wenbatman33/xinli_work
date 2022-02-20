<template lang="pug">
//- 結算資訊彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .flex.flex-col.items-stretch
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("bet_earlierSettleDetail")')
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 頁面內容
    .flex.flex-col.items-stretch.px-6.pb-12
      //- 首行
      .grid.grid-cols-value.items-center.mt-2
        //- 日期
        .body3.text-primary.opacity-40 {{ item?.betTime }}

        //- 類型
        .body3.text-primary.opacity-40
          span(v-if='preSettleAmount == item?.winAmount') {{ t("bet_earlierSettleAll") }}
          span(v-else) {{ t("bet_earlierSettlePart") }}

      //- 結算投注額
      .grid.grid-cols-value.items-center.mt-4
        .body3.text-primary.opacity-60 {{ t("bet_earlierSettleBet") }}
        .subtitle1.text-primary {{ commaFormat(preSettleAmount) }}

      //- 輸贏
      .grid.grid-cols-value.items-center.mt-2
        .body3.text-primary.opacity-60 {{ t("bet_earlierSettleBalance") }}
        .subtitle1.text-primary {{ commaFormat(item?.winAmount) }}

      //- 派發獎金
      .grid.grid-cols-value.items-center.mt-2
        .body3.text-primary.opacity-60 {{ t("bet_earlierSettleReward") }}
        .subtitle1.text-primary {{ commaFormat(preSettlementAmount) }}

      //- 剩餘投注額
      .grid.grid-cols-value.items-center.mt-2
        .body3.text-primary.opacity-60 {{ t("bet_earlierSettleRemain") }}
        .subtitle1.text-primary {{ commaFormat(preSettleBalance) }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';
  import { Popup } from 'vant';
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
  const preSettleAmount = computed(() => {
    if (props.item) {
      if ('preSettleAmount' in props.item) {
        return props.item.preSettleAmount || 0;
      }
    }
    return 0;
  });

  /**
   * Pre settlement amount
   */
  const preSettlementAmount = computed(() => {
    if (props.item) {
      if ('preSettlementAmount' in props.item) {
        return props.item.preSettlementAmount || 0;
      }
    }
    return 0;
  });

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
</script>

<style scoped lang="scss">
  .grid-cols-value {
    grid-template-columns: 1fr auto;
  }
</style>
