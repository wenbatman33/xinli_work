<template lang="pug">
.dailyTask.pb-4
	.dailyItemList.text-center(v-if='dailyTaskList')
		.text-center.mb-4 
			span 登入7天领奖品，已登入
			span.text-psV3Yellow.mx-2 {{state.lastLogin+1}}
			span 天
		.grid.grid-cols-12.gap-2
			.rounded(v-for='(item, index) in dailyTaskList', :class='(index<4)?"col-span-3":"col-span-4"')
				.bg-psV3Yellow.text-white.rounded.cursor-pointer.py-2(v-if='item.can===1 && item.received===0' @click='submitbonus')
					p.text-center 可领取
					.flex.justify-center.my-1
						img.w-5(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
						img.w-5(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
					p {{item.coin}} 香蕉
				.bg-psV3Red.border.border-gray-100.text-white.rounded.py-2(v-else-if='item.can===1 && item.received===1 && index===state.lastLogin')
					p.text-center(v-if='item.received==1') 已领取
					p.text-center(v-else) 第 {{item.day}} 天
					.flex.justify-center.my-1
						img.w-5(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
						img.w-5(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
					p {{item.coin}} 香蕉
				.bg-white.border.border-gray-100.text-gray-500.rounded.py-2(v-else)
					p.text-center(v-if='item.received==1') 已领取
					p.text-center(v-else)  第 {{item.day}} 天
					.flex.justify-center.my-1
						img.w-5(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
						img.w-5(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
					p {{item.coin}} 香蕉
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { bonusList, bonusGet } from '@/api';

export default {
	setup() {
		const store = useStore();
		const state = reactive({
			step: 1,
			currentTask: {},
			returnData: null,
			lastLogin: 0,
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const dailyTaskList = computed(() => store.state.tasks.dailyTaskList);

		const getData = () => {
			state.lastLogin = 0;
			dailyTaskList.value.forEach((item, index) => {
				if (item.received === 1 && item.can === 1) {
					state.lastLogin = index;
				}
			});
		};
		const submitbonus = () => {
			state.currentTask = null;
			const user = toRaw(userInfo.value);
			bonusGet({
				uid: user.id,
			}).then((res) => {
				// ------------------------------------
				state.returnData = res.data;
				store.dispatch('tasks/GET_DAILY_TASK_LIST', state.uid).then((res) => {
					getData();
				});
				// ------------------------------------
			});
		};
		onMounted(() => {
			state.dailyTaskList = [];
			state.currentTask = {};
			getData();
		});
		return {
			state,
			userInfo,
			getData,
			submitbonus,
			dailyTaskList,
		};
	},
};
</script>
<style lang="scss" scoped></style>
