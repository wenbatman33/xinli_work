<template lang='pug'>
.pageContent
  .registerBg(:style='{backgroundImage: "url("+bgImage+")"}')
  .row.no-gutters
    RegisterForm
</template>

<script>
import { mapState } from 'vuex';
import RegisterForm from '@/components/RegisterForm/RegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
  computed: {
    ...mapState('member', ['MemberLogined']),
    ...mapState('setting', [
      'WindowWidth',
      'WindowHeight',
      'DeviceIsPc',
    ]),
  },
  data() {
    return {
      bgImage: '/static/img/bg_1.jpg',
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.$router.push('/');
    }
  },
};
</script>
<style lang='scss' scoped>
.registerBg{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 38, 66, 0.75);
  background-size: cover;
  background-position: center center;
  z-index: -1;
}
</style>
