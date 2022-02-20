<template lang="pug">
//- 公告列表頁面
.flex.flex-col.flex-grow.items-stretch.bg-announcement-list
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0

  //- 公告列表
  AnnouncementList.z-10
</template>

<script setup lang="ts">
  import Nav from '@/components/announcement/ListNav.vue';
  import AnnouncementList from '@/components/announcement/AnnouncementList.vue';
</script>

<style scoped lang="scss">
  .bg-announcement-list {
    background-color: #f5f5f5;
  }
</style>
