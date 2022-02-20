<template lang="pug">
//- 歐洲杯任務
.relative.w-full.min-h-full.bg-task.FLEX_C.items-center.overflow-hidden
	//- 2021
	img.absolute.top-32.w-2021(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')

	//- 頁面內容
	.FLEX_C.items-stretch.pb-20
		//- 導覽欄
		nav-bar

		//- 標題列
		.grid.grid-cols-title.gap-2.items-center.mt-12
			//- 標題文字
			.FLEX_C
				//- 標題
				.text-2xl.text-white.font-bold 解任务换点数

				//- 副標題
				.text-base.text-white.font-bold.mt-4 每日完成任务即可领取点数兑换转盘机会1次

				//- 重置時間
				.text-base.text-highlight.font-bold.mt-2 隔日00:00重置

			//- 點數資訊
			.FLEX_R.items-center.bg-point.rounded.px-4.py-3
				//- 標題
				.text-sm.text-white.font-bold 您目前拥有点数:

				//- 數量
				.text-sm.text-point.font-bold.ml-1 {{ point }}

				//- 圖示
				img.w-4.h-4.ml-1(src='/publicAssets/img/event/uefaeuro_2020/icon-star@3x.png')

		//- 任務列表
		task-list.mt-6(@refresh='refresh')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { event010Info } from '@/api';
import { commaFormat } from '@/utils';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';
import taskList from '@/views/event/uefaeuro_2020/taskList.vue';

export default {
	components: {
		navBar,
		taskList,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			info: {},
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			const uid = store?.state?.user?.uid || '';
			const token = store?.state?.user?.token || '';
			return uid !== 0 && uid !== '' && token !== '';
		});

		// 點數
		const point = computed(() => {
			if (!isLogin.value) {
				return 0;
			}
			try {
				return commaFormat(state?.info?.point);
			} catch (e) {
				return state?.info?.point || 0;
			}
		});

		// 取得資訊
		const getInfo = () => {
			event010Info().then((res) => {
				state.info = res?.data || {};
			});
		};

		// 刷新資訊
		const refresh = () => {
			getInfo();
		};

		// On component mounted
		onMounted(() => {
			refresh();
		});
		return {
			point,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-task {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-2021 {
	width: 72%;
}
.grid-cols-title {
	grid-template-columns: 1fr auto;
}
.text-highlight {
	color: #ffff10;
}
.bg-point {
	background: #a62337;
}
.text-point {
	color: #ffff10;
}
</style>
