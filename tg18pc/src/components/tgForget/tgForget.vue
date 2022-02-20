<template lang='pug'>
  .container-fluid.ForgetWrap
    .gradientBg
    .container.overlapping
      .row.justify-content-center
        .col-6.my-3.p-5.card
          .row
            .col-12.my-3
              el-steps(:active='steps', align-center='')
                el-step(title='验证信息')
                el-step(title='身份验证')
                el-step(title='重置密码')
            div.step1.w-100(v-show='steps === 1')
              .col-12.my-5
                h3.text-center 验证信息
              .col-12.my-5
                el-form(:model='forgetForm_1'  :rules='forgetFormRules_1' ref='forgetForm_1' @submit.native.prevent='MemberPasswordForget("forgetForm_1")')
                  el-form-item(prop='VertifyInfo')
                    el-input(type='text' v-model='forgetForm_1.VertifyInfo' placeholder='请输入手机或邮箱')
                  el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
                  el-form-item
                    button.col-12.btn.btn-tgBlueDark(@click.prevent='MemberPasswordForget("forgetForm_1")' type="button")
                      span 下一步
            div.step2.w-100(v-show='steps === 2')
              .col-12.my-5
                h3.text-center 已发送验证码至手机 
                  br 
                  | {{forgetForm_1.VertifyInfo}}
              .col-12.my-5
                el-form(:model='forgetForm_2'  :rules='forgetFormRules_2' ref='forgetForm_2' @submit.native.prevent='EmailVertify("forgetForm_2")')
                  el-form-item(prop='Code')
                    el-input(type='text' v-model='forgetForm_2.Code' placeholder='输入您收到的验证码')
                  el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
                  el-form-item
                    button.col-12.btn.btn-tgBlueDark(v-if='infotype==1' @click.prevent='PhoneVertify("forgetForm_2")' type="button")
                      span 下一步
                    button.col-12.btn.btn-tgBlueDark(v-else @click.prevent='EmailVertify("forgetForm_2")' type="button")
                      span 下一步
            // div.step3.w-100(v-bind:class="[steps === 3 ? '' : 'invisible h-0']")
            div.step3.w-100(v-show='steps === 3 ')
              .col-12.my-5
                h3.text-center 快好了！重新设定密码吧 
              .col-12.my-5
                el-form(:model='forgetForm_3'  :rules='forgetFormRules_3' ref='forgetForm_3' @submit.native.prevent='MemberPasswordReset("forgetForm_3")')
                  el-form-item(prop='Password')
                    el-input(type='password' v-model='forgetForm_3.Password' placeholder='请输入新密码')
                  el-form-item(prop='ckPassword')
                    el-input(type='password' v-model='forgetForm_3.ckPassword' placeholder='再次确认密码')
                  el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
                  el-form-item
                    button.col-12.btn.btn-tgBlueDark(@click.prevent='MemberPasswordReset("forgetForm_3")' type="button")
                      span 下一步
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_VertifyInfo = (rule, value, callback) => {
      // if (value === '') {
      //   callback(new Error('请输入手机或信箱'));
      // } else {
      //   callback();
      // }
      if (value === '') {
        callback(new Error('请输入手机或信箱'));
      } else if (!(/^(13|14|15|16|18|19)\d{9}$/.test(value) || /^[a-z0-9\.\-_]+@[a-z0-9\-]+(\.[a-z0-9\-]+)+$/i.test(value))) {
        callback(new Error('请输入正确的手机或邮箱'));
      } else {
        callback();
      }
    };
    const check_Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.forgetForm_3.ckPassword !== '') {
          this.$refs.forgetForm_3.validateField('ckPassword');
        }
        callback();
      }
    };
    const check_ckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.forgetForm_3.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      steps: 1,
      infotype: '',
      error_message: '',
      forgetForm_1: {
        VertifyInfo: '',
      },
      forgetFormRules_1: {
        VertifyInfo: [{ required: true, message: '请输入正确的手机或信箱', trigger: 'blur' }, {
          validator: check_VertifyInfo, message: '请输入正确的手机或信箱', trigger: 'blur',
        }],
      },
      forgetForm_2: {
        Code: '',
        VertifyInfo: '',
      },
      forgetFormRules_2: {
        Code: [{ required: true, message: '请输入您收到的验证码', trigger: 'blur' }],
      },
      forgetForm_3: {
        VertifyInfo: '',
        Password: '',
        ckPassword: '',
      },
      forgetFormRules_3: {
        Password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: check_Pass, trigger: 'blur' }, {
          min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: 'blur',
        }],
        ckPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: check_ckPassword, trigger: 'blur' }, {
          min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: 'blur',
        }],
      },
    };
  },
  methods: {
    stepNext() {
      if (this.steps < 3) this.steps += 1;
    },
    MemberPasswordForget(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberPasswordForget`, this.forgetForm_1)
            .then((res) => {
              console.log(res);
              if (res.data.status === 1) {
                vm.infotype = res.data.infotype;
                vm.forgetForm_2.VertifyInfo = vm.forgetForm_1.VertifyInfo;
                vm.error_message = '';
                vm.stepNext();
              } else {
                vm.error_message = res.data.error_message;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    PhoneVertify(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member/PhoneVertify`, this.forgetForm_2)
            .then((res) => {
              console.log(res);
              if (res.data.status === 1) {
                vm.forgetForm_3.VertifyInfo = vm.forgetForm_1.VertifyInfo;
                vm.error_message = '';
                vm.stepNext();
              } else {
                vm.error_message = res.data.error_message;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    EmailVertify(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member/EmailVertify`, this.forgetForm_2)
            .then((res) => {
              console.log(res);
              if (res.data.status === 1) {
                vm.forgetForm_3.VertifyInfo = vm.forgetForm_1.VertifyInfo;
                vm.error_message = '';
                vm.stepNext();
              } else {
                vm.error_message = res.data.error_message;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    MemberPasswordReset(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('member/MemberPasswordReset', this.forgetForm_3)
            .then((res) => {
              if (res.data.status === 1) {
                vm.error_message = '';
                router.push('/');
              } else {
                vm.error_message = res.data.error_message;
              }
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ForgetWrap{
  min-height: 600px;
}
.gradientBg {
  width: 100%;
  height: 330px;
  background-image: linear-gradient(to right, #002766, #001332);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.overlapping{
  margin-top: -300px
}
.card{
  min-height: 400px
}
.h-0{
  height: 0;
}

</style>
