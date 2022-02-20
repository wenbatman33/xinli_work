<template lang="pug">
//- 大廳導覽欄
.flex.flex-col.items-stretch(ref='root', :style='{ backgroundColor: `rgba(255, 255, 255, ${bgAlpha})` }')
  //- 導覽欄
  .relative.z-20.grid.grid-cols-nav.items-center.pt-4.px-2
    //- 已登入左側
    .flex.flex-row(v-if='authorized()')
      .flex.flex-row.items-center.rounded-full.ml-2(:style='{ backgroundColor: registerBg }')
        //- 充值
        BasicButton(bg='gradient', size='small', rounded='full', @click='handleDepositClick') {{ t("lobby_recharge") }}

        //- 錢包餘額讀取中
        .pl-2.pr-3(v-if='refreshMoneyLoading')
          Loading(type='spinner', size='12px')

        //- 錢包餘額
        .subtitle-2.pl-2.pr-3(v-else, :style='{ color: textColor }') {{ money }}

    //- 未登入左側
    .flex.flex-row.items-center(v-else)
      //- 登入
      BasicButton.ml-2(bg='gradient', size='small', rounded='full', @click='handleLoginClick') {{ t("lobby_login") }}

      //- 註冊
      BasicButton.ml-2(:bg='registerBg', :textColor='textColor', size='small', rounded='full', @click='handleRegisterClick') {{ t("lobby_register") }}

    //- 右側
    .flex.flex-row.items-center
      //- 領獎專區
      //- 任務 #7131 [H5]首頁項目隱藏領獎專區
      BasicButton(v-if='false', rounded='full', @click='handleGiftClick')
        .p-2
          svg.w-5.h-5(viewBox='0 0 24 24')
            path(
              d='M20.9,7.1h-1.3c0.3-0.5,0.5-1.2,0.5-1.8c0-1.9-1.5-3.5-3.4-3.5c-1,0-1.7,0.3-2.5,0.9c-0.6,0.6-1.3,1.4-2.2,2.9c-0.9-1.4-1.6-2.3-2.2-2.9C9,2.1,8.3,1.8,7.3,1.8c-1.9,0-3.4,1.6-3.4,3.5c0,0.6,0.2,1.3,0.5,1.8H3.1c-1.2,0-2.3,1-2.3,2.2v4c0,0.5,0.4,0.9,0.9,0.9h0.5V20c0,1.2,1,2.2,2.3,2.2h15.1c1.2,0,2.3-1,2.3-2.2v-5.8h0.5c0.5,0,0.9-0.4,0.9-0.9v-4C23.2,8.1,22.2,7.1,20.9,7.1z M20.1,20c0,0.3-0.2,0.5-0.5,0.5h-4.6v-6.3h5.1V20z M15.3,4.1c0.3-0.2,0.5-0.4,0.7-0.5c0.2-0.1,0.4-0.1,0.7-0.1c0.9,0,1.6,0.8,1.6,1.8s-0.7,1.8-1.6,1.8h-3.6C14.1,5.6,14.8,4.6,15.3,4.1z M21.4,12.5h-6.5V8.9h6c0.3,0,0.5,0.2,0.5,0.5V12.5z M4,20v-5.8H9v6.3H4.4C4.2,20.5,4,20.3,4,20z M7.9,3.6c0.2,0.1,0.5,0.2,0.7,0.5c0.6,0.5,1.2,1.5,2.2,3H7.3c-0.9,0-1.6-0.8-1.6-1.8c0-1,0.7-1.8,1.6-1.8C7.6,3.5,7.8,3.6,7.9,3.6z M9,12.5H2.6V9.3c0-0.3,0.2-0.5,0.5-0.5h6V12.5zM13.2,8.9v11.6h-2.4V8.9H13.2z M21.6,9.3C21.6,9.3,21.6,9.3,21.6,9.3C21.6,9.3,21.6,9.3,21.6,9.3L21.6,9.3z M19.6,4C19.6,4,19.7,4,19.6,4C19.7,4,19.6,4,19.6,4z',
              :fill='textColor',
              fill-opacity='0.7'
            )

      //- 客服
      ChatButton
        .p-2
          svg.w-5.h-5(viewBox='0 0 20 20')
            path(
              d='M7.5 8.125C7.5 7.46094 6.91406 6.875 6.25 6.875H5.625C4.21875 6.875 3.125 8.00781 3.125 9.375V11.25C3.125 12.6562 4.21875 13.75 5.625 13.75H6.25C6.91406 13.75 7.5 13.2031 7.5 12.5V8.125ZM14.375 13.75C15.7422 13.75 16.875 12.6562 16.875 11.25V9.375C16.875 8.00781 15.7422 6.875 14.375 6.875H13.75C13.0469 6.875 12.5 7.46094 12.5 8.125V12.5C12.5 13.2031 13.0469 13.75 13.75 13.75H14.375ZM10 0C4.41406 0 0.15625 4.64844 0 10V10.625C0 10.9766 0.273438 11.25 0.625 11.25H1.25C1.5625 11.25 1.875 10.9766 1.875 10.625V10C1.875 5.54688 5.50781 1.875 10 1.875C14.4531 1.875 18.125 5.54688 18.125 10H18.0859C18.0859 10.1172 18.125 16.4844 18.125 16.4844C18.125 17.4219 17.3828 18.125 16.4453 18.125H12.5C12.5 17.1094 11.6406 16.25 10.625 16.25H9.375C8.32031 16.25 7.5 17.1094 7.5 18.125C7.5 19.1797 8.32031 20 9.375 20H16.4453C18.3984 20 20 18.4375 20 16.4844V10C19.8047 4.64844 15.5469 0 10 0Z',
              :fill='textColor',
              fill-opacity='0.7'
            )

  //- 遊戲分類讀取中
  Loading.mt-4.self-center(v-if='gameTypeListLoading', type='spinner', size='16px')

  //- 遊戲分類
  //- 任務 #7131 [H5]首頁項目隱藏手動排序分類（恢復時需加回：.pr-2.gap-2）
  .relative.z-20.mt-4.grid.grid-cols-cate.items-center(v-else)
    //- 分類列表
    BasicCategory(:selected='category', :textColor='textColor', :list='categoryList', @update:selected='handleUpdateCategory')

    //- 分隔線
    //- .w-px.h-6.bg-white.opacity-20

    //- 排序
    //- BasicButton(rounded='full', @click='handleSortClick')
    //-   .p-2
    //-     svg.w-5.h-5(width='16', height='16', viewBox='0 0 16 16')
    //-       path(
    //-         d='M14.25 3.07143H8.83331V2.42857C8.83331 2.21429 8.62498 2 8.41665 2H7.58331C7.34894 2 7.16665 2.21429 7.16665 2.42857V3.07143H1.74998C1.5156 3.07143 1.33331 3.28571 1.33331 3.5V3.92857C1.33331 4.16964 1.5156 4.35714 1.74998 4.35714H7.16665V5C7.16665 5.24107 7.34894 5.42857 7.58331 5.42857H8.41665C8.62498 5.42857 8.83331 5.24107 8.83331 5V4.35714H14.25C14.4583 4.35714 14.6666 4.16964 14.6666 3.92857V3.5C14.6666 3.28571 14.4583 3.07143 14.25 3.07143ZM14.25 11.6429H5.49998V11C5.49998 10.7857 5.29165 10.5714 5.08331 10.5714H4.24998C4.0156 10.5714 3.83331 10.7857 3.83331 11V11.6429H1.74998C1.5156 11.6429 1.33331 11.8571 1.33331 12.0714V12.5C1.33331 12.7411 1.5156 12.9286 1.74998 12.9286H3.83331V13.5714C3.83331 13.8125 4.0156 14 4.24998 14H5.08331C5.29165 14 5.49998 13.8125 5.49998 13.5714V12.9286H14.25C14.4583 12.9286 14.6666 12.7411 14.6666 12.5V12.0714C14.6666 11.8571 14.4583 11.6429 14.25 11.6429ZM14.25 7.35714H12.1666V6.71429C12.1666 6.5 11.9583 6.28571 11.75 6.28571H10.9166C10.6823 6.28571 10.5 6.5 10.5 6.71429V7.35714H1.74998C1.5156 7.35714 1.33331 7.57143 1.33331 7.78571V8.21429C1.33331 8.45536 1.5156 8.64286 1.74998 8.64286H10.5V9.28571C10.5 9.52679 10.6823 9.71429 10.9166 9.71429H11.75C11.9583 9.71429 12.1666 9.52679 12.1666 9.28571V8.64286H14.25C14.4583 8.64286 14.6666 8.45536 14.6666 8.21429V7.78571C14.6666 7.57143 14.4583 7.35714 14.25 7.35714Z',
    //-         :fill='textColor',
    //-         fill-opacity='0.7'
    //-       )

  //- 領獎專區彈窗
  RewardPopup(v-model:show='showRewardPopup')

  //- 遊戲類型排序彈窗
  GameTypeSortPopup(v-model:show='showCategorySortPopup', :gameTypeList='gameTypeList', @update:gameTypeList='handleUpdateGameTypeList')
