<template lang="pug">
.BETWEEN
	.flex-grow.border-r.border-gray-200.p-4
		.BETWEEN.flex-col(v-if='guessGame?.games')
			.text-gray-500.text-xs {{guessGame?.games?.cn}}
			h6.my-2.text-left.truncate {{guessGame?.games?.away}} v.s {{guessGame?.games?.home}}
		.BETWEEN.flex-col
			.text-gray-500.text-xs 竞猜题目
			h6.my-2.text-left.truncate {{guessGame.title}}
		.grid.grid-cols-2.gap-4.my-4
			.col-span-1.border.border-gray-200.p-2.text-center.cursor-pointer(@click='showGameModalHandle(1)') {{guessGame.item1.content}}
			.col-span-1.border.border-gray-200.p-2.text-center.cursor-pointer(@click='showGameModalHandle(2)')  {{guessGame.item2.content}}
		
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
				
	.flex-shrink-0.w-36
		.p-4
			.text-xs.text-gray-500 剩余时间
			h3.text-psV3Orange {{state.endTime}}
			.text-xs.text-gray-200 竞猜进行中
		.guessStatus.bg-psV3Orange.p-4.text-center.text-psV3Yellow(v-if='state.gameOver') 
			span.mx-2 竞猜结算中
			
		.guessStatus.bg-gray-50.p-4.text-center.text-psV3Yellow(v-if='guessGame?.item1?.selected') 
			.inline-block.w-5.h-5.bg-psV3Yellow.rounded-full.text-white.text-center A
			span.mx-2  已下注
		.guessStatus.bg-gray-50.p-4.text-center.text-psV3Blue(v-if='guessGame?.item2?.selected')
			.inline-block.w-5.h-5.bg-psV3Blue.rounded-full.text-white.text-center B
			span.mx-2 已下注
		.guessStatus.bg-white.p-4.text-xs.text-gray-500.text-center.cursor-pointer(@click='gotoHistory') 查看竞猜明细
	a-modal.stampModal(v-if='state.showGameModal', width='450px', :visible='state.showGameModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showGameModal=false')
		.step_1(v-if='state.betStep===1')
			.BETWEEN.items-center.my-4.border-b.border-gray-200.border-dashed
				.flex-grow.border-r.border-gray-200(v-if='guessGame?.games?.home && guessGame?.games?.away')
					.text-xs.text-gray-500 关联赛事
					h3(v-if='guessGame?.games?.home && guessGame?.games?.away')
						span {{guessGame?.games?.home}}
						span vs
						span {{guessGame?.games?.away}}
					.text-xs.text-gray-500 {{guessGame?.games?.begin}}
				.flex-grow.border-r.border-gray-200(v-if='!guessGame?.games?.home && !guessGame?.games?.away')
					.text-xs.text-gray-500 无关联赛事
					h3 无关联赛事
					.text-xs.text-gray-500 &nbsp;

				.w-36.FLEX_C.flex-shrink-0.p-2
					.text-xs.text-gray-500 剩余时间
					h3.text-psV3Orange {{state.endTime}}
					.text-xs.text-gray-200 竞猜进行中

			.FLEX_C
				.text-gray-500.text-xs 竞猜题目
				h6.my-2 {{guessGame?.title}}

			.grid.grid-cols-2.gap-4.my-2
				.col-span-1
					.border.border-gray-200.p-2.text-center.cursor-pointer(:class='{"border-psV3Red text-psV3Red":betItem.item===1}', @click='selectBetItem(1)') {{guessGame.item1.content}}
				.col-span-1
					.border.border-gray-200.p-2.text-center.cursor-pointer(:class='{"border-psV3Red text-psV3Red":betItem.item===2}', @click='selectBetItem(2)') {{guessGame.item2.content}}
			
			.BETWEEN.items-center.my-2
				.flex.flex-shrink-0.items-center
					.inline-block.w-5.h-5.bg-psV3Yellow.rounded-full.text-white.text-center A
					h4.font-bold.text-psV3Yellow.mx-2 {{state.item_1_percentage}}%
				.flex-grow
					.progressBar.w-full.h-1.rounded-full.relative.bg-psV3Blue
						.bar.h-1.rounded-full.absolute.bg-psV3Yellow(:style='`width:${state.item_1_percentage}%;background:#f2c94c;`')
				.flex.flex-shrink-0.items-center.text-right
					h4.font-bold.text-psV3Blue.mx-2 {{state.item_2_percentage}}%
					.inline-block.w-5.h-5.bg-psV3Blue.rounded-full.text-white.text-center B
			.FLEX_C.my-2
				h5.text-gray-500 竞猜蕉币金额
				a-input.my-2(v-model:value='betItem.coin', placeholder='请输入下注金额 ')
			.rounded.bg-gray-200.text-center.p-2.px-4.my-4
				span.text-psV3Orange.text-xs ＊竞猜下注的最低值不得低于100蕉币,最高值不得高于10,000蕉币
			
			.grid.grid-cols-2.gap-4.my-2.border-t.border-gray-200.border-dashed
				.col-span-1.p-2.truncate 
					.text-gray-500.text-xs 总彩金
					h3.text-psV3Orange.truncate 
						img.w-8.h-8.mr-2(src='/publicAssets/img/v3/coin.png')
						span {{guessGame?.total?.coin || 0}}
				.col-span-1.p-2
					a-button(type='primary', block, :disabled='betItem.coin<=0 || betItem.coin===""', size='large', @click='betGame') 确认下注
		
		.step_2(v-if='state.betStep===2')
			.CENTER.flex-col.text-center.w-full
				img.my-4(src='/publicAssets/img/v3/icon-check-18-px.png')
				h4.text-psV3Red.my-4 下注成功
				.text-xs.text-gray-500.my-2 您可以继续下注或者查看竞猜明细
				.w-full.grid.grid-cols-2.gap-4.border-t.border-gray-200.border-dashed.mt-4
					.col-span-1
						a-button.my-4(block, size='large', @click='gotoHistory') 查看明细
					.col-span-1
						a-button.my-4(type='primary', block, size='large', @click='state.showGameModal=false') 再次下注
