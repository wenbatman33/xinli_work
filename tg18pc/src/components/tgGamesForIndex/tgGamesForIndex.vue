<template lang='pug'>
  .container-fluid.tgGamesContainer
    .container
      .row.mt-3.mb-3
        .col-4.tgGamesInfo.d-flex.flex-column.justify-content-center
          h3 推荐游戏
          p 请试试我们的老虎机游戏，体验中奖不断的惊喜乐趣。
        .gameCard.mt-2.mb-2(v-for='(game , key) in getGamePopularGameList' v-bind:class='[(key===2 | key===5) ? "col-4" : "col-2"]' v-if='game.GameMode ==0 | game.GameMode ==1')
          tgGamesCard(:gameData='game'  :GAcategory='"推薦遊戲"'  :GAlabel='"home_recommendplay"')
</template>
<script>
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import jwtDecode from 'jwt-decode';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    getGamePopularGameList() {
      return this.$store.state.game.gamePopularGameList;
    },
  },
  components: {
    tgGamesCard,
  },
  methods: {
    init() {
      const payload = {};
      this.$store.dispatch('game/API_PopularGameList', payload);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
  .tgGamesContainer{
    padding: 10px 0;
    background-image: linear-gradient(248deg, #002766, #001332);
  }
  .tgGamesInfo{
    h3{
      color: #fff;
      font-size: 26px;
      font-weight: 600;
    }
    p{
      font-size: 14px;
      line-height: 28px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      text-align: left;
      color: #8c8c8c;
    }
  }
  .el-row{
    padding: 10px;
  }
  .card{
    padding: 5px;
  }
  .tgGamesCard{
    min-height: 100px;
    background: #00173C;
    background-image: url('/static/img/hotgame_000.png');
    background-repeat: no-repeat;
    background-position: center center; 
    color: #000;
    img{
      width: 200px;
    }
  }
  .card{
    position: relative;
    height: 180px;
    overflow: hidden;
  }
  .cardImg{
    position: relative;
    width: 100%;
    height: 180px;
  }
  .tgGamesNmae{
    position: relative;
    width: 100%;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    margin-top: -36px;
    z-index: 1;
    background: rgba(0,0,0,.6);
    color: #fff;
  }
</style>
