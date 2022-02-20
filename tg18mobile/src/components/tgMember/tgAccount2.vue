<template lang='pug'>
  div
    .memberpassword
      .memberinput
        ul
          li
            input.password(type='Password'
                              v-model.trim='OldPassword'
                              placeholder='输入当前密码' 
                              v-validate='"required|Psw18R"'
                              name='OldPassword'
                              data-vv-as='请输入正确的密码'
                              :class='{"input": true, "error": errors.has("OldPassword")}'
                              @blur='handleFormKeyIn("OldPassword")')
          .error(v-if='showError' v-show='errors.has("OldPassword")')  {{ errors.first('OldPassword') }}
          li
            input.password(type='Password'
                            v-model.trim='Password'
                            placeholder='请输入新密码' 
                            v-validate='"required|Psw18"'
                            name='Password'
                            data-vv-as='请输入8～20字母和数字或下划线的组合、不含特殊符号'
                            :class='{"input": true, "error": errors.has("Password")}'
                            @blur='handleFormKeyIn("Password")')
          .error(v-if='showError' v-show='errors.has("Password")')  {{ errors.first('Password') }}
          li
            input.password(type='Password'
                            v-model.trim='ckPassword'
                            placeholder='再次输入新密码' 
                            v-validate='"required|Psw18Check|confirmed:"+Password'
                            name='ckPassword'
                            data-vv-as='请输入新密码'
                            :class='{"input": true, "error": errors.has("ckPassword")}'
                            @blur='handleFormKeyIn("ckPassword")')
          .error(v-if='showError' v-show='errors.has("ckPassword")')  {{ errors.first('ckPassword') }}
        p.text-danger(v-if='getMemberDataUpdateErrorMessage') {{getMemberDataUpdateErrorMessage}}
        button.memberpassword_btn(@click.prevent="submit" type="button" :loading="submitLoading") 提交
</template> 
<script>
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      submitLoading: false,
      OldPassword: '',
      Password: '',
      ckPassword: '',
      disMatch: false,
      showError: true,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
    getMemberDataUpdateErrorMessage() {
      return this.$store.state.member.MemberDataUpdateErrorMessage;
    },
  },
  methods: {  
    resetIsMatch() {
      this.$store.state.member.MemberDataUpdateErrorMessage = '';
    },
    handleFormKeyIn(name) {
      this.$validator.validate(name);
    },
    submit() {
      this.showError = true;
      this.$validator.validate().then((result) => {
        if (!result) {
          // this.showeErorMsg = true
        } else if (this.Password === this.ckPassword) {
          const vm = this;
          const payload = {};
          payload.OldPassword = this.OldPassword;
          payload.Password = this.Password;
          payload.VertifyInfo = this.UserName;
          vm.submitLoading = true;
          this.$store.dispatch('member/Member_AllMemberPasswordReset', payload)
            .then((res) => {
              vm.submitLoading = false;
              vm.showError = false;
              if (res.data.status === 1) {
                vm.OldPassword = '';
                vm.Password = '';
                vm.ckPassword = '';
                vm.$store.state.member.MemberDataUpdateErrorMessage = '';
                vm.$message({
                  // message: '密码修改成功，系统将自动登出，请使用新密码重新登入。',
                  message: '密码修改成功。',
                  type: 'success',
                  duration: 1500,
                  center: true,
                  onClose() {
                    // vm.$store.dispatch('member/MemberLogout');
                    router.push('/member');
                  },
                });
              } else {
                vm.$store.state.member.MemberDataUpdateErrorMessage = res.data.error_message;
              }
            });
        } else {
          this.$store.state.member.MemberDataUpdateErrorMessage = '请确认输入两次密码输入一致';
        }
      });			
    },
  },
  mounted() {
    this.$store.state.member.MemberDataUpdateErrorMessage = '';
  },
};
</script>
<style lang="scss">
</style>
