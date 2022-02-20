<template lang="pug">
//- 登入頁面
.flex.flex-col.flex-grow.justify-between.items-center.pb-20
  //- 動畫背景
  AnimationBackground.z-10

  //- 頁面內容
  .flex.flex-col.items-stretch.w-80.pt-50px.z-20
    //- Logo
    img.self-start.h-8(:src='iconLoginLogo', @click='handleLogoClick')

    //- 標題
    .text-xl.text-white.mt-8 {{ t("login_title") }}

    //- 讀取中
    .flex.flex-row.justify-center.items-center.mt-8(v-if='getConfigLoading')
      Loading(type='spinner', size='24px')

    //- 頂象行為驗證
    .flex.flex-row.justify-center.items-center.mt-8(v-else-if='dxEnabled')
      BasicButton.opacity-0
        .p-4
          img.w-4.h-4
      div(ref='dxCaptcha')
      BasicButton(rounded='full', @click='handleDxCaptchaRefreshClick')
        .p-4
          img.w-4.h-4(:src='iconRefreshWhite70')

    //- 驗證碼
    BasicField.mt-8(v-else, v-model:value='captcha', :iconLeft='iconShieldCheckedWhite70', :iconLeftWhite='true', :placeholder='t("register_captcha")')
      template(#right)
        .flex.flex-row.items-center
          img.h-8.object-contain(:src='captchaImage', @error='errorImg')
          BasicButton(:loading='captchaLoading', @click='handleCaptchaRightClick')
            .p-4
              img.w-4.h-4(:src='iconRefreshWhite70')

    //- 登入
    BasicButton.mt-8(:loading='loginLoading', :disabled='loginDisabled', bg='accent100', size='large', @click='handleLoginClick') {{ t("login_login") }}

  //- 合作夥伴
  Partner.w-80.mt-8.z-20
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import { Loading, Dialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { getLoginConfig, getCaptcha, postSSOLogin } from '@/api/member/authorize';
  import { staticImgUrl, errorImg, getDeviceID, getPlatform, saveLoginData } from '@/utils';
  import Partner from '@/components/partner/Partner.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import CheckboxButton from '@/components/button/CheckboxButton.vue';
  import AnimationBackground from '@/components/login/AnimationBackground.vue';

  /**
   * Static icons
   */
  const iconLoginLogo = staticImgUrl('icon-login-logo.svg');
  const iconShieldCheckedWhite70 = staticImgUrl('icon-shield-checked-white70.svg');
  const iconRefreshWhite70 = staticImgUrl('icon-refresh-white70.svg');

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
   * Get config loading
   */
  const getConfigLoading = ref(false);

  /**
   * Captcha
   */
  const captcha = ref('');

  /**
   * Captcha loading
   */
  const captchaLoading = ref(false);

  /**
   * Captcha image
   */
  const captchaImage = ref('');

  /**
   * Captcha secret
   */
  const captchaSecret = ref('');

  /**
   * Ding-xiang captcha enabled
   */
  const dxEnabled = ref(false);

  /**
   * Ding-xiang captcha element
   */
  const dxCaptcha = ref<HTMLElement>();

  /**
   * Ding-xiang captcha token
   */
  const dxToken = ref('');

  /**
   * Ding-xiang captcha instance
   */
  var dxCaptchaInstance: any;

  /**
   * Login button loading status
   */
  const loginLoading = ref(false);

  /**
   * Login button disabled status
   */
  const loginDisabled = computed(() => {
    if (dxEnabled.value && !dxToken.value) {
      return true;
    } else if (!dxEnabled.value && !captcha.value) {
      return true;
    } else {
      return false;
    }
  });

  /**
   * Update config
   */
  const updateConfig = async () => {
    try {
      // Turn loading on
      getConfigLoading.value = true;

      // Get config
      const response = await getLoginConfig();

      // Update config
      dxEnabled.value = response?.data?.data?.verify == true;
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      getConfigLoading.value = false;

      // Update captcha
      if (!dxEnabled.value) {
        updateCaptcha();
      }
    }
  };

  /**
   * Update captcha image
   */
  const updateCaptcha = async () => {
    try {
      // Turn loading on
      captchaLoading.value = true;

      // Get captcha
      const response = await getCaptcha();

      // Update config
      captchaImage.value = response?.data?.data?.image || '';
      captchaSecret.value = response?.data?.data?.secret || '';
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      captchaLoading.value = false;
    }
  };

  /**
   * Handle captcha field icon right clicked
   */
  const handleCaptchaRightClick = () => {
    updateCaptcha();
  };

  /**
   * Handle ding-xiang captch refresh click
   */
  const handleDxCaptchaRefreshClick = () => {
    dxToken.value = '';
    dxCaptchaInstance.reload();
  };

  /**
   * Handle logo image clicked
   */
  const handleLogoClick = () => {
    router.push({
      path: '/',
    });
  };

  /**
   * Handle login button clicked
   */
  const handleLoginClick = async () => {
    try {
      // Turn loading on
      loginLoading.value = true;

      // Compute captcha object
      var captchaObject;
      if (dxEnabled.value) {
        captchaObject = {
          captcha: '',
          secret: '',
          token: dxToken.value,
        };
      } else {
        captchaObject = {
          captcha: captcha.value,
          secret: captchaSecret.value,
          token: '',
        };
      }

      // Post login
      const response = await postSSOLogin({
        data: route.query.data?.toString(),
        deviceID: getDeviceID(),
        platform: getPlatform(),
        ...captchaObject,
      });

      // Save login data
      saveLoginData(response?.data?.data);

      // Navigate by response status
      if (response.data?.data?.forceTwoPhase == 1) {
        // Navigate to force two phace phone
        router.replace({
          path: '/force/phase2phone',
          query: route.query,
        });
      } else if (response.data?.data?.forceTwoPhase == 3) {
        // Navigate to force two phace sms
        router.replace({
          path: '/force/phase2sms',
          query: route.query,
        });
      } else if (response.data?.data?.forceChangePassword == 1) {
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
        // Navigate to home page
        router.replace({
          path: '/',
        });
      }
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      loginLoading.value = false;
    }
  };

  /**
   * Watch ding-xiang captcha element changed
   */
  watch(
    () => dxCaptcha.value,
    (dxCaptcha) => {
      if (dxCaptcha) {
        dxCaptchaInstance = window._dx.Captcha(dxCaptcha, {
          appId: '9f52a02016ef64f43b1170f07ed72078',
          apiServer: 'https://vip56.dingxiang-inc.com',
          width: 320,
          style: 'embed',
          success: (token: string) => {
            dxToken.value = token;
          },
        });
      }
    }
  );

  /**
   * On component mounted
   */
  onMounted(() => {
    // Update config
    updateConfig();

    // Update ding-xiang captcha
    dxCaptchaInstance?.reload();
  });
</script>

<style scoped lang="scss">
  ::v-deep(.van-field__control) {
    color: #ffffff;
  }

  .pt-50px {
    padding-top: 50px;
  }
</style>
