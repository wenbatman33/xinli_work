<template lang="pug">
//- 晉級動畫
Popup.h-full.w-full.bg-transparent(:show='show', teleport='body', :closeable='false')
  transition-group(name='fade-in')
    //- 等級提升
    .flex.flex-col.items-center(v-if='scene == Scene.LEVEL')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_levelUpgrade_title") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.level-bg(:src='backgroundVipLevelUpgrade')

        //- 光暈
        img.z-20.level-grow(:src='iconVipLevelGrow')

        //- 徽章
        img.z-30.level-badge(:src='currentLevelSrc')

        //- 進度
        Progress.z-40.level-progress(:percentage='currentLevelPercentage', :show-pivot='false', :color='levelProgressColour', track-color='#f3f4f6')

        //- 等級
        .z-50.level-level.headline3 {{ currentLevelText }}

        //- Particles
        .z-60.level-particles(ref='levelParticles')

      //- 查看晉級獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3(v-if='containsNextScene') {{ t("vip_levelUpgrade_detail") }}
        .subtitle3(v-else) {{ t("vip_upgradeReward_close") }}

    //- 晉級禮金
    .flex.flex-col.items-center(v-else-if='scene == Scene.UPGRADE_GIFT')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipUpgradeGift')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_upgradeGift") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='commaFormat(Math.floor(currentUpgradeGift))')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 單日提款限額
    .flex.flex-col.items-center(v-else-if='scene == Scene.WITHDRAWAL_AMOUNT')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipWithdrawalAmount')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_withdrawalAmount") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='commaFormat(Math.floor(currentWithdrawalAmountLimit))')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 單日提款次數
    .flex.flex-col.items-center(v-else-if='scene == Scene.WITHDRAWAL_TIMES')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipWithdrawalAmount')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_withdrawalLimit") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='String(Math.floor(currentWithdrawalTimesLimit))')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 體育返水
    .flex.flex-col.items-center(v-else-if='scene == Scene.SPORT_REFUND')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipSportRefund')

        //- 標題
        .z-20.upgrade-gift-title
          span {{ t("vip_returnPlatform1") }}
          span {{ t("vip_return") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='`${currentSportRefund.toFixed(2)}%`')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 真人返水
    .flex.flex-col.items-center(v-else-if='scene == Scene.PERSON_REFUND')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipPersonRefund')

        //- 標題
        .z-20.upgrade-gift-title
          span {{ t("vip_returnPlatform2") }}
          span {{ t("vip_return") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='`${currentPersonRefund.toFixed(2)}%`')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 電競返水
    .flex.flex-col.items-center(v-else-if='scene == Scene.ESPORT_REFUND')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipEsportRefund')

        //- 標題
        .z-20.upgrade-gift-title
          span {{ t("vip_returnPlatform5") }}
          span {{ t("vip_return") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='`${currentEsportRefund.toFixed(2)}%`')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 電子返水
    .flex.flex-col.items-center(v-else-if='scene == Scene.ELECTRONIC_REFUND')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipElectronicRefund')

        //- 標題
        .z-20.upgrade-gift-title
          span {{ t("vip_returnPlatform3") }}
          span {{ t("vip_return") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='`${currentElectronicRefund.toFixed(2)}%`')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 彩票返水
    .flex.flex-col.items-center(v-else-if='scene == Scene.LOTTERY_REFUND')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipLotteryRefund')

        //- 標題
        .z-20.upgrade-gift-title
          span {{ t("vip_returnPlatform3") }}
          span {{ t("vip_return") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='`${currentLotteryRefund.toFixed(2)}%`')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 月度禮金
    .flex.flex-col.items-center(v-else-if='scene == Scene.MONTHLY_GIFT')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipUpgradeGift')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_rewardMonth") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='commaFormat(Math.floor(currentMonthlyGift))')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 週年禮金
    .flex.flex-col.items-center(v-else-if='scene == Scene.ANNIVERSARY_GIFT')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipUpgradeGift')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_rewardYear") }}

        //- 金額
        RollingNumber.z-30.upgrade-gift-money(:text='commaFormat(Math.floor(currentAnniversaryGift))')

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 生日禮品
    .flex.flex-col.items-center(v-else-if='scene == Scene.BIRTHDAY_GIFT')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipBirthdayGift')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_customGift") }}

        //- 金額
        .z-30.upgrade-gift-money {{ t("vip_upgradeReward_birthdayGift") }}

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 訂製服務1
    .flex.flex-col.items-center(v-else-if='scene == Scene.CUSTOM1')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipCustom1')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_customService") }}

        //- 金額
        .z-30.upgrade-gift-money {{ t("vip_upgradeReward_service") }}

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 訂製服務2
    .flex.flex-col.items-center(v-else-if='scene == Scene.CUSTOM2')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipCustom2')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_customService") }}

        //- 金額
        .z-30.upgrade-gift-money {{ t("vip_upgradeReward_deposit") }}

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 訂製服務3
    .flex.flex-col.items-center(v-else-if='scene == Scene.CUSTOM3')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipCustom3')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_customService") }}

        //- 金額
        .z-30.upgrade-gift-money {{ t("vip_upgradeReward_domain") }}

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 訂製服務4
    .flex.flex-col.items-center(v-else-if='scene == Scene.CUSTOM4')
      //- 標題
      .headline2.text-white.mt-14 {{ t("vip_upgradeReward_upgradeRewards") }}

      //- 內容
      .relative.flex.flex-col.items-center.mt-14
        //- 底圖
        img.z-10.upgrade-gift-bg(:src='backgroundVipCustom4')

        //- 標題
        .z-20.upgrade-gift-title {{ t("vip_upgradeReward_customService") }}

        //- 金額
        .z-30.upgrade-gift-money {{ t("vip_upgradeReward_brand") }}

      //- 下一獎勵
      BasicButton.next-btn.mt-8(v-if='!animationInProgress && containsNextScene', :loading='postingReadGift', rounded='md', size='medium', @click='handleNextClick')
        .subtitle3 {{ t("vip_upgradeReward_next") }}

      //- 關閉
      BasicButton.close-btn.mt-4(v-if='!animationInProgress', :loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}

    //- 例外狀況
    .flex.flex-col.items-center(v-else)
      //- 關閉
      BasicButton.close-btn.mt-4(:loading='postingReadGift', rounded='md', size='medium', @click='handleCloseClick')
        .subtitle3 {{ t("vip_upgradeReward_close") }}
</template>

<script setup lang="ts">
  import { defineProps, ref, computed, watch } from 'vue';
  import { Popup, Progress } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { bezier } from '@/utils/bezier';
  import { postVipGiftRead } from '@/api/member/vip';
  import { staticImgUrl, levelImg, levelProgressColor, commaFormat } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import RollingNumber from '@/components/vip/RollingNumber.vue';
  import type { GetVipInfoResponseData, GiftItem, LevelItem } from '@/api/member/model/vip-model';

  /**
   * Static icons
   */
  const backgroundVipLevelUpgrade = staticImgUrl('background-vip-level-upgrade.svg');
  const backgroundVipUpgradeGift = staticImgUrl('background-vip-upgrade-gift.png');
  const backgroundVipWithdrawalAmount = staticImgUrl('background-vip-withdrawal-amount.png');
  const backgroundVipSportRefund = staticImgUrl('background-vip-sport-refund.png');
  const backgroundVipPersonRefund = staticImgUrl('background-vip-person-refund.png');
  const backgroundVipElectronicRefund = staticImgUrl('background-vip-electronic-refund.png');
  const backgroundVipLotteryRefund = staticImgUrl('background-vip-lottery-refund.png');
  const backgroundVipEsportRefund = staticImgUrl('background-vip-esport-refund.png');
  const backgroundVipBirthdayGift = staticImgUrl('background-vip-birthday-gift.png');
  const backgroundVipCustom1 = staticImgUrl('background-vip-custom1.png');
  const backgroundVipCustom2 = staticImgUrl('background-vip-custom2.png');
  const backgroundVipCustom3 = staticImgUrl('background-vip-custom3.png');
  const backgroundVipCustom4 = staticImgUrl('background-vip-custom4.png');
  const iconVipLevelGrow = staticImgUrl('icon-vip-level-grow.svg');

  /**
   * Animation duration per level
   */
  const ANIMATION_DURATION_PER_LEVEL = 800;

  /**
   * Animation duration
   */
  const ANIMATION_DURATION = 1500;

  /**
   * Fade in duration
   */
  const FADE_IN_DURATION = 800;

  /**
   * Animation easing
   */
  const ANIMATION_EASING = bezier(0, 0.34, 0.46, 1);

  /**
   * Current scene
   */
  enum Scene {
    NONE,
    LEVEL,
    UPGRADE_GIFT,
    WITHDRAWAL_AMOUNT,
    WITHDRAWAL_TIMES,
    SPORT_REFUND,
    PERSON_REFUND,
    ESPORT_REFUND,
    ELECTRONIC_REFUND,
    LOTTERY_REFUND,
    MONTHLY_GIFT,
    ANNIVERSARY_GIFT,
    BIRTHDAY_GIFT,
    CUSTOM1,
    CUSTOM2,
    CUSTOM3,
    CUSTOM4,
  }

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Vip data
     */
    vipData?: GetVipInfoResponseData;

    /**
     * Gift list
     */
    giftList?: GiftItem[];

    /**
     * Level list
     */
    levelList?: LevelItem[];
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Level particle element
   */
  const levelParticles = ref<HTMLElement>();

  /**
   * Show popup
   */
  const show = ref(false);

  /**
   * Has been show
   */
  const hasBeenShow = ref(false);

  /**
   * Scene
   */
  const scene = ref(Scene.NONE);

  /**
   * Animation start time
   */
  const animationStartTime = ref<number | undefined>(undefined);

  /**
   * Animation in progress
   */
  const animationInProgress = ref(false);

  /**
   * The lowest level
   */
  const lowestLevel = ref(0);

  /**
   * The highest level
   */
  const highestLevel = ref(0);

  /**
   * Current level in animator progress
   */
  const currentLevel = ref(0);

  /**
   * Current level percentage
   */
  const currentLevelPercentage = ref(0);

  /**
   * The lowest upgrade gift
   */
  const lowestUpgradeGift = ref(0);

  /**
   * The highest upgrade gift
   */
  const highestUpgradeGift = ref(0);

  /**
   * Current upgrade gift
   */
  const currentUpgradeGift = ref(0);

  /**
   * The lowest withdrawal amount limit
   */
  const lowestWithdrawalAmountLimit = ref(0);

  /**
   * The highest withdrawal amount limit
   */
  const highestWithdrawalAmountLimit = ref(0);

  /**
   * Current withdrawal amount limit
   */
  const currentWithdrawalAmountLimit = ref(0);

  /**
   * The lowest withdrawal times limit
   */
  const lowestWithdrawalTimesLimit = ref(0);

  /**
   * The highest withdrawal times limit
   */
  const highestWithdrawalTimesLimit = ref(0);

  /**
   * Current withdrawal times limit
   */
  const currentWithdrawalTimesLimit = ref(0);

  /**
   * The lowest sport refund
   */
  const lowestSportRefund = ref(0);

  /**
   * The highest sport refund
   */
  const highestSportRefund = ref(0);

  /**
   * Current sport refund
   */
  const currentSportRefund = ref(0);

  /**
   * The lowest person refund
   */
  const lowestPersonRefund = ref(0);

  /**
   * The highest person refund
   */
  const highestPersonRefund = ref(0);

  /**
   * Current person refund
   */
  const currentPersonRefund = ref(0);

  /**
   * The lowest esport refund
   */
  const lowestEsportRefund = ref(0);

  /**
   * The highest esport refund
   */
  const highestEsportRefund = ref(0);

  /**
   * Current esport refund
   */
  const currentEsportRefund = ref(0);

  /**
   * The lowest electronic refund
   */
  const lowestElectronicRefund = ref(0);

  /**
   * The highest electronic refund
   */
  const highestElectronicRefund = ref(0);

  /**
   * Current electronic refund
   */
  const currentElectronicRefund = ref(0);

  /**
   * The lowest lottery refund
   */
  const lowestLotteryRefund = ref(0);

  /**
   * The highest lottery refund
   */
  const highestLotteryRefund = ref(0);

  /**
   * Current lottery refund
   */
  const currentLotteryRefund = ref(0);

  /**
   * The lowest monthly gift
   */
  const lowestMonthlyGift = ref(0);

  /**
   * The highest monthly gift
   */
  const highestMonthlyGift = ref(0);

  /**
   * Current monthly gift
   */
  const currentMonthlyGift = ref(0);

  /**
   * The lowest anniversary gift
   */
  const lowestAnniversaryGift = ref(0);

  /**
   * The highest anniversary gift
   */
  const highestAnniversaryGift = ref(0);

  /**
   * Current anniversary gift
   */
  const currentAnniversaryGift = ref(0);

  /**
   * The lowest birthday gift
   */
  const lowestBirthdayGift = ref(0);

  /**
   * The highest birthday gift
   */
  const highestBirthdayGift = ref(0);

  /**
   * Current birthday gift
   */
  const currentBirthdayGift = ref(0);

  /**
   * The lowest custom1
   */
  const lowestCustom1 = ref(0);

  /**
   * The highest custom1
   */
  const highestCustom1 = ref(0);

  /**
   * Current custom1
   */
  const currentCustom1 = ref(0);

  /**
   * The lowest custom2
   */
  const lowestCustom2 = ref(0);

  /**
   * The highest custom2
   */
  const highestCustom2 = ref(0);

  /**
   * Current custom2
   */
  const currentCustom2 = ref(0);

  /**
   * The lowest custom3
   */
  const lowestCustom3 = ref(0);

  /**
   * The highest custom3
   */
  const highestCustom3 = ref(0);

  /**
   * Current custom3
   */
  const currentCustom3 = ref(0);

  /**
   * The lowest custom4
   */
  const lowestCustom4 = ref(0);

  /**
   * The highest custom4
   */
  const highestCustom4 = ref(0);

  /**
   * Current custom4
   */
  const currentCustom4 = ref(0);

  /**
   * Posting read gift
   */
  const postingReadGift = ref(false);

  /**
   * Current level image source
   */
  const currentLevelSrc = computed(() => {
    const level = Math.floor(currentLevel.value);
    return levelImg(level);
  });

  /**
   * Current level progress color
   */
  const levelProgressColour = computed(() => {
    const level = Math.floor(currentLevel.value);
    return levelProgressColor(level);
  });

  /**
   * Current level text
   */
  const currentLevelText = computed(() => {
    const level = Math.floor(currentLevel.value);
    return `VIP ${level}`;
  });

  /**
   * Contains next scene
   */
  const containsNextScene = computed(() => {
    return getNextScene() != Scene.NONE;
  });

  /**
   * Get next scene
   */
  const getNextScene = () => {
    if (currentLevel.value != highestLevel.value) {
      return Scene.LEVEL;
    } else if (currentUpgradeGift.value != highestUpgradeGift.value) {
      return Scene.UPGRADE_GIFT;
    } else if (currentWithdrawalAmountLimit.value != highestWithdrawalAmountLimit.value) {
      return Scene.WITHDRAWAL_AMOUNT;
    } else if (currentWithdrawalTimesLimit.value != highestWithdrawalTimesLimit.value) {
      return Scene.WITHDRAWAL_TIMES;
    } else if (currentSportRefund.value != highestSportRefund.value) {
      return Scene.SPORT_REFUND;
    } else if (currentPersonRefund.value != highestPersonRefund.value) {
      return Scene.PERSON_REFUND;
    } else if (currentEsportRefund.value != highestEsportRefund.value) {
      return Scene.ESPORT_REFUND;
    } else if (currentElectronicRefund.value != highestElectronicRefund.value) {
      return Scene.ELECTRONIC_REFUND;
    } else if (currentLotteryRefund.value != highestLotteryRefund.value) {
      return Scene.LOTTERY_REFUND;
    } else if (currentMonthlyGift.value != highestMonthlyGift.value) {
      return Scene.MONTHLY_GIFT;
    } else if (currentAnniversaryGift.value != highestAnniversaryGift.value) {
      return Scene.ANNIVERSARY_GIFT;
    } else if (currentBirthdayGift.value != highestBirthdayGift.value) {
      return Scene.BIRTHDAY_GIFT;
    } else if (currentCustom1.value != highestCustom1.value) {
      return Scene.CUSTOM1;
    } else if (currentCustom2.value != highestCustom2.value) {
      return Scene.CUSTOM2;
    } else if (currentCustom3.value != highestCustom3.value) {
      return Scene.CUSTOM3;
    } else if (currentCustom4.value != highestCustom4.value) {
      return Scene.CUSTOM4;
    } else {
      return Scene.NONE;
    }
  };

  /**
   * Handle next button clicked
   */
  const handleNextClick = async () => {
    // Update scene
    scene.value = getNextScene();

    // Update show
    show.value = scene.value != Scene.NONE;

    // Read scene gifts
    let giftIds = [];
    const giftList = props.giftList || [];
    if (scene.value == Scene.UPGRADE_GIFT) {
      giftIds = giftList
        .filter((element) => {
          return element.type == 2;
        })
        .map((element) => {
          return element.id || 0;
        });
    } else if (scene.value == Scene.MONTHLY_GIFT) {
      giftIds = giftList
        .filter((element) => {
          return element.type == 1;
        })
        .map((element) => {
          return element.id || 0;
        });
    } else if (scene.value == Scene.ANNIVERSARY_GIFT) {
      giftIds = giftList
        .filter((element) => {
          return element.type == 3;
        })
        .map((element) => {
          return element.id || 0;
        });
    }
    if (giftIds.length > 0) {
      try {
        // Turn on loading status
        postingReadGift.value = true;

        // Compute upgrade gift ids
        const upgradeGiftIds = giftList
          .filter((element) => {
            return element.type == 2;
          })
          .map((element) => {
            return element.id || 0;
          });

        // Read upgrade gift
        await postVipGiftRead({
          ids: upgradeGiftIds,
        });
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        postingReadGift.value = false;
      }
    }

    // Request animation frame
    if (scene.value != Scene.NONE) {
      animationStartTime.value = undefined;
      requestAnimationFrame(frame);
    }
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = async () => {
    try {
      // Turn on loading status
      postingReadGift.value = true;

      // Compute all gift ids
      const giftList = props.giftList || [];
      const upgradeGiftIds = giftList.map((element) => {
        return element.id || 0;
      });

      // Read all gift
      await postVipGiftRead({
        ids: upgradeGiftIds,
      });
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      postingReadGift.value = false;

      // Update show
      show.value = false;
    }
  };

  /**
   * Animation frame
   */
  const frame = (time: number) => {
    // Update start time
    if (!animationStartTime.value) {
      animationStartTime.value = time;
    }

    // Compute start delay
    let startDelay = FADE_IN_DURATION;
    if (scene.value == Scene.BIRTHDAY_GIFT) {
      startDelay = 0;
    } else if (scene.value == Scene.CUSTOM1) {
      startDelay = 0;
    } else if (scene.value == Scene.CUSTOM2) {
      startDelay = 0;
    } else if (scene.value == Scene.CUSTOM3) {
      startDelay = 0;
    } else if (scene.value == Scene.CUSTOM4) {
      startDelay = 0;
    }

    // Compute duration
    let duration = ANIMATION_DURATION;
    if (scene.value == Scene.LEVEL) {
      duration = ANIMATION_DURATION_PER_LEVEL * (highestLevel.value - lowestLevel.value);
    }

    // Compute passed time
    const timePassed = Math.max(time - animationStartTime.value - startDelay, 0);

    // Compute progress
    const progress = ANIMATION_EASING(Math.min(Math.max(timePassed / duration, 0), 1));

    // Level animation
    if (scene.value == Scene.LEVEL) {
      const levelProgress = (highestLevel.value - lowestLevel.value) * progress;
      const levelTextBefore = currentLevelText.value;
      currentLevel.value = lowestLevel.value + levelProgress;
      currentLevelPercentage.value = (currentLevel.value - Math.floor(currentLevel.value)) * 100;
      if (levelTextBefore != currentLevelText.value) {
        startLevelParticle();
      }
    }

    // Upgrade gift animation
    if (scene.value == Scene.UPGRADE_GIFT) {
      const upgradeGiftProgress = (highestUpgradeGift.value - lowestUpgradeGift.value) * progress;
      currentUpgradeGift.value = lowestUpgradeGift.value + upgradeGiftProgress;
    }

    // Withdrawal amount animation
    if (scene.value == Scene.WITHDRAWAL_AMOUNT) {
      const withdrawalAmountProgress = (highestWithdrawalAmountLimit.value - lowestWithdrawalAmountLimit.value) * progress;
      currentWithdrawalAmountLimit.value = lowestWithdrawalAmountLimit.value + withdrawalAmountProgress;
    }

    // Withdrawal times animation
    if (scene.value == Scene.WITHDRAWAL_TIMES) {
      const withdrawalTimesProgress = (highestWithdrawalTimesLimit.value - lowestWithdrawalTimesLimit.value) * progress;
      currentWithdrawalTimesLimit.value = lowestWithdrawalTimesLimit.value + withdrawalTimesProgress;
    }

    // Sport refund animation
    if (scene.value == Scene.SPORT_REFUND) {
      const sportRefundProgress = (highestSportRefund.value - lowestSportRefund.value) * progress;
      currentSportRefund.value = lowestSportRefund.value + sportRefundProgress;
    }

    // Person refund animation
    if (scene.value == Scene.PERSON_REFUND) {
      const personRefundProgress = (highestPersonRefund.value - lowestPersonRefund.value) * progress;
      currentPersonRefund.value = lowestPersonRefund.value + personRefundProgress;
    }

    // Esport refund animation
    if (scene.value == Scene.ESPORT_REFUND) {
      const esportRefundProgress = (highestEsportRefund.value - lowestEsportRefund.value) * progress;
      currentEsportRefund.value = lowestEsportRefund.value + esportRefundProgress;
    }

    // Electronic refund animation
    if (scene.value == Scene.ELECTRONIC_REFUND) {
      const electronicRefundProgress = (highestElectronicRefund.value - lowestElectronicRefund.value) * progress;
      currentElectronicRefund.value = lowestElectronicRefund.value + electronicRefundProgress;
    }

    // Lottery refund animation
    if (scene.value == Scene.LOTTERY_REFUND) {
      const lotteryRefundProgress = (highestLotteryRefund.value - lowestLotteryRefund.value) * progress;
      currentLotteryRefund.value = lowestLotteryRefund.value + lotteryRefundProgress;
    }

    // Monthly gift animation
    if (scene.value == Scene.MONTHLY_GIFT) {
      const monthlyGiftProgress = (highestMonthlyGift.value - lowestMonthlyGift.value) * progress;
      currentMonthlyGift.value = lowestMonthlyGift.value + monthlyGiftProgress;
    }

    // Anniversary gift animation
    if (scene.value == Scene.ANNIVERSARY_GIFT) {
      const anniversaryGiftProgress = (highestAnniversaryGift.value - lowestAnniversaryGift.value) * progress;
      currentAnniversaryGift.value = lowestAnniversaryGift.value + anniversaryGiftProgress;
    }

    // Birthday gift animation
    if (scene.value == Scene.BIRTHDAY_GIFT) {
      const birthdayGiftProgress = (highestBirthdayGift.value - lowestBirthdayGift.value) * progress;
      currentBirthdayGift.value = lowestBirthdayGift.value + birthdayGiftProgress;
    }

    // Custom1 animation
    if (scene.value == Scene.CUSTOM1) {
      const custom1Progress = (highestCustom1.value - lowestCustom1.value) * progress;
      currentCustom1.value = lowestCustom1.value + custom1Progress;
    }

    // Custom2 animation
    if (scene.value == Scene.CUSTOM2) {
      const custom2Progress = (highestCustom2.value - lowestCustom2.value) * progress;
      currentCustom2.value = lowestCustom2.value + custom2Progress;
    }

    // Custom3 animation
    if (scene.value == Scene.CUSTOM3) {
      const custom3Progress = (highestCustom3.value - lowestCustom3.value) * progress;
      currentCustom3.value = lowestCustom3.value + custom3Progress;
    }

    // Custom4 animation
    if (scene.value == Scene.CUSTOM4) {
      const custom4Progress = (highestCustom4.value - lowestCustom4.value) * progress;
      currentCustom4.value = lowestCustom4.value + custom4Progress;
    }

    // Update animation in progress
    animationInProgress.value = progress >= 0 && progress < 1;

    // Request next frame
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };

  /**
   * Gift item unread function for testing
   */
  const isUnread = (item: GiftItem) => {
    return item.read == 2;
  };

  /**
   * Start level particle
   */
  const startLevelParticle = () => {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('particle');
      levelParticles.value?.appendChild(particle);

      const size = Math.floor(Math.random() * 20 + 5);
      particle.style.position = 'absolute';
      particle.style.zIndex = '70';
      particle.style.borderRadius = `${size / 2}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;

      const x = (levelParticles.value?.clientWidth || 0) / 2;
      const y = (levelParticles.value?.clientHeight || 0) / 2;

      const destinationX = x + (Math.random() - 0.5) * 2 * 75;
      const destinationY = y + (Math.random() - 0.5) * 2 * 75;

      const animation = particle.animate(
        [
          {
            transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
            opacity: 1,
          },
          {
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: 'cubic-bezier(0, .9, .57, 1)',
          delay: Math.random() * 200,
        }
      );
      animation.onfinish = () => {
        particle.remove();
      };
    }
  };

  /**
   * Watch vip data changed
   */
  watch(
    () => [props.vipData, props.giftList, props.levelList],
    () => {
      // Compute upgrade info
      const vipDataReady = props.vipData != undefined && props.vipData.level != undefined && props.vipData.level > 0;
      const giftListReady = props.giftList != undefined && props.giftList.length > 0;
      const levelListReady = props.levelList != undefined && props.levelList.length > 0;
      if (vipDataReady && giftListReady && levelListReady) {
        // Compute level upgrade info
        const level = props.vipData?.level || 0;
        const totalBetAmount = props.vipData?.totalBetAmount || 0;
        const upgradeBetAmount = props.vipData?.current?.upgradeBetAmount || 0;
        let percentage = 0;
        if (totalBetAmount && upgradeBetAmount) {
          percentage = totalBetAmount / upgradeBetAmount;
        }
        highestLevel.value = level + percentage;
        currentLevel.value = highestLevel.value;
        lowestLevel.value = highestLevel.value;
        props.giftList?.forEach((element) => {
          if (isUnread(element)) {
            const giftLevel = element.vipLevel || lowestLevel.value;
            if (giftLevel < lowestLevel.value) {
              lowestLevel.value = giftLevel;
              currentLevel.value = giftLevel;
            }
          }
        });

        // Retrieve level data
        if (lowestLevel.value < highestLevel.value) {
          lowestLevel.value = lowestLevel.value - 1;
          currentLevel.value = lowestLevel.value;
        }
        const currentLevelData = props.levelList?.find((element) => {
          return element.level == Math.floor(highestLevel.value);
        });
        const lowestLevelData = props.levelList?.find((element) => {
          return element.level == Math.floor(lowestLevel.value);
        });
        const currentLevelNumber = currentLevelData?.level || 0;
        const lowestLevelNumber = lowestLevelData?.level || 0;

        // Compute upgrade gift info
        currentUpgradeGift.value = props.vipData?.current?.upgradeGift || 0;
        lowestUpgradeGift.value = currentUpgradeGift.value;
        highestUpgradeGift.value = currentUpgradeGift.value;
        props.giftList?.forEach((element) => {
          if (isUnread(element)) {
            if (element.type == 2) {
              const money = element.money || lowestUpgradeGift.value;
              if (money < lowestUpgradeGift.value) {
                lowestUpgradeGift.value = money;
                currentUpgradeGift.value = money;
              }
            }
          }
        });

        // Compute withdrawal amout limit upgrade info
        lowestWithdrawalAmountLimit.value = lowestLevelData?.withdrawAmountLimit || 0;
        currentWithdrawalAmountLimit.value = lowestLevelData?.withdrawAmountLimit || 0;
        highestWithdrawalAmountLimit.value = currentLevelData?.withdrawAmountLimit || 0;

        // Compute withdrawal times limit upgrade info
        lowestWithdrawalTimesLimit.value = lowestLevelData?.withdrawTimesLimit || 0;
        currentWithdrawalTimesLimit.value = lowestLevelData?.withdrawTimesLimit || 0;
        highestWithdrawalTimesLimit.value = currentLevelData?.withdrawTimesLimit || 0;

        // Compute sport refund upgrade info
        lowestSportRefund.value = lowestLevelData?.sportRefund || 0;
        currentSportRefund.value = lowestLevelData?.sportRefund || 0;
        highestSportRefund.value = currentLevelData?.sportRefund || 0;

        // Compute person refund upgrade info
        lowestPersonRefund.value = lowestLevelData?.personRefund || 0;
        currentPersonRefund.value = lowestLevelData?.personRefund || 0;
        highestPersonRefund.value = currentLevelData?.personRefund || 0;

        // Compute esport refund upgrade info
        lowestEsportRefund.value = lowestLevelData?.esportRefund || 0;
        currentEsportRefund.value = lowestLevelData?.esportRefund || 0;
        highestEsportRefund.value = currentLevelData?.esportRefund || 0;

        // Compute electronic refund upgrade info
        lowestElectronicRefund.value = lowestLevelData?.electronicRefund || 0;
        currentElectronicRefund.value = lowestLevelData?.electronicRefund || 0;
        highestElectronicRefund.value = currentLevelData?.electronicRefund || 0;

        // Compute lottery refund upgrade info
        lowestLotteryRefund.value = lowestLevelData?.lotteryRefund || 0;
        currentLotteryRefund.value = lowestLevelData?.lotteryRefund || 0;
        highestLotteryRefund.value = currentLevelData?.lotteryRefund || 0;

        // Compute monthly gift info
        lowestMonthlyGift.value = lowestLevelData?.monthlyGift || 0;
        currentMonthlyGift.value = lowestLevelData?.monthlyGift || 0;
        highestMonthlyGift.value = currentLevelData?.monthlyGift || 0;

        // Compute anniversary gift info
        lowestAnniversaryGift.value = lowestLevelData?.anniversaryGift || 0;
        currentAnniversaryGift.value = lowestLevelData?.anniversaryGift || 0;
        highestAnniversaryGift.value = currentLevelData?.anniversaryGift || 0;

        // Compute birthday gift info
        lowestBirthdayGift.value = lowestLevelData?.level == 0 ? 0 : 1;
        currentBirthdayGift.value = lowestLevelData?.level == 0 ? 0 : 1;
        highestBirthdayGift.value = currentLevelData?.level == 0 ? 0 : 1;

        // Compute custom1 info
        lowestCustom1.value = lowestLevelNumber >= 7 ? 1 : 0;
        currentCustom1.value = lowestLevelNumber >= 7 ? 1 : 0;
        highestCustom1.value = currentLevelNumber >= 7 ? 1 : 0;

        // Compute custom2 info
        lowestCustom2.value = lowestLevelNumber >= 7 ? 1 : 0;
        currentCustom2.value = lowestLevelNumber >= 7 ? 1 : 0;
        highestCustom2.value = currentLevelNumber >= 7 ? 1 : 0;

        // Compute custom3 info
        lowestCustom3.value = lowestLevelNumber >= 7 ? 1 : 0;
        currentCustom3.value = lowestLevelNumber >= 7 ? 1 : 0;
        highestCustom3.value = currentLevelNumber >= 7 ? 1 : 0;

        // Compute custom4 info
        lowestCustom4.value = lowestLevelNumber >= 7 ? 1 : 0;
        currentCustom4.value = lowestLevelNumber >= 7 ? 1 : 0;
        highestCustom4.value = currentLevelNumber >= 7 ? 1 : 0;

        // Next animation
        if (!hasBeenShow.value) {
          hasBeenShow.value = true;
          handleNextClick();
        }
      }
    }
  );
</script>

<style scoped lang="scss">
  .fade-in-enter-active {
    position: absolute;
    width: 100%;
    right: 0%;
    opacity: 0.5;
    transition: all 0.8s ease;
  }

  .fade-in-leave-active {
    position: absolute;
    width: 100%;
    left: 0%;
    opacity: 1;
    transition: all 0.8s ease;
  }

  .fade-in-enter-from {
    position: absolute;
    width: 100%;
    right: -100%;
    opacity: 0;
  }

  .fade-in-leave-to {
    position: absolute;
    width: 100%;
    opacity: 0;
    left: -100%;
  }

  .level-bg {
    width: 300px;
    height: 162px;
    margin-top: 125px;
  }

  .level-grow {
    position: absolute;
    width: 252px;
    height: 252px;
  }

  .level-badge {
    position: absolute;
    width: 184px;
    height: 150px;
    top: 51px;
  }

  .level-progress {
    position: absolute;
    width: 148px;
    height: 8px;
    bottom: 59px;
  }

  .level-level {
    position: absolute;
    bottom: 27px;
  }

  .level-particles {
    position: absolute;
    bottom: 27px;
    width: 56px;
    height: 56px;
    bottom: 35px;
    right: 62px;
  }

  particle {
    opacity: 0;
  }

  .next-btn {
    width: 212px;
    color: rgba(0, 0, 0, 0.8);
    background: linear-gradient(180deg, #c8a674 0%, #ebc994 100%);
  }

  .close-btn {
    width: 212px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    color: #ffffff;
  }

  .upgrade-gift-bg {
    width: 288px;
    height: 288px;
  }

  .upgrade-gift-title {
    position: absolute;
    left: 23px;
    top: 48px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    color: #ffffff;
  }

  .upgrade-gift-money {
    position: absolute;
    left: 24px;
    top: 141px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 67px;
    color: #ffffff;
  }
</style>
