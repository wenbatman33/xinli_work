<template lang="pug">
.castleBanner.d-flex.flex-row.my-2(@click="gotoCastle")
  .castleBanner_left
    i.fas.fa-chess-knight.mr-2
    span 梦基金 {{ format(IndexWallet.point) }} 点
  .castleBanner_right
    img(:src="DarkMode ? picDreamcity_night : picDreamcity_sun")
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      picDreamcity_sun: `${window.CDN_ASSETS}/static/img/picDreamcity@3x.png`,
      picDreamcity_night: `${window.CDN_ASSETS}/static/img/picDreamcityDark@3x.png`,
    };
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('payment', [
      'IndexWallet',
    ]),
  },
  methods: {
    gotoCastle() {
      if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
        this.$matomo_index_castleBet();
        window.location.href = window.CASTLEDOMAIN;
      } else {
        this.$router.push('/login').catch((err) => {});
      }
    },
    format(value) {
      let point = '?';
      if (!Number.isNaN(value) && value !== undefined) {
        point = value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return point;
    },
  },
  mounted() {
    if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
      this.$store.dispatch('payment/API_MemberWallet');
    }
  },
};
</script>

<style lang="scss" scoped>
// castleBanner
.castleBanner{
  height: 50px;
  // background: white;
  border-radius: 12px;
  border: 2px solid $theme;
}
.castleBanner_left{
  text-align: center;
  height: 38px;
  line-height: 38px;
  width: 55%;
  margin: 4px;
  background: $theme;
  border-radius: 8px;
  color: white;
  overflow: hidden;
}
.castleBanner_right{
  text-align: center;
  height: 38px;
  line-height: 30px;
  width: 45%;
  margin: 4px;
  border-radius: 8px;
  color: white;
  overflow: hidden;
  img{
    width: 118px;
    height: 23px;
  }
}
</style>
