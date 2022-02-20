<template lang="pug">
//- 二階段簡訊驗證
.flex.flex-col.flex-grow.justify-between.items-center.pb-20
  //- 動畫背景
  AnimationBackground.z-10

  //- 頁面內容
  .flex.flex-col.items-stretch.w-80.pt-12.z-20
    //- Logo
    img.self-start.h-8(:src='iconLoginLogo')

    //- 標題
    .text-xl.text-white.mt-8 {{ t("force_phase2_title") }}

    //- 副標題
    .body1.text-white.opacity-80.mt-8 {{ t("force_phase2_subtitle") }}

    //- 已綁定手機標題
    .body1.text-white.opacity-40.mt-8 {{ t("force_phase2_bindedPhone") }}

    //- 已綁定手機
    .subtitle1.text-white.mt-2 {{ encryptedPhone }}

    //- 手機
    BasicField.mt-8(v-model:value='phone', :iconLeft='iconMobileWhite70', :iconLeftWhite='true', :placeholder='t("force_phase2_phone")')

    //- 驗證碼
    BasicField.mt-8(v-model:value='captcha', :iconLeft='iconShieldCheckedWhite70', :iconLeftWhite='true', :placeholder='t("force_phase2_captcha")')
      template(#right)
        BasicButton(:loading='resendLoading', :disabled='resendDisabled', bg='accent100', size='medium', @click='handleResendClick') {{ resendText }}

    //- 溫馨提示
    .flex.flex-col.items-center.border-hint.px-4.py-3.mt-8
      //- 溫馨提示標題
      .subtitle2.text-white.opacity-40 {{ t("force_phase2_hintTitle") }}

      //- 溫馨提示內容
      .paragraph2.text-white.opacity-40.mt-1 {{ t("force_phase2_hintContent") }}

    //- 提交
    BasicButton.mt-8(:loading='submitLoading', :disabled='submitDisabled', bg='accent100', size='large', @click='handleSubmitClick') {{ t("force_phase2_submit") }}
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { getMe } from '@/api/member/member';
  import { postSendSms, postSecond } from '@/api/member/authorize';
  import { LocalStorageKeys, SMS_RETRY_SECONDS } from '@/utils/constants';
  import { staticImgUrl, getDeviceID, getPlatform, saveLoginData } from '@/utils';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AnimationBackground from '@/components/login/AnimationBackground.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { MeData } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconLoginLogo = staticImgUrl('icon-login-logo.svg');
  const iconMobileWhite70 = staticImgUrl('icon-mobile-white70.svg');
  const iconShieldCheckedWhite70 = staticImgUrl('icon-shield-checked-white70.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const route = useRoute();
  const router = useRouter();

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Sms interval
   */
  const smsInterval = ref<NodeJS.Timeout>();

  /**
   * Sms timeout in seconds
   */
  const smsTimeoutSeconds = ref(0);

  /**
   * Sms timeout exceed
   */
  const smsTimeoutExceed = computed(() => {
    return smsTimeoutSeconds.value <= 0;
  });

  /**
   * Phone
   */
  const phone = ref('');

  /**
   * Secret
   */
  const secret = ref('');

  /**
   * Captcha
   */
  const captcha = ref('');

  /**
   * Get me data loading status
   */
  const getMeDataLoading = ref(false);

  /**
   * Resend button loading status
   */
  const resendLoading = ref(false);

  /**
   * Resend button text
   */
  const resendText = computed(() => {
    if (smsTimeoutExceed.value) {
      return t('force_phase2_resend');
    } else {
      return t('force_phase2_resendDelay', { second: smsTimeoutSeconds.value });
    }
  });

  /**
   * Resend button disabled status
   */
  const resendDisabled = computed(() => {
    return !smsTimeoutExceed.value;
  });

  /**
   * Submit button loading status
   */
  const submitLoading = ref(false);

  /**
   * Submit button disabled status
   */
  const submitDisabled = computed(() => {
    return !captcha.value;
  });

  /**
   * Encrypted phone number
   */
  const encryptedPhone = computed(() => {
    const value = meData.value?.phone || '';
    const values = value.split('');
    for (let i = 0; i < values.length; i++) {
      if (i < values.length - 2) {
        values[i] = '*';
      }
    }
    return values.join('');
  });

  /**
   * Start sms interval
   */
  const startSmsInterval = () => {
    smsInterval.value = setInterval(() => {
      // Compute sms timeout
      const smsTimeoutString = localStorage.getItem(LocalStorageKeys.SMS_TIMEOUT) || '';
      const smsTimeoutDayjs = dayjs(smsTimeoutString) || dayjs();
      smsTimeoutSeconds.value = smsTimeoutDayjs.diff(dayjs(), 'seconds') || 0;

      // Remove saved sms timeout if expired
      if (smsTimeoutSeconds.value <= 0) {
        localStorage.removeItem(LocalStorageKeys.SMS_TIMEOUT);
      }
    }, 1000);
  };

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn loading on
      getMeDataLoading.value = true;

      // Get me data
      const response = await getMe();
      meData.value = response?.data?.data || {};
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getMeDataLoading.value = false;
    }
  };

  /**
   * Handle resend button clicked
   */
  const handleResendClick = async () => {
    try {
      // Turn loading on
      resendLoading.value = true;

      // Post send sms
      const response = await postSendSms({
        phone: phone.value,
        deviceID: getDeviceID(),
        platform: getPlatform(),
      });

      // Update sms timeout
      localStorage.setItem(LocalStorageKeys.SMS_TIMEOUT, dayjs().add(SMS_RETRY_SECONDS, 'second').toISOString());
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      resendLoading.value = false;
    }
  };

  /**
   * Handle submit button clicked
   */
  const handleSubmitClick = async () => {
    try {
      // Skip if getting data
      if (getMeDataLoading.value || resendLoading.value) {
        return;
      }

      // Turn loading on
      submitLoading.value = true;

      // Post second
      const response = await postSecond({
        phone: phone.value,
        deviceID: getDeviceID(),
        platform: getPlatform(),
        code: captcha.value,
      });

      // Clear sms timeout
      localStorage.removeItem(LocalStorageKeys.SMS_TIMEOUT);

      // Save login data
      saveLoginData(response?.data?.data);

      // Navigate by response status
      if (response?.data?.data?.forceChangePassword == 1) {
        // Notify force change password
        Dialog({
          theme: 'round-button',
          teleport: '#dialog-container',
          title: t('login_forcePasswordTitle'),
          message: t('login_forcePasswordMessage'),
          confirmButtonText: t('login_forcePasswordConfirm'),
          showConfirmButton: true,
          showCancelButton: false,
          closeOnPopstate: false,
          closeOnClickOverlay: false,
        }).then(() => {
          // Navigate to force change password
          router.replace({
            path: '/force/password',
            query: route.query,
          });
        });
      } else if (route.query.redirectUrl) {
        // Redirect url
        const redirectUrl = route.query.redirectUrl || '';
        const token = response?.data?.data?.token || '';
        window.location.replace(`${redirectUrl}?token=${token}`);
      } else {
        // Home page
        router.replace({
          path: '/',
        });
      }
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      submitLoading.value = false;
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    // Get me data
    getMeData();

    // Start sms interval
    startSmsInterval();
  });

  /**
   * On component unmounted
   */
  onUnmounted(() => {
    if (smsInterval.value) {
      clearInterval(smsInterval.value);
    }
  });
</script>

<style scoped lang="scss">
  ::v-deep(.van-field__control) {
    color: #ffffff;
  }

  .border-hint {
    border: 1px solid rgba(7, 31, 68, 0.1);
    border-radius: 4px;
  }
</style>
