<template lang="pug">
    .sidebar__container
      .active__bg(:style="`transform: translate(0px, ${80 * ActiveTag}px)`")
      .sidebar__content
        .sidebar__item.mb-2(v-for="(item, index) in IndexGameTypeData" :key="item.id" :class="{'active': index === ActiveTag || index === ActiveTag + 1 || index === ActiveTag + 2}" @click="setType(item.id, index)")
          //- i.fab.fa-affiliatetheme.mb-2
          .sidebar__item__icon.mb-2(v-if="index === ActiveTag || index === ActiveTag + 1 || index === ActiveTag + 2" :style="'backgroundImage: url(' + item.gameTypeBackGroundActive +')'")
          .sidebar__item__icon.mb-2(v-else :style="'backgroundImage: url(' + item.gameTypeBackGroundUnactive +')'")
          span {{ item.gameTypeName_Mobile }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tagLength: 3,
      tagMax: 0,
      // 體育類別到最上面的高度
      top: 294.90625,
    }
  },
  methods: {
    setType(id, index) {
      const result = this.$store.state.games.IndexGameTypeData.filter(item => item.id === id);
      this.$store.commit('games/setGameType', result[0]);
      if(index <= (this.tagMax - this.tagLength)) {
        this.$store.commit('index/setActiveTag', index);
      } else {
        this.$store.commit('index/setActiveTag', this.tagMax - this.tagLength);
      }
      // hash
      this.$router.push({hash: `list-item-${id}`}).catch(err => {});
      const path = this.$route.hash.split('#')[1];
      const blockTop = document.getElementById(path).offsetTop;
      window.scrollTo(0, (this.top + blockTop) - 60);
    },
  },
  computed: {
    ...mapState('games', [
      'IndexGameTypeData',
      'GameType',
    ]),
    ...mapState('index', [
      'ActiveTag',
    ]),
  },
  created() {
    this.$store.dispatch('games/API_IndexGameTypeData').then((res) => {
      this.tagMax = res.data.data.length;
      this.$store.commit('games/setGameType', this.$store.state.games.IndexGameTypeData[0]);
    });
    window.scrollTo(0, 0);
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  &__container {
    position: sticky;
    top: 60px;
    height: 100%;
    background: linear-gradient(to top, rgb(244, 246, 249), rgb(215, 223, 235));
    padding: 30px 0px;
    border-radius: 20px;

    .active__bg {
      height: 250px;
      position: absolute;
      top: 20px;
      width: 100%;
      background-color: $theme;
      border-radius: 20px;
      transition: .5s;
    }
  }

  &__content {
    position: relative;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32px;

    .active {
      color: white;
    }
  }

  &__item {
    color: $origin_dark;
    text-decoration: none;
    text-align: center;
    display: flex;
    flex-direction: column;

    &__icon {
      height: 16px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
