<template lang='pug'>
  .content
    tgGamesBrandBtns
    tgGameJackpot(v-if='query == "PT" && getJackpot>0' :jackpot="getJackpot")
    tgGamesContent
</template>
<script>
import router from '@/router/router';
import tgGamesBrandBtns from '@/components/tgGames/tgGamesBrandBtns/tgGamesBrandBtns.vue';
import tgGamesContent from '@/components/tgGames/tgGamesContent/tgGamesContent.vue';
import tgGameJackpot from '@/components/tgGames/tgGameJackpot/tgGameJackpot.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      Jackpot: 0,
      GameType: '',
      payload: {
        GroupName: '',
        GameType: '',
      },
      query: '',
      parHash: '',
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  computed: {
    ...mapState('game', [
      'currentGroupId',
      'currentGameType',
      'PTJackpot',
      'PGJackpot',
      'PPJackpot',
    ]),
    ...mapState('index', [
      'gameProviderIndexName',
      'slotProviderIndexName',
      'fishingroviderIndexName',
    ]),
    getJackpot() {
      const Jackpot = this.PTJackpot;
      return Jackpot;
    },
  },
  components: {
    tgGamesBrandBtns,
    tgGamesContent,
    tgGameJackpot,
  },
  methods: {
    getData() {
      this.$store.dispatch('game/API_getCurrentGroupId', this.payload);
      this.$store.commit('game/setCurrentGroupName', this.query);
      this.$store.commit('game/setCurrentGameType', this.payload.GameType);
      this.$store.commit('game/setCurrentGameTypeName', this.parHash);
    },
    init() {
      this.query = this.$route.query.game.toUpperCase();
      const path = this.$route.path.split('/')[2];
      this.parHash = path;
      this.payload.GroupName = this.query;
      if (this.parHash === 'slot') {
        this.payload.GameType = 1;
        this.$store.state.index.gameProviderIndexName = this.gameProviderIndexName;
      } else if (this.parHash === 'fishing') {
        this.payload.GameType = 2;
        this.$store.state.index.gameProviderIndexName = this.slotProviderIndexName;
      } else if (this.parHash === 'board') {
        this.payload.GameType = 3;
        this.$store.state.index.gameProviderIndexName = this.fishingroviderIndexName;
      }
      this.getData();
    },
  },
  mounted() {
    this.init();
    // this.$store.dispatch('index/API_Jackpot');
  },
};
</script>
<style lang="scss" scoped>
  .tgGamePgae {
    min-height:400px;
    background-image: #fff
  }

  .el-row {
    padding: 10px;
  }
  .card {
    padding: 5px;
  }
</style>
