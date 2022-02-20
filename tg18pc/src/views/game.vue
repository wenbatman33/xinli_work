<template lang="pug">
  .container-fluid
    tgNavi
    tgBrandBanner
    tgGamesTab
    tgGamesSearch(v-if='Searching')
    tgGamesBrandBtns
    tgGameJackpot(v-if='(query=="pt" || query == "PT") && Jackpot>0', :jackpot='Jackpot')
    tgGamesContent(:currentGroupId='currentGroupId',:currentGameType='currentGameType')
    tgFooter
</template>
<script>
import axios from 'axios';
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBrandBanner from '@/components/tgGames/tgBrandBanner/tgBrandBanner.vue';
import tgGamesTab from '@/components/tgGames/tgGamesTab/tgGamesTab.vue';
import tgGamesSearch from '@/components/tgGames/tgGamesSearch/tgGamesSearch.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgGamesBrandBtns from '@/components/tgGames/tgGamesBrandBtns/tgGamesBrandBtns.vue';
import tgGamesContent from '@/components/tgGames/tgGamesContent/tgGamesContent.vue';
import tgGameJackpot from '@/components/tgGames/tgGameJackpot/tgGameJackpot.vue';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      path: '',
      query: '',
      parHash: '',
      GameType: '',
      payload: {
        GroupName: '',
        GameType: '',
      },
    };
  },
  computed: {
    ...mapState('game', [
      'Searching',
      'currentGroupId',
      'currentGameType',
    ]),
    ...mapState('index', [
      'Jackpot',
    ]),
    getGameType() {
      return this.$route.path.split('/')[1];
    },
  },
  components: {
    tgNavi,
    tgBrandBanner,
    tgGamesTab,
    tgFooter,
    tgGamesSearch,
    tgGamesBrandBtns,
    tgGamesContent,
    tgGameJackpot,
  },
  methods: {
    getData() {
      this.$store.dispatch('game/API_getCurrentGroupId', this.payload);
      this.$store.commit('game/setCurrentGroupName', this.query);
      this.$store.commit('game/setCurrentGameType', this.payload.GameType);
      this.$store.commit('game/setCurrentGameTypeName', this.path[1]);
    },
    init() {
      this.query = this.$route.query.game;
      this.path = this.$route.path.split('/');
      this.payload.GroupName = this.query;
      if (this.path[1] === 'slot') {
        this.payload.GameType = 1;
      } else if (this.path[1] === 'fishing') {
        this.payload.GameType = 2;
      } else if (this.path[1] === 'board') {
        this.payload.GameType = 3;
      } else if (this.path[1] === 'arcade') {
        this.payload.GameType = 4;
      }
      if (this.query === undefined) {
        router.push('/');
      } else {
        this.getData();
      }
    },
  },
  watch: {
    $route(to, from) {
      this.init();
      this.$store.dispatch('game/CloseSearching', '');
    },
  },
  beforeDestroy() {
    this.$store.dispatch('game/CloseSearching', '');
  },
  mounted() {
    this.init();
    this.$store.dispatch('index/API_Jackpot');
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.debug{
  position: fixed;
  background: rgba(0,0,0,.6);
  color: #fff;
  padding: 10px;
  z-index: 100;
  right: 0;
  bottom: 0;
}
</style>
