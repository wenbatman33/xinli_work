<template lang='pug'>
.recommendContent
  div(v-if='gameList.length>0')
    swiper(:options="swiperOptionRecommend"   :ref="initSwiper")
      swiper-slide(v-for='(game, index) in gameList' :key='index')
        tgGamesCard(:gameData='game'  :GAcategory='"平台遊戲"'  :GAlabel='"game_platform"')
      .swiper-button-prev(slot='button-prev')
      .swiper-button-next(slot='button-next')
</template>
<script>
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  props: ['GroupId', 'GameTagGroupId'],
  data() {
    return {
      gameList: [],
      swiperOptionRecommend: {
        notNextTick: true,
        slidesPerView: 4,
        spaceBetween: 10,
        observer: true,
        mousewheelControl: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  computed: {
    getRecommenGameFilterResult() {
      return this.$store.state.game.gameRecommendList;
    },
    initSwiper() {
      return `mySwiper${this.GameTagGroupId}`;
    },
    swiper() {
      return this.$refs.this.initSwiper().swiper;
    },
  },
  components: {
    tgGamesCard,
    swiper,
    swiperSlide,
  },
  beforeDestroy() {
    // this.swiper.destroy()
    // console.log(this.swiper)
  },
  mounted() {
    const payload = {};
    payload.GameTagGroupId = this.GameTagGroupId;
    // this.$store.dispatch('game/API_RecommendGameList', payload)
    const vm = this;
    axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameList/`, payload)
      .then((res) => {
        vm.gameList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
.recommendContent{
  width: 100%;
  min-height: 180px;
}
</style>
