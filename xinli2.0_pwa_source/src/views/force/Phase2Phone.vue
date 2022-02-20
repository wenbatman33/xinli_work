<template lang="pug">
//- 二階段手機驗證
.flex.flex-col.flex-grow.justify-between.items-center.pb-20
  //- 動畫背景
  AnimationBackground.z-10

  //- 頁面內容
  .flex.flex-col.items-stretch.w-80.pt-12.z-20
    //- Logo
    img.self-start.h-8(:src='iconLoginLogo')

    //- 標題
    .text-xl.text-white.mt-8 {{ t("force_phase2_title") }}

    //- 手機
    BasicField.text-white.mt-8(v-model:value='phone', :iconLeft='iconMobileWhite70', :iconLeftWhite='true', :placeholder='t("force_phase2_phone")')

    //- 提交
    BasicButton.mt-8(:loading='submitLoading', :disabled='submitDisabled', bg='accent100', size='large', @click='handleSubmitClick') {{ t("force_phase2_submit") }}
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { postPhone } from '@/api/member/authorize';
  import { staticImgUrl, getDeviceID, getPlatform, saveLoginData } from '@/utils';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AnimationBackground from '@/components/login/AnimationBackground.vue';

  /**
   * Static icons
   */
  const iconLoginLogo = staticImgUrl('icon-login-logo.svg');
  const iconMobileWhite70 = staticImgUrl('icon-mobile-white70.svg');

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
   * Phone
   */
  const phone = ref('');

  /**
   * Submit button loading status
   */
  const submitLoading = ref(false);

  /**
   * Submit button disabled status
   */
  const submitDisabled = computed(() => {
    return !phone.value;
  });

  /**
   * Handle submit button clicked
   */
  const handleSubmitClick = async () => {
    try {
      // Turn loading on
      submitLoading.value = true;

      // Post phone
      const response = await postPhone({
        phone: phone.value,
        deviceID: getDeviceID(),
        platform: getPlatform(),
      });

      // Save login data
      saveLoginData(response?.data?.data?.result);

      // Navigate by response status
      if (response?.data?.data?.status == 2) {
        // Navigate to force two phace sms
        router.replace({
          path: '/force/phase2sms',
          query: route.query,
        });
      } else if (response?.data?.data?.result?.forceChangePassword == 1) {
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
        const token = response?.data?.data?.result?.token || '';
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
</script>

<style scoped lang="scss">
  ::v-deep(.van-field__control) {
    color: #ffffff;
  }
</style>
