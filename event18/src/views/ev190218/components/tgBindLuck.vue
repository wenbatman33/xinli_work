<template lang='pug'>
div
  h3.my-3.text-center 绑定新利18Luck用户
  el-form(:model="memberForm" ref="memberForm" @keyup.enter.native='submit')
    el-form-item(prop="UserName")
      el-input(type="text" v-model="memberForm.UserName" auto-complete="off" placeholder="请输入新利18用户名")
    el-form-item(prop="PhoneNum")
      el-input(type="PhoneNum" v-model="memberForm.PhoneNum" auto-complete="off" placeholder="请输入新利18手机号")
    el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
    el-form-item
      button.col-12.btn(@click.prevent="submit" type="button")
        span 绑 定
    hr
    h3.my-3.text-center 沒有新利18Luck用户！？
    el-form-item
      a.col-12.linkRed(v-if='isMobile' href='https://m.xl18.org/register' target='_block')
        span 注册新利用户
      a.col-12.linkRed(v-else href='https://www.xl18.org/zh-cn/member/MemberRegister.aspx' target='_block')
        span 注册新利用户
</template>
<script>
import axios from 'axios';
import jwt from 'jwt-simple';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isMobile: false,
      getLoginNullData: false,
      error_message: '',
      memberForm: {
        UserName: '',
        PhoneNum: '',
      },
    };
  },
  mounted() {
    if (window.localStorage.tgUserName) {
      this.memberForm.UserName = window.localStorage.tgUserName;
    }
    if (this.$store.state.member.memberLogined === true) {
      // router.push('/index');
    }
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    submit() {
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      payload.LuckUserName = this.memberForm.UserName;
      payload.Phone = this.memberForm.PhoneNum;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event021_Bind/`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            // console.log(res);
            vm.$emit('getBindReback', 'success');
            vm.$emit('luckDialogHide');
            vm.message(res.data.message);
          } else {
            vm.errorMessage(res.data.error_message);
          }
        });
    },
    message(msg) {
      console.log(msg);
      this.$message({
        showClose: true,
        message: msg,
        type: 'success',
      });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
      });
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
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
</style>
