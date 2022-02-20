<template lang="pug">
  .container-fluid.footer
    .row.px-5.pt-5.pb-3
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4
        p(v-lazy-container)
          img(v-if='darkMode==1', :data-src='`${CDN_ASSETS}/static/img/dw/footer_log.png`')
          img(v-else, :data-src='`${CDN_ASSETS}/static/img/dw/footer_log_day.png`')
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4.mb-3
        .title.pb-3 了解更多
        p 
          span.mr-3(@click='gotoAbout(1)') 关于梦工厂
          span.mr-3(@click='gotoAbout(2)') 责任博彩
          span.mr-3(@click='gotoAbout(3)') 隐私权政策
          span.mr-3(@click='gotoAbout(4)') 条款与规则
          span.mr-3(@click='gotoAbout(5)') 声明
          span.mr-3.cursorPointer(@click='footer_livechat') 联络我们
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4.mb-3
        .title.pb-3 帮助中心
        p
          span.mr-3(@click='gotoFaq(1)') 存款问题
          span.mr-3(@click='gotoFaq(2)') 提款咨询
          span.mr-3(@click='gotoFaq(3)') 如何注册
          span.mr-3(@click='gotoNewBrowser') 推荐浏览器
          span.mr-3(@click='gotoSpeedPage') 更多VIP线路
    el-divider
    .row.px-5.pb-5.pt-3
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4.mb-3
        .title.pb-3 关于我们
        p 我们所提供产品与服务, 都经由菲律宾卡格扬河经济特区所授权和监管。所有信息都在保密的环境下受到我们严密监控。
        p.my-2(v-lazy-container)
          img(:data-src='`${CDN_ASSETS}/static/img/desktop_pagcor.png`')
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4.mb-3
        .title.pb-3 合作伙伴
        //- p 我们的产品已经率先全面覆盖所有终端, 您可以通过下列链接访问我们的网站, 或者下载我们的移动端产品！
        p
          .d-inline.mr-3
            img.provideLogo(:src='`${CDN_ASSETS}/static/img/provide/pic-brand-bti-night@2x.png`',
                :srcset='`${CDN_ASSETS}/static/img/provide/pic-brand-bti-night@3x.png 3x`')
          .d-inline.mr-3
            img.provideLogo(:src='`${CDN_ASSETS}/static/img/provide/pic-brand-wm-night@2x.png`',
                :srcset='`${CDN_ASSETS}/static/img/provide/pic-brand-wm-night@3x.png 3x`')
          .d-inline.mr-3
            img.provideLogo(:src='`${CDN_ASSETS}/static/img/provide/pic-brand-bole-night@2x.png`'
                :srcset='`${CDN_ASSETS}/static/img/provide/pic-brand-bole-night@3x.png 3x`')
          .d-inline.mr-3
            img.provideLogo(:src='`${CDN_ASSETS}/static/img/provide/pic-brand-ebet-night@2x.png`'
                :srcset='`${CDN_ASSETS}/static/img/provide/pic-brand-ebet-night@3x.png 3x`')
          .d-inline.mr-3
            img.provideLogo(:src='`${CDN_ASSETS}/static/img/provide/pic-brand-avia-night@2x.png`'
                :srcset='`${CDN_ASSETS}/static/img/provide/pic-brand-avia-night@3x.png 3x`')
      .col-12.col-sm-12.col-md-6.col-lg-4.col-xl-4.mb-3
        .title.pb-3 推荐浏览器
        p 为了提供更好的用户体验, 建议您使用下列我们推荐的浏览器访问我们的网站。
        .d-flex.flex-row.browserDownload
          span.mr-3(@click='outSideUrl("http://www.firefox.com.cn/")')
            i.fab.fa-firefox
          span.mr-3(@click='outSideUrl("https://www.apple.com/cn/safari/")')
            i.fab.fa-safari
          span.mr-3(@click='outSideUrl("https://www.liebao.cn/download.html")')
            img.liebao(:src='liebao_logo_img')
    .row.subFooter
      .col-12
        p.text-center Copyright © 2020 版权所有
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      CDN_ASSETS:window.CDN_ASSETS,
      liebao_logo_img:`${window.CDN_ASSETS}/static/img/liebao_logo.png`,
    };
  },
  computed: {
    ...mapState('index', ['MAINDOMAIN', 'STATICDOMAIN']),
    ...mapState('userSetting', [
      'darkMode',
    ]),
  },
  methods: {
    footer_livechat(){
      LC_API.open_chat_window()
      this.$matomo_footer_livechat();
    },
    back() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_gohome();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_gohome.postMessage('app_gohome');
        } catch (error) {
          console.log(error);
        }
      }
    },
    APP_INFO() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_info();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_info.postMessage('app_info');
        } catch (error) {
          console.log(error);
        }
      }
    },
    APP_HELP() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_help();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_help.postMessage('app_help');
        } catch (error) {
          console.log(error);
        }
      }
    },
    gotoAbout(val){
      this.APP_INFO();
      if(val==1) {
        this.$matomo_footer_about1();
      }  else if(val==2) {
        this.$matomo_footer_about2();
      } else if(val==3) {
        this.$matomo_footer_about3();
      } else if(val==4) {
        this.$matomo_footer_about4();
      } else if(val==5) {
        this.$matomo_footer_about5();
      }
      window.location.href = `${this.MAINDOMAIN}/about#about${val}`;
    },
    gotoFaq(val){
      this.APP_HELP();
      if(val==1) {
        this.$matomo_footer_faq1();
      }  else if(val==2) {
        this.$matomo_footer_faq2();
      } else if(val==3) {
        this.$matomo_footer_faq3();
      }
      window.location.href = `${this.MAINDOMAIN}/faq`;
    },
    gotoNewBrowser(){
      this.back();
      this.$matomo_footer_faq4();
      window.open('http://www.firefox.com.cn/', '_blank');
    },
    gotoSpeedPage(){
      this.back();
      this.$matomo_footer_faq5();
      window.location.href = `${this.STATICDOMAIN}/upload/speed/`;
    },
    outSideUrl(url){
      this.back();
      window.open(url, '_blank');
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.footer{
  // min-height: 380px;
  background: $blueDarkAlpha_100;
  p{
    font-size: 13px;
    line-height: 1.8;
    color: $garyBlue_Darkest;
    a{
      color: $garyBlue_Darkest;
      text-decoration: none;
    }
  }
  .title{
    color: white;
    font-size: 13px;
  }
  .subFooter{
    height: 50px;
    background: black;
    line-height: 50px;
    p{
      line-height: 50px;
      margin: 0;
    }
  }
  span{
    color: $garyBlue_Darkest;
    cursor: pointer;
  }
}
.browserDownload{
  font-size: 24px;
  a{
    text-decoration: none;
    color: $garyBlue_Darkest;
  }
}
.LC_API_Btn{
  cursor: pointer;
}
.el-divider{
  opacity: .3 !important;
}
.liebao{
  width: 25px;
  height: 25px;
  margin-top: -6px;
}
.provideLogo{
  width: 60px;
  height: auto;
}
</style>

<style lang="scss" scoped>
.MAIN_LIGHT{
  .footer{
    // min-height: 380px;
    background: $garyBlue_lightest;
    .subFooter{
      background: $garyBlue_light;
    }
  }
  .title{
    color: $gray_111;
  }
}
</style>

