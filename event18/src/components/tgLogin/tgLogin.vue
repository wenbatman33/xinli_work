<template lang='pug'>
div
  h3.my-3.text-center 18老虎城会员登录
  el-form(:model="memberForm"  :rules="memberFormRules" ref="memberForm" @keyup.enter.native='submit')
    el-form-item(prop="UserName")
      el-input(type="text" v-model="memberForm.UserName" auto-complete="off" placeholder="请输入用户名")
    el-form-item(prop="Password")
      el-input(type="password" v-model="memberForm.Password" auto-complete="off" placeholder="请输入密码")
    el-form-item(prop="keepData")
      el-checkbox.checkbox_word(v-model="memberForm.keepData" auto-complete="off" @change="keepUserData") 记住我，提醒：保管好账号密码及重要绑定信息
    el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
    el-form-item
      button.col-12.btn.btn-tgBlueDark(@click.prevent="submit" type="button")
        span 立即登录
    hr
    h3.my-3.text-center 还不是18老虎城用户！？
    el-form-item.registerbtn
      a.col-12.linkRed(href='https://www.18tiger.net/register' target='_block')
        span 注册18老虎城用户
</template>
<script>
import jwt from 'jwt-simple';
// import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_userName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!(/^[a-zA-Z0-9_]{5,16}$/.test(value))) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    return {
      getLoginNullData: false,
      error_message: '',
      memberForm: {
        keepData: false,
        UserName: '',
        Password: '',
      },
      memberFormRules: {
        UserName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, { validator: check_userName, trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '输入 5～15 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        Password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, {
          min: 8, max: 20, message: '请输入正确的密码', trigger: 'blur', 
        }],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  methods: {
    keepUserData() {
      this.$store.dispatch('member/MemberKeepUserLoginID', this.memberForm.keepData);
    },
    submit() {
      const vm = this;
      this.$store.dispatch('member/MemberLogin', this.memberForm)
        .then((res) => {
          if (res.data.status === 1) {
            console.log(res);
            vm.$emit('loginDialogHide');
          } else {
            vm.error_message = res.data.error_message;
          }
        });
    },
    checkLogin() {
      this.$message({
        message: '登入成功',
        showClose: true,
        duration: 1000,
        type: 'success',
      });
    },
  },
  mounted() {
    if (window.localStorage.tgUserName) {
      this.memberForm.UserName = window.localStorage.tgUserName;
      this.memberForm.keepData = true;
    }
    if (this.$store.state.member.memberLogined === true) {
      // router.push('/index');
    }
  },
};

</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.checkbox_word {
  width: 100%;
  .el-checkbox__label {
    width: 95%;
    white-space: normal;
  }
}
.registerbtn {
  .linkRed {
    display: inline-block;
    width: 100%;
    padding: 10px 30px;
    background: linear-gradient(90deg, rgba(97,0,0,1), rgba(255,89,0,1));
    color: rgba(255,255,255,1);
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    border: none;
    border-radius: 100px;
    position: relative;
    z-index: 100;
  };
}
</style>
