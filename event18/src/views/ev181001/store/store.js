import vue from 'vue';
import vuex from 'vuex';
import member from './store_member';
import index from './store_index';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    member,
    index,
  },
});
