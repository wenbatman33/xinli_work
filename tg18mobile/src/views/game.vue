<template lang="pug">
	.container-fluid
		tgFix
		tgNavi
		tgGameBanners
		tgGamesTab
		router-view
		tgCompany
		tgFooter
</template>
<script>
import router from '@/router/router';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgGameBanners from '@/components/tgGames/tgGameBanners/tgGameBanners.vue';
import tgGamesTab from '@/components/tgGames/tgGamesTab/tgGamesTab.vue';
import tgCompany from '@/components/tgCompany/tgCompany.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgFix,
    tgNavi,
    tgGamesTab,
    tgCompany,
    tgFooter,
    tgGameBanners,
  },
  computed: {
    ...mapState('index', [
      'slotProvider',
    ]),
  },
  mounted() {
    this.$store.dispatch('index/API_IndexBanner');
    this.$store.dispatch('game/GamesJackpot');
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    init() {
      const path = this.$route.path.split('/')[2];
      this.parHash = path;
      this.query = this.$route.query.game;
      if ((this.query === undefined || this.query === '') && this.parHash === '') {
        router.push(`/games/slot?game=${this.slotProvider[0].GroupName}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
	.container-fluid{
		width: 100%;
	}
  .tgBanners{
		width: 100%;
    height: 64vw;
    background:#000;
    overflow: hidden;
  }
  .banner{
    height: 64vw !important;
    background-repeat: no-repeat;
  }
</style>
