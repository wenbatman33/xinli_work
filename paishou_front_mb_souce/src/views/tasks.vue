<template lang="pug">
//- 我的任務
.tasks
	//- 導覽欄
	nav-bar(title='我的任务', icon='/publicAssets/img/tasks/icon-task@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png',  @click-right='onClickRight')

	//- 頁籤
	van-tabs.cardTab(v-model:active='state.activeTab', animated, @change='onTabChanged')
		//- 任務列表
		van-tab(title='任务列表', name='tasks')
			divider
			task-list

		//- 限時活動
		van-tab(title='限时活动', name='limited')
			divider
			limit-task
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { matomo_tasks_check_limitTasks, matomo_limitTasks_check_tasks } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import taskList from '@/components/tasks/taskList.vue';
import limitTask from '@/components/tasks/limitTask.vue';

export default {
	components: {
		navBar,
		divider,
		taskList,
		limitTask,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			activeTab: 'tasks',
		});

		// 點擊導覽欄關閉按鈕
		const onClickRight = () => {
			router.go(-1);
		};

		// 選擇的頁籤改變
		const onTabChanged = (e) => {
			// Replace query params
			state.activeTab = e;
			router.replace({ query: { tab: state.activeTab } });

			// Matomo track
			if (e === 'tasks') {
				matomo_limitTasks_check_tasks();
			} else if (e === 'limited') {
				matomo_tasks_check_limitTasks();
			}
		};
		
		// On component mounted
		onMounted(() => {
			if (route.query.tab === 'limited') {
				state.activeTab = 'limited';
			} else {
				state.activeTab = 'tasks';
			}
		});
		return {
			state,
			onClickRight,
			onTabChanged,
		};
	},
};
</script>
<style lang="scss" scoped>
.tasks {
	width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
}
</style>
