<template lang="pug">
//- 限時任務
van-pull-refresh(v-model='isGettingLimitTaskList', :class='$attrs.class', @refresh='refresh')
	.w-full.flex.flex-col.pb-12
		//- 限時任務列表
		.flex.flex-col.mt-1.px-4(v-if='containsUnfinishedLimitTask')
			limit-task-item(v-for='(item, index) in unfinishedLimitTaskList', :data='item', :loading='item === state.receivingTask', @click-receive='clickReceive')

		//- 目前暫無限時活動
		.mt-12.px-4(v-else)
			empty(text='目前暂无限时活动')

//- 領取成功彈窗
limit-task-success-popup(v-model:show='state.isShowSuccessPopup', :gift-list='state.giftList')
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive } from 'vue';
import { getBonusTaskLimit } from '@/api';
import { matomo_limitTasks_reward } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import limitTaskItem from '@/components/tasks/limitTaskItem.vue';
import limitTaskSuccessPopup from '@/components/tasks/limitTaskSuccessPopup.vue';

export default {
	components: {
		empty,
		limitTaskItem,
		limitTaskSuccessPopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isShowSuccessPopup: false,
			giftList: [],
			receivingTask: undefined,
		});

		// 是否正在取得限時活動列表
		const isGettingLimitTaskList = computed(() => {
			return store.state?.tasks?.isGettingLimitTaskList === true;
		});

		// 未完成的限時活動列表
		const unfinishedLimitTaskList = computed(() => {
			return store.getters['tasks/unfinishedLimitTaskList'];
		});

		// 是否包含未完成的限時活動
		const containsUnfinishedLimitTask = computed(() => {
			return store.getters['tasks/containsUnfinishedLimitTask'];
		});

		// 取得限時任務列表
		const getLimitTaskList = () => {
			if (!store.state?.tasks?.isGettingLimitTaskList) {
				store.dispatch('tasks/GET_LIMIT_TASK_LIST', {});
			}
		};

		// On component mounted
		onMounted(() => {
			getLimitTaskList();
		});

		// 下拉刷新
		const refresh = () => {
			getLimitTaskList();
		};

		// 點擊領取按鈕
		const clickReceive = (item) => {
			// Update receiving task
			state.receivingTask = item;

			// Post body
			const body = {
				task_id: item.id,
				period_id: item.period_id,
			};

			// Get bonus
			getBonusTaskLimit(body)
				.then((res) => {
					if (res.code === 0) {
						// Show success popup
						state.giftList = item.gift_list;
						state.isShowSuccessPopup = true;

						// Update limit task list
						getLimitTaskList();

						// Update user info
						store.dispatch('user/GET_USER_INFO');
					}

					// Clear receiving task on finished
					state.receivingTask = undefined;
				})
				.catch(() => {
					// Clear receiving task on error
					state.receivingTask = undefined;
				});

			// Matomo track
			matomo_limitTasks_reward(item.id);
		};
		return {
			state,
			isGettingLimitTaskList,
			unfinishedLimitTaskList,
			containsUnfinishedLimitTask,
			refresh,
			clickReceive,
		};
	},
};
</script>