<template lang="pug">
//- 每日任務
.flex.flex-col.items-stretch(:class='$attrs.class')
	//- 標題
	task-list-header(text='每日任务')

	//- 每日任務列表
	.flex.flex-col.items-stretch.mt-1(v-if='unfinishedDayTaskList')
		basic-task-item(v-for='(item, index) in unfinishedDayTaskList', :data='item', :loading='item === state.receivingTask', @click-receive='onClickReceive')

	//- 目前暫無每日任務
	empty.mt-2(v-else, text='目前暂无每日任务')

//- 領取成功彈窗
bonus-success-popup(v-model:show='state.showSuccessPopup', title='领取成功', :type='state.bonusType', :quantity='state.bonusQuantity')
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { getBonusDay } from '@/api';
import { matomo_tasks_reward_daily } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import taskListHeader from '@/components/tasks/taskListHeader.vue';
import basicTaskItem from '@/components/tasks/basicTaskItem.vue';
import bonusSuccessPopup from '@/components/tasks/bonusSuccessPopup.vue';

export default {
	components: {
		empty,
		taskListHeader,
		basicTaskItem,
		bonusSuccessPopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			showSuccessPopup: false,
			bonusType: '',
			bonusQuantity: 0,
			receivingTask: undefined,
		});

		// 未完成的每日任務列表
		const unfinishedDayTaskList = computed(() => store.getters['tasks/unfinishedDayTaskList']);

		// 是否存在未完成的每日任務
		const containsUnfinishedDayTask = computed(() => store.getters['tasks/containsUnfinishedDayTask']);

		// 點擊領取按鈕
		const onClickReceive = (item) => {
			// Update receiving task
			state.receivingTask = item;

			// Get bonus
			getBonusDay({
				task_list_id: item.task_list_id,
			}).then(
				(res) => {
					// Validate response code
					if (res.code === 0) {
						// Show bonus success popup
						state.bonusType = item.bonus_type_name || '';
						state.bonusQuantity = item.quantity || 0;
						state.showSuccessPopup = true;

						// Update day task list
						store.dispatch('tasks/GET_DAY_TASK_LIST');

						// Update user info
						store.dispatch('user/GET_USER_INFO');
					}

					// Clear receiving task on finished
					state.receivingTask = undefined;
				},
				() => {
					// Clear receiving task on error
					state.receivingTask = undefined;
				}
			);

			// Matomo track
			matomo_tasks_reward_daily(item.task_list_id);
		};
		return {
			state,
			unfinishedDayTaskList,
			containsUnfinishedDayTask,
			onClickReceive,
		};
	},
};
</script>
