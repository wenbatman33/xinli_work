<template lang='pug'>
.pageContent
  .row.no-gutters
    .col-12.text-center
      Banners
  .row.no-gutters.mb-5
    .col-12
      GameList
</template>

<script>
import Banners from '@/components/Banners/Banners.vue';
import GameList from '@/components/GameList/GameList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Banners,
    GameList,
  },
};
</script>
<style lang='sass' scoped>
</style>
