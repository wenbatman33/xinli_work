<template lang="pug">
.goodList.p-3
  .row.no-gutters.px-3
    .col-12
      .menuBtn.mr-3(v-for='(item, index) in categoryList', @click='categoryBtnClick(item.value, item.name)' ) 
        .menuBtnRect(:class='{"active": (category===item.value)}')
          .i.fas(:class='item.icon')
        p.text-white {{item.name}}
    //- .categoryBtn.mr-3(v-for='(item, index) in categoryList',:key='index', @click='categoryBtnClick(item.value)', :class='{"active": (category===item.value) }' ) {{item.dispaly}}
  .row
    .goodItemNoData.col-12.text-white.nullData(v-if='goodsList.length<=0')
      .text-center
        img(:src='`${CDN_ASSETS}/static/img/nullPoromotion.png`')
        p 暂无商品
    .goodItem.col-6.col-sm-6.col-md-4.col-lg-2.col-xl-2(v-for='(item, index) in goodsList', :ref='`goodItem_${index}`' @click='gotoDetail(item)')
      //- p.text-white {{item}}
      .goodImg
        .RWDDIV
          .RWDImg
            img(:src='item.img_path[0]')
            //- el-avatar(shape="square", :size="100", :fit="fit" :src="item.img_path[0]")
      .goodsTitle {{item.name}}
      .goodsInfo.d-flex.flex-row.justify-content-between
        .dwPoint {{item.point | commaFormatDefault}}点
        .dwPresent(v-if='memberWallet.point') 
          span {{countPercent(item.point)}} %
        .dwPresent(v-else) 
          span 0%
          //- span(v-if='(( memberWallet.point / item.point).toFixed(2))==Infinity') 0 %
          //- span(v-else-if='((( memberWallet.point / item.point).toFixed(2))*100) >= 100') 100%
          //- span(v-else) {{ ((( memberWallet.point / item.point).toFixed(2))*100) }}%
      .progress
        .progress-bar(role='progressbar', :style='`width: ${countPercent(item.point)}%`', aria-valuenow='50', aria-valuemin='0', aria-valuemax='100')
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
export default {
  data() {
    return {
      categoryList: [
        //  description=“商品类别，我可兑换：-2、全部：-1、现金：0、电话卡：1”,
        { value:-1, name: '全部',  icon:'fas fa-th-large'},
        { value:-2, name: '可兑换', icon:'fas fa-user' },
        { value:0, name: '现金' ,icon:'fas fa-coins' },
        { value:1, name: '电话卡', icon:'fas fa-credit-card' },
      ],
      page: 1,
      per_page: 10,
      // -1 预设为 全部
      category: -1,
      name: '',
      CDN_ASSETS:window.CDN_ASSETS,
    };
  },
  computed: {
    ...mapState('shopping', ['goodsList']),
    ...mapState('wallet', ['memberWallet']),
  },
  methods: {
    countPercent(point){
      let result;
      if((( this.memberWallet.point / point).toFixed(2))==Infinity) {
        result=0;
      } else if(((( this.memberWallet.point / point).toFixed(2))*100)>=100) {
        result=100;
      } else{
        result=((( this.memberWallet.point / point).toFixed(2))*100);
      }
      return result.toFixed(0);
    },
    categoryBtnClick(val, name){ 
      this.category = val
      this.$matomo_shopping_category(name);
      this.getGoodsListData();
    },
    getGoodsListData(){
      const payload = { 
        page: this.page, 
        per_page: this.per_page, 
        category: this.category, 
        name: this.name, 
      };
      this.$store.dispatch('shopping/getGoodsList', payload);
    },
    gotoDetail(item){
      this.$matomo_good_item(item.name);
      const query = { 
        id: item.id, 
      };
      this.$router.push({ path: '/detail' , query });
    },
    resize(){
      // console.log(document.querySelector('.goodItem').offsetWidth)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  mounted() {
    this.getGoodsListData();
    window.addEventListener('resize', this.resize)
    this.resize();
    
  },
};
</script>
<style lang="scss" scoped>
.goodList{
  width: 100%;
}

.goodItem{
  margin: 10px 0;
  padding: 10px;
  .goodImg{
    width: 100%;
    padding: 20px;
    background-color: $balckAlpha_40;
  }
  .RWDDIV{
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    text-align: center;
    overflow: hidden;
    .RWDImg{
      position: absolute;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      box-sizing: border-box;
      img{
        position:relative;
        width: 100%;
        margin: auto auto;
        height: auto;
      }
    }
  }
  .goodsTitle{
    color: white;
    overflow : hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
    font-size: 14px;
  }
  .goodsInfo{
    font-size: 14px;
    color: $DW_ColorLight;
  }
  .progress{
    height: 4px;
    background: $blueDark_light;
    .progress-bar{
      border-radius: 20px;
      background: linear-gradient(to left, $DW_skyLight_1, $DW_purple) !important;
    }
  }
}

.menuBtn{
  display:inline-block;
  p{
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
  }
}
.menuBtnRect{
  padding: 0 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 12px;
  box-shadow: 0 0 20px 0 $DW_ColorAlpha_40;
  background-color: $DW_ColorAlpha_20;
  color: $DW_Color;
  cursor: pointer;
  border: 1px $DW_Color solid;
  
}
.active{
  background: $DW_Color;
  color: white;
}
</style>
