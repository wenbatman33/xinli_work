<template lang="pug">
  #cards
    component(:is="getCardName")
</template>

<script>
// 測試
import bl_test from '@/components/bl_Cards/bl_testcard.vue';
// 存提
import bl_Transaction from '@/components/bl_Cards/bl_MoneyCard.vue';
// 公告
import bl_News from '@/components/bl_Cards/bl_NewsCard.vue';
// 我的-個人資料
import bl_Personal from '@/components/bl_Cards/bl_PersonalCard.vue';
// 優惠-優惠內容 優惠明細
import bl_popPromotion from '@/components/bl_Cards/bl_PromotionContentCard.vue';
import bl_popPromotionDetail from '@/components/bl_Cards/bl_PromotionDetailCard.vue';
// 安全中心
// 電話驗證
import bl_BindingPhoneForm from '@/components/bl_Cards/bl_PhoneVerifyCard.vue';
// 信箱驗證
import bl_BindingEmailForm from '@/components/bl_Cards/bl_EmailVerifyCard.vue';
// 密碼管理
import bl_ChangePasswordForm from '@/components/bl_Cards/bl_PasswordManageCard.vue';
// 帳號管理
import bl_ChangeAccountForm from '@/components/bl_Cards/bl_AccountManageCard.vue';
// 銀行卡管理-添加銀行卡
import bl_BankManage from '@/components/bl_Cards/bl_BankManageCard.vue';
import bl_AddBankCard from '@/components/bl_Cards/bl_AddBankCard.vue';
// 存提-添加銀行卡
import bl_AddBankCard2 from '@/components/bl_Cards/bl_AddBankCard2.vue';
// 投注記錄
import bl_BettingDetail from '@/components/bl_Cards/bl_BettingDetailCard.vue';
// 資金記錄
import bl_TransactionLog from '@/components/bl_Cards/bl_TransactionLogCard.vue';
// 我的消息
import bl_InboxCard from '@/components/bl_Cards/bl_InboxCard.vue';
// 版本訊息
import bl_Version from '@/components/bl_Cards/bl_VersionCard.vue';
// 錢包明細
import bl_WalletDetail from '@/components/bl_Cards/bl_WalletDetailCard.vue';


export default {
  components: {
    bl_test,
    bl_Transaction,
    bl_News,
    bl_Personal,
    bl_popPromotion,
    bl_popPromotionDetail,
    bl_BindingPhoneForm,
    bl_BindingEmailForm,
    bl_ChangePasswordForm,
    bl_ChangeAccountForm,
    bl_BankManage,
    bl_AddBankCard,
    bl_AddBankCard2,
    bl_BettingDetail,
    bl_Version,
    bl_WalletDetail,
    bl_TransactionLog,
    bl_InboxCard,
  },
  computed: {
    getCardOpen() {
      return this.$store.state.index.CardOpen;
    },
    getCardName() {
      return this.$store.state.index.CardName;
    },
  },
};
</script>

<style lang="scss" scoped>
#cards {
  width: 100vw;
  height: 80vh;
  position: fixed;
  bottom: -80vh;
  left: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 3;
  opacity: 0;
  background-color: white;
  overflow: hidden;
}
</style>