<template lang="pug">
//- 充值任務
.flex.flex-col.items-stretch(:class='$attrs.class')
	//- 標題
	task-list-header(text='充值任务')

	//- 充值任務列表
	.flex.flex-col.items-stretch.mt-1(v-if='containsUnfinishedPaymentTask')
		basic-task-item(v-for='(item, index) in unfinishedPaymentTaskList', :data='item', :loading='item === state.receivingTask', @click-receive='onClickReceive')

	//- 目前暫無充值任務
	empty.mt-2(v-else, text='目前暂无充值任务')

//- 領取成功彈窗
bonus-success-popup(v-model:show='state.isShowSuccessPopup', title='领取成功', :type='state.bonusType', :quantity='state.bonusQuantity')
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { getTaskPayment } from '@/api';
import { matomo_tasks_reward_recharge } from '@/matomoTrackEvent.js';
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
			receivingTask: undefined,
		});

		// User id
		const uid = computed(() => store.state?.user?.uid || '');

		// 未完成的充值任務列表
		const unfinishedPaymentTaskList = computed(() => store.getters['tasks/unfinishedPaymentTaskList']);

		// 是否包含未完成的充值任務
		const containsUnfinishedPaymentTask = computed(() => store.getters['tasks/containsUnfinishedPaymentTask']);

		// 點擊領取按鈕
		const onClickReceive = (item) => {
			// Update receiving task
			state.receivingTask = item;

			// Get bonus
			getTaskPayment({
				task_list_id: item.task_list_id,
			}).then(
				(res) => {
					// Validate response code
					if (res.code === 0) {
						// Show bonus success popup
						state.bonusType = item.bonus_type_name || '';
						state.bonusQuantity = item.quantity || 0;
						state.isShowSuccessPopup = true;

						// Update day task list
						store.dispatch('tasks/GET_PAYMENT_TASK_LIST', uid.value);

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
			matomo_tasks_reward_recharge(item.task_list_id);
		};

		return {
			state,
			unfinishedPaymentTaskList,
			containsUnfinishedPaymentTask,
			onClickReceive,
		};
	},
};
</script>