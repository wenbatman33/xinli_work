<template lang="pug">
.goodDetail.py-3
  .row.goodsDetailRow(v-for='(item, index) in goodsDetail')
    .col-12.col-sm-12.col-md-12.col-lg-12.col-xl-12.my-3
      .DWBreadcrumb
        router-link(to='/') 首页
        span.mx-2 /
        span {{item.name}}
    .col-12.col-sm-12.col-md-5.col-lg-5.col-xl-5
      .gameImg.w-100
        .goodImg
          .RWDDIV
            .RWDImg
              img(:src='currentImg')
        //- img(:src='currentImg')
      .gameImgThumbnail.d-flex.flex-row.flex-warp.my-2
        .thumb.mr-2(v-for='(imgItem, imgIndex) in item.img_path', @click='changCurrentImg(imgItem)')
          .RWDDIV
            .RWDImg
              img(:src='imgItem')
        //- .thumb.mr-2(v-for='(imgItem, imgIndex) in item.img_path', @click='changCurrentImg(imgItem)')
        //-   img(:src='imgItem')
    .col-12.col-sm-12.col-md-7.col-lg-7.col-xl-7
      .goodsTitle.my-3 {{item.name}}
      .goodsPoint.my-3  {{item.point | commaFormatDefault}} 点
      .px-5
        .progress.my-3
          .progress-bar(role='progressbar', :style='`width: ${countPercent(item.point)}%`', aria-valuenow='50', aria-valuemin='0', aria-valuemax='100')
      .goodsContent.my-3.text-center 
        .goodsPoint.my-3(v-if='memberWallet.point>=item.point')  恭喜您，可以兑换了 ！
        .goodsPoint.my-3(v-else)  还差 {{item.point-memberWallet.point}} 梦基金就可以兑换
        p.my-3
          el-input-number.w-75(v-model='goodQuantity', :min='1')
        p.my-3
          el-button.w-75(type='primary', @click='addCart(item)') 加入购物车 
        p.my-3
          el-button.w-75(type='primary', @click='buyNow(item)') 立即兑换 
    .goodsContentRow.col-12
      .goodsContentTitle 详细说明
      .goodsContent(v-html='item.content')
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
export default {
  data() {
    return {
      categoryList: [
        //  description=“商品类别，我可兑换：-2、全部：-1、现金：0、电话卡：1”,
        { value:-1, dispaly: '全部' },
        { value:-2, dispaly: '可兑换' },
        { value:0, dispaly: '现金' },
        { value:1, dispaly: '电话卡' },
      ],
      goodQuantity: 1,
      page: 1,
      per_page: 10,
      category: -1,
      name: '',
      id:'',
      currentImg:'',
    };
  },
  computed: {
    ...mapState('shopping', ['goodsDetail','goodsCartList']),
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
      return result;
    },
    categoryBtnClick(val){ 
      this.category = val
      this.getGoodsListData();
    },
    getGoodsListData(){
      const payload = { 
        page: this.page, 
        per_page: this.per_page, 
        id: this.id, 
      };
      this.$store.dispatch('shopping/getGoodsDetail', payload)
        .then((res) => {
          this.currentImg = res.data.data[0].img_path[0];
        });
    },
    changCurrentImg(link){
      this.currentImg = link ;
    },
    addCart(item){
      const oder = {
        goods_id: item.id,
        quantity: this.goodQuantity,
        name: item.name,
        point: item.point,
        category: item.category.value,
        type: item.type.value,
        img_path: item.img_path[0]
      }
      // 是否已經加入購物車
      let isAddedItem = false;
      this.goodsCartList.map(goodItem =>  {
        if(goodItem.goods_id === oder.goods_id) {
          // goodItem.quantity +=1
          isAddedItem=true;
          this.$message({ message: '您已加入购物车', type: 'warning' });
        } else {
          this.$message({ message: '已加入购物车', type: 'success' });
        }
      });
      const temp = this.goodsCartList;

      if(!isAddedItem){
        temp.push(oder);
      }      
      this.$store.commit('shopping/setGoodsCartList', temp);
      // this.$router.push({ path: '/cart'});
    },
    buyNow(item){
      const oder = {
        goods_id: item.id,
        quantity: this.goodQuantity,
        name: item.name,
        point: item.point,
        category: item.category.value,
        img_path: item.img_path[0]
      }
      // 是否已經加入購物車
      let isAddedItem = false;
      this.goodsCartList.map(goodItem =>  {
        if(goodItem.goods_id === oder.goods_id) {
          // goodItem.quantity +=1
          isAddedItem=true;
        } 
      });
      const temp = this.goodsCartList;

      if(!isAddedItem){
        temp.push(oder);
      }      
      this.$store.commit('shopping/setGoodsCartList', temp);
      this.$router.push({ path: '/cart'});
    },
  },
  beforeDestroy () {
    this.$store.commit('shopping/setGoodsDetail', []);
  },
  mounted() {
    this.id = this.$route.query.id;
    this.category =this.$route.query.category
    this.getGoodsListData();
  
    this.$store.dispatch('shopping/checkGoodsCartList');
  },
};
</script>
<style lang="scss" scoped>
.DWBreadcrumb{
  /deep/.el-breadcrumb__item{
    color: white !important;
    /deep/.el-breadcrumb__inner{
      color: white !important;
      span{
        color: white !important;
      }
    }
  }
}

.goodDetail{
  min-height: 500px;
  .goodImg{
    width: 100%;
    padding: 20px;
    background-color: $balckAlpha_40;
  }
  .thumb{
    cursor: pointer;
    width: 20%;
    padding: 10px;
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
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: white;
  }
  .goodsPoint{
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: $DW_ColorLight;
  }
  .goodsInfo{
    font-size: 14px;
    text-align: center;
    color: white;
  }
  .progress{
    width: 100%;
    height: 4px;
    background: $blueDark_light;
    .progress-bar{
      border-radius: 20px;
      background: linear-gradient(to left, $DW_skyLight_1, $DW_purple) !important;
    }
  }
  .goodsContent{
    color: white;
  }
  .goodsDetailRow{
    min-height: 300px;
  }
  .goodsContentRow{
    min-height: 500px;
    .goodsContentTitle{
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      text-align: center;
      margin: 20px 0;
      background-color: rgba(24, 144, 255, 0.3);
      color: white;
    }
  }
}
</style>
