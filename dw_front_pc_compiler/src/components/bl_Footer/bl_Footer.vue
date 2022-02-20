<template lang="pug">
  .container-fluid.footer
    .row.px-5.pt-5.pb-3
      .col-4
        p
          img(v-if='darkMode==1', :src='nightLogo')
          img(v-else, :src='dayLogo')
      .col-4
        .title.pb-3 了解更多
        p 
          span.mr-3
            router-link(to='/about#about1', @click.native='$matomo_footer_about1') 关于梦工厂
          span.mr-3
            router-link(to='/about#about2', @click.native='$matomo_footer_about2') 责任博彩
          span.mr-3
            router-link(to='/about#about3', @click.native='$matomo_footer_about3') 隐私权政策
          span.mr-3
            router-link(to='/about#about4', @click.native='$matomo_footer_about4') 条款与规则
          span.mr-3
            router-link(to='/about#about5', @click.native='$matomo_footer_about5') 声明
          span.mr-3.cursorPointer(@click='openChat') 联络我们
      .col-4
        .title.pb-3 帮助中心
        p 
          span.mr-3
            router-link(to='/faq', @click.native='$matomo_footer_faq1') 存款问题
          span.mr-3
            router-link(to='/faq', @click.native='$matomo_footer_faq2')  提款咨询
          span.mr-3
            router-link(to='/faq', @click.native='$matomo_footer_faq3')  如何注册
          span.mr-3
            a(href='http://www.firefox.com.cn/', target='_blank', @click.native='$matomo_footer_faq4') 推荐浏览器
          span.mr-3
            a(:href='`${STATICDOMAIN}/upload/speed/`', target='_blank', @click.native='$matomo_footer_faq5') 更多VIP线路
    el-divider
    .row.px-5.pb-5.pt-3
      .col-4
        .title.pb-3 关于我们
        p 我们所提供的产品与服务，都经由菲律宾政府博彩委员会(PAGCOR)所授权和监管。所有信息都在保密的环境下受到我们严密监控。
        p.my-2
          img(:src='desktop_pagcor')
      .col-4
        .title.pb-3 合作伙伴
        //- p 我们的产品已经率先全面覆盖所有终端, 您可以通过下列链接访问我们的网站, 或者下载我们的移动端产品！
        p
          .d-inline.mr-3
            img.provideLogo(:src='provideLog1', :srcset='provideLog1_3x')
          .d-inline.mr-3
            img.provideLogo(:src='provideLog2', :srcset='provideLog2_3x')
          .d-inline.mr-3
            img.provideLogo(:src='provideLog3', :srcset='provideLog3_3x')
          .d-inline.mr-3
            img.provideLogo(:src='provideLog4', :srcset='provideLog4_3x')
          .d-inline.mr-3
            img.provideLogo(:src='provideLog5', :srcset='provideLog5_3x')
      .col-4
        .title.pb-3 推荐浏览器
        p 为了提供更好的用户体验, 建议您使用下列我们推荐的浏览器访问我们的网站。
        .d-flex.flex-row.browserDownload
          span.mr-3
            a(href='http://www.firefox.com.cn/', target='_blank')
              i.fab.fa-firefox
          span.mr-3
            a(href='https://www.apple.com/cn/safari/', target='_blank')
              i.fab.fa-safari
          span.mr-3
            a(href='https://www.liebao.cn/download.html', target='_blank')
              //- img.liebao(data-src=`${window.CDN_ASSETS}/static/img/liebao_logo.png`)
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
      liebao_logo_img: `${window.CDN_ASSETS}/static/img/liebao_logo.png`,
      STATICDOMAIN: window.CDN_STATIC,
      nightLogo: `${window.CDN_ASSETS}/static/img/dw/footer_log.png`,
      dayLogo: `${window.CDN_ASSETS}/static/img/dw/footer_log_day.png`,
      desktop_pagcor: `${window.CDN_ASSETS}/static/img/desktop_pagcor.png`,
      provideLog1: `${window.CDN_ASSETS}/static/img/provide/pic-brand-bti-night@2x.png`,
      provideLog2: `${window.CDN_ASSETS}/static/img/provide/pic-brand-wm-night@2x.png`,
      provideLog3: `${window.CDN_ASSETS}/static/img/provide/pic-brand-bole-night@2x.png`,
      provideLog4: `${window.CDN_ASSETS}/static/img/provide/pic-brand-ebet-night@2x.png`,
      provideLog5: `${window.CDN_ASSETS}/static/img/provide/pic-brand-avia-night@2x.png`,
      provideLog1_3x: `${window.CDN_ASSETS}/static/img/provide/pic-brand-bti-night@3x.png 3x`,
      provideLog2_3x: `${window.CDN_ASSETS}/static/img/provide/pic-brand-wm-night@3x.png 3x`,
      provideLog3_3x: `${window.CDN_ASSETS}/static/img/provide/pic-brand-bole-night@3x.png 3x`,
      provideLog4_3x: `${window.CDN_ASSETS}/static/img/provide/pic-brand-ebet-night@3x.png 3x`,
      provideLog5_3x: `${window.CDN_ASSETS}/static/img/provide/pic-brand-avia-night@3x.png 3x`,
    };
  },
  computed: {
    ...mapState('userSetting', [
      'darkMode',
    ]),
  },
  methods: {
    openChat() {
      this.$matomo_footer_livechat();
      window.LC_API.open_chat_window();
    },
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

