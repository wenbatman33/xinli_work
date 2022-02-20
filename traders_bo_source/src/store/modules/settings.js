import defaultSettings from '@/settings'

const { title, logo, logo2, fixedHeader } = defaultSettings

const state = {
  title: title,
  logo: logo,
  logo2: logo2,
  fixedHeader: fixedHeader
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
