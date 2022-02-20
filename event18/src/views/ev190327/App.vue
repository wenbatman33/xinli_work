<template lang="pug">
  .container-fluid
    router-view
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    initAPP (){
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
      if (window.localStorage.JWT_TOKEN_Overdue) {
        this.$message({
          message: window.localStorage.JWT_TOKEN_Overdue,
          type: 'warning',
          onClose() {
            window.localStorage.removeItem('JWT_TOKEN_Overdue');
          },
        });
      }
    }
  },
  mounted() {
    this.initAPP();
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
}
html, body {
  width: 100%;
  height: 100%;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 0.75);
  background: #571110;
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

