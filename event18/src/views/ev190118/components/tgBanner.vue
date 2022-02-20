<template lang='pug'>
  .banner.row.no-gutters.d-flex.justify-content-center.flex-column
    .col-12
      img.pic01(src='/static/ev190118/Banner_ev190118.jpg')
      img.pic02(src='/static/ev190118/Banner_ev190118_s.jpg')
</template>

<script>
export default {
};
</script>
<style scoped lang='scss'>
/*-- Banner --*/
.banner {
  width: 100%;
  height: auto;
  img.pic01, img.pic02 {
    width: 100%;
    height: auto;
  };
  img.pic02 {
    display: none;
  };
}

@media screen and (max-width: 750px) {
  .banner {
    img.pic01 {
      display: none;
    };
    img.pic02 {
      display: inline;
    };
  }
}
</style>
