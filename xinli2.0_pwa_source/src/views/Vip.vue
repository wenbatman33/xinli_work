<template lang="pug">
//- VIP頁面
.flex.flex-col.flex-grow.items-stretch.bg-vip
  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0

  //- 導覽欄(relative)
  Nav.relative.z-20

  //- 下拉刷新
  PullRefresh(:model-value='refreshing', @refresh='handleRefresh')
    //- 頁面內容
    .flex.flex-col.flex-grow.items-stretch.pb-28
      //- 等級卡片
      .mt-6.mx-6.py-6.flex.flex-col.items-stretch.bg-white-card
        //- 等級
        .grid.grid-cols-level-title.gap-1.px-6
          //- 垂直排列
          .flex.flex-col
            //- 水平排列
            .flex.flex-row.items-center
              //- 當前等級
              .headline3.text-primary {{ t("vip_currentLevel") }}

              //- 等級提示
              BasicButton.rounded-full.ml-2(@click='handleLevelTipClick')
                img.w-4.h-4(:src='iconInfoPrimary40')

            //- 保級期限
            .body3.text-primary.opacity-40.mt-2
              span {{ t("vip_keepAvailable") }}
              span.ml-1 {{ keepAvailable }}

          //- 讀取中
          .p-3(v-if='getVipDataLoading')
            Loading(type='spinner', size='24px')

          //- 圖示
          img.h-16(v-else, :src='levelImgSrc')

        //- 累積有效流水標題
        .body2.text-primary.opacity-80.mt-3.px-6 {{ t("vip_availableBalance") }}

        //- 累積有效流水
        .flex.flex-row.items-center.mt-1.px-6
          //- 當前流水
          .subtitle1.text-primary {{ totalBetAmount }}

          //- 下一等級
          .body3.text-primary.opacity-40.ml-2
            span /
            span.ml-1 {{ upgradeBetAmount }}
            span.ml-1 {{ nextLevelStr }}
            span.ml-1 {{ t("vip_balance") }}

        //- 等級進度
        .grid.grid-cols-level-progress.items-center.gap-2.mt-3.px-6
          //- 當前等級
          .body3.text-primary.opacity-40 {{ currentLevelStr }}

          //- 進度條
          Progress.h-2(:percentage='percentage', :show-pivot='false', :color='levelProgressColour', track-color='#f3f4f6')

          //- 下一等級
          .body3.text-primary.opacity-40 {{ nextLevelStr }}

        //- 保級任務
        .flex.flex-col.items-stretch.py-4.mx-3.mt-6.bg-keep
          //- 標題列
          .flex.flex-row.items-center.justify-between.pl-3.pr-1
            //- 標題
            .subtitle1.text-primary {{ t("vip_keepQuest") }}

            //- 提示
            BasicButton(rounded='full', @click='handleKeepTipClick')
              .flex.flex-row.items-center.px-2.py-1
                .body3.text-primary.opacity-60 {{ t("vip_keepTip") }}
                img.w-2.h-2.ml-2(:src='iconArrowRightPrimary40')

          //- 已完成狀態列
          .flex.flex-row.items-center.px-3.mt-4(v-if='isKeep')
            //- 狀態
            .flex.flex-row.items-center.pl-1.py-1.pr-2.bg-systemSuccess.rounded-full
              img.w-4.h-4(:src='iconCheckWhite')
              .subtitle3.text-white.ml-1 {{ t("vip_keepReached") }}

            //- 說明
            .body3.text-primary.opacity-40.ml-3 {{ t("vip_keepReachedDescription") }}

          //- 未完成狀態列
          .flex.flex-row.items-center.px-3.mt-4(v-else)
            //- 狀態
            .flex.flex-row.items-center.pl-1.py-1.pr-2.bg-keep-progress.rounded-full
              .subtitle3.text-white.ml-1 {{ t("vip_keepProgress") }}

            //- 說明
            .body3.text-primary.opacity-40.ml-3 {{ t("vip_keepProgressDescription", { time: keepAvailable }) }}

          //- 當月有效流水
          .flex.flex-row.items-center.px-3.mt-3
            //- 標題
            .body2.text-primary {{ t("vip_monthlyBalance") }}

            //- 當月流水
            .subtitle2.text-primary.ml-1 {{ totalBetAmount }}

            //- 保級流水
            .body3.text-primary.opacity-40.ml-1
              span /
              span.ml-1 {{ keepBetAmount }}

      //- 專屬特權標題
      .flex.flex-row.items-center.mx-6.mt-6
        //- 標題
        .subtitle1.text-primary.opacity-60 {{ t("vip_sepcial") }}

        //- 提示
        BasicButton.rounded-full.ml-2(@click='handleSpecialTipClick')
          img.w-4.h-4(:src='iconInfoPrimary40')

      //- 專屬特權列表
      .flex.flex-col.items-stretch.mt-4.mx-6.bg-white-card
        //- 返水物件列表
        .grid.grid-cols-3.gap-3.px-6.pt-4
          //- 返水物件
          .flex.flex-col.items-center(v-for='platform in simplePlatformList')
            //- 平台
            .body3.bg-simple-return-platform-red.rounded-full.px-4.py-1(v-if='platform.red') {{ platform.name }}
            .body3.bg-simple-return-platform-yellow.rounded-full.px-4.py-1(v-else) {{ platform.name }}

            //- 每日/次數
            .text-primary.mt-2(v-if='platform.countPerDay')
              span.caption {{ t("vip_perDay") }}
              span.ml-px
              span.body1.ml-px {{ platform.countPerDay }}
              span.ml-px
              span.caption.ml-px {{ t("vip_count") }}

            //- 每日/金額
            .text-primary.mt-2(v-else-if='platform.tenThousandPerDay')
              span.caption {{ t("vip_perDay") }}
              span.ml-px
              span.body1.ml-px {{ platform.tenThousandPerDay }}
              span.ml-px
              span.caption.ml-px {{ t("vip_tenThousand") }}

            //- 返水比例
            .text-primary.mt-2(v-else)
              span.body1 {{ platform.refund }}
              span.ml-px
              span.caption.ml-px %

            //- 狀態
            .body3.text-primary.opacity-20.mt-2 {{ platform.status }}

        //- 展開返水物件
        BasicButton.rounded-card.mt-6(@click='handleSimpleReturnExpandClick')
          .body3.text-primary.opacity-60.p-2 
            span(v-if='simplePlatformListExpanded') {{ t("vip_expand") }}
            span(v-else) {{ t("vip_collapse") }}

      //- 專屬獎勵標題
      .flex.flex-row.items-center.mx-6.mt-6
        //- 標題
        .subtitle1.text-primary.opacity-60 {{ t("vip_reward") }}

        //- 提示
        BasicButton.rounded-full.ml-2(@click='handleRewardTipClick')
          img.w-4.h-4(:src='iconInfoPrimary40')

      //- 專屬獎勵列表
      .flex.flex-row.flex-nowrap.items-stretch.mt-4.px-4.overflow-x-auto
        //- VIP1 晉級禮金
        RewardItem(
          :level='upgradeGiftItem.vipLevel',
          type='black',
          :bg='iconVipCrownBg',
          :name='t("vip_rewardUpgrade")',
          :icon='iconVipCrownGold',
          :amount='upgradeGiftItem.money',
          :status='upgradeGiftItem.status',
          :loading='postingUpgradeGift',
          @click-receive='handleReceiveUpgradeGiftClick'
        )

        //- VIP5 月度禮金
        RewardItem(
          :level='monthlyGiftItem.vipLevel',
          type='gold',
          :bg='iconVipCoinBg',
          :name='t("vip_rewardMonth")',
          :icon='iconVipCoinDark',
          :amount='monthlyGiftItem.money',
          :status='monthlyGiftItem.status',
          :loading='postingMonthlyGift',
          @click-receive='handleReceiveMonthlyGiftClick'
        )

        //- VIP3 週年禮金
        RewardItem(
          :level='yearlyGiftItem.vipLevel',
          type='black',
          :bg='iconVipCoinBg',
          :name='t("vip_rewardYear")',
          :icon='iconVipCoinGold',
          :amount='yearlyGiftItem.money',
          :status='yearlyGiftItem.status',
          :loading='postingYearlyGift',
          @click-receive='handleReceiveYearlyGiftClick'
        )

        //- VIP6 生日禮品
        RewardItem(:level='currentLevel', type='gold', :bg='iconVipGiftBg', :name='t("vip_rewardBirthday")', :icon='iconVipGiftDark', :image='iconVipGiftwhite', :status='birthdayGiftStatus')

      //- 返水優惠標題
      .flex.flex-row.items-center.mx-6.mt-6
        //- 標題
        .subtitle1.text-primary.opacity-60 {{ t("vip_returnPromotion") }}

        //- 提示
        BasicButton.rounded-full.ml-2(@click='handleReturnTipClick')
          img.w-4.h-4(:src='iconInfoPrimary40')

      //- 返水優惠卡片
      .flex.flex-col.items-stretch.bg-white-card.mt-4.mx-6.pb-4
        //- 返水優惠內容
        .flex.flex-col.items-stretch(v-for='platform in platformList')
          //- 返水優惠縮合資訊
          BasicButton.rounded-card(content='stretch', @click='handlePlatformItemClick(platform)')
            //- 縮合資訊內容
            .grid.grid-cols-return-platform.items-center.gap-2.px-6.py-4
              //- 箭頭圖示
              img.w-3.h-3(v-if='platform.expanded', :src='iconArrowUpPrimary40')
              img.w-3.h-3(v-else, :src='iconArrowDownPrimary40')

              //- 平台圖示與數量
              .relative.pr-3
                img.z-10.w-8.h-8(:src='platform.icon', @error='errorImg')
                .absolute.z-20.bottom-0.right-0.subtitle3.text-white.bg-return-platform-count(v-if='platform.count') {{ platform.count }}

              //- 平台名稱
              .body2.text-primary.text-left.opacity-60.px-2 {{ t("vip_returnPlatform", { platform: platform.name }) }}

              //- 返水金額
              .subtitle2.text-accent(v-if='platform.amount') {{ commaFormat(platform.amount) }}
              .subtitle2.text-primary.opacity-60(v-else) ¥ -

          //- 返水優惠展開資訊
          .flex.flex-col.items-stretch(v-if='platform.expanded')
            //- 返水資訊
            .grid.grid-cols-2.gap-3.px-6.mt-2
              //- 返水比例
              .body3.text-black.text-left
                span {{ t("vip_returnPercent") }}
                span.opacity-60.ml-2 {{ platform.refund }}
                span.opacity-60 %

              //- 流水倍數
              .body3.text-black.text-left
                span {{ t("vip_returnBalancePercent") }}
                span.opacity-60.ml-2 {{ platform.multiple }}

              //- 使用限制
              .body3.text-black.text-left
                span {{ t("vip_returnRule") }}
                span.opacity-60.ml-2 {{ platform.rule }}

            //- 領取該平台
            BasicButton.mt-4.mx-6(v-if='platform.amount', :loading='platform.loading', size='medium', textColor='accent', border='accent100', @click='handleReceivePlatformClick(platform)')
              .subtitle3 
                span {{ t("vip_returnReceive") }}
                span {{ platform.name }}

            //- 尚未結算
            BasicButton.mt-4.mx-6.opacity-40(v-else, size='medium', textColor='accent', border='accent100')
              .subtitle3 {{ t("vip_returnUnsettle") }}

            //- 返水物件列表
            .flex.flex-col.items-stretch.bg-return-item(v-for='(item, index) in platform.refundList', :class='{ "mt-6": index === 0 }')
              //- 返水物件內容
              .grid.grid-cols-return-item.items-stretch.gap-4
                //- 返水資訊
                .grid.grid-cols-2.gap-x-6.gap-y-4.pl-6.pr-2.py-6
                  //- 編號與日期
                  .flex.flex-row.items-center
                    //- 編號
                    .subtitle3.text-white.bg-primary40.rounded-full.px-1 {{ index }}

                    //- 日期
                    .body3.text-black.ml-2 {{ item.createdAt }}

                  //- 返水金額
                  .subtitle3.text-accent {{ commaFormat(item.money) }}

                  //- 返水比例
                  .body3.text-black
                    span {{ t("vip_returnPercent") }}
                    span.opacity-60.ml-2 {{ item.refund }}
                    span.opacity-60 %

                  //- 流水倍數
                  .body3.text-black
                    span {{ t("vip_returnBalancePercent") }}
                    span.opacity-60.ml-2 {{ item.multiple }}

                  //- 使用限制
                  .body3.text-black
                    span {{ t("vip_returnRule") }}
                    span.opacity-60.ml-2 {{ item.rule }}

                //- 立即領取
                BasicButton(:loading='item.loading', size='medium', bg='primary5', @click='handleReceiveRefundItemClick(item)')
                  .body3.text-primary.opacity-60.whitespace-pre-wrap {{ t("vip_returnReceiveNow") }}

              //- 分隔線
              .h-px.bg-primary5

        //- 一鍵全領
        BasicButton.mt-4.mx-6(
          :loading='postingGiftAll',
          :disabled='postingRefund',
          :class='{ "opacity-20": false }',
          bg='accent100',
          size='medium',
          textColor='white',
          @click='handleReceiveAllGiftClick'
        )
          .subtitle3 {{ t("vip_receiveAll") }}

      //- 訂製服務標題
      .flex.flex-row.items-center.mx-6.mt-6
        //- 標題
        .subtitle1.text-primary.opacity-60 {{ t("vip_custom") }}

        //- 提示
        BasicButton.rounded-full.ml-2(@click='handleCustomTipClick')
          img.w-4.h-4(:src='iconInfoPrimary40')

      //- 訂製服務列表
      .grid.grid-cols-2.gap-4.mt-4.mx-6
        //- 私人客服
        .flex.flex-col.items-center.bg-white-card.px-6.py-4
          .subtitle2.text-gold {{ t("vip_custom1") }}
          img.w-22.h-22.mt-4(:src='iconVipCustom1')
          .body3.text-gold.opacity-80.mt-2 {{ t("vip_customLevel") }}

        //- 訂製域名
        .flex.flex-col.items-center.bg-white-card.px-6.py-4
          .subtitle2.text-gold {{ t("vip_custom2") }}
          img.w-22.h-22.mt-4(:src='iconVipCustom2')
          .body3.text-gold.opacity-80.mt-2 {{ t("vip_customLevel") }}

        //- 存款通道
        .flex.flex-col.items-center.bg-white-card.px-6.py-4
          .subtitle2.text-gold {{ t("vip_custom3") }}
          img.w-22.h-22.mt-4(:src='iconVipCustom3')
          .body3.text-gold.opacity-80.mt-2 {{ t("vip_customLevel") }}

        //- 品牌邀約
        .flex.flex-col.items-center.bg-white-card.px-6.py-4
          .subtitle2.text-gold {{ t("vip_custom4") }}
          img.w-22.h-22.mt-4(:src='iconVipCustom4')
          .body3.text-gold.opacity-80.mt-2 {{ t("vip_customLevel") }}

  //- 晉升動畫
  UpgradePopup(:vip-data='vipData', :gift-list='giftList', :level-list='levelList')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { PullRefresh, Loading, Progress, Dialog, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { getMe } from '@/api/member/member';
  import { errorImg, staticImgUrl, levelImg, levelProgressColor, commaFormat } from '@/utils';
  import { getVipInfo, getVipGift, getVipSetting, postVipGift, postVipGiftType, postVipGiftAll, postVipGiftRead } from '@/api/member/vip';
  import Nav from '@/components/vip/Nav.vue';
  import RewardItem from '@/components/vip/RewardItem.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import UpgradePopup from '@/components/vip/UpgradePopup.vue';
  import dayjs from 'dayjs';
  import type { MeData } from '@/api/member/model/member-model';
  import type { GetVipInfoResponseData, GiftItem, LevelItem } from '@/api/member/model/vip-model';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
  const iconInfoPrimary40 = staticImgUrl('icon-info-primary40.svg');
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');
  const iconCheckWhite = staticImgUrl('icon-check-white.svg');
  const iconVipCoinBg = staticImgUrl('icon-vip-coin-bg.svg');
  const iconVipCoinDark = staticImgUrl('icon-vip-coin-dark.svg');
  const iconVipCoinGold = staticImgUrl('icon-vip-coin-gold.svg');
  const iconVipCrownBg = staticImgUrl('icon-vip-crown-bg.svg');
  const iconVipCrownGold = staticImgUrl('icon-vip-crown-gold.svg');
  const iconVipGiftBg = staticImgUrl('icon-vip-gift-bg.svg');
  const iconVipGiftDark = staticImgUrl('icon-vip-gift-dark.svg');
  const iconVipGiftwhite = staticImgUrl('icon-vip-gift-white.svg');
  const iconArrowDownPrimary40 = staticImgUrl('icon-arrow-down-primary40.svg');
  const iconArrowUpPrimary40 = staticImgUrl('icon-arrow-up-primary40.svg');
  const iconVipPlatform1 = staticImgUrl('icon-vip-platform1.svg');
  const iconVipPlatform2 = staticImgUrl('icon-vip-platform2.svg');
  const iconVipPlatform3 = staticImgUrl('icon-vip-platform3.svg');
  const iconVipPlatform4 = staticImgUrl('icon-vip-platform4.svg');
  const iconVipPlatform5 = staticImgUrl('icon-vip-platform5.svg');
  const iconVipCustom1 = staticImgUrl('icon-vip-custom1.png');
  const iconVipCustom2 = staticImgUrl('icon-vip-custom2.png');
  const iconVipCustom3 = staticImgUrl('icon-vip-custom3.png');
  const iconVipCustom4 = staticImgUrl('icon-vip-custom4.png');

  /**
   * Refund item
   */
  interface RefundItem extends GiftItem {
    loading: boolean;
    refund: number;
    multiple: number;
    rule: string;
  }

  /**
   * Platform item
   */
  interface PlatformItem {
    loading: boolean;
    expanded: boolean;
    gameType: number;
    count: number;
    amount: number;
    refund: number;
    multiple: number;
    name: string;
    rule: string;
    icon: string;
    status: string;
    refundList: RefundItem[];
  }

  /**
   * Simple platform item
   */
  interface SimplePlatformItem {
    red?: boolean;
    id: number;
    refund?: number;
    countPerDay?: number;
    tenThousandPerDay?: number;
    name: string;
    status: string;
  }

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Expanded platform ids
   */
  const expandedPlatformIds = ref<number[]>([]);

  /**
   * Posting platform ids
   */
  const postingPlatformIds = ref<number[]>([]);

  /**
   * Posting refund ids
   */
  const postingRefundIds = ref<number[]>([]);

  /**
   * Get me data loading status
   */
  const gettingMeData = ref(false);

  /**
   * Posting gift all
   */
  const postingGiftAll = ref(false);

  /**
   * Posting upgrade gift status
   */
  const postingUpgradeGift = ref(false);

  /**
   * Posting monthly gift status
   */
  const postingMonthlyGift = ref(false);

  /**
   * Posting yearly gift status
   */
  const postingYearlyGift = ref(false);

  /**
   * Get vip data loading status
   */
  const getVipDataLoading = ref(false);

  /**
   * Get vip gift loading status
   */
  const getVipGiftLoading = ref(false);

  /**
   * Get vip setting loading status
   */
  const getVipLevelListLoading = ref(false);

  /**
   * Vip data
   */
  const vipData = ref<GetVipInfoResponseData>({});

  /**
   * Gift list
   */
  const giftList = ref<GiftItem[]>([]);

  /**
   * Level list
   */
  const levelList = ref<LevelItem[]>([]);

  /**
   * Simple platform list expanded
   */
  const simplePlatformListExpanded = ref(false);

  /**
   * Refreshing
   */
  const refreshing = computed(() => {
    return gettingMeData.value || getVipDataLoading.value || getVipGiftLoading.value || getVipLevelListLoading.value;
  });

  /**
   * Current level
   */
  const currentLevel = computed(() => {
    return vipData.value.current?.level || 0;
  });

  /**
   * Next level
   */
  const nextLevel = computed(() => {
    return vipData.value.next?.level || 0;
  });

  /**
   * current level string
   */
  const currentLevelStr = computed(() => {
    return `VIP ${currentLevel.value}`;
  });

  /**
   * Next level string
   */
  const nextLevelStr = computed(() => {
    return `VIP ${nextLevel.value}`;
  });

  /**
   * Level image source
   */
  const levelImgSrc = computed(() => {
    return levelImg(currentLevel.value);
  });

  /**
   * Level progress color
   */
  const levelProgressColour = computed(() => {
    return levelProgressColor(currentLevel.value);
  });

  /**
   * Keep available
   */
  const keepAvailable = computed(() => {
    const today = dayjs();
    const endOfMonth = today.add(today.daysInMonth() - today.date(), 'day');
    return endOfMonth.format('YYYY/MM/DD');
  });

  /**
   * Total bet amount
   */
  const totalBetAmount = computed(() => {
    return commaFormat(vipData.value.totalBetAmount);
  });

  /**
   * Upgrade bet amount
   */
  const upgradeBetAmount = computed(() => {
    return commaFormat(vipData.value.current?.upgradeBetAmount, true);
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
   * Is keep
   */
  const isKeep = computed(() => {
    return vipData.value?.isKeep == true;
  });

  /**
   * Keep bet amount
   */
  const keepBetAmount = computed(() => {
    return commaFormat(vipData.value.current?.keepBetAmount, true);
  });

  /**
   * Upgrade gift item
   */
  const upgradeGiftItem = computed<GiftItem>(() => {
    // Find gift that can receive
    const canReceive = giftList.value.find((element) => {
      return element.type == 2 && element.status == 2;
    });
    if (canReceive) {
      return canReceive;
    }

    // Find next level upgrade amount
    const nextLevel = vipData.value.next?.level || 0;
    const nextAmount = vipData.value.next?.upgradeGift || 0;
    return {
      vipLevel: nextLevel,
      money: nextAmount,
      status: -1,
    };
  });

  /**
   * Monthly gift item
   */
  const monthlyGiftItem = computed<GiftItem>(() => {
    // Find gift that can receive
    const canReceive = giftList.value.find((element) => {
      return element.type == 1 && element.status == 2;
    });
    if (canReceive) {
      return canReceive;
    }

    // Find next level upgrade amount
    const nextLevel = vipData.value.next?.level || 0;
    const nextAmount = vipData.value.next?.monthlyGift || 0;
    return {
      vipLevel: nextLevel,
      money: nextAmount,
      status: -1,
    };
  });

  /**
   * Yearly gift item
   */
  const yearlyGiftItem = computed<GiftItem>(() => {
    // Find gift that can receive
    const canReceive = giftList.value.find((element) => {
      return element.type == 3 && element.status == 2;
    });
    if (canReceive) {
      return canReceive;
    }

    // Find next level upgrade amount
    const nextLevel = vipData.value.next?.level || 0;
    const nextAmount = vipData.value.next?.anniversaryGift || 0;
    return {
      vipLevel: nextLevel,
      money: nextAmount,
      status: -1,
    };
  });

  /**
   * Birthday gift status
   */
  const birthdayGiftStatus = computed(() => {
    const birthdayStr = meData.value?.birthday || '';
    if (birthdayStr.length <= 0) {
      return -98;
    }
    try {
      const today = dayjs();
      const birthday = dayjs(meData.value?.birthday || '', 'YYYY-MM-DD');
      if (birthday.month() == today.month() && birthday.date() == today.date()) {
        return -99;
      }
    } catch (e) {}
    try {
      const today = dayjs();
      const birthday = dayjs(meData.value?.birthday || '', 'YYYY-MM-DD HH:mm:ss');
      if (birthday.month() == today.month() && birthday.date() == today.date()) {
        return -99;
      }
    } catch (e) {}
    return -98;
  });

  /**
   * Platform list
   */
  const platformList = computed<PlatformItem[]>(() => {
    // Compute platform expanded status
    const computeExpanded = (gameType: number) => {
      const index = expandedPlatformIds.value.findIndex((element) => {
        return element == gameType;
      });
      return index >= 0;
    };

    // Compute platform loading status
    const computeLoading = (gameType: number) => {
      const loadingPlatformIndex = postingPlatformIds.value.findIndex((id) => {
        return gameType == id;
      });
      const loadingRefundIndex = postingRefundIds.value.findIndex((id) => {
        const refundItem = giftList.value.find((giftItem) => {
          return giftItem.id == id;
        });
        return refundItem && refundItem.gameType == gameType;
      });
      return postingGiftAll.value || loadingPlatformIndex >= 0 || loadingRefundIndex >= 0;
    };

    // Compute platform refund count
    const computeCount = (gameType: number) => {
      const list = giftList.value.filter((element) => {
        return element.type == 4 && element.gameType == gameType;
      });
      return list.length;
    };

    // Compute platform refund amount
    const computeAmount = (gameType: number) => {
      return giftList.value.reduce((acc, curr) => {
        if (curr.type == 4 && curr.gameType == gameType) {
          return acc + (curr.money || 0);
        } else {
          return acc;
        }
      }, 0);
    };

    // Compute platform refund list
    const computeRefundList = (gameType: number) => {
      return giftList.value
        .filter((giftItem) => {
          return giftItem.type == 4 && giftItem.gameType == gameType;
        })
        .map<RefundItem>((giftItem) => {
          const loadingPlatformIndex = postingPlatformIds.value.findIndex((id) => {
            return gameType == id;
          });
          const loadingRefundIndex = postingRefundIds.value.findIndex((id) => {
            return giftItem.id == id;
          });
          const level = levelList.value.find((levelItem) => {
            return levelItem.level == giftItem.vipLevel;
          });
          let refund = 0;
          if (level) {
            if (gameType == 1) {
              refund = level.sportRefund || 0;
            } else if (gameType == 2) {
              refund = level.personRefund || 0;
            } else if (gameType == 3) {
              refund = level.electronicRefund || 0;
            } else if (gameType == 4) {
              refund = level.lotteryRefund || 0;
            } else if (gameType == 5) {
              refund = level.esportRefund || 0;
            }
          }
          let createdAt;
          try {
            createdAt = dayjs(giftItem.createdAt || '', 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD');
          } catch (e) {
            createdAt = giftItem.createdAt || '';
          }
          return {
            ...giftItem,
            rule: '-',
            refund,
            createdAt,
            multiple: 1,
            loading: postingGiftAll.value || loadingPlatformIndex >= 0 || loadingRefundIndex >= 0,
          };
        });
    };

    // Return platform list
    return [
      {
        gameType: 1,
        multiple: 1,
        rule: '-',
        name: t('vip_returnPlatform1'),
        status: t('vip_returnActived'),
        icon: iconVipPlatform1,
        count: computeCount(1),
        amount: computeAmount(1),
        expanded: computeExpanded(1),
        loading: computeLoading(1),
        refund: vipData.value?.current?.sportRefund || 0,
        refundList: computeRefundList(1),
      },
      {
        gameType: 2,
        multiple: 1,
        rule: '-',
        name: t('vip_returnPlatform2'),
        status: t('vip_returnActived'),
        icon: iconVipPlatform2,
        count: computeCount(2),
        amount: computeAmount(2),
        expanded: computeExpanded(2),
        loading: computeLoading(2),
        refund: vipData.value?.current?.personRefund || 0,
        refundList: computeRefundList(2),
      },
      {
        gameType: 5,
        multiple: 1,
        rule: '-',
        name: t('vip_returnPlatform5'),
        status: t('vip_returnActived'),
        icon: iconVipPlatform5,
        count: computeCount(5),
        amount: computeAmount(5),
        expanded: computeExpanded(5),
        loading: computeLoading(5),
        refund: vipData.value?.current?.esportRefund || 0,
        refundList: computeRefundList(5),
      },
      {
        gameType: 3,
        multiple: 1,
        rule: '-',
        name: t('vip_returnPlatform3'),
        status: t('vip_returnActived'),
        icon: iconVipPlatform3,
        count: computeCount(3),
        amount: computeAmount(3),
        expanded: computeExpanded(3),
        loading: computeLoading(3),
        refund: vipData.value?.current?.electronicRefund || 0,
        refundList: computeRefundList(3),
      },
      {
        gameType: 4,
        multiple: 1,
        rule: '-',
        name: t('vip_returnPlatform4'),
        status: t('vip_returnActived'),
        icon: iconVipPlatform4,
        count: computeCount(4),
        amount: computeAmount(4),
        expanded: computeExpanded(4),
        loading: computeLoading(4),
        refund: vipData.value?.current?.lotteryRefund || 0,
        refundList: computeRefundList(4),
      },
    ];
  });

  /**
   * Simple platform list
   */
  const simplePlatformList = computed(() => {
    const withdrawAmountLimit = vipData.value.current?.withdrawAmountLimit || 0;
    const tenThousandWithdrawAmountLimit = withdrawAmountLimit / 10000;
    return platformList.value
      .filter((element, index) => {
        if (simplePlatformListExpanded.value) {
          return true;
        } else {
          return index < 3;
        }
      })
      .map<SimplePlatformItem>((element) => {
        return {
          id: element.gameType,
          name: `${element.name}${t('vip_return')}`,
          refund: element.refund,
          status: element.status,
        };
      })
      .concat(
        simplePlatformListExpanded.value
          ? [
              {
                red: true,
                id: -1,
                name: t('vip_withdrawalLimit'),
                status: t('vip_active'),
                tenThousandPerDay: tenThousandWithdrawAmountLimit,
              },
            ]
          : []
      )
      .concat(
        simplePlatformListExpanded.value
          ? [
              {
                red: true,
                id: -1,
                name: t('vip_withdrawalCount'),
                status: t('vip_active'),
                countPerDay: vipData.value.current?.withdrawTimesLimit || 0,
              },
            ]
          : []
      );
  });

  /**
   * Posting platform or refund item
   */
  const postingRefund = computed(() => {
    return postingRefundIds.value.length > 0 || postingPlatformIds.value.length > 0;
  });

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn loading on
      gettingMeData.value = true;

      // Get me data
      const meResponse = await getMe();

      // Update me data
      meData.value = meResponse?.data?.data || {};
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      gettingMeData.value = false;
    }
  };

  /**
   * Get vip data
   */
  const getVipData = async () => {
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
  };

  /**
   * Get vip gift list
   */
  const getVipGiftList = async () => {
    try {
      // Turn on loading status
      getVipGiftLoading.value = true;

      // Get vip gift
      const response = await getVipGift();

      // Update gift list
      giftList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getVipGiftLoading.value = false;
    }
  };

  /**
   * Get vip level list
   */
  const getVipLevelList = async () => {
    try {
      // Turn on loading status
      getVipLevelListLoading.value = true;

      // Get vip setting
      const response = await getVipSetting();

      // Update level list
      levelList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Turn off loading status
      getVipLevelListLoading.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getMeData();
    getVipData();
    getVipGiftList();
    getVipLevelList();
  };

  /**
   * Handle level tip button clicked
   */
  const handleLevelTipClick = () => {
    const current = t('vip_currentMonthLevel') + ' ' + currentLevelStr.value;
    const update = t('vip_levelUpdateDate');
    const message = `${current}\n${update}`;
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      message,
      confirmButtonText: t('vip_known'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * Handle keep tip button clicked
   */
  const handleKeepTipClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      title: t('vip_keepTipTitle'),
      message: t('vip_keepTipMessage'),
      confirmButtonText: t('vip_known'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * Handle special tip button clicked
   */
  const handleSpecialTipClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      message: t('vip_sepcialTip'),
      confirmButtonText: t('vip_known'),
      cancelButtonText: t('vip_levelDescription'),
      showConfirmButton: true,
      showCancelButton: true,
    })
      .then(() => {})
      .catch(() => {
        window.location.href = String(ENV.VITE_VIP_CLUB_URL);
      });
  };

  /**
   * Handle simple return expand buton clicked
   */
  const handleSimpleReturnExpandClick = () => {
    simplePlatformListExpanded.value = !simplePlatformListExpanded.value;
  };

  /**
   * Handle reward tip button clicked
   */
  const handleRewardTipClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      message: t('vip_rewardTip'),
      confirmButtonText: t('vip_known'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * Handle receive upgrade gift button clicked
   */
  const handleReceiveUpgradeGiftClick = async () => {
    try {
      // Turn on loading status
      postingUpgradeGift.value = true;

      // Post gift
      await postVipGift({
        id: upgradeGiftItem.value.id,
      });

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      postingUpgradeGift.value = false;
    }
  };

  /**
   * Handle receive monthly gift button clicked
   */
  const handleReceiveMonthlyGiftClick = async () => {
    try {
      // Turn on loading status
      postingMonthlyGift.value = true;

      // Post gift
      await postVipGift({
        id: monthlyGiftItem.value.id,
      });

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      postingMonthlyGift.value = false;
    }
  };

  /**
   * Handle receive yearly gift button clicked
   */
  const handleReceiveYearlyGiftClick = async () => {
    try {
      // Turn on loading status
      postingYearlyGift.value = true;

      // Post gift
      await postVipGift({
        id: yearlyGiftItem.value.id,
      });

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      postingYearlyGift.value = false;
    }
  };

  /**
   * Handle return tip button clicked
   */
  const handleReturnTipClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      message: t('vip_returnTip'),
      confirmButtonText: t('vip_known'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * Handle platform item clicked
   */
  const handlePlatformItemClick = (item: PlatformItem) => {
    const index = expandedPlatformIds.value.findIndex((element) => element == item.gameType);
    if (index >= 0) {
      expandedPlatformIds.value.splice(index, 1);
    } else {
      expandedPlatformIds.value = expandedPlatformIds.value.concat(item.gameType);
    }
  };

  /**
   * Handle receive platform clicked
   */
  const handleReceivePlatformClick = async (item: PlatformItem) => {
    try {
      // Turn on loading status
      const index = postingPlatformIds.value.findIndex((element) => element == item.gameType);
      if (index < 0) {
        postingPlatformIds.value = postingPlatformIds.value.concat(item.gameType);
      }

      // Post gift type
      await postVipGiftType({
        type: item.gameType,
      });

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      const index = postingPlatformIds.value.findIndex((element) => element == item.gameType);
      if (index >= 0) {
        postingPlatformIds.value.splice(index, 1);
      }
    }
  };

  /**
   * Handle receive all gift clicked
   */
  const handleReceiveAllGiftClick = async () => {
    try {
      // Turn on loading status
      postingGiftAll.value = true;

      // Post gift all
      await postVipGiftAll();

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      postingGiftAll.value = false;
    }
  };

  /**
   * Handle receive refund item clicked
   */
  const handleReceiveRefundItemClick = async (item: RefundItem) => {
    try {
      // Turn on loading status
      const index = postingRefundIds.value.findIndex((element) => element == item.id);
      if (index < 0) {
        postingRefundIds.value = postingRefundIds.value.concat(item.id || -1);
      }

      // Post gift
      await postVipGift({
        id: item.id,
      });

      // Refresh gift list
      await getVipGiftList();

      // Notify receive success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('vip_returnReceiveSuccess'),
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn off loading status
      const index = postingRefundIds.value.findIndex((element) => element == item.id);
      if (index >= 0) {
        postingRefundIds.value.splice(index, 1);
      }
    }
  };

  /**
   * Handle custom tip button clicked
   */
  const handleCustomTipClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      message: t('vip_customTip'),
      confirmButtonText: t('vip_known'),
      showConfirmButton: true,
      showCancelButton: false,
    }).then(() => {});
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMeData();
    getVipData();
    getVipGiftList();
    getVipLevelList();
  });
</script>

<style scoped lang="scss">
  .rounded-card {
    border-radius: 12px;
  }

  .bg-vip {
    background-color: #f5f5f5;
  }

  .bg-white-card {
    background: #ffffff;
    box-shadow: 0px 2px 6px rgba(7, 31, 68, 0.1);
    border-radius: 12px;
  }

  .bg-keep {
    background: rgba(7, 31, 68, 0.03);
    border-radius: 8px;
  }

  .bg-keep-progress {
    background: linear-gradient(90deg, #eccc95 0%, #ac8954 100%);
  }

  .bg-simple-return-platform-red {
    color: rgba(240, 69, 58, 0.8);
    background: rgba(240, 69, 58, 0.05);
  }

  .bg-simple-return-platform-yellow {
    color: #bc8533;
    background: #fffaec;
  }

  .bg-return-platform-count {
    padding: 0px 6px;
    background: #f0453a;
    border-radius: 100px;
  }

  .bg-primary5 {
    background: rgba(7, 31, 68, 0.05);
  }

  .bg-primary40 {
    background: rgba(7, 31, 68, 0.4);
  }

  .bg-return-item {
    background-color: #f9f9f9;
  }

  .text-gold {
    color: #d8b782;
  }

  .grid-cols-level-title {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-level-progress {
    grid-template-columns: auto 1fr auto;
  }

  .grid-cols-return-platform {
    grid-template-columns: auto auto 1fr auto;
  }

  .grid-cols-return-item {
    grid-template-columns: 1fr auto;
  }
</style>
