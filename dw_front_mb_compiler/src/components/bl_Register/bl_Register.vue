<template lang="pug">
  .register
    .register__status(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/").register__status__close
        i.el-icon-close
      .register__status__tab
        .d-flex.flex-column.align-items-center
          .register__status__tab--item(@click="changeView('account')" :class="{'active': view === 'account'}") 帐号注册
          .bar(v-if="view === 'account'")
        .d-flex.flex-column.align-items-center
          .register__status__tab--item(@click="changeView('phone')" :class="{'active': view === 'phone'}") 手机注册
          .bar(v-if="view === 'phone'")
    .register__form
      component(:is="view")
</template>

<script>
import { mapState } from 'vuex';
import account from '@/components/bl_Register/bl_AccountRegister.vue';
import phone from '@/components/bl_Register/bl_PhoneRegister.vue';

export default {
  components: {
    account,
    phone,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      view: 'account',
    };
  },
  methods: {
    changeView(component) {
      this.view = component;
      this.$router.push({ query: { type: component } }).catch((err) => {});
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
  },
  created() {
    if (this.$route.query.type) {
      this.view = this.$route.query.type;
    }
  },
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;

  &__status {
    width: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom-left-radius: 14.67vw;
    padding: $height-40 $width-24;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__close {
      color: white;

      i {
        font-size: 8.4vw;
        font-weight: 900;
      }
    }

    &__tab {
      display: flex;
      font-size: $text-20;
      justify-content: space-around;
      margin-top: $height-44;

      &--item {
        color: white;
        text-decoration: none;
        opacity: 0.4;
      }

      .bar {
        width: $width-40;
        border: 2px solid $dw_yellow;
        height: 4px;
        border-radius: 2px;
        margin-top: 1vh;
      }

      .active {
        opacity: 1;
      }
    }
  }
}

.register__form {
  text-align: center;
  padding: $height-48 $width-28 0;
}
</style>
