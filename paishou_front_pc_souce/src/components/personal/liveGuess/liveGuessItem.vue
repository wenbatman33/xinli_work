<template lang="pug">
.liveGuessItem.rounded(:class='statusClass(guessGame.status)')
	.BETWEEN.items-center
		.flex-shrink-0.w-16.text-center
			img.w-8.h-8(v-if='guessGame?.game_type===1', src='/publicAssets/img/v3/icon-soccer-r.png', srcset='/publicAssets/img/v3/icon-soccer-r@2x.png 2x')
			img.w-8.h-8(v-if='guessGame?.game_type===2', src='/publicAssets/img/v3/icon-basketball-r.png', srcset='/publicAssets/img/v3/icon-basketball-r@2x.png 2x')
			img.w-8.h-8(v-if='guessGame?.game_type===3', src='/publicAssets/img/v3/icon-microphone-a-r.png', srcset='/publicAssets/img/v3/icon-microphone-a-r@2x.png 2x')

		.flex-grow.truncate.p-2.border-r.border-l.border-gray-200.h-full.items-center
			.text-gray-500.text-xs 竞猜题目 {{guessGame.status}}
			h5 {{guessGame.title}}

		.flex-shrink-0
			img.w-8.h-8(v-if='guessGame?.status===3 && guessGame?.guess_status===1', src='/publicAssets/img/v3/quiz-button-victory.png', srcset='/publicAssets/img/v3/quiz-button-victory@2x.png 2x')
			img.w-8.h-8(v-if='guessGame?.status===3 && guessGame?.guess_status===2', src='/publicAssets/img/v3/quiz-button-lose.png', srcset='/publicAssets/img/v3/quiz-button-lose@2x.png 2x')

		.flex-shrink-0.p-2(style='width:420px')
			.BETWEEN
				.m-2.w-full.cursor-pointer(@click='showDetailModalHandle(guessGame.status)')
					.text-gray-500.text-xs 选项A						
					.border.relative.border-psV3Green.text-psV3Green.text-center.p-2(v-if='guessGame.answer===1') 
						span {{guessGame.item1.content}}
						img.w-9(class='absolute -right-2 -bottom-2 transform -rotate-12', src='/publicAssets/img/v3/img-correct-seal.png', srcset='/publicAssets/img/v3/img-correct-seal@2x.png 2x')
					.border.border-gray-200.text-center.p-2(v-else) {{guessGame.item1.content}}

				.m-2.w-full.cursor-pointer(@click='showDetailModalHandle(guessGame.status)')
					.text-gray-500.text-xs 选项B						
					.border.relative.border-psV3Green.text-psV3Green.text-center.p-2(v-if='guessGame.answer===2')
						span {{guessGame.item2.content}}
						img.w-9(class='absolute -right-2 -bottom-2 transform -rotate-12', src='/publicAssets/img/v3/img-correct-seal.png', srcset='/publicAssets/img/v3/img-correct-seal@2x.png 2x')
					.border.border-gray-200.text-center.p-2(v-else)  {{guessGame.item2.content}}

				.m-2.w-full(v-if='guessGame?.status!==0')
					.text-gray-500.text-xs &nbsp;
					.border.border-psV3Red.text-psV3Red.text-center.p-2.cursor-pointer(@click='showBetingPlayersModalHandle')  查看投注明细
				
	a-divider.my-1
	.BETWEEN.items-center.px-2
		.flex-shrink-0.px-4.py-2.border-r.border-gray-200.h-full
			.text-gray-500.text-xs 创建时间
			h4.my-2 {{transStartDate(guessGame.start_time)}}

		.flex-grow.px-4.border-r.border-gray-200.h-full(v-if='guessGame.home && guessGame.away', style='width:360px')
			.BETWEEN.items-center
				span 
					img.w-10.h-10(:src='guessGame.hlog', @error='errorTeamImg')
				.w-32.truncate {{guessGame.home}} 
				h3.text-psV3Red VS 
				.w-32.truncate.text-right {{guessGame.away}}
				span 
					img.w-10.h-10(:src='guessGame.alog', @error='errorTeamImg')

		.flex-grow.px-4.border-r.border-gray-200.h-full(v-if='!guessGame.home && !guessGame.away', style='width:360px')
			.text-xs.text-gray-500 无关联赛事
			h3 无关联赛事

		.flex-grow.px-4.border-r.border-gray-200.h-full.truncate
			.text-gray-500.text-xs 总彩金
			h4.text-psV3Yellow.my-2 {{guessGame.total_bet}}

		.flex-grow.px-4.border-r.border-gray-200.h-full.truncate
			.text-gray-500.text-xs 剩余时间
			h4.text-psV3Orange.my-2 {{state.endTime}}

		.flex-grow.px-4.h-full
			.bg-psV3Yellow.text-white.rounded.text-center.p-2.cursor-pointer(@click='showDetailModalHandle(guessGame.status)', v-if='guessGame.status===1 && state.gameOver===false') 进行中
			.bg-psV3Orange.text-white.rounded.text-center.p-2.cursor-pointer(@click='showDetailModalHandle(guessGame.status)', v-if='guessGame.status===1 && state.gameOver===true') 结算中
			.bg-psV3Orange.text-white.rounded.text-center.p-2.cursor-pointer(@click='showDetailModalHandle(guessGame.status)', v-if='guessGame.status===2') 结算中
			.bg-psV3Green.text-white.rounded.text-center.p-2(v-if='guessGame.status===3') 已结束
			.bg-gray-500.text-white.rounded.text-center.p-2(v-if='guessGame.status===0') 竞猜取消
		
	a-modal.radiusModal(v-if='state.showBetingPlayersModal', width='600px', :visible='state.showBetingPlayersModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showBetingPlayersModal=false')
		betingPlayers(:betingPlayersList='state.betingPlayersList', :total_bet='state.total_bet')
	

	a-modal.radiusModal(v-if='state.showDetailModal', width='600px', :visible='state.showDetailModal', :maskClosable='true', :closable='true', :footer='null', @cancel='closwDetailModal')
		liveGuessDetail(:guessGameDetail='guessGame', @closwDetailModal='closwDetailModal' @update='updateParentData')
		
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { guessAnchorDetail, guessEnd } from '@/api';
import betingPlayers from '@/components/personal/liveGuess/betingPlayers';
import liveGuessDetail from '@/components/personal/liveGuess/liveGuessDetail';
import { errorPersonImg, errorTeamImg } from '@/utils';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
let interval;

