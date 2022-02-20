<template lang="pug">
  .bannerList(v-if='getIndexBanner.length>0')
    swiper(:options="swiperOption", ref="swiper")
      swiper-slide(v-for='(item, index) in getIndexBanner', :key="index")
        .item
          img(v-if='item.bannerType == "1"', :src='item.bannerImagePc')
          video.w-100(v-if='item.bannerType == "2"', autoplay='', muted, loop, playsinline='', ref='myVideo', :src='item.bannerVideo', type='video/mp4')
</template>
<script>
import { mapState } from 'vuex';

let vm = null;
const timer = 0;
export default {
  data() {
    return {
      currentNum: 0,
      currentBanner: '',
      swiperOption: {
        autoplay: false,
        delay: 5000,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          click() {
            vm.bannerClick(this.realIndex); 
          },
        },
      },
    };
  },
  computed: {
    getIndexBanner() {
      return this.$store.state.index.indexBanner;
    },
  },
  watch: {
    getIndexBanner(val) {
      if (val.length > 1) {
        this.swiperOption.autoplay = true;
      }
    },
  },
  created() {
    vm = this;
  },
  methods: {
    bannerClick(index) {
      if (this.getIndexBanner[index].bannerLinkPc) {
        window.open(this.getIndexBanner[index].bannerLinkPc, '_blank');
        this.$matomo_banner(this.getIndexBanner[index].bannerTitle);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
  .bannerList{
    width: 100%;
    position: relative;
    .el-carousel{
      border-radius: 8px;
    }
  }
  .item{
    cursor: pointer;
    width: 100%;
    height: auto;
    img{
      width: 100%;
      height: auto;
    }
  }
</style>
