<template lang="pug">
//- 公告
.flex.flex-col.items-stretch
  //- 公告讀取中
  Loading.mt-2.self-center(v-if='announcementListLoading', type='spinner', size='16px')

  //- 公告輪播
  BasicButton(v-else, rounded='normal', content='left', @click='handleClick')
    //- 水平格狀排列
    .grid.grid-cols-notice.gap-4.items-center.p-2
      //- 公告圖示
      img.w-4.h-4(:src='iconNoticePrimary30')

      //- 公告輪播
      Swiper.w-full.h-6(direction='vertical', :modules='[Autoplay]', :autoplay='{ delay: 3500, disableOnInteraction: false }', :loop='true', @slideChange='handleSlideChange')
        SwiperSlide.flex.flex-row.items-center(v-for='item in announcementList')
          p.body3.text-primary.opacity-30.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ item.title }}
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { Autoplay } from 'swiper';
  import { useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { getAnnouncement } from '@/api/event/event';
  import BasicButton from '@/components/button/BasicButton.vue';
  import type { Swiper as SwiperClass } from 'swiper/types';
  import type { AnnouncementItem } from '@/api/event/model/event-model';
  import 'swiper/css';

  /**
   * Static icons
   */
  const iconNoticePrimary30 = staticImgUrl('icon-notice-primary30.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Swiper active index
   */
  const activeIndex = ref(0);

  /**
   * Announcement list loading status
   */
  const announcementListLoading = ref(false);

  /**
   * Announcement list
   */
  const announcementList = ref<AnnouncementItem[]>([]);

  /**
   * Get announcement list
   */
  const getAnnouncementList = async () => {
    try {
      // Turn loading on
      announcementListLoading.value = true;

      // Get announcement list
      const response = await getAnnouncement();
      announcementList.value = response.data?.data?.list || [];
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      announcementListLoading.value = false;
    }
  };

  /**
   * Handle swiper clicked
   */
  const handleClick = () => {
    const index = activeIndex.value;
    const item = announcementList.value[index] || announcementList.value[0];
    if (item.id) {
      router.push({
        path: `/announcement/detail/${item.id}`,
      });
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
    getAnnouncementList();
  });
</script>

<style scoped lang="scss">
  .grid-cols-notice {
    grid-template-columns: auto 1fr;
  }
</style>
