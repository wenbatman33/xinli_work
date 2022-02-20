<template lang="pug">
.tokyolympicSchedule.w-full.min-h-screen.py-4.relative.overflow-hidden
	img.absolute.bottom-0(class='w-[40%] right-[-100px]',src='/publicAssets/img/event/2020tokyolympic/img-basketballman.png', 
	srcset="/publicAssets/img/event/2020tokyolympic/img-basketballman@2x.png 2x")
		
	.Container.FLEX_C
		.BETWEEN.items-center
			.tokyolympicImg
				img(src='/publicAssets/img/event/2020tokyolympic/img_tokyo_logo.png', 
				srcset="/publicAssets/img/event/2020tokyolympic/img_tokyo_logo@2x.png 2x")
			.navBar.FLEX_R.items-center
				router-link.mr-4(to='/event/2020tokyolympic/spin') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/spin"}') 好运转转乐
				
				router-link.mr-4(to='/event/2020tokyolympic/schedule') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/schedule"}') 奥运会赛程
				
				router-link.mr-4(to='/event/2020tokyolympic/guess') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/guess"}') 抢金决胜猜

		.FLEX_R.items-center.my-4
			.desc
				h4.text-white 2021/07/21 - 08/08
				p
					img(src='/publicAssets/img/event/2020tokyolympic/img-title-2.png', 
				srcset="/publicAssets/img/event/2020tokyolympic/img-title-2@2x.png 2x")
				.my-8
					h3.text-white 活动说明
					.text-white 奥运开战天天送，每日登入抢彩金
					.text-white 1、所有已注册用户皆可参与活动。
					.text-white 2、每日进入活动都有抽奖机会，转盘的彩金红包立即有效。
					.text-white 3、中奖后需要即时找小助手登记领取，遇时不候。
				.my-8
					h3.text-white 注意事项
					.text-white 1、拍手直播有权利提早或终止活动，若提前截止，会提早公告。
					.text-white 活动过程中如有发现违规行为，我方有权取消此行为的用户参予
					.text-white 活动资格，并扣除本活动所获得奖励。

			.rouletteWrap
				.roulette.flex.justify-center.items-center
					img.layer.layer_5.cursor-pointer(v-if='state.gamePlayBtnDisabled===false', @click='play',  src='/publicAssets/img/event/2020tokyolympic/layer_3.png')
					img.layer.layer_4(src='/publicAssets/img/event/2020tokyolympic/layer_3-1.png')
				
					img.layer.layer_3(src='/publicAssets/img/event/2020tokyolympic/img-tokyo-get.png')
					img.layer.layer_2(src='/publicAssets/img/event/2020tokyolympic/layer_2.png')
					img.layerBase.layer_1(src='/publicAssets/img/event/2020tokyolympic/layer_1.png')

	a-modal(:visible='state.showModal', :class='"EventModal"', closable='', :footer='null',  @cancel='state.showModal=false')
		.text-center(v-if='state.currentGift')
			h4.text-psV3Red.text-center.my-2 您获得
			img(:src='state.currentGift?.icon')
			h2.text-psV3Red.text-center.my-4 {{state.currentGift.name}}
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
			giftList: [
				{
					id: '01',
					angle: 206,
					name: '58红包',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '02',
					angle: 257,
					name: '108红包',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '03',
					angle: 308,
					name: '288红包',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '04',
					angle: 52,
					name: '588红包',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '05',
					angle: 103,
					name: '888红包',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '06',
					angle: 0,
					name: 'apple ipad air',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
				{
					id: '07',
					angle: 0,
					name: 'huawei watch gt2',
					icon: '/publicAssets/img/event/2020tokyolympic/3-3-x-1.png',
				},
			],
		});
		const play = () => {
			if (UID.value) {
				const palyDate = dayjs().format('YYYY-MM-DD');
				const randomNumber = Math.floor(Math.random() * 5);
				state.targetAngle = state.giftList[randomNumber].angle;
				state.currentGift = state.giftList[randomNumber];
				state.gamePlayBtnDisabled = true;
				go();
				window.localStorage.setItem(`tokyolympic_${UID.value}`, palyDate);
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
			const link = 'https://mcwc.mc.maaiiconnect.com/app.html#/tronyu.maaiiconnect.com/staff/9GxYP3WQ.DcGgjSKLQD8I.1d76.05000000.8bNTVu88FgtfLoJG/im';
			window.open(link, '_blank');
			state.showModal = false;
		};
		const init = () => {
			const isSameDay = dayjs().format('YYYY-MM-DD') === dayjs(window.localStorage.tokyolympic).format('YYYY-MM-DD');
			if (window.localStorage[`tokyolympic_${UID.value}`] && isSameDay) {
				state.gamePlayBtnDisabled = true;
			} else {
				state.gamePlayBtnDisabled = false;
			}
		};
		onUnmounted(() => {});
		onMounted(() => {
			init();
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
.tokyolympicSchedule {
	background-image: url('/publicAssets/img/event/2020tokyolympic/img-tokyo-pattern-bg.jpg');
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
