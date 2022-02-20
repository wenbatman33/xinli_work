<template lang="pug">
//- 等級資訊
.flex.flex-col.items-stretch
  //- 已登入等級卡片
  .px-4.mt-2(v-if='authorized()')
    //- 等級卡片內容
    .flex.flex-col.items-stretch.bg-level.rounded.p-4(:style='bg')
      //- 等級資訊
      .grid.grid-cols-level.items-start.gap-4
        //- 讀取中
        .p-3(v-if='getVipDataLoading')
          Loading(type='spinner', color='#071F44', size='24px')

        //- 圖示
        img.w-14(v-else, :src='levelImgSrc')

        //- 資訊
        .grid.grid-cols-level-info.items-start
          //- 等級
          .score2.text-primary Lv {{ level }}

          //- 詳細
          BasicButton(rounded='normal', @click='handleLevelClick')
            .flex.flex-row.items-center.p-1
              .w-2.h-2.bg-accent.rounded-full.mr-2(v-if='hasGift')
              .body3.text-primary.opacity-60 {{ t("profile_myLevelInfo") }}
              img.w-3.h-3.ml-1(:src='iconArrowRightPrimary40')

          //- 當月流水
          .col-span-2.body2.text-primary.opacity-60 {{ t("profile_monthBalance") }} {{ totalBetAmount }}

      //- 等級進度
      Progress.h-2.mt-4(:percentage='percentage', :show-pivot='false', :color='levelProgressColour', track-color='#FFFFFF')

  //- 未登入註冊卡片
  .px-4.mt-6(v-else)
    //- 註冊卡片內容
    .grid.grid-cols-register.items-center.gap-2.bg-level.rounded.px-4.py-6(:style='bg')
      .flex.flex-col.items-stretch
        //- 標題
        .headline3.text-primary {{ t("profile_registerTitle") }}

        //- 內容
        .body2.text-primary.opacity-60 {{ t("profile_registerContent") }}

      //- 註冊
      BasicButton(rounded='normal', @click='handleLoginClick')
        .flex.flex-row.items-center.p-1
          .body2.text-primary.opacity-60 {{ t("profile_registerArrow") }}
          img.w-4.h-4.ml-2(:src='iconArrowRightPrimary40')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading, Progress } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { staticImgUrl, levelImg, levelProgressColor, authorized, commaFormat } from '@/utils';
  import { getVipInfo, getVipGift } from '@/api/member/vip';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { GetVipInfoResponseData } from '@/api/member/model/vip-model';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');
  const backgroundProfileLevel = staticImgUrl('background-profile-level.png');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Get vip data loading status
   */
  const getVipDataLoading = ref(false);

  /**
   * Get vip gift loading status
   */
  const getVipGiftLoading = ref(false);

  /**
   * Vip data
   */
  const vipData = ref<GetVipInfoResponseData>({});

  /**
   * Has gift or not
   */
  const hasGift = ref(false);

  /**
   * Background
   */
  const bg = computed(() => {
    return {
      backgroundImage: `url(${backgroundProfileLevel})`,
    };
  });

  /**
   * Level
   */
  const level = computed(() => {
    return vipData.value.level || 0;
  });

  /**
   * Level image source
   */
  const levelImgSrc = computed(() => {
    return levelImg(level.value);
  });

  /**
   * Level progress color
   */
  const levelProgressColour = computed(() => {
    return levelProgressColor(level.value);
  });

  /**
   * Total bet amount
   */
  const totalBetAmount = computed(() => {
    return commaFormat(vipData.value.totalBetAmount);
  });

  /**
   * Percentage
   */
  const percentage = computed(() => {
    const totalBetAmount = vipData.value.totalBetAmount || 0;
    const upgradeBetAmount = vipData.value.current?.upgradeBetAmount || 0;
    if (!totalBetAmount && !upgradeBetAmount) {
      return 0;
    } else {
      return (totalBetAmount / upgradeBetAmount) * 100;
    }
  });

  /**
   * Get vip data
   */
  const getVipData = async () => {
    if (authorized()) {
      try {
        // Turn on loading status
        getVipDataLoading.value = true;

        // Get vip data
        const response = await getVipInfo();

        // Update vip data
        vipData.value = response?.data?.data || {};
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        getVipDataLoading.value = false;
      }
    }
  };

  /**
   * Get has vip gift
   */
  const getHasVipGift = async () => {
    if (authorized()) {
      try {
        // Turn on loading status
        getVipGiftLoading.value = true;

        // Get vip gift
        const response = await getVipGift();

        // Update has gift status
        const list = response?.data?.data?.list || [];
        const unreadList = list.filter((element) => {
          return element.status == 2;
        });
        hasGift.value = unreadList.length > 0;
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        getVipGiftLoading.value = false;
      }
    }
  };

  /**
   * Handle level click
   */
  const handleLevelClick = () => {
    router.push({ path: '/vip' });
  };

  /**
   * Handle login button clicked
   */
  const handleLoginClick = () => {
    window.location.href = ENV.VITE_LOGIN_URL || '';
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getVipData();
    getHasVipGift();
  });
</script>

<style scoped lang="scss">
  .bg-level {
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
  }

  .grid-cols-level {
    grid-template-columns: auto 1fr;
  }

  .grid-cols-level-info {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-register {
    grid-template-columns: 1fr auto;
  }
</style>
