<template lang="pug">
//- 注單詳細頁面
.flex.flex-col.flex-grow.items-stretch.bg-bet
  //- 導覽欄(fixed)
  Nav.fixed.z-30.top-0.left-0.right-0(
    :time='time',
    :settle='settle',
    :totalCount='totalCount',
    :totalBet='totalBet',
    :totalBalance='totalBalance',
    @clickTime='handleTimeClick',
    @update:settle='handleUpdateSettle'
  )

  //- 導覽欄(relative)
  Nav.relative.z-20

  //- 下拉刷新
  PullRefresh.relative.z-20.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 頁面內容
    .flex.flex-col.items-stretch.pb-6
      //- 刷新資訊
      .relative.z-20.flex.flex-col.items-center.px-4.py-2
        .body2.text-primary.opacity-20 {{ t("bet_lastUpdate", { minute: lastUpdateInMinute }) }}

      //- 沒有注單
      .mt-40.flex.flex-col.items-center(v-if='empty')
        //- 圖示
        img.w-18.h-18(:src='iconEmptyBet')

        //- 提示
        .mt-6.body2.text-primary.opacity-40 {{ t("bet_empty") }}

      //- 注單列表
      .px-4.flex.flex-col.items-stretch(v-else)
        //- 注單物件
        .grid.grid-cols-item.gap-2.items-stretch.bg-white.rounded.p-4.mb-1(v-for='item in logList')
          //- 物件左側
          .flex.flex-col.items-stretch
            //- 項目名稱
            .grid.grid-cols-type.gap-2.items-center
              //- 項目圖示
              img.w-8.h-8.bg-primary.rounded-full

              //- 項目名稱
              .headline3.text-primary {{ item.listName }}

            //- 賠率
            .grid.grid-cols-type.gap-2.items-center.mt-2(v-if='getOdds(item)')
              //- 賠率標題
              .body3.text-primary.opacity-40 {{ t("bet_rate") }}

              //- 賠率數值
              .subtitle2.text-primary.text-right {{ getOdds(item) }}

            //- 類型
            .grid.grid-cols-type.gap-2.items-center.mt-1(v-if='getBetType(item)')
              //- 類型標題
              .body3.text-primary.opacity-40 {{ t("bet_type") }}

              //- 類型數值
              .subtitle2.text-primary.text-right {{ getBetType(item) }}

            //- 日期
            .caption.text-primary.opacity-40.mt-6 {{ item.betTime }}

          //- 分隔線
          .w-px.bg-primary.opacity-10

          //- 物件右側側
          .flex.flex-col.items-stretch.pl-2
            //- 投注額數值
            .headline3.text-primary.text-right {{ commaFormat(item.betAmount) }}

            //- 投注額標題
            .body3.text-primary.text-right.opacity-40 {{ t("bet_Bet") }}

            //- 輸贏數值
            .headline3.text-accent.text-right.mt-4 {{ commaFormat(item.winAmount) }}

            //- 輸贏標題
            .body3.text-primary.text-right.opacity-40 {{ t("bet_Balance") }}

            //- 提前結算
            BasicButton.mt-4(v-if='getIsSettle(item) == 1', rounded='normal', content='stretch', @click='handleSettleDetail(item)')
              .w-full.flex.flex-col.items-end
                .grid.grid-cols-sn.items-center
                  .subtitle2.text-primary(v-if='getPreSettleAmount(item) == item.betAmount') {{ t("bet_earlierSettleAll") }}
                  .subtitle2.text-primary(v-else) {{ t("bet_earlierSettlePart") }}
                  img.w-3.h-3(:src='iconArrowRightPrimary40')
                .body3.text-primary.opacity-40 {{ t("bet_earlierSettle") }}

            //- 提前結算
            BasicButton.mt-4(v-else-if='getPreSettleBalance(item)', size='small', border='accent100', rounded='normal', @click='handleEarlierSettle(item)')
              .flex.flex-col.items-center
                //- 標題
                .subtitle3.text-accent {{ t("bet_earlierSettle") }}

                //- 數值
                .body3.text-accent {{ commaFormat(getPreSettleBalance(item)) }}

            //- 序號
            BasicButton.mt-6(rounded='normal', @click='handleCopy(getSn(item))')
              .grid.grid-cols-sn.gap-1.items-center
                //- 數值
                .caption.text-primary.opacity-40 {{ getSn(item) }}

                //- 圖示
                img.w-3.h-3(:src='iconCopyPrimary40')

    //- Extra padding prevent refresh button
    .h-52

    //- 標籤列(relative)
    BasicTabBar.opacity-0(:fixed='false')

  //- 標籤列(fixed)
  BasicTabBar(:fixed='true')

  //- 排序按鈕
  SortButton.fixed.z-30.bottom-20.right-5(@click='handleSort')

  //- 刷新按鈕
  RefreshButton.fixed.z-30.bottom-36.right-5(@click='handleRefresh')

  //- 時間彈窗
  TimePopup(v-model:show='showTimePopup', :selected='time', :list='timeList', @update:selected='handleUpdateSelectedTime')

  //- 結算資訊彈窗
  SettleDetailPopup(v-model:show='showSettleDetailPopup', :item='settleDetailItem')

  //- 提前結算彈窗
  PreSettlePopup(v-model:show='showPreSettlePopup', :item='preSettleItem')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PullRefresh } from 'vant';
  import { getSlotLogList } from '@/api/game/log';
  import { LocalStorageKeys } from '@/utils/constants';
  import { staticImgUrl, commaFormat, copy } from '@/utils';
  import Nav from '@/components/bet/DetailNav.vue';
  import TimePopup from '@/components/bet/TimePopup.vue';
  import BasicTabBar from '@/components/tab-bar/BasicTabBar.vue';
  import SettleDetailPopup from '@/components/bet/SettleDetailPopup.vue';
  import PreSettlePopup from '@/components/bet/PreSettlePopup.vue';
  import SortButton from '@/components/button/SortButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import RefreshButton from '@/components/button/RefreshButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { CombinedLogItem } from '@/api/game/model/log-model';

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');
  const iconCopyPrimary40 = staticImgUrl('icon-copy-primary40.svg');
  const iconEmptyBet = staticImgUrl('icon-empty-bet.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

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
   * Last update in minutes
   */
  const lastUpdateInMinute = ref(0);

  /**
   * Settle
   */
  const settle = ref(0);

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Refresh time
   */
  const refreshTime = ref<Dayjs>();

  /**
   * Refresh time in minutes
   */
  const refreshTimeMinutes = ref(0);

  /**
   * Refresh time interval
   */
  const refreshTimeInterval = ref<NodeJS.Timeout>();

  /**
   * Total count
   */
  const totalCount = ref(0);

  /**
   * Total bet
   */
  const totalBet = ref(0);

  /**
   * Total balance
   */
  const totalBalance = ref(0);

  /**
   * Log list
   */
  const logList = ref<CombinedLogItem[]>([]);

  /**
   * Show settle detail popup
   */
  const showSettleDetailPopup = ref(false);

  /**
   * Show earlier settle popup
   */
  const showPreSettlePopup = ref(false);

  /**
   * Settle detail item
   */
  const settleDetailItem = ref<CombinedLogItem>();

  /**
   * Pre settle item
   */
  const preSettleItem = ref<CombinedLogItem>();

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
   * Get odds
   */
  const getOdds = (item: CombinedLogItem) => {
    if ('odds' in item) {
      return item.odds || 0;
    }
    return 0;
  };

  /**
   * Get bet type
   */
  const getBetType = (item: CombinedLogItem) => {
    if ('betType' in item) {
      return item.betType || '';
    }
    return '';
  };

  /**
   * Get is settle
   */
  const getIsSettle = (item: CombinedLogItem) => {
    if ('isSettle' in item) {
      return item.isSettle || 0;
    }
    return 0;
  };

  /**
   * Get pre settle amount
   */
  const getPreSettleAmount = (item: CombinedLogItem) => {
    if ('preSettleAmount' in item) {
      return item.preSettleAmount || 0;
    }
    return 0;
  };

  /**
   * Get pre settle balance
   */
  const getPreSettleBalance = (item: CombinedLogItem) => {
    if ('preSettleBalance' in item) {
      return item.preSettleBalance || 0;
    }
    return 0;
  };

  /**
   * Get sn
   */
  const getSn = (item: CombinedLogItem) => {
    return '000000';
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
   * Get bet list
   */
  const getLogList = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get log list
      const response = await getSlotLogList({
        memberID: Number(window.localStorage.getItem(LocalStorageKeys.MEMBER_ID)),
        memberAccount: window.localStorage.getItem(LocalStorageKeys.MEMBER_ACCOUNT) || '',
        startTime: getStartTime(),
        endTime: getEndTime(),
      });

      // Update log list
      logList.value = response.data?.data?.list || [];

      // Update count
      totalCount.value = response.data?.data?.count || 0;

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
   * Handle time button clicked
   */
  const handleTimeClick = () => {
    showTimePopup.value = true;
  };

  /**
   * Handle update settle
   */
  const handleUpdateSettle = (value: number) => {
    settle.value = value;
    getLogList();
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getLogList();
  };

  /**
   * Handle sort trigger
   */
  const handleSort = () => {};

  /**
   * Handle update selected time
   */
  const handleUpdateSelectedTime = (selected?: { id: number; name: string }) => {
    time.value = selected || timeList.value[0];
    getLogList();
  };

  /**
   * Handle copy string
   */
  const handleCopy = (text?: string) => {
    copy(text);
  };

  /**
   * Handle settle detail
   */
  const handleSettleDetail = (item: CombinedLogItem) => {
    settleDetailItem.value = item;
    showSettleDetailPopup.value = true;
  };

  /**
   * Handle earlier settle
   */
  const handleEarlierSettle = (item: CombinedLogItem) => {
    preSettleItem.value = item;
    showPreSettlePopup.value = true;
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

  .grid-cols-item {
    grid-template-columns: 1fr auto auto;
  }

  .grid-cols-type {
    grid-template-columns: auto 1fr;
  }

  .grid-cols-sn {
    grid-template-columns: 1fr auto;
  }
</style>
