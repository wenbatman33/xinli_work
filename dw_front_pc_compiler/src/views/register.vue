<template lang="pug">
.d-flex.justify-content-center.align-items-center.p-0.h-100
  .registerWarp
    bl_Register

</template>
<script>
import bl_Register from '@/components/bl_Register/bl_Register.vue';

export default {
  components: {
    bl_Register,
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
.register{
  position: absolute;
  z-index:-2;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-color: white;
  // background-image: url('/static/img/upload/CentreCourt.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.registerWarp{
  width: 424px;
  background: white;
}
</style>
