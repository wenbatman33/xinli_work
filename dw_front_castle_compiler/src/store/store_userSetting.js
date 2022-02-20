export default {
  namespaced: true,
  state: {
    UserAgent: window.navigator.userAgent,
    darkMode: window.localStorage.darkMode | 1,
  },
  mutations: {
    changeDarkMode(state, payload) {
      state.darkMode = payload;
      window.localStorage.setItem('darkMode', payload);
    },
  },
  actions: {
  },
};
