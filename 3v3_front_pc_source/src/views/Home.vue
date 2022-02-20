<template lang="pug">
  #home
    Header
    .d-flex.h-100.overflow-auto
      Sidebar
      router-view
</template>

<script>
import Header from '@/views/layout/header.vue';
import Sidebar from '@/views/layout/sidebar.vue';

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
