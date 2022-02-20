import router from '@/router';

export default {
  namespaced: true,
  state: {
    commandDialogVisible: false,
    commandDialogWidth: '',
    commandDialogComponent: '',
    // 存提款 tab 開啟預設值
    tabActive: 1,
    // 第二層參數
    commandDialogVisible_level2: false,
    commandDialogWidth_level2: '',
    commandDialogComponent_level2: '',
    allDialog: {
      dw_Login: '872px',
      dw_Transaction: '648px',
      dw_BankForm: '424px',
      dw_News: '648px',
      dw_popPromotion: '872px',
      dw_popPromotionDetail: '648px',
      dw_Register: '424px',
      dw_TransactionLogDetail: '424px',
      dw_BindingPhoneForm: '424px',
      dw_BindingEmailForm: '424px',
      dw_ChangePasswordForm: '424px',
      dw_ChangeAccountForm: '424px',
      dw_Forget: '424px',
      dw_MemberPofilePicture: '424px',
      dw_MobileRegistered: '424px',
      dw_Registered: '424px',
      dw_AllWallet: '648px',
    },
  },
  mutations: {
    open_CommandDialog(state, payload) {
      state.commandDialogVisible = true;
      state.commandDialogComponent = payload.component;
      state.commandDialogWidth = state.allDialog[payload.component];
      // 更換URL query
      if (Object.keys(router.currentRoute.query).length > 0) {
        router.push({ query: Object.assign(router.currentRoute.query, { card: payload.component }), hash: router.currentRoute.hash }).catch((err) => {});
      } else {
        router.push({ query: { card: payload.component }, hash: router.currentRoute.hash }).catch((err) => {});
      }
    },
    close_CommandDialog(state) {
      state.commandDialogVisible = false;
      state.commandDialogWidth = '';
      state.commandDialogComponent = '';
      // 刪除URL query
      const query = Object.assign({}, router.currentRoute.query);
      delete query.card;
      delete query.type;
      router.replace({ query }).catch((err) => {});
    },
    open_CommandDialog_level2(state, payload) {
      state.commandDialogVisible_level2 = true;
      state.commandDialogComponent_level2 = payload.component;
      state.commandDialogWidth_level2 = state.allDialog[payload.component];
      if (payload.tabActive) state.tabActive = payload.tabActive;
    },
    close_CommandDialog_level2(state) {
      state.commandDialogVisible_level2 = false;
      state.commandDialogWidth_level2 = '';
      state.commandDialogComponent_level2 = '';
    },
    setTabActive(state, payload) {
      state.tabActive = payload;
    },
  },
  actions: {
    openCommandDialog({ commit, rootState }, payload) {
      setTimeout(() => {
        if (rootState.member.memberLogined === false) {
          // 以下不需要登入 就可以開啟卡片
          if (payload.component === 'dw_Register' || 
            payload.component === 'dw_Login' ||
            payload.component === 'dw_Forget' || 
            payload.component === 'dw_News' || 
            payload.component === 'dw_popPromotion') {
            payload.component = payload.component;
          } else {
            payload.component = 'dw_Login';
          }
        }
        commit('dialog/open_CommandDialog', payload, { root: true });
      }, 300);
    },
    closeCommandDialog({ commit }) {
      commit('dialog/close_CommandDialog', '', { root: true });
    },
    openCommandDialog_level2({ commit }, payload) {
      commit('dialog/open_CommandDialog_level2', payload, { root: true });
    },
    closeCommandDialog_level2({ commit }) {
      commit('dialog/close_CommandDialog_level2', '', { root: true });
    },
  },
};
