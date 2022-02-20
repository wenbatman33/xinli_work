<template lang='pug'>
  .container-fluid.tgGamePgae
    tgNavi
    tgBrandBanner
    tgGamesTab
    tgGamesSearch(v-if='Searching')
    div(v-else)
      .container.mt-5.mb-5(v-if='gamesCollectionData')
        .row.mt-3
          .col-12
            h4.title 收藏清单
        .row.mb-5(v-if='gamesCollectionData.length>0')
          .col-3.gameCard.mt-3.mb-3(v-for="(game,index) in gamesCollectionData"  :id='"game"+game.Sn'  :ref="game.Sn")
            tgGamesCard(:gameData='game' @cancelCollection='cancelCollection')
        .row.mb-5(v-if='gamesCollectionDataLength<=0')
          .col-12.nullContent.d-flex.justify-content-center.align-items-center.flex-column
            p
              img(src='/static/img/status-favor.png')
            h4.text-center.title 您还没收藏过游戏…快去收藏！
            p.text-center 点击游戏下方的「爱心」加入收藏
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBrandBanner from '@/components/tgGames/tgBrandBanner/tgBrandBanner.vue';
import tgGamesTab from '@/components/tgGames/tgGamesTab/tgGamesTab.vue';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgGamesSearch from '@/components/tgGames/tgGamesSearch/tgGamesSearch.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      gamesCollectionData: '',
      gamesCollectionDataLength: 0,
    };
  },
  components: {
    tgNavi,
    tgBrandBanner,
    tgGamesTab,
    tgGamesCard,
    tgFooter,
    tgGamesSearch,
  },
  watch: {
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
    ]),
    ...mapState('game', [
      'gamesCollection',
      'Searching',
    ]),
    getGameCollectionLengt() {
      let gameCollectionLength = 0;
      this.$store.state.game.gameList.map((obj) => {
        if (obj.Collection > 0) {
          gameCollectionLength += 1;
        }
        return '';
      });
      return gameCollectionLength;
    },
  },
  methods: {
    init() {
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      payload.Type = 1;
      this.$store.dispatch('game/API_GamesCollectionList', payload)
        .then((res) => {
          vm.gamesCollectionData = res.data.data;
          vm.gamesCollectionDataLength = res.data.data.length;
        });
    },
    cancelCollection(Sn) {
      const game = document.getElementById(`game${Sn}`);
      game.parentNode.removeChild(game);
      this.gamesCollectionDataLength -= 1;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.hide{
  display: none;
}
</style>
