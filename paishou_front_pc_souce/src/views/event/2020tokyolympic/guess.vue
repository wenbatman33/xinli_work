<template lang="pug">
.tokyolympicSchedule.w-full.min-h-screen.py-4.relative.overflow-hidden.pb-12
	img.absolute.top-20.right-0.opacity-25(class='w-[40%]',src='/publicAssets/img/event/2020tokyolympic/img-footballman.png', 
	srcset="/publicAssets/img/event/2020tokyolympic/img-footballman@2x.png 2x")
		
	.Container.FLEX_C.relative.z-10
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

		.BETWEEN.items-center.my-4
			.desc
				h4.text-white 2021/07/21 - 08/08
				p
					img(src='/publicAssets/img/event/2020tokyolympic/img-title-1.png', 
				srcset="/publicAssets/img/event/2020tokyolympic/img-title-1@2x.png 2x")
				h2.text-white.my-2
					span 加码彩金总计 
					span.text-psV3Orange 88,888 蕉币

			img(src='/publicAssets/img/event/2020tokyolympic/img-problem-web.png', 
			srcset="/publicAssets/img/event/2020tokyolympic/img-problem-web@2x.png 2x")
		.grid.grid-cols-3.gap-4
			.col-span-1(v-for='(guessGame, index) in state.guessList')
				guessItemForOlympic(:guessGame='guessGame', @gameUpadte='gameUpadte')
		
		.w-full(v-if='state?.guessEndList?.length>0')
			.my-4.text-center
				h4.my-4(class='text-[#91a6ff]') 结算中与已结束之竞猜
				hr(style='border-top: 1px dashed #4164ff;')
			.grid.grid-cols-3.gap-4
				.col-span-1(v-for='(guessGame, index) in state.guessEndList')
					guessItemForOlympic(:guessGame='guessGame', @gameUpadte='gameUpadte')

</template>
<script>
import dayjs from 'dayjs';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import { guessOlympicList } from '@/api';
import guessItemForOlympic from '@/views/event/2020tokyolympic/guessItemForOlympic';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {
		guessItemForOlympic,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			guessList: null,
			guessEndList: null,
		});

		const gameUpadte = () => {
			state.guessList = null;
			init();
		};
		const init = () => {
			const payload = {
				// start_time: '2021-01-21 00:00:00',
				start_time: '2021-07-21 00:00:00',
				end_time: '2021-08-08 23:59:59',
			};
			guessOlympicList(payload).then((res) => {
				state.guessList = res.data.list.filter((item) => !checkEndTime(item));
				state.guessEndList = res.data.list.filter((item) => checkEndTime(item));
			});
		};
		const checkEndTime = (item) => {
			const date1 = dayjs();
			const date2 = dayjs(item.end_time);
			const diffTime = date2.diff(date1, 'second') > 0 ? date2.diff(date1, 'second') : 0;
			return diffTime <= 0 || item.status === 3 || item.status === 0;
		};
		onUnmounted(() => {});
		onMounted(() => {
			init();
		});

		return {
			route,
			router,
			state,
			init,
			gameUpadte,
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
</style>
