<template lang='pug'>
	.memberdeposit
		.memberdeposit_channel
			ul
				span 选择通道:
				li(v-for='(item, index) in CashierChannelList' @click='selectPayment(index)' :key='index' :type='(currentPayment==index) ? "primary" : ""') 
					img(:src='item.ChannelIcon')
					label.speedpay_icon {{ item.ChannelName }}
					// input#speedpay.speedpay(name="speedpay" size="30" placeholder="支持 24 家主流银行" type="text")
					input#deposit_check.deposit_check(name='deposit_check' :value='index' type='radio' v-model="currentPayment")
		
		PaymentContent(v-if='steps=="1" && CashierChannelList.length>0' :CashierChannelList='CashierChannelList[currentPayment]' @gotoStep2='gotoStep2' @cashierDialog_1_Hide='cashierDialog_1_Hide')
		PaymentStep2(v-if='steps=="2"' @gotoStep1='gotoStep1' @cashierDialog_1_Hide='cashierDialog_1_Hide' :step2Response='step2Response')
		PaymentStep2_1(v-if='steps=="2_1"' @gotoStep1='gotoStep1' @cashierDialog_1_Hide='cashierDialog_1_Hide' :step2Response='step2Response')
</template>
<script>
import axios from 'axios';
import PaymentContent from '@/components/tgMember/tgCashierPaymentContent/PaymentContent.vue';
import PaymentStep2 from '@/components/tgMember/tgCashierPaymentContent/PaymentStep2.vue';
import PaymentStep2_1 from '@/components/tgMember/tgCashierPaymentContent/PaymentStep2_1.vue';
import tgError from '@/components/tgError/tgError.vue';
import router from '@/router/router';

export default {
  components: {
    PaymentContent,
    PaymentStep2,
    PaymentStep2_1,
    tgError,
  },
  data() {
    return {
      steps: '1',
      step2Response: '',
      currentPayment: 0,
      CashierChannelList: {},
    };
  },
  methods: {
    init() {
      const payload = { Device: '2' };
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Payment/GetCashierChannel/`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            vm.CashierChannelList = res.data.data;
          } else {
            vm.$message({
              showClose: true,
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
              onClose() {
                router.push('/member/account/1');
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectPayment(num) {
      this.steps = '1';
      this.currentPayment = num;
    },
    gotoStep1() {
      this.steps = '1';
    },
    gotoStep2(str, res) {
      this.steps = str;
      this.step2Response = res;
    },
    cashierDialog_1_Hide() {
      this.$emit('cashierDialog_1_Hide');
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.memberdeposit_channel li img{
	float: left;
	margin: 3% 0;
	margin-left: 3%;
	padding: 1% 0%;
	width: 5vw;
}
.speedpay_icon{
	background: unset;
	padding: 1.5%;
}
</style>
