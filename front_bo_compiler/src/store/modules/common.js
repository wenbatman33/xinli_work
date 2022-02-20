import * as types from '../mutation-types'
import provinceList from '../province.json'

// state
export const state = {
  devices: {
    '1': 'WebPC',
    '2': 'WebMobile',
    '3': 'iOSPhone',
    '4': 'AndroidPhone'
  },
  province: {},
  hasLog: false,
  deepLinkCategories: {
    1: '首页',
    2: '优惠',
    3: '优惠内容',
    4: '存提卡片',
    6: '我的/个人中心',
    7: '我的优惠',
    8: '优惠明细',
    11: '公告内容',
    12: '公告列表',
    13: 'APP内开网页',
    14: 'APP外开网页',
    15: '竟猜页面',
    16: '开启游戏',
  },
  deepLinkNeedIDList: [3, 8, 11],
  deepLinkNeedURLList: [13, 14],
  deepLinkNeedGameList: [16],
  withdrawalFailReason: [
    '流水不足',
    '联系风控',
    '银行维护',
    '游戏后台维护',
    '系统维护',
    '请核实卡号讯息',
    '请联系客服了解详情',
    '请重新提交',
  ],
}

// getters
export const getters = {
  deepLinkCategoriesNoGame: state => {
    const result = Object.assign({}, state.deepLinkCategories);
    delete result[16];
    return result;
  }
}

// mutations
export const mutations = {
  [types.SET_PROVINCE] (state) {
    state.provinceList = Object.keys(provinceList).map(provinceKey => {
      const province = provinceList[provinceKey];

      return {
        value: province[0].province,
        label: province[0].province,
        children: province.map(city => {
          return {
            value: city.name,
            label: city.name
          }
        })
      }
    });
  },

  [types.SET_HAS_LOG] (state, payload) {
    state.hasLog = payload;
  }
}

// actions
export const actions = {
  fetchProvinceList({ commit }) {
    commit(types.SET_PROVINCE);
  },

  setHasLog({ commit }, payload) {
    commit(types.SET_HAS_LOG, payload);
  }
}
