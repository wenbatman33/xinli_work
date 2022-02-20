<template lang="pug">
.FLEX_C.rounded-xl.shadow(class='bg-[#001056]')
	.flex-grow.p-4
		.BETWEEN
			.flex-col(class='w-1/2', v-if='guessGame?.games')
				h4.text-white {{guessGame?.games?.cn}}
				.text-base.text-white {{guessGame?.games?.begin}}
				.text-sm.text-psV3Blue(v-if='state.gameOver===false')  竞猜进行中
				.text-sm.text-psV3Blue(v-if='state.gameOver===true')  赛事已结束
			
			.BETWEEN.items-end(class='w-1/2')
				.HOME.w-16.text-center
					.text-center
						img.w-10.h-10.rounded-full(:src='guessGame?.games?.hlog', @error='errorTeamImg')
					.text-xs.text-white.truncate {{guessGame?.games?.home}}
				h4.text-white VS
				.AWAY.w-16.text-center
					.text-center
						img.w-10.h-10.rounded-full(:src='guessGame?.games?.alog', @error='errorTeamImg')
					.text-xs.text-white.truncate {{guessGame?.games?.away}}

	.FLEX_C.rounded-xl.p-4(v-if='state.gameOver===true', class='bg-[#001880]' )
		.p-2.text-center.border(
			class='text-psV3Orange border-psV3Orange'
			v-if='guessGame.status===1') 结算中

		.p-2.text-center.border(
			class='text-[#c8c8c8] border-[#c8c8c8]'
			v-if='guessGame.status===0') 竞猜取消

		.grid.grid-cols-2.gap-4(v-if='guessGame.status===3')
			.col-span-1
				.p-2.text-center.border(
				class='text-[#00da16] border-[#00da16]') 已结束
			.col-span-1
				.p-2.text-center.border.cursor-pointer(
				class='text-[#4164ff] border-[#4164ff]', @click='gotoHistory') 查看明细
		

	.FLEX_C.rounded-xl.px-4(v-if='state.gameOver===false', class='bg-[#012ff9]')
		.BETWEEN.py-4
			div
				.text-sm(class='text-[#91a6ff]') 距离竞猜结束
				.text-sm(class='text-[#91a6ff]') 时间还有
			.FLEX_R
				.text-center.px-4.border-r(class='border-[#91a6ff]')
					h3.text-psV3Orange {{state.endHours}}
					.text-xs(class='text-[#91a6ff]') HOURS
				.text-center.px-4.border-r(class='border-[#91a6ff]')
					h3.text-psV3Orange {{state.endMinutes}}
					.text-xs(class='text-[#91a6ff]') MINS
				.text-center.px-4
					h3.text-psV3Orange {{state.endSeconds}}
					.text-xs(class='text-[#91a6ff]') SEC


		hr(style='border-top: 1px solid #4164ff;')

		.BETWEEN.py-2
			div
				.text-sm(class='text-[#91a6ff]') 参加人数
				h4.text-white {{guessGame?.total?.nums || 0}}
			div
				.text-sm(class='text-[#91a6ff]') 总奖池
				h4.text-white  {{guessGame?.total?.total_bonus || 0}}
			.w-16.rounded.py-2.text-center.text-white.cursor-pointer(style='background-image: linear-gradient(to top, #f99f00, #db3069);', @click='showGameModalHandle(1)')
				span 参加
				br
				span 竞猜




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
import { errorPersonImg, errorTeamImg } from '@/utils';

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
			gameOver: null,
			showGameModal: false,
			betStep: 1,
			isCounting: false,
			interval: null,
			endDays: '',
			endHours: '',
			endMinutes: '',
			endSeconds: '',
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
			} else {
				state.gameOver = false;
			}
			state.endTime = dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
			// -------------------------------------------------------------------------
			state.endDays = dayjs.duration(diffTime, 'seconds').format('DD');
			state.endHours = Math.floor(dayjs.duration(diffTime, 'seconds').asHours()) || '00';
			state.endMinutes = dayjs.duration(diffTime, 'seconds').format('mm');
			state.endSeconds = dayjs.duration(diffTime, 'seconds').format('ss');
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
		const checkEndTime = (item) => {
			const date1 = dayjs();
			const date2 = dayjs(item.end_time);
			const diffTime = date2.diff(date1, 'second') > 0 ? date2.diff(date1, 'second') : 0;
			return diffTime;
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
			errorTeamImg,
		};
	},
};
</script>
<style lang="scss"></style>
