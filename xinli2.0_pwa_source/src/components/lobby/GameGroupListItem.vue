<template lang="pug">
//- 廠商列表物件
.flex.flex-row.items-center.justify-center
  //- 物件按鈕
  BasicButton(rounded='md', @click='handleGameClick')
    //- 圖片
    img.object-contain.w-30.h-48.rounded-md(:src='src', @error='errorImg($event, iconErrorImgGameGroup)')

    //- 讀取中
    .absolute.top-0.bottom-0.left-0.right-0.bg-black.opacity-40.rounded-md.flex.items-center.justify-center(v-if='getGameUrlLoading')
      //- 讀取動畫
      Loading(type='spinner')

  //- 遊戲彈窗
  GamePopup(v-model:show='showGamePopup', :gameUrl='gameUrl', :gameName='gameName')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { imgUrl, errorImg, authorized, staticImgUrl, showLoginDialog } from '@/utils';
  import { getGameLogin } from '@/api/game/game';
  import BasicButton from '@/components/button/BasicButton.vue';
  import GamePopup from '@/components/lobby/GamePopup.vue';
  import type { GameGroupItem, GameType } from '@/api/game/model/game-group-model';

  /**
   * Static icons
   */
  const iconErrorImgGameGroup = staticImgUrl('icon-error-img-game-group.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Game group item
     */
    item?: GameGroupItem;

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
   * Vue router
   */
  const router = useRouter();

  /**
   * Get game url api loading status
   */
  const getGameUrlLoading = ref(false);

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
   * Image source
   */
  const src = computed(() => {
    return imgUrl(props.item?.imageH5);
  });

  /**
   * Handle game list item clicked
   */
  const handleGameClick = async () => {
    if (getGameUrlLoading.value) {
      // Skip if getting game url
    } else if (!authorized()) {
      // Login required
      showLoginDialog();
    } else if (props.item?.openWay == 1) {
      // 1: 遊戲列表
      emit('showGameGroupPopup', props.item);
    } else if (props.item?.openWay == 2) {
      // 2: 遊戲大廳
      try {
        // Turn loading on
        getGameUrlLoading.value = true;

        // Get game url
        const id = props.item?.openGameListIDs?.[0]?.id;
        const response = await getGameLogin({
          gameListID: String(id),
        });

        // Show game popup
        gameUrl.value = response?.data?.data?.url || '';
        gameName.value = props.item?.displayName || '';
        showGamePopup.value = true;
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn loading off
        getGameUrlLoading.value = false;
      }
    } else if (props.item?.openWay == 3) {
      // 3: 大廳列表
      emit('showGameLobbyPopup', props.item);
    }
  };
</script>
