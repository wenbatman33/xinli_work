<template lang="pug">
el-form.w-100(:model="bindingEmailForm", ref="bindingEmailForm", :rules="bindingEmailFormRules")
  .row.no-gutters.p-4
    .col-12.my-3
      h3.text-center 邮箱验证
      p.my-3.text-center 确保您的资金安全，邮箱将是客服确认身份的重要凭证
    .col-12.my-3
      el-form-item.m-0(prop="email")
        el-input(v-model.trim='bindingEmailForm.email', type='text', placeholder='请输入邮箱')
    .col-12.my-3
      el-form-item.m-0(prop="otp")
        .d-flex
          el-input(type='text' v-model.trim='bindingEmailForm.otp' placeholder="点击右方按钮发送验证码")
          el-button.ml-2(v-if='tempSaveData.countDownWaiting===false', type="primary", :disabled='bindingEmailForm.email == ""' @click='submitBindingEmailCode') 发送验证码
          el-button.ml-2(v-else, type="primary", disabled) {{tempSaveData.countDown}}秒后重发
    .col-12.my-2
      el-form-item
        el-button.w-100(type="primary", @click.prevent='bindingEmail("bindingEmailForm")', :disabled='bindingEmailFormValidate==false') 提交绑定
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
export default {
  data() {
    return {
      bindingEmailFormValidate: false,
      showVerify: false,
      bindingEmailForm: {
        email: '',
        otp: '',
      },
      bindingEmailFormRules: {
        email: [
          {
            required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'], 
          },
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
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
    ...mapState('member', [
      'memberStatus',
    ]),
  },
  watch: {
    // 侦听表单验证是否完成 返回至bindingEmailFormValidate
    bindingEmailForm: {
      handler(val) {
        const vm = this;
        if (vm.bindingEmailForm.email !== '' &&
          vm.bindingEmailForm.otp !== '') {
          this.bindingEmailFormValidate = true;
        } else {
          this.bindingEmailFormValidate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
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
    bindingEmail(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberChangeEmail', vm.bindingEmailForm)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              vm.$store.dispatch('dialog/closeCommandDialog');
              vm.$store.dispatch('member/PersonalGetData');
              vm.$store.dispatch('member/getMemberDetailData');
              vm.$store.dispatch('member/getMemberProfile');

              vm.$message({ message: '绑定成功', type: 'success' });
              window.localStorage.removeItem(`${vm.tempSaveData.saveData}`);
              window.localStorage.removeItem(`${vm.tempSaveData.saveDataCount}`);
            }
          });
      });
    },
    submitBindingEmailCode() {
      const vm = this;
      const payload = {};
      payload.email = this.bindingEmailForm.email;
      // 暂存手机号码
      window.localStorage.setItem(`${vm.tempSaveData.saveData}`, this.bindingEmailForm.email);

      this.$store.dispatch('member/MemberChangeEmailOtp', vm.bindingEmailForm)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.status === 1) {
            const now = new Date();
            const currentTime = new Date().getTime();
            const expiredTime = currentTime + (1000 * 90);
            window.localStorage.setItem(`${vm.tempSaveData.saveDataCount}`, expiredTime);
          }
          vm.loopTime();
        });
    },
    tempSaveDataCounting() {
      const vm = this;
      // 指定暂存档位置
      vm.tempSaveData.saveData = `${vm.PersonalDetail.memberAccount}_email`;
      vm.tempSaveData.saveDataCount = `${vm.PersonalDetail.memberAccount}_emailCount`;
      
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
        vm.bindingEmailForm.email = window.localStorage.getItem(`${vm.tempSaveData.saveData}`);
      } else if (vm.memberStatus.email) {
        vm.bindingEmailForm.email = vm.memberStatus.email;
      } else {
        vm.bindingEmailForm.email = '';
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
</style>
