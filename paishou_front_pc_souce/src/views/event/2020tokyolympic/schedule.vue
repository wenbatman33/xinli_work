<template lang="pug">
.tokyolympicSchedule.w-full.min-h-screen.py-4.relative
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
		.schedule
			schedulelList
</template>
<script>
import dayjs from 'dayjs';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import schedulelList from '@/views/event/2020tokyolympic/schedulelList.vue';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {
		schedulelList,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({});
		const init = () => {};
		onUnmounted(() => {});
		onMounted(() => {
			init();
		});

		return {
			route,
			router,
			state,
			init,
		};
	},
};
</script>
<style lang="scss" scoped>
.tokyolympicSchedule {
	background-image: url('/publicAssets/img/event/2020tokyolympic/img-tokyo-pattern-bg.jpg');
	background-size: 100%;
	background-attachment: fixed;
}
.active {
	background: #ff7a00;
	border-color: #ff7a00;
}
.num {
	text-shadow: 0 0 20px rgba(22, 129, 255, 0.8);
}
</style>
