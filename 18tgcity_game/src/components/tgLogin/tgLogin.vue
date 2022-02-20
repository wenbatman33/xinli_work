<template lang='pug'>
div
  h3.my-3.text-center 登录
  el-form(:model="memberForm"  :rules="memberFormRules" ref="memberForm" @keyup.enter.native='submit')
    el-form-item(prop="UserName")
      el-input(type="text" v-model="memberForm.UserName" placeholder="用户名")
    el-form-item(prop="Password")
      el-input(type="password" v-model="memberForm.Password" placeholder="密码")
    el-form-item(prop="keepData")
      el-checkbox(v-model="memberForm.keepData" @change="keepUserData") 记住我，提醒：保管好账号密码及重要绑定信息
    el-form-item
      button.col-12.btn.btn-tgBlueDark(@click.prevent="submit" type="button")
        span 立即登录
    el-alert(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
    el-form-item
      .col-12.text-center
        router-link(to="/forget")
          small 忘记密码
        span   |
        router-link(to="/register")
          small 注册账号
</template>
<script>
import jwt from 'jwt-simple';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      getLoginNullData: false,
      error_message: '',
      memberForm: {
        keepData: false,
        UserName: '',
        Password: '',
      },
      memberFormRules: {
        UserName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '输入 5～15 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        Password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, {
          min: 8, max: 20, message: '输入 8～20 字符如：A～Z、a～z、0～9', trigger: 'blur',
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
            // 更換在線客服UserName
            window.LC_API.set_custom_variables([{ name: vm.UserName }]);
            if (vm.getUrlID === 'login') {
              router.push('/');
            } else {
              vm.$emit('loginDialogHide');
            }
            window.location.reload();
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
      router.push('/index');
    }
  },
};

</script>
<style lang="scss" scoped>

</style>
