<template lang='pug'>
  .tgBanners
    swiper.bannersswiper(v-if='getIndexBanner.length>0' ref='mySwiper'  :options='swiperOption')
      swiper-slide(v-for='(item, key, index) in getIndexBanner'  :key='key')
        div(@click="openUrl(item.Link,item.Sn)" :class="{ 'banner': urlName === 'banner', 'gameBanner': urlName === 'gameBanner' }" :style="{ backgroundImage: 'url(' + item.Images + ')',backgroundSize:'cover', backgroundPosition: 'top center' }")
      .swiper-pagination(slot="pagination")
</template>
<script>
import router from '@/router/router';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapMutations, mapGetters } from 'vuex';

const { Swiper } = window;
export default {
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        paginationClickable: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
      urlName: '',
    };
  },
  methods: {
    setBannerSrcStyle(src) {
      const bannerStyle = `
        height:480px;
        background: url(${src});
        background-size: cover;
        background-position: top center;
      `;
      return bannerStyle;
    },
    setBannerName() {
      if (this.getUrlID === '') {
        this.urlName = 'banner';
      } else {
        this.urlName = 'gameBanner';
      }
    },
    openUrl(url, Sn) {
      window.open(url);
      this.GA_home_bannermobile(Sn);
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    getIndexBanner() {  
      return this.$store.state.index.indexBanner;
    },
    login() {
      return this.$store.state.member.islogin;
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
  mounted() {
    this.setBannerName();
  },

};
</script>
<style lang='scss' scoped>
  .tgBanners{
		width: 100%;
    height: 90.67vw;
    background:#000;
    overflow: hidden;
  }
  .banner{
    height: 90.67vw;
    background-repeat: no-repeat;
  }
  .gameBanner{
    height: 64vw;
    background-repeat: no-repeat;
  }
</style>
<style lang='scss'>
.bannersswiper{
  .swiper-pagination{
    bottom: 30px !important
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.1;
    margin: 0 10px !important;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: rgba(250,219,20,1) ;
  }
}
@media screen and (max-width: 750px) {
  .tgBanners{
    .swiper-pagination {
      bottom: 4vw !important;
    }
    .swiper-pagination-bullet {
      width: 2.67vw;
      height: 2.67vw;
      margin: 0 1.33vw !important;
    }
  }
}
</style>