</template>

<script setup lang="ts">
  import { defineProps, defineEmit, ref, computed, onMounted, onUnmounted } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { getMemberMoney } from '@/api/money/wallet';
  import { useMemberStore } from '@/store/member-store';
  import { staticImgUrl, authorized, commaFormat, calculateMiddleColor } from '@/utils';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import BasicCategory from '@/components/category/BasicCategory.vue';
  import RewardPopup from '@/components/lobby/RewardPopup.vue';
  import GameTypeSortPopup from '@/components/lobby/GameTypeSortPopup.vue';
  import type { GameType } from '@/api/game/model/game-group-model';
  import type { CategoryItem } from '@/components/category/BasicCategory.vue';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
  const iconGiftPrimary = staticImgUrl('icon-gift-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Disabled effect
     */
    disabledEffect?: boolean;

    /**
     * Game type list loading status
     */
    gameTypeListLoading?: boolean;

    /**
     * Game type list
     */
    gameTypeList?: GameType[];

    /**
     * Selected game type
     */
    gameType?: GameType;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update game type list
     */
    (e: 'update:gameTypeList', gameTypeList: GameType[]): void;

    /**
     * Update selected game type
     */
    (e: 'update:gameType', gameType: GameType): void;
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
   * Member store
   */
  const memberStore = useMemberStore();

  /**
   * Root dom
   */
  const root = ref();

  /**
   * Background alpha
   */
  const bgAlpha = ref(0);

  /**
   * Text color
   */
  const textColor = ref('#ffffff');

  /**
   * Register button background color
   */
  const registerBg = ref('rgba(255, 255, 255, 0.2)');

  /**
   * Scrolling animation frame
   */
  const animationFrame = ref(0);

  /**
   * Snap transition timeout serial
   */
  const snapTimeout = ref<NodeJS.Timeout | undefined>(undefined);

  /**
   * Refresh money loading status
   */
  const refreshMoneyLoading = ref(false);

  /**
   * Show reward sort popup status
   */
  const showRewardPopup = ref(false);

  /**
   * Show category sort popup status
   */
  const showCategorySortPopup = ref(false);

  /**
   * Category list
   */
  const categoryList = computed<CategoryItem[]>(() => {
    return (
      props.gameTypeList?.map((element) => {
        return {
          id: element.id || -1,
          name: element.name || '',
        };
      }) || []
    );
  });

  /**
   * Selected category
   */
  const category = computed<CategoryItem>(() => {
    return {
      id: props.gameType?.id || -1,
      name: props.gameType?.name || '',
    };
  });

  /**
   * Money
   */
  const money = computed(() => {
    return commaFormat(memberStore.getMoney);
  });

  /**
   * Refresh money
   */
  const refreshMoney = async () => {
    if (authorized()) {
      try {
        // Turn on loading status
        refreshMoneyLoading.value = true;

        // Get member money
        const response = await getMemberMoney();

        // Update money
        memberStore.updateMoney(response?.data?.data?.money || 0);
        memberStore.updateLockMoney(response?.data?.data?.lockMoney || 0);
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        refreshMoneyLoading.value = false;
      }
    }
  };

  /**
   * Handle login button clicked
   */
  const handleLoginClick = () => {
    window.location.href = ENV.VITE_LOGIN_URL || '';
  };

  /**
   * Handle register button clicked
   */
  const handleRegisterClick = () => {
    window.location.href = ENV.VITE_REGISTER_URL || '';
  };

  /**
   * Handle recharge button clicked
   */
  const handleDepositClick = () => {
    router.push({
      path: '/deposit',
    });
  };

  /**
   * Handle gift button clicked
   */
  const handleGiftClick = () => {
    showRewardPopup.value = !showRewardPopup.value;
  };

  /**
   * Handle update category
   */
  const handleUpdateCategory = (selected: CategoryItem) => {
    const gameType =
      props.gameTypeList?.find((element) => {
        return element.id == selected.id;
      }) || {};
    emit('update:gameType', gameType);
  };

  /**
   * Handle sort button clicked
   */
  const handleSortClick = () => {
    showCategorySortPopup.value = !showCategorySortPopup.value;
  };

  /**
   * Handle update game type list
   */
  const handleUpdateGameTypeList = (gameTypeList: GameType[]) => {
    emit('update:gameTypeList', gameTypeList);
  };

  /**
   * Handle window scrolled
   */
  const handleScroll = () => {
    if (props.disabledEffect !== true) {
      cancelAnimationFrame(animationFrame.value);
      animationFrame.value = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const offsetHeight = root.value?.offsetHeight || 1.0;
        let progress = scrollY / offsetHeight;
        if (progress > 1) {
          progress = 1;
        } else if (progress < 0) {
          progress = 0;
        }
        bgAlpha.value = progress;
        textColor.value = `#${calculateMiddleColor('ffffff', '071F44', progress)}`;

        const r = Math.ceil(7 * progress + 255 * (1 - progress));
        const g = Math.ceil(31 * progress + 255 * (1 - progress));
        const b = Math.ceil(68 * progress + 255 * (1 - progress));
        const a = 0.2 - 0.15 * progress;
        registerBg.value = `rgba(${r}, ${g}, ${b}, ${a})`;
      });
    }
  };

  /**
   * Handle window touch end
   */
  const handleTouchEnd = () => {
    if (snapTimeout.value) {
      clearTimeout(snapTimeout.value);
    }
    snapTimeout.value = setTimeout(() => {
      if (window.scrollY > 20) {
        bgAlpha.value = 1;
        textColor.value = '#071F44';
        registerBg.value = `rgba(7, 31, 68, 0.05)`;
      }
    }, 350);
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Add scroll listener
    addEventListener('scroll', handleScroll);

    // Add touch end listener
    addEventListener('touchend', handleTouchEnd);

    // Refresh money
    refreshMoney();
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    // Remove scroll listener
    removeEventListener('scroll', handleScroll);

    // Remove touch end listener
    removeEventListener('touchend', handleTouchEnd);
  });
</script>

<style scoped lang="scss">
  .grid-cols-nav {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-cate {
    grid-template-columns: 1fr 1px auto;
  }
</style>
