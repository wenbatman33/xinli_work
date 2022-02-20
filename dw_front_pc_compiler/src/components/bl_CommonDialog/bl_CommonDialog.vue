<template  lang="pug">
.container-fluid
  //-  第一层灯箱
  el-dialog.clearDialog(:visible.sync='commandDialogVisible', :width='commandDialogWidth',:show-close='false', :lock-scroll='true', :close-on-click-modal='false', :class='[commandDialogVisible_level2? "hide": ""]')
    component(:is='commandDialogComponent', :ref="commandDialogComponent", v-if='commandDialogVisible')
    .closeButton(@click='closeCommandDialog')
      i.fas.fa-times
  //-  第二层灯箱
  el-dialog.clearDialog(:visible.sync='commandDialogVisible_level2', :width='commandDialogWidth_level2',:show-close='false', :lock-scroll='true', :close-on-click-modal='false', append-to-body)
    component(:is='commandDialogComponent_level2', :ref="commandDialogComponent_level2", v-if='commandDialogVisible_level2')
    .closeButton(@click='closeCommandDialog_level2')
      i.fas.fa-times
</template>
<script>
// /以下不需要登入 就可以开启卡片/////////////////////////////////////////////////////////////////////
// 注册 
import bl_Register from '@/components/bl_Register/bl_Register.vue';
// 登入 
import bl_Login from '@/components/bl_Login/bl_Login.vue';
// 忘记密码
import bl_Forget from '@/components/bl_Forget/bl_Forget.vue';
// 公告
import bl_News from '@/components/bl_News/bl_News.vue';
// 优惠
import bl_popPromotion from '@/components/bl_Promotion/bl_popPromotion.vue';
// /以下需要登入 才可以开启卡片/////////////////////////////////////////////////////////////////////
// 优惠明细
import bl_popPromotionDetail from '@/components/bl_Promotion/bl_popPromotionDetail.vue';
// 存提款
import bl_Transaction from '@/components/bl_Transaction/bl_Transaction.vue';
import bl_DepositFrom from '@/components/bl_Transaction/bl_DepositFrom.vue';
import bl_WithdrawForm from '@/components/bl_Transaction/bl_WithdrawForm.vue';
import bl_Completed from '@/components/bl_Transaction/bl_Completed.vue';
// 新增银行卡
import bl_BankForm from '@/components/bl_Transaction/bl_BankForm.vue';
// 登入 
import bl_BindingPhoneForm from '@/components/bl_my/bl_BindingPhoneForm.vue';
import bl_BindingEmailForm from '@/components/bl_my/bl_BindingEmailForm.vue';
import bl_ChangePasswordForm from '@/components/bl_my/bl_ChangePasswordForm.vue';
import bl_ChangeAccountForm from '@/components/bl_my/bl_ChangeAccountForm.vue';
import bl_MemberPofilePicture from '@/components/bl_my/bl_MemberPofilePicture.vue';
// 资金纪录
import bl_TransactionLogDetail from '@/components/bl_my/bl_TransactionLogDetail.vue';
// 资金纪录
import bl_AllWallet from '@/components/bl_my/bl_AllWallet.vue';
// 手机注册后显示帐号
import bl_MobileRegistered from '@/components/bl_Register/bl_MobileRegistered.vue';
import bl_Registered from '@/components/bl_Register/bl_Registered.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Login,
    bl_Transaction,
    bl_DepositFrom,
    bl_WithdrawForm,
    bl_BankForm,
    bl_News,
    bl_popPromotion,
    bl_popPromotionDetail,
    bl_Register,
    bl_TransactionLogDetail,
    bl_AllWallet,
    bl_BindingPhoneForm,
    bl_BindingEmailForm,
    bl_ChangePasswordForm,
    bl_ChangeAccountForm,
    bl_Forget,
    bl_MemberPofilePicture,
    bl_MobileRegistered,
    bl_Registered,
    bl_Completed,
  },
  name: 'commonDialog',
  watch: {
  },
  computed: {
    ...mapState('dialog', [
      'commandDialogWidth',
      'commandDialogComponent',
      'commandDialogWidth_level2',
      'commandDialogComponent_level2',
    ]),
    commandDialogVisible: {
      get() {
        return this.$store.state.dialog.commandDialogVisible;
      },
      set() {
        this.$store.dispatch('dialog/closeCommandDialog');
      },
    },
    commandDialogVisible_level2: {
      get() {
        return this.$store.state.dialog.commandDialogVisible_level2;
      },
      set() {
        this.$store.dispatch('dialog/closeCommandDialog_level2');
      },
    },
  },
  methods: {
    closeCommandDialog() {
      this.$store.dispatch('dialog/closeCommandDialog');
    },
    closeCommandDialog_level2() {
      this.$store.dispatch('dialog/closeCommandDialog_level2');
    }, 
  },
};
</script>
<style lang="scss" scoped>
.hide{
  opacity: 0;
}
.closeButton{
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: -32px;
  width: 24px;
  height: 24px;
  box-shadow: 0 0 12px 0 $balckAlpha_30, 0 0 12px 0 $balckAlpha_30;
  border-radius: 100%;
  background-color: white;
  text-align: center;
  line-height: 24px;
  opacity: 1;
  transition: 0.3s
}
</style>

