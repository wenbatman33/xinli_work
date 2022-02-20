<template  lang="pug">
  .container-fluid(v-if='AllProviderLoaded && JWTtokenReady')
    audio(ref='audio')
      source(src='/static/audio/notify.mp3', type='audio/mpeg')
    .notifCloseAll(v-if='notifyArray.length>0')
      el-button(size='small', @click='closeAllNotify') 关闭全部
    //- transition(:name='transitionName' mode='out-in' appear)
    router-view
</template>
<script>
import jwtDecode from 'jwt-decode';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import io from 'socket.io-client';
import router from '@/router/router';
// 建立socket.io通信
let socket = null;
const titleInit = document.title;
let titleFlash = false;
let titleLoop = null;
export default {
  data() {
    return {
      AllProviderLoaded: false,
      transitionName: '',
      notifyArray: [],
    };
  },
  name: 'App',
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'fade' : 'fade';
    },
    MemberLogined(val) {
      const vm = this;
      if(val){
        vm.connectSocket();
      }
    },
  },
  computed: {
    ...mapState('index', [
      'JWTtokenReady',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberData',
      'MemberBankList',
      'MemberInboxList',
    ]),
  },
  methods: {
    playAudio() {
      if (this.$refs.audio) {
        this.$refs.audio.play();
      } 
    },
    closeAllNotify() {
      this.notifyArray.map(item => item.close());
      this.notifyArray = [];
    },
    socketReconnect() {
      if (socket.disconnected) {
        socket = null;
        this.connectSocket();
      }
    },
    socketDisconnect() {
      socket.disconnect();
      socket.close();
    },
    notifyClose() {
      if (document.querySelectorAll('.el-notification').length - 1 === 0) {
        this.notifyArray = [];
      }
    },
    notifyClick(type, notify) {
      if (type === '1') {
        router.push('/member/bonus/3');
      } else if (type === '2') {
        router.push('/member/records/1?type=3');
      } else if (type === '3') {
        router.push('/member/bonus/3');
      }
      notify.close();
      if ((document.querySelectorAll('.el-notification').length - 1) === 0) {
        this.notifyArray = [];
      }
    },
    connectSocket() {
      const vm = this;
      if (this.UserId) {
        socket = io.connect(process.env.VUE_APP_NOTIFYSOCKETHOST);
        socket.io.autoConnect = false;
        socket.emit('NoticeLogin', this.UserId);
        socket.on('connect', () => {});
        socket.on('error', (error) => {
          // console.log('error')
          vm.socketDisconnect();
        });
        socket.on('connect_error', (error) => {
          // console.log('connect_error')
          vm.socketDisconnect();
        });
        socket.on('connect_timeout', (timeout) => {
          // console.log('connect_timeout')
          vm.socketDisconnect();
        });
        socket.on('disconnect', () => {
          // console.log('disconnect')
          vm.socketDisconnect();
        });
        socket.on('Notice', (val) => {
          this.notifyTitleMsg = val.Data.Title;
          if (val.Data.Type === '1') {
            //  更新會員存款 API
            const payload = { UserId: this.UserId, Status: '0' };
            this.$store.dispatch('member/MemberUserWalletInfo', payload);
            this.$store.dispatch('member/MemberGetGameWallet', payload);
            this.$store.dispatch('member/MemberGetDetilData');
          } else if (val.Data.Type === '2') {
            //  更新會員提款 API
            const payload = { UserId: this.UserId, Status: '0' };
            this.$store.dispatch('member/MemberUserWalletInfo', payload);
            this.$store.dispatch('member/MemberGetGameWallet', payload);
            this.$store.dispatch('member/MemberGetDetilData');
          } else if (val.Data.Type === '3') {
            //  更新會員優惠 API
            this.$store.dispatch('member/MemberGetDetilData');
          }
          this.flashBrowserTitle();
          let NoticeStatus = '';
          if (val.Data.Status === '1') {
            NoticeStatus = 'success';
          } else if (val.Data.Status === '2') {
            NoticeStatus = 'error';
          } else if (val.Data.Status === '3') {
            NoticeStatus = 'info';
          }
          const notify = vm.$notify({
            title: val.Data.Title,
            dangerouslyUseHTMLString: true,
            message: val.Data.Msg,
            type: NoticeStatus,
            offset: 26,
            duration: 0,
            onClose() {
              vm.notifyClose();
            },
            onClick() {
              vm.notifyClick(val.Data.Type, notify);
            },
          });
          this.notifyArray.push(notify);
          vm.playAudio();
        });
      }
    },
    flashBrowserTitle() {
      const vm = this;
      let loopNum = 0;
      titleFlash = true;
      titleLoop = setInterval(() => {
        loopNum += 1;
        if (titleFlash === true) {
          if (loopNum % 2 === 0) {
            document.title = `【${vm.notifyTitleMsg}】`;    
          } else {
            document.title = '【　　　　　】';
          }
        }
      }, 500);
      
      window.addEventListener('focus', () => {
        titleFlash = false;
        document.title = titleInit;
        clearInterval(titleLoop);
      });
      window.addEventListener('onfocusin', () => {
        titleFlash = false;
        document.title = titleInit;
        clearInterval(titleLoop);
      });
    },
    onVisibilityChanged(event) {
      const vm = this;
      const hidden = event.target.webkitHidden;
      if (!hidden) {
        // console.log(vm.UserId)
        if (vm.UserId) {
          vm.socketReconnect();
        }
      }
    },
    initAPP() {
      const vm = this;
      const p1 = this.$store.dispatch('index/API_SlotProvider');
      const p2 = this.$store.dispatch('index/API_FishingProvider');
      const p3 = this.$store.dispatch('index/API_BoardProvider');
      // 偵測deviceUserAgent 
      const deviceUserAgent = {};
      const { userAgent } = navigator;
      const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
      const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      deviceUserAgent.userAgent = userAgent;
      deviceUserAgent.isAndroid = isAndroid;
      deviceUserAgent.isiOS = isiOS;
      this.$store.commit('index/setUserAgent', deviceUserAgent);
      // 偵測deviceUserAgent end
      Promise.all([p1, p2, p3]).then((values) => { 
        this.$store.commit('index/setAllProvider');
        this.AllProviderLoaded = true;
      });
      this.$store.dispatch('member/MemberLoginStatus')
        .then((res) => {
          vm.$store.dispatch('news/NewsList', '');
          vm.$store.dispatch('news/CheckLastNewsTime');
        });
      if (this.MemberLogined) {
        this.$store.dispatch('member/MemberGetDetilData');
      }
      // setTimeout(() => {
      //   vm.connectSocket();
      // }, 1000);
    },
  },
  beforeDestroy() {
    // Socket 閃爍通知 移除Interval
    clearInterval(titleLoop);
  },
  mounted() {
    const vm = this;
    if (window.localStorage.JWT_TOKEN_Overdue) {
      this.$message({
        message: window.localStorage.JWT_TOKEN_Overdue,
        type: 'warning',
        onClose() {
          window.localStorage.removeItem('JWT_TOKEN_Overdue');
        },
      });
    }
    if (window.localStorage.JWT_TOKEN) {
      this.$store.dispatch('index/JwtExpireCheck')
        .then(() => {
          vm.initAPP();
        });
    } else {
      this.$store.dispatch('member/JWT_INIT', '')
        .then(() => {
          vm.initAPP();
        });
    }
  },
};
</script>
<style lang='scss'>
@import './assets/css/reset.css';
@import './assets/scss/variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~swiper/dist/css/swiper.css';
@import '~animate.css/animate.min.css';
@import './assets/scss/main.scss';
@import './assets/scss/gamelist.scss';
@import './assets/scss/member.scss';
@import './assets/scss/promotions.scss';
*{
  outline: 0;
  box-sizing: border-box;
  font-size: 13px;
}
html,body{
  width: 100%;
  height: 100%;
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding: 0;
}
.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display:         flex;
}
.VueCarousel-pagination{
  position: absolute;
  top: 580px;
}
.inputDisabled {
  background-color: #f5f7fa !important;
  border-color: #e4e7ed !important;
  color: #c0c4cc !important;
  cursor: not-allowed !important;
}
dl, ol, ul {
  margin-bottom: 0;
}
small{
  font-size: 12px;
  line-height: 1;
}
.radiusBtn{
  border-radius: 100px;
}
.error{
  border-color: #dc3545 !important;
  color: #dc3545 !important;
}
.notifCloseAll{
  position: fixed;
  top: 2px;
  right: 16px;
  z-index: 3000;
}
.el-notification__content{
  b{
    color: #dc3545  !important;
  }
}
</style>
