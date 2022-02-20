<template lang='pug'>
  .container-fluid.VIPPage.p-0
    .VIPBanner
      img(:src='banner')
    .container.pb-5
      .row.text-center.no-gutters
        .col-12
          .agencyTab
            .borderBttomLine
            span.agencyTabBtn(@click='agencyTab=1',:class='[agencyTab==1 ? "active" : ""]') 佣金计划 
            span.agencyTabBtn(@click='agencyTab=2',:class='[agencyTab==2 ? "active" : ""]') 加入代理
        .col-12.my-3
          bl_AgencyPlan(v-if='agencyTab==1')
          bl_AgencyForm(v-if='agencyTab==2')
</template>
<script>
import axios from 'axios';
import bl_AgencyPlan from '@/components/bl_Agency/bl_AgencyPlan.vue';
import bl_AgencyForm from '@/components/bl_Agency/bl_AgencyForm.vue';

export default {
  components: {
    bl_AgencyPlan,
    bl_AgencyForm,
  },
  data() {
    return {
      agencyTab: 1,
      banner: `${window.CDN_ASSETS}/static/img/agency/banner-agency.jpg`,
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
    color: $theme;
    border-bottom: 2px solid $theme;
  }
}
</style>
