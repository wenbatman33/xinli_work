<template lang="pug">
div(:class='[(darkMode===1)? "MAIN_DARK" : "MAIN_LIGHT"]')
  .succesCard
    .row.no-gutters
      .col-12
        .succesImage
          img(:src='succesImage')
      .col-12.pt-3.px-5.text-center
        .succes.my-3  恭喜注册成功
        h5.my-3  欢迎加入梦工厂 祝福您追梦成功
        .des.my-3 贴心小贴士 ：存款前，请先至「个人资料 」页面完成【手机/邮箱绑定】，真实姓名必须与您的银行卡姓名一致，否则无法进行存提款。
        el-button.w-75(type="primary", @click='letsBet') 开始投注
      .col-12.px-5.my-3.text-center(v-if='registedBanner.bannerLinkPc')
        a(:href='registedBanner.bannerLinkPc', target="_blank")
          img.succesAD(:src='registedBanner.bannerImagePc')
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'registedBanner',
    ]),
    ...mapState('userSetting', [
      'darkMode',
    ]),
  },
  data() {
    return {
      succesImage: (window.localStorage.darkMode === 1 || window.localStorage.darkMode === '1') ? `${window.CDN_ASSETS}/static/img/pic-sucess.png` : `${window.CDN_ASSETS}/static/img/pic-sucess-day.png`,
    };
  },
  methods: {
    letsBet() {
      this.$store.dispatch('dialog/closeCommandDialog_level2');
    },
  },
  mounted() {
    const RegistedPayload = { banner_group_id: 4, banner_type: 1, device: 1 };
    this.$store.dispatch('member/API_RegistedBanner', RegistedPayload);
  },
};
</script>
<style lang="scss" scoped>
.succesCard{
  width: 424px;
  border-bottom: 8px solid $DW_Color;
  overflow: hidden;
  border-radius: 8px;
}
.succesImage{
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}
.succes{
  font-size: 14px;
  font-weight: 600;
  color: $DW_Color;
}
.des{
  font-size: 13px;
  line-height: 1.6;
  color: $garyBlue_Dark;
}
.succesAD{
  width: 295px;
  height: 92px;
}
</style>
<style lang="scss">
.MAIN_LIGHT {
  .succesCard{
    width: 424px;
    border-bottom: 8px solid $L_DW_Color !important;
    padding-bottom: 20px;
  }
  .succes{
    color: $L_DW_Color !important;
  }
}
</style>
