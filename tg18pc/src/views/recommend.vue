<template lang='pug'>
  .container-fluid.tgGamePgae
    tgNavi
    tgBrandBanner
    tgGamesTab
    tgGamesSearch(v-if='Searching')
    div(v-else)
      .container.mt-5.mb-5
        h4.title 最受欢迎
        tgRecommendList(:GameTag='15'  :listItem=4  :GAcategory='"推薦遊戲"'  :GAlabel='"game_hot"')
      .container.mt-5.mb-5
        h4.title 猜你喜欢
        tgRecommendList(:GameTag='16'  :listItem=4  :GAcategory='"推薦遊戲"'  :GAlabel='"game_guess"')
      .container.mt-5.mb-5
        h4.title 热门推荐
        tgRecommendList(:GameTag='17'  :listItem=32  :GAcategory='"推薦遊戲"'  :GAlabel='"game_recommand"')
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgBrandBanner from '@/components/tgGames/tgBrandBanner/tgBrandBanner.vue';
import tgGamesTab from '@/components/tgGames/tgGamesTab/tgGamesTab.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgRecommendContent from '@/components/tgGames/tgRecommendContent/tgRecommendContent.vue';
import tgRecommendList from '@/components/tgGames/tgRecommendContent/tgRecommendList.vue';
import tgGamesSearch from '@/components/tgGames/tgGamesSearch/tgGamesSearch.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('game', [
      'Searching',
    ]),
  },
  components: {
    tgNavi,
    tgBrandBanner,
    tgGamesTab,
    tgFooter,
    tgRecommendContent,
    tgRecommendList,
    tgGamesSearch,
  },
  beforeDestroy() {
    this.$store.dispatch('game/CloseSearching', '');
  },
};
</script>
<style lang="scss" scoped>
.tgGamePgae{
  min-height:400px;
  background-image: #fff
}
.title{
  .subTitle{
    margin-left: 10px;
    font-size: 13px;
    color: #8c8c8c;
  }
}
</style>
