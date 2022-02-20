<template lang="pug">
.row
  .col-12.col-sm-12.col-md-12.col-lg-6.col-xl-6 
    el-button(:class='{"active":(status===1)}', round, @click='changeStatus(1)') 已完成
    el-button(:class='{"active":(status===0)}', round, @click='changeStatus(0)') 未完成
  .col-12.col-sm-12.col-md-12.col-lg-6.col-xl-6.my-2.mobileDatePicker
    el-date-picker.DatePicker(
    v-model='datePickerRange',
    type='daterange',
    range-separator='至',
    start-placeholder='开始日期',
    value-format="yyyy-MM-dd",
    end-placeholder='结束日期',
    @change='getData')
  .col-12
    el-table(:data='goodsOrder', style='width: 100%', stripe, @expand-change='goodDetail')
      el-table-column(type='expand')
        template(slot-scope='props')
          .goodGoodsItem(v-for='(subItem, subIndex) in props.row.goodsDetail.data')
            p 商品内容:  {{subItem.content | noneHtmlCode}}
            p 数量:  {{subItem.quantity}}
            p 点数:  {{subItem.totalPoint}}
            p 商品状态:  {{subItem.status}}
            p 完成时间:  {{subItem.successAt}}
            p 商品备注:  {{props.row.note}}
            hr
      el-table-column(prop='createdAt', label='订单时间')
      el-table-column(prop='orderId', label='订单号')
      el-table-column(label='订单总额')
        template(slot-scope='props')
          span {{props.row.totalPoint | commaFormatDefault}}
  //- .col-12.my-3(v-if='goodsOrderTotal>0')
    //- el-pagination.float-right(background='', layout='prev, pager, next', :pager-count='5', :total='goodsOrderTotal', @current-change="changeCurrentOderPage")
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      datePickerRange:[this.$dayjs().subtract(1, 'months').format('YYYY-MM-DD'), this.$dayjs().format('YYYY-MM-DD')],
      isLargeSize: false,
      page: 1,
      per_page: 9999,
      status: 1
    };
  },
  computed: {
    ...mapState('shopping', ['goodsOrder', 'goodsOrderTotal']),
  },
  methods: {
    getData(){
      const vm = this;
      const payload = {
        sdate: this.datePickerRange[0],
        edate: this.datePickerRange[1],
        page: vm.page,
        per_page: vm.per_page,
        status: vm.status,
      };
      this.$store.dispatch('shopping/getGoodsOrder', payload);
    },
    changeStatus(val){
      this.status = val;
      this.getData();
    },
    goodDetail(item){
      this.$matomo_oder_record_open(item.transType);
    },
    resize(){
      if(window.innerWidth >=760){
        this.isLargeSize = true
      } else{
        this.isLargeSize = false
      }
    },
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.getData();
    window.addEventListener('resize', this.resize);
    this.resize();
  },
};
</script>
<style lang="scss" scoped>
.mobileDatePicker{
  @include media_xs{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_sm{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_md{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_lg{
    text-align: right;
    .DatePicker{
      width: 380px
    }
  }
  @include media_xl{
    text-align: right;
    .DatePicker{
      width: 380px
    }
  }
}
.active{
  color: #ffffff;
  background-color: $DW_Color;
}
</style>