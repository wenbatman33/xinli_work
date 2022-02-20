<template lang="pug">
//- 下拉刷新
PullRefresh(v-model='refreshing', @refresh='handleRefresh')
  //- 公告列表
  .flex.flex-col.items-stretch.pt-2.pb-6
    //- 公告物件
    AnnouncementItem(v-for='item in announcementList', :item='item')
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PullRefresh } from 'vant';
  import { getAnnouncement } from '@/api/event/event';
  import AnnouncementItem from '@/components/announcement/AnnouncementItem.vue';
  import type { AnnouncementItem as AnnouncementItemType } from '@/api/event/model/event-model';

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Announcement list
   */
  const announcementList = ref<AnnouncementItemType[]>([]);

  /**
   * Get announcement list
   */
  const getAnnouncementList = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get announcement list
      const response = await getAnnouncement();

      // Update announcement list
      announcementList.value = response.data?.data?.list || [];
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
    getAnnouncementList();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getAnnouncementList();
  });
</script>
