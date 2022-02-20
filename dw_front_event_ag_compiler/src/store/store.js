import vue from 'vue';
import vuex from 'vuex';
import event_1 from '@/store/store_event_1';
import index from '@/store/store_index';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    index,
    event_1,
  },
});
