<template lang="pug">
.container-fluid.p-0
  .row.no-gutters
    .col-12.text-center.pt-3
      .logoWrap.DF_CENTER.py-3
        p 手机号码 15384924598已完成验证 
      .formData.p-5
        h5 重设密码
        el-form.mt-3(:model="formData", ref="formData", @submit.native.prevent='login("formData")')
          el-form-item
            el-input.loginInput(v-model="formData.name"  placeholder="请输入新密码")
          el-form-item
            el-input.loginInput(v-model="formData.pass" placeholder="再次确认密码")
          el-form-item.my-1
            el-button.w-full(type="primary", native-type='submit' round) 完成
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    verifyCodeToUpperCase: {
      get() {
        return this.formData.Code;
      },
      set(val) {
        this.formData.Code = val.toUpperCase();
      },
    },
  },
  watch: {
    formData: {
      handler(val) {
        const vm = this;
        if (vm.formData.name !== '' &&
          vm.formData.pass !== '' &&
          vm.formData.Code !== '') {
          this.formDataValidate = true;
        } else {
          this.formDataValidate = false;
        }
      }, 
      deep: true,
    },
  },
  data() {
    return {
      Code: '',
      formDataValidate: false,
      formData: {
        name: '',
        pass: '',
        Code: '',
      },
    };
  },
  methods: {
    imgCode(code) {
      this.Code = code;
    },
    upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    login(form) {

    },
  },
  mounted() {
    
  },
};
</script>
<style lang="scss" scoped>
.loginBg{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.logoWrap{
  margin: 35px 0 20px 0;
}
.formData{
  margin: auto;
  max-width: 450px;
}
</style>
