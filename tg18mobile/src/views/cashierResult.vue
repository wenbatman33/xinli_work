<template lang='pug'>
  .container-fluid
    tgFix
    tgSmNavi
    .content
      section
        .memberhistorydetail(v-if='PayType')
          .memberhistorydetail_bonus
            .memberhistorydetail_icon_sucess(v-if='StateCode == 1')
            .memberhistorydetail_icon_wait(v-if='StateCode == 2')
            .memberhistorydetail_icon_cancel(v-if='StateCode == 3')
            .memberhistorydetail_caption
              h1(v-if='StateCode == 1') 交易成功
              h1(v-if='StateCode == 2') 交易等待中
              h1(v-if='StateCode == 3') 交易失败
            // 交易內容資訊
            .memberhistorydetail_content
              ul
                li 交易单号
                  span {{ OrderId }}
                li 日期时间
                  span {{ Create_At }}
                li 交易渠道
                  span {{ ChannelName }}
                li 存款金额
                  span ¥ {{ Amount | commaFormat }}
            form
              .memberhistorydetail_btn(@click="gotoRecords") 返回记录
              .memberhistorydetail_btn(@click="gotoCashier") 继续储值
        tgError(v-if='error')
    tgFooter
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFix from '@/components/tgFix/tgFix.vue';
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
  components: {
    tgSmNavi,
    tgFix,
    tgFooter,
    tgError,
  },
  computed: {
    ...mapState('member', [
      'UserId',
    ]),
  },
  methods: {
    gotoCashier() {
      router.push('/member/cashier/1');
    },
    gotoRecords() {
      router.push('/member/records/1?type=2');
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
    const EndDate = new Date();
    const EndDateFormated = EndDate.toISOString().substr(0, 10);
    const StartDate = new Date(EndDate.setDate(EndDate.getDate() - 30));
    const StartDateFormated = StartDate.toISOString().substr(0, 10);
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
</style>
