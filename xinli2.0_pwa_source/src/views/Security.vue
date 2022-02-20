<template lang="pug">
//- 用戶安全頁面
.flex.flex-col.flex-grow.items-stretch.bg-security
  //- 導覽欄
  BasicNav.bg-white(:title='t("security")')
    //- 左側
    template(#left)
      //- 關閉
      BackButton

    //- 右側
    template(#right)
      //- 客服
      ChatButton

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 用戶安全內容
    .flex.flex-col.items-stretch.px-4.pb-6
      //- 用戶暱稱
      MenuItem.mt-4(:titleText='t("security_username")', :valueText='userName || t("common_unset")', :firstItem='true')

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 真實姓名
      MenuItem(
        :titleText='t("security_realname")',
        :valueText='realName || t("common_unset")',
        :status='realName ? undefined : "unset"',
        :rightText='realName ? t("common_modifyMaunally") : undefined',
        :rightIcon='iconArrowRightPrimary40',
        @click='handleRealNameClick'
      )

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 手機號碼
      MenuItem(
        :titleText='t("security_phone")',
        :valueText='phone || t("common_unset")',
        :status='!phone ? "unset" : !phoneVerified ? "unverified" : undefined',
        :rightText='phone && phoneVerified ? t("common_modifyMaunally") : undefined',
        :rightIcon='iconArrowRightPrimary40',
        @click='handlePhoneClick'
      )

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 電子信箱
      MenuItem(
        :titleText='t("security_email")',
        :valueText='email || t("common_unset")',
        :status='!email ? "unset" : !emailVerified ? "unverified" : "verified"',
        :rightIcon='iconArrowRightPrimary40',
        @click='handleEmailClick'
      )

      //- 分隔線
      .h-px.bg-primary.opacity-10

      //- 修改密碼
      MenuItem(:titleText='t("security_password")', :valueText='password || t("common_unset")', :rightIcon='iconArrowRightPrimary40', :lastItem='true', @click='handlePasswordClick')

  //- 真實姓名彈窗
  RealNamePopup(v-model:show='showRealNamePopup', @refresh='handleRefresh')

  //- 手機號碼彈窗
  PhonePopup(v-model:show='showPhonePopup', :originalPhone='meData.phone', @refresh='handleRefresh')

  //- 電子信箱彈窗
  EmailPopup(v-model:show='showEmailPopup', :originalEmail='meData.email', @refresh='handleRefresh')

  //- 密碼彈窗
  PasswordPopup(v-model:show='showPasswordPopup', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PullRefresh } from 'vant';
  import { staticImgUrl } from '@/utils';
  import { getMe } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import MenuItem from '@/components/security/MenuItem.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import RealNamePopup from '@/components/security/RealNamePopup.vue';
  import PhonePopup from '@/components/security/PhonePopup.vue';
  import EmailPopup from '@/components/security/EmailPopup.vue';
  import PasswordPopup from '@/components/security/PasswordPopup.vue';
  import type { MeData } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconArrowRightPrimary40 = staticImgUrl('icon-arrow-right-primary40.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Username
   */
  const userName = computed(() => {
    return meData.value.account || t('common_unset');
  });

  /**
   * Real name
   */
  const realName = computed(() => {
    return meData.value.name || '';
  });

  /**
   * Phone
   */
  const phone = computed(() => {
    return meData.value.phone || '';
  });

  /**
   * Phone verified
   */
  const phoneVerified = computed(() => {
    return meData.value.phoneCert == '1';
  });

  /**
   * Email
   */
  const email = computed(() => {
    return meData.value.email || '';
  });

  /**
   * Email verified
   */
  const emailVerified = computed(() => {
    return meData.value.emailCert == '1';
  });

  /**
   * Password
   */
  const password = ref('********');

  /**
   * Show real name popup
   */
  const showRealNamePopup = ref(false);

  /**
   * Show phone popup
   */
  const showPhonePopup = ref(false);

  /**
   * Show email popup
   */
  const showEmailPopup = ref(false);

  /**
   * Show password popup
   */
  const showPasswordPopup = ref(false);

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get me data
      const response = await getMe();
      meData.value = response?.data?.data || {};
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
    getMeData();
  };

  /**
   * Handle real name button clicked
   */
  const handleRealNameClick = () => {
    if (refreshing.value) {
      return;
    }
    if (meData.value.name == undefined || meData.value.name.length == 0) {
      showRealNamePopup.value = true;
    }
  };

  /**
   * Handle phone button clicked
   */
  const handlePhoneClick = () => {
    if (refreshing.value) {
      return;
    }
    if (meData.value.phoneCert != '1') {
      showPhonePopup.value = true;
    }
  };

  /**
   * Handle email button clicked
   */
  const handleEmailClick = () => {
    if (!refreshing.value) {
      showEmailPopup.value = true;
    }
  };

  /**
   * Handle password button clicked
   */
  const handlePasswordClick = () => {
    if (!refreshing.value) {
      showPasswordPopup.value = true;
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMeData();
  });
</script>

<style scoped lang="scss">
  .bg-security {
    background-color: #f5f5f5;
  }
</style>
