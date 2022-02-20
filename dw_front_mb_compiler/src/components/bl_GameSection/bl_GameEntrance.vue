<template lang="pug">
  .GameEntrance
    Entrance(v-for="(type, key) in IndexGameTypeData" :id="`list-item-${type.id}`" :key="type.id" :gameType="type" :gameGroup="type.gameGroups.data")
</template>

<script>
import { mapState } from 'vuex';
import Entrance from '@/components/bl_GameSection/bl_Entrance.vue';

export default {
  components: {
    Entrance,
  },
  methods: {
    setType(index) {
      this.$store.commit('games/setGameType', this.$store.state.games.IndexGameTypeData[index]);
    },
  },
  computed: {
    ...mapState('games', [
      'IndexGameTypeData',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.GameEntrance {
  height: 100%;
  position: relative;
  width: 100%;
  padding-bottom: 50px;

  .all {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: top 0.5s ease-out;
  }
}
</style>
