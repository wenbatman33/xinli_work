<template  lang="pug">
.BLOCK.p-0(v-if='memberLogined !== "notYet"', :class='[(darkMode===1)? "MAIN_DARK" : "MAIN_LIGHT"]') 
  bl_Navi
  transition(name='fade' mode='out-in')
    .BG.mainDarkBG(v-if='darkMode==1')
  transition(name='fade' mode='out-in')
    .BG.mainLightBG(v-if='darkMode==0') 
  .mainContent#mainContent(:class='{"mainContentOpen": navOpen}')
    transition(name='fade' mode='out-in')
      router-view
  commonDialog
  bl_FloatingButton
  bl_Loading(v-if='globalLoading')
  bl_GuideLayer(v-if='userGuide')
</template>
<script>
import axios from 'axios';
import bl_Navi from '@/components/bl_Navi/bl_Navi.vue';
import commonDialog from '@/components/bl_CommonDialog/bl_CommonDialog.vue';
import bl_FloatingButton from '@/components/bl_FloatingButton/bl_FloatingButton.vue';
import bl_Loading from '@/components/bl_Loading/bl_Loading.vue';
import bl_GuideLayer from '@/components/bl_GuideLayer/bl_GuideLayer.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Navi,
    commonDialog,
    bl_FloatingButton,
    bl_Loading,
    bl_GuideLayer,
  },
  name: 'App',
  data() {
    return {
      showGuide: false,
    };
  },
  computed: {
    ...mapState('index', [
      'globalLoading',
      'indexInit',
    ]),
    ...mapState('userSetting', [
      'darkMode',
      'navOpen',
      'userGuide',
    ]),
    ...mapState('member', [
      'memberLogined',
    ]),
    isDarkBg() {
      return (this.darkMode === 1 || this.darkMode === '1') ? "background:url('/static/img/dw/img_night_bg.jpg');" : '';
    },
  },
  methods: {
    checkJumpCard(to) {
      if (to.query.card) {
        this.$store.dispatch('dialog/openCommandDialog', { component: this.$route.query.card });
      }
    },
    checkLocalHours() {
      //  偵測時間更換白天黑夜模式
      const currentHours = new Date().getHours();
      if (currentHours >= 0 && currentHours < 6) {
        this.$store.commit('userSetting/changeDarkMode', 1);
      } else if (currentHours >= 18 && currentHours <= 24) {
        this.$store.commit('userSetting/changeDarkMode', 1);
      } else if (currentHours >= 6 && currentHours < 18) {
        this.$store.commit('userSetting/changeDarkMode', 0);
      }
    },
    getShareLink(share_id) {
      // 分享取得獎勵
      const payload = { 'uuid': share_id };
      this.$axios.post('/api/Task/Share', payload);
      const query = Object.assign({}, this.$route.query);
      delete query.share_id;
      this.$router.replace({ query });
    },
    alertBrowser360HD() {
      this.$alert('为了提供更好的用户体验, 建议您使用非360浏览器HD版访问我们的网站。', '建议您使用非360浏览器HD版', {
        confirmButtonText: '确定',
      });
    },
  },
  watch: {
    $route(to, from) {
      this.checkJumpCard(to);
    },
  },
  created() {
    this.checkLocalHours();
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
  },
  beforeDestroy() {
    // 離開站台前 刪除 localStorage 的 darkMode agency
    window.localStorage.removeItem('darkMode');
    window.localStorage.removeItem('agency');
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
  },
  destroyed() {
    window.localStorage.removeItem('darkMode');
    window.localStorage.removeItem('agency');
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
  },
  mounted() {
    // console.log(window.API_HOST)
    // 首頁API優化 先dispatch('index/API_IndexInit'); 後驅動畫面
    this.$store.dispatch('index/API_IndexInit')
      .then((res) => {
        const elem = document.getElementById('loadingDiv');
        elem.parentNode.removeChild(elem);
        this.$store.dispatch('member/checkMemberLoginStatus');
        this.$store.dispatch('game/getGameTypeData');
        this.$store.dispatch('game/getGameRecommendData');
        this.$store.dispatch('userSetting/getUserBrowser')
          .then((res) => {
            // 建议您使用非360浏览器HD版
            if (this.UserBrowser === 'QHBrowserHD') this.alertBrowser360HD();
          });
        
        this.checkJumpCard(this.$route);
        if (this.$route.query.share_id) {
          // 如果有share_id 去取得分享獎勵
          this.getShareLink(this.$route.query.share_id);
        }
        if (this.$route.query.agency) {
          // 暫存代理编号 若agency 編號時註冊同時需要送出agency
          window.localStorage.setItem('agency', this.$route.query.agency);
        } else {
          window.localStorage.removeItem('agency');
        }
        if (!window.localStorage.userGuide) {
          this.$store.commit('userSetting/setUserGuide', true);
        }
      });
  },
};
</script>
<style lang='scss'>
@import './assets/scss/main.scss';
</style>
