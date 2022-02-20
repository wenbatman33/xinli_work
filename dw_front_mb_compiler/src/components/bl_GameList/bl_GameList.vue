<template lang="pug">
  .gameList.py-1
    .gameList__card(v-for="item in 20")
      .d-flex.justify-content-between
        span.text-betlead.mr-3 联赛名称联赛名称
        span.mr-2 周三 19:00
      .d-flex
        .gameList__card__block.mr-3
          .d-flex.align-items-center.mb-2
            img.icon(:src="image1").mr-1
            | 丹佛金块丹佛
          .d-flex.align-items-center
            img.icon(:src="image2").mr-1
            | 丹佛金块丹佛
      .gameList__card__img(:style="{ backgroundImage: 'url(' + bgImage + ')' }")
</template>

<script>
export default {
  data() {
    return {
      bgImage: `${window.CDN_ASSETS}/static/img/ball-icon-soccer@3x.png`,
      image1: `${window.CDN_ASSETS}/static/img/logo-den@3x.png`,
      image2: `${window.CDN_ASSETS}/static/img/logo-min@3x.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
.gameList {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 85px;
  overflow: auto;

  &__card {
    padding: $height-8 0 $height-8 $width-12;
    margin-right: $width-8;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
    font-size: 10px;
    white-space: nowrap;
    height: 82px;
    width: 193px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    &__block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: bold;

      .icon {
        width: 18px;
      }

      i {
        font-size: $text-18;
      }
    }

    &__img {
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 78px;
      height: 46px;
    }
  }
}

</style>
