<template  lang='pug'>
.BLOCK#mainContent(:class='{"BottomPadding": !DeviceIsPc }')
  .container-fluid(v-if='pageInit')
    .row.no-gutters(v-if='$route.path !== "/login" && $route.path !== "/register"')
      Header
    .row.no-gutters
      router-view
    ToastDialog(v-if='ShowToastDialog')
    Footer
    TabBar(v-if='!DeviceIsPc')
</template>
<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import TabBar from '@/components/TabBar/TabBar.vue';
import ToastDialog from '@/components/ToastDialog/ToastDialog.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Header,
    ToastDialog,
    TabBar,
    Footer,
  },
  name: 'App',
  data() {
    return {
      pageInit: false,
    };
  },
  computed: {
    ...mapState('setting', ['WindowWidth', 'WindowHeight', 'DeviceIsPc']),
    ...mapState('dialog', ['ShowToastDialog']),
  },
  watch: {
    $route(to, from) {
      this.checkJumpCard(to);
    },
  },
  methods: {
    checkJumpCard(to) {
      if (to.query.card) {
        // this.$store.dispatch('dialog/openCommandDialog', { component: this.$route.query.card });
      }
    },
    reSize() {
      const payload = {
        WindowWidth: window.document.body.clientWidth, 
        WindowHeight: window.document.body.clientHeight,
      };
      this.$store.dispatch('setting/ac_WindowSize', payload);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSize);
  },
  destroyed() {},
  mounted() {
    this.$store.dispatch('index/getBannerList');
    this.$store.dispatch('index/getNewsList');
    this.$store.dispatch('index/getNewsTypeList');
    this.$store.dispatch('member/updateMemberStatus')
      .then((res) => {
        this.pageInit = true;
      })
      .catch((error) => {
        this.pageInit = true;
      });
    window.addEventListener('resize', this.reSize);
    this.reSize();
  },
};
</script>
<style lang='scss'>
@import './assets/scss/main.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.toast-enter-active, .toast-leave-active {
  transition: all 1s ease;
}
.toast-enter, .toast-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
}
</style>
