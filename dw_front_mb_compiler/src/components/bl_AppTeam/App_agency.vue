<template lang="pug">
  .container-fluid.p-0
    bl_Agency
</template>
<script>
import bl_Agency from '@/components/bl_Agency/bl_Agency.vue';

export default {
  components: {
    bl_Agency,
  },
  created() {
    window.localStorage.removeItem('JWT_TOKEN');
    window.localStorage.removeItem('Finger');
  },
  beforeDestroy() {
    window.localStorage.removeItem('JWT_TOKEN');
  },
  mounted() {
    if (this.$route.query.token && this.$route.query.finger) {
      // 黑夜以及白天模式
      if (this.$route.query.mode === 'dark') {
        this.$store.commit('index/setDarkMode', true);
      } else {
        this.$store.commit('index/setDarkMode', false);
      }
      // 帶token & finger
      window.localStorage.setItem('JWT_TOKEN', this.$route.query.token);
      window.localStorage.setItem('Finger', this.$route.query.finger);
    } else if (window.navigator.userAgent.indexOf('Android') > 0) {
      // Android
      window.android.token_expired();
    } else {
      try {
        window.webkit.messageHandlers.token_expired.postMessage('token_expired');
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
