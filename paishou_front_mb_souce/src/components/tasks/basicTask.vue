<template lang="pug">
//- 新手任務
.flex.flex-col.items-stretch(:class='$attrs.class')
	//- 標題
	task-list-header(text='新手任务', desc='请先完成新手任务，以解锁后续会员功能')

	//- 新手任務列表
	.flex.flex-col.items-stretch.mt-1(v-if='containsUnfinishedBasicTask')
		basic-task-item(v-for='(item, index) in unfinishedBasicTaskList', :data='item', :loading='item.id === state.receivingTaskId', @click-receive='clickReceive')

	//- 目前暫無新手任務
	empty.mt-2(v-else, text='目前暂无新手任务')

//- 領取成功彈窗
bonus-success-popup(v-model:show='state.isShowSuccessPopup', title='领取成功', :type='state.bonusType', :quantity='state.bonusQuantity')
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { getBonusRegister, getBonusAvatar, getBonusPhone } from '@/api';
import { matomo_tasks_reward_newbie } from '@/matomoTrackEvent.js';
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
			isShowSuccessPopup: false,
			bonusType: '',
			bonusQuantity: 0,
			receivingTaskId: undefined,
		});

		// 未完成的新手任務列表
		const unfinishedBasicTaskList = computed(() => store.getters['tasks/unfinishedBasicTaskList']);

		// 是否存在未完成的新手任務
		const containsUnfinishedBasicTask = computed(() => store.getters['tasks/containsUnfinishedBasicTask']);

		// 領取獎勵成功
		const receiveSuccess = (item) => {
			// Show bonus success popup
			state.bonusType = item.bonus_type_name || '';
			state.bonusQuantity = item.quantity || 0;
			state.isShowSuccessPopup = true;

			// Update basic task list
			store.dispatch('tasks/GET_BASIC_TASK_LIST');

			// Update user info
			store.dispatch('user/GET_USER_INFO');
		};

		// 點擊領取按鈕
		const clickReceive = (item) => {
			// Update receiving task id
			state.receivingTaskId = item.id;

			// Get bonus by task id
			if (item.id === 1) {
				// 註冊
				getBonusRegister()
					.then((res) => {
						// Validate response code
						if (res.code === 0) {
							receiveSuccess(item);
						}

						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					})
					.catch(() => {
						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					});
			} else if (item.id === 2) {
				// 更改頭像
				getBonusAvatar()
					.then((res) => {
						// Validate response code
						if (res.code === 0) {
							receiveSuccess(item);
						}

						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					})
					.catch(() => {
						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					});
			} else if (item.id === 3) {
				// 綁定手機
				getBonusPhone()
					.then((res) => {
						// Validate response code
						if (res.code === 0) {
							receiveSuccess(item);
						}

						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					})
					.catch(() => {
						// Clear receiving task id on finished
						state.receivingTaskId = undefined;
					});
			} else {
				// Unknown task id
				state.receivingTaskId = undefined;
			}

			// Matomo track
			matomo_tasks_reward_newbie(item.id);
		};
		return {
			state,
			unfinishedBasicTaskList,
			containsUnfinishedBasicTask,
			clickReceive,
		};
	},
};
</script>