<template lang="pug">
.container-fluid.page.p-0(:style='maintainStyle')
  .d-flex.flex-column.justify-content-between.h-100
    .httpImage.text-center.d-flex.flex-column.flex-grow-1.justify-content-center
      div.text-xl-center
        img.img-fluid(:src='maintainImg', alt="")
      div
        h4.text-center.text-white 抱歉！系统维护中…
        p.text-center.maintainingTime.my-4.text-white {{ message }}
</template>

<script>
export default {
  data() {
    return {
      message: '',
      maintainStyle: `background: url('${window.CDN_ASSETS}/static/img/picNightBg@3x.jpg');background-position: center center; background-size:cover;`,
      maintainImg: `${window.CDN_ASSETS}/static/img/maintain.png`,
    };
  },
  created() {
    this.message = window.localStorage.getItem('maintain');
  },
};
</script>

<style lang="scss" scoped>
.maintainingTime {
  opacity: 0.8;
}
.page, .httpImage{
  width: 100%;
  height: 100%;
  width: 100vw;
  height: 100vh;
}
</style>
