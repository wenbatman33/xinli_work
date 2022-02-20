export default {
  namespaced: true,
  state: { 
    WindowWidth: 0,
    WindowHeight: 0,
    DeviceIsPc: false,
  },
  mutations: {
    mu_WindowSize(state, payload) {
      state.WindowWidth = payload.WindowWidth;
      state.WindowHeight = payload.WindowHeight;
      if (payload.WindowWidth > 720) {
        state.DeviceIsPc = true;
      } else {
        state.DeviceIsPc = false;
      }
    },
  },
  actions: {
    ac_WindowSize({ commit }, payload) { commit('setting/mu_WindowSize', payload, { root: true }); },
    ac_CheckDevice({ commit }, payload) { commit('setting/mu_CheckDevice', payload, { root: true }); },
  },
};
