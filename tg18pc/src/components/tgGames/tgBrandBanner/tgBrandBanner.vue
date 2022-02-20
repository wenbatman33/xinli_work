<template lang='pug'>
.container-fluid.tgProviderBanner(v-if='brandBannerList.length>0')
  swiper(v-if='brandBannerList.length>0' ref='mySwiper'  :options='swiperOption')
    swiper-slide(v-for='(item, key, index) in brandBannerList'  :key='key')
      .banner
        .bgImg(:style="getCardImgSrcStyle(item.Images)" @click='GA_game_banner(item.Sn)')
        .providerBanner
          .container
            .row.providerBannerInner
              .col-7
                .h-100.d-flex.align-items-center.justify-content-center
                  a(:href='item.ButtonLink1')
                    img.gameBanner.img-fluid(:src='item.Images')
              .col-5
                .content.h-100.d-flex.flex-column.justify-content-center
                  h3.mb-4 {{item.BannerName}}
                  p.des {{item.BannerNote}}
                  div.my-3
                    a.mr-3(v-if='item.ButtonLink1' :href='item.ButtonLink1' @click='GA_game_banner(item.Sn)')
                      el-button.bannerBtn {{item.ButtonText1}}
                    a.mr-3(v-if='item.ButtonLink2' :href='item.ButtonLink2' @click='GA_game_banner(item.Sn)')
                      el-button.bannerBtn {{item.ButtonText2}}
    .swiper-pagination(slot="pagination")
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';

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
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: false
        // },
        // paginationClickable :false,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // }
      },
    };
  },
  computed: {
    ...mapState('game', [
      'currentGroupId',
      'brandBannerList',
    ]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
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
      const parHash = path[1];
      payload.GroupName = this.$route.query.game;
      if (parHash === 'recommend') {
        payload.GroupId = 5;
      } else if (parHash === 'collection') {
        payload.GroupId = 6;
      } else if (parHash === 'recently') {
        payload.GroupId = 7;
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
  .tgBanners{
    height: 480px;
    background:#000;
    overflow: hidden;
  }
  .banner{
    height: 300px;
    background-repeat: no-repeat;
  }
  .tgProviderBanner{
    position: relative;
    height: 300px;
    overflow:hidden;
    background-image: linear-gradient(to left, #222222, #4a4a4a);
  }
  .bgImg{
    position: absolute;
    width:100%;
    height:300px;
    top:0;
    z-index: 1;
  }
  .providerBanner{
    position: absolute;
    width:100%;
    height: 300px;
    top:0;
    z-index:2;
  }
  .providerBannerInner{
    height: 300px;
  }
  .bannerImg{
    img{
      max-height: 240px;
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
  .des{
    font-size: 15px;
    line-height: 1.5;
  }
  .gameBanner{
    width: 600px;
    height: 240px;
  }
</style>
