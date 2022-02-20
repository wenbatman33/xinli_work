<template lang='pug'>
.pageContent.page
  .p-3
    .row.no-gutters
      .col-12.col-sm-6.text-center.text-sm-left.my-3
        h5 
          .i.fas.fa-clipboard-list.mr-2
          | 交易清單
      .col-12.col-sm-6.text-center.text-sm-right.my-3
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": payload.type===1}',@click='cahngeType(1)') 存款 
        span.mx-2n |  
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": payload.type===2}',@click='cahngeType(2)') 提款
    .row.no-gutters
      .col-12.col-sm-12.col-md-6.text-center.text-md-left.my-2
        el-button.m-1(v-for='item in seriesList' type='primary', size='small' plain round,  @click='cahngeDateType(item.value)') {{item.dispaly}}
    .row
      .col-12.col-sm-6.col-md-4.col-lg-3.my-2(v-for='(item, index) in transactionData')
        .transactionItem.p-3(@click='showDeatil(item)')
          .d-flex.justify-content-between.px-2.my-2
            span {{item.paymentCreatedAt}}
            span {{item.paymentCheckStatus.dispaly}}
          .d-flex.flex-column.px-2.my-2
            p.T_Color_2 {{item.paymentChannel}}
            p 交易單號 {{item.paymentOrderId}}
          .d-flex.justify-content-between.Amount.px-2.my-2
            span 交易金額
            span ¥ {{item.paymentAmount | commaFormatDefault }}
          .d-flex.justify-content-between.px-2.my-2
            span.T_Color_2 交易前
            span ¥ {{item.paymentOldCash | commaFormatDefault }}
          .d-flex.justify-content-between.px-2.my-2
            span.T_Color_2 交易後
            span ¥ {{item.paymentNewCash | commaFormatDefault }}
      .col-12(v-if='transactionData.length<=0') 
        .d-flex.justify-content-center.px-2.my-2 暫無紀錄
          
</template>

<script>
import { mapState } from 'vuex';
import { paymentOrderAPI, paymentOrderByIdAPI } from '@/api';


export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
  },
  data() {
    return {
      payload: {  
        type: 1,
        dateType: 1,
      },
      currentSeries: '今天',
      seriesList: [
        {
          value: 1,
          dispaly: '今天',
        },
        {
          value: 2,
          dispaly: '昨天',
        },
        {
          value: 3,
          dispaly: '7天',
        },
        {
          value: 4,
          dispaly: '30天',
        },
        {
          value: 5,
          dispaly: '上月',
        },
      ],
      transactionData: [],
    };
  },
  methods: {
    init() {
      this.getData(this.payload);
    },
    getData(payload) {
      paymentOrderAPI(payload)
        .then((res) => {
          console.log(res);
          this.transactionData = res.data.data;
        });
    },
    cahngeStatus(num) {
      this.payload.status = num;
      this.getData(this.payload);
    },
    cahngeType(num) {
      this.payload.type = num;
      this.getData(this.payload);
    },
    cahngeDateType(num) {
      this.payload.dateType = num;
      this.getData(this.payload);
    },
    betting() {
      const Card = { component: 'BettingCard', title: '投注單' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    showDeatil(item) {
      const Card = { component: 'TransactionLogDetail', title: '交易明細' };
      this.$store.commit('member/setTransactionLogDetail', item);
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.page{
  background: $gray_f5;
}
.gameList{
  .title{
    border-left: 8px solid #000 ;
    .moreLink{
      cursor: pointer;
      color: $Color_2;
    }
  }
}
.transactionItem{
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
  background-color: #ffffff;
  .gameInfo{
    font-size: 12px;
    .gameName, .divider{
      color:#fff;
    }
    .moreInfo{
      cursor: pointer;
      color:#fff;
    }
  }
}

.teamName{
  color: #fff;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teamScore{
  color: #fff;
}
.gameBetBTN{
  cursor: pointer;
  margin: 0px 4px;
  padding: 0 4px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  font-size: 12px;
  border: solid 1px #ffffff;
  background-color: rgba(2, 119, 189, 0.15);
  &:hover{
    background-color: rgba(2, 119, 189, 0.5);
  }
  .odds{
    color: $Color_1;
  }
}
.rounddDropdown{
  border-radius: 24px;
  overflow: hidden;
}
.seriesGameName{
  border-left: 8px solid $Color_2 ;
  padding-left: 10px;
  .moreLink{
    cursor: pointer;
    color: $Color_2;
  }
}
.Amount{
  color: white;
  height: 42px;
  line-height: 42px;
  background: $Color_1;
  border-radius: 4px;
}
.active{
  color: $Color_2 !important;
}
</style>
