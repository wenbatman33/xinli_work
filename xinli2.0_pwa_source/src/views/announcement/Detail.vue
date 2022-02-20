<template lang="pug">
//- 公告內容頁面
.flex.flex-col.flex-grow.items-stretch.bg-announcement-detail
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 公告內容
    .flex.flex-col.flex-grow.items-stretch.pb-6
      //- 標題
      .mt-8.mx-8
        .headline2.text-primary {{ title }}

      //- 日期
      .mt-2.mx-8
        .subtitle2.text-primary.opacity-40 {{ date }}

      //- 內容
      .mt-6.mx-8
        .paragraph1.text-primary.opacity-60(v-html='content')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { PullRefresh } from 'vant';
  import { getAnnouncement } from '@/api/event/event';
  import Nav from '@/components/announcement/DetailNav.vue';
  import dayjs from 'dayjs';
  import type { AnnouncementItem } from '@/api/event/model/event-model';

  /**
   * Vue router
   */
  const route = useRoute();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Announcement data
   */
  const announcementData = ref<AnnouncementItem>();

  /**
   * Title
   */
  const title = computed(() => {
    return announcementData.value?.title || '';
  });

  /**
   * Date
   */
  const date = computed(() => {
    const start = announcementData.value?.start || '';
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
    e.innerHTML = announcementData.value?.context || '';
    if (e.childNodes.length >= 1) {
      return e.childNodes[0].nodeValue;
    } else {
      return '';
    }
  });

  /**
   * Get announcement data
   */
  const getAnnouncementData = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get announcement list
      const response = await getAnnouncement();

      // Update announcement data
      announcementData.value = response.data?.data?.list?.find((element) => element.id == route.params.id) || {};
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
    getAnnouncementData();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getAnnouncementData();
  });
</script>

<style scoped lang="scss">
  .bg-announcement-detail {
    background-color: #f5f5f5;
  }
</style>