</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted, onUnmounted } from 'vue';
import { guessBet } from '@/api';
import { matomo_index_guess, matomo_liveRoom_guess_view, matomo_liveRoom_guess_history, matomo_liveRoom_guess_bet } from '@/matomoEvent';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	props: ['guessGame'],
	setup(props, { emit }) {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			item_1_percentage: 0,
			item_2_percentage: 0,
			endTime: '',
			gameOver: false,
			showGameModal: false,
			betStep: 1,
			isCounting: false,
			interval: null,
		});
		const betItem = reactive({
			guess_id: '',
			item: '',
			coin: '',
		});

		const countDown = () => {
			const date1 = dayjs();
			const date2 = dayjs(props?.guessGame?.end_time);
			const diffTime = date2.diff(date1, 'second') > 0 ? date2.diff(date1, 'second') : 0;
			if (diffTime <= 0) {
				clearInterval(state.interval);
				state.gameOver = true;
			}
			state.endTime = dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
		};
		const init = () => {
			if (props?.guessGame?.item1?.coin === 0 && props?.guessGame?.item2?.coin === 0) {
				state.item_1_percentage = 50;
				state.item_2_percentage = 50;
			} else {
				state.item_1_percentage = ((props?.guessGame?.item1?.coin / props?.guessGame?.total?.coin) * 100).toFixed(2);
				state.item_2_percentage = (100 - state.item_1_percentage).toFixed(2);
			}
		};

		const gotoHistory = () => {
			if (route.name === 'index') {
				matomo_index_guess(props?.guessGame?.id);
			} else {
				matomo_liveRoom_guess_history(props?.guessGame?.id);
			}
			router.push('/personal/guesshistory');
		};
		const selectBetItem = (item) => {
			betItem.guess_id = props?.guessGame?.id;
			betItem.item = item;
			if (route.name === 'index') matomo_liveRoom_guess_view(props?.guessGame?.id);
		};
		const gameUpadte = () => {
			betItem.coin = '';
			emit('gameUpadte');
			setTimeout(() => {
				init();
			}, 800);
		};

		const betGame = () => {
			if (route.name === 'room') matomo_liveRoom_guess_bet(betItem.guess_id);
			betItem.coin = Number(betItem.coin);
			guessBet(betItem).then((res) => {
				gameUpadte();
				state.betStep = 2;
			});
		};
		const showGameModalHandle = (item) => {
			selectBetItem(item);
			state.betStep = 1;
			state.showGameModal = true;
		};
		onUnmounted(() => {
			clearInterval(state.interval);
		});
		onMounted(() => {
			init();
			state.interval = setInterval(() => {
				countDown();
			}, 1000);
		});
		return {
			init,
			route,
			router,
			state,
			betItem,
			countDown,
			showGameModalHandle,
			selectBetItem,
			betGame,
			gotoHistory,
			gameUpadte,
		};
	},
};
</script>
<style lang="scss"></style>
