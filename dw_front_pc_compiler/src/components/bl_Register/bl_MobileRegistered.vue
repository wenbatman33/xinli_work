<template lang="pug">
div(:class='[(darkMode===1)? "MAIN_DARK" : "MAIN_LIGHT"]')
  .succesCard
    .row.no-gutters
      .col-12
        .succesImage
          img(:src='succesImage')
      .col-12.pt-3.px-5.text-center
        .succes.my-3  恭喜注册成功
        h5.my-3  完善您的个人资料
        .userInfo.my-3.d-flex.flex-column.justify-content-center.align-item-center
          p 预设帐号 {{registedFeedback.memberAccount}}
          p 预设密码 {{registedFeedback.memberPassword}}
        el-button.w-75(type="primary", @click='gotoMyDetail') 立即修改
      .col-12.px-5.my-3.text-center(v-if='registedBanner.bannerLinkPc')
        a(:href='registedBanner.bannerLinkPc', target="_blank")
          img.succesAD(:src='registedBanner.bannerImagePc') 
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'registedFeedback',
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
    gotoMyDetail() {
      this.$router.push({ path: '/my/detail' });
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
.userInfo{
  user-select: text;
  width: 328px;
  height: 60px;
  border-radius: 4px;
  line-height: 1.5;
  background-color: $garyBlue_lightest;
  p{
    margin: 0;
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT {
  .succesCard{
    width: 424px;
    border-bottom: 8px solid $L_DW_Color !important;
  }
  .succes{
    color: $L_DW_Color !important;
  }
}
</style>
