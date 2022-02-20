<template lang="pug">
.row.no-gutters.w-100(v-if='initForm')
  el-form.w-100(:model="depositForm", ref="depositForm", label-width="80px", v-if='depositStep==1')
    el-alert(type='info', :closable='false', v-if='paymentIndex!=-1')
      slot
        span.mr-2
          i.el-alert__icon.el-icon-info
        span 提示 ：单笔限额 
        span.alertHighLight {{lower_limit | commaFormat}} 
        span 元 ～ 
        span.alertHighLight {{up_limit | commaFormat}}  
        span 元
    .col-12.py-2
      el-form-item.m-0(prop="amount", label="存款金额")
        el-input(v-model.trim='depositForm.amount', @keyup.native='depositFormIntegerNumber', type='number',placeholder='请输入存款金额')
        .row.no-gutters
          .col-3.pr-2.pt-1(v-for='(item, index) in amountList', :key='index')
            el-button.w-100(type="primary", plain, size="small", @click='depositForm.amount=item') ¥ {{item | commaFormat}}
        .row.no-gutters
          .col-12(v-if='pipeline.length>0 | bank.length>0')
            span.deposit_feeTip 本次您选择的支付通道，存款手续费为：{{ computed_deposit_fee | commaFormat}} 元，实际上分金额：{{ depositForm.amount-computed_deposit_fee | commaFormat}} 元
    .col-12.py-2
      el-form-item.m-0(prop="account", label="支付通道")
        .row.no-gutters
          .col-3.pr-2.pt-2(v-for='(item, index) in payment', :key='index')
            el-button.w-100(@click='seletePayment(item, index)', :class='[(paymentIndex===index)?"active": ""]') {{item.service_name}}
        //- el-input(v-model.trim='depositForm.amount', placeholder='请输入存款金额')
    .col-12.py-2(v-if='pipeline.length>0')
      el-form-item.m-0(prop="account", label="支付线路")
        .row.no-gutters
          .col-3.pr-2.pt-2(v-for='(item, index) in pipeline', :key='index')
            el-button.w-100(@click='seletePipeline(item, index, item.payment_name)', :class='[(pipelineIndex===index)?"active": ""]') 线路{{(index+1)}}
        //- el-input(v-model.trim='depositForm.amount', placeholder='请输入存款金额')
    .col-12.py-2(v-if='bank.length>0')
      el-form-item.m-0(prop="account", label="支付银行")
        el-select(v-model='depositForm.payload', placeholder='请选择')
          el-option(v-for='item in bank', :key='item.value', :label='item.bank_name', :value='item.value')
    //- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    .col-12.py-2(v-if='Object.keys(promotionData).length>0')
      el-form-item.m-0(label="优惠活动")
        p(v-if='showPromotion===false')
          el-button.mx-2(@click='showPromotion=true') 我要参加
        p.mb-2(v-if='showPromotion===true', v-for='(item, key, index) in promotionData')
          span {{key}}
          span(v-for='(subItem, subKey, subIndex) in item') 
            el-button.mx-2(@click='promotionApply(key,item, subKey,subItem)') {{subKey}}
    //- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    .col-12.py-3
      el-button.w-100(type="primary", :disabled='submitButtonEnabled==false', @click='submitForm') 提交存款
    //- .col-12
    //-   el-button.w-100(type="text") 查看存款教程
  .w-100
    div(v-if='returnType==="form"', v-html='returnContent')
    //- qrcode
    .qrcodeDiv(v-if='returnType==="qrcode"')
      h5.text-center 存款进行中
      p.text-center.m-0.my-2  
        span 存款金额 
        span.text-danger {{depositForm.amount}} 
        span 元，请在 
        span.text-danger {{ qrcodeReturn.timeout | formatSecond}} 
        span 分钟内完成支付
      p.text-center.m-0.my-2  
        span 交易单号 
        span.text-danger {{qrcodeReturn.order_id}}
      .qrcodeWrap
        img(:src='qrcodeReturn.returnContent')
      p.text-center.my-2  请使用 {{qrcodeReturn.payment_name}} 扫描二维码
      p.text-center.my-2 {{returnContent}}
      .row
        .col-6
          el-button.w-100(type="primary", plain, @click='gotoDeposit') 继续存款
        .col-6
          el-button.w-100(type="primary", @click='clickGotoTransactionlog') 已完成，前往查看进度
      //- .col-12
      //-   el-button.w-100(type="text") 查看存款教程
    div(v-if='returnType==="bankcard"')
      h3.text-center 存款进行中
      p.text-center 已完成订单，请尽快通过 
        span.text-primary 网银转帐 
        |  至下列帐户完成存款流程。
      p.text-center.text-danger 提醒您 ：请务必在《备注》填写「附言」，才能秒存秒到哦 ！
      .row
        .col-7
          .returnContentInfo
            .returnContentTitle 工商银行
            .returnContentSubContent 
              p 
                span.title 姓名 ：
                span#name {{returnContent.bankcard_info.bank_cardholder}}
                span.float-right.text-primary.cursorPointer(@click="copyText('name')") 复制文字
              p 
                span.title 卡号 ：
                span#bankCard {{returnContent.bankcard_info.bank_card_no}}
                span.float-right.text-primary.cursorPointer(@click="copyText('bankCard')") 复制文字
              p 
                span.title 金额 ：
                span#amount {{returnContent.bankcard_info.amount}}
                span.float-right.text-primary.cursorPointer(@click="copyText('amount')") 复制文字
              p 
                span.title 附言 ：
                span#remark {{returnContent.bankcard_info.remark}}
                span.float-right.text-primary.cursorPointer(@click="copyText('remark')") 复制文字
        .col-5
          img.returnContentImg(:src='returnContentImg')
      el-divider
      .dec
        p 1、若填写的存款金额与实际存款金额不一致，将无法到账。
        p 2、若您无同行卡，请使用「跨行转账」并选择「加急」，方便系统及时到账。
        p 3、请使用本人真实姓名进行存款，若使用他人银行卡将无法到账。
