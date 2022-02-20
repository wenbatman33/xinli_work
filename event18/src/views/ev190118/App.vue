<template lang="pug">
  .container-fluid
    router-view
    //- iframe.postMsg(:src='mainHost+"/postMsg"' id='postMsg' frameBorder='0')
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
    ...mapState('index', [
      'Jackpot',
    ]),
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
    const vm = this;
    this.$store.dispatch('member/MemberLoginStatus');
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
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, * {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  
}
html, body {
  width: 100%;
  height: 100%;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 0.75);
  background: #24004D;
  ol, ul {
    list-style: none;
  };
  table {
    border-collapse: collapse;
    border-spacing: 0;
  };
  a, img {
    border: none;
    outline: none;
    /*-- For Firefox --*/
    text-decoration: none;
    -webkit-transition: background-color, color 0.2s linear;
    -moz-transition: background-color, color 0.2s linear;
    transition: background-color, color 0.2s linear;
  };
  input, select {
    outline: none;
  };
  .container-fluid {
    width: 100%;
    padding: 0 !important;
  };
}
p{
  font-size: 16px;
  line-height: 2r;
}
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
