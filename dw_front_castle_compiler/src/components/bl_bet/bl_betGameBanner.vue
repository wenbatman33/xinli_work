<template lang="pug">
.betGameWarpBanner.d-flex.justify-content-center.mb-3
  .betGameBanner.d-flex.flex-row.align-content-center
    .betGameBannerImg_1
      img(:src='`${CDN_ASSETS}/static/img/bg-circle-left@3x.png`')
    .betGameBannerImg_2
      img(:src='`${CDN_ASSETS}/static/img/bg-circle-right@3x.png`')
    .betGameBannerImg_3
      img(:src='`${CDN_ASSETS}/static/img/pic-bet-odds@3x.png`')
    .betGameBannerList.d-flex.flex-row.mx-3.justify-content-around
      div.d-none.d-sm-block
        span.text-center.mr-3 游戏类型 : 猜输赢和  
        span 游戏猜赢 : 1 倍（不含本金） 游戏猜输 : 输本金 
</template>
<script>
export default {
  data () {
    return {
      CDN_ASSETS:window.CDN_ASSETS,
    }
  }
};
</script>
<style lang='scss' scoped>
.betGameWarpBanner{
  position: relative;
  height: 80px;
  width: 100%;
  .betGameBanner{
    position: relative;
    margin: 30px 0px;
    width: 100%;
    height: 60px;
    border-radius: 16px;
    border: solid 1px $DW_ColorLight;
    background-color: $balckAlpha_20;
    .betGameBannerImg_1{
      position: absolute;
      margin-top: 0px;
      z-index: 0;
      img{
        height: 58px;
        width: auto;
      }
    }
    .betGameBannerImg_2{
      position: absolute;
      top: 0px;
      right: 0;
      z-index: 0;
      img{
        height: 58px;
        width: auto;;
      }
    }
    .betGameBannerImg_3{
      position: absolute;
      top: -45px;
      left: 30px;
      z-index: 0;
      img{
        height: 106px;
        width: auto;
      }
    }
    
    .betGameBannerList{
      width: 100%;
      .betGameBannerInfo{
        position: relative;
        z-index: 1;
        margin-left: 100px;
        line-height: 20px;
        width: 170px;
        color: white;
        font-size: $text-12;
      }
      .betGameBannerBtn{
        cursor: pointer;
        position: relative;
        width: 118px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 16px;
        box-shadow: 0 2px 4px 0 $balckAlpha_20;
        border: solid 1px $DW_ColorLight;
        background-image: linear-gradient(to right, $DW_ColorLight, $DW_Color);
        color: white;
      }
      position: relative;
      line-height: 60px;
      z-index: 1;
      color: white;
      font-size: $text-14;
    }
  }

  .GameListItem{
    width: 25%;
    color: white;
    font-size: 13px;
    border: 1px solid black;
    background-image: linear-gradient(to bottom, $gray_333, $gray_111)
  }
}
</style>
