<template lang="pug">
//- 注單頁面
.flex.flex-col.flex-grow.items-stretch.bg-bet
  //- 背景
  .absolute.z-10.left-0.top-0.right-0
    svg.w-full.h-full(viewBox='0 0 414 258', preserveAspectRatio='none')
      path(d='M0 0H414V237C414 237 387.5 258 207 258C26.5 258 0 237 0 237V0Z', fill='#071F44')

  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0(:time='time', @clickTime='handleTimeClick')

  //- 導覽欄(relative)
  Nav.relative.z-20

  //- 下拉刷新
  PullRefresh.relative.z-20.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 頁面內容
    .flex.flex-col.items-stretch.pb-6
      //- 刷新資訊
      .relative.z-20.flex.flex-col.items-center.px-4
        .body2.text-white.opacity-30 {{ t("bet_lastUpdate", { minute: refreshTimeMinutes }) }}

      //- 統計資訊
      .relative.z-20.grid.gird-cols-statistics.gap-4.items-center.px-4.mt-3
        //- 總筆數
        .flex.flex-col.items-center.w-28
          .body2.text-white.opacity-60 总笔数
          .headline1.text-white.mt-1 {{ count }}

        //- 分隔線
        .w-px.h-12.bg-white.opacity-20

        //- 金額資訊
        .grid.gird-cols-amount.gap-2.items-center
          //- 總流水
          .body2.text-white.opacity-60 总流水
          .headline2.text-white.text-right {{ commaFormat(totalBetAmount) }}

          //- 總輸贏
          .body2.text-white.opacity-60 总输赢
          .headline2.text-white.text-right {{ commaFormat(totalWinAmount) }}

      //- 沒有注單
      .mt-64.flex.flex-col.items-center(v-if='empty')
        //- 圖示
        img.w-18.h-18(:src='iconEmptyBet')

        //- 提示
        .mt-6.body2.text-primary.opacity-40 {{ t("bet_empty") }}

      //- 注單列表
      .mt-5.px-4.flex.flex-col.items-stretch(v-else)
        //- 注單物件
        .flex.flex-col.items-stretch.bg-white.rounded.px-4.pt-3.pb-5.my-1(v-for='item in logList', @click='handleBetClick(item)')
          //- 平台資訊
          .grid.gird-cols-platform.gap-2.items-center
            //- 平台圖示
            img.w-8.h-8.bg-primary.rounded-full

            //- 平台名稱
            .headline3.text-primary {{ item.gameGroup }}

            //- 箭頭圖示
            img.w-4.h-4(:src='iconArrowRightPrimary40')

          //- 統計資訊
          .grid.gird-cols-statistics.gap-4.items-center.mt-3
            //- 總筆數
            .flex.flex-col.items-center.w-28
              .body3.text-primary.opacity-40 总笔数
              .headline2.text-primary.mt-1 {{ item.count }}

            //- 分隔線
            .w-px.h-12.bg-primary.opacity-10

            //- 金額資訊
            .grid.gird-cols-amount.gap-2.items-center
              //- 總流水
              .body3.text-primary.opacity-40 总流水
              .subtitle1.text-primary.text-right {{ commaFormat(item.stake) }}

              //- 總輸贏
              .body3.text-primary.opacity-40 总输赢
              .subtitle1.text-primary.text-right {{ commaFormat(item.winAmount) }}

      //- Extra padding prevent refresh button
      .h-52

    //- 標籤列(relative)
    BasicTabBar.opacity-0(:fixed='false')

  //- 標籤列(fixed)
  BasicTabBar(:fixed='true')

  //- 刷新按鈕
  RefreshButton.fixed.z-30.bottom-20.right-5(@click='handleRefresh')

  //- 時間彈窗
  TimePopup(v-model:show='showTimePopup', :selected='time', :list='timeList', @update:selected='handleUpdateSelectedTime')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { PullRefresh } from 'vant';
  import { getGameLogList } from '@/api/game/log';
  import { LocalStorageKeys } from '@/utils/constants';
  import { staticImgUrl, commaFormat, authorized } from '@/utils';
  import Nav from '@/components/bet/ListNav.vue';
  import TimePopup from '@/components/bet/TimePopup.vue';
  import BasicTabBar from '@/components/tab-bar/BasicTabBar.vue';
  import RefreshButton from '@/components/button/RefreshButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { GameLogListItem } from '@/api/game/model/log-model';

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');
  const iconEmptyBet = staticImgUrl('icon-empty-bet.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Time list
   */
  const timeList = ref([
    {
      id: 0,
      name: t('common_24hour'),
    },
    {
      id: 1,
      name: t('common_48hour'),
    },
    {
      id: 2,
      name: t('common_1week'),
    },
    {
      id: 3,
      name: t('common_1month'),
    },
  ]);

  /**
   * Time
   */
  const time = ref(timeList.value[0]);

  /**
   * Show time popup
   */
  const showTimePopup = ref(false);

  /**
   * Total count
   */
  const count = ref(0);

  /**
   * Total amount
   */
  const totalBetAmount = ref(0);

  /**
   * Total balance
   */
  const totalWinAmount = ref(0);

  /**
   * Log list
   */
  const logList = ref<GameLogListItem[]>([]);

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Refresh time interval
   */
  const refreshTimeInterval = ref<NodeJS.Timeout>();

  /**
   * Refresh time
   */
  const refreshTime = ref<Dayjs>();

  /**
   * Refresh time in minutes
   */
  const refreshTimeMinutes = ref(0);

  /**
   * Log list empty
   */
  const empty = computed(() => {
    return logList.value.length == 0;
  });

  /**
   * Start refresh time interval
   */
  const startRefreshTimeInterval = () => {
    refreshTimeInterval.value = setInterval(() => {
      if (refreshTime.value) {
        refreshTimeMinutes.value = dayjs().diff(refreshTime.value, 'minute') || 0;
      }
    }, 1000);
  };

  /**
   * Get start time parameter
   */
  const getStartTime = () => {
    if (time.value.id == 0) {
      // 24小時
      return dayjs().add(-24, 'hour').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 1) {
      // 48小時
      return dayjs().add(-48, 'hour').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 2) {
      // 1週
      return dayjs().add(-1, 'week').format('YYYY-MM-DD HH:mm:ss');
    } else if (time.value.id == 3) {
      // 1月
      return dayjs().add(-1, 'month').format('YYYY-MM-DD HH:mm:ss');
    } else {
      // 其他
      return '';
    }
  };

  /**
   * Get end time parameter
   */
  const getEndTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  };

  /**
   * Get log list
   */
  const getLogList = async () => {
    try {
      // Skip if not authorized
      if (!authorized()) {
        logList.value = [];
        count.value = 0;
        totalBetAmount.value = 0;
        totalWinAmount.value = 0;
        refreshTime.value = dayjs();
        return;
      }

      // Turn refreshing on
      refreshing.value = true;

      // Get log list
      const response = await getGameLogList({
        memberID: Number(window.localStorage.getItem(LocalStorageKeys.MEMBER_ID)),
        memberAccount: window.localStorage.getItem(LocalStorageKeys.MEMBER_ACCOUNT) || '',
        startTime: getStartTime(),
        endTime: getEndTime(),
      });

      // Update log list
      logList.value = response.data?.data?.list || [];

      // Update count
      count.value = response.data?.data?.count || 0;

      // Update total bet amount
      totalBetAmount.value = response.data?.data?.totalBetAmount || 0;

      // Update total win amount
      totalWinAmount.value = response.data?.data?.totalWinAmount || 0;

      // Update refresh time
      refreshTime.value = dayjs();
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      refreshing.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getLogList();
  };

  /**
   * Handle time button clicked
   */
  const handleTimeClick = () => {
    showTimePopup.value = true;
  };

  /**
   * Handle update selected time
   */
  const handleUpdateSelectedTime = (selected?: { id: number; name: string }) => {
    time.value = selected || timeList.value[0];
    getLogList();
  };

  /**
   * Handle bet item clicked
   */
  const handleBetClick = (item: GameLogListItem) => {
    router.push({
      path: `/bet/detail/${item.gameGroup}`,
    });
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Get log list
    getLogList();

    // Start refresh time interval
    startRefreshTimeInterval();
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    // Clear refresh time interval
    if (refreshTimeInterval.value) {
      clearInterval(refreshTimeInterval.value);
    }
  });
</script>

<style scoped lang="scss">
  .bg-bet {
    background-color: #f5f5f5;
  }

  .gird-cols-statistics {
    grid-template-columns: auto 1px 1fr;
  }

  .gird-cols-amount {
    grid-template-columns: auto 1fr;
  }

  .gird-cols-platform {
    grid-template-columns: auto 1fr auto;
  }
</style>
