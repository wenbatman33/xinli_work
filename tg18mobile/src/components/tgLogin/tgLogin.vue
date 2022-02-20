<template lang='pug'>
.d-flex.justify-content-center.flex-column.justify-content-around
  h3.text-center 登录
  form(@keyup.enter.prevent="submit").el-form
    .el-form-item
      input.el-input__inner(type="text"
                            v-model="member.UserName"
                            placeholder="会员账号"
                            v-validate='"required|AccountV"'
                            name='userName'
                            data-vv-as='会员账号'
                            :class='{"input": true, "error": errors.has("userName")}'
                            @keyup="handleFormKeyIn")
    .error(v-show='errors.has("userName")')  {{ errors.first('userName') }}
    .el-form-item
      input.el-input__inner(type="password" v-model="member.Password" placeholder="密码")
    .el-form-item
      el-checkbox(v-model="member.keepData" @change="keepUserData") 记住我，提醒：保管好账号密码及重要绑定信息
    .el-form-item
      .row
        .col-12.mt-3.mb-3(v-if='getMemberLoginErrorMessage')  
          small.error {{ getMemberLoginErrorMessage }}
        .col-12.mt-2.mb-2
          button.col-12.btn.btn-tgBlueDark(@click.prevent="submit" type="button")
            span 立即登入
        .col-12.mt-2.mb-2.text-center
          router-link(to="/forget" v-on:click.native='GA_login_forgotpwmobile')
            small 忘记密码
          span   | 
          router-link(to="/register" v-on:click.native='GA_login_registermobile')
            small 注册账户
</template>
<script>
import jwt from 'jwt-simple';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      getLoginNullData: false,
      member: {
        keepData: false,
        UserName: '',
        Password: '',
      },
      showeErorMsg: false,
    };
  },
  computed: {
    getMemberLoginErrorMessage() {
      return this.$store.state.member.MemberLoginErrorMessage;
    },
  },
  methods: {
    keepUserData() {
      this.$store.dispatch('member/MemberKeepUserLoginID', this.member.keepData);
    },
    submit() {      
      this.$validator.validate().then((result) => {
        if (!result) {
          this.showeErorMsg = true;
        } else {
          this.showeErorMsg = false;
          this.$store.dispatch('member/MemberLogin', this.member);
        }
      });
    },
  },
  mounted() {
    if (window.localStorage.tgUserName) {
      this.member.UserName = window.localStorage.tgUserName;
      this.member.keepData = true;
    }
    if (this.$store.state.member.memberLogined === true) {
      router.push('/index');
    }
  },
};

</script>
<style lang="scss" scoped>

</style>
