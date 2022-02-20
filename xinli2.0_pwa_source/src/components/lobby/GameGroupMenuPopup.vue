<template lang="pug">
//- 遊戲集結頁選單彈窗
Popup.h-full.bg-background(:show='show', :safeAreaInsetBottom='true', class='w-2/3', teleport='body', position='right', @update:show='handleUpdateShow')
  //- 彈窗內容
  .flex.flex-col.items-stretch.py-6.px-5
    //- 標題
    .headline3.text-primary {{ title }}

    //- 遊戲列表
    .grid.grid-cols-2.items-center.gap-4.mt-4
      //- 我的收藏
      BasicButton(rounded='md', @click='handleFavoriteClick')
        //- 圖片
        img.object-contain.h-auto(:src='iconGameGroupFavorite')

      //- 遊戲物件
      GameGroupListItem(v-for='item in filterList', :item='item', @showGameGroupPopup='handleShowGameGroupPopup', @showGameLobbyPopup='handleShowGameLobbyPopup')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Popup } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import GameGroupListItem from '@/components/lobby/GameGroupListItem.vue';
  import type { GameType, GameGroupItem } from '@/api/game/model/game-group-model';

  /**
   * Static icons
   */
  const iconGameGroupFavorite = staticImgUrl('icon-game-group-favorite.png');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;

    /**
     * Parent game type
     */
    gameType?: GameType;
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
     * Click favorite button
     */
    (e: 'clickFavorite'): void;

    /**
     * Show game group popup
     */
    (e: 'showGameGroupPopup', item?: GameGroupItem): void;

    /**
     * Show game lobby popup
     */
    (e: 'showGameLobbyPopup', item?: GameGroupItem): void;
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
   * Title
   */
  const title = computed(() => {
    return props.gameType?.name || '';
  });

  /**
   * Filter game group list
   */
  const filterList = computed(() => {
    return (
      props.gameType?.gameGroupList?.filter((element) => {
        return element.id && element.id > 0;
      }) || {}
    );
  });

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle favorite button clicked
   */
  const handleFavoriteClick = () => {
    emit('clickFavorite');
    emit('update:show', false);
  };

  /**
   * Handle show game group popup
   */
  const handleShowGameGroupPopup = (item?: GameGroupItem) => {
    emit('showGameGroupPopup', item);
  };

  /**
   * Handle show game lobby popup
   */
  const handleShowGameLobbyPopup = (item?: GameGroupItem) => {
    emit('showGameLobbyPopup', item);
  };
</script>
