<template lang="pug">
	.container-fluid
		tgFix
		tgNavi
		tgGamesSearch(v-if='Searching')
		tgBanners(v-if='Searching === false')
		.content(v-if='Searching === false')
			tgJackpot(:jackpot="Jackpot")
			tgProvider
			tgGamesForIndex
			tgHeroBoard
		tgCompany
		tgFooter
</template>

<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBanners from '@/components/tgBanners/tgBanners.vue';
import tgJackpot from '@/components/tgJackpot/tgJackpot.vue';
import tgProvider from '@/components/tgProvider/tgProvider.vue';
import tgGamesForIndex from '@/components/tgGamesForIndex/tgGamesForIndex.vue';
import tgGamesSearch from '@/components/tgGames/tgGamesSearch/tgGamesSearch.vue';
import tgHeroBoard from '@/components/tgHeroBoard/tgHeroBoard.vue';
import tgCompany from '@/components/tgCompany/tgCompany.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
    tgFix,
    tgNavi,
    tgBanners,
    tgJackpot,
    tgProvider,
    tgGamesForIndex,
    tgHeroBoard,
    tgCompany,
    tgFooter,
    tgGamesSearch,
  },
  computed: {
    ...mapState('index', [
      'Jackpot',
    ]),
    ...mapState('game', [
      'Searching',
    ]),
  },
  mounted() {
    this.$store.dispatch('index/API_IndexBanner');
    this.$store.dispatch('index/API_Jackpot');
    this.$store.dispatch('index/API_Provider');
    this.$store.dispatch('index/API_HeroBoard');

    this.$store.state.game.Searching = false;
    this.$store.state.game.gameSearchList = [];
    this.$store.state.index.searchBar = false;

    const payload = {}; 
    if (this.$route.query.Aid) {
      window.localStorage.setItem('Aid', this.$route.query.Aid);
    }
    // this.$store.dispatch('game/API_GameList', payload);
  },
};
</script>
<style lang="css" scoped>
  .container-fluid{
    width: 100%;
  }
  .hotgame ul li {
    width: 41vw;
    margin: 0 2vw 6% 2vw;
}
</style>
