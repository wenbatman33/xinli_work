export default {
  namespaced: true,
  state: {
    open_tabs: [],
    active_tab: "",
    tab_name: {
      tgUserGroup: "使用者群組",
      tgUserList: "使用者管理",
      tgAuthorityUser: "使用者權限",
      tgChangeLog: "異動紀錄",
      tgLoginLog: "使用者登入紀錄",
      tgFunctionGroup: "功能群組",
      tgSubFunctionGroup: "次群組列表",
      tgFunctionList: "功能管理",
      tgAuthorityList: "功能權限管理",
      tgGameList: "遊戲管理",
      tgGameGroupList: "廠商管理",
      tgGameTagList: "遊戲標籤管理",
      tgGameTagGroupList: "標籤群組管理",
      tgGameTag: "遊戲標籤查詢",
      tgGameRecommend: "推薦遊戲管理",
      tgBulletinList: "網站公告管理",
      tgBulletinAdd: "新增網站公告",
      tgBulletinEdit: "修改網站公告",
      tgInboxList: "信件清單",
      tgInboxAdd: "發新站內信",
      tgInboxEdit: "修改站內信",
      tgPromotionGroupList: "優惠群組管理",
      tgPromotionList: "優惠活動管理",
      tgBannerGroupList: "Banner群組管理",
      tgBannerAdd: "Banner新增",
      tgBannerEdit: "Banner修改",
      tgBannerList: "Banner管理",
      tgGameMachineList: "包台列表",
      tgGameMachine: "包台日報",
      tgStatusList: "狀態紀錄",
      tgVerificationList: "認證紀錄",
      tgRegisterList: "註冊紀錄",
      tgSmsAndMail: "郵件&簡訊紀錄",
      tgMemberLogin: "登入紀錄",
      tgMemberList: "會員資訊",
      tgMemberInfo: "基本資訊",
      tgMemberLog: "往來記錄",
      tgMemberImage: "用戶印象",
      tgMemberDealings: "會員清單",
      tgMemberGroup: "會員標籤",
      tgGroupList: "標籤管理",
      tgMemberTag: "用戶標籤",
      tgMemberRemark: "會員備註",
      tgRemarkList: "備註管理",
      tgWinAndLoss: "輸贏紀錄",
      tgRiskList: "風險清單",
      tgWalletList: "錢包紀錄",
      tgMemberLock: "會員凍結",
      tgMemberDevice: "關聯設備帳號",
      tgEventGroupList: "事件群組管理",
      tgEventList: "事件管理",
      tgEventInfo: "查看事件",
      tgTransferList: "轉帳記錄",
      tgDepositList: "存款管理",
      tgWithdrawalList: "提款管理",
      tgWithdrawalInfo: "查看平台流水",
      tgBonusRecordList: "優惠紀錄",
      tgBonusList: "優惠列表",
      tgBonusNames: "優惠名單",
      tgOffer: "優惠日報",
      tgAnalysis: "即時報表",
      tgOperation: "營運日報",
      tgMember: "會員日報",
      tgWinner: "贏家日報",
      tgDepositAmount: "存款日報",
      tgWithdrawAmount: "提款日報",
      tgTransfer: "轉帳日報",
      tgTransactionSpeed: "存提速度",
      tgPlatform: "平台日報",
      tgGame: "遊戲日報",
      tgLoginNotification: "登入警示",
      tgOfferDetail: "每日優惠明細",
      tgOfferList: "優惠派發名單",
      tgVip: "VIP日報",
      tgDomainsManage: "網域管理",
      tgVertifyCtrl: "電話驗證設定",
      tgPayChannel: "渠道管理",
      tgTransaction: "交易管理",
      tgEDM: "EDM管理",
      tgAgencyList: "代理管理 ",
      tgAgencyReport: "代理日報",
      tgAgencyOperation: "代理營運報表",
      tgAgencyRetain: "代理留存報表",
      tgAgencyCommission: "代理佣金報表",
      tgAgencyWallet: "代理錢包日報",
      tgAgencyDepositList: "代理存款管理",
      tgAgencyWithdrawalList: "代理提款管理",
      tgAgencyWalletList: "代理錢包紀錄",
      tgAgencyAdList: "推廣鏈接管理",
      tgAgencyBulletinList: "代理公告管理",
      tgAgencyBulletinAdd: "新增代理公告",
      tgAgencyBulletinEdit: "修改代理公告",
      tgAgencyLogin: "代理登入紀錄",
      tgAgencyApply: "申請清單",
      tgAgency: "代理會員",
      tgAgencyType2Report: "代理業績報表"
    }
  },
  mutations: {
    // 添加tabs
    add_tabs(state, route) {
      let data = {};
      data.route = route.fullPath;
      if (route.name == "tgMemberList" && route.query.user_name) {
        data.name = route.query.user_name;
      } else {
        data.name = state.tab_name[route.name];
      }
      data.component = route.name;
      state.open_tabs.push(data);
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      for (let option of state.open_tabs) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      state.open_tabs.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_tab(state, index) {
      state.active_tab = index;
    }
  }
};
