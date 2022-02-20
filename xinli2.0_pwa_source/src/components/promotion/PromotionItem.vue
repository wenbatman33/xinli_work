<template lang="pug">
//- 優惠物件
.relative.flex.flex-col.items-stretch.rounded.shadow.bg-white.my-2.pb-4(@click='handlePromotionClick')
  img.relative.z-10.w-full.h-36.object-cover.rounded-t(:src='imgUrl(item?.imageH5)', @error='errorImg')
  .absolute.z-20.top-2.left-2.caption.text-white.bg-accent.rounded.py-1.px-3 {{ status }}
  .relative.z-10.subtitle.text-primary.whitespace-nowrap.overflow-hidden.overflow-ellipsis.px-4.pt-4 {{ title }}
  .relative.z-10.body3.text-primary.opacity-40.whitespace-nowrap.overflow-hidden.overflow-ellipsis.px-4.pt-1(v-html='content')
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { imgUrl, errorImg, deepLink } from '@/utils';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { PromotionItem } from '@/api/payment/model/promotion-model';

  /**
   * Component props interface
   */
  interface Props {
    item?: PromotionItem;
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
   * Status
   */
  const status = computed(() => {
    var startTime: Dayjs;
    try {
      startTime = dayjs(props.item?.startTime, 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      startTime = dayjs();
    }
    var endTime: Dayjs;
    try {
      endTime = dayjs(props.item?.endTime, 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      endTime = dayjs();
    }
    const current = dayjs();
    if (current.isAfter(endTime)) {
      return t('promotion_expired');
    } else if (current.isAfter(startTime)) {
      return t('promotion_active');
    } else {
      return t('promotion_apporaching');
    }
  });

  /**
   * Title
   */
  const title = computed(() => {
    return props?.item?.name;
  });

  /**
   * Content
   */
  const content = computed(() => {
    const e = document.createElement('textarea');
    e.innerHTML = props?.item?.content || '';
    if (e.childNodes.length >= 1) {
      return e.childNodes[0].nodeValue;
    } else {
      return '';
    }
  });

  /**
   * Handle promotion item clicked
   */
  const handlePromotionClick = () => {
    if (props.item?.openWay == 2 || props.item?.openWay == 3) {
      deepLink(props.item?.openLink);
    } else {
      router.push({
        path: `/promotion/detail/${props.item?.id}`,
      });
    }
  };
</script>
