export default {
  namespaced: true,
  state: {
    siteHost: '',
  },
  mutations: {
    setSiteHost(state, payload) {
      state.siteHost = payload;
    },
  },
  actions: {
  },
};
