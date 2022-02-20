<template lang="pug">
.historyItem.rounded.bg-white.shadow
	.p-4
		.BETWEEN
			.flex-grow.truncate
				h6.my-2 {{guessGame.title}}
			.flex-shrink-0
				img.w-8.h-8(v-if='guessGame?.status===3 && guessGame?.guess_status===1', src='/publicAssets/img/v3/quiz-button-victory.png', srcset='/publicAssets/img/v3/quiz-button-victory@2x.png 2x')
				img.w-8.h-8(v-if='guessGame?.status===3 && guessGame?.guess_status===2', src='/publicAssets/img/v3/quiz-button-lose.png', srcset='/publicAssets/img/v3/quiz-button-lose@2x.png 2x')
		.border.border-gray-200.text-center.p-2 {{guessGame.guess_item}}
	.p-4.bg-gray-100.text-xs
		.py-2.border-b.border-gray-200
			span 剩余时间
			span.float-right  {{transDurationTime(guessGame.end_time_t)}}
		.py-2.border-b.border-gray-200
			span 下注时间
			span.float-right {{transEndTime(guessGame.bet_time)}}
		.py-2.border-b.border-gray-200
			span 下注彩金
			span.float-right.text-psV3Yellow {{guessGame.guess_bet}}
	.p-4
		.text-white.rounded.text-center.p-2(:class='gameStatus.class', @click='gameStatus.active? getBounsHandle(guessGame):""') {{gameStatus.name}}

	.p-2
		.text-center.text-xs.text-gray-500.cursor-pointer(@click='showGameModalHandle(guessGame)')
			img.w-4.h-4.mr-2(src='/publicAssets/img/v3/icon-bottomarrow.png', srcset='/publicAssets/img/v3/icon-bottomarrow@2x.png 2x')
			span 点击显示细节

	a-modal.stampModal(v-if='state.showGameModal', width='450px', :visible='state.showGameModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showGameModal=false')
		.BETWEEN.items-center.my-4.border-b.border-gray-200.border-dashed
			.flex-grow.border-r.border-gray-200(v-if='state.cueerntGuessGame.games.home && state.cueerntGuessGame.games.away')
				.text-xs.text-gray-500 关联赛事
				h3(v-if='state.cueerntGuessGame.games.home && state.cueerntGuessGame.games.away')
					span {{state.cueerntGuessGame.games.home}}
					span vs
					span {{state.cueerntGuessGame.games.away}}
				.text-xs.text-gray-500 {{state.cueerntGuessGame.games.begin}}
			.flex-grow.border-r.border-gray-200(v-if='!state.cueerntGuessGame.games.home && !state.cueerntGuessGame.games.away')
				.text-xs.text-gray-500 无关联赛事
				h3 无关联赛事
				.text-xs.text-gray-500 &nbsp;

			.w-36.FLEX_C.flex-shrink-0.p-2
				.text-xs.text-gray-500 剩余时间
				h3.text-psV3Orange {{transDurationTime(state?.cueerntGuessGame?.end_time_t)}}
				.text-xs.text-gray-200 竞猜进行中

		.FLEX_C
			.text-gray-500.text-xs 竞猜题目
			.BETWEEN
				.flex-grow.truncate
					h6.my-2 {{state?.cueerntGuessGame?.title}}
				.flex-shrink-0
					img.w-8.h-8(v-if='state?.cueerntGuessGame?.status===3 && state?.cueerntGuessGame?.guess_status===1', src='/publicAssets/img/v3/quiz-button-victory.png', srcset='/publicAssets/img/v3/quiz-button-victory@2x.png 2x')
					img.w-8.h-8(v-if='state?.cueerntGuessGame?.status===3 && state?.cueerntGuessGame?.guess_status===2', src='/publicAssets/img/v3/quiz-button-lose.png', srcset='/publicAssets/img/v3/quiz-button-lose@2x.png 2x')

		.border.border-gray-200.p-2.text-center {{state.cueerntGuessGame?.guess_item}}
		
		.grid.grid-cols-3.gap-4.my-4
			.col-span-1.flex-col.border-r.border-gray-200
				.text-gray-500.text-xs 下注时间
				h6.my-2 {{state.cueerntGuessGame?.bet_time}}
			.col-span-1.flex-col.border-r.border-gray-200
				.text-gray-500.text-xs 下注彩金
				h6.my-2.text-psV3Yellow
					img.w-4.h-4.mr-2(src='/publicAssets/img/v3/coin.png')
					span {{state.cueerntGuessGame?.guess_bet}} 
			.col-span-1
				.text-gray-500.text-xs 竞猜结果
				h6.my-2.text-psV3Green(v-if='state?.cueerntGuessGame?.status===3 && state?.cueerntGuessGame?.guess_status===1') 胜利
				h6.my-2.text-psV3Red(v-else-if='state?.cueerntGuessGame?.status===3 && state?.cueerntGuessGame?.guess_status===2') 落败
				h6.my-2(v-else) --

		.FLEX_C
			.text-gray-500.text-xs 竞猜发起人
			h6.my-2 {{state.cueerntGuessGame?.nickname}}

		.grid.grid-cols-4.gap-4.my-2.border-t.border-gray-200.border-dashed
			.col-span-1.py-4.border-r.border-gray-200
				.text-gray-500.text-xs 参加爆击
				h6 {{comboStatus}}
			.col-span-1.py-4.border-r.border-gray-200
				.text-gray-500.text-xs 爆击结果
				h6 {{ratio}}
			.col-span-1.py-4.border-r.border-gray-200
				.text-gray-500.text-xs 爆击彩金
				h6 {{comboBonus}}
			.col-span-1.py-4
				.text-gray-500.text-xs 总返还
				h6.text-psV3Yellow {{finalBonus}}

	a-modal.radiusModal(v-if='state.comboGameModal', width='450px', :visible='state.comboGameModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.comboGameModal=false')
		.p-4.text-center
			h5.my-4 是否参加彩金爆击？
			.w-full.grid.grid-cols-2.gap-4.mt-4
				.col-span-1
					a-button.my-4(block, size='large', @click='guessReceiveHandle(state.cueerntGuessGame)') 不参加
				.col-span-1
					a-button.my-4(type='primary', block, size='large', @click='showGuessPokerComboHandle(state.cueerntGuessGame)') 参加
	
	a-modal.pokerGameModal(v-if='state.comboPokerGameModal', :bodyStyle='{"background":"none"}', width='1200px', :visible='state.comboPokerGameModal', :closable='false', :footer='null')
		.overflow-hidden(style='height:600px')
			.w-full(v-if='state.comboStep===1')
				h2.text-center.text-white 请选择一张扑克牌
				.w-full.grid.grid-cols-4.gap-4.my-2
					.col-span-1.py-4.text-center.relative(v-for='(item, index) in 8')
						img.card.w-40.cursor-pointer(
							src='/publicAssets/img/v3/img-poker-background.png',
							:class='{"cardReady": state.playing===true }', 
							:style='`transition: all ${(index+1)*2/8}s ease`'
							@click='comboStep2')
			.w-full.CENTER.flex-col.mt-8(v-if='state.comboStep===2')
				.flip-card-container(:class='{"flipped": state.flipping===true }')
					.flip-card
						.flip-card-front
							img(src='/publicAssets/img/v3/img-poker-background.png')
						.flip-card-back.p-8
							.FLEX_C.w-full.h-full.text-center.BETWEEN
								.w-full.my-12
									h4.text-psV3Green(v-if='state?.comboResult?.ratio>0') {{state?.comboResult?.title}}
									h4.text-gray-500(v-if='state?.comboResult?.ratio===0') {{state?.comboResult?.title}}
									h4.text-psV3Red(v-if='state?.comboResult?.ratio<0') {{state?.comboResult?.title}}
									.font-bold.text-6xl.my-4 {{state?.comboResult?.item}}
									.text-gray-500 {{state?.comboResult?.description}}

								.w-full.grid.grid-cols-2.gap-4.my-8
									.col-span-1.border-r.border-gray-300
											.text-gray-500 爆击彩金
											h4.text-gray-500 {{state?.comboResult?.combo_bonus}}
									.col-span-1
											.text-gray-500 总返还
											h4.text-psV3Yellow {{state?.comboResult?.final_bonus}}
								.w-full
									.text-gray-200 彩金已发送至您的钱包
									a-button.my-4.text-psV3Red.border-psV3Red(block, size='large', @click='closeCombo') 关闭
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { guessHistory, guessReceive, guessCombo } from '@/api';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	props: ['guessGame'],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			showGameModal: false,
			comboGameModal: false,
			comboPokerGameModal: false,
			cueerntGuessGame: null,
			comboStep: 0,
			playing: false,
			flipping: false,
			comboResult: null,
			sortType: 'time',
		});

		const transEndTime = (time) => dayjs(time).format('YYYY MM-DD HH:mm');
		const transDurationTime = (time) => {
			const date1 = dayjs().unix();
			const date2 = dayjs(time);
			const diffTime = date2.diff(date1) > 0 ? date2.diff(date1) : 0;
			return dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
		};
		const getBounsHandle = (item) => {
			state.cueerntGuessGame = item;
			state.comboGameModal = true;
		};
		const showGameModalHandle = (item) => {
			selectBetItem(item);
			state.showGameModal = true;
		};

		const selectBetItem = (item) => {
			state.cueerntGuessGame = item;
		};
		const guessReceiveHandle = (item) => {
			guessReceive({ bet_id: item.id }).then((res) => {
				state.comboGameModal = false;
				// init();
				emit('updatList');
			});
		};
		// ----------------------------
		const showGuessPokerComboHandle = (item) => {
			state.cueerntGuessGame = item;
			state.playing = false;
			state.flipping = false;
			comboStep1();
		};

		// comboStep1
		const comboStep1 = () => {
			state.comboGameModal = false;
			state.comboStep = 1;
			state.comboPokerGameModal = true;
			setTimeout(() => {
				state.playing = true;
			}, 500);
		};

		const comboStep2 = () => {
			state.comboStep = 2;
			guessCombo({ bet_id: state.cueerntGuessGame.id }).then((res) => {
				// init();
				emit('updatList');
				setTimeout(() => {
					state.comboResult = res?.data;
					state.flipping = true;
				}, 500);
			});
		};
		const closeCombo = () => {
			state.comboPokerGameModal = false;
			// init();
			emit('updatList');
		};

		// 參加爆擊
		const comboStatus = computed(() => {
			if (state.cueerntGuessGame?.combo_status) {
				return '参加';
			} else if (state.cueerntGuessGame?.received) {
				return '不参加';
			} else {
				return '-';
			}
		});
		// 爆擊結果
		const ratio = computed(() => {
			if (state.cueerntGuessGame?.combo_status) {
				return `x ${state.cueerntGuessGame?.ratio || 0}`;
			} else {
				return '-';
			}
		});
		// 爆擊彩金
		const comboBonus = computed(() => {
			if (state.cueerntGuessGame?.combo_status) {
				try {
					return state.cueerntGuessGame?.combo_bonus;
				} catch (e) {
					return state.cueerntGuessGame?.combo_bonus || 0;
				}
			} else {
				return '-';
			}
		});
		// 總返還
		const finalBonus = computed(() => {
			if (state.cueerntGuessGame?.received || state.cueerntGuessGame?.combo_status) {
				try {
					return state.cueerntGuessGame?.final_bonus;
				} catch (e) {
					return state.cueerntGuessGame?.final_bonus || 0;
				}
			} else {
				return '-';
			}
		});
		// 總返還
		const gameStatus = computed(() => {
			let result;
			if (props.guessGame?.status === 1 && transDurationTime(props.guessGame?.end_time_t) !== '00:00:00:00') {
				result = { class: 'bg-psV3Yellow', name: '等待中' };
			} else if (props.guessGame?.status === 1 && transDurationTime(props.guessGame?.end_time_t) === '00:00:00:00') {
				result = { class: 'bg-psV3Orange', name: '竞猜结算中' };
			} else if (props.guessGame?.status === 3 && props.guessGame?.guess_status === 2) {
				result = { class: 'bg-psV3Red', name: '已结束' };
			} else if (props.guessGame?.status === 3 && props.guessGame?.guess_status === 1 && (props.guessGame?.received === true || props.guessGame?.combo_status === true)) {
				result = { class: 'bg-psV3Green', name: '胜利' };
			} else if (props.guessGame?.status === 3 && props.guessGame?.guess_status === 1 && props.guessGame?.received === false && props.guessGame?.combo_status === false) {
				result = { class: 'bg-psV3Blue cursor-pointer', name: '领取奖励', active: true };
			} else if (props.guessGame?.status === 0) {
				result = { class: 'bg-gray-500', name: '竞猜取消' };
			}
			return result;
		});
		return {
			store,
			state,
			router,
			UID,
			transEndTime,
			transDurationTime,
			showGameModalHandle,

			getBounsHandle,
			guessReceiveHandle,
			comboStep2,
			showGuessPokerComboHandle,
			comboStep1,
			closeCombo,
			comboStatus,
			ratio,
			comboBonus,
			finalBonus,
			gameStatus,
		};
	},
};
</script>
<style lang="scss" scoped>
.card {
	position: relative;
	top: 1000px;
	left: 1000px;
	transition-delay: 0.5s;
}
.cardReady {
	top: 0px;
	left: 0px;
}

.flip-card-container {
	width: 388px;
	height: 540px;
	perspective: 1000px;
	border-radius: 20px;
}
.flip-card {
	position: relative;
	width: 100%;
	height: 100%;
	transition: transform 1s;
	transform-style: preserve-3d;
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden; /* Safari */
	backface-visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border-radius: 0.5rem; */
}
.flip-card-front {
	border-radius: 20px;
}
.flip-card-back {
	border-radius: 20px;
	background: #fff;
	transform: rotateY(180deg);
}

.flip-card-front img {
	width: 100%;
	height: 100%;
	/* border-radius: 0.5rem; */
}
.flip-card-back p {
	text-align: center;
	margin: 1rem;
	font-size: 1.4rem;
	line-height: 1.5rem;
}
.flip-card-back p span {
	display: block;
	font-size: 1rem;
	font-style: italic;
	font-weight: bold;
	margin-top: 1.25rem;
}

.flipped .flip-card {
	transform: rotateY(180deg);
}
</style>
