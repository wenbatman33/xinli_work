<template lang="pug">
  #sidebar
    .sidebar.px-4.pt-3.text-center
      router-link.logo(to="/")
        img(:src="img_logo" width="100%")
      .menu-container.px-3
        router-link.menu-item.py-3(
          to="/marketList"
          :class="{'active' : $route.name === 'marketList'}"
        )
          .icon(:style="`background-image: url(${checkroute('marketList')})`")
          span {{ $t('sidebar.marketList') }}
        router-link.menu-item.py-3(
          to="/investment"
          :class="{'active' : $route.name === 'investment'}"
        )
          .icon(:style="`background-image: url(${checkroute('investment')})`")
          span {{ $t('sidebar.investmentRecord') }}
        router-link.menu-item.py-3(to="/outside")
          .icon(:style="`background-image: url(${flagIcon})`")
          span {{ $t('sidebar.outsideLink') }}
        router-link.menu-item.py-3(
          to="/announcement"
          :class="{'active' : $route.name === 'announcement'}"
        )
          .icon.position-relative(:style="`background-image: url(${checkroute('announcement')})`")
            .dot(v-show="hasUnread")
          span {{ $t('sidebar.announcement') }}
        router-link.menu-item.py-3(
          to="/discount"
          :class="{'active' : $route.name === 'discount'}"
        )
          .icon.position-relative(:style="`background-image: url(${checkroute('discount')})`")
          span {{ $t('sidebar.discount') }}
        router-link.menu-item.py-3(
          to="/connect"
          :class="{'active' : $route.name === 'connect'}"
        )
          .icon.position-relative(:style="`background-image: url(${checkroute('connect')})`")
          span {{ $t('sidebar.connect') }}
      .admin-container.px-3.mb-3
        router-link.admin-item.py-3(
          to="/admin"
          :class="{'active' : $route.name === 'admin'}"
        )
          .icon(:style="`background-image: url(${checkroute('admin')})`")
          span.w-75 {{ $t('sidebar.admin') }}
        router-link.admin-item.py-3(
          to="/cashFlow"
          :class="{'active' : $route.name === 'cashFlow'}"
        )
          .icon(:style="`background-image: url(${checkroute('cashFlow')})`")
          span.w-75 {{ $t('sidebar.cashflow') }}
        router-link.admin-item.py-3(
          to="/transaction"
          :class="{'active' : $route.name === 'transaction'}"
        )
          .icon(:style="`background-image: url(${checkroute('transaction')})`")
          span.w-75 {{ $t('sidebar.transactionRecord') }}
        router-link.admin-item.py-3(
          to="/promotion"
          :class="{'active' : $route.name === 'promotion'}"
        )
          .icon(:style="`background-image: url(${checkroute('promotion')})`")
          span.w-75 {{ $t('sidebar.promotion') }}
        a.admin-item.py-3(v-if="isLogin" @click.prevent="logout")
          .icon(:style="`background-image: url(${loginIcon})`")
          span.w-75 {{ $t('sidebar.logout') }}
    .service.px-4.py-3(@click="service")
      .d-flex.justify-content-between.align-items-center.px-3.w-100
        .icon(:style="`background-image: url(${customerService})`")
        span {{ $t('sidebar.customerService') }}
</template>

<script>

