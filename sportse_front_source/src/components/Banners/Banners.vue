<template lang="pug">
.p-3
  .banner
    swiper(:options='swiperOption' v-if='BannerList.length > 0')
      swiper-slide(v-for='(item, index) in BannerList' :key='index')
        img(:src='item.bannerImages' width='100%', @click='gotopromotiondetail(item.id)')
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
        },
      },
    };
  },
  computed: {
    ...mapState('index', [
      'BannerList',
    ]),
  },
  methods: {
    gotopromotiondetail(id) {
      this.$router.push(`/promotiondetail?id=${id}`);
    },
  },
  mounted() {
    
  },
};
</script>
<style lang='scss' scoped>
  .banner{
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: $gray_f5;
  }
</style>
