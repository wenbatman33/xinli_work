<template lang="pug">
  #loginModal
    .text-center.mb-2
      img(:src="img_logo")
    .d-block.title.text-center.py-2.mb-3
      span 会员登入
    .py-2.px-5
      b-form(@submit.prevent="onSubmit")
        b-form-group
          .d-flex.align-items-center
            .form-title 帐号
            b-form-input.form-input(
              v-model="form.username"
              type="text"
              placeholder="请输入帐号"
              autocomplete="username"
            )
        b-form-group
          .d-flex.align-items-center
            .form-title 密码
            b-form-input.form-input(
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              autocomplete="current-password"
            )
        b-form-group
          .d-flex.align-items-center
            .form-title 記住密码
            b-form-checkbox(v-model="form.remembered" size="lg" switch)
        .d-flex.justify-content-center
          button.py-2.mr-2.w-50.reg-button(type="submit") 登录
          button.py-2.w-50.cancel-button(type="button" @click="closeLoginModal") 取消
      .text-center.mt-4.find-password(@click="openForget") 找回密码？
</template>

<script>
export default {
  name: 'loginModal',
  data() {
    return {
      img_logo: `${process.env.VUE_APP_STATIC}/img/logo.png`,
      form: {
        username: '',
        password: '',
        remembered: false,
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.remembered) {
        window.localStorage.removeItem('loginInfo');
      } else {
        window.localStorage.setItem('loginInfo', JSON.stringify(this.form));
      }
      this.$store.dispatch('admin/memberLogin', this.form).then((res) => {
        this.$message.success('登入成功');
        this.$s.open();
        this.$socket.client.emit('login', res.data.data.uid);
      });
    },
    openForget() {
      this.$store.dispatch('admin/setLoginModal', false);
      this.$store.dispatch('admin/setForgetModal', true);
    },
    closeLoginModal() {
      this.$store.dispatch('admin/setLoginModal', false);
    },
  },
  created() {
    if (window.localStorage.getItem('loginInfo')) {
      const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
      this.form.remembered = true;
      this.form.username = loginInfo.username;
      this.form.password = loginInfo.password;
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: linear-gradient(to right, rgba(0, 237, 221, 0), #00afaf, rgba(0, 237, 221, 0))
}

.form-title {
  white-space: nowrap;
  margin-right: 25px;
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

.reg-button {
  background-color: #00ffeb;
  color: black;
  border: none;
  border-radius: 8px;
}

.cancel-button {
  border: 1px solid #00ffeb;
  color: #00ffeb;
  background: transparent;
  border-radius: 8px;
}

.find-password {
  cursor: pointer;
  color: #00ffeb;
}
</style>
