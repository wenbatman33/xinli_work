<template lang='pug'>
.row.m-1
  .col-12(v-if='CashierChannelList.length>0')
    el-button-group
      el-button(v-for='(item, index) in CashierChannelList' @click='selectPayment(index)' :key='index' :type='(currentPayment==index) ? "primary" : ""')
        img(v-if='currentPayment==index' :src='item.ChannelIconWhite' width='16')
        img(v-else :src='item.ChannelIcon' width='16')
        span  {{ item.ChannelName }}
    el-alert.my-3(title='',type="warning", :closable="false")
      span 温馨提示：单笔限额  {{ rangeMin | commaFormat }}  ~  {{ rangeMax | commaFormat }} 
      span(v-if='message') , {{ message }}
    PaymentContent(v-if='steps=="1" && CashierChannelList.length>0'
                  :ProductTag='CashierChannelList[currentPayment].ProductTag'
                  :SupportBankCode='CashierChannelList[currentPayment].SupportBankCode'
                  :Info='CashierChannelList[currentPayment].Info'
                  :Another='CashierChannelList[currentPayment].Another'
                  :rangeMin='rangeMin'
                  :rangeMax='rangeMax'
                  @gotoStep2='gotoStep2'
                  @cashierDialog_1_Hide='cashierDialog_1_Hide'
                  @showAddBankForm='showAddBankForm')
    PaymentStep2(v-if='steps=="2"' @gotoStep1='gotoStep1' @cashierDialog_1_Hide='cashierDialog_1_Hide' :step2Response='step2Response')
    PaymentStep3(v-if='steps=="3"' @gotoStep1='gotoStep1' @cashierDialog_1_Hide='cashierDialog_1_Hide' :step2Response='step2Response')
  .col-12(v-else)
    tgError
  el-dialog(:visible.sync='addBankFormDialog', width='36%' append-to-body)
    tgAddBankForm(@addBankFinishEmitHandle='addBankFinishEmitHandle' @reInit='reInit')
</template>
<script>
import axios from 'axios';
import PaymentContent from '@/components/tgMember/tgCashierPaymentContent/PaymentContent.vue';
import PaymentStep2 from '@/components/tgMember/tgCashierPaymentContent/PaymentStep2.vue';
import PaymentStep3 from '@/components/tgMember/tgCashierPaymentContent/PaymentStep3.vue';
import tgError from '@/components/tgError/tgError.vue';
import tgAddBankForm from '@/components/tgMember/tgCashier/tgAddBankForm.vue';
import router from '@/router/router';

export default {
  components: {
    PaymentContent,
    PaymentStep2,
    PaymentStep3,
    tgError,
    tgAddBankForm,
  },
  data() {
    return {
      steps: '1',
      step2Response: '',
      currentPayment: 0,
      SingleMin: 0,
      SingleMax: 0,
      addBankFormDialog: false,
      CashierChannelList: {},
    };
  },
  computed: {
    rangeMin() {
      return this.CashierChannelList[this.currentPayment].SingleMin;
    },
    rangeMax() {
      return this.CashierChannelList[this.currentPayment].SingleMax;
    },
    message() {
      return this.CashierChannelList[this.currentPayment].Message;
    },
  },
  methods: {
    init() {
      const payload = { Device: '1' };
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
      console.log(str);
      this.steps = str;
      this.step2Response = res;
    },
    cashierDialog_1_Hide() {
      this.$emit('cashierDialog_1_Hide');
    },
    addBankFinishEmitHandle() {
      this.addBankFormDialog = false;
      this.getBankList();
    },
    getBankList() {
    },
    reInit() {
      this.init();
    },
    showAddBankForm() {
      this.addBankFormDialog = true;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
</style>
