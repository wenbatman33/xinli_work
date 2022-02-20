<template lang="pug">
  .login
    .login__status
      router-link(to="/").login__status__back
        i.el-icon-close
      .login__status__tab
        .d-flex.flex-column.align-items-center
          .login__status__tab--item(@click="changeView('account')" :class="{'active': view === 'account'}") 帐号登录
          .bar(v-if="view === 'account'")
        .d-flex.flex-column.align-items-center
          .login__status__tab--item(@click="changeView('phone')" :class="{'active': view === 'phone'}") 手机登录
          .bar(v-if="view === 'phone'")
    .login__form
      component(:is="view")
</template>

<script>
import account from '@/components/bl_Login/bl_AccountLogin.vue';
import phone from '@/components/bl_Login/bl_PhoneLogin.vue';

export default {
  components: {
    account,
    phone,
  },
  data() {
    return {
      view: 'account',
    };
  },
  methods: {
    changeView(component) {
      this.view = component;
      this.$router.push({ query: {type: component}}).catch(err => {});
    },
  },
  created() {
    if (this.$route.query.type) {
      this.view = this.$route.query.type;
    }
  },
};
</script>

<style lang="scss" scoped>
.login{
  position: absolute;
  width: 100%;
  z-index: 2;
}
.login__status {
  padding: $height-40 $width-24;

  &__back {
    color: white;

    i {
      font-size: 8.4vw;
      font-weight: 900;
    }
  }

  &__tab {
    display: flex;
    margin-top: $height-44;
    font-size: $text-20;
    justify-content: space-around;

    &--item {
      color: white;
      text-decoration: none;
      opacity: 0.4;
    }

    .bar {
      width: $width-40;
      border: 2px solid rgb(255, 213, 0);
      height: 4px;
      border-radius: 2px;
      margin-top: 1vh;
    }

    .active {
      opacity: 1;
    }
  }
}

.login__form {
  text-align: center;
  padding: $height-48 $width-28 0;
}
</style>