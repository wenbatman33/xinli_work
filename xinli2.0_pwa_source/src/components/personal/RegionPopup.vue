<template lang="pug">
//- 城市彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.flex.flex-col.items-stretch
    //- 導覽欄
    BasicNav(:title='title')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 城市列表
    .flex.flex-col.items-stretch(v-for='item in list')
      BasicButton(textColor='primary', content='stretch', @click='handleRegionClick(item)')
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
  import type { RegionItem } from '@/api/member/model/region-model';

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
     * Title
     */
    title?: string;

    /**
     * Region list
     */
    list?: RegionItem[];

    /**
     * Selected region
     */
    selected?: RegionItem;
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
    (e: 'update:selected', selected?: RegionItem): void;
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
   * Handle region clicked
   */
  const handleRegionClick = (region: RegionItem) => {
    emit('update:selected', region);
    emit('update:show', false);
  };
</script>
