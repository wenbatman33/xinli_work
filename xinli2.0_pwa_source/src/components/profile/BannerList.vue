<template lang="pug">
//- 廣告
.relative.w-full.h-28.flex.flex-col.items-center(v-if='!empty')
  //- 廣告讀取中
  Loading.z-10.mt-12(v-if='bannerListLoading', type='spinner', size='16px')
  
  //- 廣告輪播
  Swiper.z-10.w-full.h-full(:modules='[Autoplay]', :autoplay='{ delay: 3500, disableOnInteraction: false }', :loop='true', @slideChange='handleSlideChange')
    SwiperSlide.relative.h-full.w-full(v-for='item in bannerList')
      BannerListItem(:item='item')

  //- 當前輪播位置
  .absolute.z-20.w-full.left-0.right-0.bottom-2.flex.flex-row.flex-nowrap.justify-center.items-center.overflow-x-auto
    .w-1.h-2.flex-shrink-0.mx-2px(v-for='(item, index) in length')
      .w-full.h-full.bg-white.rounded-full(v-if='index == activeIndex')
      .w-full.h-full.bg-black.opacity-40.rounded-full(v-else)
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { getBanner } from '@/api/event/event';
  import BannerListItem from '@/components/profile/BannerListItem.vue';
  import type { Swiper as SwiperClass } from 'swiper/types';
  import type { BannerItem } from '@/api/event/model/event-model';
  import 'swiper/css';

  /**
   * Swiper active index
   */
  const activeIndex = ref(0);

  /**
   * Banner list loading status
   */
  const bannerListLoading = ref(false);

  /**
   * Banner list
   */
  const bannerList = ref<BannerItem[]>([]);

  /**
   * Banner list empty
   */
  const empty = computed(() => {
    return bannerList.value.length === 0;
  });

  /**
   * Banner list length
   */
  const length = computed(() => {
    return bannerList.value.length;
  });

  /**
   * Get banner list
   */
  const getBannerList = async () => {
    try {
      // Turn loading on
      bannerListLoading.value = true;

      // Get banner list
      const response = await getBanner({
        categortyID: 8,
      });
      bannerList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      bannerListLoading.value = false;
    }
  };

  /**
   * Handle swiper active index changed
   * @param swiper Swiper instance
   */
  const handleSlideChange = (swiper: SwiperClass) => {
    activeIndex.value = swiper.realIndex;
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getBannerList();
  });
</script>

<style scoped lang="scss">
  .mx-2px {
    margin-left: 2px;
    margin-right: 2px;
  }
</style>
