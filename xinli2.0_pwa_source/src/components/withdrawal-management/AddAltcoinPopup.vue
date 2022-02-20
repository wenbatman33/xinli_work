<template lang="pug">
//- 添加虛擬貨幣提領地址彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("withdrawalManagement_altcoinAdd_title")')
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
    .flex.flex-col.items-stretch.overflow-y-auto
      //- 剩餘時間
      .flex.flex-row-.items-center.justify-center.p-2.body2.bg-remain-time(v-if='step == 2')
        span.text-primary.opacity-40 {{ t("withdrawalManagement_altcoinAdd_timeoutTitle") }}
        span.text-accent.px-2 {{ operationTimeoutSeconds }}
        span.text-primary.opacity-40 {{ t("withdrawalManagement_altcoinAdd_second") }}

      //- 步驟列表
      .w-full.flex.flex-row.flex-nowrap.justify-center.items-center.overflow-x-auto.mt-6.px-8
        //- 步驟1
        .relative.flex.flex-col.items-center.px-4
          .absolute.top-3.z-10.h-2px(class='left-1/2 w-1/2', :class='step === 2 ? "bg-accent" : "bg-primary opacity-20"')
          img.relative.z-20.w-6.h-6(:src='step === 1 ? iconStep1Accent : iconStepCheckAccent40')
          .relative.z-20.subtitle1.text-accent.mt-2(:class='step === 1 ? "opacity-100" : "opacity-40"') {{ t("withdrawalManagement_altcoinAdd_step1") }}

        //- 步驟2
        .relative.flex.flex-col.items-center.px-4
          .absolute.top-3.z-10.h-2px(class='right-1/2 w-1/2', :class='step === 2 ? "bg-accent" : "bg-primary opacity-20"')
          img.relative.z-20.w-6.h-6(:src='step === 2 ? iconStep2Accent : iconStep2Primary20')
          .relative.z-20.subtitle1.mt-2(:class='step === 2 ? "text-accent" : "text-primary opacity-20"') {{ t("withdrawalManagement_altcoinAdd_step2") }}

      //- 步驟1內容
      .flex.flex-col.items-stretch.px-8(v-if='step == 1')
        //- 基本資訊讀取中
        .flex.flex-col.items-center.justify-center.h-16.mt-8.px-4(v-if='getMeLoading')
          Loading(type='spinner', size='24px')

        //- 提示
        .body2.mt-8(v-else-if='phoneVerified')
          span.text-primary.opacity-40 {{ t("withdrawalManagement_altcoinAdd_sentReminder") }}
          span.text-primary {{ encryptedPhone }}

        //- 手機號
        BasicField.mt-8(v-else, :value='phone', :iconLeft='iconMobilePrimary', :placeholder='t("security_phone_phoneHint")', :error='phoneError', @update:value='handleUpdatePhone')

        //- 驗證碼
        BasicField.mt-6(v-model:value='captcha', :iconLeft='iconShieldCheckedPrimary', :placeholder='t("security_phone_captchaHint")')
          template(#right)
            BasicButton(:loading='resendLoading', :disabled='resendDisabled', bg='accent100', size='medium', @click='handleResendClick') {{ resendText }}

      //- 步驟2內容
      .flex.flex-col.items-stretch.px-8(v-if='step == 2')
        //- 錢包類型標題
        .subtitle1.text-primary.mt-8 {{ t("withdrawalManagement_altcoinAdd_type") }}

        //- 錢包類型
        DropDownButton.mt-4(:titleText='altcoinType.name || t("withdrawalManagement_altcoinAdd_typeHint")', @click='handleAltcoinTypeClick')

        //- 地址暱稱標題
        .subtitle1.text-primary.mt-8 {{ t("withdrawalManagement_altcoinAdd_name") }}

        //- 地址暱稱
        BasicField.mt-4(v-model:value='addressName', :placeholder='t("withdrawalManagement_altcoinAdd_nameHint")')

        //- 地址暱稱標題
        .subtitle1.text-primary.mt-8 {{ t("withdrawalManagement_altcoinAdd_address") }}

        //- 地址暱稱
        BasicField.mt-4(v-model:value='address', :placeholder='t("withdrawalManagement_altcoinAdd_addressHint")')

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='postVerifyLoading || postAddressLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick')
        span(v-if='step == 1') {{ t("security_password_next") }}
        span(v-if='step == 2') {{ t("common_confirm") }}

  //- 虛擬貨幣類型彈窗
  AltcoinTypePopup(v-model:show='showAltcoinTypePopup', v-model:selected='altcoinType', :list='altcoinTypeList')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Loading, Toast, Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, validatePhone } from '@/utils';
  import { getSend, postVerify } from '@/api/member/sms';
  import { getMe, postPhone, putPhone, postUSDT, deleteUSDT } from '@/api/member/member';
  import { LocalStorageKeys, SMS_RETRY_SECONDS, ADD_ALTCOIN_TIMEOUT_SECONDS } from '@/utils/constants';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import DropDownButton from '@/components/button/DropDownButton.vue';
  import AltcoinTypePopup from '@/components/withdrawal-management/AltcoinTypePopup.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { MeData } from '@/api/member/model/member-model';
  import type { USDTItem } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconStep1Accent = staticImgUrl('icon-step-1-accent.svg');
  const iconStep2Accent = staticImgUrl('icon-step-2-accent.svg');
  const iconMobilePrimary = staticImgUrl('icon-mobile-primary.svg');
  const iconStep2Primary20 = staticImgUrl('icon-step-2-primary20.svg');
  const iconStepCheckAccent40 = staticImgUrl('icon-step-check-accent40.svg');
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
     * Edit altcoin
     */
    edit?: boolean;

    /**
     * Altcoin item for edit
     */
    item?: USDTItem;
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
     * Refresh altcoin list
     */
    (e: 'refresh'): void;
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
   * Step
   */
  const step = ref(1);

  /**
   * Sms interval
   */
  const smsInterval = ref<NodeJS.Timeout>();

  /**
   * Sms timeout in seconds
   */
  const smsTimeoutSeconds = ref(0);

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
   * Captcha
   */
  const captcha = ref('');

  /**
   * Secret
   */
  const secret = ref('');

  /**
   * Get me loading status
   */
  const getMeLoading = ref(false);

  /**
   * Resend button loading status
   */
  const resendLoading = ref(false);

  /**
   * Post verify loading status
   */
  const postVerifyLoading = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * Operation timout interval
   */
  const operationTimeoutInterval = ref<NodeJS.Timeout>();

  /**
   * Operation timout in dayjs
   */
  const operationTimeoutDayjs = ref(dayjs());

  /**
   * Operation timeout in seconds
   */
  const operationTimeoutSeconds = ref(0);

  /**
   * Altcoin type list
   */
  const altcoinTypeList = ref([
    {
      id: 1,
      name: 'ERC20',
    },
    {
      id: 2,
      name: 'TRC20',
    },
  ]);

  /**
   * Altcoin type
   */
  const altcoinType = ref(altcoinTypeList.value[0]);

  /**
   * Show altcoin type popup
   */
  const showAltcoinTypePopup = ref(false);

  /**
   * Address name
   */
  const addressName = ref('');

  /**
   * Address
   */
  const address = ref('');

  /**
   * Post address loading status
   */
  const postAddressLoading = ref(false);

  /**
   * Phone verified
   */
  const phoneVerified = computed(() => {
    return meData.value.phoneCert == '1';
  });

  /**
   * Encrypted phone number
   */
  const encryptedPhone = computed(() => {
    const value = meData.value.phone || '';
    const values = value.split('');
    for (let i = 0; i < values.length; i++) {
      if (i < values.length - 4) {
        values[i] = '*';
      }
    }
    return values.join('');
  });

  /**
   * Sms timeout exceed
   */
  const smsTimeoutExceed = computed(() => {
    return smsTimeoutSeconds.value <= 0;
  });

  /**
   * Resend button disabled status
   */
  const resendDisabled = computed(() => {
    return !smsTimeoutExceed.value;
  });

  /**
   * Resend button text
   */
  const resendText = computed(() => {
    if (smsTimeoutExceed.value) {
      return t('security_email_captchaPost');
    } else {
      return t('forget_resendDelay', { second: smsTimeoutSeconds.value });
    }
  });

  /**
   * Confirm button disabled
   */
  const confirmDisabled = computed(() => {
    if (step.value == 1) {
      return !captcha.value;
    } else {
      return !addressName.value || !address.value;
    }
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
   * Start operation timout interval
   */
  const startOperationTimeoutInterval = () => {
    operationTimeoutInterval.value = setInterval(() => {
      // Compute operation timeout
      if (step.value == 2) {
        // Only the secondary step countdown operation timeout
        operationTimeoutSeconds.value = operationTimeoutDayjs.value.diff(dayjs(), 'seconds') || 0;

        // Check if timeout
        if (operationTimeoutSeconds.value <= 0) {
          // Hide popup
          emit('update:show', false);

          // Notify timeout
          Dialog({
            theme: 'round-button',
            teleport: '#dialog-container',
            title: t('withdrawalManagement_altcoinAdd_timeoutTitle'),
            message: t('withdrawalManagement_altcoinAdd_timeoutMessage'),
            confirmButtonText: t('common_confirm'),
            showCancelButton: false,
          }).then(() => {});
        }
      } else {
        operationTimeoutSeconds.value = 0;
      }
    }, 1000);
  };

  /**
   * Get me data
   */
  const getMeData = async () => {
    try {
      // Turn refreshing on
      getMeLoading.value = true;

      // Get me data
      const response = await getMe();

      // Update me data
      meData.value = response?.data?.data || {};

      // Update phone field
      phone.value = meData.value?.phone || '';
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      getMeLoading.value = false;
    }
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    emit('update:show', false);
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
      // Skip if me data loading
      if (getMeLoading.value) {
        return;
      }

      // Turn loading on
      resendLoading.value = true;

      // Send sms
      if (phoneVerified.value) {
        // Send sms to binded phone
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
   * Handle altcoin type clicked
   */
  const handleAltcoinTypeClick = () => {
    showAltcoinTypePopup.value = true;
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    if (getMeLoading.value) {
      // Skip if me data loading
    } else if (step.value == 1) {
      try {
        // Step-1
        // Turn loading on
        postVerifyLoading.value = true;

        // Verify sms
        if (phoneVerified.value) {
          // New phone
          const response = await postVerify({
            code: captcha.value,
          });

          // Update secret
          secret.value = response?.data?.data?.secret || '';
        } else {
          // Bind phone
          await putPhone({
            secret: secret.value,
            code: captcha.value,
          });
        }

        // Clear sms timeout
        localStorage.removeItem(LocalStorageKeys.SMS_TIMEOUT);

        // Update operation timeout
        operationTimeoutDayjs.value = dayjs().add(ADD_ALTCOIN_TIMEOUT_SECONDS, 'second');

        // Update step
        step.value = 2;
      } catch (e) {
        // Exception handled by interceptors
      } finally {
        // Turn loading off
        postVerifyLoading.value = false;
      }
    } else {
      try {
        // Step-2
        // Turn loading on
        postAddressLoading.value = true;

        // Delete old address on edit mode
        if (props.edit == true) {
          await deleteUSDT({
            id: props.item?.id,
          });
        }

        // Post UDST
        const response = await postUSDT({
          address: address.value,
          name: addressName.value,
          type: altcoinType.value.id,
          secret: secret.value,
        });

        // Update operation timeout
        operationTimeoutDayjs.value = dayjs().add(ADD_ALTCOIN_TIMEOUT_SECONDS, 'second');

        // Notify add success

        if (props.edit == true) {
          Toast({
            position: 'bottom',
            teleport: '#toast-container',
            message: t('common_updateSuccess'),
          });
        } else {
          Toast({
            position: 'bottom',
            teleport: '#toast-container',
            message: t('common_addSuccess'),
          });
        }

        // Notify refresh altcoin list
        emit('refresh');

        // Hide popup
        emit('update:show', false);
      } catch (e) {
        // Exception handled by interceptors
      } finally {
        // Turn loading off
        postAddressLoading.value = false;
      }
    }
  };

  /**
   * Watch show state changed
   */
  watch(
    () => props.show,
    (show) => {
      if (show) {
        // Reset step
        step.value = 1;

        // Get me data
        getMeData();

        // Start sms interval
        startSmsInterval();

        // Start operation timeout interval
        startOperationTimeoutInterval();

        // Edit mode
        if (props.edit == true) {
          address.value = props.item?.address || '';
          addressName.value = props.item?.name || '';
          if (props.item?.type == 1) {
            altcoinType.value = altcoinTypeList.value[0];
          } else if (props.item?.type == 1) {
            altcoinType.value = altcoinTypeList.value[1];
          }
        }
      } else {
        // Clear sms interval
        if (smsInterval.value) {
          clearInterval(smsInterval.value);
        }

        // Clear operation timeout interval
        if (operationTimeoutInterval.value) {
          clearInterval(operationTimeoutInterval.value);
        }
      }
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .bg-remain-time {
    background: rgba(7, 31, 68, 0.03);
  }
</style>