</template>
<script>
import axios from '@/axiosSetting';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      initForm: false,
      depositStep: 1,
      amount: '',
      amountList: [100, 500, 1000, 1500, 2000, 2500, 3000, 5000],
      payment: [],
      pipeline: [],
      promotionData: '',
      showPromotion: false,
      bank: [],
      paymentIndex: -1,
      pipelineIndex: -1,
      payment_name: '',
      depositForm: {
        amount: '',
        payload: '',
      },
      submitButtonEnabled: false,
      returnType: '',
      returnContent: '',
      countingTimer: '',
      qrcodeReturn: {
        returnContent: '',
        order_id: '',
        payment_name: '',
        timeout: 0,
      },
      lower_limit: 0,
      up_limit: 0,
      day_remain: 0,
      deposit_fee: 0,
      returnContentImg: `${window.CDN_ASSETS}/static/img/depositFrom_returnContent_Img_1.png`,
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'memberProfile',
    ]),
    ...mapState('wallet', [
      'paymentDepositList',
    ]),
    computed_deposit_fee() {
      return this.depositForm.amount * this.deposit_fee;
    },
  },
  watch: {
    depositForm: {
      handler(val) {
        const vm = this;
        if (vm.depositForm.amount !== '' && vm.depositForm.payload !== '') {
          vm.submitButtonEnabled = true;
        } else {
          vm.submitButtonEnabled = false;
        }
      },
      deep: true,
    },
    'depositForm.amount': {
      handler(val, oldval) {
        const vm = this;
        vm.payment = [];
        vm.bank = [];
        vm.seleteDepositAmount(val);
      },
      deep: true,
      immediate: true,
    },
    payment(value) {
      const vm = this;
      vm.bank = [];
    },
  },
  methods: {
    depositFormIntegerNumber() {
      this.depositForm.amount = Number(this.depositForm.amount.toString().replace(/[^\.\d]/g, '').replace('.', ''));
    },
    countingTimeout() {
      const vm = this;
      vm.qrcodeReturn.timeout -= 1;
      if (vm.qrcodeReturn.timeout > 0) {
        vm.countingTimer = setTimeout(() => {
          vm.countingTimeout();
        }, 1000);
      } else {
        clearTimeout(this.countingTimer);
        vm.$store.dispatch('dialog/closeCommandDialog');
      }
    },
    seleteDepositAmount(amount) {
      // 选择支付渠道
      const vm = this;
      vm.paymentIndex = -1;
      vm.pipelineIndex = -1;
      vm.depositForm.payload = '';
      vm.pipeline = [];
      if (amount !== '') {
        vm.payment = vm.paymentDepositList.filter((item) => {
          const filterPipeline = item.payment.filter(subItem => ((amount >= subItem.lower_limit) && (amount <= subItem.up_limit) && (amount <= subItem.day_remain)));
          return filterPipeline.length > 0;
        });
        console.log(vm.payment);
      }
    },
    seletePayment(item, index) {
      const vm = this;
      this.pipeline = item.payment.filter(subItem => ((vm.depositForm.amount >= subItem.lower_limit) && (vm.depositForm.amount <= subItem.up_limit) && (vm.depositForm.amount <= subItem.day_remain)));

      vm.paymentIndex = index;
      vm.payment_name = item.service_name;
      vm.depositForm.payload = '';
      this.seletePipeline(item.payment[0], 0);
    },
    seletePipeline(item, index) {
      // 选择线路
      const vm = this;
      vm.pipelineIndex = index;
      if (this.memberProfile.memberRealName === 0 && vm.payment_name.indexOf('网银转帐') >= 0) {
        vm.depositForm.payload = '';
        this.$message({ message: '请先完善个人资料的真实姓名,如果真实姓名与存款人姓名不符,会有延迟到帐问题/选择其他存款方式。', type: 'error' });
      } else {
        // 提示单笔存款限额
        vm.lower_limit = item.lower_limit;
        vm.up_limit = item.up_limit;
        vm.deposit_fee = item.deposit_fee;
        console.log(item);
        if (item.payload.length > 1) {
          vm.bank = item.payload;
          vm.depositForm.payload = '';
        } else {
          vm.bank = [];
          vm.depositForm.payload = item.payload[0].value;
        }
      }
    },
    gotoDeposit() {
      this.$store.dispatch('dialog/closeCommandDialog');
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_Transaction', type: 'deposit' } });
    },
    clickGotoTransactionlog() {
      this.$store.dispatch('dialog/closeCommandDialog');
      this.$router.push({ path: '/my/transactionlog', query: { currentType: 1, status: 2 } }).catch((err) => {});
    },
    gotoTransactionlog() {
      // this.$store.dispatch('dialog/closeCommandDialog');
      this.$router.push({ path: '/my/transactionlog', query: { currentType: 1, status: 2 } }).catch((err) => {});
    },
    submitForm() {
      // 发送表单
      const formNewWindow = window.open('', new Date());
      const vm = this;
      this.$store.dispatch('wallet/submitPaymentDepositList', vm.depositForm)
        .then((res) => {
          // 步骤2
          vm.depositStep = 2;
          vm.returnType = res.data.data.type;
          if (res.data.data.type === 'redirect') {
            // 成功后导向外部连结 formNewWindow不能 close
            formNewWindow.location = res.data.data.content;
            vm.$store.dispatch('dialog/closeCommandDialog');
            vm.$router.push({ path: '/my/transactionlog', query: { currentType: 1, status: 2 } }).catch((err) => {});
          } else if (res.data.data.type === 'form') {
            // 返回表单时
            vm.returnContent = decodeURIComponent(res.data.data.content).replace(/\\\\/g, ' ');
            setTimeout(() => {
              document.forms.postSubmit.submit();
              vm.$store.dispatch('dialog/closeCommandDialog');
            }, 500);
            formNewWindow.close();
          } else if (res.data.data.type === 'bankcard') {
            // 返回表单时
            vm.returnContent = res.data.data;
            formNewWindow.close();
          } else if (res.data.data.type === 'qrcode') {
            // 返回表单时
            vm.qrcodeReturn.returnContent = res.data.data.content;
            vm.qrcodeReturn.order_id = res.data.data.order_id;
            vm.qrcodeReturn.payment_name = res.data.data.payment_name;
            vm.qrcodeReturn.timeout = 300;
            // 開始倒數
            vm.countingTimeout();
            formNewWindow.close();
          } else {
            vm.returnContent = res.data.data.content;
            formNewWindow.close();
          }
          const payload = {};
          payload.type = 1;
          payload.status = '';
          payload.page = 1;
          payload.per_page = 10;
          payload.start_time = '';
          payload.end_time = '';
          vm.$store.dispatch('wallet/getTransactionLog', payload);
          vm.$store.commit('wallet/setTransactionLogCurrentType', '');
          // matomo 存款完成
          window._paq.push(['addEcommerceItem', `${vm.payment_name}-CN ¥${vm.depositForm.amount}`, vm.payment_name, '存款', vm.depositForm.amount, 1]);
          window._paq.push(['trackEcommerceOrder', res.data.data.order_id, vm.depositForm.amount]);
          window._paq.push(['trackPageView']);
          // 成功後轉跳資金紀錄
          this.gotoTransactionlog();
        })
        .catch((err) => {
          formNewWindow.close();
        });
    },
    // 复制到剪贴簿
    copyText(id) {
      const text = document.getElementById(id).innerText;
      this.$copyText(text).then((e) => {
        this.$message({ message: '复制成功', type: 'success' });
      }).catch((err) => {
        this.$message({ message: '复制失败', type: 'error' });
      });
    },
    promotionApply(key, item, subKey, id) {
      const payload = {
        promotion_id: id,
        check_apply: 1,
      };
      this.$matomo_deposit_promoton(key, subKey);
      this.$store.dispatch('promotion/promotionApply', payload)
        .then((res) => {
          this.$delete(this.promotionData[key], subKey);
          if (Object.keys(this.promotionData[key]).length <= 0) {
            this.$delete(this.promotionData, key);
          }
          this.$message({ message: '您已选择参加优惠活动，可至我的优惠查看。', type: 'success' });
        });
    },
  },
  beforeDestroy() {
    clearTimeout(this.countingTimer);
  },
  mounted() {
    const vm = this;
    axios.get('/api/ForPayment').then((res) => {
      vm.promotionData = res.data.data;
    });
    this.$store.dispatch('wallet/getPaymentDepositList')
      .then((res) => {
        this.initForm = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.active{
  color: white !important;
  background-color: $DW_Color !important;
}
.qrcodeWrap{
  margin: auto auto;
  width: 204px;
  height: 204px;
  border-radius: 10px;
  box-shadow: 0 0 12px 0 $balckAlpha_10;
  background-color: $DW_sky_1;
  border: 10px solid $DW_sky_1;
  img{
    width: 100%;
    height: 100%;
  }
}
.alertHighLight{
  color: $DW_sky_1;
}
.returnContentImg{
  width: 212px;
}
.dec{
  p{
    font-size: 14px;
    margin: 6px;
  }
}
.returnContentInfo{
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 12px 0 $balckAlpha_10;
  .returnContentTitle{
    padding: 0 14px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: white;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 12px 0 $balckAlpha_10;
    background-image: linear-gradient(83deg, $DW_Color, $DW_ColorLight);
  }
  .returnContentSubContent{
    padding: 6px;
    height: 124px;
    p{
      margin: 6px 10px;
      .title{
        color: $garyBlue_Dark;
      }
    }
  }
}
.deposit_feeTip{
  font-size: 12px;
  color: $garyBlue_Dark;
}
</style>
