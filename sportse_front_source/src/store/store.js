import vue from 'vue';
import vuex from 'vuex';
import setting from '@/store/store_setting';
import dialog from '@/store/store_dialog';
import member from '@/store/store_member';
import game from '@/store/store_game';
import index from '@/store/store_index';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    setting,
    dialog,
    member,
    game,
    index,
  },
});
