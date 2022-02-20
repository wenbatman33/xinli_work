<template lang="pug">
//- 虛擬貨幣類型彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .flex.flex-col.items-stretch.pb-20
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 類型列表
    .flex.flex-col.items-stretch(v-for='item in list')
      BasicButton(textColor='primary', content='stretch', @click='handleTypeClick(item)')
        .w-full.px-6.py-4.flex.flex-row.items-center.justify-between
          .subtitle1.text-primary.text-left {{ item.name }}
          img.w-5.h-5(v-if='item.id == selected?.id', :src='iconCheckAccent')
      .h-px.bg-primary.opacity-10
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { Popup } from 'vant';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconCheckAccent = staticImgUrl('icon-check-accent.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;

    /**
     * Type list
     */
    list?: { id: number; name: string }[];

    /**
     * Selected type
     */
    selected?: { id: number; name: string };
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
     * Update selected
     */
    (e: 'update:selected', selected?: { id: number; name: string }): void;
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
   * Handle type clicked
   */
  const handleTypeClick = (item: { id: number; name: string }) => {
    emit('update:selected', item);
    emit('update:show', false);
  };
</script>
