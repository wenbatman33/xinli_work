<template lang="pug">
el-form.w-100(:model="memberForm", ref="memberForm", :rules="registerFormRules", @submit.native.prevent='register("memberForm")')
  .col-12.py-3
    el-form-item.m-0(prop="phone")
      el-input(v-model.trim='memberForm.phone', type='tel', maxlength='11', placeholder='请输入联系手机号')
  .col-12.py-3
    el-form-item.m-0(prop="otp")
      .d-flex
        el-input(type='text' v-model.trim='memberForm.otp' placeholder="点击右方按钮发送验证码")
        el-button.ml-2(v-if='tempSaveData.countDownWaiting===false', type="primary", :disabled='memberForm.phone == ""' @click='submitPhoneCode') 发送验证码
        el-button.ml-2(v-else, type="primary", disabled) {{tempSaveData.countDown}}秒后重发
  .col-12.py-3
    el-form-item.m-0(prop="privacyPolicy")
      el-checkbox-group.m-0(v-model='memberForm.privacyPolicy')
        el-checkbox.privacyPolicy.m-0(label="", name="privacyPolicy")
          span 已年满18岁，并接受
          router-link(to="/about#about4" target='_blank') 《相关的条款》 
          span 与
          router-link(to="/about#about3" target='_blank') 《隐私权政策》
  //- .col-12
  //-   el-button.ml-2(type="primary", @click='restMemberForm') restMemberForm
  .col-12.text-center.my-2
    bl_ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', :verifyOK='memberForm.imageVerify')
  .col-12.py-3
    el-form-item.m-0
      el-button.w-100(type="primary", native-type='submit', :disabled='memberFormValidate==false') 立即注册
</template>
<script>
import bl_ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';
import bl_MobileRegistered from '@/components/bl_Register/bl_MobileRegistered.vue';

let loop;
export default {
  components: {
    bl_ImageVerify,
    bl_MobileRegistered,
  },
  data() {
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号'));
      } else if (!/^(1)\d{10}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const check_opt = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.imgVerifyCode) {
        callback(new Error('验证码不正确'));
      } else {
        callback();
      }
    };
    return {
      memberFormValidate: false,
      memberForm: {
        imageVerify: false,
        privacyPolicy: [],
        phone: '',
        otp: '',
        tryTime: '',
        rpc: '',
      },
      registerFormRules: {
        phone: [
          { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] },
          { validator: check_Phone, trigger: ['blur', 'change'] },
        ],
        otp: [
          { required: true, message: '请输验证码', trigger: ['blur'] },
        ],
        privacyPolicy: [{
          type: 'array', required: true, message: '请同意相关的条款', trigger: 'change',
        }],
      },
      tempSaveData: {
        saveData: '',
        saveDataCount: '',
        countDown: 0,
        countDownWaiting: false,
      },
    };
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    memberForm: {
      handler(val) {
        const vm = this;
        if (vm.memberForm.phone !== '' &&
          vm.memberForm.otp !== '' &&
          vm.memberForm.privacyPolicy.length > 0 &&
          vm.memberForm.imageVerify === true) {
          this.$refs.memberForm.validate((valid) => {
            if (valid) {
              vm.memberFormValidate = true;
            } else {
              vm.memberFormValidate = false;
            }
          });
        } else {
          this.memberFormValidate = false;
        }
      },
      deep: true,
    },
  },
  
  methods: {
    restMemberForm() {
      const vm = this;
      this.$refs.memberForm.clearValidate();
      this.$refs.memberForm.resetFields();
    },
    register(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (vm.memberForm.imageVerify === true) {
          this.$store.dispatch('member/MemberMobileRegister', vm.memberForm)
            .then((res) => {
              if (res.status === 200) {
              // vm.restMemberForm();
                window.localStorage.removeItem(`${vm.tempSaveData.saveData}`);
                window.localStorage.removeItem(`${vm.tempSaveData.saveDataCount}`);
                // 跳出暂时性的帐号密码显示
                // vm.$message({ message: '成功', type: 'success' });
                vm.$store.dispatch('dialog/openCommandDialog_level2', { component: 'bl_MobileRegistered' });
              } 
            })
            .catch((error) => {
              // 重新取得验证码 错误代码 1101
              // 验证码错误 次数<3 错误码1102
              // 格式验证错误 次数>=3 错误码1103
              // 电话号码冻结 暂停注册24小时 错误码1104
              vm.imageVerifyReset();
            });
        }
      });
    },
    loopTime(checktime = 120) {
      const vm = this;
      vm.tempSaveData.countDownWaiting = true;
      vm.tempSaveData.countDown = checktime;
      loop = setInterval(() => {
        vm.tempSaveData.countDown -= 1;
        if (vm.tempSaveData.countDown <= 0) {
          vm.tempSaveData.countDownWaiting = false;
          clearInterval(loop);
        }
      }, 1000);
    },
    submitPhoneCode() {
      const vm = this;
      const payload = {};
      payload.phone = this.memberForm.phone;
      // 暂存手机号码
      window.localStorage.setItem(`${vm.tempSaveData.saveData}`, this.memberForm.phone);
      this.$axios.post('/api/Member/SignUpOtp', payload)
        .then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            const now = new Date();
            const currentTime = new Date().getTime();
            const expiredTime = currentTime + (1000 * 90);
            window.localStorage.setItem(`${vm.tempSaveData.saveDataCount}`, expiredTime);
          }
          vm.loopTime();
        })
        .catch((error) => {
          console.log(error);
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
    tempSaveDataCounting() {
      const vm = this;
      // 指定暂存档位置
      vm.tempSaveData.saveData = 'registerPhone';
      vm.tempSaveData.saveDataCount = 'registerPhoneCount';
      
      // 判断是否进入倒数
      const COUNTDOWN = window.localStorage.getItem(`${vm.tempSaveData.saveDataCount}`);
      const CURRENTTIME = new Date().getTime();
      const CHECKTIME = Math.floor((Number(COUNTDOWN) - CURRENTTIME) / 1000);
      // console.log(CHECKTIME);
      if (COUNTDOWN > 0 && CHECKTIME > 0) {
        vm.tempSaveData.countDownWaiting = true;
        vm.loopTime(CHECKTIME);
      } else {
        window.localStorage.removeItem(`${vm.tempSaveData.saveData}`);
        window.localStorage.removeItem(`${vm.tempSaveData.saveDataCount}`);
      }
      // 指定vue data资料
      if (window.localStorage.getItem(`${vm.tempSaveData.saveData}`)) {
        vm.memberForm.phone = window.localStorage.getItem(`${vm.tempSaveData.saveData}`);
      } else {
        vm.memberForm.phone = '';
      }
    },
  },
  created() {
    clearInterval(loop);
  },
  beforeDestroy() {
    clearInterval(loop);
  },
  mounted() {
    const vm = this;
    vm.tempSaveDataCounting();
  },
};
</script>

<style lang="scss" scoped>
.privacyPolicy{
  font-size: 13px;
  color: $garyBlue_Dark;
}
</style>
