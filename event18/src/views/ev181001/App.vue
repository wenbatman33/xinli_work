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
      url: process.env.VUE_APP_DOMAINS,
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
html,body{
  background: #D42F2B;
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
.whiteTableHeader{
  position: relative;
  border-radius: 18px 18px 0 0;
  height: 30px;
  background: #fff;
}
.whiteTableFooter{
  position: relative;
  border-radius: 0 0 18px 18px ;
  height: 30px;
  background: #fff;
}
.tiger{
  margin-top: -30px;
}
.mainWrap{
  border-radius: 18px;
  background: #FFE9B8;
}
p {
  color: #DE220C;
  line-height: 2;
}
.depiction{
  p{
    font-size: 13px;
    line-height: 2;
  }
}
.datalist {
  width: 100%;
  color: #DE220C;
  font-size: 14px;
  border: 1px solid #DE220C;
  ul, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul.th{
    background: #DE220C !important;
    color: #fff;
  }
  ul {
    border-bottom: 1px solid #DE220C;
    &:first-child {
      background: rgba(217,217,217,0.1);
    };
    &:last-child {
      border-bottom: none;
    };
  };
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #DE220C;
    &:last-child {
      border-right: none;
    };
  };
};
</style>
