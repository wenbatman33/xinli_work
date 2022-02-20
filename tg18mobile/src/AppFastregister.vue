<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (!window.localStorage.JWT_TOKEN) {
      this.$store.dispatch('member/JWT_INIT', '');
    }
  },
};
</script>

<style lang='scss'>
@import '~bootstrap/scss/bootstrap.scss';
body,html{
  width: 100%;
  min-height: 100%;
}
#app{
  width: 100%;
  min-height: 100%;
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding: 0;
}
</style>
