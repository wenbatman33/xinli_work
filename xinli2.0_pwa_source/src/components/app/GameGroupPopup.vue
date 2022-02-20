<template lang="pug">
//- 遊戲集結頁彈窗
Popup.min-h-full.bg-background(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .min-h-full.flex.flex-col.justify-items-stretch.items-stretch
    //- 導覽欄
    BasicNav
      //- 左側
      template(#left)
        //- 左側內容
        .flex.flex-row.items-center
          //- 關閉
          BasicButton(rounded='full', @click='handleCloseClick')
            //- 關閉圖示
            img.p-2(:src='iconClosePrimary')

          //- 標題
          .headline3.text-primary.ml-2 {{ title }}

      //- 右側
      template(#right)
        //- 右側內容
        .flex.flex-row.items-center
          //- 充值
          BasicButton.mr-2(bg='primary5', textColor='primary', size='small', rounded='full', @click='handleRechargeClick') {{ t("game_recharge") }}

          //- 選單
          BasicButton(rounded='full', @click='handleMenuClick')
            //- 關閉圖示
            img.p-2(:src='iconMenuPrimary')

    //- 下拉刷新
    PullRefresh.flex-grow(v-model='refreshing', @refresh='handleRefresh')
      //- 遊戲集結頁內容
      .flex.flex-col.items-stretch
        //- 熱門遊戲標題
        .mt-6.px-4.subtitle1.text-primary.opacity-40(v-if='!hotGameEmpty') {{ t("game_hot") }}

        //- 熱門遊戲
        Swiper.w-full(v-if='!hotGameEmpty', :width='280', :centeredSlides='true', @swiper='handleSwiper')
          SwiperSlide(v-for='item in hotGameList')
            .w-full.flex.flex-col.items-stretch.px-4
              //- 遊戲內容
              .grid.grid-cols-game-item.gap-3.items-center
                //- 遊戲圖示
                BasicButton(rounded='md', @click='handleGameClick(item)')
                  img.w-16.h-16.object-cover.rounded-md(:src='imgUrl(item.imageH5)', @error='errorImg')
                  //- 讀取中
                  .absolute.top-0.bottom-0.left-0.right-0.bg-black.opacity-40.rounded-md.flex.items-center.justify-center(v-if='getGameUrlId && getGameUrlId == item.id')
                    //- 讀取動畫
                    Loading(type='spinner')

                //- 遊戲名稱
                BasicButton.self-stretch(content='stretch', rounded='md', @click='handleGameClick(item)')
                  .body1.text-primary.text-left {{ item.displayName || "-" }}

                //- 收藏中
                Loading.w-8.h-8(v-if='postLikeId && postLikeId == item.id', type='spinner')

                //- 收藏
                BasicButton(v-else, rounded='full', @click='handleLikeClick(item)')
                  img.w-7.h-7.p-1(:src='item.isFavorite ? iconFavoriteActive : iconFavoriteStroke')

              //- 遊戲截圖
              BasicButton(content='stretch', rounded='md', @click='handleGameClick(item)')
                img.w-full.h-24.object-cover.rounded-md(:src='imgUrl(item.imageH5)', @error='errorImg')

        //- 近期遊玩標題
        .mt-6.px-4.subtitle1.text-primary.opacity-40(v-if='!playedGameEmpty') {{ t("game_recent") }}

        //- 近期遊玩列表
        .flex.flex-row.flex-nowrap.items-center.overflow-x-auto.mt-2(v-if='!playedGameEmpty')
          BasicButton.flex-shrink-0.mr-3(v-for='(item, index) in playedGameList', :class='index == 0 ? "ml-4" : index == 19 ? "mr-4" : ""', rounded='md', @click='handleGameClick(item)')
            img.w-16.h-16.object-cover.rounded-md(:src='imgUrl(item.imageH5)', @error='errorImg')
            .absolute.top-0.bottom-0.left-0.right-0.bg-black.opacity-40.rounded-md.flex.items-center.justify-center(v-if='getGameUrlId && getGameUrlId == item.id')
              Loading(type='spinner')

        //- 所有收藏列表空白且未登入
        .flex.flex-col.items-center.mt-20(v-if='showFavoriteGroup && !authorized()')
          //- 空白圖示
          img.w-18.h-18(:src='iconEmptyFavorite')

          //- 空白標題
          .mt-6.paragraph1.text-primary.opacity-60 {{ t("game_favoriteUnauthorized") }}

          //- 登入按鈕
          BasicButton.mt-6(bg='accent100', size='medium', @click='handleLoginClick') {{ t("common_login") }}

        //- 所有收藏列表空白
        .flex.flex-col.items-center.mt-20(v-else-if='showFavoriteGroup && gameEmpty')
          //- 空白圖示
          img.w-18.h-18(:src='iconEmptyFavorite')

          //- 空白標題
          .mt-6.paragraph1.text-primary.opacity-60 {{ t("game_favoriteEmpty") }}

        //- 所有遊戲列表空白
        .flex.flex-col.items-center.mt-20(v-else-if='gameEmpty')
          //- 空白圖示
          img.w-18.h-18(:src='iconEmptyFavorite')

          //- 空白標題
          .mt-6.paragraph1.text-primary.opacity-60 {{ t("game_empty") }}

        //- 所有遊戲標題
        .mt-6.px-4.subtitle1.text-primary.opacity-40(v-else) {{ allGameTitle }}

        //- 所有遊戲列表
        .flex.flex-col.items-stretch.pt-2.px-4(v-for='item in gameList')
          //- 所有遊戲物件
          .grid.grid-cols-game-item.gap-3.items-center
            //- 遊戲圖示
            BasicButton(rounded='md', @click='handleGameClick(item)')
              //- 圖示
              img.w-16.h-16.object-cover.rounded-md(:src='imgUrl(item.imageH5)', @error='errorImg')

              //- 讀取中
              .absolute.top-0.bottom-0.left-0.right-0.bg-black.opacity-40.rounded-md.flex.items-center.justify-center(v-if='getGameUrlId == item.id')
                //- 讀取動畫
                Loading(type='spinner')

            //- 遊戲名稱
            BasicButton.self-stretch(content='stretch', rounded='md', @click='handleGameClick(item)')
              .body1.text-primary.text-left {{ item.displayName || "-" }}

            //- 維護中
            .subtitle1.text-systemError(v-if='item.status == 1') {{ t("game_maintenance") }}

            //- 收藏中
            Loading.w-8.h-8(v-else-if='postLikeId && postLikeId == item.id', type='spinner')

            //- 收藏
            BasicButton(v-else, rounded='full', @click='handleLikeClick(item)')
              img.w-7.h-7.p-1(:src='item.isFavorite ? iconFavoriteActive : iconFavoriteStroke')

          //- 分隔線
          .h-px.bg-primary.opacity-10.mt-2

  //- 選單彈窗
  GameGroupMenuPopup(
    v-model:show='showMenuPopup',
    :gameType='targetGameType',
    @clickFavorite='handleFavoriteGroupClick',
    @showGameGroupPopup='handleShowGameGroupPopup',
    @showGameLobbyPopup='handleShowGameLobbyPopup'
  )

  //- 遊戲彈窗
  GamePopup(v-model:show='showGamePopup', :gameUrl='gameUrl', :gameName='gameName')

  //- 遊戲大廳列表彈窗
  GameLobbyPopup(v-model:show='showLobbyPopup', :gameGroup='selectedGameGroupForLobbyPopup')
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { Popup, PullRefresh, Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useAppStore } from '@/store/app-store';
  import { staticImgUrl, imgUrl, errorImg, authorized, showLoginDialog } from '@/utils';
  import { getGameLogin } from '@/api/game/game';
  import { getGameGroupLobby } from '@/api/game/game-group';
  import { getByGroupId, getFavoriteGame, getHotGame, getPlayedGame, postLike, deleteUnlike } from '@/api/game/game-list';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import GamePopup from '@/components/lobby/GamePopup.vue';
  import GameLobbyPopup from '@/components/lobby/GameLobbyPopup.vue';
  import GameGroupMenuPopup from '@/components/lobby/GameGroupMenuPopup.vue';
  import type { GameItem } from '@/api/game/model/game-list-model';
  import type { Swiper as SwiperClass } from 'swiper/types';
  import type { GameGroupItem, GameType } from '@/api/game/model/game-group-model';
  import 'swiper/css';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconMenuPrimary = staticImgUrl('icon-menu-primary.svg');
  const iconFavoriteActive = staticImgUrl('icon-favorite-active.svg');
  const iconFavoriteStroke = staticImgUrl('icon-favorite-stroke.svg');
  const iconEmptyFavorite = staticImgUrl('icon-empty-favorite.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * App store
   */
  const appStore = useAppStore();

  /**
   * Swiper instance reference
   */
  const swiper = ref<SwiperClass>();

  /**
   * Game type list loading
   */
  const gameTypeListLoading = ref(false);

  /**
   * Get hot game loading status
   */
  const getHotGameLoading = ref(false);

  /**
   * Get played game loading status
   */
  const getPlayedGameLoading = ref(false);

  /**
   * Get game list loading status
   */
  const getGameListLoading = ref(false);

  /**
   * Show menu popup
   */
  const showMenuPopup = ref(false);

  /**
   * Show favorite group
   */
  const showFavoriteGroup = ref(false);

  /**
   * Show lobby popup
   */
  const showLobbyPopup = ref(false);

  /**
   * Selected game group from menu
   */
  const selectedGameGroup = ref<GameGroupItem | undefined>(undefined);

  /**
   * Selected game group for lobby popup
   */
  const selectedGameGroupForLobbyPopup = ref<GameGroupItem | undefined>(undefined);

  /**
   * Game type list
   */
  const gameTypeList = ref<GameType[]>([]);

  /**
   * Hot game list
   */
  const hotGameList = ref<GameItem[]>([]);

  /**
   * Played game list
   */
  const playedGameList = ref<GameItem[]>([]);

  /**
   * Game list
   */
  const gameList = ref<GameItem[]>([]);

  /**
   * Get game url id
   */
  const getGameUrlId = ref<number | undefined>(undefined);

  /**
   * Post like id
   */
  const postLikeId = ref<number | undefined>(undefined);

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
   * Show popup
   */
  const show = computed(() => {
    return appStore.gameGroupPopupVisible;
  });

  /**
   * Refreshing status
   */
  const refreshing = computed(() => {
    return gameTypeListLoading.value || getHotGameLoading.value || getPlayedGameLoading.value || getGameListLoading.value;
  });

  /**
   * Target game type
   */
  const targetGameType = computed(() => {
    return (gameTypeList.value || []).find((gameType) => {
      const index = (gameType.gameGroupList || []).findIndex((gameGroup) => {
        return gameGroup.id == appStore.getGameGroupPopupId;
      });
      if (index >= 0) {
        return true;
      } else {
        return false;
      }
    });
  });

  /**
   * Target game group
   */
  const targetGameGroup = computed(() => {
    if (selectedGameGroup.value !== undefined) {
      return selectedGameGroup.value;
    } else {
      return (targetGameType.value?.gameGroupList || []).find((gameGroup) => {
        return gameGroup.id == appStore.getGameGroupPopupId;
      });
    }
  });

  /**
   * Title
   */
  const title = computed(() => {
    if (showFavoriteGroup.value) {
      return t('game_favorite');
    } else {
      return targetGameGroup.value?.displayName;
    }
  });

  /**
   * All game Title
   */
  const allGameTitle = computed(() => {
    if (showFavoriteGroup.value) {
      return t('game_favorite');
    } else {
      return t('game_all');
    }
  });

  /**
   * Hot game
   */
  const hotGameEmpty = computed(() => {
    return hotGameList.value.length == 0;
  });

  /**
   * Played game
   */
  const playedGameEmpty = computed(() => {
    return playedGameList.value.length == 0;
  });

  /**
   * Hot game
   */
  const gameEmpty = computed(() => {
    return gameList.value.length == 0;
  });

  /**
   * Get game type list
   */
  const getGameTypeList = async () => {
    try {
      // Turn loading on
      gameTypeListLoading.value = true;

      // Get game type list
      const response = await getGameGroupLobby();

      // Update game type list
      gameTypeList.value = response?.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      gameTypeListLoading.value = false;
    }
  };

  /**
   * Get game list
   */
  const getGameList = () => {
    // Clear data
    hotGameList.value = [];
    playedGameList.value = [];
    gameList.value = [];

    // Retrieve parameters
    const gameTypeID = targetGameType.value?.id;
    const gameGroupID = targetGameGroup.value?.id;

    // Get hot game list
    if (!showFavoriteGroup.value) {
      getHotGameLoading.value = true;
      getHotGame({ gameGroupID: gameGroupID })
        .then((response) => {
          const list = response?.data?.data?.list || [];
          if (list.length > 0) {
            hotGameList.value = list[0].gameList || list[0].gLists || [];
          }
          getHotGameLoading.value = false;
        })
        .catch(() => {
          // Exception handled by interceptor
        })
        .finally(() => {
          getHotGameLoading.value = false;
        });
    }

    // Get played game list
    if (authorized()) {
      getPlayedGameLoading.value = true;
      getPlayedGame({ gameGroupID: gameGroupID })
        .then((response) => {
          const gameGroupList = response?.data?.data?.list || [];
          playedGameList.value = gameGroupList.map((element) => element.gameList || {});
          getPlayedGameLoading.value = false;
        })
        .catch(() => {
          // Exception handled by interceptor
        })
        .finally(() => {
          getPlayedGameLoading.value = false;
        });
    }

    // Get game list
    if (showFavoriteGroup.value) {
      if (authorized()) {
        // Favorite game list
        getGameListLoading.value = true;
        getFavoriteGame({ gameTypeID: gameTypeID })
          .then((response) => {
            gameList.value = response.data?.data?.list || [];
            getGameListLoading.value = false;
          })
          .catch(() => {
            // Exception handled by interceptor
          })
          .finally(() => {
            getGameListLoading.value = false;
          });
      }
    } else {
      // Game group game list
      getGameListLoading.value = true;
      getByGroupId({ gameGroupID: gameGroupID })
        .then((response) => {
          gameList.value = response.data?.data?.list || [];
          getGameListLoading.value = false;
        })
        .catch(() => {
          // Exception handled by interceptor
        })
        .finally(() => {
          getGameListLoading.value = false;
        });
    }
  };

  /**
   * Handle swiper initialized
   */
  const handleSwiper = (swiperInstance: SwiperClass) => {
    swiper.value = swiperInstance;
  };

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    if (!show) {
      appStore.hideGameGroupPopup();
    }
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    appStore.hideGameGroupPopup();
  };

  /**
   * Handle recharge button clicked
   */
  const handleRechargeClick = () => {};

  /**
   * Handle menu button clicked
   */
  const handleMenuClick = () => {
    showMenuPopup.value = true;
  };

  /**
   * Handle favorite group button clicked
   */
  const handleFavoriteGroupClick = () => {
    showFavoriteGroup.value = true;
    selectedGameGroup.value = undefined;
    getGameList();
  };

  /**
   * Handle show game group popup
   */
  const handleShowGameGroupPopup = (item?: GameGroupItem) => {
    showMenuPopup.value = false;
    showFavoriteGroup.value = false;
    selectedGameGroup.value = item;
    getGameList();
  };

  /**
   * Handle show game lobby popup
   */
  const handleShowGameLobbyPopup = (item?: GameGroupItem) => {
    selectedGameGroupForLobbyPopup.value = item;
    showLobbyPopup.value = true;
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getGameList();
  };

  /**
   * Handle login button clicked
   */
  const handleLoginClick = () => {
    window.location.href = ENV.VITE_LOGIN_URL || '';
  };

  /**
   * Handle game clicked
   */
  const handleGameClick = async (item: GameItem) => {
    if (getGameUrlId.value) {
      // Skip if getting game url
    } else if (item.status == 1) {
      // Skip if maintenance
    } else if (!authorized()) {
      // Login required
      showLoginDialog();
    } else {
      // Open game
      try {
        // Turn loading on
        getGameUrlId.value = item.id;

        // Get game url
        const response = await getGameLogin({
          gameListID: String(item.id),
        });

        // Show game popup
        gameUrl.value = response?.data?.data?.url || '';
        gameName.value = item.displayName || '';
        showGamePopup.value = true;
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn loading off
        getGameUrlId.value = undefined;
      }
    }
  };

  /**
   * Handle like button clicked
   */
  const handleLikeClick = async (item: GameItem) => {
    if (!authorized()) {
      showLoginDialog();
      return;
    }
    try {
      // Turn on loading status
      postLikeId.value = item?.id;

      // Post like or dislike
      if (item.isFavorite == true) {
        await deleteUnlike({
          gameListID: item?.id,
        });
      } else {
        await postLike({
          gameListID: item?.id,
        });
      }

      // Update favoirte status
      item.isFavorite = item.isFavorite != true;
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      postLikeId.value = undefined;
    }
  };

  /**
   * Watch show status changed
   */
  watch(
    () => [show.value],
    async (show) => {
      if (show) {
        showFavoriteGroup.value = false;
        hotGameList.value = [];
        playedGameList.value = [];
        gameList.value = [];
        await getGameTypeList();
        await getGameList();
      }
    }
  );
</script>

<style scoped lang="scss">
  .grid-cols-game-item {
    grid-template-columns: auto 1fr auto;
  }
</style>
