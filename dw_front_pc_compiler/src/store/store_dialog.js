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
      bl_Login: '872px',
      bl_Transaction: '648px',
      bl_BankForm: '424px',
      bl_News: '648px',
      bl_popPromotion: '872px',
      bl_popPromotionDetail: '648px',
      bl_Register: '424px',
      bl_TransactionLogDetail: '424px',
      bl_BindingPhoneForm: '424px',
      bl_BindingEmailForm: '424px',
      bl_ChangePasswordForm: '500px',
      bl_ChangeAccountForm: '424px',
      bl_Forget: '500px',
      bl_MemberPofilePicture: '424px',
      bl_MobileRegistered: '424px',
      bl_Registered: '424px',
      bl_AllWallet: '648px',
      bl_Completed: '424px',
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
      // const query = Object.assign({}, router.currentRoute.query);
      router.replace({ query: null }).catch((err) => {});
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
          if (payload.component === 'bl_Register' || 
            payload.component === 'bl_Login' ||
            payload.component === 'bl_Forget' || 
            payload.component === 'bl_News' || 
            payload.component === 'bl_popPromotion') {
            payload.component = payload.component;
          } else {
            payload.component = 'bl_Login';
          }
          commit('dialog/open_CommandDialog', payload, { root: true });
        } else if (rootState.member.memberLogined === 'notYet' | rootState.member.memberLogined === true) {
          //  阻止登入後 又開啟登入註冊卡片
          if (payload.component === 'bl_Register' || payload.component === 'bl_Login') {
            router.push({ query: null, hash: null }).catch((err) => {});
            commit('dialog/close_CommandDialog', '', { root: true });
          } else {
            commit('dialog/open_CommandDialog', payload, { root: true });
          }
        }
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
