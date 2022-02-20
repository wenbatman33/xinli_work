<template lang="pug">
//- 我的頁面
.flex.flex-col.flex-grow.items-stretch.pb-6.bg-profile
  //- 頁首
  .relative.flex.flex-col.items-stretch
    //- 背景
    .absolute.z-10.left-0.right-0.top-0(:class='authorized() ? "bottom-12" : "bottom-0"')
      svg.w-full.h-full(viewBox='0 0 414 258', preserveAspectRatio='none')
        path(d='M0 0H414V237C414 237 387.5 258 207 258C26.5 258 0 237 0 237V0Z', fill='#071F44')

    //- 頁首內容
    .realtive.z-20.flex.flex-col.items-stretch(:class='authorized() ? "mb-0" : "mb-8"')
      //- 招呼語(relative)
      Greeting

      //- 招呼語(fixed)
      .fixed.z-30.top-0.left-0.right-0.bg-primary(v-if='!authorized()')
        Greeting

      //- 錢包資訊
      Wallet

      //- 工具列(relative)
      .relative(ref='relativeToolBar')
        ToolBar

      //- 工具列(fixed)
      .fixed.z-30.top-0.left-0.right-0.bg-primary(v-if='fixedToolBarVisible')
        ToolBar(:showChat='true')

      //- 等級資訊
      Level

  //- 財務管理
  .subtitle2.text-primary.opacity-40.px-4.mt-4(v-if='authorized()') {{ t("profile_financeManagement") }}

  //- 財務管理選項
  .flex.flex-col.items-stretch.px-4.mt-2(v-if='authorized()')
    //- 提款管理
    MenuItem(:leftIcon='iconCreditCardBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_withdrawalManagement")', :firstItem='true', @click='handleWithdrawalManagementClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 交易紀錄
    MenuItem(:leftIcon='iconTradeRecordBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_transferRecord")', :lastItem='true', @click='handleTransactionClick')

  //- 基本資料
  .subtitle2.text-primary.opacity-40.px-4.mt-6(v-if='authorized()') {{ t("profile_basicProfile") }}

  //- 基本資料選項
  .flex.flex-col.items-stretch.px-4.mt-2(v-if='authorized()')
    //- 用戶安全
    MenuItem(
      :leftIcon='iconUserSecurityBlue',
      :rightIcon='iconArrowRightPrimary40',
      :titleText='t("profile_userSecurity")',
      :valueIcon='iconExclamationYellow',
      :firstItem='true',
      @click='handleSecurityClick'
    )

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 一般訊息
    MenuItem(:leftIcon='iconUserInfoBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_generalInfo")', :lastItem='true', @click='handlePeraonalClick')

  //- 消息中心
  .subtitle2.text-primary.opacity-40.px-4.mt-6(v-if='authorized()') {{ t("profile_notificationCenter") }}

  //- 消息中心選項
  .flex.flex-col.items-stretch.px-4.mt-2(v-if='authorized()')
    //- 站內信
    MenuItem(:leftIcon='iconInboxBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_inbox")', :valueText='letterUnreadCount', :firstItem='true', @click='handleLetterClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 公告
    MenuItem(:leftIcon='iconAnnouncementBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_announce")', :lastItem='true', @click='handleAnnouncementClick')

  //- 新利
  .subtitle2.text-primary.opacity-40.px-4.mt-6 {{ t("profile_xinli") }}

  //- 新利選項
  .flex.flex-col.items-stretch.px-4.mt-2
    //- VIP俱樂部
    MenuItem(:leftIcon='iconVipBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_vipClub")', :firstItem='true', @click='handleVipClubClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 幫助中心
    MenuItem(:leftIcon='iconQuestionBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_helpCenter")', @click='handleHelpCenterClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 關於新利
    MenuItem(:leftIcon='iconXinliBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_aboutXinli")', @click='handleAboutClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 加入合營
    MenuItem(:leftIcon='iconAffiliateBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_becomePartner")', @click='handleAffiliateClick')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 分享新利
    MenuItem(:leftIcon='iconShareBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_shareXinli")', :lastItem='true', @click='handleShareClick')

  //- 廣告
  BannerList.mt-6.px-4

  //- 系統設置
  .subtitle2.text-primary.opacity-40.px-4.mt-6 {{ t("profile_systemConfig") }}

  //- 系統設置選項
  .flex.flex-col.items-stretch.px-4.mt-2
    //- 版本資訊
    MenuItem(:leftIcon='iconVersionBlue', :rightIcon='iconArrowRightPrimary40', :titleText='t("profile_versionInfo")', :singleItem='true', @click='handleVersionClick')

  //- 登出
  .flex.flex-col.items-stretch.px-4.mt-14(v-if='authorized()')
    BasicButton(:loading='logoutLoading', bg='accent10', textColor='accent', size='large', @click='handleLogoutClick') {{ t("profile_logout") }}

  //- 標籤列(relative)
  BasicTabBar.opacity-0(:fixed='false')

  //- 標籤列(fixed)
  BasicTabBar(:fixed='true')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { postLogout } from '@/api/member/authorize';
  import { getLetterList } from '@/api/event/event';
  import { useSocketStore } from '@/store/socket-store';
  import { staticImgUrl, authorized, clearLoginData } from '@/utils';
  import Level from '@/components/profile/Level.vue';
  import Wallet from '@/components/profile/Wallet.vue';
  import ToolBar from '@/components/profile/ToolBar.vue';
  import Greeting from '@/components/profile/Greeting.vue';
  import MenuItem from '@/components/profile/MenuItem.vue';
  import BannerList from '@/components/profile/BannerList.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import BasicTabBar from '@/components/tab-bar/BasicTabBar.vue';
  import type { LetterItem } from '@/api/event/model/event-model';

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');
  const iconCreditCardBlue = staticImgUrl('icon-credit-card-blue.svg');
  const iconTradeRecordBlue = staticImgUrl('icon-trade-record-blue.svg');
  const iconUserSecurityBlue = staticImgUrl('icon-user-security-blue.svg');
  const iconExclamationYellow = staticImgUrl('icon-exclamation-yellow.svg');
  const iconUserInfoBlue = staticImgUrl('icon-user-info-blue.svg');
  const iconInboxBlue = staticImgUrl('icon-inbox-blue.svg');
  const iconAnnouncementBlue = staticImgUrl('icon-announcement-blue.svg');
  const iconVipBlue = staticImgUrl('icon-vip-blue.svg');
  const iconQuestionBlue = staticImgUrl('icon-question-blue.svg');
  const iconXinliBlue = staticImgUrl('icon-xinli-blue.svg');
  const iconAffiliateBlue = staticImgUrl('icon-affiliate-blue.svg');
  const iconShareBlue = staticImgUrl('icon-share-blue.svg');
  const iconSportBlue = staticImgUrl('icon-sport-blue.svg');
  const iconWebBlue = staticImgUrl('icon-web-blue.svg');
  const iconBiometricBlue = staticImgUrl('icon-biometric-blue.svg');
  const iconSwitchOnBlue = staticImgUrl('icon-switch-on.svg');
  const iconSwitchOffBlue = staticImgUrl('icon-switch-off.svg');
  const iconGlobeBlue = staticImgUrl('icon-globe-blue.svg');
  const iconVersionBlue = staticImgUrl('icon-version-blue.svg');

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Socket store
   */
  const socketStore = useSocketStore();

  /**
   * Relative tool bar dom
   */
  const relativeToolBar = ref();

  /**
   * Fixed tool bar visible
   */
  const fixedToolBarVisible = ref(false);

  /**
   * Get letter list loading
   */
  const getLetterLoading = ref(false);

  /**
   * Logout loading
   */
  const logoutLoading = ref(false);

  /**
   * Letter list
   */
  const letterList = ref<LetterItem[]>([]);

  /**
   * Letter unread count
   */
  const letterUnreadCount = computed(() => {
    const list = letterList.value || [];
    const unreadList = letterList.value?.filter((element) => element.status != 3);
    const unreadCount = unreadList.length;
    if (unreadCount > 99) {
      return '99+';
    } else if (unreadCount > 0) {
      return `${unreadCount}`;
    } else {
      return '';
    }
  });

  /**
   * Get letter
   */
  const getLetter = async () => {
    if (authorized()) {
      try {
        // Turn refreshing on
        getLetterLoading.value = true;

        // Get letter list
        const response = await getLetterList();

        // Update letter list
        letterList.value = response.data?.data?.list || [];
      } catch (e) {
        // Exception handled by interceptors
      } finally {
        // Turn refreshing off
        getLetterLoading.value = false;
      }
    }
  };

  /**
   * Handle withdrawal management button clicked
   */
  const handleWithdrawalManagementClick = () => {
    router.push({
      path: '/withdrawal/management',
    });
  };

  /**
   * Handle transaction button clicked
   */
  const handleTransactionClick = () => {
    router.push({
      path: '/transaction',
    });
  };

  /**
   * Handle security button clicked
   */
  const handleSecurityClick = () => {
    router.push({
      path: '/security',
    });
  };

  /**
   * Handle personal button clicked
   */
  const handlePeraonalClick = () => {
    router.push({
      path: '/personal',
    });
  };

  /**
   * Handle letter button clicked
   */
  const handleLetterClick = () => {
    router.push({
      path: '/letter/list',
    });
  };

  /**
   * Handle announcement button clicked
   */
  const handleAnnouncementClick = () => {
    router.push({
      path: '/announcement/list',
    });
  };

  /**
   * Handle vip club button clicked
   */
  const handleVipClubClick = () => {
    window.location.href = String(ENV.VITE_VIP_CLUB_URL);
  };

  /**
   * Handle help center button clicked
   */
  const handleHelpCenterClick = () => {
    router.push({
      path: '/helpcenter',
    });
  };

  /**
   * Handle about button clicked
   */
  const handleAboutClick = () => {
    window.location.href = String(ENV.VITE_ABOUT_URL);
  };

  /**
   * Handle affiliate button clicked
   */
  const handleAffiliateClick = () => {};

  /**
   * Handle share button clicked
   */
  const handleShareClick = () => {
    if (navigator) {
      navigator.share({
        title: document.title,
        url: String(ENV.VITE_SHARE_URL),
      });
    }
  };

  /**
   * Handle version button clicked
   */
  const handleVersionClick = () => {
    router.push({
      path: '/version',
    });
  };

  /**
   * Handle logout button clicked
   */
  const handleLogoutClick = async () => {
    try {
      // Turn on loading status
      logoutLoading.value = true;

      // Post logout
      await postLogout();
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      // Clear login data
      clearLoginData();

      // Reload current page
      window.location.reload();

      // Turn off loading status
      logoutLoading.value = true;
    }
  };

  /**
   * Handle window scrolled
   */
  const handleScroll = () => {
    const rect = relativeToolBar.value?.getBoundingClientRect();
    fixedToolBarVisible.value = authorized() && rect && rect.top <= 0;
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Get letter
    getLetter();

    // Add scroll listener
    addEventListener('scroll', handleScroll);
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    // Remove scroll listener
    removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped lang="scss">
  .bg-profile {
    background-color: #f5f5f5;
  }
</style>
