import * as types from '../mutation-types'
import { getPayServiceListAPI } from '@/api/payment/payChannel';

// state
export const state = {
  serviceCode: {},
}

// mutations
export const mutations = {
  [types.SET_SERVICE_CODE] (state, serviceCode) {
    state.serviceCode = serviceCode;
  }
}

// actions
export const actions = {
  fetchServiceCode({ commit }) {
    getPayServiceListAPI().then(response => {
      commit(types.SET_SERVICE_CODE, response.data.data[0]);
    });
  }
}
