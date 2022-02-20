<template lang="pug">
	section
		swiper.grand_total(ref='mySwiper'  :options='swiperOption')
			swiper-slide.bonustotal
				.grand_total_caption 累积奖池
					ul
						li(v-if='WinnerJackpot[index]', v-for="(item, index) in 5" @click='ShowDialog(WinnerJackpot[index])')
							tgJackpotBoardGameBtn(:gameData='WinnerJackpot[index]'  :GAlabel='GAlabels[0]')
						li(v-else)
							tgHeroBoardGameEmpty
			swiper-slide.bonustotal
				.grand_total_caption 一週贏家
					ul
						li(v-if='WeekWinner[index]', v-for="(item, index) in 5" @click='ShowDialog(WeekWinner[index])')
							tgHeroBoardGameBtn(:gameData='WeekWinner[index]'  :GAlabel='GAlabels[1]')
						li(v-else)
							tgHeroBoardGameEmpty
			swiper-slide.bonustotal
				.grand_total_caption 本日賠率
					ul
						li(v-if='OddsGame[index]', v-for="(item, index) in 5" @click='ShowDialog(OddsGame[index])')
							tgCurrentDayGameBtn(:gameData='OddsGame[index]'  :GAlabel='GAlabels[2]')
						li(v-else)
							tgHeroBoardGameEmpty
			.swiper-pagination(slot="pagination")
		el-dialog.gamepopup_dialog(:title='dialogTitle', :visible.sync='dialogShow', width='100%')
			.content
				tgGamesPopup(:gameData='picGameData')
</template>
<script>
import tgGamesPopup from '@/components/tgGames/tgGamesPopup/tgGamesPopup.vue';
import tgHeroBoardGameBtn from '@/components/tgHeroBoard/tgHeroBoardGameBtn.vue';
import tgCurrentDayGameBtn from '@/components/tgHeroBoard/tgCurrentDayGameBtn.vue';
import tgJackpotBoardGameBtn from '@/components/tgHeroBoard/tgJackpotBoardGameBtn.vue';
import tgHeroBoardGameEmpty from '@/components/tgHeroBoard/tgHeroBoardGameEmpty.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

const { Swiper } = window;
export default {
  props: [
    'GAlabel',
  ],
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        paginationClickable: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      dialogTitle: '',
      dialogShow: false,
      picGameData: '',
      GAlabels: ['home_jackpotmobile', 'home_newwinnermobile', 'home_bigwinnermobile'],
    };
  },
  components: {
    swiper,
    swiperSlide,
    tgGamesPopup,
    tgHeroBoardGameBtn,
    tgCurrentDayGameBtn,
    tgJackpotBoardGameBtn,
    tgHeroBoardGameEmpty,
  },
  methods: {
    ShowDialog(GameData) {
      /* eslint-enable no-alert, no-console */
      this.picGameData = GameData;
      /* eslint-enable no-alert, no-console */
      this.dialogShow = !this.dialogShow;
    },
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
    ...mapState('game', [
      'gameList',
    ]),
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
};
</script>
<style lang='scss' scoped>
	.swiper-pagination{
		bottom: 30px !important
	}
</style>

<style lang='scss'>
.grand_total {
	padding-bottom: 90px !important;
	.swiper-pagination-bullet {
		width: 20px;
		height: 20px;
		display: inline-block;
		border-radius: 100%;
		background: #000;
		opacity: 0.1;
		margin: 0 10px !important;
	}
	.swiper-pagination-bullet-active {
		opacity: 1;
		background: rgba(250,219,20,1);
	}
}
@media screen and (max-width: 750px) {
	.swiper-pagination {
		bottom: 4vw !important;
	}
	.swiper-pagination-bullet {
		width: 2.67vw !important;
		height: 2.67vw !important;
		margin: 0 1.33vw !important;
	}
}
</style>
