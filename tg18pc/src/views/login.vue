<template lang="pug">
  .container-fluid
    tgNavi
    .container-fluid.LoginForm
      .gradientBg
      .container.overlapping
        div.pt-5.pb-5
          .row.no-gutters.loginCard
            div.w-100.d-flex.flex-row
              div.loginImage
                img.img-fluid(src="/static/img/loginImg.jpg")
              div.p-3
                .d-flex.h-100
                  tgLogin
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    tgNavi,
    tgLogin,
    tgFooter,
  },
};
</script>
<style lang="scss" scoped>
.LoginForm{
  min-height: 600px;
}
.gradientBg {
  width: 100%;
  height: 330px;
  background-image: linear-gradient(to right, #002766, #001332);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  z-index: 0;
}
.overlapping{
  margin-top: -330px
}
.loginCard{
  min-height: 450px;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  border: solid 1px #e4e7ed;
}
.loginImage{
  overflow: hidden;
  img{
    width: 780px;
    height: 455px
  }
}
</style>
