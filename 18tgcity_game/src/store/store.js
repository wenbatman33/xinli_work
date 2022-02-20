import vue from 'vue';
import vuex from 'vuex';
import member from './store_member';
import index from './store_index';
import game from './store_game';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    index,
    member,
    game,
  },
});
