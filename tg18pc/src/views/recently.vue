<template lang='pug'>
  .container-fluid.tgGamePgae
    tgNavi
    tgBrandBanner
    tgGamesTab
    tgGamesSearch(v-if='Searching')
    div(v-else)
      .container.mt-5.mb-5
        .row.mt-3
          .col-12
            h4.title 最近玩过
        .row.mb-5(v-if='gamesRecently.length>0')
          .col-3.gameCard.mt-3.mb-3(v-for="(game, index) in gamesRecently" )
            tgGamesCard(:gameData='game' ref='gameCard')
        .row.mb-5(v-if='gamesRecently.length<=0')
          .col-12.nullContent.d-flex.justify-content-center.align-items-center.flex-column(v-if='gamesRecently.length<=0')
            p
              img(src='/static/img/status-recent.png')
            h4.text-center.title 您还没有游戏记录呦~
            p.text-center 点击上方「游戏平台」进行游玩
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBrandBanner from '@/components/tgGames/tgBrandBanner/tgBrandBanner.vue';
import tgGamesTab from '@/components/tgGames/tgGamesTab/tgGamesTab.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import tgGamesSearch from '@/components/tgGames/tgGamesSearch/tgGamesSearch.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
    tgNavi,
    tgBrandBanner,
    tgGamesTab,
    tgFooter,
    tgGamesCard,
    tgGamesSearch,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
    ]),
    ...mapState('game', [
      'gamesRecently',
      'Searching',
    ]),
    getGameList() {
      return this.$store.state.game.gamesRecently;
    },
    getGamePlayLength() {
      let gamePlayLength = 0;
      this.$store.state.game.gameList.map((obj) => {
        if (obj.Play > 0) {
          gamePlayLength += 1;
        }
        return '';
      });
      return gamePlayLength;
    },
  },
  methods: {
    init() {
      const payload = {};
      payload.UserId = this.UserId;
      payload.Type = 2;
      this.$store.dispatch('game/API_GamesRecentlyList', payload);
    },
  },
  beforeDestroy() {
    this.$store.dispatch('game/CloseSearching', '');
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.tgGamePgae{
  min-height:400px;
  background-image: #fff
}
.title{
  .subTitle{
    margin-left: 10px;
    font-size: 13px;
    color: #8c8c8c;
  }
}
.nullContent{
  height: 300px;
}
.recommendRow{
  margin: 10px 0;
}
</style>
