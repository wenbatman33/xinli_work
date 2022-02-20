import vue from 'vue';
import vuex from 'vuex';
import member from './store_member';
import index from './store_index';
import game from './store_game';
import promotion from './store_promotion';
import news from './store_news';

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
