<template lang="pug">
.container-fluid
  .container.goodOderWarp
    .row.no-gutters
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 商品订单
      .col-12.text-center
        .menuBtn.mr-3(v-for='(item, index) in oderMenuArray', @click='changeCurrentOderType(index, item.name)' ) 
          .menuBtnRect(:class='{"active": (currentOderType===index)}')
            .i.fas(:class='item.icon')
          p.text-white {{item.name}}
        //- .oderBtn.mr-2(v-for='(item, index) in oderTypeArray', :class='{"active": (currentOderType===index)}', @click='changeCurrentOderType(index)' ) {{item}} 
      //- 梦基金纪录
      .col-12.my-3(v-if='currentOderType===0')
        .goodOderBackground
          bl_pointRecord
      //-  兑换纪录
      .col-12.my-3(v-if='currentOderType===1')
        .goodOderBackground
          bl_goodsOrder
      //- 兑换规则
      .col-12.my-3(v-if='currentOderType===2')
        .goodOderBackground
          .row.goodOderRule
            .col-6.col-sm-6.col-md-3.col-lg-3.col-xl-3(v-lazy-container)
              p
                img.goodOderRuleImg(:data-src='`${CDN_ASSETS}/static/img/dw/pic-user-transaction-1@3x.png`')
              p.text-center
                b STEP1 赚取梦基金
              p.text-center
                small 通过每日任务/游戏竞猜 赚取梦基金
            .col-6.col-sm-6.col-md-3.col-lg-3.col-xl-3(v-lazy-container)
              p
                img.goodOderRuleImg(:data-src='`${CDN_ASSETS}/static/img/dw/pic-user-transaction-2@3x.png`')
              p.text-center
                b STEP2 兑换礼品
              p.text-center
                small 丰富礼品随你挑选
            .col-6.col-sm-6.col-md-3.col-lg-3.col-xl-3(v-lazy-container)
              p
                img.goodOderRuleImg(:data-src='`${CDN_ASSETS}/static/img/dw/pic-user-transaction-3@3x.png`')
              p.text-center
                b STEP3 资料确认
              p.text-center
                small 填写收获信息、联系方式
            .col-6.col-sm-6.col-md-3.col-lg-3.col-xl-3(v-lazy-container)
              p
                img.goodOderRuleImg(:data-src='`${CDN_ASSETS}/static/img/dw/pic-user-transaction-4@3x.png`')
              p.text-center 
                b STEP4 坐等收货
              p.text-center 
                small 我们会尽快发货
            .col-12.my-4 
              p.text-center 
                b 梦基金兑换规则
              .ruleContent
                small 1、梦基金不代表真实人民币，不能直接套现，只能用于兑换『梦之城商城』内的商品以及参与『游戏竞猜』。
                  br
                  | 2、梦基金不能转移，也不能与他人梦基金叠加使用。
                  br
                  | 3、若您的收货信息不完整或有误，相关的申请与兑换将会取消。
                  br
                  | 4、『梦工厂』可能要求您补充相关资料，如您选择拒绝补充相关资料，将影响您参与梦基金兑换商品活动。
                  br
                  | 5、玩家成功提交梦基金兑换后，有关兑换将会尽快发货。
                  br
                  | 6、『梦工厂』保留不时更改换商品之权利，而毋须另行通知。
                  br
                  | 7、所有商品或服务，数量有限，先兑先得，换完即止。
                  br
                  | 8、已兑换的商品，不可取消或更改。
                  br
                  | 9、『梦工厂』不负商品之任何维护或保固责任。
                  br
                  | 10、如有任何争议，『梦工厂』保留最终决定权。
</template>
<script>
import bl_pointRecord from '@/components/bl_Oder/bl_pointRecord.vue';
import bl_goodsOrder from '@/components/bl_Oder/bl_goodsOrder.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_pointRecord,
    bl_goodsOrder
  },
  data() {
    return {
      oderMenuArray:[
        { icon:'fas fa-chess-knight', name:'梦基金纪录' },
        { icon:'fas fa-receipt', name:'兑换纪录', },
        { icon:'fas fa-exclamation-circle', name:'兑换规则', }],
      oderTypeArray:['梦基金纪录','兑换纪录','兑换规则'],
      currentOderType: 0,
      isLargeSize: false,
      page: 1,
      per_page: 10,
      CDN_ASSETS:window.CDN_ASSETS,
    };
  },
  computed: {
    ...mapState('shopping', ['goodsOrder', 'pointRecord', 'pointRecordTotal']),
    ...mapState('wallet', ['memberWallet']),
  },
  methods: {
    changeCurrentOderPage(val){
      const payload = {
        sdate: this.$dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
        edate: this.$dayjs().format('YYYY-MM-DD'),
        page: val,
        per_page: vm.per_page,
      };
      this.$store.dispatch('shopping/getPointRecord', payload);
    },
    changeCurrentOderType(val,name){
      const vm = this;
      this.currentOderType = val;
      // if(val===0){
      //   const payload = {
      //     sdate: this.$dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
      //     edate: this.$dayjs().format('YYYY-MM-DD'),
      //     page: vm.page,
      //     per_page: vm.per_page,
      //   };
      //   this.$store.dispatch('shopping/getPointRecord', payload);
      // } else if(val===1){
      //   const payload = {};
      //   this.$store.dispatch('shopping/getGoodsOrder', payload);
      // } else if(val===2){
      // }
      this.$matomo_oder_type(name);
    },
    resize(){
      if(window.innerWidth >=760){
        this.isLargeSize = true
      } else{
        this.isLargeSize = false
      }
    },

    goodDetail(item){
      this.$matomo_oder_record_open(item.transType);
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.changeCurrentOderType(0);
    window.addEventListener('resize', this.resize);
    this.resize();
  },
};
</script>

<style lang="scss" scoped>
.menuBtn{
  display:inline-block;
  p{
    margin-top: 5px;
    font-size: 12px;
  }
}
.menuBtnRect{
  padding: 0 10px;
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
.goodOderWarp{
  min-height: 500px;
  .goodOderBackground{
    border-radius: 16px;
    box-shadow: 0 0 20px 0 $DW_Color;
    background-color: #ffffff;
    padding: 20px;
    border:  1px solid $whiteAlpha_30;
    p{
      font-size: 13px;
      color: $gray_333;
    }
    .goodGoodsItem{
      background-color: #ffffff;
      p{
        line-height: 2;
      }
      &:last-child{
        hr{
          display: none;
        }
      }
    }
  }
  hr{
    border-top: 1px solid $balckAlpha_10;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.goodOderRule{
  padding: 20px;
}
.goodOderRuleImg{
  width: 100%;
}

.ruleContent{
  margin: auto auto;
  @include media_xs{
    width: 100%;
  }
  @include media_sm{
    width: 460px;
  }
  @include media_md{
    width: 500px;
  }
  @include media_lg{
    width: 500px;
  }
  @include media_xl{
    width: 500px;
  }
}

</style>

