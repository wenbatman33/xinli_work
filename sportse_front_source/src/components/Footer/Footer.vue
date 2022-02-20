<template lang='pug'>
.footer.px-3
  .row.no-gutters
    .col-12.col-lg-6.col-xl-6
      .row
        .col-12.col-lg-8.col-xl-8.p-3
          .text-center.text-lg-left.text-xl-left.text-white 
            p 推薦使用的瀏覽器
            p.des.py-2 為了提供更好的用戶體驗, 建議您使用下列我們推薦的瀏覽器訪問我們的網站。
        .col-12.col-lg-4.col-xl-4.p-3.CENTER
          .col.CENTER.browserDownload
            .mr-2
              a(href='https://www.mozilla.org/zh-TW/firefox', target='_blank')
                i.fab.fa-firefox
            .mr-2
              a(href='https://www.google.com/intl/zh-TW/chrome/', target='_blank')
                i.fab.fa-chrome
            .mr-2
              a(href='https://www.microsoft.com/zh-tw/edge', target='_blank')
                i.fab.fa-internet-explorer
            .mr-2
              a(href='https://www.apple.com/tw/safari/', target='_blank')
                i.fab.fa-safari
            
    .col-12.d-lg-none.d-xl-none
      hr
    //- .col-12.col-lg-6.col-xl-6
    //-   .p-3
    //-     .text-center.text-lg-left.text-xl-left.text-white 
    //-       p 幫助中心
    //-       p.des.py-2  
    //-         span.mr-3 
    //-           router-link(to='/') 關於我們
    //-         span.mr-3 
    //-           router-link(to='/') 隱私權政策
    //-         span.mr-3 
    //-           router-link(to='/') 條款與規則
    //-         span.mr-3 
    //-           router-link(to='/') 幫助中心
  .row.no-gutters 
    .col-12.d-none.d-lg-block.d-xl-block
      hr
    .col-12
      .text-center.text-lg-left.text-xl-left.text-white.py-3 
        p 版權所有 © 2020 
          span
            img.logo(:src='logo')
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      logo: '/static/img/logo.png',
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang='scss' scoped>
.footer{
  // min-height: 380px;
  background: $Color_2;
  p{
    font-size: 13px;
  }
  a, .des{
    color: rgba(255,255,255,.75)
  }
}
.browserDownload{
  font-size: 24px;
  a{
    color: white !important;
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
hr{
  margin: 4px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}
.logo{
  margin-top: -10px;
  width: 80px;
}
</style>

