import { checkCodeAPI, gameCateAPI, gameIndexAPI, gameIsOrderAPI, gameListAPI, gameWaveAllAPI, gameWaveAPI, memberBindcardAPI, memberChangetelAPI, memberEditAPI, memberFindpwdAPI, memberGetCardinfoAPI, memberGetCardsAPI, memberInfoAPI, memberLoginAPI, memberPerformanceAPI, memberPromotionLinkAPI, memberRechargeAPI, memberRegisterAPI, memberResetpwdAPI, memberSubPerformanceAPI, memberToolsAPI, memberUnbindcardAPI, memberVerificationAPI, memberWalletAPI, orderAmountAPI, orderCreateAPI, publicPayAPI, publicUploadAPI, randomUsernameAPI, realTimeOddAPI, memberSetContactAPI, getGamePromotionAPI, getGmaePromotionDetailAPI } from '@/api';
import router from '@/router';

export default {
  moduleName: 'admin',
  namespaced: true,
  state: {
    isLogin: false,
    memberInfo: {},
    loginModal: false,
    registerModal: false,
    forgetModal: false,
    memberInfoModal: false,
    playModal: false,
    quickMoneyModal: false,
    nowEid: 0,
  },
  getters: {
    hasRealname(state) {
      if (state.memberInfo.realname) return state.memberInfo.realname.length > 0;
      return false;
    },
    hasWechat(state) {
      if (state.memberInfo.wechat) return state.memberInfo.wechat.length > 0;
      return false;
    },
  },
  mutations: {
    SET_LOGIN(state, status) {
      state.isLogin = status;
    },
    SET_MEMBERINFO(state, data) {
      state.memberInfo = data;
    },
    SET_LOGINMODAL(state, status) {
      state.loginModal = status;
    },
    SET_REGISTERMODAL(state, status) {
      state.registerModal = status;
    },
    SET_FORGETMODAL(state, status) {
      state.forgetModal = status;
    },
    SET_MEMBERINFOMODAL(state, status) {
      state.memberInfoModal = status;
    },
    SET_PLAYMODAL(state, status) {
      state.playModal = status;
    },
    SET_QUICKMONEYMODAL(state, status) {
      state.quickMoneyModal = status;
    },
    SET_NOWEID(state, status) {
      state.nowEid = status;
    },
  },
  actions: {
    // modal
    setLoginModal({ commit }, status) {
      commit('SET_LOGINMODAL', status);
    },
    setRegisterModal({ commit }, status) {
      commit('SET_REGISTERMODAL', status);
    },
    setForgetModal({ commit }, status) {
      commit('SET_FORGETMODAL', status);
    },
    setMemberInfoModal({ commit }, status) {
      commit('SET_MEMBERINFOMODAL', status);
    },
    setPlayModal({ commit }, status) {
      commit('SET_PLAYMODAL', status);
    },
    setQuickMoneyModal({ commit }, status) {
      commit('SET_QUICKMONEYMODAL', status);
    },
    setNowEid({ commit }, status) {
      commit('SET_NOWEID', status);
    },
    memberLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        memberLoginAPI(data).then((res) => {
          window.localStorage.setItem('token', res.data.data.token);
          window.localStorage.setItem('uid', res.data.data.uid);
          commit('SET_LOGIN', true);
          commit('SET_LOGINMODAL', false);
          router.push('/');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberRegister({ commit }, data) {
      return new Promise((resolve, reject) => {
        memberRegisterAPI(data).then((res) => {
          window.localStorage.setItem('token', res.data.data.login.token);
          window.localStorage.setItem('uid', res.data.data.login.uid);
          commit('SET_REGISTERMODAL', false);
          commit('SET_LOGIN', true);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberLogout({ dispatch, commit }) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('uid');
      window.localStorage.removeItem('is_demo');
      commit('SET_LOGIN', false);
      dispatch('notice/resetInbox', null, { root: true });
    },
    memberVerification(store, data) {
      return new Promise((resolve, reject) => {
        memberVerificationAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberFindpwd(store, data) {
      return new Promise((resolve, reject) => {
        memberFindpwdAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getRandomUsername() {
      return new Promise((resolve, reject) => {
        randomUsernameAPI().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    checkCode(store, data) {
      return new Promise((resolve, reject) => {
        checkCodeAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    checkGameIsOrder(store, data) {
      return new Promise((resolve, reject) => {
        gameIsOrderAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMemberInfo({ commit }) {
      return new Promise((resolve, reject) => {
        memberInfoAPI().then((res) => {
          commit('SET_MEMBERINFO', res.data.data);
          window.localStorage.setItem('is_demo', res.data.data.is_demo);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberTools(store, data) {
      return new Promise((resolve, reject) => {
        memberToolsAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    publicUpload(store, data) {
      return new Promise((resolve, reject) => {
        publicUploadAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    changePhone(store, data) {
      return new Promise((resolve, reject) => {
        memberChangetelAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    changePassowrd(store, data) {
      return new Promise((resolve, reject) => {
        memberResetpwdAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberEdit(store, data) {
      return new Promise((resolve, reject) => {
        memberEditAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberGetCards() {
      return new Promise((resolve, reject) => {
        memberGetCardsAPI().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberGetCardinfo(store, data) {
      return new Promise((resolve, reject) => {
        memberGetCardinfoAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberBindcard(store, data) {
      return new Promise((resolve, reject) => {
        memberBindcardAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberUnbindcard(store, data) {
      return new Promise((resolve, reject) => {
        memberUnbindcardAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    publicPay() {
      return new Promise((resolve, reject) => {
        publicPayAPI().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberRecharge(store, data) {
      return new Promise((resolve, reject) => {
        memberRechargeAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    memberWallet(store, data) {
      return new Promise((resolve, reject) => {
        memberWalletAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGameList(store, data) {
      return new Promise((resolve, reject) => {
        gameListAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGameWave(store, data) {
      return new Promise((resolve, reject) => {
        gameWaveAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGameWaveAll(store, data) {
      return new Promise((resolve, reject) => {
        gameWaveAllAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGameCate(store, data) {
      return new Promise((resolve, reject) => {
        gameCateAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    orderCreate(store, data) {
      return new Promise((resolve, reject) => {
        orderCreateAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMemberPromotionLink() {
      return new Promise((resolve, reject) => {
        memberPromotionLinkAPI().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMemberPerformance(store, data) {
      return new Promise((resolve, reject) => {
        memberPerformanceAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMemberSubPerformance() {
      return new Promise((resolve, reject) => {
        memberSubPerformanceAPI().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGameIndex(store, data) {
      return new Promise((resolve, reject) => {
        gameIndexAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getOrderAmount(store, data) {
      return new Promise((resolve, reject) => {
        orderAmountAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getRealTimeOdd(store, data) {
      return new Promise((resolve, reject) => {
        realTimeOddAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    setContact(store, data) {
      return new Promise((resolve, reject) => {
        memberSetContactAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGamePromotion(store, data) {
      return new Promise((resolve, reject) => {
        getGamePromotionAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getGamePromotionDetail(store, payload) {
      return new Promise((resolve, reject) => {
        getGmaePromotionDetailAPI(payload, payload.id).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
