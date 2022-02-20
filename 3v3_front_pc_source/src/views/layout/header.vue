<template lang="pug">
  #header.d-flex.justify-content-between.w-100
    .d-flex.align-items-center.justify-content-between.px-3.py-2.w-100
      .d-flex.align-items-center.w-100
        .mr-4(style="white-space: nowrap") {{ now }} ( {{ $t('header.beijingTime') }} )
        .mr-3 |
        b-icon.h4.mb-0.mr-2(icon="volume-down")
        .marquee
          span(:key="notice.id" @click="gotoNoticePage(notice)" style="cursor: pointer;")
            | {{ notice.content }}
      .d-flex.align-items-center.justify-content-center.ml-3(style="cursor: pointer")
        .d-flex.align-items-center(v-if="isLogin" @click="gotoAdmin" style="white-space: nowrap")
          b-icon.h6.mb-0.mr-1(icon="person-fill")
          span {{ memberInfo.username }}
        .d-flex.align-items-center(v-else @click="login" style="white-space: nowrap")
          b-icon.h6.mb-0.mr-1(icon="person-fill")
          span {{ $t('header.login') }}
    .d-flex.align-items-center.justify-content-center.header-button.px-3(
      @click="register"
    )
      template(v-if="isLogin")
        b-icon.h6.mb-0.mr-1(icon="arrow-repeat" :animation="active")
        span ¥{{ memberInfo.money | toMoney }}
      template(v-else)
        b-icon.h6.mb-0.mr-1(icon="person-plus-fill")
        span(style="white-space: nowrap;") {{ $t('header.register') }}
    b-modal(
      v-model="loginModalVisible"
      body-class="login-modal"
      hide-header
      hide-footer)
      LoginModal
    b-modal(
      v-if="registerModalVisible"
      v-model="registerModalVisible"
      body-class="register-modal"
      hide-header
      hide-footer
    )
      RegisterModal
    b-modal(
      v-model="forgetModalVisible"
      body-class="forget-modal"
      hide-header
      hide-footer
    )
      ForgetModal
</template>

<script>
import LoginModal from '@/components/loginModal.vue';
import RegisterModal from '@/components/registerModal.vue';
import ForgetModal from '@/components/forgetModal.vue';
import moment from 'moment';

export default {
  components: {
    LoginModal,
    RegisterModal,
    ForgetModal,
  },
  data() {
    return {
      now: '',
      noticeIndex: 0,
      nowNotice: {},
      timer: null,
      noticeTimer: null,
      active: '',
    };
  },
  computed: {
    notices() {
      return this.$store.getters['notice/getNotices'];
    },
    notice() {
      return this.$store.getters['notice/getNotice'];
    },
    isLogin() {
      return this.$store.state.admin.isLogin;
    },
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    loginModalVisible: {
      get() {
        return this.$store.state.admin.loginModal;
      },
      set(status) {
        this.$store.dispatch('admin/setLoginModal', status);
      },
    },
    registerModalVisible: {
      get() {
        return this.$store.state.admin.registerModal;
      },
      set(status) {
        this.$store.dispatch('admin/setRegisterModal', status);
      },
    },
    forgetModalVisible: {
      get() {
        return this.$store.state.admin.forgetModal;
      },
      set(status) {
        this.$store.dispatch('admin/setForgetModal', status);
      },
    },
  },
  methods: {
    login() {
      if (this.isLogin) {
        this.$router.push({ name: 'login' });
      } else {
        this.loginModalVisible = !this.loginModalVisible;
      }
    },
    register() {
      if (this.isLogin) {
        this.active = 'spin';
        this.$store.dispatch('admin/getMemberInfo').then(() => {
          this.active = '';
        }).catch(() => {
          this.active = '';
        });
      } else {
        this.registerModalVisible = !this.registerModalVisible;
      }
    },
    setNow() {
      this.now = `${moment().format('YYYY')}年${moment().format('M')}月${moment().format('DD')}日${moment().locale('zh-cn').format('dddd')}${moment().format('HH')}点${moment().format('mm')}分`;
    },
    gotoNoticePage({ id }) {
      this.$router.push({ name: 'announcement', query: { id } });
    },
    gotoAdmin() {
      this.$router.push('/admin');
    },
  },
  created() {
    this.$store.dispatch('notice/fetchNotices');
    this.setNow();
    this.timer = setInterval(() => {
      this.setNow();
    }, 3000);
    this.noticeTimer = setInterval(() => {
      this.$store.dispatch('notice/nextNotice');
    }, 15000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.noticeTimer);
  },
};
</script>

<style lang="scss" scoped>
#header {
  background-color: #07bcbc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: bold;
  color: white;
}

/deep/ .modal-content {
   background-color: unset;
   border: none;
}

/deep/ .login-modal {
  background-color: #202020;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.64);
  color: white;
  border-radius: 20px;
}

/deep/ .register-modal {
  background-color: #202020;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.64);
  color: white;
  border-radius: 20px;
}

/deep/ .forget-modal {
  background-color: #202020;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.64);
  color: white;
  border-radius: 20px;
}

.header-button {
  background-color: #f76b1c;
  border-radius: 0 0 0 20px;
  cursor: pointer;
}

.marquee {
  width: 1px;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;
  will-change: transform;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
