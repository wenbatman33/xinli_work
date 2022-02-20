<template lang="pug">
//- 內開網頁
.flex.flex-grow.flex-col.items-stretch
  //- 導覽欄
  BasicNav(:title='title')
    //- 右側
    template(#right)
      //- 關閉
      BasicButton(rounded='full', @click='handleCloseClick')
        img.p-2(:src='iconClosePrimary')

  //- 網頁內容
  iframe.flex-grow(:src='url')
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconRefreshPrimary = staticImgUrl('icon-refresh-primary.svg');

  /**
   * Vue router
   */
  const route = useRoute();
  const router = useRouter();

  /**
   * Title
   */
  const title = computed(() => {
    return route?.query?.title?.toString() || '';
  });

  /**
   * Url
   */
  const url = computed(() => {
    return route?.query?.url?.toString() || '';
  });

  /**
   * Handle close button clicked
   */
  const handleCloseClick = async () => {
    router.replace({
      path: '/',
    });
  };
</script>