export default {
  data() {
    return {
      trophyIcon: `${process.env.VUE_APP_STATIC}/img/trophy.svg`,
      trophyActiveIcon: `${process.env.VUE_APP_STATIC}/img/trophy-active.svg`,
      acconutBookIcon: `${process.env.VUE_APP_STATIC}/img/account-book.svg`,
      acconutBookActiveIcon: `${process.env.VUE_APP_STATIC}/img/account-book-active.svg`,
      flagIcon: `${process.env.VUE_APP_STATIC}/img/flag.svg`,
      soundIcon: `${process.env.VUE_APP_STATIC}/img/sound.svg`,
      soundActiveIcon: `${process.env.VUE_APP_STATIC}/img/sound-active.svg`,
      userIcon: `${process.env.VUE_APP_STATIC}/img/user.svg`,
      userActiveIcon: `${process.env.VUE_APP_STATIC}/img/user-active.svg`,
      teamIcon: `${process.env.VUE_APP_STATIC}/img/team.svg`,
      teamActiveIcon: `${process.env.VUE_APP_STATIC}/img/team-active.svg`,
      moneyCollectIcon: `${process.env.VUE_APP_STATIC}/img/money-collect.svg`,
      moneyCollectActiveIcon: `${process.env.VUE_APP_STATIC}/img/money-collect-active.svg`,
      transactionIcon: `${process.env.VUE_APP_STATIC}/img/transaction.svg`,
      transactionActiveIcon: `${process.env.VUE_APP_STATIC}/img/transaction-active.svg`,
      qrcodeIcon: `${process.env.VUE_APP_STATIC}/img/qrcode.svg`,
      qrcodeActiveIcon: `${process.env.VUE_APP_STATIC}/img/qrcode-active.svg`,
      giftIcon: `${process.env.VUE_APP_STATIC}/img/gift.svg`,
      giftActiveIcon: `${process.env.VUE_APP_STATIC}/img/gift-active.svg`,
      loginIcon: `${process.env.VUE_APP_STATIC}/img/login.svg`,
      customerService: `${process.env.VUE_APP_STATIC}/img/customer-service.svg`,
      img_logo: `${process.env.VUE_APP_STATIC}/img/logo.png`,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.admin.isLogin;
    },
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    hasUnread() {
      return this.$store.state.notice.inbox.findIndex((item) => item.status === 2) > -1;
    },
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.$store.dispatch('notice/fetchInbox');
    }
  },
  methods: {
    checkroute(routerName) {
      switch (routerName) {
        case 'marketList':
          if (this.$route.name === 'marketList') return this.trophyActiveIcon;
          return this.trophyIcon;
        case 'investment':
          if (this.$route.name === 'investment') return this.acconutBookActiveIcon;
          return this.acconutBookIcon;
        case 'announcement':
          if (this.$route.name === 'announcement') return this.soundActiveIcon;
          return this.soundIcon;
        case 'discount':
          if (this.$route.name === 'discount') return this.giftActiveIcon;
          return this.giftIcon;
        case 'connect':
          if (this.$route.name === 'connect') return this.teamActiveIcon;
          return this.teamIcon;
        case 'admin':
          if (this.$route.name === 'admin') return this.userActiveIcon;
          return this.userIcon;
        case 'cashFlow':
          if (this.$route.name === 'cashFlow') return this.moneyCollectActiveIcon;
          return this.moneyCollectIcon;
        case 'transaction':
          if (this.$route.name === 'transaction') return this.transactionActiveIcon;
          return this.transactionIcon;
        case 'promotion':
          if (this.$route.name === 'promotion') return this.qrcodeActiveIcon;
          return this.qrcodeIcon;
        default:
          return '123';
      }
    },
    logout() {
      this.$socket.client.emit('logout', parseInt(window.localStorage.getItem('uid'), 10));
      this.$s.disconnect();
      this.$store.dispatch('admin/memberLogout');
      this.$router.push({ name: 'dashboard' });
    },
    service() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_MICHAT"] }] */
      // window._MICHAT.startChat();
      window.LC_API.open_chat_window();
    },
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  background: linear-gradient(to bottom, #404040, #1e1e1e);
  color: #8e8e93;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 180px;
  min-width: 180px;

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: #8e8e93;
      cursor: pointer;
    }

    .admin-container {
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.4);

      .admin-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-decoration: none;
        color: #8e8e93;
        cursor: pointer;
      }
    }

    .active {
      color: #22d8da !important;
    }
  }

  .service {
    height: 50px;
    background-color: #f76b1c;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
}

.icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: cover;
}

.dot {
  width: 8px;
  height: 8px;
  position: absolute;
  top: -2px;
  right: -2px;
  border-radius: 50%;
  background-color: red;
}
</style>
