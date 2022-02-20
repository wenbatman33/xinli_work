<template lang="pug">
//- 大廳頁面
.flex.flex-col.items-stretch.pb-6.bg-home(:style='bg')
  //- 頁首
  .relative.flex.flex-col.items-stretch
    //- 頁首背景
    .absolute.z-10.left-0.top-0.right-0.bottom-8
      svg.w-full.h-full(viewBox='0 0 414 258', preserveAspectRatio='none')
        path(d='M0 0H414V237C414 237 387.5 258 207 258C26.5 258 0 237 0 237V0Z', fill='#505263')

    //- 導覽欄(realtive)
    Nav.relative.z-0.opacity-0(:disabledEffect='true', :gameTypeList='gameTypeList')

    //- 廣告輪播
    BannerList.relative.z-20

  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0(v-model:gameTypeList='gameTypeList', :gameType='gameType', :gameTypeListLoading='gameTypeListLoading', @update:gameType='handleUpdateGameType')

  //- 公告
  .mt-2.px-2.flex.flex-col.items-stretch
    AnnouncementList

  //- 廠商列表
  .mt-4.flex.flex-col.items-stretch
    Swiper.w-full(:autoHeight='true', @swiper='handleSwiper', @slideChange='handlGameGroupSlideChange')
      SwiperSlide.px-4(v-for='gameType in gameTypeList')
        GameGroupList(:list='gameType.gameGroupList || []', :gameType='gameType')

  //- 主題專區
  .mt-4.px-4.flex.flex-col.items-stretch
    ThemeBanner

  //- 產品下載
  .mt-4.px-4.flex.flex-col.items-stretch
    DownloadBanner

  //- 標籤列(relative)
  BasicTabBar.opacity-0(:fixed='false')

  //- 標籤列(fixed)
  BasicTabBar(:fixed='true')
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { getGameGroupLobby } from '@/api/game/game-group';
  import { staticImgUrl, authorized } from '@/utils';
  import Nav from '@/components/lobby/Nav.vue';
  import BannerList from '@/components/lobby/BannerList.vue';
  import ThemeBanner from '@/components/lobby/ThemeBanner.vue';
  import BasicTabBar from '@/components/tab-bar/BasicTabBar.vue';
  import GameGroupList from '@/components/lobby/GameGroupList.vue';
  import DownloadBanner from '@/components/lobby/DownloadBanner.vue';
  import AnnouncementList from '@/components/lobby/AnnouncementList.vue';
  import type { Swiper as SwiperClass } from 'swiper/types';
  import type { CategoryItem } from '@/components/category/BasicCategory.vue';
  import type { GameType, GameGroupItem } from '@/api/game/model/game-group-model';

  /**
   * Static icons
   */
  const backgroundHome = staticImgUrl('background-home.png');
  const aTempSport = staticImgUrl('a-temp-sport.png');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Game type list loading
   */
  const gameTypeListLoading = ref(false);

  /**
   * App download banner loading
   */
  const appDownloadBannerLoading = ref(false);

  /**
   * Swiper instance reference
   */
  const swiper = ref<SwiperClass>();

  /**
   * Game type list
   */
  const gameTypeList = ref<GameType[]>([]);

  /**
   * Selected game type
   */
  const gameType = ref<GameType>({});

  /**
   * Background
   */
  const bg = computed(() => {
    return {
      backgroundImage: `url(${backgroundHome})`,
    };
  });

  /**
   * Game group list
   */
  const gameGroupList = computed<GameGroupItem[]>(() => {
    return gameType.value?.gameGroupList || [];
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

      // Update selected game type
      gameType.value = gameTypeList.value[0] || {};
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      gameTypeListLoading.value = false;
    }
  };

  /**
   * Handle swiper initialized
   */
  const handleSwiper = (swiperInstance: SwiperClass) => {
    swiper.value = swiperInstance;
  };

  /**
   * Handle update game type
   */
  const handleUpdateGameType = (selected: GameType) => {
    gameType.value = selected;
    swiper.value?.slideTo(gameTypeList.value.findIndex((element) => element.id == selected.id));
  };

  /**
   * Handle game group swiper slide index changed
   */
  const handlGameGroupSlideChange = (swiper: SwiperClass) => {
    gameType.value = gameTypeList.value[swiper.realIndex];
  };

  /**
   * 
   */
  watch(
    () => [swiper.value, gameTypeList.value],
    () => {
      swiper.value?.slideTo(0);
    }
  );

  /**
   * On component mounted
   */
  onMounted(() => {
    getGameTypeList();
  });
</script>

<style scoped lang="scss">
  .bg-home {
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: top;
    background-size: cover;
  }
</style>
