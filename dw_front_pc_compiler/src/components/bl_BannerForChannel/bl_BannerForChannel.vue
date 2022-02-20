<template lang="pug">
  .bannerChannel.d-flex
    div.Channel.flex-grow-1(v-for='(item, key) in gameRecommendData', 
      :key='key',
      :class='[(activeNum == key)? "active" : ""]',
      @mouseover='activeNum = key')
      .infoGroup(:class='[(activeNum!=key)? "" : "floating"]')
        p.dec.text-center {{item.gameRecommendName_Ch}}
      .bannerCard
        img.bannerImg(:src='item.gameRecommendRole')
        .buttonGroup.d-flex.flex-column.justify-content-center.align-items-end(:class='[(activeNum!=key)? "" : "showButtonGroup"]')
          .palyButton.my-1(v-for='(subItem, subIndex) in item.gameRecommends.data', @click='playGame(item,subItem)') 
            img.palyButtonImg(:src='subItem.gameLogo_Recommend')
            img.palyButtonImgHover(:src='subItem.gameLogo_Pc_Mouseover')
            .palyButtonBg
</template>
<script>
import router from '@/router';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activeNum: 0,
    };
  },
  computed: {
    ...mapState('game', [
      'gameRecommendData',
    ]),
  },
  methods: {
    reSize() {
      const width = Math.round(window.document.body.clientWidth / 7);
      this.basicWidth = width;
    },
    playGame(item, subItem) {
      const payload = {};
      payload.item = item;
      payload.subItem = subItem;
      this.$store.dispatch('game/gameLogin', payload);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSize);
  },
  mounted() {
    window.addEventListener('resize', this.reSize);
    const vm = this;
    setTimeout(() => {
      vm.gameRecommendData.forEach((element, index) => {
        if (element.id === 1) vm.activeNum = index;
      });
    }, 1000);
    this.reSize();
  },
};
</script>
<style lang='scss' scoped>
.bannerChannel{
  position: relative;
  width: 100%;
  overflow: hidden;
  .Channel{
    position: relative;
    width: 180px;
    height: 340px;
    color: white;
    border-radius: 20px;
    margin: 0 10px;
    // background: $gray_ccc;
    transition: width .5s;
    
  }
  .active{
    width: 450px !important;

  }
}
.infoGroup{
  position: absolute;
  width: 88px;
  height: 88px;
  line-height: 88px;
  color: white;
  top: 230px;
  left: 30px;
  transition: top .3s ease-in-out;
  border-radius: 100%;
  background: #fff;
  z-index: 10;
  background: linear-gradient(to bottom, $DW_blueberry, $DW_slatBlue);
  .title{
    position: relative;
    z-index: 3;
    text-shadow: 0px 0px 10px $balckAlpha_60;
  }
  .dec{
    position: relative;
    z-index: 2;
    text-shadow: 0px 0px 10px $balckAlpha_60;
  }
}
.bannerCard{
  // width: 651px;
  // height: 480px;
  width: 100%;
  height: 280px;
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(303deg, $DW_blueberry 99%, $DW_blueGrey 2%);
  .bannerImg{
    position: absolute;
    left: -50px;
    margin: auto;
    z-index: 1;
  }
  .showButtonGroup{
    opacity: 1!important;
  }
  .overShadow{
    position: absolute;
    width: 100%;
    height: 240px;
    bottom: 0;
    z-index: 6;
    opacity: 0;
    background-image: linear-gradient(to bottom, $balckAlpha_00, $balckAlpha_100);
  }
  .buttonGroup{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    z-index: 7;
    opacity: 0;
    padding-right: 20px;
    transition: opacity .3s ease-in-out;
    // transition-delay: .3s;
    text-align: center;
    .palyButton{
      position: relative;
      cursor: pointer;
      width: 140px;
      padding: 0 0px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-radius: 24px;
      box-shadow: 0 2px 8px 0 $balckAlpha_20;
      // background-image: linear-gradient(to right, $DW_ColorLight, $DW_Color);
      overflow: hidden;
      .palyButtonBg{
        position: absolute;
        z-index: 1;
        width: 420px;
        height: 40px;
        top: 0px;
        left: -220px;
        background: linear-gradient(125deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%,  $DW_Color 50%, $DW_ColorLight 100%,);
        transition: all .3s ease-in-out;
      }
      .palyButtonImg{
        position: absolute;
        z-index: 2;
        width: 108px;
        height: 32px;
        left: 15px;
        top: 4px;
        opacity: 1;
        // transition: all .3s ease-in-out;
      }
      .palyButtonImgHover{
        position: absolute;
        z-index: 3;
        left: 15px;
        top: 4px;
        width: 108px;
        height: 32px;
        opacity: 0;
        // transition: all .3s ease-in-out;
      }
      &:hover{
        .palyButtonBg{
          left: 0px;
        }
        .palyButtonImg{
          opacity: 0;
        }
        .palyButtonImgHover{
          opacity: 1;
        }
      }
    }
    .logoIcon{
      width: 32px;
      height: auto;
    }
  }
  .darklayer{
    opacity: .8;
  }
  .showShadow{
    opacity: 1;
  }
  
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .infoGroup{
    background: linear-gradient(to bottom, $L_DW_orangeRed, $L_DW_orange);
  }
  .bannerCard{
    background: linear-gradient(303deg,  $L_DW_orangeRed, $L_DW_yellow);
  }
}
</style>
