<template lang="pug">
//- 任務列表
.w-full.flex-grow.bg-top-list.mt-4
	van-tabs(type='card', @change='changeTab')
		//- 任務列表
		van-tab(key='1', title='任务列表')
			//- 下拉刷新
			van-pull-refresh(v-model='isGettingTaskList', @refresh='refresh')
				//- 新手任務
				basic-task.mt-4.px-4(:class='{ "hidden": !containsUnfinishedBasicTask }')

				//- 每日任務
				day-task.mt-4.px-4(:class='{ "hidden": containsUnfinishedBasicTask || !containsUnfinishedDayTask }')

				//- 充值任務
				payment-task.mt-4.px-4(:class='{ "hidden": containsUnfinishedBasicTask || !containsUnfinishedPaymentTask }')

				//- 目前暫無任務
				empty.mt-12.px-4(:class='{ "hidden": containsUnfinishedBasicTask || containsUnfinishedDayTask || containsUnfinishedPaymentTask }', text='目前暂无任务')

		//- 限時活動
		van-tab(key='2', title='限时活动')
			limit-task
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import empty from '@/components/empty';
import basicTask from '@/components/tasks/basicTask.vue';
import dayTask from '@/components/tasks/dayTask.vue';
import paymentTask from '@/components/tasks/paymentTask.vue';
import limitTask from '@/components/tasks/limitTask.vue';

export default {
    components: {
        empty,
        basicTask,
        dayTask,
        paymentTask,
        limitTask,
    },
    setup() {
		// Vue store
		const store = useStore();

		// 是否正在取得任務列表
		const isGettingTaskList = computed(() => store.getters['tasks/isGettingTaskList']);

		// 是否存在未完成的新手任務
		const containsUnfinishedBasicTask = computed(() => store.getters['tasks/containsUnfinishedBasicTask']);

		// 是否存在未完成的每日任務
		const containsUnfinishedDayTask = computed(() => store.getters['tasks/containsUnfinishedDayTask']);

		// 使否存在未完成的充值任務
		const containsUnfinishedPaymentTask = computed(() => store.getters['tasks/containsUnfinishedPaymentTask']);

		// 取得任務列表
		const getTaskList = () => {
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

		// 改變頁籤
		const changeTab = (index) => {
			if (index === 0) {
				// matomo_room_tasklist_tasks();
			} else if (index === 1) {
				// matomo_room_tasklist_limit();
			}
		};

		// 下拉刷新
		const refresh = () => {
			getTaskList();
		};

		// On component mounted
		onMounted(() => {
			getTaskList();
		});
        return {
            isGettingTaskList,
            containsUnfinishedBasicTask,
            containsUnfinishedDayTask,
            containsUnfinishedPaymentTask,
            changeTab,
            refresh,
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep(.van-tabs--card>.van-tabs__wrap) {
	height: 38px;
}
::v-deep(.van-tabs__nav--card) {
	height: 38px;
}
::v-deep(.van-tabs__nav--card) {
	border: transparent;
	background-color: #F4F4F4;
	border-radius: 4px;
}
::v-deep(.van-tab.van-tab--active) {
	background-color: #F8B62D;
	border-right: transparent;
	border-radius: 4px;
}
::v-deep(.van-tabs__nav--card .van-tab) {
	border-right: transparent;
}
.bg-task-list {
	background: #fafafa;
}
</style>
