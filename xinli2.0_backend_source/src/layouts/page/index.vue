<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
  <OtpModal @register="otpModalregister" @success="otpSuccess" />
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script lang="ts">
  import { computed, defineComponent, unref, watch } from 'vue';

  import FrameLayout from '/@/layouts/iframe/index.vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import OtpModal from '/@/views/common/otp/otpModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useOTPStore } from '/@/store/modules/otp';

  export default defineComponent({
    name: 'PageLayout',
    components: { FrameLayout, OtpModal },
    setup() {
      const { getShowMultipleTab } = useMultipleTabSetting();
      const tabStore = useMultipleTabStore();

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        return tabStore.getCachedTabList;
      });

      const [otpModalregister, { openModal: openOTP }] = useModal();
      const OTPStore = useOTPStore();
      watch(
        ()=> OTPStore.OTP_open, (val) => {
        if (val === true) {
          openOTP(true);
        }else{
          openOTP(false);
        }
      });
      const otpSuccess = (response) => {
        OTPStore.callback(OTPStore.requestUrl, response);
      };

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        getCanEmbedIFramePage,
        otpModalregister,
        otpSuccess,
      };
    },
  });
</script>
