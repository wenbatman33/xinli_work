<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home.vue';

export default {
  name: 'app',
  components: {
    Home,
  },
};
</script>

<style lang='scss'>
@import './assets/css/reset.css';
@import '~bootstrap/scss/bootstrap.scss';
html,body{
  width: 100% !important;
  height: 100% !important;
  scroll-behavior: smooth;
  font-family: "PingFangSC","PingFangTC","微软雅黑","Microsoft YaHei","Microsoft JhengHei"!important;
}
#app{
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(-90deg, #222 0%, #333 100%);
}
.container-fluid {
  padding: 0;
}
</style>