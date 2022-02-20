<template lang="pug">
  .bet
    .bet__header
      el-button(type="text" @click="service") 客服
      el-button(type="text" @click="deposit") 存提
      el-button(type="text" @click="mypage") 我的
    iframe.iframe(:style="{'backgroundImage': 'url(' + bgImage + ')'}", :src="path")
</template>

<script>
export default {
  data() {
    return {
      path: '',
      bgImage: `${window.CDN_ASSETS}/static/img/loading_logo_white.png`,
    };
  },
  methods: {
    service() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_service();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_service.postMessage('app_service');
        } catch (error) {
          console.log(error);
        }
      } 
    },
    deposit() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_deposit();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_deposit.postMessage('app_deposit');
        } catch (error) {
          console.log(error);
        }
      }
    },
    mypage() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_mypage();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_mypage.postMessage('app_mypage');
        } catch (error) {
          console.log(error);
        }
      }
    },
    // for appteam methods
    app_service() {
      console.log('app_service');
    },
    app_deposit() {
      console.log('app_deposit');
    },
    app_mypage() {
      console.log('app_mypage');
    },
  },
  created() {
    window.localStorage.removeItem('JWT_TOKEN');
    window.localStorage.removeItem('Finger');
    const { fullPath } = this.$route;
    const path = fullPath.replace(/\/forApp\/bet\?path=/, '');
    this.path = decodeURIComponent(path);
  },
  beforeDestroy() {
    window.localStorage.removeItem('JWT_TOKEN');
  },
  mounted() {
    // for appteam methods
    window.app_service = this.app_service;
    window.app_deposit = this.app_deposit;
    window.app_mypage = this.app_mypage;
  },
};
</script>

<style lang="scss" scoped>
.bet {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    background-color: $theme;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;

    button {
      color: white;
    }
  }

  .iframe {
    width: 100%;
    flex: 1;
    margin-top: 40px;
    background-color: #000;
    background-image: url("/static/img/loading_logo_white.png");
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
