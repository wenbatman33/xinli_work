<template lang="pug">
//- 廣告輪播物件
img.h-full.w-full.object-cover.rounded-md(:src='src', @click='handleBannerClick', @error='errorImg')
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { imgUrl, errorImg, deepLink } from '@/utils';
  import { SwiperSlide } from 'swiper/vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { BannerItem } from '@/api/event/model/event-model';

  /**
   * Environment
   */
  const ENV = import.meta.env;

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Banner item
     */
    item?: BannerItem;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Image source
   */
  const src = computed(() => {
    return imgUrl(props?.item?.imageH5);
  });

  /**
   * Handle banner item clicked
   */
  const handleBannerClick = () => {
    deepLink(props.item?.targetURL);
  };
</script>
