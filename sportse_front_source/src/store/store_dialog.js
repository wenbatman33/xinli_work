export default {
  namespaced: true,
  state: {
    ShowToastDialog: false,
    ToastTitle: '',
    CardComponent: '',
  },
  mutations: {
    setToastDialog(state, value) {
      state.ShowToastDialog = value;
    },
    setCardComponent(state, payload) {
      state.ToastTitle = payload.title;
      state.CardComponent = payload.component;
    },
  },
  actions: {
    openToastDialog({ commit }, payload) {
      commit('dialog/setToastDialog', true, { root: true });
      commit('dialog/setCardComponent', payload, { root: true });
    },
    closeToastDialog({ commit }) {
      commit('dialog/setToastDialog', false, { root: true });
    },

  },
};
