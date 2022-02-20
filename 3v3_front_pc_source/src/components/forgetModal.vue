<template lang="pug">
  #forgetModal.py-3
    .d-block.title.text-center.py-2.mb-3
      span 找回密码
    .py-2.px-5
      b-form(@submit.prevent="onSubmit")
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.pl-0 帐号
            b-form-input.col-10.form-input(
              v-model="form.username"
              type="text"
              placeholder="请输入帐号"
            )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.pl-0 新密码
            b-form-input.col-10.form-input(
              v-model="form.newpwd"
              type="password"
              placeholder="请输入新密码"
            )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.pl-0 手机号
            b-form-input.col-10.form-input(
              v-model="form.mobile"
              type="text"
              placeholder="请输入手机号"
            )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.pl-0 验证码
            .d-flex.col-10.p-0
              b-form-input.mr-2.form-input(
                v-model="form.vcode"
                type="text"
                placeholder="请输入验证码"
              )
              button.verify-button(
                @click.prevent="getVerifyCode"
                :disabled="counting"
              ) {{ counting ? `倒数${ time }秒`: '获取验证码' }}
        .d-flex.justify-content-center
          button.py-2.w-100.reg-button(type="submit") 下一步
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        mobile: '',
        newpwd: '',
        vcode: '',
      },
      countDownTimer: null,
      counting: false,
      time: 0,
    };
  },
  methods: {
    countDown(time = 90) {
      this.time = time;
      this.countDownTimer = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          this.counting = false;
        }
      }, 1000);
    },
    onSubmit() {
      this.$store.dispatch('admin/memberFindpwd', this.form).then((res) => {
        this.$message.success(res.data.data.msg);
      });
    },
    getVerifyCode() {
      this.$store.dispatch('admin/memberVerification', {
        mobile: this.form.mobile,
        type: 1,
      }).then(() => {
        this.counting = true;
        this.countDown();
      });
    },
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

.form-title {
  white-space: nowrap;
}

.form-input {
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid #8e8e93;
  color: white;

  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }

  &::placeholder {
    color: #8e8e93;
  }
}

.verify-button {
  white-space: nowrap;
  background-color: #00ffeb;
  border-radius: 8px;
  border: none;
  font-size: 12px;
}

.reg-button {
  background-color: #00ffeb;
  color: black;
  border: none;
  border-radius: 8px;
}
</style>
