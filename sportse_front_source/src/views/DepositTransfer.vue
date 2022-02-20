<template lang='pug'>
.pageContent.d-flex.flex-column
  WalletInfo
  .myFunc.flex-grow-1(v-if='paymentData')
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.no-gutters.py-sm-3
        .col-12.p-2.mt-2
          h5.T_Color_2 網銀轉帳
          .my-3
            .countDown.w-100.text-center
              span 請於 
              span.countDownNumber {{bonusCountDown}} 
              span 分內完成支付
          .my-3
            .funcBtn.w-100.text-left(@click='copyText(paymentData.paymentAmount)')
              span.title 存款金额
              span.value {{paymentData.paymentAmount}}
              i.fas.fa-copy.funcBtnIcon
            small 存入其他金額時，將影響存款到帳時間。 
          hr
          .my-3
            .funcBtn.w-100.text-left(@click='copyText(paymentData.paymentBankName)')
              span.title 收款銀行
              span.value {{paymentData.paymentBankName}}
              i.fas.fa-copy.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='copyText(paymentData.paymentBankBranch)')
              span.title 收款分行
              span.value {{paymentData.paymentBankBranch}}
              i.fas.fa-copy.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='copyText(paymentData.paymentBankNo)')
              span.title 收款卡號
              span.value {{paymentData.paymentBankNo}}
              i.fas.fa-copy.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='copyText(paymentData.paymentBankHolder)')
              span.title 收款人姓名
              span.value {{paymentData.paymentBankHolder}}
              i.fas.fa-copy.funcBtnIcon
            small 轉帳時請務必填寫正確附言，存款才能快速到帳。存款未到帳時，請聯繫線上客服。以上收款資訊，僅供本次存款使用，有效時間過後，請重新填寫存款單。
</template>

<script>
import WalletInfo from '@/components/My/WalletInfo.vue';
import { mapState } from 'vuex';

export default {
  components: {
    WalletInfo,
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
    ...mapState('setting', [
      'WindowWidth',
      'WindowHeight',
      'DeviceIsPc',
    ]),
  },
  data() {
    return {
      bonusCountDown: null,
      paymentData: null,
    };
  },
  watch: {
    PersonalDetail: {
      handler(val) {
        this.init();
      },
      deep: true,
    },
  },
  methods: {
    init() {
      console.log(this.PersonalDetail.memberAccount);
      if (window.localStorage[`DepositPaddingData_${this.PersonalDetail.memberAccount}`]) {
        const { 
          paymentAmount,
          paymentBankBranch,
          paymentBankHolder,
          paymentBankName,
          paymentBankNo,
          paymentDepositEndAt,
        } = JSON.parse(window.localStorage.getItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`));
        this.paymentData = JSON.parse(window.localStorage.getItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`));
        const time = this.$dayjs(paymentDepositEndAt).format('YYYY-MM-DD HH:mm:ss');
        this.countDownTime(time);
      } else {
        this.$router.push('/deposit');
      }
    },
    countDownTime(time) {
      const vm = this; 
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距
      const timeGap = this.$dayjs(time).diff(this.$dayjs(currentTime));
      // 换算毫秒后格式化时间
      let hours = parseInt((timeGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 10);
      hours = (hours < 10) ? `0${hours}` : hours;
      let minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60), 10);
      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      let seconds = (timeGap % (1000 * 60)) / 1000;
      seconds = (seconds < 10) ? `0${seconds}` : seconds;
      
      this.bonusCountDown = `${minutes}:${seconds}`;
      if (timeGap <= 0) {
        this.countDownFinish();
      } else {
        this.countDownTimer = setTimeout(() => {
          vm.countDownTime(time);
        }, 1000);
      }
    },
    countDownFinish() {
      // 超過十分鐘  清除暫存資料
      clearTimeout(this.countDownTimer);
      this.$router.push('/deposit');
      window.localStorage.removeItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`);
    },
    copyText(str) {
      this.$copyText(str);
    },
  },
  mounted() {
    if (this.PersonalDetail) {
      this.init();
    }
  },
};
</script>
<style lang='scss' scoped>
.myFunc{
  background: $gray_f5;
}
.CardStyle{
  position: relative;
  top: -20px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
}
.funcBtn{
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  border-radius: 4px;
  border: solid 1px #b3b3b3;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  i.funcBtnIcon{
    position: absolute;
    top: 16px;
    right: 20px;
  }
  .value{
    margin-right: 24px;
    color: $gray_c7;
  }
}
.countDown{
  width: 100%;
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
  border: solid 1px #0277bd;
  background-color: rgba(25, 71, 185, 0.21);
  color: #0277bd;
  .countDownNumber{
    font-size: 20px;
    color: black;
  }
}
</style>
