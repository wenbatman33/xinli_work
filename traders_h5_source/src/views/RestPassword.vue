<template lang="pug">
.w-full
  .headerBar
    p.text-center 重设密码
    .backBtn
      router-link(to='/')
        span.mx-2
          i.fas.fa-angle-left
        span Back
  .container.mx-auto
    .formData.p-3
      el-form.mt-4(:model="formData", ref="formData", :rules='formDataRules', @submit.native.prevent='resetPassword')
        el-form-item.my-8(prop='old_password')
          el-input.loginInput(v-model="formData.old_password"  placeholder="請輸入目前密碼 ")
        el-form-item.my-8(prop='password')
          el-input.loginInput(v-model="formData.password"  placeholder="请输入新密码")
        el-form-item.my-8(prop='password_ck')
          el-input.loginInput(v-model="formData.password_ck" placeholder="再次确认密码")
        el-form-item.my-1
          el-button.w-full(type="primary", native-type='submit' round) 完成
</template>

<script>
import { mapState } from 'vuex';
import { MemberPasswordAPI } from '@/api';

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
  data() {
    const old_password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.restPasswordformData.ckPassword !== '') {
          this.$refs.restPasswordformData.validateField('ckPassword');
        }
        callback();
      }
    };
    const check_Password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.restPasswordformData.ckPassword !== '') {
          this.$refs.restPasswordformData.validateField('ckPassword');
        }
        callback();
      }
    };
    const check_Password_ck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.restPasswordformData.ckPassword !== '') {
          this.$refs.restPasswordformData.validateField('ckPassword');
        }
        callback();
      }
    };
    return {
      formDataValidate: false,
      formData: {
        old_password: '',
        password: '',
        password_ck: '',
      },
      formDataRules: {
        old_password: [
          { required: true, message: '请输入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Password, trigger: ['blur', 'change'] }, 
        ],
        password: [
          { required: true, message: '请输入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Password, trigger: ['blur', 'change'] }, 
        ],
        password_ck: [
          { required: true, message: '请输入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Password, trigger: ['blur', 'change'] }, 
        ],
      },
    };
  },
  methods: {
    resetPassword() {
      MemberPasswordAPI(this.formData)
        .then((res) => {
          if (res.data.data[0] === true) {
            // 重設密碼後進入login頁面
            this.$message({
              message: '重設密碼完成！',
              type: 'success',
              showClose: true,
            });
            this.$store.dispatch('member/MemberLogOut');
            this.$router.push('/login');
          }
        });
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
  max-width: 500px;
}
</style>
