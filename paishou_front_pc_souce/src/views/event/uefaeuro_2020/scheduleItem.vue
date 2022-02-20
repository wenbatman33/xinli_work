<template lang="pug">
//- 賽事物件
.relative.rounded.bg-item.mb-4
	//- 物件點擊按鈕
	a-button.absolute.w-full.h-full.p-0(type='link', @click='clickItem')

	//- 物件內容
	.FLEX_C.items-stretch.py-6
		//- 賽事資訊
		.FLEX_R.justify-between.items-center.px-6
			//- 垂直排列
			.FLEX_C
				//- 賽事名稱
				.FLEX_R.items-center
					img.w-4.h-4(src='/publicAssets/img/event/uefaeuro_2020/icon-team-placeholder@3x.png')
					.text-sm.text-cn.font-bold.ml-2 {{ cn }}

				//- 開播數量
				.FLEX_R.items-end
					.text-xl.text-live-anchor-count.font-bold {{ anchorListCount }} 
					.text-sm.text-cn.ml-1 位主播

			//- LIVE
			a-button.flex-shrink-0.w-8.h-8.p-0.rounded-full.bg-transparent.border-transparent(v-if='showLiveIcon', type='link', @click='clickItem')
				img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-live@3x.png')

			//- 取消預約
			a-button.flex-shrink-0.w-8.h-8.p-0.rounded-full.bg-cancel.border-transparent(v-else-if='item?.is_appointment', :loading='state.loading', type='link', @click='clickCancel')
				img.w-full.h-full(v-if='!state.loading', src='/publicAssets/img/event/uefaeuro_2020/icon-bell-on@3x.png')

			//- 預約賽事
			a-button.flex-shrink-0.w-8.h-8.p-0.rounded-full.bg-appointment.border-transparent(v-else, :loading='state.loading', type='link', @click='clickAppointment')
				img.w-full.h-full(v-if='!state.loading', src='/publicAssets/img/event/uefaeuro_2020/icon-bell-off@3x.png')

		//- 隊伍資訊
		.self-center.FLEX_R.items-center.px-6.mt-4
			//- 主隊
			.FLEX_C.items-center
				//- 主隊隊徽
				img.w-14.h-14.object-contain(:src='hlog', @error='errorTeamImg')

				//- 主隊名稱
				.text-sm.text-white.font-bold.mt-2 {{ home }}

				//- 客隊名稱(使左右寬度一致)
				.text-sm.text-white.font-bold.h-0.invisible {{ away }}

			//- 時間
			.FLEX_C.items-center.px-6
				//- 日期
				.text-sm.text-white {{ date }}

				//- 時分
				.text-sm.text-white {{ begin1 }}

			//- 客隊
			.FLEX_C.items-center
				//- 客隊隊徽
				img.w-14.h-14.object-contain(:src='alog', @error='errorTeamImg')

				//- 客隊名稱
				.text-sm.text-white.font-bold.mt-2 {{ away }}

				//- 主隊名稱(使左右寬度一致)
				.text-sm.text-white.font-bold.h-0.invisible {{ home }}

		//- 分隔線
		.h-split.bg-split.mt-4

		//- 暫無主播預約
		.text-sm.text-white.text-center.px-6.mt-6(v-if='anchorListEmpty') 暂无主播预约此场赛事

		//- 預約主播列表
		.FLEX_R.items-center.overflow-x-auto.px-6.mt-2(v-else)
			img.w-10.h-10.rounded-full.object-cover.mr-4(v-for='item in anchorList', :src='item.avatar || ""', @error='errorAvatarImg')

//- 賽事彈窗
schedule-modal(v-model:show='state.showPopup', :item='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { appointment } from '@/api';
import scheduleModal from '@/views/event/uefaeuro_2020/scheduleModal.vue';
import dayjs from 'dayjs';

export default {
	components: {
		scheduleModal,
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

		// 開始日期
		const date = computed(() => {
			return beginDate.value.format('YYYY/MM/DD');
		});

		// 開始時分
		const begin1 = computed(() => {
			return props?.item?.begin1 || '';
		});

		// 客隊名稱
		const away = computed(() => {
			return props?.item?.away || '';
		});

		// 客隊隊徽
		const alog = computed(() => {
			return props?.item?.alog || '';
		});

		// 主播列表
		const anchorList = computed(() => {
			const liveAnchorList = props?.item?.live_anchor_info || [];
			liveAnchorList.forEach((element) => {
				element.isLive = true;
			});
			const scheduledAnchorList = props?.item?.anchor_info || [];
			const offlineAnchorList = scheduledAnchorList.filter((element) => {
				for (var i = 0; i < liveAnchorList.length; i++) {
					if (element.id === liveAnchorList[i].id) {
						return false;
					}
				}
				return true;
			});
			const combinedAnchorList = liveAnchorList.concat(offlineAnchorList);
			return combinedAnchorList;
		});

		// 主播列表是否為空
		const anchorListEmpty = computed(() => {
			return anchorList.value.length === 0;
		});

		// 主播列表數量
		const anchorListCount = computed(() => {
			return anchorList.value.length;
		});

		// 隊徽圖片讀取失敗
		const errorTeamImg = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-team-placeholder@3x.png';
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-default@3x.png';
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
			date,
			begin1,
			away,
			alog,
			anchorList,
			anchorListEmpty,
			anchorListCount,
			errorTeamImg,
			errorAvatarImg,
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
.text-live-anchor-count {
	color: #ffff10;
}
.bg-cancel {
	background: #f2994a;
}
.bg-appointment {
	background: #ffffff;
}
.h-split {
	height: 1px;
}
.bg-split {
	background: rgba($color: #ffffff, $alpha: 0.1);
}
</style>
