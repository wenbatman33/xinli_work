<template lang="pug">
  .accountSuccess(:style="{ backgroundImage: 'url(' + bgImage + ')' }")
    router-link.accountSuccess__back(to="/")
      i.fas.fa-times
    .accountSuccess__photo(:src='image1')
      img(:src='image1')
    .accountSuccess__main
      p.accountSuccess__main__success 恭喜注册成功
      p.accountSuccess__main__title 完善您的个人资料
      .accountSuccess__main__content.mb-2
        .mr-3
          p.mb-0.title 预设帐号
          p.mb-0.title 预设密码
        div
          p.mb-0 {{ TempAccount.account }}
          p.mb-0 {{ TempAccount.password }}
      router-link.accountSuccess__main__start.mb-2(to="/my/detail") 立即修改
      a.accountSuccess__main__bannerLink(:href="bannerLink")
        img.accountSuccess__main__bannerImage(:src="bannerImage")
</template>

<script>
import { mapState } from 'vuex';

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
  computed: {
    ...mapState('member', [
      'TempAccount',
    ]),
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
      height: 60vh;
      padding: 40px $width-28;
      background-color: white;
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      &__success {
        color: $theme;
        font-size: $text-14;
      }

      &__title {
        font-size: $text-24;
        color: black;
      }

      &__content {
        width: 100%;
        padding: $height-24 0;
        display: flex;
        justify-content: center;
        background-color: $origin_lightest;
        border-radius: 18px;

        .title {
          color: $origin_darkest;
        }
      }

      &__start {
        color: white;
        background-color: $theme;
        width: 160px;
        padding: $height-10 0;
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
