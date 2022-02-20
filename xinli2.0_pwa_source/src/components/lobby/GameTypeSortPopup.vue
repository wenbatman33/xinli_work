<template lang="pug">
//- 分類排序彈窗
Popup.overflow-x-hidden(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .flex.flex-col.items-stretch.pb-4
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("lobby_sort")')
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 分類排序列表
    GameTypeSortList(:gameTypeList='gameTypeList', @update:gameTypeList='handleUpdateGameTypeList')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { Popup } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import GameTypeSortList from '@/components/lobby/GameTypeSortList.vue';
  import type { GameType } from '@/api/game/model/game-group-model';

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
     * Game type list
     */
    gameTypeList?: GameType[];
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
     * Update game type list
     */
    (e: 'update:gameTypeList', gameTypeList: GameType[]): void;
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
   * Handle update game type list
   */
  const handleUpdateGameTypeList = (gameTypeList: GameType[]) => {
    emit('update:gameTypeList', gameTypeList);
  };
</script>
