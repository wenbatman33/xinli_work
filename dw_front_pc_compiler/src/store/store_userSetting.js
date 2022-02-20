export default {
  namespaced: true,
  state: {
    UserAgent: window.navigator.userAgent,
    darkMode: window.localStorage.darkMode | 0,
    UserBrowser: '',
    navOpen: false,
    userGuide: false,
  },
  mutations: {
    changeDarkMode(state, payload) {
      state.darkMode = payload;
      window.localStorage.setItem('darkMode', payload);
    },
    setUserBrowser(state, payload) {
      state.UserBrowser = payload;
    },
    setNavOpen(state, payload) {
      state.navOpen = payload;
    },
    setUserGuide(state, payload) {
      state.userGuide = payload;
    },
  },
  actions: {
    getUserBrowser({ commit }) {
      const UA = navigator.userAgent;
      if (UA.indexOf('Opera') !== -1) {
        commit('userSetting/setUserBrowser', 'Opera', { root: true });
      } else if (UA.indexOf('QHBrowserHD') !== -1) {
        commit('userSetting/setUserBrowser', '360HD', { root: true });
      } else if (UA.indexOf('QHBrowser') !== -1) {
        commit('userSetting/setUserBrowser', '360', { root: true });
      } else if (UA.indexOf('UCBrowser') !== -1) {
        commit('userSetting/setUserBrowser', 'UCBrowser', { root: true });
      } else if (UA.indexOf('MQBHD') !== -1) {
        commit('userSetting/setUserBrowser', 'QQBrowserHD', { root: true });
      } else if (UA.indexOf('QQBrowser') !== -1) {
        commit('userSetting/setUserBrowser', 'QQBrowser', { root: true });
      } else if (UA.indexOf('MSIE') !== -1) {
        commit('userSetting/setUserBrowser', 'IE', { root: true });
      } else if (UA.indexOf('.NET') !== -1) {
        commit('userSetting/setUserBrowser', 'IE', { root: true });
      } else if (UA.indexOf('Edge') !== -1) {
        commit('userSetting/setUserBrowser', 'IE', { root: true });
      } else if (UA.indexOf('Chrome') !== -1) {
        commit('userSetting/setUserBrowser', 'Chrome', { root: true });
      } else if (UA.indexOf('BIDUBrowser') !== -1) {
        commit('userSetting/setUserBrowser', 'BIDU', { root: true });
      } else if (UA.indexOf('Firefox') !== -1) {
        commit('userSetting/setUserBrowser', 'Firefox', { root: true });
      } else if (UA.indexOf('Netscape') !== -1) {
        commit('userSetting/setUserBrowser', 'Netscape', { root: true });
      } else if (UA.indexOf('Safari') !== -1) {
        commit('userSetting/setUserBrowser', 'Safari', { root: true });
      } else {
        commit('userSetting/setUserBrowser', 'unknown', { root: true });
      }
    },
  },
};
