<template lang="pug">
.dailyTask.w-full.BETWEEN.bg-gray-50(v-if='state.step===1 && dailyTaskList')
	.dailyTaskLeft.overflow-hidden.relative(class='w-1/2', style='min-height:580px; background-image: linear-gradient(to bottom, #d10828, #a62337);')
		.relative.z-10.text-center
			.text-2xl.text-white.mt-24 每日签到
			.p-2.rounded-full.border.border-white.text-white.w-44.mx-auto.my-4(v-if='state.currentTask?.day')
				span 已连续签到
				span.text-psV3Yellow.mx-2 {{state.currentTask?.day-1 || 0}}
				span 天
			.text-sm.text-white - 香蕉过日不补送，记得领取唷！ -
		.w-full.h-full.flex.justify-center.items-end.absolute.z-0.top-0
			img(src='/publicAssets/img/v3/img-banana-orangutan.png')
	.dailyTaskRight(class='w-1/2')
		.dailyItemList.p-10.text-center(v-if='dailyTaskList')
			.grid.grid-cols-3.gap-4
				.rounded-lg(v-for='(item, index) in dailyTaskList', :class='(index<6)?"col-span-1":"col-span-3"')
					.bg-psV3Yellow.text-white.rounded.py-4.cursor-pointer(v-if='item.can===1 && item.received===0' @click='submitbonus')
						p.text-center 可领取
						.flex.justify-center.my-4
							img.w-10(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
							img.w-10(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
						p {{item.coin}} 香蕉
					.bg-psV3Red.text-white.rounded.py-4(v-else-if='item.can===1 && item.received===1')
						p.text-center(v-if='item.received==1') 已领取
						p.text-center(v-else) 第 {{item.day}} 天
						.flex.justify-center.my-4
							img.w-10(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
							img.w-10(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
						p {{item.coin}} 香蕉
					.bg-white.text-gray-500.rounded.py-4(v-else)
						p.text-center(v-if='item.received==1') 已领取
						p.text-center(v-else) 第 {{item.day}} 天
						.flex.justify-center.my-4
							img.w-10(v-if='item.received==1', src='/publicAssets/img/v3/icon-check-green.png',  srcset='/publicAssets/img/v3/icon-check-green@2x.png 2x')
							img.w-10(v-if='item.received==0', src='/publicAssets/img/v3/banana.png')
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
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const dailyTaskList = computed(() => store.state.tasks.dailyTaskList);
		const submitbonus = () => {
			// state.currenyTask = {};
			state.currenyTask = null;
			const user = toRaw(userInfo.value);
			bonusGet({
				uid: user.id,
			}).then((res) => {
				// ------------------------------------
				state.returnData = res.data;
				store.dispatch('tasks/GET_DAILY_TASK_LIST', state.uid);
				// ------------------------------------
			});
		};
		onMounted(() => {
			state.currentTask = {};
		});
		return {
			state,
			userInfo,
			submitbonus,
			dailyTaskList,
		};
	},
};
</script>
<style lang="scss" scoped></style>
