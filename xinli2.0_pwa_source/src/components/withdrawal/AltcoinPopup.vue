<template lang="pug">
//- 銀行卡選擇彈窗
Popup.min-h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("withdrawal_altcoinAddressPlaceholder")')
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

    //- 銀行卡列表
    AltcoinList(@clickItem='handleItemClick')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { Popup } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AltcoinList from '@/components/withdrawal-management/AltcoinList.vue';
  import type { USDTItem } from '@/api/member/model/member-model';

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
     * Click item
     */
    (e: 'clickItem', item?: USDTItem): void;
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
   * Handle item clicked
   */
  const handleItemClick = (item?: USDTItem) => {
    emit('clickItem', item);
  };
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }
</style>
