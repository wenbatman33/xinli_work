<template lang="pug">
.liveGuessDetail.pt-4
	.w-full(v-if='state.isOnDelete===false')
		.BETWEEN.items-center
			.flex-grow.px-4.border-r.border-gray-200.h-full(v-if='guessGameDetail.home && guessGameDetail.away', style='width:360px')
				.BETWEEN.items-center
					span 
						img.w-10.h-10(:src='guessGameDetail.hlog', @error='errorTeamImg')
					.w-32.truncate {{guessGameDetail.home}} 
					h3.text-psV3Red VS 
					.w-32.truncate.text-right {{guessGameDetail.away}}
					span 
						img.w-10.h-10(:src='guessGameDetail.alog', @error='errorTeamImg')

			.flex-grow.px-4.border-r.border-gray-200.h-full(v-if='!guessGameDetail.home && !guessGameDetail.away', style='width:360px')
				.text-xs.text-gray-500 无关联赛事
				h3 无关联赛事

			.w-36.FLEX_C.flex-shrink-0.h-full.truncate.px-2
				.text-gray-500.text-xs 剩余时间
				h4.text-psV3Orange.my-2 {{state.endTime}}

		a-divider(dashed).my-1
		.BETWEEN.items-center
			.flex-grow.px-4.py-2.border-r.border-gray-200.h-full
				.text-gray-500.text-xs 创建时间
				h4.my-2 {{transStartDate(guessGameDetail.start_time)}}

			.flex-grow.px-4.h-full.truncate
				.text-gray-500.text-xs 总彩金
				h4.text-psV3Yellow.my-2 {{guessGameDetail.total_bet}}

		a-divider(dashed).my-1
		.px-4
			h6.text-xs.text-psV3Red 竞猜题目
			h4 {{guessGameDetail.title}}

		.px-4
			.text-psV3Red.text-xs.text-center.my-2 请选择竞猜答案
			.w-full.grid.grid-cols-2.gap-4.mt-4
				.col-span-1.cursor-pointer(@click='guessGameDetail.answer!==0?"":selectItemHandle(1)')
					.bg-white.text-center.p-4.relative.shadow(:class='{"selectItem": state.selectItem===1 || guessGameDetail.answer===1}') 
						h4.truncate {{guessGameDetail.item1.content}}
						img.w-14(v-if='guessGameDetail.answer===1', class='absolute -right-2 -top-2 transform -rotate-12', src='/publicAssets/img/v3/img-correct-seal.png', srcset='/publicAssets/img/v3/img-correct-seal@2x.png 2x')

				
				.col-span-1.cursor-pointer(@click='guessGameDetail.answer!==0?"":selectItemHandle(2)')
					.bg-white.text-center.p-4.relative.shadow(:class='{"selectItem": state.selectItem===2 || guessGameDetail.answer===2}', ) 
						h4.truncate {{guessGameDetail.item2.content}}
						img.w-14(v-if='guessGameDetail.answer===2', class='absolute -right-2 -top-2 transform -rotate-12', src='/publicAssets/img/v3/img-correct-seal.png', srcset='/publicAssets/img/v3/img-correct-seal@2x.png 2x')
		.p-4
			.BETWEEN.items-center.my-4
				.flex.flex-shrink-0.items-center
					.inline-block.w-5.h-5.bg-psV3Yellow.rounded-full.text-white.text-center A
					h4.font-bold.text-psV3Yellow.mx-2 {{state.item_1_percentage}}%
				.flex-grow
					.progressBar.w-full.h-1.rounded-full.relative.bg-psV3Blue
						.bar.h-1.rounded-full.absolute.bg-psV3Yellow(:style='`width:${state.item_1_percentage}%;background:#f2c94c;`')
				.flex.flex-shrink-0.items-center.text-right
					h4.font-bold.text-psV3Blue.mx-2 {{state.item_2_percentage}}%
					.inline-block.w-5.h-5.bg-psV3Blue.rounded-full.text-white.text-center B

		.p-4
			.grid.grid-cols-3.gap-4
				.col-span-1
					.FLEX_R
						.CENTER.rounded.bg-gray-100.w-10.h-10.mr-4.flex-shrink-0(v-if='guessGameDetail.status===2')
							img.cursor-pointer(src='/publicAssets/img/v3/icon-delete-g.png' , srcset='/publicAssets/img/v3/icon-delete-g@2x.png 2x', @click='state.isOnDelete=true')
						a-button(block, size='large', @click='closwDetailModal') 关闭
				.col-span-2
					a-button(type='primary', block, :disabled='state.selectItem===0 || guessGameDetail.status===3', size='large' @click='guessEndHandle(guessGameDetail.guess_id)') 公布答案

	.w-full(v-if='state.isOnDelete===true')
		.CENTER.FLEX_C.p-4
			.text-center.my-4 
				img.w-24(src='/publicAssets/img/v3/icon-delete-r@3x.png')

			h2.text-psV3Red.text-center.my-4 是否取消此笔竞猜？
			.text-gray-500.text-center.my-4.mb-8 取消此笔竞猜，所有下注的彩金将会返还给下注者。(此行为无法复原)
			
			.w-full.grid.grid-cols-2.gap-4.my-4
				.col-span-1
					a-button(block, size='large', @click='state.isOnDelete=false') 考虑一下

				.col-span-1
					a-button(type='primary', block, size='large', @click='guessCancelHandle(guessGameDetail.guess_id)') 确定取消

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { guessAnchorDetail, guessEnd, guessCancel } from '@/api';
import betingPlayers from '@/components/personal/liveGuess/betingPlayers';
import { errorPersonImg, errorTeamImg } from '@/utils';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
let interval;

