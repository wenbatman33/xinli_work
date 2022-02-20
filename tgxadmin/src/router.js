import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login.vue")
    },
    {
      path: "/",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "index" */ "./views/index.vue"),
      children: [
        {
          path: "tgUserGroup",
          name: "tgUserGroup"
        },
        {
          path: "tgUserList",
          name: "tgUserList"
        },
        {
          path: "tgAuthorityUser",
          name: "tgAuthorityUser"
        },
        {
          path: "tgChangeLog",
          name: "tgChangeLog"
        },
        {
          path: "tgLoginLog",
          name: "tgLoginLog"
        },
        {
          path: "tgFunctionGroup",
          name: "tgFunctionGroup"
        },
        {
          path: "tgSubFunctionGroup",
          name: "tgSubFunctionGroup"
        },
        {
          path: "tgFunctionList",
          name: "tgFunctionList"
        },
        {
          path: "tgAuthorityList",
          name: "tgAuthorityList"
        },
        {
          path: "tgGameList",
          name: "tgGameList"
        },
        {
          path: "tgGameGroupList",
          name: "tgGameGroupList"
        },
        {
          path: "tgGameTagList",
          name: "tgGameTagList"
        },
        {
          path: "tgGameTagGroupList",
          name: "tgGameTagGroupList"
        },
        {
          path: "tgGameTag",
          name: "tgGameTag"
        },
        {
          path: "tgGameRecommend",
          name: "tgGameRecommend"
        },
        {
          path: "tgBulletinList",
          name: "tgBulletinList"
        },
        {
          path: "tgBulletinAdd",
          name: "tgBulletinAdd"
        },
        {
          path: "tgBulletinEdit",
          name: "tgBulletinEdit"
        },
        {
          path: "tgInboxList",
          name: "tgInboxList"
        },
        {
          path: "tgInboxAdd",
          name: "tgInboxAdd"
        },
        {
          path: "tgInboxEdit",
          name: "tgInboxEdit"
        },
        {
          path: "tgPromotionGroupList",
          name: "tgPromotionGroupList"
        },
        {
          path: "tgPromotionList",
          name: "tgPromotionList"
        },
        {
          path: "tgBannerGroupList",
          name: "tgBannerGroupList"
        },
        {
          path: "tgBannerAdd",
          name: "tgBannerAdd"
        },
        {
          path: "tgBannerEdit",
          name: "tgBannerEdit"
        },
        {
          path: "tgBannerList",
          name: "tgBannerList"
        },
        {
          path: "tgGameMachineList",
          name: "tgGameMachineList"
        },
        {
          path: "tgGameMachine",
          name: "tgGameMachine"
        },
        {
          path: "tgStatusList",
          name: "tgStatusList"
        },
        {
          path: "tgVerificationList",
          name: "tgVerificationList"
        },
        {
          path: "tgRegisterList",
          name: "tgRegisterList"
        },
        {
          path: "tgSmsAndMail",
          name: "tgSmsAndMail"
        },
        {
          path: "tgMemberLogin",
          name: "tgMemberLogin"
        },
        {
          path: "tgMemberList",
          name: "tgMemberList"
        },
        {
          path: "tgMemberInfo",
          name: "tgMemberInfo"
        },
        {
          path: "tgMemberLog",
          name: "tgMemberLog"
        },
        {
          path: "tgMemberImage",
          name: "tgMemberImage"
        },
        {
          path: "tgMemberDealings",
          name: "tgMemberDealings"
        },
        {
          path: "tgMemberGroup",
          name: "tgMemberGroup"
        },
        {
          path: "tgGroupList",
          name: "tgGroupList"
        },
        {
          path: "tgMemberTag",
          name: "tgMemberTag"
        },
        {
          path: "tgMemberRemark",
          name: "tgMemberRemark"
        },
        {
          path: "tgRemarkList",
          name: "tgRemarkList"
        },
        {
          path: "tgWinAndLoss",
          name: "tgWinAndLoss"
        },
        {
          path: "tgRiskList",
          name: "tgRiskList"
        },
        {
          path: "tgWalletList",
          name: "tgWalletList"
        },
        {
          path: "tgMemberLock",
          name: "tgMemberLock"
        },
        {
          path: "tgMemberDevice",
          name: "tgMemberDevice"
        },
        {
          path: "tgEventGroupList",
          name: "tgEventGroupList"
        },
        {
          path: "tgEventList",
          name: "tgEventList"
        },
        {
          path: "tgEventInfo",
          name: "tgEventInfo"
        },
        {
          path: "tgTransferList",
          name: "tgTransferList"
        },
        {
          path: "tgDepositList",
          name: "tgDepositList"
        },
        {
          path: "tgWithdrawalList",
          name: "tgWithdrawalList"
        },
        {
          path: "tgWithdrawalInfo",
          name: "tgWithdrawalInfo"
        },
        {
          path: "tgBonusRecordList",
          name: "tgBonusRecordList"
        },
        {
          path: "tgBonusList",
          name: "tgBonusList"
        },
        {
          path: "tgBonusNames",
          name: "tgBonusNames"
        },
        {
          path: "tgOffer",
          name: "tgOffer"
        },
        {
          path: "tgAnalysis",
          name: "tgAnalysis"
        },
        {
          path: "tgOperation",
          name: "tgOperation"
        },
        {
          path: "tgMember",
          name: "tgMember"
        },
        {
          path: "tgWinner",
          name: "tgWinner"
        },
        {
          path: "tgDepositAmount",
          name: "tgDepositAmount"
        },
        {
          path: "tgWithdrawAmount",
          name: "tgWithdrawAmount"
        },
        {
          path: "tgTransfer",
          name: "tgTransfer"
        },
        {
          path: "tgTransactionSpeed",
          name: "tgTransactionSpeed"
        },
        {
          path: "tgPlatform",
          name: "tgPlatform"
        },
        {
          path: "tgGame",
          name: "tgGame"
        },
        {
          path: "tgLoginNotification",
          name: "tgLoginNotification"
        },
        {
          path: "tgOfferDetail",
          name: "tgOfferDetail"
        },
        {
          path: "tgOfferList",
          name: "tgOfferList"
        },
        {
          path: "tgVip",
          name: "tgVip"
        },
        {
          path: "tgDomainsManage",
          name: "tgDomainsManage"
        },
        {
          path: "tgVertifyCtrl",
          name: "tgVertifyCtrl"
        },
        {
          path: "tgPayChannel",
          name: "tgPayChannel"
        },
        {
          path: "tgTransaction",
          name: "tgTransaction"
        },
        {
          path: "tgEDM",
          name: "tgEDM"
        },
        {
          path: "tgAgencyList",
          name: "tgAgencyList"
        },
        {
          path: "tgAgencyReport",
          name: "tgAgencyReport"
        },
        {
          path: "tgAgencyOperation",
          name: "tgAgencyOperation"
        },
        {
          path: "tgAgencyRetain",
          name: "tgAgencyRetain"
        },
        {
          path: "tgAgencyCommission",
          name: "tgAgencyCommission"
        },
        {
          path: "tgAgencyWallet",
          name: "tgAgencyWallet"
        },
        {
          path: "tgAgencyDepositList",
          name: "tgAgencyDepositList"
        },
        {
          path: "tgAgencyWithdrawalList",
          name: "tgAgencyWithdrawalList"
        },
        {
          path: "tgAgencyWalletList",
          name: "tgAgencyWalletList"
        },
        {
          path: "tgAgencyAdList",
          name: "tgAgencyAdList"
        },
        {
          path: "tgAgencyBulletinList",
          name: "tgAgencyBulletinList"
        },
        ,
        {
          path: "tgAgencyBulletinAdd",
          name: "tgAgencyBulletinAdd"
        },
        ,
        {
          path: "tgAgencyBulletinEdit",
          name: "tgAgencyBulletinEdit"
        },
        {
          path: "tgAgencyLogin",
          name: "tgAgencyLogin"
        },
        {
          path: "tgAgencyApply",
          name: "tgAgencyApply"
        },
        {
          path: "tgAgency",
          name: "tgAgency"
        },
        {
          path: "tgAgencyType2Report",
          name: "tgAgencyType2Report"
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  store.state.common.routerName = to.path;
  if (to.name === "login") {
    next();
  } else if (window.localStorage.JWT_TOKEN) {
    await store.dispatch("member/CheckLoginStatus");
    if (to.name != "index") {
      await store.dispatch("member/get_page_auth", to.path);
    }
    next();
  } else {
    next({
      name: "login"
    });
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
