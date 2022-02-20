<template lang="pug">
//- 賽程物件
.relative.my-2.mx-4
	//- 物件按鈕
	van-button.absolute.w-full.h-full.p-0.rounded-lg.bg-transparent.border-transparent(@click='clickItem')

	//- 物件內容
	.grid.grid-cols-content.items-center.w-full.bg-item.rounded-lg.shadow-content.overflow-hidden
		//- 賽事資訊
		.flex.flex-col.pl-5.pr-4.py-4.overflow-hidden
			//- 賽事名稱
			.text-title.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ title }}

			//- 主隊資訊
			.grid.grid-cols-team.gap-2.items-center.mt-2
				//- 主隊隊徽
				img.w-4.h-4.object-contain(:src='homeLogo', @error='errorLogoImg')

				//- 主隊名稱
				.text-team-name.text-sm.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ homeName }}

				//- 主隊分數
				.text-team-score.text-base.font-bold(v-if='showScore') {{ homeScore }}

			//- 客隊資訊
			.grid.grid-cols-team.gap-2.items-center.mt-2
				//- 客隊隊徽
				img.w-4.h-4.object-contain(:src='awayLogo', @error='errorLogoImg')

				//- 客隊名稱
				.text-team-name.text-sm.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ awayName }}

				//- 客隊分數
				.text-team-score.text-base.font-bold(v-if='showScore') {{ awayScore }}

		//- 垂直分隔線
		.bg-divider.w-full.self-stretch

		//- 賽事狀態
		.flex.flex-col.flex-shrink-0.pl-3.pr-4
			//- 賽事進行中
			.text-living.text-sm.font-bold(v-if='showLiveText') 赛事进行中

			//- 即將開賽
			.text-upcoming.text-sm.font-bold(v-else-if='showUpcomingText') 即将开赛

			//- 比賽時間
			.text-time.text-sm.font-bold.mt-1 {{ time }}

		//- 按鈕群
		.flex.flex-col.items-center.pr-3
			//- 直播中按鈕
			van-button.w-8.h-8.p-0.rounded-full.shadow.bg-transparent.border-transparent(v-if='showLiveButton', @click='clickItem')
				img.w-full.h-full.object-contain(src='/publicAssets/img/schedule/live-a@3x.png') 

			//- 取消預約按鈕
			van-button.w-8.h-8.p-0.rounded-full.shadow.bg-cancel.border-transparent(v-else-if='showCancelButton', :loading='state.isLoading', @click='clickCancel')
				img.w-full.h-full.object-contain(src='/publicAssets/img/schedule/bells-on@3x.png')
				template(#loading)
					.w-full.h-full.flex.justify-center.items-center
						van-loading.w-4.h-4(color='#ffffff', type='spinner')

			//- 預約賽事按鈕
			van-button.w-8.h-8.p-0.rounded-full.shadow.bg-white.border-transparent(v-else, :loading='state.isLoading', @click='clickAppointment')
				img.w-full.h-full.object-contain(src='/publicAssets/img/schedule/bells-off@3x.png')
				template(#loading)
					.w-full.h-full.flex.justify-center.items-center
						van-loading.w-4.h-4(color='#a62337', type='spinner')

//- 賽程彈窗
schedule-popup(v-model:show='state.isShowPopup', :data='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { appointment } from '@/api';
import { isLive, isUpcoming, showLiveIcon } from '@/utils';
import schedulePopup from '@/components/event/2020tokyolympic/schedulePopup.vue';

export default {
	components: {
		schedulePopup,
	},
	props: {
		item: Object,
	},
	emits: ['update:appointment'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isLoading: false,
			isShowPopup: false,
		});

		// User id
		const uid = computed(() => {
			return store.state?.user?.uid || '';
		});

		// 賽事名稱
		const title = computed(() => {
			return props?.item?.cn || props?.item?.title || '';
		});

		// 主隊隊徽
		const homeLogo = computed(() => {
			return props?.item?.hlog || props?.item?.home_logo || '';
		});

		// 主隊名稱
		const homeName = computed(() => {
			return props?.item?.home || props?.item?.home_name || '';
		});

		// 主隊分數
		const homeScore = computed(() => {
			return props?.item?.homescore || 0;
		});

		// 客隊隊徽
		const awayLogo = computed(() => {
			return props?.item?.alog || props?.item?.away_logo || '';
		});

		// 客隊名稱
		const awayName = computed(() => {
			return props?.item?.away || props?.item?.away_name || '';
		});

		// 客隊分數
		const awayScore = computed(() => {
			return props?.item?.awayscore || 0;
		});

		// 比賽時間
		const time = computed(() => {
			return props?.item?.begin1 || props?.item?.time || '';
		});

		// 是否顯示比分
		const showScore = computed(() => {
			const item = props?.item || {};
			return isLive(item) || isUpcoming(item);
		});

		// 是否賽事進行中文字
		const showLiveText = computed(() => {
			return isLive(props?.item || {});
		});

		// 是否即將開賽文字
		const showUpcomingText = computed(() => {
			return isUpcoming(props?.item || {});
		});

		// 是否顯示 LIVE 按鈕
		const showLiveButton = computed(() => {
			return showLiveIcon(props?.item || {});
		});

		// 是否顯示取消預約按鈕
		const showCancelButton = computed(() => {
			return props?.item?.is_appointment === true;
		});

		// 點擊賽事物件
		const clickItem = () => {
			// Show popup
			state.isShowPopup = true;
		};

		// 點擊預約按鈕
		const clickAppointment = () => {
			// Update loading state
			state.isLoading = true;

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
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: true,
					});

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Update appointment state
					props.item.is_appointment = true;

					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// 點擊取消預約按鈕
		const clickCancel = () => {
			// Update loading state
			state.isLoading = true;

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
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: false,
					});

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Update appointment state
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: false,
					});

					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// 隊徽圖片讀取失敗
		const errorLogoImg = (event) => {
			event.target.src = '/publicAssets/img/schedule/icon-soccer-gray@3x.png';
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};
		return {
			state,
			title,
			homeLogo,
			homeName,
			homeScore,
			awayLogo,
			awayName,
			awayScore,
			time,
			showScore,
			showLiveText,
			showUpcomingText,
			showLiveButton,
			showCancelButton,
			clickItem,
			clickAppointment,
			clickCancel,
			errorLogoImg,
			errorAvatarImg,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-item {
	background: #001056;
}
.grid-cols-content {
	grid-template-columns: 1fr 1px minmax(98px, auto) auto;
}
.shadow-content {
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
}
.grid-cols-team {
	grid-template-columns: auto 1fr auto;
}
.text-title {
	color: #aeaeae;
}
.text-team-name {
	color: #FFFFFF;
}
.text-team-score {
	color: #FF7A00;
}
.bg-divider {
	background: #0020A8;
}
.text-living {
	color: #FF7A00;
}
.text-upcoming {
	color: #f8b62d;
}
.text-time {
	color: #FFFFFF;
}
.bg-cancel {
	background: #f2994a;
}
</style>
