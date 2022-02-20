<template lang="pug">
//- 優惠頁面
.flex.flex-col.flex-grow.items-stretch.bg-promotion
  //- 分類列表(fixed)
  .fixed.z-20.top-0.left-0.right-0.pt-4.flex.flex-col.items-stretch.bg-white
    BasicCategory(:selected='category', textColor='primary', :list='categoryList', @update:selected='handleUpdateCategory')

  //- 分類列表(relative)
  .relative.z-10.pt-4.flex.flex-col.items-stretch.opacity-0
    BasicCategory(:list='categoryList')

  //- 分類
  Swiper.relative.z-10.w-full.flex.flex-col.flex-grow.items-stretch(:autoHeight='false', @swiper='handleSwiper', @slideChange='handleCategorySlideChange')
    SwiperSlide.flex(v-for='item in categoryList')
      PromotionList(:type='item.id')

  //- 標籤列(relative)
  BasicTabBar.opacity-0(:fixed='false')

  //- 標籤列(fixed)
  BasicTabBar(:fixed='true')
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import BasicTabBar from '@/components/tab-bar/BasicTabBar.vue';
  import BasicCategory from '@/components/category/BasicCategory.vue';
  import PromotionList from '@/components/promotion/PromotionList.vue';
  import type { Swiper as SwiperClass } from 'swiper/types';

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Swiper instance reference
   */
  const swiper = ref<SwiperClass>();

  /**
   * Category list
   */
  const categoryList = ref([
    {
      id: 0,
      name: t('promotion_type0'),
    },
    {
      id: 1,
      name: t('promotion_type1'),
    },
    {
      id: 2,
      name: t('promotion_type2'),
    },
    {
      id: 3,
      name: t('promotion_type3'),
    },
    {
      id: 4,
      name: t('promotion_type4'),
    },
    {
      id: 5,
      name: t('promotion_type5'),
    },
  ]);

  /**
   * Category selected
   */
  const category = ref(categoryList.value[0]);

  /**
   * Handle swiper initialized
   */
  const handleSwiper = (swiperInstance: SwiperClass) => {
    swiper.value = swiperInstance;
  };

  /**
   * Handle update selected category
   */
  const handleUpdateCategory = (selected: { id: number; name: string }) => {
    category.value = selected;
    swiper.value?.slideTo(categoryList.value.findIndex((element) => element.id == selected.id));
  };

  /**
   * Handle category swiper slide index changed
   */
  const handleCategorySlideChange = (swiper: SwiperClass) => {
    category.value = categoryList.value[swiper.realIndex];
  };
</script>

<style scoped lang="scss">
  ::v-deep(.swiper-wrapper) {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    align-items: stretch;
  }

  .bg-promotion {
    background-color: #f5f5f5;
  }
</style>
