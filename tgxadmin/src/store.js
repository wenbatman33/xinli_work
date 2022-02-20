import Vuex from 'vuex'
import member from '@/store/store_member.js'
import location from '@/store/store_location.js'
import common from '@/store/store_common.js'
import tab from '@/store/store_tab.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hide_menu: false,
    page_sizes_type1: 10,
    page_sizes_type2: [100, 300, 500],
    page_sizes_type3: [10, 30, 50, 100],
  },
  mutations: {
    switch_menu(state, flag) {
      state.hide_menu = flag
    },
  },
  actions: {

  },
  modules: {
    member,
    location,
    common,
    tab,
  },
})