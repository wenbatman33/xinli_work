<template lang="pug">
//- 公告物件
BasicButton.mx-4.mt-4(content='stretch', bg='#ffffff', rounded='md', @click='handleItemClick')
  //- 物件內容
  .flex.flex-col.items-stretch.p-4
    //- 標題列
    .grid.grid-cols-title.gap-2.items-center
      //- 公告圖示
      img.w-5.h-5(:src='iconNoticeYellow')

      //- 標題
      .headline3.text-primary.text-left.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ title }}

    //- 日期
    .mt-2.body2.text-primary.text-left.opacity-40 {{ date }}

    //- 內容
    .mt-2.body2.text-primary.text-left.opacity-40.overflow-hidden.overflow-ellipsis.line-clamp-6(v-html='content')
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { AnnouncementItem } from '@/api/event/model/event-model';

  /**
   * Static icons
   */
  const iconNoticeYellow = staticImgUrl('icon-notice-yellow.svg');

  /**
   * Component props interfcae
   */
  interface Props {
    /**
     * Announcement item
     */
    item?: AnnouncementItem;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Title
   */
  const title = computed(() => {
    return props.item?.title || '';
  });

  /**
   * Date
   */
  const date = computed(() => {
    const start = props.item?.start || '';
    if (start) {
      try {
        return dayjs(start, 'YYYY-MM-DD HH:MM:ss').format('YYYY年MM月DD日');
      } catch (e) {
        return start;
      }
    } else {
      return '';
    }
  });

  /**
   * Content
   */
  const content = computed(() => {
    const e = document.createElement('textarea');
    e.innerHTML = props.item?.context || '';
    if (e.childNodes.length >= 1) {
      return e.childNodes[0].nodeValue;
    } else {
      return '';
    }
  });

  /**
   * Handle item click
   */
  const handleItemClick = () => {
    const id = props.item?.id;
    if (id) {
      router.push({
        path: `/announcement/detail/${id}`,
      });
    }
  };
</script>

<style scoped lang="scss">
  .grid-cols-title {
    grid-template-columns: auto 1fr;
  }
</style>
