<template lang="pug">
//- 更新密碼
.flex.flex-col.flex-grow.justify-between.items-center.pb-20
  //- 動畫背景
  AnimationBackground.z-10

  //- 頁面內容
  .flex.flex-col.items-stretch.w-80.pt-50px.z-20
    //- Logo
    img.self-start.h-8(:src='iconLoginLogo')

    //- 標題
    .text-xl.text-white.mt-8 {{ t("force_password_title") }}

    //- 步驟1
    img.h-12.mt-8(v-if='step == 1', :src='iconForcePasswordStep1')

    //- 步驟2
    img.h-12.mt-8(v-else, :src='iconForcePasswordStep2')

    //- 步驟1內容
    .flex.flex-col.items-stretch(v-if='step == 1')
      BasicField.mt-8(
        v-model:value='password',
        :type='passwordType',
        :iconLeft='iconLockWhite70',
        :iconLeftWhite='true',
        :iconRight='passwordIconRight',
        :placeholder='t("security_password_originHint")',
        @clickRight='handlePasswordRightClick'
      )

    //- 步驟2內容
    .flex.flex-col.items-stretch(v-if='step == 2')
      BasicField.mt-8(
        v-model:value='newPassword',
        :type='newPasswordType',
        :iconLeft='iconLockWhite70',
        :iconLeftWhite='true',
        :iconRight='newPasswordIconRight',
        :placeholder='t("security_password_newHint")',
        @clickRight='handleNewPasswordRightClick'
      )

      //- 密碼規則1
      .mt-8.grid.grid-cols-rule.gap-2.items-center
        img.w-4.h-4(:src='newPasswordRule1Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
        .body2.text-white(:class='newPasswordRule1Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule1") }}

      //- 密碼規則2
      .mt-2.grid.grid-cols-rule.gap-2.items-center
        img.w-4.h-4(:src='newPasswordRule2Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
        .body2.text-white(:class='newPasswordRule2Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule2") }}

      //- 密碼規則3
      .mt-2.grid.grid-cols-rule.gap-2.items-center
        img.w-4.h-4(:src='newPasswordRule3Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
        .body2.text-white(:class='newPasswordRule3Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule3") }}

      //- 密碼規則4
      .mt-2.grid.grid-cols-rule.gap-2.items-center
        img.w-4.h-4(:src='newPasswordRule4Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
        .body2.text-white(:class='newPasswordRule4Valid ? "text-systemSuccess" : "text-primary opacity-60"') {{ t("security_password_rule4") }}

    //- 確認
    BasicButton.mt-8(:loading='patchLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick')
      span(v-if='step == 1') {{ t("security_password_next") }}
      span(v-if='step == 2') {{ t("common_confirm") }}
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { LocalStorageKeys } from '@/utils/constants';
  import { postPassword, putPassword } from '@/api/member/member';
  import { staticImgUrl, clearLoginData } from '@/utils';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AnimationBackground from '@/components/login/AnimationBackground.vue';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
  const iconLoginLogo = staticImgUrl('icon-login-logo.svg');
  const iconForcePasswordStep1 = staticImgUrl('icon-force-password-step-1.svg');
  const iconForcePasswordStep2 = staticImgUrl('icon-force-password-step-2.svg');
  const iconLockWhite70 = staticImgUrl('icon-lock-white70.svg');
  const iconEyeWhite70 = staticImgUrl('icon-eye-white70.svg');
  const iconEyeSlashWhite70 = staticImgUrl('icon-eye-slash-white70.svg');
  const iconCricleCheckGray = staticImgUrl('icon-circle-check-gray.svg');
  const iconCricleCheckSuccess = staticImgUrl('icon-circle-check-success.svg');

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
      return iconEyeWhite70;
    } else {
      return iconEyeSlashWhite70;
    }
  });

  /**
   * New password field icon right
   */
  const newPasswordIconRight = computed(() => {
    if (newPasswordVisible.value) {
      return iconEyeWhite70;
    } else {
      return iconEyeSlashWhite70;
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

      // Process by step
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

        // Notify success
        Dialog({
          theme: 'round-button',
          teleport: '#dialog-container',
          title: t('force_password_successTitle'),
          message: t('force_password_successMessage'),
          confirmButtonText: t('common_confirm'),
          showConfirmButton: true,
          showCancelButton: false,
          closeOnPopstate: false,
          closeOnClickOverlay: false,
        }).then(() => {
          // Clear login data
          clearLoginData();

          // Navigate to login page
          if (route.query.redirectUrl) {
            const redirectUrl = route.query.redirectUrl || '';
            window.location.href = `${ENV.VITE_LOGIN_URL || ''}?form=empty&redirectUrl=${redirectUrl}`;
          } else {
            window.location.href = `${ENV.VITE_LOGIN_URL || ''}?form=empty`;
          }
        });
      }
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      patchLoading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  ::v-deep(.van-field__control) {
    color: #ffffff;
  }

  .pt-50px {
    padding-top: 50px;
  }

  .grid-cols-rule {
    grid-template-columns: auto 1fr;
  }
</style>
