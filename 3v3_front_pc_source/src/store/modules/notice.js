import Vue from 'vue';
import {
  getNoticesAPI,
  getMemberInboxAPI,
  putMemberInboxAPI,
} from '@/api';
import * as names from '../mutationNames';

/**
 * 公告
 * --------
 * 目前只有header的使用 网站公告page內無使用
 */
export default {
  namespaced: true,

  // state
  state: {
    notices: [],
    notice: {},
    index: 0,
    inbox: [],
  },

  // getters
  getters: {
    getNotices: (state) => state.notices.map((item) => {
      Vue.set(item, 'Collapse', false);
      return item;
    }),

    getNotice: (state) => state.notice || {},
  },

  // mutations
  mutations: {
    [names.SAVE_NOTICES](state, notices) {
      state.notices = notices;
    },

    [names.NEXT_NOTICE](state) {
      state.notice = state.notices[state.index % (state.notices.length - 1)];
      state.index += 1;
    },

    [names.SAVE_INBOX](state, inbox) {
      state.inbox = inbox;
    },

    [names.RESET_INBOX](state) {
      state.inbox = [];
    },
  },

  // actions
  actions: {
    // MARK: 目前公告每次都會重新抓
    fetchNotices({ commit }) {
      return new Promise((resolve, reject) => {
        getNoticesAPI().then((res) => {
          commit(names.SAVE_NOTICES, res.data.data.list);
          commit(names.NEXT_NOTICE);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    nextNotice({ commit }) {
      commit(names.NEXT_NOTICE);
    },

    /* eslint no-param-reassign: ["error", { "props": false }] */
    fetchInbox({ commit }) {
      return new Promise((resolve, reject) => {
        getMemberInboxAPI().then((res) => {
          const tableData = res.data.data.list.map((item) => {
            item.Collapse = false;
            return item;
          });
          commit(names.SAVE_INBOX, tableData);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    editInbox(store, data) {
      return new Promise((resolve, reject) => {
        putMemberInboxAPI(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    resetInbox({ commit }) {
      commit(names.RESET_INBOX);
    },
  },
};
