<template lang="pug">
//- 忘記密碼步驟1
.flex.flex-col.flex-grow.items-stretch
  //- 驗證碼
  BasicField.mt-8(v-model:value='captcha', :iconLeft='iconShieldCheckedWhite70', :iconLeftWhite='true', :placeholder='t("forget_captcha")')
    template(#right)
      BasicButton(:loading='resendLoading', :disabled='resendDisabled', bg='accent100', size='medium', @click='handleResendClick') {{ resendText }}

  //- 下一步
  BasicButton.mt-8(:loading='nextLoading', :disabled='nextDisabled', bg='accent100', size='large', @click='handleNextClick') {{ t("forget_next") }}
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { staticImgUrl, validatePhone } from '@/utils';
  import { getSend, postVerify } from '@/api/member/sms';
  import { LocalStorageKeys, SMS_RETRY_SECONDS } from '@/utils/constants';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';

  /**
   * Static icons
   */
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
   * Secret
   */
  const secret = ref('');

  /**
   * Captcha
   */
  const captcha = ref('');

  /**
   * Resend button loading status
   */
  const resendLoading = ref(false);

  /**
   * Resend button text
   */
  const resendText = computed(() => {
    if (smsTimeoutExceed.value) {
      return t('forget_resend');
    } else {
      return t('forget_resendDelay', { second: smsTimeoutSeconds.value });
    }
  });

  /**
   * Resend button disabled status
   */
  const resendDisabled = computed(() => {
    return !smsTimeoutExceed.value;
  });

  /**
   * Next button loading status
   */
  const nextLoading = ref(false);

  /**
   * Next button disabled status
   */
  const nextDisabled = computed(() => {
    return !captcha.value;
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
   * Handle resend button clicked
   */
  const handleResendClick = async () => {
    try {
      // Turn loading on
      resendLoading.value = true;

      // Send sms
      await getSend({
        phone: route.query.phone?.toString(),
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
   * Handle next button clicked
   */
  const handleNextClick = async () => {
    try {
      // Turn loading on
      nextLoading.value = true;

      // Verify sms
      const response = await postVerify({
        code: captcha.value,
      });

      // Update secret
      secret.value = response?.data?.data?.secret || '';

      // Clear sms timeout
      localStorage.removeItem(LocalStorageKeys.SMS_TIMEOUT);

      // Navigate to reset password page
      router.replace({
        path: '/forget/reset',
        query: {
          ...(route.query || {}),
          secret: secret.value,
        },
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      nextLoading.value = false;
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
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
