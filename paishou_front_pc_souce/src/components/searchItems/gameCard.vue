<template lang="pug">
.scheduleCard.relative.FLEX_C.justify-between.h-auto.bgBtn.bg-white.shadow.rounded-lg(v-if='scheduleData')
	.w-full.h-full.absolute.z-0.cursor-pointer(@click='showCurrentGame(scheduleData)')
	.w-full.h-full.p-4.relative.pointer-events-none
		.BETWEEN
			div
				h4.truncate {{scheduleData.title}}
				h5.my-2(v-if='scheduleData.anchor_info.length')
					span.text-psV3Yellow.mr-2 {{scheduleData.anchor_info.length}} 
					span.text-gray-300 位主播
			div.relative.z-50.pointer-events-auto
				.CENTER.w-8.h-8.rounded-full.bg-gray-300.shadow.rounded-full.cursor-pointer(v-if='checkGameTime(scheduleData)==="gameOnTime" && scheduleData.anchor_info.length>0')
					img.w-full(src='/publicAssets/img/v3/img-live-a.png', srcset='/publicAssets/img/v3/img-live-a@2x.png 2x')
				//- 取消預約按鈕
				.CENTER.w-8.h-8.rounded-full.bg-psV3Yellow.shadow.rounded-full.cursor-pointer(v-else-if='state.is_appointment===true', @click='unappointmentClickHandle(scheduleData.eid, scheduleData.classid)')
					.w-5
						img.w-full(src='/publicAssets/img/v3/icon-bells.png', srcset='/publicAssets/img/v3/icon-bells@2x.png 2x')
					//- 預約按鈕
				.CENTER.w-8.h-8.rounded-full.bg-white.shadow.rounded-full.cursor-pointer(v-else-if='state.is_appointment===false' , @click='appointmentClickHandle(scheduleData.eid, scheduleData.classid)')
					.w-5
						img.w-full(src='/publicAssets/img/v3/icon-bells-r.png', srcset='/publicAssets/img/v3/icon-bells-r@2x.png 2x')
		.flex.justify-around.my-2
			.CENTER_C.truncate(class='w-1/3')
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.home_logo', @error='errorTeamImg')
				.w-full.home.font-bold.text-center.truncate {{scheduleData.home_name}}
			.CENTER_C(class='w-1/3')
				.text-xs {{scheduleData.date}}
				h3.text-psV3Yellow(v-if='checkGameTime(scheduleData)==="10_mins"') 即将开赛
				h3.text-psV3Red(v-if='checkGameTime(scheduleData)==="gameOnTime"') 赛事进行中
				h2.text-gray-500(v-if='checkGameTime(scheduleData)==="none"') {{scheduleData.time}}
			.CENTER_C.truncate(class='w-1/3')
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.away_logo', @error='errorTeamImg')
				.w-full.away.font-bold.text-center.truncate {{scheduleData.away_name}}
		a-divider.my-2
		.CENTER_BETWEEN(v-if='scheduleData.anchor_info.length>0')
			.flex.flex-grow.flex-wrap.overflow-hidden.h-10
				.anchorItem.mr-1( v-for='(subItem, subIndex) in scheduleData.anchor_info')
					img.AVATAR.shadow.w-10.h-10(:src='subItem.avatar', @error='errorPersonImg')
			.w-6
				img.w-full(src='/publicAssets/img/v3/icon-set.png', srcset='/publicAssets/img/v3/icon-set@2x.png 2x')
		.h-10.flex.justify-cneter.items-center(v-else) 
			.w-full.text-center.text-gray-500 暂无主播预约此场赛事
</template>
<script>
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { scheduleList, appointment } from '@/api';
import { onMounted, computed, reactive } from 'vue';
import { errorPersonImg, errorTeamImg } from '@/utils';

export default {
	props: ['scheduleData'],
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
		const appointmentClickHandle = (eid, classid) => {
			if (UID.value) {
				appointment({
					uid: Number(UID.value),
					eid: eid,
					liveclassid: classid,
					status: 1,
				}).then((res) => {
					// init();
					state.is_appointment = true;
				});
			} else {
				showUserLoginModal();
			}
		};
		const unappointmentClickHandle = (eid, classid) => {
			if (UID.value) {
				appointment({
					uid: Number(UID.value),
					eid: eid,
					liveclassid: classid,
					status: 2,
				}).then((res) => {
					// init();
					state.is_appointment = false;
				});
			} else {
				showUserLoginModal();
			}
		};
		const showUserLoginModal = () => {
			store.commit('user/SHOW_LOGIN_MODEL', 1);
		};
		onMounted(() => {
			// init();
			state.is_appointment = props.scheduleData?.is_appointment;
		});

		return {
			store,
			UID,
			state,
			viewLive,
			errorPersonImg,
			errorTeamImg,
			checkGameTime,
			showCurrentGame,
			appointmentClickHandle,
			unappointmentClickHandle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
