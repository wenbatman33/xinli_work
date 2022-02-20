<template lang="pug">
  .page(style="flex: 1")
    .headBg
    .p-3.h-100.d-flex.flex-column
      h2.text-white.mt-3
        .icon(:style="`background-image: url(${moneyCollectIcon})`")
        span.ml-2 {{ $t('connect.name') }}
      .d-flex.flex-column.pb-4.overflow-auto
        .bg-white.text-left.px-5.py-4.main.overflow-auto.mt-4
          b-form(@submit.prevent="submit")
            .d-flex
              .col-6.pl-0
                b-form-group
                  label.d-flex.justify-content-between(for="user-username")
                    .title 会员帐号
                    .subtitle 输入您在PLK的会员帐号，若无可不填写。
                  b-input#user-username(v-model="form.username" placeholder="输入会员帐号")
                b-form-group
                  label.d-flex.justify-content-between(for="user-agentname")
                    .title 代理帐号
                    .subtitle 输入您在PLK的代理帐号，若无可不填写。
                  b-input#user-agentname(v-model="form.agentname" placeholder="输入代理帐号")
                b-form-group
                  label.d-flex.justify-content-between(for="user-realname")
                    .title 真实姓名*
                  b-input#user-realname(v-model="form.realname" :state="realnameValidate" placeholder="请输入姓名" @input="realnameInput")
                  b-form-invalid-feedback(:state="realnameValidate") 真实姓名不可为空
                b-form-group
                  label.d-flex.justify-content-between(for="user-email")
                    .title 输入邮箱*
                  b-input#user-email(v-model="form.email" :state="emailValidate" placeholder="请输入邮箱" @input="emailInput")
                  b-form-invalid-feedback(:state="emailValidate") 邮箱不可为空
                b-form-group
                  label.d-flex.justify-content-between(for="user-mobile")
                    .title 手机号*
                  b-input#user-mobile(v-model="form.mobile" :state="mobileValidate" placeholder="请输入手机号码" @input="mobileInput")
                  b-form-invalid-feedback(:state="mobileValidate") 手机号码不可为空
                b-form-group
                  label.d-flex.justify-content-between(for="user-wechat")
                    .title 微信号*
                  b-input#user-wechat(v-model="form.wechat" :state="wechatValidate" placeholder="请输入微信号" @input="wechatInput")
                  b-form-invalid-feedback(:state="wechatValidate") 微信号不可为空
                b-form-group
                  label.d-flex.justify-content-between(for="user-qq")
                    .title QQ号*
                  b-input#user-qq(v-model="form.qq" :state="qqValidate" placeholder="请输入QQ号" @input="qqInput")
                  b-form-invalid-feedback(:state="qqValidate") QQ号不可为空
              .col-6.pr-0
                b-form-group
                  label.d-flex.justify-content-between(for="user-verifycode")
                    .title 验证码*
                  .position-relative
                    b-input#user-verifycode(v-model="form.verifycode" :state="verifycodeValidate" placeholder="请输入验证码" @input="verifycodeInput")
                    .position-absolute.h-100(style="right: 0; top: 0")
                      Verifycode(@getRandom="getRandom")
                  b-form-invalid-feedback(:state="verifycodeValidate") 验证码错误
                b-form-group
                  label(for="user-other")
                    .title 其他*
                  b-form-textarea#user-other(
                    v-model="form.content"
                    :state="contentValidate"
                    placeholder="请简单描述您的合作方式与资源或是问题"
                    rows="3"
                    max-rows="6"
                    @input="contentInput"
                  )
                  b-form-invalid-feedback(:state="contentValidate") 內容不可为空
            .d-block.text-center
              b-button.mt-4(type="submit" variant="primary" style="width: 40%" :disabled="!formValidate") 提交
</template>

<script>
import Verifycode from '@/components/verifycode.vue';

export default {
  name: 'connect',
  components: {
    Verifycode,
  },
  data() {
    return {
      moneyCollectIcon: `${process.env.VUE_APP_STATIC}/img/money-collect-white.svg`,
      form: {
        username: '',
        agentname: '',
        realname: '',
        email: '',
        mobile: '',
        wechat: '',
        qq: '',
        verifycode: '',
        content: '',
      },
      verifycodeAns: '',
      realnameValidate: null,
      emailValidate: null,
      mobileValidate: null,
      wechatValidate: null,
      qqValidate: null,
      verifycodeValidate: null,
      contentValidate: null,
    };
  },
  computed: {
    formValidate() {
      return this.realnameValidate && this.emailValidate && this.mobileValidate && this.wechatValidate && this.qqValidate && this.verifycodeValidate && this.contentValidate;
    },
  },
  methods: {
    getRandom(val) {
      this.verifycodeAns = val;
    },
    checkIsEmpty(name) {
      return this.form[name].length === 0;
    },
    realnameInput() {
      if (this.checkIsEmpty('realname')) {
        this.realnameValidate = false;
      } else {
        this.realnameValidate = true;
      }
    },
    emailInput() {
      if (this.checkIsEmpty('email')) {
        this.emailValidate = false;
      } else {
        this.emailValidate = true;
      }
    },
    mobileInput() {
      if (this.checkIsEmpty('mobile')) {
        this.mobileValidate = false;
      } else {
        this.mobileValidate = true;
      }
    },
    wechatInput() {
      if (this.checkIsEmpty('wechat')) {
        this.wechatValidate = false;
      } else {
        this.wechatValidate = true;
      }
    },
    qqInput() {
      if (this.checkIsEmpty('qq')) {
        this.qqValidate = false;
      } else {
        this.qqValidate = true;
      }
    },
    verifycodeInput() {
      if (this.checkIsEmpty('verifycode') || this.form.verifycode !== this.verifycodeAns) {
        this.verifycodeValidate = false;
      } else {
        this.verifycodeValidate = true;
      }
    },
    contentInput() {
      if (this.checkIsEmpty('content')) {
        this.contentValidate = false;
      } else {
        this.contentValidate = true;
      }
    },
    resetForm() {
      this.form = {
        username: '',
        agentname: '',
        realname: '',
        email: '',
        mobile: '',
        wechat: '',
        qq: '',
        verifycode: '',
        content: '',
      };
      this.realnameValidate = null;
      this.emailValidate = null;
      this.mobileValidate = null;
      this.wechatValidate = null;
      this.qqValidate = null;
      this.verifycodeValidate = null;
      this.contentValidate = null;
    },
    submit() {
      this.$store.dispatch('admin/setContact', this.form).then((res) => {
        if (res.data.status === 0) {
          this.resetForm();
          this.$message.success('提交成功');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .main {
    box-shadow: inset 0 0 4px 0 rgba(0, 172, 171, 0.3);
    border-radius: 8px;
  }

  .icon {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: cover;
    vertical-align: bottom;
  }

  .title {
    font-size: 14px;
    color: #202020;
    font-weight: bold;
  }

  .subtitle {
    font-size: 10px;
    color: #c6c6c9;
  }

  input {
    border: 1px solid #c6c6c9;
    &::placeholder {
      color: #c6c6c9;
      font-size: 12px;
    }
  }

  textarea {
    &::placeholder {
      color: #c6c6c9;
      font-size: 12px;
    }
  }
</style>
