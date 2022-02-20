<template lang="pug">
.page.pb-12(class='sm:px-2 md:px-4 lg:px-8 xl:px-20')
	.partTitle.flex.flex-row.justify-center.my-8
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 转盘抽大奖
			.text-xs.text-center.text-white.italic Turntable Lucky Draw
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	//--------------------------------------------------------------------------------------------------------------------------------------
	.roulette-wrap
		.roulette.flex.justify-center.items-center
			button.play-btn.flex.justify-center.items-center(@click='play', :disabled='state.gamePlayBtnDisabled')
				img(src='/publicAssets/img/event/mon_coming/TurntableBtnText@2x.png', v-if='!state.gamePlayBtnDisabled')
			img.layer.layer_1(src='/publicAssets/img/event/mon_coming/layer_1_new.png')
			img.layer.layer_2(src='/publicAssets/img/event/mon_coming/layer_2.png')
			img.layer-Base.layer_3(src='/publicAssets/img/event/mon_coming/layer_3.png')
	.text-center.my-4
		van-button.green-btn.cursor-default(type='primary', round) 您目前拥有转盘机会 {{state.count}} 次
	.partTitle.flex.flex-row.justify-center.my-8
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 奖项说明
			.text-xs.text-center.text-white.italic Award description
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.tasksList
		.grid.gap-4(class='sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5')
			.col-span-1.text-white(v-for='(item, index) in state.giftList')
				.p-4.border.rounded.border-white.text-center.h-full
					.flex.flex-col.justify-between.items-center
						.flex-shrink-0
							img(:src='item.icon')
						.flex-grow
							h2.text-white.my-2 {{item.id}}
							p.my-2.gift-name {{item.name}}
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.flex.flex-row.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 活动说明
			.text-xs.text-center.text-white.italic Event Description
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white 当日五项任务任选二项完成，即可获得免费转盘一次,当日最高可获得免费转盘2次
	.text-lg.text-center.text-white 每日任务完成后,隔日00:00会重置任务,可重覆完成任务
	.text-lg.text-center.text-white 每日完成任务获得转盘机会可累计次数使用,活动结束未使用次数不予返还蕉币
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.flex.flex-row.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 注意事项
			.text-xs.text-center.text-white.italic Precautions
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white 用户账号注册限每日登陆一次优惠，不可重复领取
	.text-lg.text-center.text-white.my-4 拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。
	.text-lg.text-center.text-white 实体赠品于活动结束后14个工作天送达
	//- ------------------------------------------------------------------------------------------------------------------------------------------------
	van-popup(v-if='state.noCoinModal', v-model:show='state.noCoinModal', class='w-10/12 md:w-6/12', closable='', :footer='null',  @cancel='state.noCoinModal=false')
		h2.text-psBlue.text-center.my-2 蕉币不足
		p.text-gray-500.text-center.my-2 是否需先进行充值？ 
		p.text-gray-500.text-center.my-2 (购买1次机会，直接扣15,000蕉币)
		.text-center.my-4
			button.mx-2.confirm-btn(@click='state.noCoinModal=false') 等等再玩
			button.mx-2.cancel-btn(@click='gotoRecharge') 去充值
	//- ------------------------------------------------------------------------------------------------------------------------------------------------
	van-popup(v-if='state.showGiftModal', v-model:show='state.showGiftModal', class='w-10/12 md:w-6/12', closable='', :footer='null',  @cancel='state.showGiftModal=false')
		h2.text-psBlue.text-center.my-2 恭喜抽得
		.text-center.my-4
			img.filterGiftImg(:src='state.currentData.icon')
		.text-center.my-4
			span.text-psBlue.mx-2 {{state.currentData.name}}
			span.text-psBlue.mx-2 {{state.quantity}}
		.text-center.my-4
			button.mx-2.confirm-btn(@click='state.showGiftModal=false; play()') 再抽一次
			button.mx-2.cancel-btn(@click='state.showGiftModal=false') 关闭
	//- ------------------------------------------------------------------------------------------------------------------------------------------------
	van-popup(v-if='state.nochanceModal', v-model:show='state.nochanceModal', class='w-10/12 md:w-6/12', closable='', :footer='null',  @cancel='state.nochanceModal=false')
		h2.text-psBlue.text-center.my-2 喔欧～您已无转盘机会
		p.text-gray-500.text-center.my-2 是否直接购买转盘机会1次，进行游戏？
		p.text-gray-500.text-center.my-2 (购买1次机会，直接扣20,000蕉币)
		.text-center.my-4
			button.mx-2.confirm-btn(@click='state.nochanceModal=false;') 等等再玩
			button.mx-2.cancel-btn(@click='state.nochanceModal=false; buyCount(1)') 购买一次
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, computed, reactive, toRaw } from 'vue';
import { deepLink } from '@/utils';
import { eventMochengBonusInfo, eventMochengBonus, eventMochengBonusBuy } from '@/api';
import { Notify } from 'vant';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			giftList: [
				{
					id: '01',
					name: '摩天大厦',
					icon: '/publicAssets/img/event/mon_coming/img-gift-01_new.png',
				},
				{
					id: '02',
					name: '熔岩火山',
					icon: '/publicAssets/img/event/mon_coming/img-gift-02_new.png',
				},
				{
					id: '03',
					name: '香蕉',
					icon: '/publicAssets/img/event/mon_coming/img-gift-03.png',
				},
				{
					id: '04',
					name: '限定门兴礼物特效',
					icon: '/publicAssets/img/event/mon_coming/img-gift-04.png',
				},
				{
					id: '05',
					name: '独家门兴马克杯',
					icon: '/publicAssets/img/event/mon_coming/img-gift-05.png',
				},
				{
					id: '06',
					name: '独家门兴毛巾',
					icon: '/publicAssets/img/event/mon_coming/img-gift-06.png',
				},
				{
					id: '07',
					name: '充电宝',
					icon: '/publicAssets/img/event/mon_coming/img-gift-07.png',
				},
				{
					id: '08',
					name: '门兴官方签名球衣',
					icon: '/publicAssets/img/event/mon_coming/img-gift-08.png',
				},
				{
					id: '09',
					name: 'Gucci男士香水',
					icon: '/publicAssets/img/event/mon_coming/img-gift-09.png',
				},
				{
					id: '10',
					name: 'adidas足球',
					icon: '/publicAssets/img/event/mon_coming/img-gift-10.png',
				},
			],
			count: 0,
			used_count: 0,
			myReq: null,
			gamePlayBtnDisabled: false,
			speed: 0,
			// 減速度
			retard: 0,
			action: 'speedUp',
			rotateAngle: 0,
			targetAngle: 0,
			xmasData: null,
			loadingNum: null,
			noCoinModal: false,
			nochanceModal: false,
			showGiftModal: false,
			currentData: null,
			filterGift: null,
			quantity: null,
			targetArray: [5, 36, 72, 108, 144, 180, 216, 252, 288, 324],
		});
		// store  ------------
		const userInfo = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store.state.user.userInfo.coin);
		const allGiftList = computed(() => store.state.config.allGiftList);
		const commaFormat = (value) => value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
		const speedDown = () => {
			if (state.speed >= 1) {
				state.speed -= 0.05;
			} else {
				state.speed = 0;
				if (Math.abs(state.rotateAngle - state.targetAngle) < 30) {
					state.retard <= 1 ? (state.retard += 0.005) : (state.retard = 0.99);
				}
				if (Math.abs(state.rotateAngle - state.targetAngle) < 1) {
					stop();
					state.showGiftModal = true;
				}
			}
		};
		const speedUp = () => {
			state.speed += 0.05;
			state.retard = 0;
		};
		const gotoRecharge = () => {
			if (route.query.isapp === 'true') {
				window.location.href = 'paishou://recharge';
			} else {
				deepLink('paishou://recharge');
			}
		};

		const filterAllGiftList = (gift_id) => {
			const array = toRaw(allGiftList.value);
			const filterGift = array.filter((item) => {
				return Number(item.id) === Number(gift_id);
			});
			state.filterGift = filterGift;
		};
		const play = () => {
			state.gamePlayBtnDisabled = true;
			state.filterGift = null;
			state.currentData = null;

			eventMochengBonus()
				.then((res) => {
					// console.log(res);
					state.targetAngle = state.targetArray[Number(res.data.luckyNum) - 1];
					state.currentData = state.giftList[res.data.luckyNum - 1];
					state.quantity = res.data.quantity;
					if (res.data.gift_id !== 'bcoin') filterAllGiftList(res.data.gift_id);
					go();
					init();
				})
				.catch((err) => {
					state.gamePlayBtnDisabled = false;
					state.nochanceModal = true;
				});
		};
		const go = () => {
			// 速度達到8 開始減速
			if (state.speed > 8) state.action = 'slowDown';
			// ------------------------------------------------------------------------------------------
			state.rotateAngle = ((state.rotateAngle + state.speed) % 360) + (1 - state.retard);
			state.myReq = requestAnimationFrame(go);
			state.action === 'speedUp' ? speedUp() : speedDown();
			document.querySelector('.layer_1').style.transform = 'rotate(' + state.rotateAngle + 'deg)';
		};
		const stop = () => {
			cancelAnimationFrame(state.myReq);
			state.action = 'speedUp';
			state.gamePlayBtnDisabled = false;
			state.speed = 0;
			state.myReq = null;
			init();
		};
		const buyCount = (times) => {
			eventMochengBonusBuy({
				count: times,
			}).then((res) => {
				Notify({ type: 'success', message: '购买成功' });
				store.dispatch('user/UPDATE_USER_INFO');
				init();
			});
		};
		const init = () => {
			eventMochengBonusInfo().then((res) => {
				state.count = res.data.count;
				state.used_count = res.data.used_count;
			});
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			userInfo,
			COIN,
			allGiftList,
			stop,
			commaFormat,
			init,
			play,
			go,
			filterAllGiftList,
			speedUp,
			speedDown,
			buyCount,
			gotoRecharge,
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	background: #000;
}
.green-btn {
	background: #18a300;
	border-radius: 8px;
	border: 1px solid #18a300;
}
.gift-name {
	color: #18a300;
}
.roulette-wrap {
	width: 100%;
	background-image: url('/publicAssets/img/event/mon_coming/img_Turntable background light.png');
	background-size: cover;
	background-position: center center;
}
.roulette {
	position: relative;
	max-width: 550px;
	width: 90%;
	margin: auto auto;
	z-index: 3;

	.layer {
		position: absolute;
	}
	.layer_1 {
		z-index: 11;
	}
	.layer_2 {
		z-index: 12;
	}
	.layer_3 {
		z-index: 13;
	}
	.layer-Base {
		position: relative;
	}
	.play-btn {
		position: absolute;
		z-index: 14;
		color: rgba(255, 255, 255, 1);
		font-weight: bold;
		width: 20%;
		height: 20%;
		background: rgba(255, 255, 255, 0);
		text-align: center;
		border-radius: 100%;
		span {
			font-size: 5vmin;
		}
		@media screen and (min-width: 1200px) {
			span {
				font-size: 30px;
			}
		}
		&:disabled {
			color: rgba(255, 255, 255, 0.1);
		}
	}
}
.confirm-btn,
.cancel-btn {
	width: 40%;
	height: 36px;
	line-height: 36px;
	font-size: 12px;
	outline: none;
	border: none;
	border-radius: 4px;
}
.confirm-btn {
	color: #fff;
	background: linear-gradient(156deg, #0031d4 -30%, #3f91ff 100%);
	margin-right: 10px;
}
.cancel-btn {
	color: #3f91ff;
	border: 1px solid #3f91ff;
	background: #fff;
}
</style>
