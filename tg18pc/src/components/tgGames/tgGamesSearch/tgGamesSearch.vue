<template lang='pug'>
  .container-fluid.tgGamesContainer
    .container.mt-5.mb-5
      .row.mt-3
        .col-10
          h4.title 搜寻结果
        .col-2.text-right
          el-tooltip(effect='dark', content='关闭搜寻', placement='top-end')
            i.closeSearch.el-icon-close.float-right(@click='closeSearch')
      .row.mb-5
        .col-3.mt-2.mb-2(v-for='game in gameSearchList')
          tgGamesCard(:gameData='game')
        .col-12(v-if='gameSearchList.length===0')
          .cardItemNull.d-flex.justify-content-center.align-items-center
            h2.text-center 未符合搜寻條件
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgGamesCard,
  },
  computed: {
    ...mapState('game', [
      'gameSearchList',
    ]),
  },
  methods: {
    closeSearch() {
      this.$store.dispatch('game/CloseSearching', '');
    },
  },
};
</script>
<style lang="scss" scoped>

.closeSearch{
  font-size: 24px;
  cursor: pointer;
}
</style>
