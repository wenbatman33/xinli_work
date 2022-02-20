<template lang="pug">
el-form.h-100(:model="memberForm", ref="memberForm", :rules="loginFormRules", @submit.native.prevent='login("memberForm")')
  .d-flex.flex-column.align-items-center.h-100.justify-content-center.px-5
    div.w-100.py-3
      el-form-item.m-0(prop="phone")
        el-input(v-model.trim='memberForm.phone', type='tel', maxlength='11', placeholder='请输入联系手机号')
    div.w-100.py-3
      el-form-item.m-0(prop="otp")
        .d-flex
          el-input(type='text' v-model.trim='memberForm.otp' placeholder="点击右方按钮发送验证码")
          el-button.ml-2(v-if='tempSaveData.countDownWaiting===false', type="primary", :disabled='memberForm.phone == ""' @click='submitPhoneCode') 发送验证码
          el-button.ml-2(v-else, type="primary", disabled) {{tempSaveData.countDown}}秒后重发
    div.w-100.py-2
      bl_ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', @reset='imageVerifyReset' :verifyOK='memberForm.imageVerify')
    div.w-100.py-2
      el-form-item.m-0
        el-button.w-100(type="primary", native-type='submit', :disabled='memberFormValidate==false') 立即登录
</template>
<script>
import bl_ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';

let loop;
export default {
  components: {
    bl_ImageVerify,
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
        phone: '',
        otp: '',
        tryTime: '',
        rpc: '',
        version: process.env.VUE_APP_VERSION,
      },
      loginFormRules: {
        phone: [
          { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] },
          { validator: check_Phone, trigger: ['blur', 'change'] },
        ],
        otp: [
          { required: true, message: '请输验证码', trigger: ['blur'] },
        ],
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
          vm.memberForm.imageVerify === true) {
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
  },
  methods: {
    restMemberForm() {
      this.$refs.memberForm.clearValidate();
      this.$refs.memberForm.resetFields();
    },
    login(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (vm.memberForm.imageVerify === true) {
          this.$store.dispatch('member/MemberMobileLogin', vm.memberForm)
            .then((res) => {
              if (res.status === 200) {
                // vm.restMemberForm();
                window.localStorage.removeItem(`${vm.tempSaveData.saveData}`);
                window.localStorage.removeItem(`${vm.tempSaveData.saveDataCount}`);
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
              // 重新取得验证码 错误代码 1101
              // 验证码错误 次数<3 错误码1102
              // 格式验证错误 次数>=3 错误码1103
              // 帐户已冻结 错误码4005
              // 手机尚未认证 错误码4007
              
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
      this.$axios.post('/api/Member/LoginOtp', payload)
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
      vm.tempSaveData.saveData = 'loginPhone';
      vm.tempSaveData.saveDataCount = 'loginPhoneCount';
      
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
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
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
