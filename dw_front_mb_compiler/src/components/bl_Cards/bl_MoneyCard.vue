<template lang="pug">
  //- 更改這裡的話也要同時更改forApp component
  .money
    .money__header
      .money__header__background
      .money__header__tag.col(
        :class="{'active1': ActiveTagName === 'deposit'}" @click="changeToDeposit"
      ) 存款
      .money__header__tag.col(
        :class="{'active2': ActiveTagName === 'withdraw'}" @click="changeToWithdraw"
      ) 提款

    //- 存款
    .deposit__main(v-if="ActiveTagName === 'deposit'")
      div(v-if="depositStep === 1")
        //- a.deposit__main__video(href="#")
        //-   i.fas.fa-question-circle
        //-   span 不知道怎么存款？查看存款教程
        //- el-divider
        el-alert.mb-3(v-if="activeDepositChannel > -1" type="info" :closable="false")
          slot
            .d-flex
              .d-flex.align-items-center.mr-2
                i.el-alert__icon.el-icon-info
              span 提示 ：单笔限额 {{ activeWebLine.lower_limit }} 元 ~ {{ activeWebLine.up_limit }} 元
        .deposit__main__title
          p 存款金额
          p 余额：¥{{ format(((IndexWallet.cash * 100) / 100).toFixed(2)) }}
        el-input.deposit__main__moneyInput(
          type="tel" placeholder="请输入存款金额",
          @keyup.native="depositFormIntegerNumber",
          v-model="depositForm.amount",
          @input="activeDefaultBtn = -1"
        )
        .deposit__main__default
          button(
            v-for="(item, index) in indexDefaultBtn",
            @click="depositBtn(item, index)",
            :class="{'activeBtn': activeDefaultBtn === index}"
          )
            span ¥
            span {{ item }}
        .deposit__remind(v-show="activeDepositChannel !== -1") 存款手续费为：{{ format(((computed_deposit_fee * 100) / 100).toFixed(2)) }} 元，实际上分金额：{{ format((((depositForm.amount - computed_deposit_fee) * 100) / 100).toFixed(2)) }} 元
        .deposit__main__title(v-if="depositForm.amount !== ''")
          p 支付通道
        .deposit__main__channel(v-if="!DarkMode")
          button.deposit__main__channel--button(
            v-for="(item, index) in indexDepositChannel",
            @click="depositChannel(item, index)",
            :class="{'activeBtn': activeDepositChannel === index}"
          )
            i.fab.fa-alipay.color__gray(
              v-if="item.service_id === 1",
              :class="{'color__theme': activeDepositChannel === index}"
            )
            i.fas.fa-qrcode.color__gray(
              v-else-if="item.service_id === 2",
              :class="{'color__theme': activeDepositChannel === index}"
            )
            i.far.fa-credit-card.color__gray(
              v-else-if="item.service_id === 3",
              :class="{'color__theme': activeDepositChannel === index}"
            )
            i.fab.fa-weixin.color__gray(
              v-else-if="item.service_id === 4",
              :class="{'color__theme': activeDepositChannel === index}"
            )
            p {{ item.service_name }}
        .deposit__main__channel(v-else)
          button.deposit__main__channel--button(
            v-for="(item, index) in indexDepositChannel",
            @click="depositChannel(item, index)",
            :class="{'activeBtn': activeDepositChannel === index}"
          )
            i.fab.fa-alipay.color__origin(
              v-if="item.service_id === 1",
              :class="{'text-light': activeDepositChannel === index}"
            )
            i.fas.fa-qrcode.color__origin(
              v-else-if="item.service_id === 2",
              :class="{'text-light': activeDepositChannel === index}"
            )
            i.far.fa-credit-card.color__origin(
              v-else-if="item.service_id === 3",
              :class="{'text-light': activeDepositChannel === index}"
            )
            i.fab.fa-weixin.color__origin(
              v-else-if="item.service_id === 4",
              :class="{'text-light': activeDepositChannel === index}"
            )
            p {{ item.service_name }}
        .deposit__main__title(v-if="activeDepositChannel !== -1")
          p 線路選擇
        .deposit__main__channel(v-if="activeDepositChannel !== -1")
          button.deposit__main__channel--button(
            v-for="(webline, index) in webLineGroup",
            :class="{'activeBtn': depositWebLine === index}"
            @click="selectWebline(webline, index)"
          )
            p {{ `線路${ index + 1 }` }}
        .deposit__main__title(v-show="displayDepositBank")
          p 支付银行
        el-select(v-show="displayDepositBank" v-model="depositForm.payload" placeholder="请选择")
          el-option(v-for="item in indexDepositOptions"
                    :key="item.value"
                    :label="item.bank_name"
                    :value="item.value")
      //-首存優惠
      .deposit__main__promoton(v-if='Object.keys(promotionData).length>0')
        p.mb-2 参加首存优惠(单选):
        .row(v-if='showPromotion')
          .col-6(v-if='showPromotion===true', v-for='(item, key) in promotionData')
            el-button.w-100.my-1(:type='(promotionPayload.promotion_id == String(Object.values(item)))?"primary":""', @click='promotionSelect(String(Object.values(item)))') {{String(Object.keys(item))}}
        .row.promotionCompute.m-1.my-2.py-3(v-if='promotionCompute')
          .col-4.text-center
            p.promotionComputeTitle 申请金额
            p.promotionComputeNumber  {{depositForm.amount}} 
          .col-4.text-center
            p.promotionComputeTitle 可得红利
            p.promotionComputeNumber  {{promotionCompute.bonus}} 
          .col-4.text-center
            p.promotionComputeTitle 所需流水
            p.promotionComputeNumber {{promotionCompute.withdrawLimit }}     
      //- 存款後續
      .deposit__main__step2(v-else-if="depositStep === 2 && returnType === 'qrcode'")
        h5.text-center 存款进行中
        p.text-center.m-0(:class='{"text-white":DarkMode}')
          span 存款金额
          span.text-danger {{ depositForm.amount }}
          span 元，请在
          span.text-danger {{ formatSecond(timeout) }}
          span 分钟内完成
        p.text-center.mb-3 交易单号 {{ orderId }}
        .qrcode.mb-2
          img.w-75(:src="returnContent")
        p.text-center(:class='{"text-white":DarkMode}') 请使用 <span class="text-danger">{{ payment_name }}</span> 扫描二维码
      div(v-else-if="depositStep === 2 && returnType === 'form'" v-html="returnContent")
      .text-center(v-else-if="depositStep === 2 && returnType === 'bankcard'")
        h5 存款进行中
        p.deposit__main__step2--remind 已完成订单，请尽快通过「网银转帐」至下列帐户完成存款流程。
        .d-flex.flex-column.deposit__main__step2--detail.mb-2
          .deposit__main__step2--bankName.text-left.p-2.text-light {{ bankcardDeposit.bank_name}}
          .d-flex.flex-column.align-items-start.p-2
            .w-100.d-flex.justify-content-between.mb-1.color__gray
              .d-flex
                span 姓名 ：
                span#name {{ bankcardDeposit.bank_cardholder }}
              a(href="#" @click="copyText('name')") 复制
            .w-100.d-flex.justify-content-between.mb-1.color__gray
              .d-flex
                span 卡号 ：
                span#cardNo {{ bankcardDeposit.bank_card_no }}
              a(href="#" @click="copyText('cardNo')") 复制
            .w-100.d-flex.justify-content-between.mb-1.color__gray
              .d-flex
                span 金额 ：
                span#amount {{ bankcardDeposit.amount}}
              a(href="#" @click="copyText('amount')") 复制
            .w-100.d-flex.justify-content-between.color__gray
              .d-flex
                span 附言 ：
                span#code {{ bankcardDeposit.remark}}
              a(href="#" @click="copyText('code')") 复制
        p.text-danger.text-left 提醒您 ：请务必在《备注》填写「附言」，才能秒存秒到哦 ！
        el-divider
        ul.py-2.color__darkgray.text-left
          li 1、若填写的存款金额与实际存款金额不一致，将无法到账。
          li 2、若您无同行卡，请使用「跨行转账」并选择「加急」，方便系统及时到账。
          li 3、请使用本人真实姓名进行存款，若使用他人银行卡将无法到账。

    //- 提款
    .withdraw__main(v-else-if="ActiveTagName === 'withdraw'")
      //- a.withdraw__main__video(href="#")
      //-   i.fas.fa-question-circle
      //-   span 不知道怎么提款？查看提款教程
      //- el-divider
      el-alert.mb-3(type="info" :closable="false")
        slot
          .d-flex
            .d-flex.align-items-center
              i.el-alert__icon.el-icon-info.mr-2
              span 提示 ：单笔限额 {{ IndexWallet.singleMin }} 元 ~ {{ IndexWallet.singleMax }} 元，</br>今日尚可提款额度 {{ IndexWallet.dayMax }} 元
      .withdraw__main__title
        p 提款金额
        p 可提款金额：¥{{ format(Math.floor(((IndexWallet.cash * 100) / 100)).toFixed(2)) }}
      .withdraw__main__moneyInput
        el-input(type="tel" v-model.number="withdrawForm.amount", @keyup.native="withdrawFormIntegerNumber",  placeholder="请输入提款金额")
        el-button(type="info" plain @click="withdrawForm.amount = (IndexWallet.cash>IndexWallet.singleMax)? IndexWallet.singleMax : Math.floor(IndexWallet.cash)") 最高
      .withdraw__main__title
        p 开户名
      el-input.withdraw__main__nameInput(v-model="IndexPersonal.memberRealname" placeholder="请输入用戶名" disabled)
      .withdraw__main__title
        p 支付银行
        el-button(type="text" @click="addBankCard2") 添加银行卡
      el-select(v-model="withdrawForm.bank_card_id" placeholder="请选择")
        el-option(v-for="item in IndexBankCard"
                  v-if='item.memberStatus.value === 1'
                  :key="item.id"
                  :label="`${translateBankCode(item.memberBankCode)} - ${item.memberBankNo}`"
                  :value="item.id")
    button.deposit__button(v-if="ActiveTagName === 'deposit' && depositStep === 1" @click="deposit" :class="{'disabled': !depositFormValidate}" :disabled="!depositFormValidate") 立即存款
    //- button.deposit__button(v-else-if="ActiveTagName === 'deposit' && depositStep === 2" @click="finishedDeposit") 已完成存款
    button.deposit__button(v-else-if="ActiveTagName === 'deposit' && depositStep === 2" @click="promotionApply" :class="{'disabled': !depositFormValidate}" :disabled="promotionPayload.promotion_id===''") 我要参加
    button.withdraw__button(v-else @click="withdraw" :class="{'disabled': !withdrawFormValidate}" :disabled="!withdrawFormValidate") 立即提款
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeDefaultBtn: -1,
      indexDefaultBtn: [
        '100',
        '500',
        '1000',
        '1500',
        '2000',
        '2500',
        '3000',
        '5000',
      ],
      activeDepositChannel: -1,
      indexDepositChannel: [],
      depositWebLine: 0,
      webLineGroup: [],
      activeWebLine: {},
      displayDepositBank: false,
      indexDepositOptions: [],
      depositStep: 1,
      depositForm: {
        amount: '',
        payload: '',
      },
      depositFormValidate: false,
      withdrawForm: {
        amount: '',
        bank_card_id: '',
      },
      withdrawFormValidate: false,
      // 充值後
      returnContent: '',
      returnType: '',
      orderId: '',
      timeout: 0,
      payment_name: '',
      bankcardDeposit: {},
      countingTimer: '',
      // 首存優惠
      promotionData: '',
      promotionPayload: {
        promotion_id: '',
        check_apply: 1,
      },
      promotionCompute: '',
      showPromotion: true,
    };
  },
  methods: {
    withdrawFormIntegerNumber() {
      this.withdrawForm.amount = Number(this.withdrawForm.amount.toString().replace(/[^\.\d]/g, '').replace('.', ''));
    },
    depositFormIntegerNumber() {
      this.depositForm.amount = Number(this.depositForm.amount.toString().replace(/[^\.\d]/g, '').replace('.', ''));
    },
    changeToDeposit() {
      this.$store.commit('payment/setActiveTagName', 'deposit');
      this.$store.dispatch('index/setCardName', {
        card: 'bl_Transaction',
        type: 'deposit',
      });
    },
    changeToWithdraw() {
      this.$store.dispatch('payment/API_RecyclingAllWallet').then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('payment/API_MemberWallet');
        }
      });
      // 先檢查電話
      this.$store.dispatch('member/API_MemberDetail').then((res) => {
        if (res.data.data[0].phone === null) {
          this.$store.dispatch('index/setCardName', {
            card: 'bl_BindingPhoneForm',
          });
        } else {
          this.$store.commit('payment/setActiveTagName', 'withdraw');
          this.$store.dispatch('index/setCardName', {
            card: 'bl_Transaction',
            type: 'withdraw',
          });
        }
      });
    },
    depositBtn(item, index) {
      this.depositForm.amount = item;
      this.activeDefaultBtn = index;
    },
    depositChannel(item, index) {
      if (this.IndexProfile.memberRealName === 0 && item.service_id === 3) {
        this.$message({ message: '请先完善个人资料的真实姓名,如果真实姓名与存款人姓名不符,会有延迟到帐问题/选择其他存款方式。', type: 'error' });
        this.activeDepositChannel = '';
        this.payment_name = '';
      } else {
        this.activeDepositChannel = index;
        this.payment_name = item.service_name;
        this.depositWebLine = 0;
        this.webLineGroup = item.payment.filter(
          element => element.up_limit >= Number(this.depositForm.amount) && Number(this.depositForm.amount) >= element.lower_limit,
        );
        this.selectWebline(this.webLineGroup[0], 0);
      }
    },
    selectWebline(webline, index) {
      this.activeWebLine = webline;
      this.depositForm.payload = '';
      this.depositWebLine = index;
      if (webline.payload.length > 1) {
        this.displayDepositBank = true;
        this.indexDepositOptions = webline.payload;
      } else {
        this.displayDepositBank = false;
        this.indexDepositOptions = [];
        this.depositForm.payload = webline.payload[0].value;
      }
    },
    formatSecond(secs) {
      let hr = Math.floor(secs / 3600);
      let min = Math.floor((secs - (hr * 3600)) / 60);
      let sec = Number(secs - (hr * 3600) - (min * 60));
      if (Number(hr) >= 1 && Number(hr) < 10) {
        hr += ':';
      } if (Number(hr) <= 0) {
        hr = '';
      }
      if (Number(min) >= 1 && Number(min) < 10) {
        min = `0${min}`;
      } else if (Number(min) === 0) {
        min = '00';
      }
      if (Number(sec) < 10) { sec = `0${sec}`; }
      return `${hr + min}:${sec}`;
    },
    countingTimeout() {
      const vm = this;
      vm.timeout -= 1;
      if (vm.timeout > 0) {
        vm.countingTimer = setTimeout(() => {
          vm.countingTimeout();
        }, 1000);
      } else {
        clearTimeout(this.countingTimer);
        vm.$store.dispatch('index/setCardOpen', false);
      }
    },
    deposit() {
      const vm = this;
      const formNewWindow = window.open('', new Date());
      this.$store.dispatch('payment/API_Deposit', this.depositForm).then((res) => {
        // 取首存優惠
        this.depositStep = 2;
        this.getFirstPromotion();
        // 取首存優惠
        this.returnContent = res.data.data.content;
        this.returnType = res.data.data.type;
        this.orderId = res.data.data.order_id;
        // matomo
        window._paq.push(['addEcommerceItem', `${this.payment_name}-CN ¥${this.depositForm.amount}`, this.payment_name, '存款', this.depositForm.amount, 1]);
        window._paq.push(['trackEcommerceOrder', res.data.data.order_id, this.depositForm.amount]);
        window._paq.push(['trackPageView']);

        if (res.data.data.type === 'redirect') {
          formNewWindow.location = res.data.data.content;
          // this.$store.dispatch('index/setCardOpen', false);
          // 成功後導向資金紀錄
          this.$router.push({ name: 'transactionlog', query: { type: 1 } }).catch((err) => {});
        } else if (res.data.data.type === 'form') {
          formNewWindow.close();
          this.returnContent = decodeURIComponent(res.data.data.content).replace(/\\\\/g, ' ');
          setTimeout(() => {
            document.forms.postSubmit.submit();
            // this.$store.dispatch('index/setCardOpen', false);
            // 成功後導向資金紀錄
            this.$router.push({ name: 'transactionlog', query: { type: 1 } }).catch((err) => {});
          }, 500);
        } else if (res.data.data.type === 'qrcode') {
          formNewWindow.close();
          vm.timeout = 300;
          vm.countingTimeout();
          console.log('this is qrcode type');
        } else if (res.data.data.type === 'bankcard') {
          formNewWindow.close();
          this.bankcardDeposit = res.data.data.bankcard_info;
        }
      }).catch((err) => {
        formNewWindow.close();
        this.$message({ message: err.response.data.message, type: 'error' });
      });
    },
    withdraw() {
      this.$store.dispatch('payment/API_Withdraw', this.withdrawForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$message({ message: '成功提款', type: 'success' });
          this.$store.dispatch('payment/API_MemberWallet');
          // 成功後關掉卡片並導向資金紀錄
          this.$store.dispatch('index/setCardOpen', false);
          this.$router.push({ name: 'transactionlog', query: { type: 2 } }).catch((err) => {});
        }
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error' });
      });
    },
    finishedDeposit() {
      this.depositStep = 1;
      this.returnType = '';
      this.$store.dispatch('index/setCardOpen', false);
      this.$store.dispatch('index/setCardName', {});
      this.$router.push({ name: 'transactionlog', query: { type: 1 } }).catch((err) => {});
    },
    addBankCard2() {
      this.$store.dispatch('index/setCardName', {
        card: 'bl_AddBankCard2',
      });
    },
    translateBankCode(bankCode) {
      if (this.IndexBankList.length === 0) return bankCode;
      const result = this.IndexBankList.filter(item => item.bankCode === bankCode);
      return result[0].bankName;
    },
    // 複製到剪貼簿
    copyText(id) {
      const text = document.getElementById(id).innerText;
      this.$copyText(text).then((e) => {
        this.$message({ message: '复制成功', type: 'success' });
      }).catch((err) => {
        this.$message({ message: '复制失敗', type: 'error' });
      });
    },
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return value;
    },
    getFirstPromotion() {
      // 首存優惠項目
      const vm = this;
      const api = `${window.APIHOST}/api/ForPayment`;
      axios.get(api).then((res) => {
        const promotionRes = res.data.data;
        const promotionRes2array = [];
        for (const data in promotionRes) {
          for (const subData in promotionRes[data]) {
            const item = {
              [data + subData]: promotionRes[data][subData],
            };
            promotionRes2array.push(item);
          }
        }
        vm.promotionData = promotionRes2array;
      });
    },
    promotionSelect(id) {
      console.log(id)
      const payload = {
        promotion_id: id,
        check_apply: 1,
      };
      this.promotionPayload = payload;
      this.getForPaymentCompute();
    },
    //  計算優惠金額
    getForPaymentCompute() {
      const vm = this;
      vm.promotionCompute = '';
      const api = `${window.APIHOST}/api/ForPaymentCompute?promotion_id=${vm.promotionPayload.promotion_id}&amount=${vm.depositForm.amount}`;
      axios.get(api).then((res) => {
        vm.promotionCompute = res.data.data;
      });
    },
    promotionApply() {
      this.$store.dispatch('promotion/API_ApplyPromotion', this.promotionPayload)
        .then((res) => {
          this.$store.dispatch('index/setCardOpen', false);
          this.$message({ message: '您已选择参加优惠活动，可至我的优惠查看。', type: 'success' });
        });
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('payment', [
      'IndexPayment',
      'ActiveTagName',
      'IndexWallet',
    ]),
    ...mapState('member', [
      'IndexPersonal',
      'IndexBankCard',
      'IndexBankList',
      'IndexProfile',
    ]),
    computed_deposit_fee() {
      return this.depositForm.amount * this.activeWebLine.deposit_fee;
    },
  },
  watch: {
    'depositForm.amount': {
      handler(val) {
        this.depositForm.payload = '';
        this.indexDepositChannel = [];
        this.activeDepositChannel = -1;
        this.depositWebLine = 0;
        this.webLineGroup = [];
        this.displayDepositBank = false;
        const temparr = [];
        this.IndexPayment.forEach((element) => {
          const result = element.payment.some(
            item => item.up_limit >= val && val >= item.lower_limit,
          );
          if (result) {
            temparr.push(element);
          }
        });
        this.indexDepositChannel = temparr;
      },
      deep: true,
      immediate: true,
    },
    depositForm: {
      handler(val) {
        if (this.depositForm.amount === '' || this.depositForm.payload === '') {
          this.depositFormValidate = false;
        } else {
          this.depositFormValidate = true;
        }
      },
      deep: true,
    },
    withdrawForm: {
      handler(val) {
        if (this.withdrawForm.amount === '' || this.withdrawForm.bank_card_id === '') {
          this.withdrawFormValidate = false;
        } else {
          this.withdrawFormValidate = true;
        }
      },
      deep: true,
    },
    IndexBankCard: {
      handler(val) {
        const result = val.filter(item => item.memberStatus.value === 1 && item.memberDefaultCard.value === 1);
        if (result.length > 0) {
          this.withdrawForm.bank_card_id = result[0].id;
        }
      },
    },
  },
  created() {
    // 檢查電話
    if (this.$route.query.card === 'bl_Transaction' && this.$route.query.type === 'withdraw') {
      this.$store.dispatch('member/API_MemberDetail').then((res) => {
        if (res.data.data[0].phone === null) {
          this.$store.dispatch('index/setCardName', {
            card: 'bl_BindingPhoneForm',
          });
        }
      });
    }
    
    this.$store.dispatch('member/API_MemberPersonal');
    this.$store.dispatch('payment/API_IndexPayment');
    this.$store.dispatch('payment/API_MemberWallet');
    this.$store.dispatch('member/API_MemberBankCard').then((res) => {
    }).catch((err) => {
    });
    this.$store.dispatch('member/API_MemberBankList');
    this.$store.commit('payment/setActiveTagName', this.$route.query.type);
    this.returnType = '';
  },
};
</script>

