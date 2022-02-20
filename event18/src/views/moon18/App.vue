<template lang="pug">
  .container-fluid
    router-view
    iframe.postMsg(:src='mainHost+"/postMsg"' id='postMsg' frameBorder='0')
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
      mainHost: process.env.VUE_APP_HOST,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    getMainSiteToken(event) {
      this.loaded = true;
      if (event.origin === this.mainHost) {
        if (event.data.JWT_TOKEN) {
          window.localStorage.setItem('JWT_TOKEN', event.data.JWT_TOKEN);
          this.$store.dispatch('member/MemberLoginStatus');
        }
      }
    },
    getDomains() {
      const payload = {};
      const vm = this;
    },
  },
  mounted() {
    window.addEventListener('message', this.getMainSiteToken, false);
    const vm = this;
    $.ajax({
      type: 'get',
      url: `${process.env.VUE_APP_DOMAINS}?now=${new Date()}`,
      dataType: 'json',
      jsonpCallback: 'callback',
      success(res) {
        vm.$store.commit('index/setSiteHost', res[0].link);
      },
      error() {
        console.log('fail');
      },
    });
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '@/assets/scss/main.scss';
.postMsg{
  position: absolute;
  top: -9999999px;
  width: 0;
  height: 0;
}
button{
  outline:none !important;
}
</style>
