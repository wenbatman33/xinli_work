<template lang="pug">
  #registerModal
    .text-center.mb-2
      img(:src="img_logo")
    .d-block.title.text-center.py-2.mb-3
      span 会员注册
    .py-2.px-4
      .promotion-status.p-4.mb-3
        .d-flex.flex-column
          .mb-2 推广人編号 ：{{ form.member_code ? form.member_code : form.agent_code }}
          span 您的帐号 ：{{ form.username }}
      b-form(@submit="onSubmit")
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 帐号
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="form.username"
                placeholder="请输入帐号"
                disabled
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 密码
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="form.password"
                type="password"
                placeholder="请输入密码，8～20英数字符或下划线组合"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 确认密码
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="form.confirmPassword"
                type="password"
                placeholder="请再次输入密码，8～20英数字符或下划线组合"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 安全性问题
            .d-flex.p-0.w-100
              b-form-select.form-input(
                v-model="form.password_question_id"
                :options="options"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 安全性答案
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="form.password_answer"
                type="text"
                placeholder="请输入安全性答案"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 手机号
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="form.mobile"
                type="text"
                placeholder="请输入手机号"
                maxlength="11"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right 验证码
            .d-flex.p-0.w-100
              b-form-input.form-input.mr-2(
                v-model="form.vcode"
                type="text"
                placeholder="请输入验证码"
              )
              button.verify-button(
                @click.prevent="getVerifyCode"
                :disabled="counting"
              ) {{ counting ? `倒数${ time }秒`: '获取验证码' }}
        .d-block.text-center.mb-2(style="color: #8e8e93; font-size: 14px") ＊注册后自动绑定该手机号＊
        .d-flex.justify-content-center
          button.py-2.mr-2.w-50.reg-button(type="submit" :disabled="!formValidate") 注册
          button.py-2.w-50.cancel-button(type="button" @click="closeModal") 取消
      .text-center.mt-4.login-button(@click="login") 已经有帐号，登录
</template>

<script>
export default {
  name: 'registerModal',
  data() {
    return {
      img_logo: `${process.env.VUE_APP_STATIC}/img/logo.png`,
      form: {
        agent_code: '',
        member_code: '',
        username: '',
        password: '',
        confirmPassword: '',
        password_question_id: '',
        password_answer: '',
        mobile: '',
        vcode: '',
      },
      options: [
        { value: null, text: '请输入安全性答案' },
        { value: '1', text: '我母亲的姓名' },
        { value: '2', text: '我父亲的姓名' },
        { value: '3', text: '我最喜欢的食物' },
        { value: '4', text: '我宠物的名字' },
        { value: '5', text: '我最喜欢的电影名称' },
        { value: '6', text: '我最喜欢的书名' },
        { value: '7', text: '我就读的小学名称' },
      ],
      countDownTimer: null,
      counting: false,
      time: 0,
    };
  },
  computed: {
    formValidate() {
      if (
        this.form.password === ''
      || this.form.confirmPassword === ''
      || this.form.password_question_id === ''
      || this.form.password_answer === ''
      || this.form.vcode === ''
      || this.form.mobile === '') return false;
      return this.form.password === this.form.confirmPassword;
    },
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
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch('admin/memberRegister', this.form).then((res) => {
        this.$store.dispatch('admin/getMemberInfo');
        this.$message.success(res.data.data.msg);
      });
    },
    getVerifyCode() {
      this.$store.dispatch('admin/memberVerification', {
        mobile: this.form.mobile,
        type: 0,
      }).then(() => {
        this.counting = true;
        this.countDown();
      });
    },
    closeModal() {
      this.$store.dispatch('admin/setRegisterModal', false);
    },
    login() {
      this.$store.dispatch('admin/setRegisterModal', false);
      this.$store.dispatch('admin/setLoginModal', true);
    },
    setPromotionCode() {
      if (!this.$route.fullPath.includes('?') || this.$route.fullPath.slice(-1) === '?') {
        this.$message.info('请由推广链结注册');
        this.$nextTick(() => {
          this.$store.dispatch('admin/setRegisterModal', false);
        });
      } else if (this.$route.query.m) {
        this.form.member_code = this.$route.query.m;
        this.checkCode('member', this.form.member_code);
      } else {
        this.form.agent_code = this.$route.fullPath.split('?')[1].slice(0, 8);
        this.checkCode('agent', this.form.agent_code);
      }
    },
    // TODO: 可以將檢核code的地方搬到header
    checkCode(type, code) {
      this.$store.dispatch('admin/checkCode', {
        [type]: code,
      }).catch((err) => {
        if (err) {
          this.$nextTick(() => {
            this.$store.dispatch('admin/setRegisterModal', false);
          });
        }
      });
    },
    getData() {
      this.$store.dispatch('admin/getRandomUsername').then((res) => {
        this.form.username = res.data.data;
      });
    },
  },
  created() {
    this.setPromotionCode();
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.countDownTimer);
  },
};
</script>

<style lang="scss" scoped>
.promotion-status {
  border: 1px solid #f76b1c;
  background-color: rgba(247, 107, 28, 0.08);
  border-radius: 4px;
  color: #f76b1c;
  font-size: 14px;
}
.title {
  background: linear-gradient(to right, rgba(0, 237, 221, 0), #00afaf, rgba(0, 237, 221, 0))
}

.form-title {
  white-space: nowrap;
  font-size: 14px;
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
    font-size: 14px;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.4);
    color: red;
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

.login-button {
  color: #00ffeb;
  font-size: 14px;
  cursor: pointer;
}
</style>
