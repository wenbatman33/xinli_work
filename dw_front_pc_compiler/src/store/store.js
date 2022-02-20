import vue from 'vue';
import vuex from 'vuex';
import userSetting from '@/store/store_userSetting';
import dialog from '@/store/store_dialog';
import index from '@/store/store_index';
import member from '@/store/store_member';
import news from '@/store/store_news';
import wallet from '@/store/store_wallet';
import game from '@/store/store_game';
import promotion from '@/store/store_promotion';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    userSetting,
    dialog,
    index,
    member,
    news,
    wallet,
    game,
    promotion,
  },
});
