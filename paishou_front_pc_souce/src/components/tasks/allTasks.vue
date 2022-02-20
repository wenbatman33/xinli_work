<template lang="pug">
a-modal.radiusModal(v-if='showTask', :visible='showTask', :width='"1000px"', :bodyStyle='{"padding":0}', :closable='true', :footer='null', @cancel='hiedTask')
	dailyTask(v-if='showTaskType===2', @hied-task='hiedTask')
	div(v-if='showTaskType===4')
		.CENTER(class='h-[580px]')
			.p-4.text-center
				h3.text-center.text-psV3Red 恭喜获得
				.py-4
					img(:src='state?.currentTask?.gift_list[0].gifticon')
				h2.text-psV3Red.py-4 {{state?.currentTask?.gift_list[0].giftname}} +{{state?.currentTask?.gift_list[0].quantity}}
				.py-4
					a-button.rounded(type='primary', size='large', @click='hiedTask') 确认
</template>

<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { deepLink } from '@/utils';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { notification } from 'ant-design-vue';
import dailyTask from '@/components/tasks/dailyTask';
import limitTaskList from '@/components/tasks/limitTaskList';
import { getBonusTaskLimit } from '@/api';

var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export default {
	components: {
		dailyTask,
		limitTaskList,
	},
	setup() {
		const store = useStore();
		const showTask = computed(() => store?.state?.tasks?.showTask);
		const showTaskType = computed(() => store?.state?.tasks?.showTaskType);
		const isLogin = computed(() => store?.state?.user?.token !== '' && store?.state?.user?.uid !== '');
		const state = reactive({
			currentTask: '',
		});
		const showTaskModal = () => {
			const payload = {
				showTask: true,
				showTaskType: 4,
			};
			store.commit('tasks/SHOW_TASK_MODAL', payload);
		};
		const hiedTask = () => {
			const payload = {
				showTask: false,
				showTaskType: null,
			};
			store.commit('tasks/SHOW_TASK_MODAL', payload);
		};
		// -----------------------------------------------------------------
		const taskIsBetweenTime = (start_time, end_time) => {
			const S_DAY = dayjs().format('YYYY-MM-DD') + ' ' + start_time;
			const E_DAY = dayjs().format('YYYY-MM-DD') + ' ' + end_time;
			return dayjs().isBetween(S_DAY, E_DAY);
		};
		// -----------------------------------------------------------------
		const checkOnTimeLimitTask = () => {
			// 登入後檢查限時任務
			if (isLogin.value === true) {
				store.dispatch('tasks/GET_LIMIT_TASK_LIST').then((res) => {
					const List = res?.data?.list;
					const onTimeLimitTask = List?.filter((item) => taskIsBetweenTime(item.start_time, item.end_time));
					console.log(List);
					if (onTimeLimitTask.length > 0 && onTimeLimitTask[0].status === 1) {
						notification.info({
							key: 'limit',
							message: onTimeLimitTask[0].name,
							description: `${onTimeLimitTask[0].today} ${onTimeLimitTask[0].start_time}~${onTimeLimitTask[0].end_time} 限时登入奖励`,
							duration: 3,
							placement: 'bottomRight',
							style: { 'border-radius': '20px', cursor: 'pointer' },
							onClick: () => getBonus(onTimeLimitTask[0]),
						});
					}
				});
			}
		};
		const getBonus = (item) => {
			console.log(item);
			const raw = toRaw(item);
			state.currentTask = raw;
			notification.close('limit');
			getBonusTaskLimit({
				task_id: item.id,
				period_id: item.period_id,
			}).then((res) => {
				showTaskModal();
				store.dispatch('tasks/GET_LIMIT_TASK_LIST');
			});
		};
		onMounted(() => {
			// 登入後檢查限時任務
			setTimeout(() => {
				checkOnTimeLimitTask();
			}, 2000);
		});
		return {
			state,
			store,
			showTask,
			showTaskType,
			hiedTask,
			showTaskModal,
			isLogin,
			checkOnTimeLimitTask,
			getBonus,
		};
	},
};
</script>

<style lang="scss" scoped>
::v-deep(.ant-modal-content) {
	border-radius: 16px !important;
}
::v-deep(.ant-modal-body) {
	padding: 0px;
}
::v-deep(.anticon .anticon-close .ant-modal-close-icon) {
	color: #fff !important;
}
.list_box {
	overflow: auto;

	.task_list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 15px;
		background: #f4f5f8;
		border-radius: 8px;
		margin-bottom: 8px;
		font-size: 12px;

		button {
			border: none;
			outline: none;
			color: #fff;
			width: 50px;
			height: 20px;
			line-height: 20px;
			border-radius: 20px;
			font-size: 12px;
			cursor: pointer;
		}

		.defaultButton {
			background: #a62337;
		}

		.outlineButton {
			cursor: pointer;
			font-size: 12px;
			border-radius: 8px;
			color: #a62337;
			border: 1px solid #a62337;
		}

		.taskname {
			color: #4b4b4b;
			font-weight: 600;
		}

		.explain {
			color: #8e8e93;
		}
	}
}
</style>
