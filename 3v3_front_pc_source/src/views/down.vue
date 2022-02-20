<template lang="pug">
  .x.d-flex.flex-column.justify-content-center.align-items-center
    img(src='/img/maintainIcon.png')
    .qq.py-3 抱歉！系统优化中…
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('notice/fetchNotices').then((res) => {
      if (res.status === 200) {
        this.$router.push('/');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.x {
  width: 100vw;
  height: 100vh;
  background: url('/img/maintainBg.png') 50% 0% no-repeat;
  background-size: cover;
  img {
    width: 160px;
  };
  .qq {
    color: rgba(255,255,255,1);
    font-size: 30px;
    letter-spacing: 2px;
  };
}
</style>
