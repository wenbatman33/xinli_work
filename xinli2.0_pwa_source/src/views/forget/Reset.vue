<template lang="pug">
//- 忘記密碼步驟2
.flex.flex-col.flex-grow.items-stretch
  //- 頁面內容
  .flex.flex-col.items-stretch
    //- 密碼
    BasicField.mt-8(
      v-model:value='password',
      :type='passwordType',
      :iconLeft='iconLockWhite70',
      :iconLeftWhite='true',
      :iconRight='passwordIconRight',
      :placeholder='t("forget_password")',
      @clickRight='handlePasswordRightClick'
    )

    //- 密碼規則標題
    .subtitle2.text-white.opacity-80.mt-8 {{ t("forget_passwordRuleTitle") }}

    //- 密碼規則1
    .grid.grid-cols-rule.gap-2.items-center.mt-2
      img.w-4.h-4(:src='passwordRule1Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
      .body2(:class='passwordRule1Valid ? "text-systemSuccess" : "text-white opacity-60"') {{ t("forget_passwordRule1") }}

    //- 密碼規則2
    .grid.grid-cols-rule.gap-2.items-center.mt-2
      img.w-4.h-4(:src='passwordRule2Valid ? iconCricleCheckSuccess : iconCricleCheckGray')
      .body2(:class='passwordRule2Valid ? "text-systemSuccess" : "text-white opacity-60"') {{ t("forget_passwordRule2") }}

  //- 確認
  BasicButton.mt-8(:loading='confirmLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick') {{ t("forget_confirm") }}
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import { putPassword } from '@/api/member/member';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Static icons
   */
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
   * Password
   */
  const password = ref('');

  /**
   * Password visible
   */
  const passwordVisible = ref(false);

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
   * Password rule1 valid
   */
  const passwordRule1Valid = computed(() => {
    return /^.{8,}$/.test(password.value);
  });

  /**
   * Password rule2 valid
   */
  const passwordRule2Valid = computed(() => {
    return /(?=.*[a-z])(?=.*[A-Z])/.test(password.value);
  });

  /**
   * Confirm button loading status
   */
  const confirmLoading = ref(false);

  /**
   * Confirm button disabled status
   */
  const confirmDisabled = computed(() => {
    return !passwordRule1Valid.value || !passwordRule2Valid.value;
  });

  /**
   * Handle password field icon right clicked
   */
  const handlePasswordRightClick = () => {
    passwordVisible.value = !passwordVisible.value;
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn loading on
      confirmLoading.value = true;

      // Post reset password
      await putPassword({
        password: password.value,
        secret: String(route.query.secret) || '',
      });

      // Notify success
      Dialog({
        theme: 'round-button',
        teleport: '#dialog-container',
        title: t('forget_successTitle'),
        message: t('forget_successMessage'),
        confirmButtonText: t('common_confirm'),
        showConfirmButton: true,
        showCancelButton: false,
        closeOnPopstate: false,
        closeOnClickOverlay: false,
      }).then(() => {
        window.location.href = `${ENV.VITE_LOGIN_URL || ''}?form=empty`;
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      confirmLoading.value = false;
    }
  };
</script>

<style>
  .grid-cols-rule {
    grid-template-columns: auto 1fr;
  }
</style>