export default {
	props: ['guessGame'],
	components: {
		betingPlayers,
		liveGuessDetail,
	},
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			showBetingPlayersModal: false,
			showDetailModal: false,
			selectItem: 0,
			endTime: null,
			gameOver: false,
			interval: null,
			betingPlayersList: null,
			total_bet: 0,
		});

		const showBetingPlayersModalHandle = (status) => {
			state.showBetingPlayersModal = true;
			state.betingPlayersList = null;
			guessAnchorDetail({
				page: 1,
				pagesize: 9999,
				guess_id: props.guessGame.guess_id,
			}).then((res) => {
				const concatArray = [];
				state.betingPlayersList = concatArray.concat(res.data.item1.list).concat(res.data.item2.list);
				state.total_bet = res.data.total_bet;
			});
		};
		const showDetailModalHandle = (status) => {
			state.selectItem = 0;
			if (status !== 0 && status !== 3) state.showDetailModal = true;
		};
		const closeDetailModalHandle = () => {
			state.selectItem = 0;
			state.showDetailModal = false;
		};
		const transStartDate = (time) => dayjs(time).format('YYYY MM-DD');
		const countDown = () => {
			const date1 = dayjs();
			const date2 = dayjs(props?.guessGame?.end_time);
			const diffTime = date2.diff(date1, 'second') > 0 ? date2.diff(date1, 'second') : 0;
			if (diffTime <= 0) {
				state.gameOver = true;
				clearInterval(state.interval);
			}
			state.endTime = dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
		};
		const selectItemHandle = (item) => {
			state.selectItem = item;
		};
		const updateParentData = (guess_id) => {
			emit('update');
		};
		const closwDetailModal = (type) => {
			state.showDetailModal = false;
		};
		const statusClass = (type) => {
			if (type === 0) {
				return 'opacity-30';
			} else if (type === 3) {
				return 'opacity-100 bg-white shadow';
			} else {
				return 'opacity-100 bg-white shadow';
			}
		};
		const init = () => {
			countDown();
			state.interval = setInterval(() => {
				countDown();
			}, 1000);
		};
		onUnmounted(() => {
			clearInterval(state.interval);
		});
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			router,
			UID,
			init,
			transStartDate,
			errorTeamImg,
			showDetailModalHandle,
			selectItemHandle,
			countDown,
			statusClass,
			showBetingPlayersModalHandle,
			errorPersonImg,
			closwDetailModal,
			updateParentData,
		};
	},
};
</script>
<style lang="scss" scoped>
.selectItem {
	box-shadow: rgba(255, 122, 0, 0.35) 0px 5px 5px;
}
</style>
