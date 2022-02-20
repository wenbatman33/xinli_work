import router from '@/router';
import { 
  MemberAPI, 
  MemberInfoAPI, 
  MemberLoginAPI, 
  MemberSubListAPI,
  MemberOderListAPI,
  MemberPointLogAPI,
} from '@/api';

export default {
  namespaced: true,
  state: {
    MemberLogined: false,
    MemberInfo: null,
    MemberData: null,
    MemberSubList: null,
    SubMemberignId: null,
    MemberOderList: null,
    MemberPointLog: [],
  },
  mutations: {
    memberLogin(state) {
      state.MemberLogined = true;
    },
    memberLogout(state) {
      state.MemberLogined = false;
    },
    setMemberData(state, payload) {
      state.MemberData = payload;
    },
    setMemberInfo(state, payload) {
      state.MemberInfo = payload;
    },
    setMemberSubList(state, payload) {
      state.MemberSubList = payload;
    },
    setSubMemberignId(state, payload) {
      state.SubMemberignId = payload;
    },
    setMemberOderList(state, payload) {
      state.MemberOderList = payload;
    },
    cleanMemberPointLog(state) {
      state.MemberPointLog = [];
    },
    setMemberPointLog(state, payload) {
      // console.log(payload);
      const temp = [...state.MemberPointLog, ...payload];
      state.MemberPointLog = temp;
    },
  },
  actions: {
    MemberLogin({ commit }, payload) {
      const vm = this;
      return new Promise((resolve, reject) => {
        MemberLoginAPI(payload).then((res) => {
          commit('member/memberLogin', '', { root: true });
          vm.dispatch('member/Member');
          vm.dispatch('member/getMemberSubList');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    MemberLogOut({ commit }) {
      window.localStorage.removeItem('JWT_TOKEN');
      commit('member/memberLogout', '', { root: true });
      router.push({ path: 'login' });
    },

    Member({ commit }) {
      return new Promise((resolve, reject) => {
        MemberAPI().then((res) => {
          commit('member/setMemberData', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMemberSubList({ commit }) {
      return new Promise((resolve, reject) => {
        MemberSubListAPI().then((res) => {
          commit('member/setMemberSubList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },  
    getMemberOderList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        MemberOderListAPI(payload).then((res) => {
          commit('member/setMemberOderList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },  
    getMemberPointLog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        MemberPointLogAPI(payload).then((res) => {
          commit('member/setMemberPointLog', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },  
    
    checkMemberInfo({ commit }) {
      return new Promise((resolve, reject) => {
        MemberInfoAPI().then((res) => {
          commit('member/setMemberInfo', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
