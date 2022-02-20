<template lang="pug">
.luckySpin.w-full.min-h-screen.py-4.relative.overflow-hidden
	.Container.FLEX_C(v-if='state.giftList')
		.FLEX_R.items-center
			.desc
				.titleImg
					img(src='/publicAssets/img/event/luckyspin/img-logotext.png', 
					srcset="/publicAssets/img/event/luckyspin/img-logotext@2x.png 2x")
				p
					img(src='/publicAssets/img/event/luckyspin/img-text.png', 
				srcset="/publicAssets/img/event/luckyspin/img-text@2x.png 2x")
				.my-8
					h3.text-white 活动说明
					.text-white 拍手天天送，每日登入抢彩金
					.text-white 1、所有已注册用户皆可参与活动。
					.text-white 2、每日进入活动都有抽奖机会，转盘的彩金红包立即有效。
					.text-white 3、中奖后需要即时找小助手登记领取，遇时不候。
					

				.my-8
					h3.text-white 注意事项
					.text-white 1、拍手直播有权利提早或终止活动，若提前截止，会提早公告。
					.text-white 2、活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格
					.text-white ，并扣除本活动所获得奖励。

			.rouletteWrap.mt-8
				.roulette.flex.justify-center.items-center
					img.layer.layer_5.cursor-pointer(v-if='state.gamePlayBtnDisabled===false', @click='play',  src='/publicAssets/img/event/luckyspin/layer_3.png')
					img.layer.layer_4(src='/publicAssets/img/event/luckyspin/layer_3-1.png')
				
					img.layer.layer_3(src='/publicAssets/img/event/luckyspin/img-get.png')
					img.layer.layer_2(src='/publicAssets/img/event/luckyspin/layer_2.png')
					img.layerBase.layer_1(src='/publicAssets/img/event/luckyspin/layer_1.png')
		.FLEX_R.mt-4.mb-12(v-if='state.giftList')
			.w-full.grid.grid-cols-7.gap-4
				.col-span-1.rounded(v-for='(item, index) in state.giftList' class='bg-[#8a0010]') 
					.py-4.px-2.text-center.truncate.overflow-hidden
						img.w-16(:src='item.slide_pic')
						h4.text-psV3Yellow.my-2 {{index<10?"0":""}}{{index+1}}
						.text-white {{item.slide_name}}

	a-modal(:visible='state.showModal', :class='"EventModal"', closable='', :footer='null',  @cancel='state.showModal=false')
		.text-center(v-if='state.currentGift')
			h4.text-psV3Red.text-center.my-2 您获得
			img(:src='state.currentGift?.slide_pic')
			h2.text-psV3Red.text-center.my-4 {{state.currentGift.slide_name}}
			p.text-gray-500.text-center.my-2 提醒您！中奖后需要即时找小助手登记领取唷！
			p.text-gray-500.text-center.my-2 若未及时领取需至隔日才可再玩转盘抽奖。
			.text-center.my-8
				a-button.mx-2.rounded.border-psV3Red.text-psV3Red(@click='getBonus') 立即领取

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import { slideList } from '@/api';
import { deepLink } from '@/utils';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			showModal: false,
			gamePlayBtnDisabled: false,
			speed: 0,
			// 減速度
			retard: 0,
			action: 'speedUp',
			rotateAngle: 0,
			targetAngle: 0,
			currentGift: null,
			giftList: null,
			bonusPath: null,
		});
		const Shuffle = () => {
			const num = Math.floor(Math.random() * state.giftList.length);
			// 排除 0 & 3
			if (num === 0 || num === 3) {
				return 1;
			} else {
				return num;
			}
		};
		const play = () => {
			if (UID.value) {
				const palyDate = dayjs().format('YYYY-MM-DD');
				const randomNumber = Shuffle();
				state.targetAngle = state.giftList[randomNumber].angle;
				state.currentGift = state.giftList[randomNumber];
				state.gamePlayBtnDisabled = true;
				go();
				window.localStorage.setItem(`luckyspin_${UID.value}`, palyDate);
			} else {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			}
		};
		const go = () => {
			// 速度達到8 開始減速
			if (state.speed > 8) state.action = 'slowDown';
			// ------------------------------------------------------------------------------------------
			state.rotateAngle = ((state.rotateAngle + state.speed) % 360) + (1 - state.retard);
			state.myReq = requestAnimationFrame(go);
			state.action === 'speedUp' ? speedUp() : speedDown();
			document.querySelector('.layer_2').style.transform = 'rotate(' + state.rotateAngle + 'deg)';
		};
		const stop = () => {
			cancelAnimationFrame(state.myReq);
			state.action = 'speedUp';
			state.speed = 0;
			state.myReq = null;
		};
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
					state.showModal = true;
				}
			}
		};
		const speedUp = () => {
			state.speed += 0.05;
			state.retard = 0;
		};
		const getBonus = () => {
			if (state.bonusPath) deepLink(state.bonusPath);
			state.showModal = false;
		};
		const init = () => {
			const isSameDay = dayjs().format('YYYY-MM-DD') === dayjs(window.localStorage.tokyolympic).format('YYYY-MM-DD');
			if (window.localStorage[`luckyspin_${UID.value}`] && isSameDay) {
				state.gamePlayBtnDisabled = true;
			} else {
				state.gamePlayBtnDisabled = false;
			}
		};
		onUnmounted(() => {
			cancelAnimationFrame(state.myReq);
		});
		onMounted(() => {
			slideList({ slide_cid: 30 }).then((res) => {
				state.bonusPath = res?.data?.list[0]?.slide_url;
			});
			slideList({ slide_cid: 29 }).then((res) => {
				const len = res?.data?.list.length || 0;
				state.giftList = res?.data?.list;
				state.giftList.map((item, index) => {
					item.angle = index * (360 / len);
				});
				init();
			});
		});

		return {
			store,
			route,
			router,
			state,
			UID,
			init,
			play,
			go,
			stop,
			speedUp,
			speedDown,
			getBonus,
		};
	},
};
</script>
<style lang="scss" scoped>
.luckySpin {
	background-image: url('/publicAssets/img/event/luckyspin/img-master-vision.png');
	background-size: 100%;
	background-repeat: repeat-y;
	background-attachment: fixed;
}
.active {
	background: #ff7a00;
	border-color: #ff7a00;
}
.roulette {
	position: relative;
	max-width: 700px;
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
	.layer_4 {
		z-index: 14;
	}
	.layer_5 {
		z-index: 15;
	}
	.layerBase {
		position: relative;
	}
}
</style>
