<template  lang="pug">
  .container-fluid(v-if='AllProviderLoaded')
    audio(ref='audio')
      source(src='/static/audio/notify.mp3', type='audio/mpeg')
    .notifCloseAll(v-if='notifyArray.length>0')
      el-button(size='small', @click='closeAllNotify') 关闭全部
    router-view
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
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
      mp3File: '/static/audio/notify.mp3',
      AllProviderLoaded: false,
      transitionName: '',
      notifyArray: [],
      notifyTitleMsg: '',
      msg: [],
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
      if (val) {
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
      // console.log('closeAllNotify');
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
        router.push('/member/records/sum?type=3');
      } else if (type === '3') {
        router.push('/member/bonus/3');
      }
      notify.close();
      if (document.querySelectorAll('.el-notification').length - 1 === 0) {
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
      const p4 = this.$store.dispatch('index/API_ArcadeProvider');
      Promise.all([p1, p2, p3, p4]).then((values) => { 
        this.$store.commit('index/setAllProvider');
        this.AllProviderLoaded = true;
      });
      this.$store.dispatch('member/MemberLoginStatus')
        .then(() => {
          const payload = {};
          payload.NowTime = 1;
          vm.$store.dispatch('news/NewsList', payload)
            .then(() => {
              vm.$store.dispatch('news/CheckLastNewsTime');
            });
        });
      if (this.MemberLogined) {
        this.connectSocket();
        this.$store.dispatch('member/MemberGetDetilData');
      }
      // setTimeout(() => {
      //   document.addEventListener('visibilitychange', (e) => {
      //     vm.onVisibilityChanged(e);
      //   }, false);
      //   vm.connectSocket();
      // }, 1000);
    },
    queryAgencyId() {
      // 用推廣連結查詢代理帳號
      console.log('queryAgencyId');
      const payload = {
        Parameter: '',
      };
      if (this.$route.query.agency) {
        payload.Parameter = this.$route.query.agency;
      } else {
        let url = window.location.href;
        url = url.substr(url.indexOf('://') + 3);
        let shortUrl = url.substr(url.indexOf('.') + 1);
        shortUrl = shortUrl.replace('\/', '');
        payload.Parameter = shortUrl;
      }
      // /Web_Page/QueryAgencyId 用推廣連結查詢代理帳號
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/QueryAgencyId`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.data.length > 0) {
            console.log(res.data.data[0].AgencyId);
            
            window.localStorage.setItem('AgencyId', res.data.data[0].AgencyId);
          } else {
            window.localStorage.removeItem('AgencyId');
          }
        });
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
    this.queryAgencyId();
  },
};
</script>
<style lang='scss'>
@import './assets/css/reset.css';
@import './assets/scss/variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~swiper/dist/css/swiper.css';
@import '~animate.css/animate.min.css';
*{
  outline: 0;
  box-sizing: border-box;
  font-size: 13px;
}
html,body{
  width: 100% !important;
  height: 100% !important;
  font-family: "PingFangSC","PingFangTC","微软雅黑","Microsoft YaHei","Microsoft JhengHei"!important;
}
.main{
  height: 100%;
  min-height: 100% !important;
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  min-width: 1280px;
  padding: 0;
}
.container{
  max-width: 1140px !important;
  width: 1140px !important;
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
h1{
  font-size: 28px;
  line-height: 1.5;
}
h2{
  font-size: 26px;
  line-height: 1.5;
}
h3{
  font-size: 24px;
  line-height: 1.5;
}
h4{
  font-size: 22px;
  line-height: 1.5;
}
h5{
  font-size: 18px;
  line-height: 1.5;
}
h6{
  font-size: 14px;
  line-height: 1.5;
}
p,span{
  font-size: 13px;
  line-height: 1.2;
}
small{
  font-size: 12px;
  line-height: 1.2;
}
.radiusBtn{
  border-radius: 100px;
}
.error{
  border-color: #dc3545 !important;
  color: #dc3545 !important;
}
.swiper-pagination-bullet{
  background:#fff !important;
}
.swiper-pagination-bullet-active{
  background:#fff !important;
}
.el-button{
  outline: 0 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.is-process {
  color: #c0c4cc!important;
  border-color: #c0c4cc!important;
  font-weight: 700 !important;
}
.is-wait {
  color: #c0c4cc!important;
  border-color: #c0c4cc!important;
  font-weight: 700 !important;
}
.el-step__title.is-process {
  color: #c0c4cc!important;
  border-color: #c0c4cc!important;
  font-weight: 700 !important;
}
.el-date-editor .el-range-separator{
  width: 8% !important;
}
.baseHeight{
  min-height: 500px
}
.el-dialog__body{
  padding: 10px 20px 30px 20px;
}
.el-badge__content{
  border: none;
}
.badgeForTG18{
  background: #f56c6c !important;
}
.notifCloseAll{
  position: fixed;
  top: 2px;
  right: 16px;
  z-index: 3000;
}
.el-notification{
  cursor: pointer !important;
}
.el-notification__content{
  
  b{
    color: #dc3545  !important;
  }
}
</style>
