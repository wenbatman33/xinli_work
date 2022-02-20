<template lang="pug">
//- 站內信內容頁面
.flex.flex-col.flex-grow.items-stretch.bg-inbox-detail
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 站內信內容
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
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { PullRefresh } from 'vant';
  import { getLetter } from '@/api/event/event';
  import { LocalStorageKeys } from '@/utils/constants';
  import Nav from '@/components/letter/DetailNav.vue';
  import dayjs from 'dayjs';
  import type { LetterItem } from '@/api/event/model/event-model';

  /**
   * Vue router
   */
  const route = useRoute();

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Letter data
   */
  const letterData = ref<LetterItem>({});

  /**
   * Title
   */
  const title = computed(() => {
    return letterData.value.title || '';
  });

  /**
   * Date
   */
  const date = computed(() => {
    const start = letterData.value?.sendAt || '';
    if (start) {
      try {
        return dayjs(start, 'YYYY-MM-DD HH:MM:ss').format('YYYY年MM月DD日 HH:MM');
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
    const content = letterData.value?.content || '';
    e.innerHTML = content.replaceAll('{{memeberAccount}}', window.localStorage.getItem(LocalStorageKeys.MEMBER_ACCOUNT) || '');
    if (e.childNodes.length >= 1) {
      return e.childNodes[0].nodeValue;
    } else {
      return '';
    }
  });

  /**
   * Get letter data
   */
  const getLetterData = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get letter list
      const response = await getLetter({
        ID: route.params.id.toString(),
      });

      // Update letter list
      letterData.value = response.data?.data || {};
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
    getLetterData();
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getLetterData();
  });
</script>

<style scoped lang="scss">
  .bg-inbox-detail {
    background-color: #f5f5f5;
  }
</style>
