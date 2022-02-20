<template lang="pug">
  .container-fluid.section_2#section_2.p-0
    .d-flex.justify-content-center.px-5
      .featureItemType1.mx-3.pt-3
        p.mt-5 提款平均时间
        h5.mt-4 143s
      .featureItemType1.mx-4.pt-3
        p.mt-5 存款平均时间
        h5.mt-4 62s
      .featureItemType2.mx-4.pt-3 
        p.mt-5 极速存提
        p.mt-3
          img(:src='feature_icon_1')
      .featureItemType2.mx-4.pt-3
        p.mt-5 沟通保密
        p.mt-3
          img(:src='feature_icon_2')
      .featureItemType2.mx-4.pt-3
        p.mt-5 资金安全
        p.mt-3
          img(:src='feature_icon_3')
      .featureItemType2.mx-4.pt-3
        p.mt-5 智能自动
        p.mt-3
          img(:src='feature_icon_4')
</template>
<script>
export default {
  data() {
    return {
      feature_icon_1: `${window.CDN_ASSETS}/static/img/dw/feature_icon_1.png`,
      feature_icon_2: `${window.CDN_ASSETS}/static/img/dw/feature_icon_2.png`,
      feature_icon_3: `${window.CDN_ASSETS}/static/img/dw/feature_icon_3.png`,
      feature_icon_4: `${window.CDN_ASSETS}/static/img/dw/feature_icon_4.png`,
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.section_2{
  .featureItemType1{
    position: relative;
    width: 150px;
    height: 184px;
    border-radius: 70px 70px 0 0;
    color: white;
    text-align: center;
    overflow: auto;
    font-size: $text-16;
    background: linear-gradient(to bottom, $DW_Color, $DW_ColorAlpha_30 100%);
  }
  .featureItemType2{
    position: relative;
    width: 150px;
    height: 184px;
    border-radius: 70px 70px 0 0;
    color: white;
    text-align: center;
    overflow: auto;
    font-size: $text-16;
    background: linear-gradient(to bottom, $DW_purpleDark, $DW_purpleDark_30 100%);
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .section_2{ 
    .featureItemType1{
      background: linear-gradient(to bottom, $L_DW_greenMiddle, $L_DW_greenMiddle_30 100%);
    }
    .featureItemType2{
      background: linear-gradient(to bottom, $L_DW_orange, $L_DW_orange_30 100%);
    }
  }
}
</style>
