import Vue from 'vue';
import Vuex from 'vuex';
import index from '@/store/store_index';
import member from '@/store/store_member';
import payment from '@/store/store_payment';
import promotion from '@/store/store_promotion';
import games from '@/store/store_games';
import userSetting from '@/store/store_userSetting';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index,
    member,
    payment,
    promotion,
    games,
    userSetting,
  },
});
