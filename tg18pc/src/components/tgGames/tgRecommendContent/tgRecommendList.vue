<template lang='pug'>
.recommendContent
  .row.mb-5(v-if='gameListLength')
    .col-3.gameCard.mt-3.mb-3(v-for="(game, index) in gameList.data_list" v-if='game.GameMode ==0 | game.GameMode ==1')
      tgGamesCard(:gameData='game' ref='gameCard'  :GAcategory='GAcategory'  :GAlabel='GAlabel')
</template>
<script>
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['GroupId', 'GameTag', 'listItem', 'GAcategory', 'GAlabel'],
  data() {
    return {
      gameList: [],
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
    gameListLength() {
      return Object.keys(this.gameList).length;
    },
    getRecommenGameFilterResult() {
      return this.$store.state.game.gameRecommendList;
    },
  },
  components: {
    tgGamesCard,
  },
  mounted() {
    const payload = {};
    payload.GameTag = this.GameTag;
    payload.Page = 1;
    payload.PageLimit = this.listItem;
    if (this.UserId) {
      payload.UserId = this.UserId;
    }
    // this.$store.dispatch('game/API_RecommendGameList', payload)
    const vm = this;
    axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameList/`, payload)
      .then((res) => {
        vm.gameList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
.recommendContent{
  width: 100%;
  min-height: 180px;
}
</style>
