<template lang="pug">
//- 遊戲大廳列表彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.flex.flex-col.items-stretch.pb-20
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("game_lobby")')
      //- 左側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 大廳列表
    .flex.flex-col.items-stretch(v-for='item in lobbyList')
      //- 大廳物件
      BasicButton(textColor='primary', content='stretch', @click='handleLobbyClick(item)')
        .w-full.px-6.py-4.flex.flex-row.items-center.justify-between
          .subtitle1.text-primary.text-left
            span {{ item.display }}
            span.ml-1 {{ item.info }}
          Loading.w-4.h-4(v-if='item.id == getGameUrlId', type='spinner')

      //- 分隔線
      .h-px.bg-primary.opacity-10

  //- 遊戲彈窗
  GamePopup(v-model:show='showGamePopup', :gameUrl='gameUrl', :gameName='gameName')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Popup, Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { getGameLogin } from '@/api/game/game';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import GamePopup from '@/components/lobby/GamePopup.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { GameGroupItem, GameLobbyItem } from '@/api/game/model/game-group-model';

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
     * Game group item
     */
    gameGroup?: GameGroupItem;
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
   * Get game url id
   */
  const getGameUrlId = ref<number | undefined>(0);

  /**
   * Show game popup
   */
  const showGamePopup = ref(false);

  /**
   * Game url
   */
  const gameUrl = ref<string>();

  /**
   * Game name
   */
  const gameName = ref<string>();

  /**
   * Lobby list
   */
  const lobbyList = computed(() => {
    return props?.gameGroup?.openGameListIDs || [];
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
   * Handle lobby item clicked
   */
  const handleLobbyClick = async (item?: GameLobbyItem) => {
    try {
      // Skip if getting game url
      if (getGameUrlId.value) {
        return;
      }

      // Turn loading on
      getGameUrlId.value = item?.id;

      // Get game url
      const response = await getGameLogin({
        gameListID: String(item?.id),
      });

      // Show game popup
      gameUrl.value = response?.data?.data?.url || '';
      gameName.value = `${props?.gameGroup?.displayName} ${item?.display || ''}`;
      showGamePopup.value = true;
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn loading off
      getGameUrlId.value = undefined;
    }
  };
</script>
