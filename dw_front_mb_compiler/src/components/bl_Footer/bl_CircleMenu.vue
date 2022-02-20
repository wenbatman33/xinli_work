<template lang="pug">
  .menu(@click="openMenu")
    div(:class="{'menu__control': open}")
    .menu__open(v-if="!open")
      i.fas.fa-plus-circle
    .menu__close(v-else)
      i.far.fa-times-circle
    router-link.menu__item(to="/faq")
      i.fas.fa-life-ring.menu__item__icon
      .menu__item__name 助手
    a.menu__item(href="#" onclick="LC_API.open_chat_window()")
      i.fas.fa-headphones.menu__item__icon
      .menu__item__name 客服
    router-link.menu__item(to="/about")
      i.fas.fa-exclamation-circle.menu__item__icon
      .menu__item__name 关于
    //- a.menu__item(href="#")
    //-   i.far.fa-times-circle
    //- a.menu__item(href="#")
    //-   i.el-icon-cherry
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openMenu() {
      this.open = !this.open;
      this.$emit('menuStatus', this.open);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
    // transform: scale(0.9);
    // width: $width-64;
    // height: $width-64;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: -$height-16;

  &__open {
    width: $width-64;
    height: $width-64;
    font-size: $text-40;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $theme;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    position: absolute;
    z-index: 2;
  }

  &__close {
    width: $width-64;
    height: $width-64;
    font-size: $text-40;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $theme;
    border-radius: 50%;
    color: white;
    transform: scale(0.95);
    position: absolute;
    z-index: 1;
  }

  .menu__item  {
    font-size: $text-28;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    text-decoration: none;
    transition: transform ease-out 200ms;
    transform: scale(0.7);
    z-index: 1;

    &__icon {
      width: $width-60;
      height: $width-60;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to bottom, $theme, $theme_dark);
      border-radius: 50%;
    }

    &__name {
      font-size: $text-16;
    }
  }

  .menu__control {
    & + .menu__open {
      transition-timing-function: linear;
      transition-duration: 200ms;
    }

    & ~ .menu__item {
      transition-duration: 280ms;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);

      &:nth-child(3) {
        transform: translate3d(-30.67vw, -12.3vh, 0);
      }

      &:nth-child(4) {
        transform: translate3d(0, -150px, 0);
      }

      &:nth-child(5) {
        transform: translate3d(30.67vw, -12.3vh, 0);
      }

      // &:nth-child(6) {
      //   transform: translate3d(-115px, -130px, 0);
      // }

      // &:nth-child(7) {
      //   transform: translate3d(-200px, -50px, 0);
      // }
    }
  }

  label {
    margin: 0;
  }
}
</style>
