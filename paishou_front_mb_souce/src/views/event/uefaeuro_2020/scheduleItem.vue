<template lang="pug">
//- 賽事物件
.relative.rounded.bg-item.mb-4
	//- 物件點擊按鈕
	van-button.absolute.w-full.h-full.p-0.bg-transparent.border-transparent(@click='clickItem')

	//- 物件內容
	.grid.grid-cols-item.items-center.px-5
		//- 賽事資訊
		.flex.flex-col.items-start.py-4
			//- 賽事名稱
			.text-sm.text-cn {{ cn }}

			//- 主隊
			.flex.flex-row.items-center.mt-2
				//- 主隊隊徽
				img.w-4.h-4.object-contain(:src='hlog', @error='errorTeamImg')

				//- 主隊名稱
				.text-sm.text-white.font-bold.ml-2 {{ home }}

			//- 客隊
			.flex.flex-row.items-center.mt-2
				//- 客隊隊徽
				img.w-4.h-4.object-contain(:src='alog', @error='errorTeamImg')

				//- 客隊名稱
				.text-sm.text-white.font-bold.ml-2 {{ away }}

		//- 分隔線
		.w-full.h-full.bg-white.opacity-10

		//- 比賽狀態
		.flex.flex-col.items-center.p-4 
			//- 賽事進行中
			.living.text-sm.font-bold(v-if='isLive') 赛事进行中

			//- 即將開賽
			.upcoming.text-sm.font-bold(v-else-if='isUpcoming') 即将开赛

			//- 比賽時間
			.text-sm.text-white {{ begin1 }}

		//- 按鈕
		.flex.flex-col.items-center.pl-4.py-4
			//- LIVE
			van-button.w-8.h-8.p-0.rounded-full.bg-transparent.border-transparent(v-if='showLiveIcon', @click='clickItem')
				img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-live@3x.png')

			//- 取消預約
			van-button.w-8.h-8.p-0.rounded-full.bg-cancel.border-transparent(v-else-if='item?.is_appointment', :loading='state.loading', @click='clickCancel')
				img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-bell-on@3x.png')
				template(#loading)
					.w-full.h-full.flex.justify-center.items-center
						van-loading.w-4.h-4(color='#ffffff', type='spinner')

			//- 預約賽事
			van-button.w-8.h-8.p-0.rounded-full.bg-appointment.border-transparent(v-else, :loading='state.loading', @click='clickAppointment')
				img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-bell-off@3x.png')
				template(#loading)
					.w-full.h-full.flex.justify-center.items-center
						van-loading.w-4.h-4(color='#a62337', type='spinner')

//- 賽事彈窗
schedule-popup(v-model:show='state.showPopup', :item='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { appointment } from '@/api';
import schedulePopup from '@/views/event/uefaeuro_2020/schedulePopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		schedulePopup,
	},
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			loading: false,
			showPopup: false,
		});

		// User id
		const uid = computed(() => {
			return store?.state?.user?.uid || '';
		});

		// 開賽時間
		const beginDate = computed(() => {
			const beginDate = props?.item?.begin_date || '';
			const date = props?.item?.date || '';
			const begin1 = props?.item?.begin1 || '';
			const time = props?.item?.time || '';
			try {
				return dayjs(`${beginDate || date} ${begin1 || time}`);
			} catch (e) {
				return dayjs().add();
			}
		});

		// 是否直播中
		const isLive = computed(() => {
			const isEqualsNow = beginDate.value.isSame(dayjs());
			const isBeforeNow = beginDate.value.isBefore(dayjs());
			return isEqualsNow || isBeforeNow;
		});

		// 是否即將開賽
		const isUpcoming = computed(() => {
			const isAfterNow = beginDate.value.isAfter(dayjs());
			const in10Minute = beginDate.value.add(-11, 'minute').isBefore(dayjs());
			return isAfterNow && in10Minute;
		});

		// 是否顯示 Live icon
		const showLiveIcon = computed(() => {
			const liveAnchorInfo = props?.item?.live_anchor_info || [];
			return liveAnchorInfo.length > 0;
		});

		// 賽事名稱
		const cn = computed(() => {
			return props?.item?.cn || '';
		});

		// 主隊名稱
		const home = computed(() => {
			return props?.item?.home || '';
		});

		// 主隊隊徽
		const hlog = computed(() => {
			return props?.item?.hlog || '';
		});

		// 客隊名稱
		const away = computed(() => {
			return props?.item?.away || '';
		});

		// 客隊隊徽
		const alog = computed(() => {
			return props?.item?.alog || '';
		});

		// 開始時間
		const begin1 = computed(() => {
			return props?.item?.begin1 || '';
		});

		// 隊徽圖片讀取失敗
		const errorTeamImg = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-team-placeholder@3x.png';
		};

		// 點擊物件
		const clickItem = () => {
			state.showPopup = true;
		};

		// 點擊取消預約
		const clickCancel = () => {
			// Update loading state
			state.loading = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				eid: Number(props?.item?.eid),
				liveclassid: Number(props?.item?.classid),
				status: 2,
			};

			// Appointment
			appointment(payload)
				.then(() => {
					// Update appointment state
					props.item.is_appointment = false;

					// Revert loading state on finished
					state.loading = false;
				})
				.catch(() => {
					// Update appointment state
					props.item.is_appointment = false;

					// Revert loading state on error
					state.loading = false;
				});
		};

		// 點擊預約
		const clickAppointment = () => {
			// Update loading state
			state.loading = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				eid: Number(props?.item?.eid),
				liveclassid: Number(props?.item?.classid),
				status: 1,
			};

			// Appointment
			appointment(payload)
				.then(() => {
					// Update appointment state
					props.item.is_appointment = true;

					// Revert loading state on finished
					state.loading = false;
				})
				.catch(() => {
					// Update appointment state
					props.item.is_appointment = true;

					// Revert loading state on error
					state.loading = false;
				});
		};
		return {
			state,
			isLive,
			isUpcoming,
			showLiveIcon,
			cn,
			home,
			hlog,
			away,
			alog,
			begin1,
			errorTeamImg,
			clickItem,
			clickCancel,
			clickAppointment,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-item {
	background: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(6px);
}
.grid-cols-item {
	grid-template-columns: 1fr 1px auto auto;
}
.text-cn {
	color: #f4f4f4;
}
.bg-cancel {
	background: #f2994a;
}
.bg-appointment {
	background: #ffffff;
}
</style>
