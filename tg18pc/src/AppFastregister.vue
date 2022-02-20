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
html{
  width: 100%;
  min-height: 100%;
}
body {
  min-height: 100vh;
}
#app{
  width: 100%;
  height: 100% !important;
  min-height: 100vh;
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding: 0;
}
.main{
  min-height: 100vh;
}
</style>
