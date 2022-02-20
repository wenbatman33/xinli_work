<template lang="pug">
.scheduleCard.relative.FLEX_C.justify-between.h-auto.bgBtn.bg-white.shadow.rounded-lg(v-if='scheduleData')
	.w-full.h-full.p-4.relative.pointer-events-none
		.BETWEEN.relative
			div.absolute.z-50.pointer-events-auto.right-0
				//- 取消預約按鈕
				.CENTER.w-8.h-8.rounded-full.bg-psV3Yellow.shadow.rounded-full.cursor-pointer(v-if='is_appointment===1', @click='delReserved(scheduleData.eid)')
					.w-5
						img.w-full(src='/publicAssets/img/v3/icon-bells.png', srcset='/publicAssets/img/v3/icon-bells@2x.png 2x')
					//- 預約按鈕
				.CENTER.w-8.h-8.rounded-full.bg-white.shadow.rounded-full.cursor-pointer(v-else, @click='appointmentLiveHandle(scheduleData.eid)')
					.w-5
						img.w-full(src='/publicAssets/img/v3/icon-bells-r.png', srcset='/publicAssets/img/v3/icon-bells-r@2x.png 2x')
		h4.truncate.text-center.my-4 {{scheduleData.cn}}

		.flex.justify-around.my-2
			.CENTER_C.truncate(class='w-1/3')
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.hlog', @error='errorTeamImg')
				.w-full.home.font-bold.text-center.truncate {{scheduleData.home}}
			.CENTER_C(class='w-1/3')
				.text-xs {{scheduleData.begin_date}}
				h2.text-gray-500 {{scheduleData.begin1}}
			.CENTER_C.truncate(class='w-1/3')
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.alog', @error='errorTeamImg')
				.w-full.away.font-bold.text-center.truncate {{scheduleData.away}}
</template>
<script>
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { scheduleList, appointment, appointmentLive } from '@/api';
import { onMounted, computed, reactive } from 'vue';
import { errorPersonImg, errorTeamImg } from '@/utils';

export default {
	props: ['scheduleData', 'is_appointment'],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			is_appointment: null,
		});

		const viewLive = (liveuid) => {
			let routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		const showCurrentGame = (game) => {
			store.commit('game/SET_CURRENT_GAME', game);
			store.commit('game/SHOW_GAME_MODAL');
		};
		const checkGameTime = (item) => {
			const gameTime = item.date + ' ' + item.time;
			const beforeGameTime_10_mins = dayjs(gameTime).subtract(10, 'minute').format('YYYY MM-DD HH:mm');
			const game_after_10_min = dayjs().isAfter(dayjs(beforeGameTime_10_mins));
			const game_before_onTime = dayjs().isBefore(dayjs(gameTime));
			if (game_after_10_min && game_before_onTime) {
				return '10_mins';
			} else if (game_after_10_min) {
				return 'gameOnTime';
			} else {
				return 'none';
			}
		};
		// 预约赛事
		const appointmentLiveHandle = (eid) => {
			appointmentLive({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: props?.scheduleData?.classid,
				status: 1,
			}).then((res) => {
				if (res.code === 0) {
					// getReservedList();
					// getScheduleList()
					emit('upadteGame');
				}
			});
		};
		// 取消预约
		const delReserved = (eid, status) => {
			appointmentLive({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: props?.scheduleData?.classid,
				status: 2,
			}).then((res) => {
				if (res.code === 0) {
					emit('upadteGame');
					// getScheduleList();
					// getReservedList();
				}
			});
		};

		return {
			store,
			UID,
			state,
			viewLive,
			errorPersonImg,
			errorTeamImg,
			checkGameTime,
			showCurrentGame,
			appointmentLiveHandle,
			delReserved,
		};
	},
};
</script>
<style lang="scss" scoped></style>
