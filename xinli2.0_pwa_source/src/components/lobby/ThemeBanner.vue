<template lang="pug">
//- 主題專區
.flex.flex-col.items-stretch(v-if='themeBannerLoading || themeBanner')
  //- 標題
  p.headline3.text-primary {{ t("lobby_theme") }}

  //- 讀取中
  .flex.flex-col.items-center.justify-center.h-20.mt-2(v-if='themeBannerLoading')
    Loading(type='spinner', size='16px')

  //- 廣告圖片
  BasicButton.mt-2(v-else-if='themeBanner', rounded='md', @click='handleThemeClick')
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
   * Theme banner loading
   */
  const themeBannerLoading = ref(false);

  /**
   * Theme banner
   */
  const themeBanner = ref<BannerItem | undefined>(undefined);

  /**
   * Image source
   */
  const src = computed(() => {
    return imgUrl(themeBanner.value?.imageH5);
  });

  /**
   * Get theme banner
   */
  const getThemeBanner = async () => {
    try {
      // Turn loading on
      themeBannerLoading.value = true;

      // Get banner
      const response = await getBanner({
        categortyID: 10,
      });

      // Update theme banner
      themeBanner.value = response?.data?.data?.list?.[0];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      themeBannerLoading.value = false;
    }
  };

  /**
   * Handle theme banner clicked
   */
  const handleThemeClick = () => {
    deepLink(themeBanner.value?.targetURL);
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getThemeBanner();
  });
</script>
