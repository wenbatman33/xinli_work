<template lang="pug">
  .version
    .version__header 版本讯息
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .version__main.text-center
      img.version__main__icon(:src='image1')
      p.origin__dark 当前版本：{{version}}
      p.origin__dark.
        梦工厂致力于为玩家建立一个友善与互信的环境。
        不管玩家何时何地、有任何问题，
        通过我们 7x24 小时客服即时在线服务，
        我们将以最快的速度，来回答与解决您的疑惑。
      p.origin Copyright © 2020 版权所有
</template>

<script>
export default {
  data() {
    return {
      image1: `${window.CDN_ASSETS}/static/img/appIcon108X108@3x.png`,
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>

<style lang="scss" scoped>
.version {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__main {
    flex: 1;
    padding: 0 $width-16;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    &__icon {
      width: 108px;
      margin: $height-48 0;
    }
  }
}

.origin__dark {
  color: $origin_dark
}

.origin {
  color: $origin;
}
</style>
