<template lang="pug">
  .container-fluid
    tgNavi
    .container.my-5(v-if='PayType')
      .row
        .col-12
          el-card.d-flex.justify-content-center.align-items-center
            .resultIcon.text-center
              img(v-if='StateCode == 1' src='/static/img/pic-mb-history-sucess.png')
              img(v-if='StateCode == 2' src='/static/img/pic-mb-history-wait.png')
              img(v-if='StateCode == 3' src='/static/img/pic-mb-history-cancel.png')
            h3.text-center(v-if='StateCode == 1') 交易成功
            h3.text-center(v-if='StateCode == 2') 交易等待中
            h3.text-center(v-if='StateCode == 3') 交易失败
            .resultTable.my-5
              .resultRow2.my-2 
                span.title.px-2 交易单号
                span.content.px-2 {{OrderId}}
              .resultRow2.my-2 
                span.title.px-2 日期时间
                span.content.px-2 {{Create_At}}
              .resultRow2.my-2 
                span.title.px-2 交易渠道
                span.content.px-2 {{ChannelName}}
              .resultRow2.my-2 
                span.title.px-2 存款金额
                span.content.px-2 {{Amount}}
            .buttonGroup.my-5.text-center
              el-button.is-plain(@click='gotoRecords') 返回纪录
              el-button.el-button--primary(@click='gotoCashier') 继续储值
    tgError.my-5(v-if='error')
    tgFooter
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import router from '@/router/router';
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgError from '@/components/tgError/tgError.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      StateCode: '',
      OrderId: '',
      PayType: '',
      Create_At: '',
      ChannelName: '',
      Amount: '',
      StartDate: '',
      EndDate: '',
      error: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserId',
    ]),
  },
  components: {
    tgNavi,
    tgFooter,
    tgError,
  },
  methods: {
    gotoCashier() {
      router.push('/member/cashier/1');
    },
    gotoRecords() {
      router.push('/member/records/sum?type=2');
    },
    getCashierResult(OrderId) {
      const vm = this;
      const payload = {};
      payload.UserId = this.UserId;
      payload.Date_S = this.StartDate;
      payload.Date_E = this.EndDate;
      payload.OrderId = OrderId;
      payload.Page = 1;
      payload.PageLimit = 30;
      axios.post(`${process.env.VUE_APP_APIHOST}/Payment/QueryOrder/`, payload)
        .then((res) => {
          if (res.data.data.data_list.length <= 0) {
            vm.error = true;
          } else if (res.data.status === 1) {
            vm.OrderId = res.data.data.data_list[0].OrderId;
            vm.PayType = res.data.data.data_list[0].PayType;
            vm.Create_At = res.data.data.data_list[0].Create_At;
            vm.ChannelName = res.data.data.data_list[0].ChannelName;
            vm.Amount = res.data.data.data_list[0].Amount;
            vm.StateCode = res.data.data.data_list[0].StateCode;
          } else {
            vm.error = true;
          }
        });
    },
  },
  mounted() {
    const EndDateFormated = moment().format('YYYY-MM-DD');
    const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
    this.EndDate = EndDateFormated;
    this.StartDate = StartDateFormated;

    const vm = this;
    const OrderIdURL = new URL(window.location.href);
    const OrderId = OrderIdURL.searchParams.get('OrderId');
    console.log(OrderId);
    this.OrderId = OrderId;
    this.getCashierResult(OrderId);
  },
};
</script>
<style lang="scss" scoped>
.resultTable{
  width: 350px;
}
.title{
  display: inline-block;
  width: 45%;
  text-align: right;
  color: #8c8c8c;
}
.content{
  display: inline-block;
  width: 55%;
  text-align: left;
}
</style>
