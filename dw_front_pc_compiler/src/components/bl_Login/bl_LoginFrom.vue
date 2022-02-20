<template lang="pug">
.h-100
  el-form.h-100(:model="memberForm", ref="memberForm", :rules="loginFormRules", @submit.native.prevent='login("memberForm")', autocomplete='off')
    .d-flex.flex-column.align-items-center.h-100.justify-content-center.px-5
      div.w-100.py-3
        el-form-item.m-0(prop="account")
          el-input(v-model='memberForm.account', placeholder='用户名：请输入5~15位半形英文、数字或下划线', maxlength='15', autocomplete='off')
      div.w-100.py-3
        el-form-item.m-0(prop="password")
          el-input(v-model='memberForm.password', :type='passwordType', maxlength='20', placeholder='密码：请輸入8~20位半形英文、数字或特殊符号', autocomplete='new-password')
          .showPassword(@click='showPassword =! showPassword')
            i.fas.fa-eye-slash(v-if='showPassword')
            i.fas.fa-eye(v-else)
      div.w-100.justify-content-center
        bl_ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', :verifyOK='memberForm.imageVerify')
      div.w-100.py-2
        el-form-item.my-1
          el-button.w-100(type="primary", native-type='submit', :disabled='memberFormValidate==false') 立即登录
        div.text-right
          span.textLink(@click='openForgetDialog') 忘记密码 
          span | 
          span.textLink(@click='openRegisterDialog') 立即注册 
</template>
<script>
import bl_ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';

export default {
  components: {
    bl_ImageVerify,
  },
  data() {
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else if (!(/^[a-zA-Z0-9_]{5,15}$/.test(value))) {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else {
        callback();
      }
    };
    const check_Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.registerForm.ckPassword !== '') {
          this.$refs.registerForm.validateField('ckPassword');
        }
        callback();
      }
    };
    return {
      showVerify: false,
      memberFormValidate: false,
      showPassword: false,
      passwordType: 'password',
      memberForm: {
        imageVerify: false,
        // keepData: false,
        account: '',
        password: '',
        tryTime: '',
        rpc: '',
        version: process.env.VUE_APP_VERSION,
      },
      loginFormRules: {
        account: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, { validator: check_account, trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '请输入5～15字符（A-Z ,a-z,0-9）', trigger: 'blur',
        }],
        password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
      },
    };
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    memberForm: {
      handler(val) {
        const vm = this;
        if (vm.memberForm.account !== '' &&
          vm.memberForm.password !== '' &&
          vm.memberForm.imageVerify === true) {
          // this.memberFormValidate = true;
          this.$refs.memberForm.validate((valid) => {
            if (valid) {
              this.memberFormValidate = true;
            } else {
              this.memberFormValidate = false;
            }
          });
        } else {
          this.memberFormValidate = false;
        }
      },
      deep: true,
    },
    showPassword(value) {
      if (value) {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
  },
  methods: {
    openRegisterDialog() {
      const vm = this;
      this.$store.dispatch('dialog/closeCommandDialog');
      setTimeout(() => {
        vm.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Register' });
      }, 300);
    },
    openForgetDialog() {
      const vm = this;
      this.$store.dispatch('dialog/closeCommandDialog');
      setTimeout(() => {
        vm.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Forget' });
      }, 300);
    },
    restMemberForm() {
      const vm = this;
      vm.showVerify = false;
      this.$refs.memberForm.resetFields();
    },
    login(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (vm.memberForm.imageVerify === true) {
          this.$store.dispatch('member/MemberLogin', vm.memberForm)
            .then((res) => {
              if (res.status === 200) {
                // vm.restMemberForm();
                vm.showVerify = false;
                vm.memberForm.imageVerify = true;
                vm.$message({ message: '登录成功', type: 'success' });
                // 判斷是否有登入前的連結導向
                if (window.localStorage.tempLink) {
                  // 是否有暫存的未登入的[內部連結]
                  vm.$router.push(window.localStorage.tempLink).catch((err) => {});
                  window.localStorage.removeItem('tempLink');
                } else if (window.localStorage.tempOutsideLink) {
                  // 是否有暫存的未登入的[外部連結]
                  window.location.replace(window.localStorage.tempOutsideLink);
                  window.localStorage.removeItem('tempOutsideLink');
                } else if (window.localStorage.tempOpenGameData) {
                  const { gameGroupId, gameOpenMode, gameId } = JSON.parse(window.localStorage.tempOpenGameData);
                  const payload = {};
                  payload.item = {};
                  payload.subItem = {};
                  payload.subItem.id = gameGroupId;
                  payload.subItem.gameOpenMode = gameOpenMode;
                  payload.game_id = gameId;
                  this.$store.dispatch('game/gameLogin', payload);
                  window.localStorage.removeItem('tempOpenGameData');
                } else {
                  vm.$router.push('/').catch((err) => {});
                }
              }
            })
            .catch((error) => {
              vm.imageVerifyReset();
            });
        }
      });
    },
    VerifySuccessEvent() {
      const vm = this;
      vm.memberForm.imageVerify = true;
    },
    imageVerifyReset() {
      const vm = this;
      vm.memberForm.imageVerify = false;
    },
  },
  beforeDestroy() {
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
  },
  mounted() {
    const vm = this;
  },
};
</script>

<style lang="scss" scoped>
.showPassword{
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 13px;
  color: $garyBlue_lightest;
}
.memberFormWrap{
  height: 330px;
}
.textLink{
  cursor: pointer;
  color: $DW_Color;
}
</style>
