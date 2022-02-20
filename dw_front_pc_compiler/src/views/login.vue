<template lang="pug">
.d-flex.justify-content-center.align-items-center.p-0.h-100
  .loginWarp
    bl_Login
</template>
<script>
import bl_Login from '@/components/bl_Login/bl_Login.vue';

export default {
  components: {
    bl_Login,
  },
  mounted() {
    setTimeout(() => {
      if (this.memberLogined === true) {
        this.$router.push('/');
      }
    }, 300);
  },
};
</script>

<style lang="scss" scoped>
.login{
  position: absolute;
  z-index:-2;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  // background-image: url('/static/img/bg-general-2.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.loginWarp{
  width: 842px;
  height: 450px;
  background: white;
}
</style>
