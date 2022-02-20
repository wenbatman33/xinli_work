<template lang="pug">
  .container-fluid.tgHeroBoard
    .container
      .row
        .col-4
          h3 累积奖池
          ul
            li(v-for="(item, index) in 5")
              tgJackpotBoardGameBtn(v-if='WinnerJackpot[index]', :gameData='WinnerJackpot[index]'  :GAlabel='GAlabels[0]')
              tgHeroBoardGameEmpty(v-else)
        //- .col-4
          h3 最新赢家
          ul
            li(v-if='WinnerNewest' v-for="(item, index) in 5")
              tgHeroBoardGameBtn(v-if='WinnerNewest[index]', :gameData='WinnerNewest[index]'  :GAlabel='GAlabels[1]')
              tgHeroBoardGameEmpty(v-else)
        //- .col-4
          h3 大奖赢家
          ul
            li(v-for="(item, index) in 5")
              tgHeroBoardGameBtn(v-if='WinnerHighest[index]', :gameData='WinnerHighest[index]'  :GAlabel='GAlabels[2]')
              tgHeroBoardGameEmpty(v-else)
        .col-4
          h3 一週贏家
          ul
            li(v-if='WeekWinner' v-for="(item, index) in 5")
              tgHeroBoardGameBtn(v-if='WeekWinner[index]', :gameData='WeekWinner[index]'  :GAlabel='GAlabels[1]')
              tgHeroBoardGameEmpty(v-else)
        .col-4
          h3 本日賠率
          ul
            li(v-for="(item, index) in 5")
              tgCurrentDayGameBtn(v-if='OddsGame[index]', :gameData='OddsGame[index]'  :GAlabel='GAlabels[2]')
              tgHeroBoardGameEmpty(v-else)
</template>
<script>
import tgHeroBoardGameBtn from '@/components/tgHeroBoard/tgHeroBoardGameBtn.vue';
import tgJackpotBoardGameBtn from '@/components/tgHeroBoard/tgJackpotBoardGameBtn.vue';
import tgCurrentDayGameBtn from '@/components/tgHeroBoard/tgCurrentDayGameBtn.vue';
import tgHeroBoardGameEmpty from '@/components/tgHeroBoard/tgHeroBoardGameEmpty.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgHeroBoardGameBtn,
    tgJackpotBoardGameBtn,
    tgHeroBoardGameEmpty,
    tgCurrentDayGameBtn,
  },
  data() {
    return {
      GAlabels: ['home_jackpot', 'home_newwinner', 'home_bigwinner'],
    };
  },
  computed: {
    ...mapState('index', [
      'HeroBoard_1',
      'WinnerJackpot',
      'WinnerNewest',
      'WinnerHighest',
      'WeekWinner',
      'OddsGame',
    ]),
  },
};
</script>
<style lang='scss'>
.tgHeroBoard{
  margin: 30px 0 60px 0;
  h3{
    font-size: 24px;
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: 600;
    color: #001b47;
  }
}
</style>
