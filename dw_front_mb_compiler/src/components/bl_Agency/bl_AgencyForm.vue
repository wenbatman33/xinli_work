<template lang='pug'>
.AgencyForm
  .AgencyFormStep1(v-if='AgencyFormStep==1')
    .title.my-5 填写代理申请
    .d-flex.justify-content-center
      .applyAgencyForm
        el-form(:model="applyAgencyForm"  :rules="applyAgencyFormRules" ref="registerForm")
          el-form-item.col-12.formItem(prop="account")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.account'
                      placeholder='输入代理帐号'
                      name='account')
          div.fieldDesc.mb-3
            small 审核通过后即为您登录代理后台的账号
          el-form-item.col-12.formItem(prop="code")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.code'
                      placeholder='输入代理编号'
                      name='code')
          div.fieldDesc
            small 审核通过后，代理编号将使用在您的推广网址上
            br
            small (例：https://www.dw310.com/?agency=代理编号)
          el-form-item.col-12.formItem(prop="name")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.name'
                      placeholder='输入您的真实姓名'
                      name='name')
          div.fieldDesc
            small 必须与提款时的银行卡相同，请填写真实姓名
          el-form-item.col-12.formItem(prop="phone")
            el-input(type='tel'
                      v-model.trim='applyAgencyForm.phone'
                      placeholder='输入手机号码'
                      maxlength='11'
                      name='phone')
          el-form-item.col-12.formItem(prop="email")
            el-input(type='email'
                      v-model.trim='applyAgencyForm.email'
                      placeholder='输入邮箱'
                      name='email')
          el-form-item.col-12.formItem(prop="qq")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.qq'
                      placeholder='输入 QQ 号码'
                      name='qq')
          el-form-item.col-12.formItem(prop="verifyCode")
            .d-flex
              el-input(type='text'
                        v-model.trim='verifyCodeToUpperCase'
                        placeholder='输入验证码'
                        debounce='300'
                        name='verifyCode')
              bl_ImageCodeVerify.ml-2(@imgCode='imgCode' ref='imgVerify')
          el-form-item.col-12.formItem(prop="content")
            el-input(type='textarea'
                      :rows='3'
                      v-model.trim='applyAgencyForm.content'
                      placeholder='请简单描述您的推广方式或资源'
                      name='content')
          el-form-item.col-12.formItem
            el-button.AgencyBtn.btn.w-100(type='primary', @click.prevent='submit("registerForm")')
              span 注册
          .col-12.formItem
            el-button.AgencyBtn.btn.w-100(type='primary', @click='gotoIndex')
              span 返回首页
  .AgencyFormStep2(v-if='AgencyFormStep==2')
    .title.my-5 申请提交成功
    img(:src='picImg')
    p.text-center
      .AgencyTableLine
        span 感谢您选择 梦工厂 作为您的事业伙伴，
        br
        span 代理专员将于24小时内与您联系，
        br
        span 如未收到回复请透过下列方式联系我们，谢谢！
        br
        span Skype：DW Daili
        br
        span mail：
          a(href='mailto:daili@dw310.com') daili@dw310.com
    .col-12.my-5
      el-button.AgencyBtn.btn.w-50(type='primary', @click='gotoIndex')
        span 返回首页

</template>
<script>
import axios from 'axios';
import bl_ImageCodeVerify from '@/components/bl_ImageVerify/bl_ImageCodeVerify.vue';

