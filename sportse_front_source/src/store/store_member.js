/*eslint-disable*/
import store from '@/store/store';
import md5 from 'js-md5';

import { 
  signUpAPI,
  loginAPI,
  logoutAPI,
  memberPersonalAPI,
  walletAPI,
  memberRealnameAPI,
  memberPhoneAPI,
  memberPasswordAPI,
  memberBankCardAPI,
  addMemberBankCardAPI,
  depositAPI,
  withdrawAPI,
} from '@/api';

export default {
  namespaced: true,
  state: {
    MemberLogined: false,
    Wallet: {
      betAmount:'',
      betCnt:'',
      betWinAmount:'',
      memberAccount:'',
      walletAmount:'',
      walletDepositAmount:'',
      walletGameAmount:'',
      walletLockAmount:'',
      walletMinusAmount:'',
      walletPlusAmount:'',
      walletWithdrawAmount:'',
    },
    PersonalDetail:{
      agencyCode:'',
      memberAccount:'',
      memberCreatedAt:'',
      memberLastLoginAt:'',
      memberPhone:'',
      memberRealname:'',
    },
    BankCard: {
      memberBankBranch:'',
      memberBankName:'',
      memberBankNo:'',
      memberRealname:'',
    },
    TransactionLogDetail: null,
  },
  mutations: {
    setMemberLogin(state) {
      state.MemberLogined = true;
    },
    setMemberLogout(state) {
      const emptyPersonalDetail= {
        agencyCode:'',
        memberAccount:'',
        memberCreatedAt:'',
        memberLastLoginAt:'',
        memberPhone:'',
        memberRealname:'',
      };
      const emptyBankCard= {
        memberBankBranch:'',
        memberBankName:'',
        memberBankNo:'',
        memberRealname:'',
      };
      const emptyWallet= {
        betAmount:'',
        betCnt:'',
        betWinAmount:'',
        memberAccount:'',
        walletAmount:'',
        walletDepositAmount:'',
        walletGameAmount:'',
        walletLockAmount:'',
        walletMinusAmount:'',
        walletPlusAmount:'',
        walletWithdrawAmount:'',
      };
      state.PersonalDetail = emptyPersonalDetail;
      state.BankCard = emptyBankCard;
      state.Wallet = emptyWallet;
      state.MemberLogined = false;
    },
    setPersonalDetail(state, payload) {
      state.PersonalDetail = payload;
    },
    setWallet(state, payload) {
      state.Wallet = payload;
    },
    setBankCard(state, payload) {
      state.BankCard = payload;
    },
    setTransactionLogDetail(state, payload) {
      state.TransactionLogDetail = payload;
    },
  },
  actions: {
    updateMemberStatus({ commit }) {
      return new Promise((resolve, reject) => {
        let loginedDispath;
        if (window.localStorage.JWT_TOKEN) {
          loginedDispath=[
            store.dispatch('member/getBankCard'),
            store.dispatch('member/memberWallet'),
            store.dispatch('member/memberPersonal')
          ];
          commit('member/setMemberLogin', '', { root: true });
        } else{
          commit('member/setMemberLogout', '' , { root: true });
        }
        Promise.all([loginedDispath]).finally(() => {
          resolve('logined');
        })
      });
    },
    memberPersonal({ commit }) {
      return new Promise((resolve, reject) => {
        memberPersonalAPI()
          .then((res) => {
            commit('member/setPersonalDetail', res.data.data[0], { root: true });
          }).catch((err) => {
            reject(err);
          });
      });
    },
    memberWallet({ commit }) {
      return new Promise((resolve, reject) => {
        walletAPI().then((res) => {
          commit('member/setWallet', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    login({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      return new Promise((resolve, reject) => {
        loginAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logoutAPI().then((res) => {
          window.localStorage.removeItem('JWT_TOKEN');
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    signUp({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      return new Promise((resolve, reject) => {
        signUpAPI(payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    chaengRealName({ commit }, payload) {
      return new Promise((resolve, reject) => {
        memberRealnameAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    chaengPhone({ commit }, payload) {
      return new Promise((resolve, reject) => {
        memberPhoneAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    chaengPassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        memberPasswordAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getBankCard({ commit }, payload) {
      return new Promise((resolve, reject) => {
        memberBankCardAPI(payload).then((res) => {
          if(res.data.data.length>0) commit('member/setBankCard', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    addBankCard({ commit }, payload) {
      return new Promise((resolve, reject) => {
        addMemberBankCardAPI(payload).then((res) => {
          store.dispatch('member/getBankCard');
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    deposit({ commit }, payload) {
      return new Promise((resolve, reject) => {
        depositAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    withdraw({ commit }, payload) {
      return new Promise((resolve, reject) => {
        withdrawAPI(payload).then((res) => {
          store.dispatch('member/updateMemberStatus');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
