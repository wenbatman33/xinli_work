<template lang='pug'>
.container-fluid.tgProviderBanner
  swiper(v-if='brandBannerList.length>0' ref='mySwiper' :options='swiperOption') 
    swiper-slide(v-for='(item, key, index) in brandBannerList' :key='key')
      .banner(@click='goUrl(item.Link,item.Sn)')
        .bgImg
        .providerBanner
          .providerBannerInner
            .mg_banner
              img(:src='item.Images')
    .swiper-pagination(slot="pagination")
</template>
<script>
import router from '@/router/router';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

const { Swiper } = window;
export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        notNextTick: false,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
      },
    };
  },
  computed: {
    ...mapState('game', [
      'brandBannerList',
    ]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  beforeDestroy() {
    this.swiper.destroy();
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    goUrl(url, Sn) {
      window.open(url);
      this.GA_game_bannermobile(Sn);
    },
    getCardImgSrcStyle(src) {
      const cardStyle = `
        background: url(${src});
        background-size: cover;
        filter: blur(20px);
        -webkit-filter: blur(20px);`;
      return cardStyle;
    },
    init() {
      const payload = {};
      const path = this.$route.path.split('/');
      const parHash = path[2];
      if (parHash === 'recommend') {
        payload.GroupId = 5;
      } else if (parHash === 'collection') {
        payload.GroupId = 6;
      } else if (parHash === 'recently') {
        payload.GroupId = 7;
      } else {
        payload.GroupName = this.$route.query.game;
      }
      this.$store.dispatch('game/API_BrandBannerList', payload);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
  .providerBannerInner {
    .mg_banner {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      // padding: 15px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // .mg_banner_caption {
  //   margin: 0 auto;
  //   width: 100%;
  //   max-width: 420px;
  //   padding: 0 2vw;
  //   text-align: center;
  //   h4, p {
  //     color: rgba(255,255,255,1);
  //   }
  // }
  .banner{
    height: 40vw;
    background-repeat: no-repeat;
  }
  .tgProviderBanner{
    position: relative;
    height: 40vw;
    overflow: hidden;
    background-image: linear-gradient(to left, #222222, #4a4a4a);
  }
  .bgImg{
    position: absolute;
    width: 100%;
    height: 40vw;
    top: 0;
    z-index: 1;
  }
  .providerBanner{
    position: absolute;
    width: 100%;
    height: 40vw;
    top: 0;
    z-index: 2;
  }
  .providerBannerInner{
    width: 100%;
    height: 40vw;
  }
  .bannerImg{
    img{
      width: 100%;
      height: auto;
    }
  }
  .content{
    color:#fff;
  }
  .bannerBtn{
    color:#000;
    background: #fadb14;
    border: 1px solid #fadb14;
    &:hover{
      background: #F5E057;
      border: 1px solid #F5E057;
    }
  }
</style>