export default {
  components: {
    bl_ImageCodeVerify,
  },
  data() {
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理帐号'));
      } else if (!/^[a-zA-Z0-9_]{5,16}$/.test(value)) {
        callback(new Error('请输入5～15字符（A-Z ,a-z,0-9）'));
      } else {
        callback();
      }
    };
    const check_code = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理编号'));
      } else if (!/^[a-zA-Z0-9_]{1,}$/.test(value)) {
        callback(new Error('可输入A-Z, a-z, 0-9、不限字符数'));
      } else {
        callback();
      }
    };
    const check_RealName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入真实姓名'));
      } else if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error('请输入中文真实姓名'));
      } else {
        callback();
      }
    };
    const check_phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号'));
      } else if (!/^(1)\d{10}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const check_VerifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.imgVerifyCode) {
        callback(new Error('验证码不正确'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'second',
      imgVerifyCode: '',
      AgencyFormStep: 1,
      picImg: `${window.CDN_ASSETS}/static/img/agency/pic-waiting.png`,
      applyAgencyForm: {
        account: '',
        name: '',
        verifyCode: '',
        code: '',
        phone: '',
        email: '',
        qq: '',
        content: '',
      },
      applyAgencyFormRules: {
        account: [
          {
            required: true,
            message: '请输入代理帐号',
            trigger: ['blur', 'change'],
          },
          { validator: check_account, trigger: ['blur', 'change'] },
        ],
        code: [
          {
            required: true,
            message: '请输入代理编号',
            trigger: ['blur', 'change'],
          },
          { validator: check_code, trigger: ['blur', 'change'] },
        ],
        name: [
          {
            required: true,
            message: '请输入真实姓名',
            trigger: ['blur', 'change'],
          },
          { validator: check_RealName, trigger: ['blur', 'change'] },
        ],
        phone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: ['blur', 'change'],
          },
          { validator: check_phone, trigger: ['blur', 'change'] },
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        ],
        qq: [
          {
            required: true,
            message: '请输入QQ帐号',
            trigger: ['blur', 'change'],
          },
        ],
        content: [
          {
            required: true,
            message: '请输推广方式描述',
            trigger: ['blur', 'change'],
          },
        ],
        verifyCode: [
          { required: true, message: '请输验证码', trigger: ['blur'] },
          { validator: check_VerifyCode, trigger: ['blur'] },
        ],
      },
    };
  },
  computed: {
    verifyCodeToUpperCase: {
      get() {
        return this.applyAgencyForm.verifyCode;
      },
      set(val) {
        this.applyAgencyForm.verifyCode = val.toUpperCase();
      },
    },
  },
  methods: {
    // for appteam methods
    app_gohome() {
      console.log('app_gohome');
    },
    back() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_gohome();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_gohome.postMessage('app_gohome');
        } catch (error) {
          console.log(error);
        }
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    imgCode(code) {
      this.imgVerifyCode = code;
    },
    gotoIndex() {
      this.back();
      this.$router.push({ path: '/' });
    },
    submit(form) {
      const vm = this;
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 必須刪除 verifyCode  不然會出錯
          delete this.applyAgencyForm.verifyCode;
          axios
            .post(
              `${window.APIHOST}/api/Agency/AgencyApply`,
              this.applyAgencyForm,
            )
            .then((res) => {
              if (res.data.status === 1) {
                this.$message({
                  message: '申请成功',
                  type: 'success',
                });
                vm.AgencyFormStep = 2;
                vm.applyAgencyForm = {
                  account: '',
                  name: '',
                  verifyCode: '',
                  code: '',
                  phone: '',
                  email: '',
                  qq: '',
                  content: '',
                };
              } else {
                // this.$message({
                //   message: res.data.error_message,
                //   type: 'error',
                // });
              }
            });
        }
        return false;
      });
    },
  },
  mounted() {
    // for appteam methods
    window.app_gohome = this.app_gohome;
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  color: $theme;
}
.applyAgencyForm {
  width: 600px;
}
.VIPPage {
  background: #000;
}
.VIPBanner {
  img {
    width: 100%;
  }
}
.VIPRule {
  color: $theme;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
}
table {
  color: #fff;
  width: 100%;
  border: 1px solid $theme;
  border-collapse: collapse;
  text-align: center;
  font-size: 13px;
  font-weight: 200;
  th {
    padding: 12px 5px;
    background-image: linear-gradient(-90deg, #07182e 0%, #03437b 100%);
    border: 1px solid $theme;
    vertical-align: middle;
  }
  td {
    padding: 12px 5px;
    background: none;
    border: 1px solid $theme;
    vertical-align: middle;
  }
  .title {
    color: $theme;
  }
}
.AgencyTableLine {
  padding: 10px 0;
  color: #fff;
  width: 350px;
  margin: auto;
  border-top: 1px solid $theme;
  border-bottom: 1px solid $theme;
}
.fieldDesc {
  // position: absolute;
  margin-top: -30px;
  margin-bottom: 20px;
  color: white;
  text-align: left;
}
.formItem{
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  /deep/ .el-form-item__error{
    right: 0;
    text-align: right;
  }
}
.AgencyBtn{
  color: #fff;
  background:$theme;
}
</style>
