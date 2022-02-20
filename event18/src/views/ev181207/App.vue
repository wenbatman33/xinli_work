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
html, body {
  background: #023F97;
}
.container {
  padding: 0;
  font-family: Helvetica;
  font-weight: lighter;
}
.bg {
  background: url('/static/ev181207/Background_FishingKing.jpg') 50% 0% no-repeat;
  background-size: contain;
}
.postMsg {
  position: absolute;
  top: -9999999px;
  width: 0;
  height: 0;
}
button {
  outline:none !important;
}
.whiteTableHeader {
  width: 100%;
  .whiteTableTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      max-width: fit-content;
    }
  }
}
.mainWrap {
  background: url('/static/ev181207/light.png') 50% -7px no-repeat, url('/static/ev181207/light.png') 50% 101.3% no-repeat, rgba(255,255,255,0.02);
  border: 6px solid rgba(255,255,255,0.02);
  border-radius: 50px;
  box-shadow: inset 0 0 50px rgba(255,255,255,0.2);
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
.depiction {
  p{
    line-height: 2;
  }
}
.winnerList {
  width: 100%;
  padding: 15px 0;
  background: rgba(0,39,102,1);
  border-radius: 10px;
  .winnerList_title {
    width: 100%;
    background: linear-gradient(90deg, rgba(24,144,255,0.1), rgba(53,195,255,1), rgba(24,144,255,0.1)) 50% 50% no-repeat;
    background-size: 100% 30px;
  };
  .winnerList_content {
    width: 100%;
    padding: 15px 0;
    color: rgba(255,255,255,1);
    .wlc_w {
      display: inline;
      padding: 0 10px;
      span {
        padding: 0 5px;
      };
    };
  };
}
.datalist {
  width: 100%;
  color: rgba(255,255,255,1);
  font-size: 14px;
  border-top: 1px solid #13A6F0;
  border-left: 1px solid #13A6F0;
  ul, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul {
    border-bottom: 1px solid #13A6F0;
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
    border-right: 1px solid #13A6F0;
  };
  .th {
    height: auto;
    background: #13A6F0 !important;
    color: #fff;
  };
};
a {
  cursor: pointer;
}
.heavy {
  font-size: 22px;
  font-weight: 500 !important;
  color: rgba(250,219,20,1) !important;
}
.link_blue {
  color: #18BEFF !important;
}
.impot {
  font-weight: 400 !important;
  color: rgba(250,219,20,1) !important;
}
.impot_orange {
  color: rgba(255,192,0,1) !important;
}
.btn_playDay {
  display: inline-block;
  margin: 8px;
  padding: 10px 25px;
  background: linear-gradient(90deg, rgba(0,179,255,1), rgba(0,84,217,1));
  color: rgba(255,255,255,1) !important;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 100px;
  &:hover, &:active {
    background: rgba(0,39,102,1);
    text-decoration: none;
  }
}
.btn_playDay_act {
  background: rgba(0,39,102,1);
  text-decoration: none;
}
.btn_style {
  display: block;
  padding: 5px 25px;
  background: linear-gradient(0deg, rgba(255,161,0,1), rgba(255,205,0,1));
  color: rgba(255,255,255,1) !important;
  font-family: "Microsoft Yahei", "微軟正黑體", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: bold !important;
  letter-spacing: 3px;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(255,255,255,0.3);
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
@media screen and (max-width: 750px) {
  .bg {
    background: url('/static/ev181207/Background_FishingKing_s.jpg') 50% 0% no-repeat;
  };
  .winnerList {
    .winnerList_content {
      .wlc_w {
        display: block;
        width: 100%;
      };
    };
  };
}
</style>
