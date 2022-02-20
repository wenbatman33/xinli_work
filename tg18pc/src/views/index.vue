<template lang="pug">
  .container-fluid
    tgNavi
    tgBanners
    tgJackpot(v-if='Jackpot>0'  :jackpot="Jackpot")
    tgProvider
    tgGamesForIndex
    tgHeroBoard
    tgFooter
</template>

<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBanners from '@/components/tgBanners/tgBanners.vue';
import tgJackpot from '@/components/tgJackpot/tgJackpot.vue';
import tgProvider from '@/components/tgProvider/tgProvider.vue';
import tgGamesForIndex from '@/components/tgGamesForIndex/tgGamesForIndex.vue';
import tgHeroBoard from '@/components/tgHeroBoard/tgHeroBoard.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
    tgNavi,
    tgBanners,
    tgJackpot,
    tgProvider,
    tgGamesForIndex,
    tgHeroBoard,
    tgFooter,
  },
  computed: {
    ...mapState('index', [
      'Jackpot',
    ]),
  },
  mounted() {
    const payload = {};
    payload.GroupId = 1;
    payload.NowTime = 1;
    this.$store.dispatch('index/API_IndexBanner', payload);
    this.$store.dispatch('index/API_Jackpot');
    this.$store.dispatch('index/API_HeroBoard');
    if (this.$route.query.Aid) {
      window.localStorage.setItem('Aid', this.$route.query.Aid);
    }
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
