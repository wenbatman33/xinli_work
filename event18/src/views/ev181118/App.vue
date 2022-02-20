<template lang="pug">
  .container-fluid
    router-view
    iframe.postMsg(v-if='isMobile', :src='mainHostForMobile+"/postMsg"' id='postMsg' frameBorder='0')
    iframe.postMsg(v-else :src='mainHost+"/postMsg"' id='postMsg' frameBorder='0')
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isMobile: false,
      loaded: false,
      mainHost: process.env.VUE_APP_HOST,
      mainHostForMobile: process.env.VUE_APP_MHOST,
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
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    getMainSiteToken(event) {
      this.loaded = true;
      if (event.origin === this.mainHost || event.origin === this.mainHostForMobile) {
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
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
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
  background: #855bfb;
}
.container {
  font-family: Helvetica;
  font-weight: lighter;
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
  padding: 4px;
  background: linear-gradient( 90deg, rgba(0,251,254,1), rgba(254,0,251,1));
  border-radius: 8px;
  box-shadow: 0 0 10px #a094f7, 0 0 20px #bb73f8;
}
.whiteTableTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #360051;
  border-radius: 4px;
  overflow: hidden;
  img {
    width: fit-content;
  }
}
.mainWrap{
  border-radius: 8px;
  background: rgba(0,0,0,0.25);
  img {
    width: 100%;
    max-width: fit-content;
  }
}
p {
  color: rgba(255,255,255,1);
  line-height: 2;
  span {
    color: #fa26ed;
  };
}
.depiction{
  p{
    line-height: 2;
  }
}
.datalist {
  width: 100%;
  color: rgba(255,255,255,1);
  font-size: 14px;
  border-top: 1px solid #3C1EA3;
  border-left: 1px solid #3C1EA3;
  ul, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul {
    border-bottom: 1px solid #3C1EA3;
    &:first-child {
      border-top: none;
    };
    &:last-child {
      border-right: none;
    };
  };
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #3C1EA3;
  };
  .th{
    height: auto;
    background: #3C1EA3 !important;
    color: #fff;
  };
};
a{
  cursor: pointer;
}
.heavy{
  font-size: 20px;
  font-weight: 400 !important;;
  color: #00FBFE !important;
}
.link_blue {
  color: #00FBFE !important;
}
.impot {
  color: rgba(250,80,80,1) !important;
}
.impot_orange {
  color: rgba(255,192,0,1) !important;
}
.btn_style {
  display: block;
  padding: 10px;
  background: #00FBFE;
  color: #360051;
  font-size: 20px;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-weight: 500;
  border-radius: 100px;
  &:hover {
    color: #360051;
    text-decoration: none;
  }
}
.btn_makeup {
  display: block;
  padding: 3px 10px;
  background: #00FBFE;
  color: #360051;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-weight: 500;
  border-radius: 100px;
  &:hover {
    color: #360051;
    text-decoration: none;
  }
}
.btn_nomakeup {
  display: block;
  padding: 3px 10px;
  background: rgba(160,160,160,1);
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-weight: 500;
  border-radius: 100px;
  &:hover {
    text-decoration: none;
  }
}
</style>
