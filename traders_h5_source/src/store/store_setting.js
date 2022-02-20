export default {
  namespaced: true,
  state: { 
    windowWidth: 0,
    windowHeight: 0,
    deviceIsPc: false,
    DialogShow: false,
    DialogComponent: '',
  },
  mutations: {
    mu_WindowSize(state, payload) {
      state.windowWidth = payload.windowWidth;
      state.windowHeight = payload.windowHeight;
      if (payload.windowWidth > 720) {
        state.deviceIsPc = true;
      } else {
        state.deviceIsPc = false;
      }
    },
    setDialogShow(state) {
      state.DialogShow = true;
    },
    setDialogHide(state) {
      state.DialogShow = false;
    },
    setDialogComponent(state, payload) {
      state.DialogComponent = payload;
    },
  },
  actions: {
    ac_WindowSize({ commit }, payload) { commit('setting/mu_WindowSize', payload, { root: true }); },
    ac_CheckDevice({ commit }, payload) { commit('setting/mu_CheckDevice', payload, { root: true }); },
  },
};
