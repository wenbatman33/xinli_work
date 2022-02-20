<template lang="pug">
//- 密碼彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("security_password")')
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
      //- 步驟列表
      .w-full.flex.flex-row.flex-nowrap.justify-center.items-center.overflow-x-auto.mt-6
        //- 步驟1
        .relative.flex.flex-col.items-center.px-4
          .absolute.top-3.z-10.h-2px(class='left-1/2 w-1/2', :class='step === 2 ? "bg-accent" : "bg-primary opacity-20"')
          img.relative.z-20.w-6.h-6(:src='step === 1 ? iconStep1Accent : iconStepCheckAccent40')
          .relative.z-20.subtitle1.text-accent.mt-2(:class='step === 1 ? "opacity-100" : "opacity-40"') {{ t("security_password_step1") }}

        //- 步驟2
        .relative.flex.flex-col.items-center.px-4
          .absolute.top-3.z-10.h-2px(class='right-1/2 w-1/2', :class='step === 2 ? "bg-accent" : "bg-primary opacity-20"')
          img.relative.z-20.w-6.h-6(:src='step === 2 ? iconStep2Accent : iconStep2Primary20')
          .relative.z-20.subtitle1.mt-2(:class='step === 2 ? "text-accent" : "text-primary opacity-20"') {{ t("security_password_step2") }}

      //- 步驟1內容
      .flex.flex-col.items-stretch(v-if='step == 1')
        BasicField.mt-8(
          v-model:value='password',
          :type='passwordType',
          :iconLeft='iconLockPrimary',
          :iconRight='passwordIconRight',
          :placeholder='t("security_password_originHint")',
          @clickRight='handlePasswordRightClick'
        )

      //- 步驟2內容
      .flex.flex-col.items-stretch(v-if='step == 2')
        BasicField.mt-8(
          v-model:value='newPassword',
          :type='newPasswordType',
          :iconLeft='iconLockPrimary',
          :iconRight='newPasswordIconRight',
          :placeholder='t("security_password_newHint")',
          @clickRight='handleNewPasswordRightClick'
        )

        //- 密碼規則1
        .mt-2.px-4.grid.grid-cols-rule.gap-2.items-center
          img.w-4.h-4(:src='newPasswordRule1Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
          .body2(:class='newPasswordRule1Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule1") }}

        //- 密碼規則2
        .mt-2.px-4.grid.grid-cols-rule.gap-2.items-center
          img.w-4.h-4(:src='newPasswordRule2Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
          .body2(:class='newPasswordRule2Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule2") }}

        //- 密碼規則3
        .mt-2.px-4.grid.grid-cols-rule.gap-2.items-center
          img.w-4.h-4(:src='newPasswordRule3Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
          .body2(:class='newPasswordRule3Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule3") }}

        //- 密碼規則4
        .mt-2.px-4.grid.grid-cols-rule.gap-2.items-center
          img.w-4.h-4(:src='newPasswordRule4Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
          .body2(:class='newPasswordRule4Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule4") }}

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='patchLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick')
        span(v-if='step == 1') {{ t("security_password_next") }}
        span(v-if='step == 2') {{ t("common_confirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { postPassword, putPassword } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconLockPrimary = staticImgUrl('icon-lock-primary.svg');
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconStep1Accent = staticImgUrl('icon-step-1-accent.svg');
  const iconStep2Accent = staticImgUrl('icon-step-2-accent.svg');
  const iconStep2Primary20 = staticImgUrl('icon-step-2-primary20.svg');
  const iconStepCheckAccent40 = staticImgUrl('icon-step-check-accent40.svg');
  const iconEyePrimary = staticImgUrl('icon-eye-primary.svg');
  const iconEyeSlashPrimary = staticImgUrl('icon-eye-slash-primary.svg');
  const iconCricleCheckGray = staticImgUrl('icon-circle-check-gray.svg');
  const iconCricleCheckSuccess = staticImgUrl('icon-circle-check-success.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;
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
   * Secret
   */
  const secret = ref('');

  /**
   * Password
   */
  const password = ref('');

  /**
   * New password
   */
  const newPassword = ref('');

  /**
   * Password visible
   */
  const passwordVisible = ref(false);

  /**
   * New password visible
   */
  const newPasswordVisible = ref(false);

  /**
   * Patch loading status
   */
  const patchLoading = ref(false);

  /**
   * Password field type
   */
  const passwordType = computed(() => {
    if (passwordVisible.value) {
      return 'text';
    } else {
      return 'password';
    }
  });

  /**
   * New password field type
   */
  const newPasswordType = computed(() => {
    if (newPasswordVisible.value) {
      return 'text';
    } else {
      return 'password';
    }
  });

  /**
   * Password field icon right
   */
  const passwordIconRight = computed(() => {
    if (passwordVisible.value) {
      return iconEyePrimary;
    } else {
      return iconEyeSlashPrimary;
    }
  });

  /**
   * New password field icon right
   */
  const newPasswordIconRight = computed(() => {
    if (newPasswordVisible.value) {
      return iconEyePrimary;
    } else {
      return iconEyeSlashPrimary;
    }
  });

  /**
   * New password rule1 valid
   */
  const newPasswordRule1Valid = computed(() => {
    return /^.{8,}$/.test(newPassword.value);
  });

  /**
   * Password rule2 valid
   */
  const newPasswordRule2Valid = computed(() => {
    return /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword.value);
  });

  /**
   * Password rule3 valid
   */
  const newPasswordRule3Valid = computed(() => {
    return newPassword.value != 'Account123';
  });

  /**
   * Password rule4 valid
   */
  const newPasswordRule4Valid = computed(() => {
    return newPassword.value != password.value;
  });

  /**
   * Confirm button disabled
   */
  const confirmDisabled = computed(() => {
    if (step.value == 1) {
      return !password.value;
    } else {
      return !newPasswordRule1Valid.value || !newPasswordRule2Valid.value || !newPasswordRule3Valid.value || !newPasswordRule4Valid.value;
    }
  });

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
   * Handle password field icon right clicked
   */
  const handlePasswordRightClick = () => {
    passwordVisible.value = !passwordVisible.value;
  };

  /**
   * Handle new password field icon right clicked
   */
  const handleNewPasswordRightClick = () => {
    newPasswordVisible.value = !newPasswordVisible.value;
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn loading on
      patchLoading.value = true;

      if (step.value == 1) {
        // Post password
        const response = await postPassword({
          password: password.value,
        });

        // Update secret
        secret.value = response?.data?.data?.secret || '';

        // Next step
        step.value = 2;
      } else {
        // Put password
        await putPassword({
          secret: secret.value,
          password: newPassword.value,
        });

        // Notify verify success
        Toast({
          position: 'bottom',
          teleport: '#toast-container',
          message: t('common_updateSuccess'),
        });

        // Referesh me data
        emit('refresh');

        // Hide popup
        emit('update:show', false);
      }
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      patchLoading.value = false;
    }
  };

  /**
   * Watch show state changed
   */
  watch(
    () => props.show,
    (show) => {
      step.value = 1;
      password.value = '';
      newPassword.value = '';
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .grid-cols-rule {
    grid-template-columns: auto 1fr;
  }
</style>
