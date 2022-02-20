<template lang="pug">
.tokyolympic.CENTER.w-full.min-h-screen.py-10.relative
	.Container
		.tokyolympicImg
			img(src='/publicAssets/img/event/2020tokyolympic/img-tokyo-2020.png', 
			srcset="/publicAssets/img/event/2020tokyolympic/img-tokyo-2020@2x.png 2x")
		.gameReady(v-if='state.gameReady')
			h2.text-white.text-center.my-4 7/21东京奥运会开幕倒数迎战
			.grid.grid-cols-3.my-10.px-48
				.col-span-1.border-r-4.border-blue-300
					.num.text-7xl.font-bold.text-white.text-center {{state.hours}}
					.text-xl.font-bold.text-white.text-center.text-blue-300 时

				.col-span-1.border-r-4.border-blue-300
					.num.text-7xl.font-bold.text-white.text-center {{state.minutes}} 
					.text-xl.font-bold.text-white.text-center.text-blue-300 分
					
				.col-span-1
					.num.text-7xl.font-bold.text-white.text-center {{state.seconds}} 
					.text-xl.font-bold.text-white.text-center.text-blue-300 秒

		//- h1.text-white.text-center.my-4 {{state.days}} : {{state.hours}} : {{state.minutes}} : {{state.seconds}} 
		.gameTime.CENTER(v-if='state.onGameTime')
			.navBar.FLEX_R.items-center
				router-link.mr-4(to='/event/2020tokyolympic/spin') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/spin"}') 好运转转乐
				
				router-link.mr-4(to='/event/2020tokyolympic/schedule') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/schedule"}') 奥运会赛程
				
				router-link.mr-4(to='/event/2020tokyolympic/guess') 
					.border-2.border-white.text-white.py-2.px-4.rounded-full.mx-2.cursor-pointer(:class='{ active: route.path == "/event/2020tokyolympic/guess"}') 抢金决胜猜
				
		.gameEnd.CENTER(v-if='state.gameEnd') 
			h2.text-white 东京奥运会已结束

</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			interval: null,
			days: '',
			hours: '',
			minutes: '',
			seconds: '',
			gameReady: false,
			onGameTime: false,
			gameEnd: false,
		});
		const init = () => {
			state.gameReady = dayjs().isBefore(dayjs('2021/7/21 00:00'));
			state.onGameTime = dayjs().isAfter(dayjs('2021/7/21 00:00')) && dayjs().isBefore(dayjs('2021/08/08 23:59'));
			state.gameEnd = dayjs().isAfter(dayjs('2021/08/08 23:59'));
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
		const countDown = () => {
			const date1 = dayjs();
			const date2 = dayjs('2021/7/21 00:00');
			const diffTime = date2.diff(date1, 'second') > 0 ? date2.diff(date1, 'second') : 0;
			if (diffTime <= 0) {
				clearInterval(state.interval);
				state.days = '00';
				state.hours = '00';
				state.minutes = '00';
				state.seconds = '00';
			} else {
				state.days = dayjs.duration(diffTime, 'seconds').format('DD');
				state.hours = Math.floor(dayjs.duration(diffTime, 'seconds').asHours());
				state.minutes = dayjs.duration(diffTime, 'seconds').format('mm');
				state.seconds = dayjs.duration(diffTime, 'seconds').format('ss');
			}
		};
		return {
			state,
			route,
			router,
			init,
			countDown,
		};
	},
};
</script>
<style lang="scss" scoped>
.tokyolympic {
	background-image: linear-gradient(to bottom, #0030fb, #0007a4);
}
.num {
	text-shadow: 0 0 20px rgba(22, 129, 255, 0.8);
}
</style>
s
