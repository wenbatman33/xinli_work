import vue from 'vue';
import vuex from 'vuex';
import member from '@/store/store_member';
import index from '@/store/store_index';
import game from '@/store/store_game';
import promotion from '@/store/store_promotion';
import news from '@/store/store_news';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    member,
    index,
    game,
    promotion,
    news,
  },
});
