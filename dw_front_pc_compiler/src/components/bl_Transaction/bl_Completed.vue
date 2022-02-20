<template lang="pug">
.row.no-gutters.w-100
  .w-100.text-center.pt-5
    h3 存款完成
    img.pb-5(:src='picSucess')
</template>
<script>

export default {
  data() {
    return {
      picSucess: `${window.CDN_ASSETS}/static/img/pic-sucess.jpg`,
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.active{
  color: white !important;
  background-color: $DW_Color !important;
}
.qrcodeWrap{
  margin: auto auto;
  width: 204px;
  height: 204px;
  border-radius: 10px;
  box-shadow: 0 0 12px 0 $balckAlpha_10;
  background-color: $DW_sky_1;
  border: 10px solid $DW_sky_1;
  img{
    width: 100%;
    height: 100%;
  }
}
.alertHighLight{
  color: $DW_sky_1;
}
.returnContentImg{
  width: 212px;
}
.dec{
  p{
    font-size: 14px;
    margin: 6px;
  }
}
.returnContentInfo{
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 12px 0 $balckAlpha_10;
  .returnContentTitle{
    padding: 0 14px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: white;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 12px 0 $balckAlpha_10;
    background-image: linear-gradient(83deg, $DW_Color, $DW_ColorLight);
  }
  .returnContentSubContent{
    padding: 6px;
    height: 124px;
    p{
      margin: 6px 10px;
      .title{
        color: $garyBlue_Dark;
      }
    }
  }
}
</style>
