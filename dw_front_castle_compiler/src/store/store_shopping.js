import axios from 'axios';

const getGoodsListAPI = payload => axios.get(`/api/GoodsList?page=${payload.page}&per_page=${payload.per_page}&category=${payload.category}&name=${payload.name}`);
const getGoodsDetailAPI = payload => axios.get(`/api/GoodsList?&id=${payload.id}`);
const getGoodsOrderAPI = payload => axios.get(`/api/GoodsOrder?sdate=${payload.sdate}&edate=${payload.edate}&status=${payload.status}`);
const getPointRecordAPI = payload => axios.get(`/api/Member/PointRecord?sdate=${payload.sdate}&edate=${payload.edate}&page=${payload.page}&per_page=${payload.per_page}`);

export default {
  namespaced: true,
  state: {
    goodsList: [],
    goodsDetail: [],
    goodsCartList: [],
    goodsOrder: [],
    goodsOrderTotal: 0,
    pointRecord: [],
    pointRecordTotal: 0,
  },
  mutations: {
    setGoodsList(state, payload) {
      state.goodsList = payload;
    },
    setGoodsDetail(state, payload) {
      state.goodsDetail = payload;
    },
    setGoodsCartList(state, payload) {
      state.goodsCartList = [];
      state.goodsCartList = payload;
      // 暫存至 localStorage
      window.localStorage.setItem(`CART_${window.localStorage.LC_API_ID}`, JSON.stringify(payload));
      window.localStorage.setItem('CARTTIME', Date.now());
    },
    setGoodsOrder(state, payload) {
      state.goodsOrder = [];
      state.goodsOrder = payload;
    },
    setGoodsOrderTotal(state, payload) {
      state.goodsOrderTotal = payload;
    },
    setPointRecord(state, payload) {
      state.pointRecord = [];
      state.pointRecord = payload;
    },
    setPointRecordTotal(state, payload) {
      state.pointRecordTotal = payload;
    },
  },
  actions: {
    getGoodsList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getGoodsListAPI(payload)
          .then((res) => {
            commit('shopping/setGoodsList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    getGoodsDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getGoodsDetailAPI(payload)
          .then((res) => {
            commit('shopping/setGoodsDetail', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error); 
          });
      });
    },
    getGoodsOrder({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getGoodsOrderAPI(payload)
          .then((res) => {
            commit('shopping/setGoodsOrder', res.data.data, { root: true });
            // commit('shopping/setGoodsOrderTotal', res.data.meta.pagination.total, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error); 
          });
      });
    },
    getPointRecord({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getPointRecordAPI(payload)
          .then((res) => {
            commit('shopping/setPointRecord', res.data.data, { root: true });
            commit('shopping/setPointRecordTotal', res.data.meta.pagination.total, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error); 
          });
      });
    },
    checkGoodsCartList({ commit }) {
      if (window.localStorage[`CART_${window.localStorage.LC_API_ID}`]) {
        commit('shopping/setGoodsCartList', JSON.parse(window.localStorage[`CART_${window.localStorage.LC_API_ID}`]), { root: true });
      }
    },
  },
};
