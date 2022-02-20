<template lang="pug">
  .header.px-3.py-1(
    :style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}"
  )
    router-link.w-100(to="/", @click.native='$matomo_Header_logo')
      .logo(:style="{'backgroundImage': 'url(' + (DarkMode ? night_logo : light_logo) + ')'}")
    //- el-button.mr-2(round @click="changeStyle") {{ DarkMode ? 'light' : 'Dark' }}
    .wallet(v-if="Login" @click="toMy")
      i.fas.fa-coins.mr-2
      .black ¥{{ format(((((this.IndexWallet.gameCash + this.IndexWallet.cash) * 100) / 100)).toFixed(2).toString()) }}
    .d-flex(v-else)
      el-button.border.border-secondary(@click="toRegister" size="small" round) 注册
      el-button(@click="toLogin" size="small" type="betlead" round) 登录
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      light_logo: `${window.CDN_ASSETS}/static/img/logoSun@3x.png`,
      night_logo: `${window.CDN_ASSETS}/static/img/logoNight@3x.png`,
      bgImage_light: `${window.CDN_ASSETS}/static/img/light_bg@3x.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/night_bg@3x.png`,
    };
  },
  methods: {
    format(value) {
      const allCash = value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      return allCash || 0;
    },
    toLogin() {
      this.$matomo_Header_login();
      this.$router.push('/login').catch((err) => {});
    },
    toRegister() {
      this.$matomo_Header_register();
      this.$router.push('/register').catch((err) => {});
    },
    toMy() {
      this.$matomo_Header_wallet();
      this.$router.push('/my').catch((err) => {});
    },
    changeStyle() {
      if (this.DarkMode) {
        this.$store.commit('index/setDarkMode', false);
      } else {
        this.$store.commit('index/setDarkMode', true);
      }
    },
  },
  computed: {
    ...mapState('payment', [
      'IndexWallet',
    ]),
    ...mapState('index', [
      'Login',
      'DarkMode',
    ]),
  },
  watch: {
    Login: {
      handler(val) {
        if (val && this.$route.query.token !== undefined) {
          this.$store.dispatch('payment/API_MemberWallet');
        }
      },
    },
  },
  created() {
    if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
      this.$store.commit('index/setLogin', true);
    } else {
      this.$store.commit('index/setLogin', false);
    }
  },
};
</script>

<style lang="scss" scoped>
  .header {
    transition: all 0.5s ease 0s;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 60px;
    background-color: white;

    .logo {
      background-size: contain;
      // background-position: center;
      background-repeat: no-repeat;
      width: 50%;
      height: 50px;
    }

    .wallet {
      color: $theme;
      display: flex;
      align-items: center;

      .black {
        color: $theme;
      }
    }
  }

  .el-button--betlead {
    color: white;
    background: linear-gradient(to right, rgb(57, 109, 238), rgb(101, 0, 255));
    border: none;
  }
</style>
