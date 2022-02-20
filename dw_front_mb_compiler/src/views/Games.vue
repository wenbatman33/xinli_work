<template lang="pug">
  Games(v-if="GamePageType === 0")
  GamesSearch(v-else-if="GamePageType === 1")
  GamesFilter(v-else-if="GamePageType === 2")
</template>

<script>
import { mapState } from 'vuex';
import Games from '@/components/bl_Games/bl_Games.vue';
import GamesSearch from '@/components/bl_Games/bl_GamesSearch.vue';
import GamesFilter from '@/components/bl_Games/bl_GamesFilter.vue';

export default {
  components: {
    Games,
    GamesSearch,
    GamesFilter,
  },
  computed: {
    // gamepagetype 更換成 filter or search
    ...mapState('games', [
      'IndexGameTypeData',
      'GamePageType',
      'GameType',
    ]),
  },
  created() {
    this.$store.dispatch('games/API_IndexGameTypeData').then((res) => {
      if (res.status === 200 && res.data.status === 1) {
        const gametype = res.data.data.filter(item => item.id === Number(this.$route.query.group));
        this.$store.commit('games/setGameType', gametype[0]);
      }
    });
  },
};
</script>
