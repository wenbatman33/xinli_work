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
  padding: 0 !important;
  background: #314C0B;
}
.container {
  padding: 0;
  font-family: Helvetica;
  font-weight: lighter;
}
.bg {
  background: url('/static/ev181224/Background_YearEndCelebration.jpg') 50% 0% no-repeat;
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
    };
  }
}
.roulette_frame {
  margin: 45px 0;
  width: 100%;
  background: url('/static/ev181224/roulette_frame_bg.png') 50% 64% repeat-x;
  background-size: 16px 590px;
  .roulette_cont {
    width: 100%;
    padding: 3vw;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0)) 50% 59.5% no-repeat;
    background-size: 100% 300px;
    position: relative;
    .roulette_no {
      width: 280px;
      height: 150px;
      margin: 0 auto;
      padding-top: 30px;
      background: url('/static/ev181224/roulette_no_bg.png') 50% 50% no-repeat;
      background-size: contain;
      font-size: 36px;
      font-weight: 600;
      text-align: center;
      position: relative;
    };
    .roulette_cover {
      width: 100%;
      max-width: 790px;
      margin: -30px auto 0 auto;
      background: url('/static/ev181224/roulette_bg.png') 50% 50% no-repeat;
      background-size: contain;
      position: relative;
      .roulette_play {
        border-radius: 500px;
        overflow: hidden;
        cursor: pointer;
        position: absolute;
        z-index: 100;
        img {
          width: 100%;
          max-width: 790px;
        };
      };
      .roulette {
        border-radius: 500px;
        overflow: hidden;
        z-index: 50;
        img {
          width: 100%;
          max-width: 790px;
        };
        .rotate0 {
          transition: 6s;
          transition-timing-function: ease-in-out;
          cursor: pointer;
        };
        .rotate1 {
          transform: rotate(3780deg);
        };
        .rotate2 {
          transform: rotate(3667.5deg);
        };
        .rotate3 {
          transform: rotate(3802.5deg);
        };
        .rotate4 {
          transform: rotate(3712.5deg);
        };
      };
    };
  };
}
.infoWrap {
  min-height: 515px;
  background: url('/static/ev181224/light.png') 50% -8px no-repeat, rgba(114,87,48,0.5) padding-box;
  color: rgba(255,255,255,1);
  border: 10px solid rgba(255,187,89,0.3);
  border-radius: 50px;
  box-shadow: inset 0 0 20px 10px rgba(38,26,4,0.3);
  position: relative;
  text-align: center;
  img {
    display: block;
    width: 25vw;
    max-width: fit-content;
    margin: 0 auto;
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
  };
  .infoWrap_title {
    width: 100%;
    margin-top: 120px;
    padding: 10px;
    background: linear-gradient(90deg, rgba(221,180,92,0), rgba(221,180,92,1), rgba(221,180,92,0)) 50% 50% no-repeat;
    font-size: 30px;
    font-weight: 400;
  };
  .infoWrap_content {
    width: 100%;
    padding: 30px;
    font-size: 25px;
    line-height: 50px;
  }
}
.mainWrap {
  background: url('/static/ev181224/light.png') 50% -8px no-repeat, rgba(114,87,48,0.5) padding-box;
  border: 10px solid rgba(255,187,89,0.3);
  border-radius: 50px;
  box-shadow: inset 0 0 20px 10px rgba(38,26,4,0.3);
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
  p {
    font-size: 18px;
    line-height: 36px;
  };
}
.datalist {
  width: 100%;
  max-height: 60vh;
  color: rgba(255,255,255,1);
  font-size: 18px;
  font-weight: 300;
  border-top: 1px solid rgba(223,182,97,1);
  border-left: 1px solid rgba(223,182,97,1);
  overflow: auto;
  ul, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul {
    border-bottom: 1px solid rgba(223,182,97,1);
    &:first-child {
      border-top: none;
    };
    &:last-child {
      border-right: none;
    };
  };
  li {
    display: flex;
    background: rgba(223,182,97,0.1);
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(223,182,97,1);
  };
  .th {
    height: auto;
    background: rgba(223,182,97,1) !important;
    color: #fff;
  };
};
a {
  cursor: pointer;
}
.link_blue {
  color: #18BEFF !important;
}
.impot {
  font-weight: 400 !important;
  color: rgba(255,239,43,1) !important;
}
.impot_yellow {
  color: rgba(255,239,43,1) !important;
}
.btn_style01, .btn_style02 {
  padding: 5px;
  background: linear-gradient(0deg, rgba(141,9,9,1), rgba(255,100,100,1));
  color: rgba(255,255,255,1);
  font-size: 42px;
  font-weight: 400;
  border-radius: 40px;
  cursor: pointer;
  a.btn_info {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(235,38,38,1), rgba(172,22,22,1), rgba(235,38,38,1));
    color: rgba(255,255,255,1);
    border-radius: 40px;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    };
  };
}
.btn_style01 {
  width: 100%;
  max-width: 300px;
  height: 80px;
  line-height: 80px;
}
.btn_style02 {
  margin-bottom: 15px;
  width: 90%;
  max-width: 360px;
  height: 85px;
  line-height: 85px;
}
@media screen and (max-width: 750px) {
  .bg {
    background: url('/static/ev181224/Background_YearEndCelebration_MB.jpg') 50% 0% no-repeat;
    background-size: contain;
  };
  .roulette_frame {
    margin: 6vw 0;
    background-size: 2.13vw 78.67vw;
    .roulette_cont {
      background-size: 120% 40vw;
      .roulette_no {
        width: 37.33vw;
        height: 20vw;
        padding-top: 4vw;
        font-size: 4.8vw;
      };
      .roulette_cover {
        margin: -4vw auto 0 auto;
      };
    };
  };
  .infoWrap {
    min-height: 68.67vw;
    border: 1.33vw solid rgba(255,187,89,0.3);
    border-radius: 6.67vw;
    box-shadow: inset 0 0 2.67vw 1.33vw rgba(38,26,4,0.3);
    img {
      top: -6.67vw;
    };
    .infoWrap_title {
      margin-top: 16vw;
      padding: 1.33vw;
      font-size: 100%;
    };
    .infoWrap_content {
      padding: 4vw;
      font-size: 100%;
      line-height: 6.67vw;
    }
  };
  .mainWrap {
    border: 1.33vw solid rgba(255,187,89,0.3);
    border-radius: 6.67vw;
    box-shadow: inset 0 0 2.67vw 1.33vw rgba(38,26,4,0.3);
  };
  .depiction {
    p {
      font-size: 16px;
    };
  };
  .datalist {
    font-size: 13px;
  };
  .btn_style01, .btn_style02 {
    padding: 0.67vw;
    font-size: 5vw;
  };
  .btn_style01 {
    width: 40vw;
    height: auto;
    line-height: 10.67vw;
  };
  .btn_style02 {
    margin-bottom: 2vw;
    width: 48vw;
    height: auto;
    line-height: 11.33vw
  };
}
</style>
