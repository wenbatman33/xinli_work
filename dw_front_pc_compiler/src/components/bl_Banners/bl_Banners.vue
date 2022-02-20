<template lang="pug">
  .bannerList(v-if='getIndexBanner.length>0')
    el-carousel(:interval='5000', arrow='always')
      el-carousel-item(v-for='(item, index) in getIndexBanner', :key='index')
        .item(@click='bannerClick(item)')
          img(v-if='item.bannerType == "1"', :src='item.bannerImagePc')
          video.w-100(v-if='item.bannerType == "2"', autoplay='', muted, loop, playsinline='', ref='myVideo', :src='item.bannerVideo', type='video/mp4')
</template>
<script>

import { mapState } from 'vuex';

const timer = 0;
export default {
  data() {
    return {
      currentNum: 0,
      currentBanner: '',
    };
  },
  computed: {
    getIndexBanner() {
      return this.$store.state.index.indexBanner;
    },
    ...mapState('member', [
      'memberLogined',
    ]),
  },
  watch: {
  },
  methods: {
    bannerClick(item) {
      this.$matomo_banner(item.bannerTitle);
      if (item.bannerLinkMethod.value === 2) {
        this.checkLink(item.bannerLinkPc);
      } else if (item.bannerLinkMethod.value === 3) {
        this.openGameLink(item.bannerPlayGame);
      } else {
        this.$router.push({ path: item.bannerLinkPc });
      }
    },
    openGameLink(gameData) {
      if (this.memberLogined) {
        const payload = {};
        payload.item = {};
        payload.subItem = {};
        payload.subItem.id = gameData.gameGroupId;
        payload.subItem.gameOpenMode = gameData.gameOpenMode;
        payload.game_id = gameData.gameId;
        this.$store.dispatch('game/gameLogin', payload);
      } else {
        window.localStorage.setItem('tempOpenGameData', JSON.stringify(gameData));
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
    checkLink(URL) {
      //  是否含有CASTLEDOMAIN的位置
      if (URL.indexOf(window.CASTLEDOMAIN) >= 0) {
        this.gotoCastleSite(URL);
      } else {
        window.open(URL, '_blank');
      }
    },
    gotoCastleSite(URL) {
      if (this.memberLogined) {
        window.location.replace(URL);
      } else {
        window.localStorage.setItem('tempOutsideLink', URL);
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
  .bannerList{
    width: 100%;
    height: 320px;
    position: relative;
    .el-carousel{
      border-radius: 8px;
    }
  }
  .item{
    cursor: pointer;
    width: 100%;
    height: 320px;
    height: auto;
    img{
      width: 100%;
      min-height: 320px;
    }
  }
</style>
