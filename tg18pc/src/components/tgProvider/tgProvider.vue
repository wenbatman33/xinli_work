<template lang='pug'>
  .container-fluid.slotGameBrand
    .container
      .row.mt-5.mb-5.no-gutters
        .col-7.p-2
          .ProviderWarp
            .slotGame
            .des.px-3
              span.title.mx-1 老虎机游戏 
              //- span.type.mx-1 Slot Games 
              span.list
                span.mx-1.type(v-for="item in slotProvider",v-if='item.Status!=0') {{item.CompanyName}} 
            .Provider.p-3
              .d-flex.align-content-center.flex-wrap
                .m-4.providerItem(v-for="item in slotProvider",v-if='item.Status!=0')
                  router-link(:to='"/slot?game="+item.GroupName', v-on:click.native='GA_home_platform(item.GroupId)')
                    .providerImage.text-center
                      img(:src='item.Images')
                    .providerName.text-center {{item.CompanyName}}
                .other 最丰富的老虎机游戏尽在 18老虎城
              //- .row
              //-   .col-2.providerItem(v-for="item in slotProvider",v-if='item.Status!=0')
              //-     .my-2
              //-       router-link(:to='"/slot?game="+item.GroupName', v-on:click.native='GA_home_platform(item.GroupId)')
              //-         .providerImage.text-center
              //-           img(:src='item.Images')
              //-         .providerName.text-center {{item.CompanyName}}
              //-   .other 最丰富的老虎机游戏尽在 18老虎城
        .col-5.p-2
          .row
            .col-12
              .ProviderWarp.Sub.Submb
                .boardGame
                .des.px-3
                  span.title.mx-1 棋牌游戏 
                  //- span.type.mx-1 Board Game 
                  span.list
                    span.mx-1.type(v-for="(item, index) in boardProvider", v-if='item.Status!=0') {{item.CompanyName}}
                .Provider.d-flex.align-items-center.justify-content-center
                  .d-flex.align-content-center.flex-wrap
                    .mx-4.providerItem(v-for="(item, index) in boardProvider", v-if='item.Status!=0')
                      router-link(v-if='index<9', :to='"/board?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                        .providerImage.my-2.text-center
                          img(:src='item.Images')
                        .providerName.text-center {{item.CompanyName}}
                      router-link(v-if='index>=9', :to='"/board?game="+boardProvider[0].GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                          .providerName.text-center
                            | 更多
                            br
                            | 游戏
                  //- .row
                  //-   .col-3(v-for="item in boardProvider", v-if='item.Status!=0')
                  //-     .my-2
                  //-       router-link.my-3(:to='"/board?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                  //-         .providerImage.my-3.text-center
                  //-           img(:src='item.Images')
                  //-         .providerName.text-center {{item.CompanyName}}
            .col-12
              .row.no-gutters
                .col-6.pr-2
                  .ProviderWarp.Sub
                    .fishGame
                    .des.px-3
                      span.title.mx-1 捕鱼游戏 
                      //- span.type.mx-1 Fishing Game 
                      span.list
                        span.mx-1.type(v-for="(item, index) in fishingProvider", v-if='item.Status!=0 && index<2') {{item.CompanyName}}
                        span.mx-1.type(v-if='fishingProvider.length > 2') 更多
                        //- span.mx-1.type(v-for="(item, index) in fishingProvider", v-if='item.Status!=0 && index<3') {{item.CompanyName}}
                    .Provider.d-flex.align-items-center.justify-content-center.flex-wrap
                      .mx-4.providerItem(v-for="(item, index) in fishingProvider", v-if='item.Status!=0')
                        router-link(v-if='index<3', :to='"/fishing?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                          .providerImage.my-1.text-center
                            img(:src='item.Images')
                          .providerName.text-center {{item.CompanyName}}
                        router-link(v-if='index>=3', :to='"/fishing?game="+fishingProvider[0].GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                          .providerName.text-center
                              | 更多
                              br
                              | 游戏
                      //- .row
                      //-   .col-6(v-for="item in fishingProvider", v-if='item.Status!=0')
                      //-     .my-2
                      //-       router-link(:to='"/fishing?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                      //-         .providerImage.text-center
                      //-           img(:src='item.Images')
                      //-         .providerName.text-center {{item.CompanyName}}
                .col-6.pl-2
                  .ProviderWarp.Sub
                    .arcadeGame
                    .des.px-3
                      span.title.mx-1 街机游戏 
                      //- span.type.mx-1 Board Game 
                      span.list
                        span.mx-1.type(v-for="(item, index)  in arcadeProvider", v-if='item.Status!=0 && index<2') {{item.CompanyName}}
                        span.mx-1.type(v-if='arcadeProvider.length > 2') 更多
                    .Provider.d-flex.align-items-center.justify-content-center.flex-wrap
                      .mx-4.providerItem(v-for="(item, index)  in arcadeProvider", v-if='item.Status!=0')
                        router-link(v-if='index<3',:to='"/arcade?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                          .providerImage.my-1.text-center
                            img(:src='item.Images')
                          .providerName.text-center {{item.CompanyName}}
                        router-link(v-if='index>=3', :to='"/arcade?game="+arcadeProvider[0].GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
                          .providerName.text-center 
                            | 更多
                            br
                            | 游戏
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('index', [
      'slotProvider',
      'fishingProvider',
      'boardProvider',
      'arcadeProvider',
    ]),
    getSlotList() {
      let str = '';
      // this.slotProvider.map(obj => str += `${obj.GroupName} `);
      this.slotProvider.forEach((obj) => {
        if (obj.Status !== 0 | obj.Status !== '0') {
          str += `${obj.GroupName} `;
        }
      });
      return str;
    },
    getFishingList() {
      let str = '';
      this.fishingProvider.forEach((obj) => {
        str += `${obj.GroupName} `;
      });
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
  .slotGameBrand{
    background-image: #fff
  }
  .el-row{
    padding: 10px;
  }
  .card{
    padding: 5px;
  }
  .Submb{
    margin-bottom: 20px;
  }
  .Sub{
    height: 200px !important;
    .Provider{
      height: 200px !important;
    }
  }
  .ProviderWarp{
    position: relative;
    overflow: hidden;
    height: 420px;
    .des{
      position: relative;
      bottom: 40px;
      height: 40px;
      background: rgba(0,0,0,.86);
      color: #fff;
      line-height: 40px;
      width: 100%;
      font-size: 16px;
      .type{
        font-size: 12px;
        color: #1890ff;
        line-height: 40px;
      }
      .list{
        position: absolute;
        right: 10px;
        font-size: 12px;
        color: #fff;
        line-height: 40px;
      }
    }
    .slotGame{
      position: relative;
      width: 634px;
      height: 420px;
      background: url('/static/img/pic-provider-slotgame.jpg');
      background-size: 100% cover;
      background-position: center center;
    }
    .fishGame{
      position: relative;
      width: 100%;
      height: 200px;
      background: url('/static/img/pic-provider-fishgame.jpg');
      background-size: cover;
      background-position: center center;
    }
    .boardGame{
      position: relative;
      width: 100%;
      height: 200px;
      background: url('/static/img/pic-provider-boardgame.jpg');
      background-size: cover;
      background-position: center center;
    }
    .arcadeGame{
      position: relative;
      width: 100%;
      height: 200px;
      background: url('/static/img/pic-provider-arcadegame.jpg');
      background-size: cover;
      background-position: center center;
    }
    .Provider{
      position: absolute;
      top: 100%;
      width: 100%;
      height: 420px;
      background: rgba(0,80,179,.9);
      z-index: 1;
      transition: top .3s;
      overflow: hidden;
      .providerItem{
        // height: 100px;
        &:hover{
          .providerName{
            text-decoration: underline;
          }
        }
      }
      .providerImage{
        height: 36px;
        img{
          width: 36px;
          height: 36px;
        }
      }
      .providerName{
        color: #fff;
      }
      .other{
        position: absolute;
        right: 20px;
        bottom: 20px;
        color: #fadb14;
      }
    }
    &:hover{
      .Provider{
        position: absolute;
        top: 0;
        width: 100%;
        height: 420px;
        background: rgba(0,80,179,.9);
        z-index: 1;
      }
    }
  }
  
</style>
