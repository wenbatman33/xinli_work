<template lang='pug'>
  .container-fluid.VIPPage
    .VIPBanner
      img(src='/static/img/tgAgency/banner-agency.jpg')
    .container.pb-5
      .row.text-center
        .col-12
          .agencyTab
            .borderBttomLine
            span.agencyTabBtn(@click='agencyTab=1',:class='[agencyTab==1 ? "active" : ""]') 佣金计划 
            span.agencyTabBtn(@click='agencyTab=2',:class='[agencyTab==2 ? "active" : ""]') 加入代理
        .col-12.my-3
          tgAgencyPlan(v-if='agencyTab==1')
          tgAgencyForm(v-if='agencyTab==2')
</template>
<script>
import axios from 'axios';
import tgAgencyPlan from '@/components/tgAgency/tgAgencyPlan.vue';
import tgAgencyForm from '@/components/tgAgency/tgAgencyForm.vue';
import tgVerifyImg from '@/components/tgVerifyImg/tgVerifyImg.vue';

export default {
  components: {
    tgAgencyPlan,
    tgAgencyForm,
    tgVerifyImg,
  },
  data() {
    return {
      agencyTab: 1,
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
  .VIPPage{
    background: #000;
  }
  .VIPBanner{
    img{
      width: 100%;
    }
  }
  .agencyTab{
    height: 50px;
    text-align: center;
    // border-bottom: 2px solid #fff;
    .borderBttomLine{
      position: absolute;
      z-index: 1;
      top: 48px;
      height: 2px;
      width: 100%;
      background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #ffffff 50%, rgba(255, 255, 255, 0));
    }
    .agencyTabBtn{
      position: relative;
      display: inline-block;
      z-index: 2;
      height: 50px;
      width: 100px;
      line-height: 51px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .active{
      color: #dfab31;
      border-bottom: 2px solid #dfab31;
    }
  }
  
</style>
