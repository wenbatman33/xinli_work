<template lang="pug">
.container-fluid.p-0.promotion
  .container
    .row.no-gutters
      //- 展开 promotion Group
      .col-12.my-4
        .d-flex.justify-content-center.align-content-center
          .tabBar.d-flex.flex-row.justify-content-around
            .tabBtn.d-flex.flex-row.align-items-center.justify-content-center(v-for='(item, index) in promotionGroupNameArray', 
              :key='index', :class='[currentPromotionGroupNum==index? "active" : ""]', @click='changePromotionType(item, index)') 
              //- i.fa.mr-2(:class='iconList[index]')
              span {{item}}
      .col-12.my-3.px-5(v-if='promotionList.length<=0')
        //- 无优惠列表时
        .row
          .col-12.d-flex.justify-content-center.align-items-center.nullPoromotion
            .text-center
              img(:src='nullPoromotion')
              p 暂无优惠
        //- 有优惠列表时
      .col-12.my-3.px-2.promotionContainer(v-else)
        .d-flex.flex-wrap.justify-content-start
          .promotionItem.m-2(@click='openPromotion(item, item.id)', v-for='(item, index) in promotionList')
            span(:class='[item.promotionApplyMethod.value === 1 ? "highlight_auto" : "highlight"]').highlight {{item.promotionApplyMethod.display}}
            .pImg
              img(:src='item.promotionImagePc')
            .pInfo
              .title.mt-3.px-3 {{item.promotionTitle}}
              .des.px-3 {{item.promotionContent | noneHtmlCode}}
  bl_Footer
</template>
<script>
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'promotion',
  components: {
    bl_Footer,
  },
  data() {
    return {
      iconList: ['fa-gift', 'fa-calendar', 'fa-futbol', 'fa-dice-six', 'fa-chess-knight', 'fa-fist-raised', 'fa-bowling-ball', 'fa-crown'],
      currentPromotionGroupNum: 0,
      promotionGroupNameArray: ['全部', '节日', '体育', '真人', '棋牌', '电子', '彩票', 'VIP'],
      nullPoromotion: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
    };
  },
  computed: {
    ...mapState('promotion', [
      'promotionList',
    ]),
  },
  methods: {
    getPromotionList(index) {
      // 取得Promotion列表
      const payload = {};
      this.currentPromotionGroupNum = index || 0;
      if (index !== 0) {
        payload.promotion_group_id = index;
      }
      this.$store.dispatch('promotion/getPromotionList', payload);
    },
    openPromotion(item, id) {
      console.log(id);
      // promotionLinkMethod.value===2 時跳新頁籤
      if (item.promotionLinkMethod.value === 2) {
        // 原頁另開
        window.open(item.promotionLinkPc, '_blank');
      } else {
        // 开启 单个Promotion 至 dialog
        this.$matomo_promotionItem(id);
        this.$router.push({ path: `/promotion?card=bl_popPromotion&id=${id}` }).catch((err) => {});
      }
    },
    changePromotionType(item, index) {
      // 切换 Promotion Group
      this.$matomo_promotionCategory(item);
      this.getPromotionList(index);
    },
  },
  mounted() {
    this.getPromotionList();
  },
};
</script>

<style lang="scss" scoped>
.promotion{
  .promotionContainer{
    min-height: 550px;
  }
}
.tabBar{
  width: 952px;
  height: 48px;
  .tabBtn{
    cursor: pointer;
    font-size: 16px;
    width: 160px;
    height: 48px;
    line-height: 48px;
    border-radius: 12px;
    margin: 10px;
    border: solid 1px $DW_Color;
    color: $DW_Color;
  }
  .active{
    color: white;
    background: $DW_Color;
  }
  .icon {
    width: 24px;
    height: 24px;
    opacity: 0.4;
    background-color: $DW_ColorLight;
  }
}
.promotionItem{
  cursor: pointer;
  position: relative;
  width: 580px;
  height: 298px;
  border-radius: 24px;
  box-shadow: 0 2px 10px 0 $balckAlpha_10;
  background-color: white;
  overflow: hidden;
  .pImg{
    width: 648px;
    height: 204px;
    overflow: hidden;
    background: $gray_ccc;
  }
  .pInfo{
    position: absolute;
    background: white;
    width: 100%;
    bottom: -40px;
    height: 140px;
    transition: 0.3s;
    .title{
      text-align: center;
      font-size: $text-20;
      line-height: 2;
      color: black;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .des{
      opacity: 1;
      text-align: center;
      font-size: $text-14;
      color: $garyBlue_Darkest;
      transition: 0.3s;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .actionBtn{
      opacity: 0;
    }
  }
  // 滑鼠 hover 滑动效果
  // &:hover{
  //   .pInfo{
  //     bottom: 0px;
  //     .title{
  //       text-align: center;
  //     }
  //     .des{
  //       opacity: 1;
  //     }
  //     .actionBtn{
  //       opacity: 1;
  //     }
  //   }
  // }
}

.highlight{
  position: absolute;
  top: 20px;
  left: -40px;
  width: 160px;
  padding:10px;
  color: white;
  text-align: center;
  transform:rotate(-45deg);
  background-image: linear-gradient(274deg, $DW_orange, $DW_red);
  z-index: 3;
}
.highlight_auto{
  position: absolute;
  top: 20px;
  left: -40px;
  width: 160px;
  padding:10px;
  color: white;
  text-align: center;
  transform:rotate(-45deg);
  background: $garyBlue_Darkest;
  z-index: 3;
}
.nullPoromotion{
  min-height: 550px;
  color: $garyBlue_lightest;
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .promotion{
    .tabBar{
      .tabBtn{
        border: solid 1px $L_DW_Color;
        background: white;
        color: $L_DW_Color;
      }
      .active{
        color: white;
        background: $L_DW_Color;
      }
    }
  }
}
</style>
