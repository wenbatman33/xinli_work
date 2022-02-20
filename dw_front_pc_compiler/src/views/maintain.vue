<template lang="pug">
.container-fluid.page.p-0(:style='maintainStyle')
  .d-flex.flex-column.justify-content-between.h-100
    .httpImage.text-center.d-flex.flex-column.flex-grow-1.justify-content-center
      div.text-center
        img.img-fluid(:src='maintainImg', alt="")
      div
        h4.text-center 抱歉！系统维护中…
        p.text-center.maintainingTime.my-4 {{maintainMessage}}
    .httpFooter.text-center
      p.text-center Copyright © 2020 梦工厂 版权所有
</template>

<script>
export default {
  data() {
    return {
      maintainMessage: '',
      maintainStyle: `background: url('${window.CDN_ASSETS}/static/img/dw/img_night_bg.jpg');background-position: center center; background-size:cover;`,
      maintainImg: `${window.CDN_ASSETS}/static/img/maintain.png`,
    };
  },
  created() {
    this.maintainMessage = window.localStorage.maintainMessage;
  },
};
</script>
<style lang="scss" scoped>
.httpStatus{
  width: 100%;
  @include media_xs{
    padding: 60px 0 20px 0;
  }
  @include media_sm{
    padding: 60px 0 20px 0;
  }
  @include media_md {
    padding: 60px 0 20px 0;
  }
  @include media_lg {
    padding: 60px 0 20px 0;
  }
  @include media_xl{
    padding: 100px 0 20px 0;
  }

  img{
    max-width: 90%;
  }
}
.httpImage{
  width: 100%;
  color: white;
  @include media_xs{
    padding: 0 20px;
  }
  @include media_sm{
    padding: 0 20px;
  }
  @include media_md {
    padding: 0 20px;
  }
  @include media_lg {
    padding: 0 20px;
  }
  @include media_xl{
    padding: 0;
  }
  img{
    max-width: 90%;
  }
  img{
    max-width: 100%;
  }
}
.httpFooter{
  width: 100%;
  background-color: black;
  height: 32px;
  line-height: 32px;
  color: white;
  p {
    margin: 0;
  }
}
.page{
  width: 100%;
  height: 100%;
}
</style>
