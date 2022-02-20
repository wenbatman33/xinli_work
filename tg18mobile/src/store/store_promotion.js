import axios from 'axios';
// import jwt from 'jwt-simple'
// import Fingerprint2 from 'fingerprintjs2'
// import router from '../router/router'
export default {
  namespaced: true,
  state: {
    promotionsGroup: '',
    promotionsList: '',
    DialogTitle: '',
    DialogMessage: '',
    DialogIMG: '',
  },
  mutations: {
    getPromotionsGroup(state, payload) {
      state.promotionsGroup = payload;
    },
    getPromotionsList(state, payload) {
      state.promotionsList = payload;
    },
    setDialogTitle(state, payload) {
      state.DialogTitle = payload;
    },
    setDialogMessage(state, payload) {
      state.DialogMessage = payload;
    },
    setDialogIMG(state, payload) {
      state.DialogIMG = payload;
    },
  },
  getters: {},
  actions: {
    PromotionsGroup({ commit }, payload) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PromotionsGroup`, payload)
        .then((res) => {
          commit('promotion/getPromotionsGroup', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    PromotionsList({ commit }, payload) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PromotionsList`, payload)
        .then((res) => {
          commit('promotion/getPromotionsList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
