<template lang="pug">
//- 手機號碼彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("security_phone_title")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

      //- 右側
      template(#right)
        //- 客服
        ChatButton

    //- 頁面內容
    .flex.flex-col.items-stretch.overflow-y-auto.px-8
      //- 手機號
      BasicField.mt-8(:value='phone', :iconLeft='iconMobilePrimary', :placeholder='t("security_phone_phoneHint")', :error='phoneError', @update:value='handleUpdatePhone')

      //- 驗證碼
      BasicField.mt-6(v-model:value='captcha', :iconLeft='iconShieldCheckedPrimary', :placeholder='t("security_phone_captchaHint")')
        template(#right)
          BasicButton(:loading='resendLoading', :disabled='resendDisabled', bg='accent100', size='medium', @click='handleResendClick') {{ resendText }}

      //- 提示
      .body2.text-primary.mt-1 {{ t("security_phone_reminder") }}

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='putPhoneLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick') {{ t("common_confirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, validatePhone } from '@/utils';
  import { getSend, postVerify } from '@/api/member/sms';
  import { postPhone, putPhone } from '@/api/member/member';
  import { LocalStorageKeys, SMS_RETRY_SECONDS } from '@/utils/constants';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconMobilePrimary = staticImgUrl('icon-mobile-primary.svg');
  const iconShieldCheckedPrimary = staticImgUrl('icon-shield-checked-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;

    /**
     * Original phone
     */
    originalPhone?: string;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update show
     */
    (e: 'update:show', show: boolean): void;

    /**
     * Refresh personal data
     */
    (e: 'refresh'): void;

    /**
     * Custom close button click
     */
    (e: 'click-close'): boolean;
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
   * Phone updated
   */
  const phoneUpdated = ref(false);

  /**
   * Phone error message
   */
  const phoneError = computed(() => {
    if (phoneUpdated.value && !validatePhone(phone.value)) {
      return t('forget_phoneFormatError');
    } else {
      return '';
    }
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
   * Patch loading status
   */
  const putPhoneLoading = ref(false);

  /**
   * Resend button text
   */
  const resendText = computed(() => {
    if (smsTimeoutExceed.value) {
      return t('security_phone_captchaPost');
    } else {
      return t('forget_resendDelay', { second: smsTimeoutSeconds.value });
    }
  });

  /**
   * Resend button disabled status
   */
  const resendDisabled = computed(() => {
    return !validatePhone(phone.value) || !smsTimeoutExceed.value;
  });

  /**
   * Confirm button disabled status
   */
  const confirmDisabled = computed(() => {
    return !validatePhone(phone.value) || !captcha.value;
  });

  /**
   * Input phone is the original phone
   */
  const isOriginalPhone = () => {
    const originalPhone = props.originalPhone || '';
    if (originalPhone.length > 0) {
      return phone.value == originalPhone;
    } else {
      return false;
    }
  };

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
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    const handled = emit('click-close');
    if (!handled) {
      emit('update:show', false);
    }
  };

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle update phone field
   */
  const handleUpdatePhone = (value: string) => {
    phone.value = value;
    phoneUpdated.value = true;
  };

  /**
   * Handle resend button clicked
   */
  const handleResendClick = async () => {
    try {
      // Turn loading on
      resendLoading.value = true;

      // Send sms
      if (isOriginalPhone()) {
        // Send sms to original phone
        await getSend({
          phone: phone.value,
        });
      } else {
        // Send sms to new phone
        const response = await postPhone({
          phone: phone.value,
        });

        // Update secret
        secret.value = response?.data?.data?.secret || '';
      }

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
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn loading on
      putPhoneLoading.value = true;

      // Verify
      if (isOriginalPhone()) {
        // Verify original phone sms
        const response = await postVerify({
          code: captcha.value,
        });

        // Update secret
        secret.value = response?.data?.data?.secret || '';
      } else {
        // Verify new phone sms
        await putPhone({
          secret: secret.value,
          code: captcha.value,
        });
      }

      // Notify verify success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('common_verifySuccess'),
      });

      // Referesh me data
      emit('refresh');

      // Hide popup
      emit('update:show', false);
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      putPhoneLoading.value = false;
    }
  };

  /**
   * Watch show state changed
   */
  watch(
    () => props.show,
    (show) => {
      if (show) {
        // Clear phone field
        phone.value = props.originalPhone || '';

        // Start sms interval
        startSmsInterval();
      } else {
        // Clear sms interval
        if (smsInterval.value) {
          clearInterval(smsInterval.value);
        }
      }
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }
</style>
