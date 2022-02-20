<template lang='pug'>
  div.m-3
    .row.no-gutters
      .col-12
        el-form(:model="memberForm"  label-width="80px" :rules="memberFormRules" ref="memberForm"  @submit.native.prevent='')
          el-form-item(label="姓名:" prop="RealName")
            el-input.w-75(type='text' v-model.trim='memberForm.RealName' placeholder='请输入真实姓名'  :disabled="firstTimeSetRealName")
            el-button.mx-2(type="primary" onclick="LC_API.open_chat_window();" v-if='firstTimeSetRealName') 联系客服修改
            el-button.mx-2(type="primary" @click.prevent="submit('memberForm')",:loading="submitLoading" :disabled="!memberForm.RealName" v-else) 提交修改
          // el-form-item(label="性別:" prop="Sex")
          //   el-radio-group(v-model='memberForm.Sex')
          //     el-radio(label='M') 男性
          //     el-radio(label='F') 女性
          el-form-item(label="生日:" prop="Birthday" )
            el-date-picker.w-75(v-model='memberForm.Birthday', :disabled='MemberData.Birthday!="0000-00-00"', format="yyyy-MM-dd" value-format="yyyy-MM-dd" type='date'  :default-value='Date.now()-(18*365*24*60*60*1000)' placeholder='选择日期',:picker-options="pickerOptions")
            el-button.mx-2(type="primary" onclick="LC_API.open_chat_window();" v-if='MemberData.Birthday!="0000-00-00"') 联系客服修改
            el-button.mx-2(type="primary" @click.prevent="submit('memberForm')",:loading="submitLoading" :disabled="!memberForm.Birthday" v-else) 提交修改
            p.birthDayTips.text-danger 请输入正确的生日，我们将为VIP会员派发生日礼金
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          el-form-item(label="手机:" prop="Phone")
            div.mb-3
              el-input.w-75(type='tel', maxlength='11', v-model.trim="memberForm.Phone", v-if='MemberData.PhoneStatus==1 && MemberData.Phone' , disabled)
              el-input.w-75(type='tel', maxlength='11', placeholder="未验证", v-else-if='MemberData.PhoneStatus==0 && MemberData.Phone' , disabled)
              el-input.w-75(type='tel', maxlength='11', placeholder="未设置", v-else disabled)
              el-button.mx-2(type="primary" @click='modifyPhone', v-if='MemberData.PhoneStatus==0') 绑定手机
              el-button.mx-2(type="primary" @click='modifyPhone', v-if='MemberData.PhoneStatus==1') 修改手机
              el-tooltip.item(effect='dark', content='已完成手机验证', placement='top')
                span
                  i.el-icon-success.text-success(v-if='MemberData.PhoneStatus==1')
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          el-form-item(label="邮箱:" prop="Email")
            div.mb-3
              el-input.w-75(type='text', maxlength='11', v-model.trim="memberForm.Email", v-if='MemberData.EmailStatus == 1 && MemberData.Email' , disabled)
              el-input.w-75(type='tel', maxlength='11', placeholder="未验证", v-else-if='MemberData.EmailStatus == 0 && MemberData.Email' , disabled)
              el-input.w-75(type='tel', maxlength='11', placeholder="未设置", v-else disabled)
              el-button.mx-2(type="primary" @click='modifyEmail', v-if='MemberData.EmailStatus == 0') 绑定邮箱
              el-button.mx-2(type="primary" @click='modifyEmail', v-if='MemberData.EmailStatus == 1') 修改邮箱
              el-tooltip.item(effect='dark', content='已完成邮箱验证', placement='top')
                span
                  i.el-icon-success.text-success(v-if='MemberData.EmailStatus == 1')
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //Modal
          //手機
          el-dialog(title="手机号码" :visible.sync="PhoneFormVisible")
            el-form(v-if='verifyPhoneSteps==2', :model="verifyPhoneForm" :rules="verifyPhoneFormRules" ref="verifyPhoneForm" @submit.native.prevent='')
              el-form-item(prop="Phone")
                el-input(type='tel', maxlength='11', v-model.trim="verifyPhoneForm.Phone", placeholder="请输入手机号码", autocomplete="off")
              el-form-item
                el-form.d-flex
                  el-input(type='text' v-model.trim='verifyPhoneCodeForm.Code' placeholder="点击右方按钮发送验证码" :disabled="verifyPhoneSteps != 3")
                  el-button.ml-2(type="primary" @click='submitPhone("verifyPhoneForm")',:loading='submitEmailLoading') 发送验证碼
              el-form-item
                el-button.w-100(type="primary") 提交
            el-form(v-if='verifyPhoneSteps==3', :model="verifyPhoneForm" ref="verifyPhoneCodeForm")
              el-form-item(prop="Phone")
                el-input(v-model.trim="verifyPhoneForm.Phone" disabled)
              el-form-item
                el-form.d-flex
                  el-input(type='text' v-model.trim='verifyPhoneCodeForm.Code' placeholder="请输入验证码")
                  el-button.ml-2(type="primary", :loading='submitPhoneLoading' disabled) {{countDown}}秒后重发
              el-form-item
                el-button.w-100(type="primary" @click='submitPhoneCode("verifyPhoneCodeForm")') 提交
          //郵箱
          el-dialog(title="邮箱地址" :visible.sync="EmailFormVisible")
            el-form(v-if='verifyEmailSteps == 2', :model="verifyEmailForm" :rules="verifyEmailFormRules" ref="verifyEmailForm" @submit.native.prevent='')
              el-form-item(prop="Email")
                el-input(type='text',v-model.trim="verifyEmailForm.Email", placeholder="请输入邮箱", autocomplete="off")
              el-form-item
                el-form.d-flex
                  el-input(type='text' v-model.trim='verifyEmailCodeForm.Code' placeholder="点击右方按钮发送验证码" :disabled="verifyEmailSteps != 3")
                  el-button.ml-2(type="primary" @click='submitEmail("verifyEmailForm")',:loading='submitEmailLoading') 发送验证碼
              el-form-item
                el-button.w-100(type="primary") 提交
            el-form(v-if='verifyEmailSteps==3', :model="verifyEmailForm" ref="verifyEmailCodeForm")
              el-form-item(prop="Email")
                el-input(v-model.trim="verifyEmailForm.Email" disabled)
              el-form-item
                el-form.d-flex
                  el-input(type='text' v-model.trim='verifyEmailCodeForm.Code' placeholder="请输入验证码")
                  el-button.ml-2(type="primary", :loading='submitEmailLoading' disabled) {{countDownForEmail}}秒后重发
              el-form-item
                el-button.w-100(type="primary" @click='submitEmailCode("verifyEmailCodeForm")') 提交
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import jwtDecode from 'jwt-decode';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
let loopForEmail;
export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!(/^(13|14|15|16|18|19)\d{9}$/.test(value))) {
        callback(new Error('请确认手机号码'));
      } else {
        callback();
      }
    };
    return {
      showBirthdayTips: true,
      PhoneFormVisible: false,
      EmailFormVisible: false,
      submitPhoneLoading: false,
      submitPhoneCodeLoading: false,
      showEmailModal: false,
      submitEmailLoading: false,
      submitEmailCodeLoading: false,
      countDown: 0,
      countDownForEmail: 0,
      submitLoading: false,
      verifyPhoneSteps: 1,
      verifyEmailSteps: 1,
      memberForm: {
        UserName: this.$store.state.member.MemberData.UserName,
        RealName: this.$store.state.member.MemberData.RealName,
        Sex: this.$store.state.member.MemberData.Sex,
        Birthday: this.$store.state.member.MemberData.Birthday !== '0000-00-00' ? this.$store.state.member.MemberData.Birthday : '',
        Phone: this.$store.state.member.MemberData.Phone,
        Email: this.$store.state.member.MemberData.Email,
      },
      memberFormRules: {
        Email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        Phone: [{ message: '请输入手机号码', trigger: 'blur' }, { validator: checkPhone, trigger: ['blur', 'change'] }],
      },
      verifyPhoneForm: {
        UserName: this.$store.state.member.MemberData.UserName,
        Phone: this.$store.state.member.MemberData.Phone,
      },
      verifyPhoneFormRules: {
        Phone: [{ message: '请输入手机号码', trigger: 'blur' }, { validator: checkPhone, trigger: ['blur', 'change'] }],
      },
      verifyPhoneCodeForm: {
        Code: '',
        VertifyInfo: '',
      },
      verifyEmailForm: {
        UserName: this.$store.state.member.MemberData.UserName,
        Email: this.$store.state.member.MemberData.Email,
      },
      verifyEmailFormRules: {
        Email: [{
          required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'],
        }],
      },
      verifyEmailCodeForm: {
        Code: '',
        VertifyInfo: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > (Date.now() - ((18 * 365 * 24 * 60 * 60 * 1000) + (4 * 24 * 60 * 60 * 1000)));
        },
      },
    };
  },
  watch: {
    MemberData(value) {
      this.memberForm.UserName = value.UserName;
      this.memberForm.RealName = value.RealName;
      this.memberForm.Sex = value.Sex;
      this.memberForm.Birthday = (value.Birthday !== '0000-00-00') ? value.Birthday : '';
      this.memberForm.Phone = value.Phone;
      this.memberForm.Email = value.Email;
      this.verifyPhoneForm.UserName = value.UserName;
      this.verifyPhoneForm.Phone = window.localStorage.getItem('verifyPhone') ? window.localStorage.getItem('verifyPhone') : value.Phone;
      this.verifyEmailForm.UserName = value.UserName;
      this.verifyEmailForm.Email = window.localStorage.getItem('verifyEmail') ? window.localStorage.getItem('verifyEmail') : value.Email;
    },
    countDown(value) {
      const vm = this;
      if(value == 0) {
        vm.verifyPhoneForm.Phone = vm.$store.state.member.MemberData.Phone;
        window.localStorage.removeItem('verifyPhone');
      }
    },
    countDownForEmail(value) {
      const vm = this;
      if(value == 0) {
        vm.verifyEmailForm.Email = vm.$store.state.member.MemberData.Email;
        window.localStorage.removeItem('verifyEmail');
      }
    }
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
    firstTimeSetRealName() {
      if (this.$store.state.member.MemberData.RealName === '') {
        return false;
      }
      return true;
    },
  },
  methods: {
    submit(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        vm.submitLoading = true;
        this.$store.dispatch('member/MemberDataUpdate', this.memberForm)
          .then((res) => {
            vm.submitLoading = false;
            if (res.data.status === 1) {
              vm.$message({ message: '已成功修改会员资料', type: 'success' });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              vm.$message({
                showClose: true,
                message: res.data.error_message,
                type: 'error',
                duration: 1500,
                center: true,
              });
            }
          });
      });
    },
    loopTime(checktime = 90) {
      const vm = this;
      this.countDown = checktime;
      loop = setInterval(() => {
        vm.countDown -= 1;
        if (vm.countDown <= 0) {
          vm.submitPhoneLoading = false;
          vm.submitPhoneCodeLoading = false;
          vm.verifyPhoneSteps = 2;
          window.localStorage.removeItem('verifyPhone');
          clearInterval(loop);
        }
      }, 1000);
    },
    loopTimeForEmail(checktime = 90) {
      const vm = this;
      this.countDownForEmail = checktime;
      loopForEmail = setInterval(() => {
        vm.countDownForEmail -= 1;
        if (vm.countDownForEmail <= 0) {
          vm.verifyEmailSteps = 2;
          vm.submitEmailLoading = false;
          vm.submitEmailCodeLoading = false;
          window.localStorage.removeItem('verifyEmail');
          clearInterval(loopForEmail);
        }
      }, 1000);
    },
    modifyPhone() {
      const vm = this;
      vm.PhoneFormVisible = true;
      if(vm.countDown != 0) {
        vm.verifyPhoneSteps = 3;
      } else {
        vm.verifyPhoneSteps = 2;
      }
    },
    submitPhone(form) {
      const vm = this;
      this.submitPhoneLoading = true;
      if(this.verifyPhoneForm.Phone === null) {
        this.submitPhoneLoading = false;
      } else {
        this.$refs[form].validate((valid) => {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/SendVertifyCode`, this.verifyPhoneForm)
            .then((res) => {
              console.log(res);
              vm.submitPhoneLoading = false;
              if (res.data.status === 1) {
                const now = new Date();
                const time = now.getTime();
                const expiredTime = time + 1000*90;
                this.addCookie(`${vm.$store.state.member.UserId}_Phone`, expiredTime, 90);
                window.localStorage.setItem('verifyPhone', this.verifyPhoneForm.Phone);
                vm.verifyPhoneCodeForm.VertifyInfo = vm.verifyPhoneForm.Phone;
                vm.verifyPhoneSteps = 3;
                vm.loopTime();
              } else {
                vm.$message({
                  showClose: true,
                  message: res.data.error_message,
                  type: 'error',
                  duration: 1500,
                  center: true,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    },
    submitPhoneCode(form) {
      const vm = this;
      this.submitPhoneCodeLoading = true;
      this.$refs[form].validate((valid) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/PhoneVertify`, this.verifyPhoneCodeForm)
          .then((res) => {
            vm.submitPhoneCodeLoading = false;
            if (res.data.status === 1) {
              vm.verifyPhoneSteps = 1;
              window.localStorage.removeItem('verifyPhone');
              this.addCookie(`${vm.$store.state.member.UserId}_Phone`, '', 0.05);
              window.location.reload();
            } else {
              vm.$message({
                showClose: true,
                message: res.data.error_message,
                type: 'error',
                duration: 1500,
                center: true,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    modifyEmail() {
      const vm = this;
      vm.EmailFormVisible = true;
      if(vm.countDownForEmail != 0) {
        vm.verifyEmailSteps = 3;
      } else {
        vm.verifyEmailSteps = 2;
      }
    },
    submitEmail(form) {
      const vm = this;
      this.submitEmailLoading = true;
      if(this.verifyEmailForm.Email === null) {
        this.submitEmailLoading = false;
      } else {
        this.$refs[form].validate((valid) => {
          axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/SendVertifyCode`, this.verifyEmailForm)
            .then((res) => {
              console.log(res);
              vm.submitEmailLoading = false;
              if (res.data.status === 1) {
                const now = new Date();
                const time = now.getTime();
                const expiredTime = time + 1000*90;
                this.addCookie(`${vm.$store.state.member.UserId}_Email`, expiredTime, 90);
                window.localStorage.setItem('verifyEmail', this.verifyEmailForm.Email);
                vm.loopTimeForEmail();
                vm.verifyEmailCodeForm.VertifyInfo = vm.verifyEmailForm.Email;
                vm.verifyEmailSteps = 3;
              } else {
                vm.$message({
                  showClose: true,
                  message: res.data.error_message,
                  type: 'error',
                  duration: 1500,
                  center: true,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    },
    submitEmailCode(form) {
      const vm = this;
      this.submitEmailCodeLoading = true;
      this.$refs[form].validate((valid) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/EmailVertify`, this.verifyEmailCodeForm)
          .then((res) => {
            vm.submitEmailCodeLoading = false;
            if (res.data.status === 1) {
              vm.verifyEmailSteps = 1;
              window.localStorage.removeItem('verifyEmail');
              this.addCookie(`${vm.$store.state.member.UserId}_Email`, '', 0.05);
              window.location.reload();
            } else {
              vm.$message({
                showClose: true,
                message: res.data.error_message,
                type: 'error',
                duration: 1500,
                center: true,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    addCookie(name, value, expiresSeconds) {
      if (expiresSeconds > 0) {
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000 * expiresSeconds;
        now.setTime(expireTime);
        document.cookie = `${name}=${escape(value)};expires=${now.toUTCString()};path=/`;
      }
    },
    getCookie(name) {
      const strCookie = document.cookie;
      const arrCookie = strCookie.split(';');
      for (let i = 0; i < arrCookie.length; i++) {
        const arr = arrCookie[i].split('=');
        if (arr[0].trim() == name.trim()) {
          return unescape(arr[1]);
          break;
        }
      }
    },
  },
  mounted() {
    const vm = this;
    const v_email = this.getCookie(`${vm.$store.state.member.UserId}_Email`) ? this.getCookie(`${vm.$store.state.member.UserId}_Email`) : 0;
    const v_phone = this.getCookie(`${vm.$store.state.member.UserId}_Phone`) ? this.getCookie(`${vm.$store.state.member.UserId}_Phone`) : 0;
    const now = new Date();
    const time = now.getTime();
    const checkEmailTime = Math.floor((Number(v_email) - time) / 1000);
    const checkPhoneTime = Math.floor((Number(v_phone) - time) / 1000);
    // 檢查email
    if (v_email > 0 && checkEmailTime > 0) {
      vm.verifyEmailForm.Email = window.localStorage.getItem('verifyEmail');
      vm.verifyEmailCodeForm.VertifyInfo = vm.verifyEmailForm.Email;
      this.loopTimeForEmail(checkEmailTime)
      vm.verifyEmailSteps = 3;
    }
    // 檢查phone
    if (v_phone > 0 && checkPhoneTime > 0) {
      vm.verifyPhoneForm.Phone = window.localStorage.getItem('verifyPhone')
      vm.verifyPhoneCodeForm.VertifyInfo = vm.verifyPhoneForm.Phone;
      this.loopTime(checkPhoneTime)
      vm.verifyPhoneSteps = 3;
    }
  },
  created() {
    clearInterval(loop);
  },
  beforeDestroy() {
    clearInterval(loop);
  },
};
</script>
<style lang="scss" scoped>
.birthDayTips{
  margin: 5px 10px 0 0;
}
</style>
