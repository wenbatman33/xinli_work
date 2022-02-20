<template lang="pug">
  #playModal
    .d-block.title.text-center.py-2.mt-4.position-relative
      span(v-if="!confirmed") 交易信息
      span(v-else) 交易确认
      span.position-absolute(style="right: 24px;") {{ countDownTime }} 秒后关闭
    .d-flex.flex-column.justify-content-center.align-items-center.py-3.font-14
      .mb-2 {{ moment(card.esdt * 1000).format('MM/DD HH:mm') }} {{ card.cn }}
      span {{ card.ht }}
      span VS
      span {{ card.ot }}
    .d-flex.justify-content-between.title.py-2.px-4.font-14
      .font-14 您正在
        span.px-1(style="color: #f76b1c") 反对
        span 这场赛事结果为
        span.px-1(style="color: #ffe41c") {{ filterName(data.ty, tyList) }} {{ data.name }}
      span 手续费 5%
    .d-flex.py-2.bg-dark.font-12
      .col-4.text-center
        span 金额
      .col-4.text-center
        span 获利%
      .col-4.text-center
        span 预估获利(已扣除手续费)
    div(v-if="!confirmed")
      .d-flex.align-items-center.py-3.font-12.border-bottom
        .col-4.text-center
          input.form-input.font-12.py-1.pl-2.w-100(
            type="text"
            v-model="money"
            placeholder="请输入金额 最低100元"
            @keyup="onlyInteger"
          )
        .col-4.text-center
          span {{ (data.profit * 100).toFixed(2) }}%
        .col-4.text-center
          span ¥{{ (money * data.profit * order_fee).toFixed(2) }}
      .d-flex.flex-column.px-4.mt-3
        .d-flex.justify-content-between.flex-wrap.font-14
          button.money-button.py-2.mb-2(
            style="flex: 1"
            v-for="(item, index) in moneyList"
            :key="item"
            :class="{'mr-1': index !== 'Three'}"
            @click="addMoney(item)"
          ) ¥ {{ item | toMoney2 }}
        .d-flex.justify-content-between.mb-3.font-14
          button.money-button.py-2.mr-1(
            style="flex: 2"
            @click="setMoney(realMoney)") 全部金额
          button.money-button.py-2(
            style="flex: 1"
            @click="quickMoney") 快捷金额设定
        .d-flex.justify-content-center.mb-4
          button.py-2.mr-2.w-25.reg-button(
            @click.prevent="toBeConfirm"
            :disabled="!buttonValidate"
          ) 下一步
          button.py-2.w-25.cancel-button(@click.prevent="closeModal") 取消交易
    div(v-else)
      .d-flex.align-items-center.py-3.font-12.border-bottom
        .col-4.text-center
          .font-12.py-1.pl-2.w-100 {{ money | toMoney }}
        .col-4.text-center
          span {{ (new_profit * 100).toFixed(2) }}%
        .col-4.text-center
          span ¥{{ (money * new_profit * order_fee).toFixed(2) }}
      .d-flex.justify-content-center.px-4.my-4
        span 请确认是否接受最新赔率
      .d-flex.justify-content-center.mb-4
        button.py-2.mr-2.w-25.reg-button(@click.prevent="submit") 确认交易
        button.py-2.w-25.cancel-button(@click.prevent="closeModal") 取消交易
</template>

<script>
import moment from 'moment';

const tyList = [
  {
    name: '上半场波胆',
    value: 1,
  },
  {
    name: '波胆',
    value: 2,
  },
  {
    name: '总得分',
    value: 3,
  },
];

export default {
  name: 'playModal',
  props: ['data', 'card', 'moneyList'],
  data() {
    return {
      tyList,
      confirmed: false,
      money: '',
      form: {
        eid: this.data.eid,
        order_type: 0,
        order_info: [],
      },
      order_fee: 0.95,
      new_profit: 0,
      countDownTimer: null,
      initCountDownTime: 180,
      countDownTime: 180,
    };
  },
  computed: {
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    realMoney() {
      return Number((this.$store.state.admin.memberInfo.money).toFixed(2));
    },
    buttonValidate() {
      return this.money >= 100;
    },
  },
  methods: {
    onlyInteger() {
      this.money = Number(this.money.replace(/[^\d]/g, ''));
    },
    moment,
    filterName(type, typeList) {
      if (typeList.filter((item) => item.value === type)[0] === undefined) return '';
      return typeList.filter((item) => item.value === type)[0].name;
    },
    quickMoney() {
      this.$store.dispatch('admin/setQuickMoneyModal', true);
    },
    addMoney(item) {
      const result = Number(this.money) + item;
      if (this.checkMoney(result)) {
        this.money = result;
      }
    },
    setMoney(item) {
      this.money = Math.floor(item);
    },
    closeModal() {
      this.$store.dispatch('admin/setPlayModal', false);
    },
    checkMoney(money = this.money) {
      if (money !== Math.floor(money)) {
        this.$message.error('请输入整数');
        return false;
      }
      if (money > this.memberInfo.money) {
        this.$message.error('钱包余额不足');
        return false;
      }
      if (money > this.data.amount) {
        this.$message.error(`超过可交易量 ${this.data.amount}`);
        return false;
      }
      if (money > this.memberInfo.quota) {
        this.$message.error(`超过个人单笔交易限额 ${this.memberInfo.quota}`);
        return false;
      }
      return true;
    },
    toBeConfirm() {
      if (!this.checkMoney()) return;
      this.$store.dispatch('admin/getRealTimeOdd', {
        eid: this.card.eid,
        wid: this.data.wid,
      }).then((res) => {
        this.new_profit = res.data.data.frate;
        this.confirmed = !this.confirmed;
      });
    },
    submit() {
      if (!this.checkMoney()) return;
      const temp = Object.assign(this.data, {});
      temp.money = this.money;
      this.form.order_info = temp;
      this.$store.dispatch('admin/orderCreate', this.form).then(() => {
        this.$message.success('下单成功');
        this.money = '';
        this.$emit('getWaveData', this.data.eid);
        this.$store.dispatch('admin/setPlayModal', false);
        this.$store.dispatch('admin/getMemberInfo');
      }).catch(() => {
        this.$store.dispatch('admin/setPlayModal', false);
      });
    },
  },
  created() {
    this.countDownTimer = setInterval(() => {
      this.countDownTime -= 1;
      if (this.countDownTime === 0) {
        this.$store.dispatch('admin/setQuickMoneyModal', false);
        this.$store.dispatch('admin/setPlayModal', false);
        this.$message.error('交易逾時');
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.countDownTimer);
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: linear-gradient(to right, rgba(0, 237, 221, 0), #00afaf, rgba(0, 237, 221, 0))
}

.form-input {
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid #8e8e93;
  border-radius: 4px;
  color: white;

  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }

  &::placeholder {
    color: #8e8e93;
  }
}

.money-button {
  color: #f76b1c;
  border: 1px solid #f76b1c;
  background-color: rgba(247, 107, 28, 0.2);
  border-radius: 8px;
  white-space: nowrap;
}

.reg-button {
  background-color: #00ffeb;
  color: black;
  border: none;
  border-radius: 8px;

  &:disabled {
    background-color: gray;
  }
}

.cancel-button {
  border: 1px solid #00ffeb;
  color: #00ffeb;
  background: transparent;
  border-radius: 8px;
}
</style>
