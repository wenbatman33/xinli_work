<template lang="pug">
.p-4
	h4.text-psV3Red.mb-2 
		span 我的任务
		span.text-xs.text-psV3Orange.float-right 每天00:00重置
	a-tabs.taskTab(v-model:activeKey='state.activeKey', :animated='{inkBar:false, tabPane:false}')
		a-tab-pane(key='1' tab="任务列表" tabBarStyle='width:50%;')
			dailyTaskList
			basicTaskList
			dayTaskList
			paymentTaskList
		a-tab-pane(key='2' tab="限时活动" tabBarStyle='width:50%;')
			limitTaskList
</template>

<script>
import { useStore } from 'vuex';
import dailyTaskList from '@/components/tasks/dailyTaskList';
import basicTaskList from '@/components/tasks/basicTaskList';
import dayTaskList from '@/components/tasks/dayTaskList';
import limitTaskList from '@/components/tasks/limitTaskList';
import paymentTaskList from '@/components/tasks/paymentTaskList';
import { computed, onMounted, watch, reactive, toRaw } from 'vue';

export default {
	components: {
		dailyTaskList,
		basicTaskList,
		dayTaskList,
		limitTaskList,
		paymentTaskList,
	},
	setup(props) {
		const store = useStore();
		const state = reactive({
			activeKey: '1',
		});
		const userInfo = computed(() => store?.state?.user?.userInfo);
		const getTasks = () => {
			const user = toRaw(userInfo?.value);
			store.dispatch('tasks/GET_BASIC_TASK_LIST', {});
			store.dispatch('tasks/GET_LIMIT_TASK_LIST', {});
			store.dispatch('tasks/GET_PAYMENT_TASK_LIST', {});
		};
		onMounted(() => {
			getTasks();
		});
		return {
			store,
			state,
			getTasks,
		};
	},
};
</script>

<style lang="scss" scoped>
::v-deep(.taskTab) {
	.ant-tabs-nav {
		width: 100%;
		.ant-tabs-tab {
			width: 43%;
			text-align: center;
		}
	}
}
</style>
