<template lang="pug">
  .d-flex
    .col-6.p-0
      .text-left.mb-4.font-weight-bold 请详细填写下列表单：
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-account"
          style="white-space: nowrap;"
        ) 用户帐号
        b-form-input#type-account.col-9(
          :value="memberInfo.username"
          type="text"
          placeholder="需与绑定的银行卡相同"
          disabled
        )
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-username"
          style="white-space: nowrap;"
        ) 真实姓名
        b-form-input#type-username.col-9(
          v-model="bankcardForm.real_name"
          type="text"
          placeholder="请输入姓名"
          :disabled="hasBankcard"
        )
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-bankaccount"
          style="white-space: nowrap;"
        ) 银行帐号
        .d-flex.align-items-center.col-9.px-0
          b-form-input#type-bankaccount.mr-2(
            v-model="bankcardForm.card_number"
            type="text"
            placeholder="请输入银行帐号"
            :disabled="hasBankcard"
          )
          button(
            @click.prevent="verifyBankcard"
            :disabled="hasBankcard"
          ) 验证银行卡
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-bankname"
          style="white-space: nowrap;"
        ) 银行名稱
        b-form-input#type-bankname.col-9(
          v-model="bankcardForm.bankname"
          type="text"
          placeholder="请输入银行名稱"
          disabled
        )
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-bank"
          style="white-space: nowrap;"
        ) 银行分行
        b-form-input#type-bank.col-9(
          v-model="bankcardForm.opening_bank"
          type="text"
          placeholder="请输入银行分行"
          :disabled="hasBankcard"
        )
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-wechat"
          style="white-space: nowrap;"
        ) 微信号
        b-form-input#type-wechat.col-9(
          v-model="bankcardForm.wechat"
          type="text"
          placeholder="微信号"
          :disabled="hasWechat"
        )
      .d-flex.align-items-center.mb-4
        label.col-2.pl-0.mb-0.text-left.font-weight-bold(
          for="type-amount"
          style="white-space: nowrap;"
        ) 提領金额
        b-form-input#type-amount.col-9(
          v-model="form.amount"
          type="text"
          placeholder="请填写整数，勿把小数点填入"
          @keyup="onlyInteger"
        )
      .d-block.text-center
        button.submit-button.py-2.w-50.mt-4(
          @click.prevent="submit"
          :disabled="!formValidate"
        ) 提交
    .col-6.p-o
      .text-left.mb-4.font-weight-bold 注意事项：
      .notice-block.p-4.text-left
        p.
          1、每次游戏币<span class="text-orange">提领最少兑换点数为 100 点以上。</span><br>

          2、<span class="text-orange">出款洗马量</span>
          要求：需达<span class="text-orange">每笔充值金额 3 倍。</span><br>

          3、每周可享”<span class="text-orange">提领 4 次免手续费</span>”，若您欲再提领，本公司将收取提领金额之 5% 做为行政处理费。<br>

          4、<span class="text-orange">首次</span>
          提款申请送出后，即<span class="text-orange">自动绑定该帐户</span>
          ，请务必将您的银行信息填写正确，若提供之帐号有误，导致损失，本公司恕不负责。<br>

          5、本平台仅提供娱乐性质使用，平台中的游戏币托售服务，为提供于其它虚拟宝物交易平台由其它平台会员认购，如有交易纠纷或违背会员所在当地法律，与本司无涉！<br>
        .text-orange.mt-3 备注：如利用本平台进行任何洗钱、诈骗等行为，本公司将保留权力，终止会员服务及冻结其帐户。
</template>

<script>
export default {
  data() {
    return {
      hasBankcard: false,
      hasWechat: false,
      bankcardForm: {
        real_name: '',
        bankname: '',
        opening_bank: '',
        card_number: '',
        wechat: '',
      },
      form: {
        amount: 0,
        card_id: 0,
      },
    };
  },
  computed: {
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    formValidate() {
      if (
        this.bankcardForm.real_name === ''
      || this.bankcardForm.bankname === ''
      || this.bankcardForm.opening_bank === ''
      || this.bankcardForm.card_number === ''
      || this.bankcardForm.wechat === ''
      || this.form.amount === 0) return false;
      return true;
    },
  },
  methods: {
    onlyInteger() {
      this.form.amount = this.form.amount.replace(/[^\d]/g, '');
    },
    verifyBankcard() {
      this.$store.dispatch('admin/memberGetCardinfo', {
        CardNumber: this.bankcardForm.card_number,
      }).then((res) => {
        this.bankcardForm.bankname = res.data.data.bank_name;
      });
    },
    bankcardSubmit() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('admin/memberBindcard', this.bankcardForm).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      });
    },
    withdraw() {
      this.$store.dispatch('admin/memberWallet', this.form).then(() => {
        this.$message.success('提款提交成功');
        // type = 2 提款
        this.$router.push({ name: 'transaction', query: { type: 2 } });
      });
    },
    async submit() {
      if (this.form.amount === '' || this.form.amount === 0) {
        this.$message.error('输入提现金额');
        return;
      }

      if (Number(this.form.amount) !== Math.floor(this.form.amount)) {
        this.$message.error('请输入整数');
        return;
      }
      if (Number(this.form.amount) > 50000) {
        this.$message.error('提现金额不能大于50000元');
        return;
      }
      if (!this.hasWechat) {
        this.$store.dispatch('admin/memberEdit', {
          wechat: this.bankcardForm.wechat,
        }).then(() => {
          this.$store.dispatch('admin/getMemberInfo');
        });
      }
      if (!this.hasBankcard) {
        await Promise.all([
          await this.bankcardSubmit(),
          await this.getBankcard(),
        ]).then((res) => {
          if (
            res[0].status === 200
            && res[0].data.code === 0
            && res[1].status === 200
            && res[1].data.code === 0
          ) {
            this.$message.success(res[0].data.data);
            this.withdraw();
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.withdraw();
      }
    },
    checkWechat() {
      if (this.memberInfo.wechat) {
        this.hasWechat = true;
        this.bankcardForm.wechat = this.memberInfo.wechat;
      }
    },
    getBankcard() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('admin/memberGetCards').then((res) => {
          if (res.data.data.list.length > 0) {
            this.hasBankcard = true;
            this.bankcardForm.real_name = res.data.data.list[0].name;
            this.bankcardForm.bankname = res.data.data.list[0].bank_name;
            this.bankcardForm.opening_bank = res.data.data.list[0].opening_bank;
            this.bankcardForm.card_number = res.data.data.list[0].card_number;
            this.form.card_id = res.data.data.list[0].id;
          }
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getData() {
      this.checkWechat();
      this.getBankcard();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
  .submit-button {
    border: none;
    border-radius: 8px;
    background-color: #f76b1c;
    color: white;
    font-size: 14px;

    &:disabled {
      background-color: gray;
    }
  }

  input {
    &::placeholder {
      font-size: 12px;
    }
  }

  .notice-block {
    border: 1px solid #f76b1c;
    background-color: rgba(247, 107, 28, 0.08);
    border-radius: 4px;
    font-size: 14px;
    line-height: 40px;
  }

  .text-orange {
    color: #f76b1c;
  }
</style>
