<template lang="pug">
//- 注單詳細導覽欄
.flex.flex-col.items-stretch.bg-white
  //- 導覽欄
  BasicNav
    //- 左側
    template(#left)
      .flex.flex-row.items-center
        BackButton
        .headline3.text-primary.pl-2 {{ name }}

    //- 右側
    template(#right)
      //- 時間
      BasicButton(bg='white20', size='small', rounded='full', @click='handleTimeClick')
        .flex.flex-row.items-center
          .body2.text-primary {{ time?.name || "-" }}
          img.w-2.h-2.ml-2(:src='IconTriangleDownPrimary')

  //- 結算狀態
  .grid.grid-cols-2.p-1.bg-settle.rounded-md.mt-2.mx-4
    //- 已結算
    BasicButton(:bg='settle != 2 ? "#ffffff" : undefined', size='medium', rounded='md', @click='handleSettledClick')
      .subtitle2.text-primary(:class='settle != 2 ? "opacity-100" : "opacity-60"') {{ t("bet_settled") }}

    //- 未結算
    BasicButton(:bg='settle == 2 ? "#ffffff" : undefined', size='small', rounded='md', @click='handleUnsettleClick')
      .subtitle2.text-primary(:class='settle == 2 ? "opacity-100" : "opacity-60"') {{ t("bet_unsettle") }}

  //- 統計資訊
  .flex.flex-row.items-center.justify-center.mt-2.p-2.bg-primary
    //- 總筆數
    .body3.text-white.opacity-70 {{ t("bet_totalCount") }}
    .body2.text-white.ml-1 {{ totalCount }}

    //- 總投注
    .body3.text-white.opacity-70.ml-4 {{ t("bet_totalBet") }}
    .body2.text-white.ml-1 {{ commaFormat(totalBet) }}

    //- 總輸贏
    .body3.text-white.opacity-70.ml-4 {{ t("bet_totalBalance") }}
    .body2.text-white.ml-1 {{ commaFormat(totalBalance) }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmit, ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { staticImgUrl, commaFormat } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const IconTriangleDownPrimary = staticImgUrl('icon-triangle-down-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Selected time
     */
    time?: { id: number; name: string };

    /**
     * Selected settle
     */
    settle?: number;

    /**
     * Total count
     */
    totalCount?: number;

    /**
     * Total bet
     */
    totalBet?: number;

    /**
     * Total balance
     */
    totalBalance?: number;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click time button
     */
    (e: 'clickTime'): void;

    /**
     * Update selected settle
     */
    (e: 'update:settle', settle: number): void;
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
   * Vue router
   */
  const route = useRoute();

  /**
   * Name
   */
  const name = computed(() => {
    return route.params['id'] || '';
  });

  /**
   * Handle time button clicked
   */
  const handleTimeClick = () => {
    emit('clickTime');
  };

  /**
   * Handle settled button clicked
   */
  const handleSettledClick = () => {
    emit('update:settle', 1);
  };

  /**
   * Handle unsettle button clicked
   */
  const handleUnsettleClick = () => {
    emit('update:settle', 2);
  };
</script>

<style>
  .bg-settle {
    background: rgba(7, 31, 68, 0.03);
  }
</style>
