<template  lang="pug">
.LoginDialog.row.no-gutters
  .col-6
    video.loginVideo(v-if='loginVideoBanner', muted, autoplay='', loop='', playsinline='', type='video/mp4')
      source(:src='loginVideoBanner', type='video/mp4')
      //- source(src='https://ak9.picdn.net/shutterstock/videos/28284139/preview/stock-footage-soccer-player-makes-a-dramatic-play-during-game-on-professional-outdoor-soccer-stadium-all-players.webm', type='video/webm')
  .col-6
    .h-100.d-flex.flex-column
      .tab-group.w-100.d-flex.flex-row
        .tab-button.w-50(@click='changeTab(1)', :class='[tabActive==1 ? "active" : "" ]') 快速登录
        .tab-button.w-50(@click='changeTab(2)', :class='[tabActive==2 ? "active" : "" ]') 手机登录
      div.flex-grow-1.h-100(v-if='tabActive==1')
        bl_LoginFrom
      div.flex-grow-1.h-100(v-if='tabActive==2')
        bl_MobileLoginFrom
</template>
<script>
// 登入 
import bl_LoginFrom from '@/components/bl_Login/bl_LoginFrom.vue';
import bl_MobileLoginFrom from '@/components/bl_Login/bl_MobileLoginFrom.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'bl_Login',
  components: {
    bl_LoginFrom,
    bl_MobileLoginFrom,
  },
  computed: {
    ...mapState('index', [
      'loginVideoBanner',
    ]),
    ...mapState('dialog', [
      'tabActive',
    ]),
  },
  watch: {
    tabActive(val) {
      if (val === 1) {
        this.$router.push({ path: this.$route.fullPath, query: { type: 'account' } }).catch((err) => {});
      } else if (val === 2) {
        this.$router.push({ path: this.$route.fullPath, query: { type: 'phone' } }).catch((err) => {});
      }
    },
  },
  methods: {
    changeTab(num) {
      this.$store.commit('dialog/setTabActive', num);
    },
  },
  mounted() {
    if (this.$route.query.type === 'phone') {
      this.changeTab(2);
    } else {
      this.changeTab(1);
      this.$router.push({ path: this.$route.fullPath, query: { type: 'account' } });
    }
    const payload = { banner_group_id: 5, banner_type: 2, device: 1 };
    this.$store.dispatch('index/API_LoginVideoBanner', payload);
  },
};
</script>
<style lang="scss" scoped>
.LoginDialog{
  height: 450px !important;
  overflow: hidden;
}
.loginVideo{
  width: 100%;
  height: 450px;
  background: black;
}
</style>
