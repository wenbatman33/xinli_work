<template lang="pug">
  #app(
    v-if='indexInit'
    :class="{'dark_mode' : DarkMode}"
    :style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}"
  )
    Header(v-show="$route.name === 'home'")
    transition(name='slide-fade')
      router-view(:class="{'fixed__page': getCardOpen}")
    .overlayer(v-if="getCardOpen" @touchmove.prevent @click.self="setCardOpen")
    Cards(:class="{'card__open': getCardOpen }")
    Loading(v-if="Loading")
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import Header from '@/components/bl_Header/bl_Header.vue';
import Cards from '@/components/bl_Cards/bl_Cards.vue';
import Loading from '@/components/bl_Loading/bl_Loading.vue';

export default {
  name: 'app',
  components: {
    Header,
    Cards,
    Loading,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/picSunBg@3x.jpg`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/picNightBg@3x.jpg`,
    };
  },
  methods: {
    setCardOpen() {
      this.$store.dispatch('index/setCardOpen', false);
    },
    checkCardUrl(to) {
      if (to.query.card) {
        this.$store.dispatch('index/setCardOpen', true);
        this.$store.dispatch('index/setCardName', to.query);
      }
    },
    getShareLink(shareId) {
      // 分享取得獎勵
      const payload = { uuid: shareId };
      const api = `${window.APIHOST}/api/Task/Share`;
      axios.post(api, payload).then((res) => {});
      const query = Object.assign({}, this.$route.query);
      delete query.share_id;
      this.$router.replace({ query });
    },
  },
  computed: {
    getCardOpen() {
      return this.$store.state.index.CardOpen;
    },
    ...mapState('index', [
      'Loading',
      'DarkMode',
      'indexInit',
    ]),
    ...mapState('userSetting', [
      'UserBrowser',
    ]),
  },
  watch: {
    $route(to, from) {
      this.checkCardUrl(to);
    },
  },
  created() {
    this.$store.dispatch('index/API_IndexInit').then((res) => {
      const elem = document.getElementById('loadingDiv');
      elem.parentNode.removeChild(elem);
    });
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
    window.localStorage.removeItem('tempOutsideLink');
    window.localStorage.removeItem('tempGameData');
    const hour = new Date().getHours();
    if (hour > 17 || hour < 6) {
      this.$store.commit('index/setDarkMode', true);
      window.document.getElementsByTagName('body')[0].style.backgroundColor = '#000';
      window.document.getElementsByTagName('html')[0].style.backgroundColor = '#000';
    } else {
      this.$store.commit('index/setDarkMode', false);
    }
  },
  beforeDestroy() {
    // 離開站台前 刪除 localStorage 的 agency ＆ 清除登入前的連結導向
    window.localStorage.removeItem('agency');
    window.localStorage.removeItem('tempLink');
    window.localStorage.removeItem('tempOutsideLink');
    window.localStorage.removeItem('tempGameData');
  },
  destroyed() {
    // 離開站台前 刪除 localStorage 的 agency ＆ 清除登入前的連結導向
    window.localStorage.removeItem('agency');
    window.localStorage.removeItem('tempLink');
    window.localStorage.removeItem('tempOutsideLink');
    window.localStorage.removeItem('tempGameData');
  },
  mounted() {
    this.checkCardUrl(this.$route);
    this.$store.dispatch('userSetting/getUserBrowser');
    if (this.$route.query.share_id) {
      // 如果有share_id 去取得分享獎勵
      this.getShareLink(this.$route.query.share_id);
    }
    if (this.$route.query.agency) {
      // 暫存代理编号 若agency 編號時註冊同時需要送出agency
      window.localStorage.setItem('agency', this.$route.query.agency);
    }
  },
};

</script>

<style lang="scss">
@import './assets/scss/reset.css';
@import './assets/scss/main.scss';

#app {
  transition: all 0.5s ease 0s;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  touch-action: manipulation;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  user-select: none;
  background-Attachment: fixed;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(500px);
  opacity: 1;
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-500px);
  opacity: 1;
}
</style>
