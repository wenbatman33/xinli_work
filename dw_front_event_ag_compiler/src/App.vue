<template  lang="pug">
.BLOCK
  .BG.mainDarkBG(:style='{backgroundImage: "url("+mainDarkBG+")"}')
  router-view
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      mainDarkBG: `${window.CDN_ASSETS}/static/img/dw/img_night_bg.jpg`,
    }
  },
  methods: {
  },
  mounted() {
    // 測試頁面為  /event/1
    // const elem = document.getElementById('loadingDiv');
    // elem.parentNode.removeChild(elem);
  },
};
</script>
<style lang='scss'>
@import './assets/scss/main.scss';
</style>
