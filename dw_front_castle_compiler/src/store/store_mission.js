import axios from 'axios';
import store from '@/store/store';
import { MessageBox, Message } from 'element-ui';

const getTaskMemberStatusAPI = () => axios.get('/api/Task/Member/Status');
// 取得完善資料狀況------------------------------------------------------------------
const getTaskPersonInfoTableAPI = () => axios.get('/api/Task/PersonInfo/Table');
// 領取完善資料獎勵
const submitTaskPersonInfoAPI = payload => axios.post('/api/Task/PersonInfo', payload);
// 取得簽到面板----------------------------------------------------------------------
const getTaskSignatureTableAPI = () => axios.get('/api/Task/Signature/Table');
// 每日簽到
const submitTaskSignatureAPI = payload => axios.post('/api/Task/Signature', payload);
// 免費補簽
const submitFreeSignatureAPI = payload => axios.post('/api/Task/FreeSignature', payload);
// 取得個人推廣連結 ------------------------------------------------------------------
const getTaskShareLinkAPI = () => axios.get('/api/Task/Share/Link');
// 領取每日分享獎勵
const submitTaskShareAPI = payload => axios.post('/api/Task/Share', payload);
// 領取每日紅包獎勵  ------------------------------------------------------------------
const getTaskBonusAPI = payload => axios.post('/api/Task/Bonus', payload);
// 搶紅包剩餘次數
const getTaskBonusCountAPI = () => axios.get('/api/Task/Bonus/Count');

export default {
  namespaced: true,
  state: {
    activeTask: -1,
    memberAllTasks: [],
    TaskPersonInfoTable: [],
    TaskSignatureTable: [],
    TaskShareLink: [],
    TaskBonus: [],
    bonusTimes: '',
  },
  mutations: {
    setActiveTask(state, payload) {
      state.activeTask = payload;
    },
    setMemberAllTasks(state, payload) {
      state.memberAllTasks = payload;
    },
    setTaskPersonInfoTable(state, payload) {
      state.TaskPersonInfoTable = payload[0];
    },
    setTaskSignatureTable(state, payload) {
      state.TaskSignatureTable = payload[0];
    },
    setTaskShareLink(state, payload) {
      state.TaskShareLink = payload;
    },
    setTaskBonus(state, payload) {
      state.TaskBonus = payload;
    },
    setBonusTimes(state, payload) {
      state.bonusTimes = payload;
    },
  },
  actions: {
    getMemberAllTasks({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskMemberStatusAPI()
          .then((res) => { 
            commit('mission/setMemberAllTasks', res.data.data, { root: true }); 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    // 取得完善個人資料------------------------------------------------------------------
    getTaskPersonInfoTable({ commit }) {
      getTaskPersonInfoTableAPI().then((res) => { commit('mission/setTaskPersonInfoTable', res.data.data, { root: true }); }).catch((error) => { console.log(error); });
    },
    submitTaskPersonInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        submitTaskPersonInfoAPI(payload).then((res) => {
          // 成功後 再次取得完善個人資料
          store.dispatch('mission/getTaskPersonInfoTable', payload);
          Message({ message: '成功领取完善资料奖励', type: 'success' });
          resolve(res);
        })
        .catch((error) => { 
          reject(error); 
        });
      }); 
    },
    // 取得簽到面板 ------------------------------------------------------------------
    getTaskSignatureTable({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskSignatureTableAPI()
          .then((res) => { 
            commit('mission/setTaskSignatureTable', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    // 每日簽到
    submitTaskSignature({ commit }) {
      return new Promise((resolve, reject) => {
        submitTaskSignatureAPI().then((res) => { 
          Message({ message: '成功签到', type: 'success' });
          store.dispatch('mission/getTaskSignatureTable');
          resolve(res);
        }).catch((error) => { 
          console.log(error); 
          reject(error); 
        });
      });
    },
    // 免費補簽
    submitFreeSignature({ commit }, payload) {
      return new Promise((resolve, reject) => {
        submitFreeSignatureAPI(payload).then((res) => { 
          Message({ message: '成功补签', type: 'success' });
          store.dispatch('mission/getTaskSignatureTable');
          resolve(res);
        }).catch((error) => { 
          console.log(error);
          reject(error);  
        });
      });
    },
    // 取得個人推廣連結------------------------------------------------------------------
    getTaskShareLink({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskShareLinkAPI()
          .then((res) => { 
            console.log(res.data.data)
            commit('mission/setTaskShareLink', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    // 領取每日分享獎勵
    submitTaskShare({ commit }, payload) {
      submitTaskShareAPI(payload);
    },
    // ------------------------------------------------------------------
    getTaskBonus({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getTaskBonusAPI(payload)
          .then((res) => { 
            commit('mission/setTaskBonus', res.data.data[0], { root: true });
            resolve(res);
          }).catch((error) => { 
            reject(error);
          });
      });
    },
    getBonusTimes({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskBonusCountAPI()
          .then((res) => {
            resolve(res);
            commit('mission/setBonusTimes', res.data.data[0].count, { root: true });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