<style lang="scss" scoped>
.money {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;

    &__background {
      background-color: $origin_dark;
      position: absolute;
      top: 0;
      height: $height-72;
      width: 100%;
      box-shadow: inset 0px -30px 30px rgba(59, 70, 92, 0.37);
    }

    &__tag {
      height: $height-72;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .active1 {
      color: $navy_dark;
      background-color: white;
      border-top-right-radius: 30px;
    }

    .active2 {
      color: $navy_dark;
      background-color: white;
      border-top-left-radius: 30px;
    }
  }
}

.deposit {

  &__main {
    padding: $height-32 $width-24 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 100vw;
    flex: 1;

    &__step2 {
      &--remind {
        color: $navy_light;
      }

      &--detail {
        border: 1px solid $origin_light;
        border-radius: 5px;
      }

      &--bankName {
        background-color: $theme;
        border-radius: 5px 5px 0 0;
      }
    }

    &__video {
      display: block;
      color: $theme;

      i {
        margin-right: $width-8;
      }
    }

    &__title {
      display: flex;
      justify-content: space-between;
      margin-bottom: $height-16;

      p {
        margin: 0;
      }
    }
    &__promoton {
      margin-bottom: $height-16;
      p {
        margin: 0;
      }
      button {
        width: 74px;
        height: 40px;
        color: $origin_darkest;
        border: 1px solid $origin_light;
        border-radius: 4px;
        margin-bottom: $height-8;
        background-color: white;
      }
    }

    &__moneyInput {
      margin-bottom: $height-16;
      font-size: $text-16;
    }

    &__default {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: $height-8;

      button {
        width: 74px;
        height: 40px;
        color: $origin_darkest;
        border: 1px solid $origin_light;
        border-radius: 4px;
        margin-bottom: $height-8;
        background-color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }

    &__channel {
      height: 90px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-bottom: $height-16;
      overflow: auto;

      &--button {
        border: 1px solid $origin_light;
        padding: 10px 0;
        background-color: white;
        width: 80px;
        height: 80px;
        margin-right: 12px;
        border-radius: 4px;

        img {
          width: 30px;
        }

        i {
          font-size: 30px;
        }

        p {
          margin: 0;
          font-size: 12px;
        }
      }
    }

    .qrcode {
      text-align: center;

      img {
        border: 12px solid rgb(217, 59, 59);
        border-radius: 10px;
      }
    }

    &::-webkit-scrollbar {
      display:none;
    }
  }

  &__remind {
    font-size: $text-14;
    color: $theme;
    margin-bottom: $height-32;
  }

  &__button {
    display: block;
    text-align: center;
    padding: $height-20 0;
    background-color: $theme;
    color: white;
    width: 100%;
    border: none;
  }
}

.withdraw {

  &__main {
    padding: $height-32 $width-28 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 100vw;
    flex: 1;

    &__video {
      display: block;
      color: $theme;

      i {
        margin-right: $width-8;
      }
    }

    &__title {
      margin-bottom: $height-16;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0;
      }

      button {
        color: $theme;
        font-size: $text-14;
      }
    }

    &__moneyInput {
      display: flex;
      margin-bottom: $height-28;

      /deep/ input {
        width: 98%;
      }

      button {
        color: $theme;
        background-color: rgba(57, 109, 238, 0.35);
      }
    }

    &__nameInput {
      margin-bottom: $height-28;
    }

    &::-webkit-scrollbar {
      display:none;
    }
  }

  &__button {
    display: block;
    text-align: center;
    padding: $height-20 0;
    background-color: $theme;
    color: white;
    width: 100%;
    border: none;
  }
}

.disabled {
  background-color: $origin_dark;
}

/deep/ .el-divider {
  width: 110vw;
  position: relative;
  left: -10vw;
}

/deep/ .el-select {
  width: 100%;
  margin-bottom: 80px;
}

.activeBtn {
  color: $theme !important;
  border: 1px solid $theme !important;
}

.color__gray {
  color: $navy_light;
}

.color__origin {
  color: $origin;
}

.color__darkgray {
  color: $origin_dark;
}

.color__theme {
  color: $theme;
}

.border__gray {
  border: 1px solid $origin_light;
}
.promotionCompute{
  border-radius: 6px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  .promotionComputeTitle{
    font-size: 12px;
    color: $theme;
  }
  .promotionComputeNumber{
    font-size: 14px;
  }
}
</style>
