<template lang="pug">
//- 下拉刷新
PullRefresh.flex.flex-col.flex-grow.items-stretch(v-model='refreshing', @refresh='handleRefresh')
  //- 優惠詳細頁面
  .flex.flex-col.flex-grow.items-stretch
    //- 優惠圖片
    img.relative.z-10.w-full.h-40.object-cover(:src='imgUrl(promotionData?.imageH5)', @error='errorImg')

    //- 關閉按鈕
    BackButton.absolute.z-20.top-2.right-3(:src='iconCircleClosePrimary40', noPadding)

    //- 標題
    .px-6.mt-6.headline3.text-primary {{ title }}

    //- 內容
    .flex-grow.px-6.mt-4.body3.text-primary.opacity-60.pb-6(v-html='content')

    //- 功能列(relative)
    ToolBar(:item='promotionData')

    //- 功能列(fixed)
    ToolBar.fixed.z-30.left-0.right-0.bottom-0(:item='promotionData', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { PullRefresh } from 'vant';
  import { staticImgUrl, imgUrl, errorImg, deepLink } from '@/utils';
  import { getPromotionOne } from '@/api/payment/promotion';
  import ToolBar from '@/components/promotion/ToolBar.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import type { PromotionItem } from '@/api/payment/model/promotion-model';

  /**
   * Static icons
   */
  const iconCircleClosePrimary40 = staticImgUrl('icon-circle-close-primary40.svg');

  /**
   * Vue router
   */
  const route = useRoute();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Promotion data
   */
  const promotionData = ref<PromotionItem>({});

  /**
   * Title
   */
  const title = computed(() => {
    return promotionData.value?.name;
  });

  /**
   * Content
   */
  const content = computed(() => {
    const e = document.createElement('textarea');
    e.innerHTML = promotionData.value?.content || '';
    if (e.childNodes.length >= 1) {
      return e.childNodes[0].nodeValue;
    } else {
      return '';
    }
  });

  /**
   * Get promotion data
   */
  const getPromotionData = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get promotion data
      const response = await getPromotionOne({
        ID: route.params.id.toString(),
      });

      // Update promotion data
      promotionData.value = response.data?.data || {};
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      refreshing.value = false;
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getPromotionData();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getPromotionData();
  });
</script>

<style scoped lang="scss">
  ::v-deep(.van-pull-refresh__track) {
    display: flex;
    flex-grow: 1;
  }
</style>
