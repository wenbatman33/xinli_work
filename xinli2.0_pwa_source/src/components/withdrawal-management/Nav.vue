<template lang="pug">
//- 提款管理導覽欄
.flex.flex-col.items-stretch.bg-white.pb-4
  //- 導覽欄
  BasicNav.bg-white(:title='t("withdrawalManagement")')
    //- 左側
    template(#left)
      //- 返回
      BackButton

    //- 右側
    template(#right)
      //- 排序
      BasicButton(v-if='type === 2', rounded='full', @click='handleSortClick')
        img.p-2(:src='iconSortPrimary')

  //- 類型
  .grid.grid-cols-2.p-1.bg-type.rounded-md.mt-2.mx-4
    //- 銀行卡
    BasicButton(:bg='type == 1 ? "#ffffff" : undefined', size='medium', rounded='md', @click='handleBankcardTypeClick')
      .subtitle2.text-primary(:class='type == 1 ? "opacity-100" : "opacity-60"') {{ t("withdrawalManagement_bankcard") }}

    //- 虛擬貨幣
    BasicButton(:bg='type == 2 ? "#ffffff" : undefined', size='small', rounded='md', @click='handleAltcoinTypeClick')
      .subtitle2.text-primary(:class='type == 2 ? "opacity-100" : "opacity-60"') {{ t("withdrawalManagement_altcoin") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmit } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconSortPrimary = staticImgUrl('icon-sort-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Selected type
     */
    type?: number;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click sort button
     */
    (e: 'clickSort'): void;

    /**
     * Update selected type
     */
    (e: 'update:type', settle: number): void;
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
   * Handle sort button clicked
   */
  const handleSortClick = () => {
    emit('clickSort');
  };

  /**
   * Handle bankcard type button clicked
   */
  const handleBankcardTypeClick = () => {
    emit('update:type', 1);
  };

  /**
   * Handle altcoin type button clicked
   */
  const handleAltcoinTypeClick = () => {
    emit('update:type', 2);
  };
</script>

<style>
  .bg-type {
    background: rgba(7, 31, 68, 0.03);
  }
</style>
