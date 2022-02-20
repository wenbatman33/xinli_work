<template lang="pug">
//- 下拉刷新
PullRefresh.flex.flex-col.flex-grow.items-stretch(v-model='refreshing', @refresh='handleRefresh')
  //- 沒有優惠
  .mt-40.flex.flex-col.items-center(v-if='empty')
    //- 圖示
    img.w-18.h-18(:src='iconNoEventGray')

    //- 提示
    .mt-6.body2.text-primary.opacity-40 {{ t("promotion_empty") }}

  //- 優惠列表
  .flex.flex-col.items-stretch.px-4.pt-1.pb-6(v-else)
    //- 優惠物件
    PromotionItem(v-for='item in promotionList', :item='item')
</template>

<script setup lang="ts">
  import { defineProps, ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PullRefresh } from 'vant';
  import { useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import { getPromotion } from '@/api/payment/promotion';
  import PromotionItem from '@/components/promotion/PromotionItem.vue';
  import type { PromotionItem as PromotionItemType } from '@/api/payment/model/promotion-model';

  /**
   * Static icons
   */
  const iconNoEventGray = staticImgUrl('icon-no-event-gray.svg');

  /**
   * Component props interface
   */
  interface Props {
    type?: number;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Promotion list
   */
  const promotionList = ref<PromotionItemType[]>([]);

  /**
   * Empty
   */
  const empty = computed(() => {
    return promotionList.value.length === 0;
  });

  /**
   * Get promotion list
   */
  const getPromotionList = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get promotion list
      const response = await getPromotion({
        type: props.type,
      });

      // Update promotion list
      const list = response.data?.data?.list || [];
      promotionList.value = list.sort((a, b) => {
        if (a.top == 1 && b.top != 1) {
          return -1;
        }
        if (a.top != 1 && b.top == 1) {
          return 1;
        }
        return (a.orderNo || 0) - (b.orderNo || 0);
      });
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
    getPromotionList();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getPromotionList();
  });
</script>
