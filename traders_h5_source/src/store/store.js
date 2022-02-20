import vue from 'vue';
import vuex from 'vuex';
import setting from '@/store/store_setting';
import member from '@/store/store_member';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    setting,
    member,
  },
});
