<template lang="pug">
  .footer
    img.footer__bg(v-if="!DarkMode" :src="bgImage")
    router-link.footer__items.text-center.text-decoration-none(to="/" @click.native="setFooterView('home')" :class="{'active': FooterView === 'home'}")
      i.footer__items__icon.fas.fa-home
      p.footer__items__name 首页
    router-link.footer__items.text-center.text-decoration-none(to="/promotion" @click.native="setFooterView('promotion')" :class="{'active': FooterView === 'promotion'}")
      i.footer__items__icon.fas.fa-gift
      p.footer__items__name 优惠
    .footer__items.menu(@click="openMenu")
      .menu__close(v-if="open")
        i.footer__items__icon.fas.fa-times.menu__close__icon
      .menu__open(v-else)
        i.footer__items__icon.fas.fa-plus-circle.menu__open__icon
        p.footer__items__name 更多
      div(:class="{'menu__control': open}")
      router-link.menu__item(to="/faq", @click.native="$matomo_more_help")
        i.fas.fa-life-ring.menu__item__icon
        .menu__item__name 助手
      a.menu__item(@click='openChat')
        i.fas.fa-headphones.menu__item__icon
        .menu__item__name 客服
      router-link.menu__item(to="/about", @click.native="$matomo_more_about")
        i.fas.fa-exclamation-circle.menu__item__icon
        .menu__item__name 关于
      router-link.menu__item(to="/agency", @click.native="$matomo_more_agent")
        i.fas.fa-user-friends.menu__item__icon
        .menu__item__name 代理
    .footer__items.text-center.text-decoration-none(@click="setCardOpen" :class="{'active': FooterView === 'money'}")
      i.footer__items__icon.fas.fa-donate
      p.footer__items__name 存提
    router-link.footer__items.text-center.text-decoration-none(to="/my" @click.native="setFooterView('member')" :class="{'active': FooterView === 'member'}")
      i.footer__items__icon.fas.fa-user
      p.footer__items__name 我的
    .background(v-if="open")
</template>

<script>
import { mapState } from 'vuex';
import CircleMenu from '@/components/bl_Footer/bl_CircleMenu.vue';

export default {
  components: {
    CircleMenu,
  },
  data() {
    return {
      open: false,
      bgImage: `${window.CDN_ASSETS}/static/img/bluebg.png`,
    };
  },
  methods: {
    setCardOpen() {
      if (window.localStorage.getItem('JWT_TOKEN')) {
        this.$store.dispatch('index/setCardOpen', true);
        this.$store.dispatch('payment/API_MemberWallet');
        this.$store.dispatch('index/setCardName', {
          card: 'bl_Transaction',
          type: 'deposit',
        });
        this.$matomo_tabBar_transactionlog();
      } else {
        this.$router.push('/login').catch((err) => {});
      }
    },
    setFooterView(view) {
      this.$store.commit('index/setFooterView', view);
      if (this.$route.name === 'home') {
        this.$matomo_tabBar_index();
      } else if (this.$route.name === 'promotion') {
        this.$matomo_tabBar_promotion();
      } else if (this.$route.name === 'member') {
        this.$matomo_tabBar_my();
      }
    },
    setMenuStatus(value) {
      this.open = value;
    },
    openMenu() {
      if (this.open) {
        this.$matomo_tabBar_close_more();
      } else { 
        this.$matomo_tabBar_open_more();
      }
      this.open = !this.open;
    },
    openChat() {
      this.$matomo_more_livechat();
      LC_API.open_chat_window();
    },
  },
  computed: {
    ...mapState('index', [
      'FooterView',
      'DarkMode',
    ]),
  },
  mounted() {
    if (this.$route.name === 'home') {
      this.setFooterView('home');
    } else if (this.$route.name === 'promotion') {
      this.setFooterView('promotion');
    } else {
      this.setFooterView('member');
    }
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 35px rgba(0,0,0,0.15);
  z-index: 2;
  background-size: cover;

  .footer__bg {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: -1;
    height: 60px;
    transition: all 0.5s ease 0s;
  }

  &__items {
    color: white;
    padding: 8px 0 4px;

    &__icon {
      font-size: 24px;
    }

    &__name {
      margin: 0;
      font-size: 12px;
    }

    &.menu {
      z-index: 2;

      .menu__close {
        text-align: center;

        &__icon {
          width: $width-36;
          height: $width-36;
          background-color: $theme;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          filter: drop-shadow(0px 0px 3px rgba(0,0,0,0.54));
        }
      }

      .menu__item  {
        font-size: $text-28;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        text-decoration: none;
        transition: transform ease-out 200ms;
        transform: scale(0.7);
        z-index: 1;
        left: 43%;

        &__icon {
          width: $width-60;
          height: $width-60;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom, $theme, $theme_dark);
          border-radius: 50%;
          filter: drop-shadow(0px 0px 3px rgba(0,0,0,0.54));
        }

        &__name {
          font-size: $text-16;
        }
      }

      .menu__control {
        & ~ .menu__close {
          color: red;
        }

        & + .menu__open {
          transition-timing-function: linear;
          transition-duration: 200ms;
        }

        & ~ .menu__item {
          transition-duration: 280ms;
          transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);

          &:nth-child(3) {
            transform: translate3d(-32.67vw, -37.3vh, 0)
          }

          &:nth-child(4) {
            transform: translate3d(-12vw, -330px, 0);
          }

          &:nth-child(5) {
            transform: translate3d(12vw, -330px, 0)
          }

          &:nth-child(6) {
            transform: translate3d(32.67vw, -37.3vh, 0)
          }

          // &:nth-child(6) {
          //   transform: translate3d(-115px, -130px, 0);
          // }

          // &:nth-child(7) {
          //   transform: translate3d(-200px, -50px, 0);
          // }
        }
      }

      label {
        margin: 0;
      }
    }
  }

  .background {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgb(57, 109, 238));
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 0;
  }
}

.active {
  color: rgb(255, 213, 0) !important;
}
</style>
