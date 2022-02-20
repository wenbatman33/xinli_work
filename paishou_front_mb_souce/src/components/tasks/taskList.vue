<template lang="pug">
//- 任務列表
van-pull-refresh(v-model='isGettingTaskList', @refresh='refresh')
	.task-list.flex.flex-col.items-stretch.pb-12
		//- 重置時間
		.reset-time.p-2.text-sm 每天00:00重置

		//- 已簽到天數
		.day-tip.text-base.font-bold.mt-2.px-4(v-if='containsBonus')
			span 登入7天领奖品，已登入
			span.day.mx-1 {{ bonusDay }}
			span 天

		//- 簽到列表
		bonus-list.mt-1.px-3(path='/tasks')

		//- 新手任務
		basic-task.mt-4.px-4(:class='{ "hidden": !containsUnfinishedBasicTask }')

		//- 每日任務
		day-task.mt-4.px-4(:class='{ "hidden": containsUnfinishedBasicTask || !containsUnfinishedDayTask }')

		//- 充值任務
		payment-task.mt-4.px-4(:class='{ "hidden": containsUnfinishedBasicTask || !containsUnfinishedPaymentTask }')

		//- 目前暫無任務
		empty.mt-12.px-4(:class='{ "hidden": containsBonus || containsUnfinishedBasicTask || containsUnfinishedDayTask || containsUnfinishedPaymentTask }', text='目前暂无任务')
</template>
<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import empty from '@/components/empty';
import bonusList from '@/components/tasks/bonusList.vue';
import basicTask from '@/components/tasks/basicTask.vue';
import dayTask from '@/components/tasks/dayTask.vue';
import paymentTask from '@/components/tasks/paymentTask.vue';

export default {
	components: {
		empty,
		bonusList,
		basicTask,
		dayTask,
		paymentTask,
	},
	setup() {
		// Vue store
		const store = useStore();

		// 是否正在取得任務列表
		const isGettingTaskList = computed(() => store.getters['tasks/isGettingTaskList']);

		// 簽到天數
		const bonusDay = computed(() => store.getters['tasks/bonusDay']);

		// 是否存在簽到任務
		const containsBonus = computed(() => store.getters['tasks/containsBonus']);

		// 是否存在未完成的新手任務
		const containsUnfinishedBasicTask = computed(() => store.getters['tasks/containsUnfinishedBasicTask']);

		// 是否存在未完成的每日任務
		const containsUnfinishedDayTask = computed(() => store.getters['tasks/containsUnfinishedDayTask']);

		// 使否存在未完成的充值任務
		const containsUnfinishedPaymentTask = computed(() => store.getters['tasks/containsUnfinishedPaymentTask']);

		// 取得任務列表
		const getTaskList = () => {
			if (!store.state?.tasks?.isGettingBonusList) {
				store.dispatch('tasks/GET_BONUS_LIST');
			}
			if (!store.state?.tasks?.isGettingBasicTaskList) {
				store.dispatch('tasks/GET_BASIC_TASK_LIST');
			}
			if (!store.state?.tasks?.isGettingDayTaskList) {
				store.dispatch('tasks/GET_DAY_TASK_LIST');
			}
			if (!store.state?.tasks?.isGettingPaymentTaskList) {
				store.dispatch('tasks/GET_PAYMENT_TASK_LIST');
			}
		};

		// On component mounted
		onMounted(() => {
			getTaskList();
		});

		// 下拉刷新
		const refresh = () => {
			getTaskList();
		};
		return {
			isGettingTaskList,
			bonusDay,
			containsBonus,
			containsUnfinishedBasicTask,
			containsUnfinishedDayTask,
			containsUnfinishedPaymentTask,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
.task-list {
	width: 100%;
	.reset-time {
		width: 100%;
		text-align: center;
		color: #c8c8c8;
		background: #fcfcfc;
	}
	.day-tip {
		color: #191919;
		.day {
			color: #f2994a;
		}
	}
}
</style>
