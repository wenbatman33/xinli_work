import vue from 'vue';
import vuex from 'vuex';
import userSetting from '@/store/store_userSetting';
import index from '@/store/store_index';
import member from '@/store/store_member';
import news from '@/store/store_news';
import wallet from '@/store/store_wallet';
import shopping from '@/store/store_shopping';
import mission from '@/store/store_mission';
import bet from '@/store/store_bet';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    userSetting,
    index,
    member,
    news,
    wallet,
    shopping,
    mission,
    bet,
  },
});
