<template lang="pug">
//- 忘記密碼頁面
.flex.flex-col.flex-grow.justify-between.items-center.pb-20
  //- 動畫背景
  AnimationBackground.z-10

  //- 頁面內容
  .flex.flex-col.items-stretch.w-80.pt-50px.z-20
    //- Logo
    img.self-start.h-8(:src='iconLoginLogo', @click='handleLogoClick')

    //- 步驟1
    img.mt-8(v-if='step === 1', :src='iconForgetStep1')

    //- 步驟2
    img.mt-8(v-else-if='step === 2', :src='iconForgetStep2')

    //- 步驟3
    img.mt-8(v-else, :src='iconForgetStep3')

    //- Router view
    router-view

  //- 合作夥伴
  Partner.w-80.mt-8.z-20
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { Steps, Step } from 'vant';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import Partner from '@/components/partner/Partner.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
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
  const iconForgetStep1 = staticImgUrl('icon-forget-step-1.png');
  const iconForgetStep2 = staticImgUrl('icon-forget-step-2.png');
  const iconForgetStep3 = staticImgUrl('icon-forget-step-3.png');

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
   * Current step
   */
  const step = computed(() => {
    if (route.path === '/forget/verify') {
      return 2;
    } else if (route.path === '/forget/reset') {
      return 3;
    } else {
      return 1;
    }
  });

  /**
   * Handle logo image clicked
   */
  const handleLogoClick = () => {
    router.push({
      path: '/',
    });
  };
</script>

<style scoped lang="scss">
  ::v-deep(.van-field__control) {
    color: #ffffff;
  }

  .pt-50px {
    padding-top: 50px;
  }
</style>
