<template  lang="pug">
.w-full.h-screen
  router-view
  el-dialog(:visible='DialogShow', :width='Width' @close='closeCommandDialog', :lock-scroll='true', :close-on-click-modal='false')
    component(:is='DialogComponent', :ref='DialogComponent')
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      Width: '95%',
    };
  },
  computed: {
    ...mapState('setting', ['windowWidth', 'windowHeight', 'deviceIsPc']),
    ...mapState('setting', ['DialogShow', 'DialogComponent']),
  },
  watch: {
    deviceIsPc(val) {
      if (val) { 
        this.Width = '60%'; 
      } else {
        this.Width = '95%';
      }
    },
  },
  methods: {
    reSize() {
      const payload = {
        windowWidth: window.document.body.clientWidth, 
        windowHeight: window.document.body.clientHeight,
      };
      this.$store.dispatch('setting/ac_WindowSize', payload);
    },
    closeCommandDialog() {
      this.$store.commit('setting/setDialogHide');
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSize);
  },
  created() {
    if (window.localStorage.JWT_TOKEN) {
      this.$store.dispatch('member/Member');
      this.$store.dispatch('member/getMemberSubList');
      this.$store.dispatch('member/checkMemberInfo');
    }
  },
  mounted() {
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
.closeButton{
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: -32px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: white;
  text-align: center;
  line-height: 24px;
  opacity: 1;
  transition: 0.3s
}
</style>