export default {
	props: ['guessGameDetail'],
	components: {
		betingPlayers,
	},
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			isOnDelete: false,
			showBetingPlayersModal: false,
			showDetailModal: false,
			selectItem: 0,
			endTime: null,
			gameOver: false,
			interval: null,
			total_bet: 0,
			item_1_percentage: 0,
			item_2_percentage: 0,
		});

		const transStartDate = (time) => dayjs(time).format('YYYY MM-DD');
		const countDown = () => {
			const date1 = dayjs().unix();
			const date2 = dayjs(props?.guessGameDetail?.end_time_t);
			const diffTime = date2.diff(date1) > 0 ? date2.diff(date1) : 0;
			if (diffTime <= 0) {
				state.gameOver = true;
				clearInterval(state.interval);
			}
			state.endTime = dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
		};
		const selectItemHandle = (item) => {
			state.selectItem = item;
		};
		const guessEndHandle = (guess_id) => {
			guessEnd({
				guess_id: guess_id,
				item: state.selectItem,
			}).then((res) => {
				emit('update');
				closwDetailModal();
			});
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
		const closwDetailModal = () => {
			emit('closwDetailModal');
		};

		const guessCancelHandle = (guess_id) => {
			guessCancel({
				guess_id: guess_id,
			}).then((res) => {
				emit('update');
				closwDetailModal();
			});
		};
		const init = () => {
			countDown();
			state.interval = setInterval(() => {
				countDown();
			}, 1000);

			if (props?.guessGameDetail?.item1?.coin === 0 && props?.guessGameDetail?.item2?.coin === 0) {
				state.item_1_percentage = 50;
				state.item_2_percentage = 50;
			} else {
				state.item_1_percentage = ((props?.guessGameDetail?.item1?.coin / props?.guessGameDetail?.total_bet) * 100).toFixed(2);
				state.item_2_percentage = (100 - state.item_1_percentage).toFixed(2);
			}
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
			selectItemHandle,
			guessEndHandle,
			countDown,
			statusClass,
			closwDetailModal,
			guessCancelHandle,
		};
	},
};
</script>
<style lang="scss" scoped>
.selectItem {
	box-shadow: rgba(255, 122, 0, 0.35) 0px 5px 5px;
}
</style>
