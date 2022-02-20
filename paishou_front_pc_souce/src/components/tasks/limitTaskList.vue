<template lang="pug">
div
	.list_box(v-if='basicTaskList.length<=0  && limitTaskList.length>0')
		.font-black.mb-2.text-psV3Red 限时任务
		.task_list(v-if='limitTaskList.length>0', v-for='(item, index) in limitTaskList', :key='index')
			div
				p.taskname {{ item.name }}
				p.explain {{item.today}} {{item.start_time}}~{{item.end_time}} 限时登入奖励
			button.defaultButton(v-if='item.status === 1', @click='getBonus(item)') 领取 
			button.outlineButton(v-if='item.status === 0') 未完成
	.task_list(v-else)
		.text-gray-500.text-center.py-8 目前尚无限时任务
	a-modal.radiusModal(v-if='state.showTask', :visible='state.showTask', :width='"1000px"', :bodyStyle='{"padding":0}', :closable='true', :footer='null', @cancel='state.showTask=false')
		.CENTER(class='h-[580px]')
			.p-4.text-center
				h3.text-center.text-psV3Red 恭喜获得
				.py-4
					img(:src='state?.currentTask?.gift_list[0].gifticon')
				h2.text-psV3Red.py-4 {{state?.currentTask?.gift_list[0].giftname}} +{{state?.currentTask?.gift_list[0].quantity}}
				.py-4
					a-button.rounded(type='primary', size='large', @click='state.showTask=false') 确认
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { deepLink } from '@/utils';
import { matomo_task } from '@/matomoEvent';
import { getBonusTaskLimit } from '@/api';

export default {
	setup() {
		const store = useStore();
		const state = reactive({
			showTask: false,
		});
		const basicTaskList = computed(() => {
			const List = store.state.tasks.basicTaskList;
			return List.filter((task) => task.status != 2);
		});
		const limitTaskList = computed(() => {
			const List = store.state.tasks.limitTaskList;
			return List.filter((task) => task.status != 2 && task.status != 3);
		});
		const todoTask = (link) => {
			deepLink(link);
		};
		const getBonus = (item) => {
			const raw = toRaw(item);
			state.currentTask = raw;
			getBonusTaskLimit({
				task_id: item.id,
				period_id: item.period_id,
			}).then((res) => {
				state.showTask = true;
				init();
			});
		};

		const init = () => {
			store.dispatch('tasks/GET_PAYMENT_TASK_LIST', {});
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			basicTaskList,
			limitTaskList,
			todoTask,
			init,
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
			// cursor: pointer;
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
			width: 180px;
			color: #8e8e93;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
