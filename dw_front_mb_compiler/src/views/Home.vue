<template lang="pug">
  #home
    HomeBanner(v-if="HomeBanner")
    .d-flex.justify-content-between.align-items-center.my-2.mx-3
      News.mr-2.w-100
      .d-flex.daliySignature.align-items-center(@click='gotoSignature')
        i.fas.fa-calendar-check.mr-1
        span 每日簽到
    Banner
    .gameEntrance.d-flex.flex-column.justify-content-between.p-2.m-3(:class="{'border': !DarkMode}")
      .d-flex.justify-content-between.align-items-center.mb-2.w-100
        .list(
          v-for="item in IndexGameTypeData"
          @click="setType(item.id, item.gameTypeName_Mobile)"
          :class="{'activeList' : item.id === GameType.id}"
        )
          img.listImg.w-100(:src='item.gameTypeBackGroundActive')
          .triangle(v-if='item.id === GameType.id')
      Entrance(:gameType="GameType" :gameGroup="GameGroup")
    HotLinks
    Footer
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HomeBanner from '@/components/bl_Banner/bl_HomeBanner.vue';
import Banner from '@/components/bl_Banner/bl_Banner.vue';
import News from '@/components/bl_News/bl_News.vue';
import Entrance from '@/components/bl_GameSection/bl_Entrance.vue';
import HotLinks from '@/components/bl_HotLinks/bl_HotLinks.vue';
import Footer from '@/components/bl_Footer/bl_Footer.vue';

export default {
  components: {
    HomeBanner,
    Banner,
    News,
    Entrance,
    HotLinks,
    Footer,
  },
  methods: {
    setType(id, name) {
      this.$matomo_game(name);
      const result = this.$store.state.games.IndexGameTypeData.filter(item => item.id === id);
      this.$store.commit('games/setGameType', result[0]);
    },
    gotoSignature() {
      this.$matomo_index_signature();
      window.location.replace(`${window.CASTLEDOMAIN}/signature`);
    },

  },
  computed: {
    ...mapState('index', [
      'HomeBanner',
      'DarkMode',
    ]),
    ...mapState('games', [
      'GameType',
      'IndexGameTypeData',
    ]),
    ...mapGetters('games', [
      'GameGroup',
    ]),
  },
  created() {
    this.$store.dispatch('games/API_IndexGameTypeData').then(() => {
      this.$store.commit('games/setGameType', this.$store.state.games.IndexGameTypeData[0]);
    });
  },
  beforeDestroy() {
    window.document.getElementsByTagName('body')[0].style.height = '';
    window.document.getElementsByTagName('html')[0].style.height = '';
  },
  mounted() {
    window.document.getElementsByTagName('body')[0].style.height = 'auto';
    window.document.getElementsByTagName('html')[0].style.height = 'auto';
  },
};
</script>

<style lang="scss" scoped>
  #home {
    padding-top: 60px;
  }

  .daliySignature {
    border: 1px solid rgb(240, 224, 26);
    padding: 3px 6px;
    color: white;
    background-color: rgb(247, 130, 22);
    border-radius: 15px;
    font-size: $text-12;
    white-space: nowrap;
  }

  .gameEntrance {
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.4) 0px 0px 15px 0px;
  }

  .list {
    position: relative;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border: 2px solid rgb(255,255,255);

    &::after{
      content:"";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 10px 0 10px;
      border-color: transparent transparent transparent transparent;
      position: absolute;
      bottom: -10px;
    }
  }

  .activeList {
    border: 2px solid $theme;
    position: relative;
  }

  .listImg{
    border-radius: 8px;
  }
  .triangle{
    position: absolute;
    border-color: $theme transparent transparent transparent;
    border-style: solid solid solid solid;
    border-width: 10px;
    height: 0px;
    width: 0px;
    bottom:-20px;
  }
</style>
