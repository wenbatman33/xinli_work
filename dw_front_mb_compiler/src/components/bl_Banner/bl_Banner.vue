<template lang="pug">
  .banner.mx-3
    swiper(:options="swiperOption" v-if="IndexBanners.length > 0")
      swiper-slide(v-for="item in IndexBanners" :key="item.id")
        a(v-if="item.bannerLinkPc !== ''", @click='clickHandle(item)')
          img(v-if="item.bannerType === 1" :src="item.bannerImageMobile" width="100%")
          video(v-if="item.bannerType === 2" :src="item.bannerVideo" width="100%" autoplay muted loop playsinline)
      .swiper-pagination(slot="pagination")
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['gameType', 'gameGroup'],
  data() {
    return {
      swiperOption: {
        autoplay: true,
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
          renderBullet(index, className) {
            let temp = index + 1;
            if (temp < 10) {
              temp = `0${temp}`;
            }
            return `<span class="${className}">${temp}</span>`;
          },
        },
      },
      form: {
        params: {
          banner_group_id: 1,
          device: 2,
          platform: 1,
        },
      },
      loginForm: {
        params: {
          device: 2,
          game_group_id: 0,
          game_id: 0,
          force_login: 0,
        },
      },
    };
  },
  computed: {
    ...mapState('index', [
      'IndexBanners',
      'Login',
    ]),
    ...mapState('games', [
      'IndexGameTypeData',
    ]),
  },
  methods: {
    deeplinkLogin(item) {
      if (item.bannerLinkMethod.value === 2) {
        window.localStorage.setItem('tempOutsideLink', item.bannerLinkPc);
      } else {
        window.localStorage.setItem('tempLink', item.bannerLinkPc);
      }
      this.$router.push('/login').catch((err) => {});
    },
    clickHandle(item) {
      this.$matomo_Banner(item.bannerTitle);
      const checkDeeplink = item.bannerLinkPc.includes('castle');
      if (checkDeeplink && !this.Login) {
        this.deeplinkLogin(item);
      } else if (item.bannerLinkMethod.value === 2) {
        // 請使用 bannerLinkPc  bannerLinkMobile是 app team 使用
        window.open(item.bannerLinkPc, '_blank');
      } else if (item.bannerLinkMethod.value === 3) {
        const { bannerPlayGame } = item;
        const gameType = this.IndexGameTypeData.filter(item => item.id === bannerPlayGame.gameType)[0];
        const gameInfo = gameType.gameGroups.data.filter(item => item.id === bannerPlayGame.gameGroupId)[0];
        const gameName = gameInfo.gameGroupName;
        this.loginForm.params.game_group_id = gameInfo.id;
        const payload = {
          gameType,
          gameInfo,
          gameName,
          loginForm: this.loginForm,
        };
        this.$store.dispatch('games/GameLogin', payload);
      } else {
        this.$router.push({ path: item.bannerLinkPc }).catch((err) => {});
      }
    },
  },
  created() {
    this.$store.dispatch('index/API_IndexBanner', this.form);
  },
};
</script>

<style lang="scss" scoped>
/deep/ .swiper-container {
  border-radius: 10px;
}

/deep/ .swiper-pagination-bullet {
  color: $origin_darkest;
  background: none;
  width: unset;
  height: auto;
  display: inline;
  border-radius: 0;

  &-active {
    color: $navy_dark;
    background: none;
    border-bottom: 3px solid rgb(194, 170, 242);
  }
}
</style>
