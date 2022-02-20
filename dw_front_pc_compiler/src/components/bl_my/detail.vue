<template lang="pug">
.BLOCK.CENTER.d-flex.flex-wrap.flex-row.securityWrap
  .securityTypeBlock.m-3(:style='{backgroundImage: "url("+bgImage+")"}')
    .securityIcon.d-flex.align-items-center.justify-content-center
      .icon
        i.fas.fa-mobile-alt
    .d-flex.flex-column.align-items-center.justify-content-center
      .securityType.my-3 手机验证
      .des.my-3(v-if='memberStatus.phone != null') {{memberStatus.phone}}
      .des.my-3(v-else) 未绑定
    .d-flex.align-items-center.justify-content-center.my-3
      el-button(type="primary", round, @click='BindingPhone') 
        span(v-if='memberProfile.memberPhoneCert===1') 修改手机
        span(v-else) 验证手机

  .securityTypeBlock.m-3(:style='{backgroundImage: "url("+bgImage+")"}')
    .securityIcon.d-flex.align-items-center.justify-content-center
      .icon
        i.fas.fa-envelope
    .d-flex.flex-column.align-items-center.justify-content-center
      .securityType.my-3 邮箱验证
      .des.my-3(v-if='memberStatus.email != null') {{memberStatus.email}}
      .des.my-3(v-else) 未绑定
    .d-flex.align-items-center.justify-content-center.my-3
      el-button(type="primary", round, @click='BindingEmail') 
        span(v-if='memberProfile.memberEmailCert===1') 修改邮箱
        span(v-else) 验证邮箱

  .securityTypeBlock.m-3(:style='{backgroundImage: "url("+bgImage+")"}')
    .securityIcon.d-flex.align-items-center.justify-content-center
      .icon
        i.fas.fa-credit-card
    .d-flex.flex-column.align-items-center.justify-content-center
      .securityType.my-3 银行卡管理
      .des.my-3(v-if='memberBankCard.length>0 && memberBankCard[0].memberStatus.value===1') {{ filterBankCodeMappingList(memberBankCard[0].memberBankCode)}} {{memberBankCard[0].memberBankNo}}
      .des.my-3(v-else-if='memberBankCard.length>0 && memberBankCard[0].memberStatus.value===0') 未綁定
      .des.my-3(v-else) 未绑定
    .d-flex.align-items-center.justify-content-center.my-3
      router-link(to='/my/bankcard')
        el-button(type="primary", round) 绑定银行卡

  .securityTypeBlock.m-3(:style='{backgroundImage: "url("+bgImage+")"}')
    .securityIcon.d-flex.align-items-center.justify-content-center
      .icon
        i.fas.fa-lock
    .d-flex.flex-column.align-items-center.justify-content-center
      .securityType.my-3 密码管理
      .des.my-3 &nbsp;
    .d-flex.align-items-center.justify-content-center.my-3
      el-button(type="primary", round,  @click='ChangePassword') 修改密码

  .securityTypeBlock.m-3(v-if='memberStatus.accountChanged != true', :style='{backgroundImage: "url("+bgImage+")"}')
    .securityIcon.d-flex.align-items-center.justify-content-center
      .icon
        i.fas.fa-user
    .d-flex.flex-column.align-items-center.justify-content-center
      .securityType.my-3 帐号管理
      .des.my-3(v-if='memberStatus.account != null') {{memberStatus.account}}
      .des.my-3(v-else) &nbsp;
    .d-flex.align-items-center.justify-content-center.my-3
      el-button(type="primary", round,  @click='ChangeAccount') 修改帐号
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bgImage: `${window.CDN_ASSETS}/static/img/dw/detailBG.png`,
    };
  },
  computed: {
    ...mapState('member', [
      'memberStatus',
      'memberProfile',
    ]),
    ...mapState('wallet', [
      'memberWallet',
      'bankCodeMappingList',
      'memberBankCard',
    ]),
  },
  methods: {
    BindingPhone() {
      this.$matomo_my_detail_phone();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_BindingPhoneForm' });
    },
    BindingEmail() {
      this.$matomo_my_detail_mail();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_BindingEmailForm' });
    },
    ChangePassword() {
      this.$matomo_my_detail_password();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_ChangePasswordForm' });
    },
    ChangeAccount() {
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_ChangeAccountForm' });
    },
    AddBank() {
      this.$matomo_my_detail_bank();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_BankForm' });
    },
    filterBankCodeMappingList(bankCode) {
      const result = this.bankCodeMappingList.filter(item => item.bankCode === bankCode);
      return result[0].bankName;
    },
  },
};
</script>
<style lang="scss" scoped>
.securityWrap{
  .securityTypeBlock{
    width: 244px;
    min-height: 550px;
    border-radius: 16px;
    background-color: white;
    background-repeat: no-repeat;
  }
  .icon{
    width: 68px;
    height: 68px;
    opacity: 0.85;
    border-radius: 100%;
    color: white;
    text-align: center;
    line-height: 68px;
    font-size: 24px;
    background-image: linear-gradient(to right,$DW_ColorDark, $DW_Color 98%);
  }
  .securityType{
    font-family: PingFangSC;
    font-size: 16px;
    line-height: 2;
    color: $blueDark_light;
  }
  .securityIcon{
    margin-top: 166px;
  }
  .des{
    font-size: 12px;
    line-height: 2;
    color: $garyBlue_Dark;
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .securityWrap{
    .icon{
      background-image: linear-gradient(to right,$L_DW_ColorDark, $L_DW_Color 98%);
    }
  }
}
</style>
