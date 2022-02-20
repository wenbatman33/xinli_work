<template lang='pug'>
.AgencyForm
  .AgencyFormStep1(v-if='AgencyFormStep==1')
    h2.my-5 填写代理申请 
    .d-flex.justify-content-center
      .applyAgencyForm
        el-form(:model="applyAgencyForm"  :rules="applyAgencyFormRules" ref="registerForm")
          el-form-item.col-12(prop="AgencyId")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.AgencyId'
                      placeholder='输入代理帐号'
                      name='AgencyId')
          //- el-form-item.col-12(prop="AgencyName")
          //-   el-input(type='text'
          //-             v-model.trim='applyAgencyForm.AgencyName'
          //-             placeholder='代理帐号'
          //-             name='AgencyName')
          el-form-item.col-12(prop="RealName")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.RealName'
                      placeholder='输入您的真实姓名'
                      name='RealName')
          el-form-item.col-12(prop="Phone")
            el-input(type='tel'
                      v-model.trim='applyAgencyForm.Phone'
                      placeholder='输入手机号码'
                      maxlength='11'
                      name='Phone')
          el-form-item.col-12(prop="QQAccount")
            el-input(type='text'
                      v-model.trim='applyAgencyForm.QQAccount'
                      placeholder='输入 QQ 号码'
                      name='QQAccount')
          el-form-item.col-12(prop="verifyCode")
            .d-flex
              el-input(type='text'
                        v-model.trim='verifyCodeToUpperCase'
                        placeholder='输入验证码'
                        debounce='300'
                        name='verifyCode')
              tgVerifyImg.ml-2(@imgCode='imgCode' ref='imgVerify')
          el-form-item.col-12(prop="Content")
            el-input(type='textarea'
                      :rows='3'
                      v-model.trim='applyAgencyForm.Content'
                      placeholder='请简单描述您的推广方式或资源'
                      name='Content')
          el-form-item.col-12
            button.col-12.btn.btn-tgBlueDark(@click.prevent='submit("registerForm")' type='button')
              span 注册
  .AgencyFormStep2(v-if='AgencyFormStep==2')
    h2.my-5 申请提交成功
    img(src='/static/img/tgAgency/pic-reward.png')
    p.text-center
      .AgencyTableLine
        span 感谢您选择 18老虎城 作为您的事业伙伴，
        br
        span 代理专员将于 24 小时内与您联系，
        br
        span 如未收到回复请透过 QQ 号：3387634933 联系我们，谢谢 ！

</template>
<script>
import axios from 'axios';
import tgVerifyImg from '@/components/tgVerifyImg/tgVerifyImg.vue';

export default {
  components: {
    tgVerifyImg,
  },
  data() {
    const check_AgencyId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理帐号'));
      } else if (!(/^[a-zA-Z0-9_]{5,16}$/.test(value))) {
        callback(new Error('请输入5～15字符（A-Z ,a-z,0-9）'));
      } else {
        callback();
      }
    };
    const check_RealName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入真实姓名'));
      } else if (!(/^[\u4e00-\u9fa5]+$/.test(value))) {
        callback(new Error('请输入中文真实姓名'));
      } else {
        callback();
      }
    };
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号'));
      } else if (!(/^(13|14|15|16|18|19)\d{9}$/.test(value))) {
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
      applyAgencyForm: {
        AgencyId: '',
        RealName: '',
        Phone: '',
        QQAccount: '',
        Content: '',
        verifyCode: '',
      },
      applyAgencyFormRules: {
        AgencyId: [
          { required: true, message: '请输入代理帐号', trigger: ['blur', 'change'] },
          { validator: check_AgencyId, trigger: ['blur', 'change'] }, 
        ],
        RealName: [
          { required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] },
          { validator: check_RealName, trigger: ['blur', 'change'] }, 
        ],
        Phone: [
          { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] }, 
          { validator: check_Phone, trigger: ['blur', 'change'] },
        ],
        QQAccount: [{ required: true, message: '请输入QQ帐号', trigger: ['blur', 'change'] }],
        Content: [{ required: true, message: '请输推广方式描述', trigger: ['blur', 'change'] }],
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    imgCode(code) {
      this.imgVerifyCode = code;
    },
    submit(form) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/ApplyAgency`, this.applyAgencyForm)
        .then((res) => {
          if (res.data.status === 1) {
            // this.$message({
            //   message: '申请成功',
            //   type: 'success',
            // });
            vm.AgencyFormStep = 2;
            vm.applyAgencyForm = {
              AgencyId: '',
              RealName: '',
              Phone: '',
              QQAccount: '',
              Content: '',
              verifyCode: '',
            };
          } else {
            this.$message({
              showClose: true,
              message: res.data.error_message,
              type: 'error',
            });
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
  h2 {
    color: #dfab31;
  }
  .applyAgencyForm{
    width: 600px;
  }
  .VIPPage{
    background: #000;
  }
  .VIPBanner{
    img{
      width: 100%;
    }
  }
  .VIPRule{
    color: #4088C7;
    background: rgba(0,0,0,0.4);
    border-radius: 12px;
  }
  table{
    color: #fff;
    width: 100%;
    border: 1px solid #BA924E;
    border-collapse: collapse;
    text-align: center;
    font-size: 13px;
    font-weight: 200;
    th{
      padding: 12px 5px;
      background-image: linear-gradient(-90deg, #07182E 0%, #03437B 100%);
      border: 1px solid #BA924E;
      vertical-align: middle;
    }
    td{
      padding: 12px 5px;
      background: none;
      border: 1px solid #BA924E;
      vertical-align: middle;
    }
    .title{
      color: #BA924E;
    }
  }
  .AgencyTableLine{
    padding: 10px 0;
    color: #fff;
    width: 350px;
    margin: auto;
    border-top: 1px solid #dfab31;
    border-bottom: 1px solid #dfab31;
  }
</style>
