<template lang="pug">
.container-fluid
  .container.goodCartWarp
    .row
      .col-12.col-sm-12.col-md-12.col-lg-12.col-xl-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 购物车订单
    h5.text-white.mt-3 购物车订单
    hr
    div.text-white(v-if='goodsCartList.length<=0')  
      h5.text-white 暂无商品
    div.goodsItems(v-else)
      .goodsItem.my-2(v-for='(item, index) in goodsCartList')
        .row
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3
            .text-center
              img.cartImg(:src='item.img_path')
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3
            .goodsItemColum.text-center
              span.text-white {{item.name}}
          .col-12.col-sm-12.col-md-12.col-lg-6.col-xl-6
            .goodsItemColum.text-center
              span.mx-2
                el-input-number(v-model='item.quantity', :min='1', @change='changeCART(index)')
              span.text-white.mx-2 {{(item.point * item.quantity) | commaFormatDefault}}
              span.mx-2
                el-button(type='primary', @click='deleteGood(index)') 删除 
    h6.text-white.mt-5 订单总结
    hr
    div
      p.text-white.text-right
        span.mr-5 我的梦基金 :
        span {{memberWallet.point | commaFormatDefault}}
      p.text-white.text-right
        span.mr-5 商品梦基金 :
        span {{shoppingPoint | commaFormatDefault}}
      hr
      p.text-white.text-right
        span.mr-5 梦基金结余 :
        span(v-if='(memberWallet.point-shoppingPoint)>=0') {{(memberWallet.point - shoppingPoint) | commaFormatDefault}}
        span.text-danger(v-else) {{(memberWallet.point - shoppingPoint) | commaFormatDefault}} (不足)
      hr
      p.text-white.text-right 
        el-button(:disabled='(memberWallet.point-shoppingPoint)<0 || goodsCartList.length<=0',type='primary', @click='gotoExchange') 前往兑换
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      CART:[]
    };
  },
  computed: {
    ...mapState('shopping', ['goodsCartList']),
    ...mapState('wallet', ['memberWallet']),
    ...mapState('member', ['memberStatus','PersonalDetail']),
    shoppingPoint() {
      let  allshoppingPoint = 0;
      this.$store.state.shopping.goodsCartList.map(function(obj) { 
        allshoppingPoint += (obj.point* obj.quantity)
      });
      return allshoppingPoint;
    },
  },
  methods: {
    changeCART(index){
      this.$store.commit('shopping/setGoodsCartList', this.goodsCartList);
    },
    deleteGood(index){
      const temp = this.goodsCartList
      temp.splice(index, 1); 
      this.$matomo_cart_delete();
      this.$store.commit('shopping/setGoodsCartList', temp);
    },
    gotoExchange(){
      this.$router.push({ path: '/exchange'});
    }
  },
  mounted() {
    this.$store.dispatch('shopping/checkGoodsCartList');
  },
};
</script>

<style lang="scss" scoped>
.goodCartWarp{
  min-height: 500px;
  margin-bottom: 100px;
  .cartImg{
    width: 90px;
    height: 90px;
  }
  .goodsItem{
    height: auto;
    padding: 10px 0;
    box-shadow: inset 0 -1px 0 0 $whiteAlpha_30;
    .goodsItemColum{
      line-height: 90px;
    }
  }
  hr{
    border-top: 1px solid $whiteAlpha_30;
  }
}
</style>
