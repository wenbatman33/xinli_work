<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang='scss'>
@import '~bootstrap/scss/bootstrap.scss';
body,html{
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
#app{
  width: 100%;
  height: 100%;
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding: 0;
}
</style>
