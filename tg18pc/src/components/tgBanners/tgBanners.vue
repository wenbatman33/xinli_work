<template lang='pug'>
  .tgBanners
    swiper(v-if='getIndexBanner.length>0' ref='mySwiper'  :options='swiperOption')
      swiper-slide(v-for='(item, key, index) in getIndexBanner'  :key='key')
        a(:href='item.Link' @click='GA_home_banner(item.Sn)')
          .banner(:style="{ backgroundImage: 'url(' + item.Images + ')',backgroundSize:'cover', backgroundPosition: 'center' }")
          //- .swiper-lazy-preloader.swiper-lazy-preloader-white
      .swiper-button-prev(slot='button-prev')
      .swiper-button-next(slot='button-next')
      .swiper-pagination(slot="pagination")
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bannerLoaded: true,
      lazy: true,
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        paginationClickable: true,
        lazyLoading: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
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
    imgLoaded() {
      this.bannerLoaded = false;
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
    isLoading() {
      return this.bannerLoaded;
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
  mounted() {
  },
};
</script>
<style lang='scss'scoped>
.tgBanners{
  height: 536px;
  background:#000;
  overflow: hidden;
}
.imgLink{
  width: 100%;
  height: 100%;
}
.banner{
  position: relative;
  width: 100%;
  height: 536px;
  background-repeat: no-repeat;
  z-index: 11;
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
}
.swiper-button-next{
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNXB4IiBoZWlnaHQ9IjQ0cHgiIHZpZXdCb3g9IjAgMCAyNSA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5uZXh0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0ibmV4dCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4gICAgICAgICAgICA8cG9seWdvbiBpZD0iU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjA1MDAwMCwgMjIuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMi4wNTAwMDAsIC0yMi4wMDAwMDApICIgcG9pbnRzPSIwIDIyIDIyIDAgMjQuMSAyLjEgNC4yIDIyIDI0LjEgNDEuOSAyMiA0NCAwIDIyIj48L3BvbHlnb24+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
  background-blend-mode: lighten;
}
.swiper-button-prev{
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNXB4IiBoZWlnaHQ9IjQ0cHgiIHZpZXdCb3g9IjAgMCAyNSA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wcmU8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJwcmUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+ICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjAgMjIgMjIgMCAyNC4xIDIuMSA0LjIgMjIgMjQuMSA0MS45IDIyIDQ0IDAgMjIiPjwvcG9seWdvbj4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==)
}
</style>
