<template lang="pug">
  .container-fluid
    el-container(v-if="this.$route.name != 'tgWithdrawalInfo'")
      tgSidebar 
      el-container.d-block
        tgHeader
        el-tabs(v-model='active_tab', type='border-card', closable, @tab-click='click_tab', @tab-remove='remove_tab')
          el-tab-pane(:key='item.route' :index="item.route" v-for='item in open_tabs', :label='item.name', :name='item.route') 
            span(slot="label")
              i.el-icon-refresh( @click='reload_tab') 
              span &nbsp;{{item.name}}
            tgBreadcrumb
            component( v-if="hackReset!=item.route" :is='item.component',  :ref="item.route" )
        tgFooter
    el-container(v-else)
      el-container.d-block
        component(is='tgWithdrawalInfo')
        tgFooter
</template>
<script>
import tgHeader from "@/components/tgHeader";
import tgSidebar from "@/components/tgSidebar";
import tgFooter from "@/components/tgFooter";
import tgBreadcrumb from "@/components/tgBreadcrumb";
export default {
  components: {
    tgHeader,
    tgSidebar,
    tgFooter,
    tgBreadcrumb,
    tgUserGroup: () =>
      import(/* webpackChunkName: "tgUserGroup" */ "@/views/permission/tgUserGroup.vue"),
    tgUserList: () =>
      import(/* webpackChunkName: "tgUserList" */ "@/views/permission/tgUserList.vue"),
    tgAuthorityUser: () =>
      import(/* webpackChunkName: "tgAuthorityUser" */ "@/views/permission/tgAuthorityUser.vue"),
    tgChangeLog: () =>
      import(/* webpackChunkName: "tgChangeLog" */ "@/views/permission/tgChangeLog.vue"),
    tgLoginLog: () =>
      import(/* webpackChunkName: "tgLoginLog" */ "@/views/permission/tgLoginLog.vue"),
    tgFunctionGroup: () =>
      import(/* webpackChunkName: "tgFunctionGroup" */ "@/views/permission/tgFunctionGroup.vue"),
    tgSubFunctionGroup: () =>
      import(/* tgSubFunctionGroup: "login" */ "@/views/permission/tgSubFunctionGroup.vue"),
    tgFunctionList: () =>
      import(/* webpackChunkName: "tgFunctionList" */ "@/views/permission/tgFunctionList.vue"),
    tgAuthorityList: () =>
      import(/* webpackChunkName: "tgAuthorityList" */ "@/views/permission/tgAuthorityList.vue"),
    tgGameList: () =>
      import(/* webpackChunkName: "tgGameList" */ "@/views/operation/tgGameList.vue"),
    tgGameGroupList: () =>
      import(/* webpackChunkName: "tgGameGroupList" */ "@/views/operation/tgGameGroupList.vue"),
    tgGameTagList: () =>
      import(/* webpackChunkName: "tgGameTagList" */ "@/views/operation/tgGameTagList.vue"),
    tgGameTagGroupList: () =>
      import(/* tgGameTagGroupList: "login" */ "@/views/operation/tgGameTagGroupList.vue"),
    tgGameTag: () =>
      import(/* webpackChunkName: "tgGameTag" */ "@/views/operation/tgGameTag.vue"),
    tgGameRecommend: () =>
      import(/* webpackChunkName: "tgGameRecommend" */ "@/views/operation/tgGameRecommend.vue"),
    tgBulletinList: () =>
      import(/* webpackChunkName: "tgBulletinList" */ "@/views/operation/tgBulletinList.vue"),
    tgBulletinAdd: () =>
      import(/* webpackChunkName: "tgBulletinAdd" */ "@/views/operation/tgBulletinAdd.vue"),
    tgBulletinEdit: () =>
      import(/* webpackChunkName: "tgBulletinEdit" */ "@/views/operation/tgBulletinAdd.vue"),
    tgInboxList: () =>
      import(/* webpackChunkName: "tgInboxList" */ "@/views/operation/tgInboxList.vue"),
    tgInboxAdd: () =>
      import(/* webpackChunkName: "tgInboxAdd" */ "@/views/operation/tgInboxAdd.vue"),
    tgInboxEdit: () =>
      import(/* webpackChunkName: "tgInboxEdit" */ "@/views/operation/tgInboxAdd.vue"),
    tgPromotionGroupList: () =>
      import(/* tgPromotionGroupList: "login" */ "@/views/operation/tgPromotionGroupList.vue"),
    tgPromotionList: () =>
      import(/* webpackChunkName: "tgPromotionList" */ "@/views/operation/tgPromotionList.vue"),
    tgBannerGroupList: () =>
      import(/* webpackChunkName: "tgBannerGroupList" */ "@/views/operation/tgBannerGroupList.vue"),
    tgBannerAdd: () =>
      import(/* webpackChunkName: "tgBannerAdd" */ "@/views/operation/tgBannerAdd.vue"),
    tgBannerEdit: () =>
      import(/* webpackChunkName: "tgBannerEdit" */ "@/views/operation/tgBannerAdd.vue"),
    tgBannerList: () =>
      import(/* webpackChunkName: "tgBannerList" */ "@/views/operation/tgBannerList.vue"),
    tgGameMachineList: () =>
      import(/* webpackChunkName: "tgGameMachineList" */ "@/views/operation/tgGameMachineList.vue"),
    tgGameMachine: () =>
      import(/* webpackChunkName: "tgGameMachine" */ "@/views/operation/tgGameMachine.vue"),
    tgStatusList: () =>
      import(/* webpackChunkName: "tgStatusList" */ "@/views/member/tgStatusList.vue"),
    tgVerificationList: () =>
      import(/* webpackChunkName: "tgVerificationList" */ "@/views/member/tgVerificationList.vue"),
    tgRegisterList: () =>
      import(/* webpackChunkName: "tgRegisterList" */ "@/views/member/tgRegisterList.vue"),
    tgSmsAndMail: () =>
      import(/* webpackChunkName: "tgSmsAndMail" */ "@/views/member/tgSmsAndMail.vue"),
    tgMemberLogin: () =>
      import(/* webpackChunkName: "tgMemberLogin" */ "@/views/member/tgMemberLogin.vue"),
    tgMemberList: () =>
      import(/* webpackChunkName: "tgMemberList" */ "@/views/member/tgMemberList.vue"),
    tgMemberInfo: () =>
      import(/* webpackChunkName: "tgMemberInfo" */ "@/views/member/tgMemberInfo.vue"),
    tgMemberLog: () =>
      import(/* webpackChunkName: "tgMemberLog" */ "@/views/member/tgMemberLog.vue"),
    tgMemberImage: () =>
      import(/* webpackChunkName: "tgMemberImage" */ "@/views/member/tgMemberImage.vue"),
    tgMemberDealings: () =>
      import(/* webpackChunkName: "tgMemberDealings" */ "@/views/member/tgMemberDealings.vue"),
    tgMemberGroup: () =>
      import(/* webpackChunkName: "tgMemberGroup" */ "@/views/member/tgMemberGroup.vue"),
    tgGroupList: () =>
      import(/* webpackChunkName: "tgGroupList" */ "@/views/member/tgGroupList.vue"),
    tgMemberTag: () =>
      import(/* webpackChunkName: "tgMemberTag" */ "@/views/member/tgMemberTag.vue"),
    tgMemberRemark: () =>
      import(/* webpackChunkName: "tgMemberRemark" */ "@/views/member/tgMemberRemark.vue"),
    tgRemarkList: () =>
      import(/* webpackChunkName: "tgRemarkList" */ "@/views/member/tgRemarkList.vue"),
    tgWinAndLoss: () =>
      import(/* webpackChunkName: "tgWinAndLoss" */ "@/views/member/tgWinAndLoss.vue"),
    tgRiskList: () =>
      import(/* webpackChunkName: "tgRiskList" */ "@/views/member/tgRiskList.vue"),
    tgWalletList: () =>
      import(/* webpackChunkName: "tgWalletList" */ "@/views/member/tgWalletList.vue"),
    tgMemberLock: () =>
      import(/* webpackChunkName: "tgMemberLock" */ "@/views/member/tgMemberLock.vue"),
    tgMemberDevice: () =>
      import(/* webpackChunkName: "tgMemberDevice" */ "@/views/member/tgMemberDevice.vue"),
    tgEventGroupList: () =>
      import(/* webpackChunkName: "tgEventGroupList" */ "@/views/event/tgEventGroupList.vue"),
    tgEventList: () =>
      import(/* webpackChunkName: "tgEventList" */ "@/views/event/tgEventList.vue"),
    tgEventInfo: () =>
      import(/* webpackChunkName: "tgEventInfo" */ "@/views/event/tgEventInfo.vue"),
    tgTransferList: () =>
      import(/* webpackChunkName: "tgTransferList" */ "@/views/transaction/tgTransferList.vue"),
    tgDepositList: () =>
      import(/* webpackChunkName: "tgDepositList" */ "@/views/transaction/tgDepositList.vue"),
    tgWithdrawalList: () =>
      import(/* webpackChunkName: "tgWithdrawalList" */ "@/views/transaction/tgWithdrawalList.vue"),
    tgWithdrawalInfo: () =>
      import(/* webpackChunkName: "tgWithdrawalInfo" */ "@/views/transaction/tgWithdrawalInfo.vue"),
    tgBonusRecordList: () =>
      import(/* tgBonusRecordList: "login" */ "@/views/transaction/tgBonusRecordList.vue"),
    tgBonusList: () =>
      import(/* webpackChunkName: "tgBonusList" */ "@/views/offer/tgBonusList.vue"),
    tgBonusNames: () =>
      import(/* webpackChunkName: "tgBonusNames" */ "@/views/offer/tgBonusNames.vue"),
    tgOffer: () =>
      import(/* webpackChunkName: "tgOffer" */ "@/views/offer/tgOffer.vue"),
    tgAnalysis: () =>
      import(/* webpackChunkName: "tgAnalysis" */ "@/views/report/tgAnalysis.vue"),
    tgOperation: () =>
      import(/* webpackChunkName: "tgOperation" */ "@/views/report/tgOperation.vue"),
    tgMember: () =>
      import(/* webpackChunkName: "tgMember" */ "@/views/report/tgMember.vue"),
    tgWinner: () =>
      import(/* webpackChunkName: "tgWinner" */ "@/views/report/tgWinner.vue"),
    tgDepositAmount: () =>
      import(/* webpackChunkName: "tgDepositAmount" */ "@/views/report/tgDepositAmount.vue"),
    tgWithdrawAmount: () =>
      import(/* webpackChunkName: "tgWithdrawAmount" */ "@/views/report/tgWithdrawAmount.vue"),
    tgTransfer: () =>
      import(/* webpackChunkName: "tgTransfer" */ "@/views/report/tgTransfer.vue"),
    tgTransactionSpeed: () =>
      import(/* webpackChunkName: "tgTransactionSpeed" */ "@/views/report/tgTransactionSpeed.vue"),
    tgPlatform: () =>
      import(/* webpackChunkName: "tgPlatform" */ "@/views/report/tgPlatform.vue"),
    tgGame: () =>
      import(/* webpackChunkName: "tgGame" */ "@/views/report/tgGame.vue"),
    tgLoginNotification: () =>
      import(/* webpackChunkName: "tgLoginNotification" */ "@/views/report/tgLoginNotification.vue"),
    tgOfferDetail: () =>
      import(/* webpackChunkName: "tgOfferDetail" */ "@/views/report/tgOfferDetail.vue"),
    tgOfferList: () =>
      import(/* webpackChunkName: "tgOfferList" */ "@/views/offer/tgOfferList.vue"),
    tgVip: () =>
      import(/* webpackChunkName: "tgVip" */ "@/views/report/tgVip.vue"),
    tgDomainsManage: () =>
      import(/* webpackChunkName: "tgDomainsManage" */ "@/views/system/tgDomainsManage.vue"),
    tgVertifyCtrl: () =>
      import(/* webpackChunkName: "tgVertifyCtrl" */ "@/views/system/tgVertifyCtrl.vue"),
    tgPayChannel: () =>
      import(/* webpackChunkName: "tgPayChannel" */ "@/views/system/tgPayChannel.vue"),
    tgTransaction: () =>
      import(/* webpackChunkName: "tgTransaction" */ "@/views/system/tgTransaction.vue"),
    tgEDM: () =>
      import(/* webpackChunkName: "tgEDM" */ "@/views/system/tgEDM.vue"),
    tgAgencyList: () =>
      import(/* webpackChunkName: "tgAgencyList" */ "@/views/agency/tgAgencyList.vue"),
    tgAgencyReport: () =>
      import(/* webpackChunkName: "tgAgencyReport" */ "@/views/agency/tgAgencyReport.vue"),
    tgAgencyOperation: () =>
      import(/* webpackChunkName: "tgAgencyOperation" */ "@/views/agency/tgAgencyOperation.vue"),
    tgAgencyType2Report: () =>
      import(/* webpackChunkName: "tgAgencyType2Report" */ "@/views/agency/tgAgencyType2Report.vue"),
    tgAgencyRetain: () =>
      import(/* webpackChunkName: "tgAgencyRetain" */ "@/views/agency/tgAgencyRetain.vue"),
    tgAgencyCommission: () =>
      import(/* webpackChunkName: "tgAgencyCommission" */ "@/views/agency/tgAgencyCommission.vue"),
    tgAgencyWallet: () =>
      import(/* webpackChunkName: "tgAgencyWallet" */ "@/views/agency/tgAgencyWallet.vue"),
    tgAgencyWalletList: () =>
      import(/* webpackChunkName: "tgAgencyWalletList" */ "@/views/agency/tgAgencyWalletList.vue"),
    tgAgencyLogin: () =>
      import(/* webpackChunkName: "tgAgencyLogin" */ "@/views/agency/tgAgencyLogin.vue"),
    tgAgencyApply: () =>
      import(/* webpackChunkName: "tgAgencyApply" */ "@/views/agency/tgAgencyApply.vue"),
    tgAgencyAdList: () =>
      import(/* webpackChunkName: "tgAgencyAdList" */ "@/views/agency/tgAgencyAdList.vue"),
    tgAgencyBulletinList: () =>
      import(/* webpackChunkName: "tgAgencyBulletinList" */ "@/views/agency/tgAgencyBulletinList.vue"),
    tgAgencyBulletinAdd: () =>
      import(/* webpackChunkName: "tgAgencyBulletinAdd" */ "@/views/agency/tgAgencyBulletinAdd.vue"),
    tgAgencyBulletinEdit: () =>
      import(/* webpackChunkName: "tgAgencyBulletinEdit" */ "@/views/agency/tgAgencyBulletinAdd.vue"),
    tgAgency: () =>
      import(/* webpackChunkName: "tgAgency" */ "@/views/agency/tgAgency.vue"),
    tgAgencyDepositList: () =>
      import(/* webpackChunkName: "tgAgencyDepositList" */ "@/views/agency/tgAgencyDepositList.vue"),
    tgAgencyWithdrawalList: () =>
      import(/* webpackChunkName: "tgAgencyWithdrawalList" */ "@/views/agency/tgAgencyWithdrawalList.vue")
  },
  data() {
    return { hackReset: "" };
  },
  mounted() {
    // 權限判斷
    if (
      !this.$store.state.member.user_page_auth ||
      this.$store.state.member.user_page_auth.Read_Auth == 0
    ) {
      this.$store.commit("tab/set_active_tab", "/tgAnalysis");
      this.$router.push({ name: "tgAnalysis" });
      return false;
    }
    if (this.$route.name == "index") {
      this.get_index_page();
    } else {
      this.$store.commit("tab/add_tabs", this.$route);
      this.$store.commit("tab/set_active_tab", this.$route.fullPath);
    }
  },
  watch: {
    $route(to) {
      // 權限判斷
      if (
        !this.$store.state.member.user_page_auth ||
        this.$store.state.member.user_page_auth.Read_Auth == 0
      ) {
        this.$store.commit("tab/set_active_tab", "/tgAnalysis");
        this.$router.push({ name: "tgAnalysis" });
        return false;
      }
      if (this.$route.name == "index") {
        this.get_index_page();
      } else {
        let is_open = false;
        for (let tab of this.open_tabs) {
          if (to.fullPath === tab.route) {
            is_open = true;
            this.$store.commit("tab/set_active_tab", to.fullPath);
            break;
          }
        }
        if (is_open == false) {
          this.$store.commit("tab/add_tabs", to);
          this.$store.commit("tab/set_active_tab", to.fullPath);
        }
      }
    }
  },
  computed: {
    open_tabs() {
      return this.$store.state.tab.open_tabs;
    },
    active_tab: {
      get() {
        return this.$store.state.tab.active_tab;
      },
      set(val) {
        this.$store.commit("tab/set_active_tab", val);
      }
    }
  },
  methods: {
    // tab切换时，动态的切换路由
    click_tab(tab) {
      this.$router.push({ path: this.active_tab });
    },
    remove_tab(tab_name) {
      this.$store.commit("tab/delete_tabs", tab_name);
      if (tab_name === this.active_tab) {
        // 设置当前激活的路由
        if (this.open_tabs && this.open_tabs.length >= 1) {
          this.$store.commit(
            "tab/set_active_tab",
            this.open_tabs[this.open_tabs.length - 1].route
          );
          this.$router.push({ path: this.active_tab });
        } else {
          this.$router.push({ name: "index" });
        }
      }
    },
    reload_tab() {
      this.hackReset = this.active_tab;
      this.$nextTick(() => {
        this.hackReset = "";
      });
      // if (typeof this.$refs[this.active_tab][0].get_data == "function") {
      //   typeof this.$refs[this.active_tab][0].get_data();
      // } else if (typeof this.$refs[this.active_tab][0].getData == "function") {
      //   typeof this.$refs[this.active_tab][0].getData();
      // }
    },
    async get_index_page() {
      let self = this;
      await self.$store.dispatch("member/get_page_auth", "/tgAnalysis");
      if (
        self.$store.state.member.user_page_auth &&
        self.$store.state.member.user_page_auth.Read_Auth == 1
      ) {
        this.$store.commit("tab/set_active_tab", "/tgAnalysis");
        this.$router.push({ name: "tgAnalysis" });
      } else {
        await self.$store.dispatch("member/get_page_auth", "/tgMemberDealings");
        if (
          self.$store.state.member.user_page_auth &&
          self.$store.state.member.user_page_auth.Read_Auth == 1
        ) {
          this.$store.commit("tab/set_active_tab", "/tgMemberDealings");
          this.$router.push({ name: "tgMemberDealings" });
        }
      }
    }
  }
};
</script> 
<style lang='scss'>
@import "../assets/css/main.css";
</style>