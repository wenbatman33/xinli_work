<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  data() {
    return {
      initTime: 1800,
      time: 1800,
      timer: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.admin.isLogin;
    },
  },
  sockets: {
    disconnectByServer() {
      console.log('disconnectByServer');
      this.$s.disconnect();
    },
  },
  methods: {
    checkActive() {
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time <= 0) {
          this.$message.error('请重新登入');
          this.$socket.client.emit('logout', parseInt(window.localStorage.getItem('uid'), 10));
          this.$s.disconnect();
          this.$store.dispatch('admin/memberLogout');
          this.$router.push({ name: 'dashboard' });
          clearInterval(this.timer);
        }
      }, 1000);
    },
    onBeforeUnload() {
      return new Promise((resolve) => {
        const eid = parseInt(this.$store.state.admin.nowEid, 10);
        this.$socket.client.emit('eventLeave', eid);
        this.$socket.client.emit('logout', parseInt(window.localStorage.getItem('uid'), 10));
        this.$s.disconnect();
        resolve();
      });
    },
  },
  watch: {
    isLogin: {
      handler(val) {
        if (val) {
          this.$store.dispatch('admin/getMemberInfo');
          this.$store.dispatch('notice/fetchInbox');
          this.checkActive();
        }
      },
      immediate: true,
    },
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.$store.commit('admin/SET_LOGIN', true);
      this.$s.open();
      this.$socket.client.emit('login', parseInt(window.localStorage.getItem('uid'), 10));
    }
    window.addEventListener('beforeunload', this.onBeforeUnload);
    document.addEventListener('click', () => {
      this.time = this.initTime;
    });
  },
};
</script>
