<template lang="pug">
//- 產品下載
.flex.flex-col.items-stretch(v-if='downloadBannerLoading || downloadBanner')
  //- 標題
  p.headline3.text-primary {{ t("lobby_download") }}

  //- 讀取中
  .flex.flex-col.items-center.justify-center.h-20.mt-2(v-if='downloadBannerLoading')
    Loading(type='spinner', size='16px')

  //- 廣告圖片
  BasicButton.mt-2(v-else-if='downloadBanner', rounded='md', @click='handleDownloadClick')
    img.w-full.object-contain.rounded-md(:src='src', @error='errorImg')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { getBanner } from '@/api/event/event';
  import { imgUrl, errorImg, deepLink } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { BannerItem } from '@/api/event/model/event-model';

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Download banner loading
   */
  const downloadBannerLoading = ref(false);

  /**
   * Download banner
   */
  const downloadBanner = ref<BannerItem | undefined>(undefined);

  /**
   * Image source
   */
  const src = computed(() => {
    return imgUrl(downloadBanner.value?.imageH5);
  });

  /**
   * Get download banner
   */
  const getDownloadBanner = async () => {
    try {
      // Turn loading on
      downloadBannerLoading.value = true;

      // Get banner
      const response = await getBanner({
        categortyID: 7,
      });

      // Update download banner
      downloadBanner.value = response?.data?.data?.list?.[0];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      downloadBannerLoading.value = false;
    }
  };

  /**
   * Handle download banner clicked
   */
  const handleDownloadClick = () => {
    deepLink(downloadBanner.value?.targetURL);
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getDownloadBanner();
  });
</script>
