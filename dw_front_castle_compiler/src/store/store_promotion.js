import axios from 'axios';

export default {
  namespaced: true,
  state: {
    promotionList: [],
    myPromotionList: [],
    myPromotionDetail: [],
    currentPromotionId: 0,
    currentPromotion: {},
  },
  mutations: {
    setPromotionList(state, payload) {
      state.promotionList = payload;
    },
    setMyPromotionList(state, payload) {
      state.myPromotionList = payload;
    },
    setMyPromotionDetail(state, payload) {
      state.myPromotionDetail = payload;
    },
    setCurrentPromotionId(state, payload) {
      state.currentPromotionId = payload;
    },
    setCurrentPromotion(state, payload) {
      state.currentPromotion = payload;
    },
  },
  actions: {
    getPromotionList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.promotion_group_id = payload.promotion_group_id || '';
        axios.get(`/api/FrontendPromotion?promotion_group_id=${payload.promotion_group_id}&page=1&per_page=100`)
          .then((res) => {
            commit('promotion/setPromotionList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCurrentPromotion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.id = payload.id || '';
        axios.get(`/api/FrontendPromotion/${payload.id}`)
          .then((res) => {
            commit('promotion/setCurrentPromotion', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getMyPromotionList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.status = payload.status || 0;
        axios.get(`/api/MyPromotion?status=${payload.status}&page=1&per_page=20`)
          .then((res) => {
            // console.log(res);
            commit('promotion/setMyPromotionList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getMyPromotionDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/MyPromotionDetail?promotion_id=${payload.promotion_id}&page=1&per_page=20`)
          .then((res) => {
            commit('promotion/setMyPromotionDetail', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getMyPromotionDetailShow({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/promotionDetailShow/${payload.promotion_detail_id}`)
          .then((res) => {
            commit('promotion/setMyPromotionDetail', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 申請優惠
    promotionApply({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/FrontendPromotion/Apply', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 放棄優惠
    promotionGiveUp({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/FrontendPromotion/GiveUp', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 領取我的優惠
    MyPromotionBonus({ commit }, payload) {
      // {
      //   "promotion_detail_id": 1,
      //   "province": 1,
      //   "city": 37,
      //   "state": 567,
      //   "address": "abc"
      // }
      return new Promise((resolve, reject) => {
        axios.post('/api/MyPromotionBonus', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
