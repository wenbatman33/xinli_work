<template lang="pug">
  .accountSuccess(:style="{ backgroundImage: 'url(' + bgImage + ')' }")
    router-link.accountSuccess__back(to="/")
      i.fas.fa-times
    .accountSuccess__photo(:src='image1')
      img(:src='image1')
    .accountSuccess__main
      p.accountSuccess__main__success 恭喜注册成功
      p.accountSuccess__main__title 歡迎加入梦工厂 祝您暢玩梦工厂
      p.accountSuccess__main__content 贴心小贴士 ：存款前，请先至「个人资料 」页面完成【手机/邮箱绑定】，真实姓名必须与您的银行卡姓名一致，否则无法进行存提款。
      router-link.accountSuccess__main__start.mb-2(to="/") 开始投注
      a.accountSuccess__main__bannerLink(:href="bannerLink")
        img.accountSuccess__main__bannerImage(:src="bannerImage")
</template>

<script>
export default {
  data() {
    return {
      bgImage: `${window.CDN_ASSETS}/static/img/bgSuccess@3x.png`,
      image1: `${window.CDN_ASSETS}/static/img/imgMan@3x.png`,
      bannerImage: '',
      bannerLink: '',
      form: {
        params: {
          banner_group_id: 4,
          platform: 1,
          device: 2,
        },
      },
    };
  },
  watch: {
    $route: {
      handler() {
        this.$store.dispatch('member/setRegisterSuccess', '');
      },
    },
  },
  created() {
    this.$store.dispatch('index/API_IndexBanner', this.form).then((res) => {
      this.bannerImage = res.data.data[0].bannerImageMobile;
      this.bannerLink = res.data.data[0].bannerLinkMobile;
    });
  },
};
</script>

<style lang="scss" scoped>
  .accountSuccess {
    width: 100%;
    background: #fff;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
    &__bg {
      background-repeat: no-repeat;
      width: 100%;
      height: 100vh;
      z-index: 0;
      background-size: cover;
      background-position: center center;
      position: absolute;
      top: 0;
    }

    &__back {
      color: white;
      font-size: 24px;
      position: absolute;
      top: $height-24;
      left: $width-24;
    }

    &__photo {
      width: 100%;
      height: auto;
      padding: 20px 20px 0 20px;
      text-align: center;
      img{
        width: 313px;
        height: 365px;
        height: auto;
      }
    }

    &__main {
      width: 100%;
      padding: 20px $width-28;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      &__success {
        color: $theme;
        font-size: $text-14;
      }

      &__title {
        font-size: $text-20;
        color: black;
      }

      &__content {
        color: $origin_darkest;
        font-size: $text-12;
      }

      &__start {
        color: white;
        background-color: $theme;
        width: 160px;
        padding: $height-12 0;
        border-radius: 20px;
        text-align: center;
      }

      &__bannerImage {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
</style>
