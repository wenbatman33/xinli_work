<template lang="pug">
//- 精彩賽事
.w-full.flex.flex-col.items-stretch(v-if='!scheduleListEmpty')
	//- 標題
	index-header(icon='/publicAssets/img/index/icon-apploud-red@3x.png', text='精彩赛事')

	//- 賽程列表
	.flex.flex-row.overflow-x-auto.px-4(:ontouchmove='onTouchMove')
		schedule-item.my-2.mr-3(v-for='item in state.scheduleList', :item='item', @update:appointment='updateAppointment')
</template>
<script>
import { useStore } from 'vuex';
import { reactive, computed, onMounted } from 'vue';
import { scheduleList } from '@/api';
import indexHeader from '@/components/index/indexHeader.vue';
import scheduleItem from '@/components/index/scheduleItem.vue';

export default {
	components: {
		indexHeader,
		scheduleItem,
	},
	props: {
		classId: Number,
	},
	setup(props, { emit }) {
		// Vue store
		const store = useStore();

		// Component state
		const state = reactive({
			scheduleList: [],
		});

		// 賽事列表是否為空
		const scheduleListEmpty = computed(() => {
			return !state.scheduleList || state.scheduleList.length === 0
		});

		// 觸碰移動
		const onTouchMove = (e) => {
			e.stopPropagation();
		};

		// 更新預約狀態
		const updateAppointment = ({ eid, is_appointment }) => {
			state.scheduleList = state.scheduleList.map((element) => {
				if (element.eid === eid) {
					return {
						...element,
						is_appointment,
					}
				} else {
					return element;
				}
			});
		};

		// On component mounted
		onMounted(() => {
			scheduleList({
				liveclassid: props.classId,
				page: 1,
				pagesize: 20,
				is_wonderful: 1,
				date_time: Math.floor(new Date() / 1000),
				uid: store?.state?.user?.uid || 0,
			}).then((res) => {
				const list = res?.data?.list || [];
				state.scheduleList = list.slice(0, 12);
			});
		});
		return {
			state,
			scheduleListEmpty,
			onTouchMove,
			updateAppointment,
		};
	},
};
</script>
