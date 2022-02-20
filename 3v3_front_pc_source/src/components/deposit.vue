<template lang="pug">
  .deposit.overflow-auto
    .rule.py-4.px-5.
      ＊每次进行存款前，请先登入查看网页所指定的专属银行帐号进行存款，”请勿”自行转到旧有的银行帐号;  如入款至已过期帐号，本公司将无法查收，恕不负责，谢谢！＊<br>
      ＊请务必使用同行存款，若使用跨行请务必”加急处理”，方便系统加快您到帐速度与时间 ＊<br>
      ＊充值”5000”或以上之更大的金额,建议使用网银存款，或联系客服 ＊
    .d-flex.justify-content-around.mt-5
      .title.col-2.d-flex.align-items-center 选择支付方式
      .d-flex.flex-column.flex-wrap.col-10.overflow-auto(style="height: 200px")
        .d-flex.flex-column.align-items-center.mr-3(v-for="item in paymentList" :key="item.id")
          .payment-button(
            :class="{ active: payForm.type === item.id }"
            @click="payForm.type = item.id; active = item"
          )
            .d-flex.flex-column.align-items-center
              img.mb-2(:src="item.icon" height="64px")
              span {{ item.channel }}
          .status.mt-3.py-1 {{ filterName(item.living, livingList) }}
    .d-flex.justify-content-around.mt-5
      .title.col-2.d-flex.align-items-center 存款金额
      .text-left.position-relative.col-10
        input.px-2.py-1.account-input.w-50(v-model.number="payForm.amount" placeholder="请输入金额")
        .input-limit.mt-2 {{ active.channel }} 单笔交易限额 {{ active.minimum }} ~ {{ active.maximum }}元
    .d-flex.justify-content-center.mt-5.pt-3
      .text-center
        button.next-button.py-2.mb-4.w-50(@click="submit" :disabled="!amountValidate") 下一步
        .remind 如利用本平台进行任何洗钱、诈骗等行为，本公司将保留权力，终止会员服务及冻结其帐户。
</template>

<script>
const livingList = [
  {
    name: '流畅',
    value: 0,
  },
  {
    name: '不流畅',
    value: 1,
  },
];
export default {
  data() {
    return {
      livingList,
      payment: 0,
      paymentList: [],
      payForm: {
        amount: 0,
        type: '',
      },
      active: {},
    };
  },
  computed: {
    amountValidate() {
      const { amount } = this.payForm;
      if (this.active.minimum <= amount && amount <= this.active.maximum) {
        return true;
      }
      return false;
    },
  },
  methods: {
    filterName(value, list) {
      return list.filter((item) => item.value === value)[0].name;
    },
    submit() {
      this.$store.dispatch('admin/memberRecharge', this.payForm).then((res) => {
        if (res.data.data.thrid_param && res.data.data.thrid_param.pay_gateway) {
          window.open(
            res.data.data.thrid_param.pay_gateway,
            res.data.data.thrid_param.pay_orderid,
          );
        }
      });
    },
    getData() {
      this.$store.dispatch('admin/publicPay').then((res) => {
        this.paymentList = res.data.data.list;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
  .rule {
    background-color: rgba(247, 107, 28, 0.08);
    border: 1px solid #f76b1c;
    border-radius: 4px;
    font-size: 12px;
    color: #f76b1c;
    line-height: 22px;
  }

  .title {
    color: #202020;
    font-weight: bold;
  }

  .payment-button {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c6c6c9;
    border-radius: 8px;

    &.active {
      border: 1px solid #f76b1c;
      color: #f76b1c;
    }
  }

  .status {
    width: 80px;
    background-color: #6bb432;
    box-shadow: 0 0 8px 0 rgba(107, 180, 50, 0.5);
    color: white;
    border-radius: 14px;
    font-size: 12px;
  }

  .account-input {
    border-radius: 8px;
    border: 1px solid #c6c6c9;

    &::placeholder {
      font-size: 12px;
      color: #c6c6c9;
    }
  }

  .input-limit {
    color: #f76b1c;
    font-size: 12px;
    position: absolute;
  }

  .next-button {
    border: none;
    border-radius: 8px;
    background-color: #f76b1c;
    color: white;
    font-size: 14px;

    &:disabled {
      background-color: gray;
    }
  }

  .remind {
    color: #8e8e93;
    font-size: 12px;
  }
</style>
