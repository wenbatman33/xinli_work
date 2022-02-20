<template lang="pug">
.scheduleCard.relative.FLEX_C.justify-between.h-auto.bgBtn.shadow.rounded-lg(class='bg-[#001056]', v-if='scheduleData')
	.w-full.h-full.absolute.z-10.cursor-pointer(@click='showCurrentGame(state.currentData)') 
	.w-full.h-full.p-4.relative
		.BETWEEN.relative
			div
				h4.text-white.truncate {{scheduleData.cn}}
				h5.my-2 
					span.text-psV3Yellow.mr-2 {{scheduleData.anchor_info.length}} 
					span.text-white 位主播
			div.relative.z-50.pointer-events-auto
				.CENTER.w-8.h-8.rounded-full.bg-gray-300.shadow.rounded-full.cursor-pointer(v-if='scheduleData.is_live===true')
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
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.hlog', @error='errorTeamImg')
				.w-full.home.text-white.font-bold.text-center.truncate {{scheduleData.home}}
				.w-full.home.text-white.font-bold.text-center.truncate(v-if='scheduleData.homescore') {{scheduleData.homescore}}
			.CENTER_C(class='w-1/3')
				.text-xs.text-white {{scheduleData.begin_date}}
				h4.text-psV3Yellow(v-if='checkGameTime(scheduleData)==="10_mins"') 即将开赛
				h4.text-psV3Red(v-if='checkGameTime(scheduleData)==="gameOnTime"') 赛事进行中
				h2.text-white(v-if='checkGameTime(scheduleData)==="none"') {{scheduleData.begin1}}
			.CENTER_C.truncate(class='w-1/3')
				img.w-14.h-14.rounded-full.overflow-hidden(:src='scheduleData.alog', @error='errorTeamImg')
				.w-full.away.text-white.font-bold.text-center.truncate {{scheduleData.away}}
				.w-full.away.text-white.font-bold.text-center.truncate(v-if='scheduleData.awayscore') {{scheduleData.awayscore}}
		//- p {{scheduleData.anchor_info.user_nicename}}
		a-divider.my-2(class='bg-[#0020a8]')
		.CENTER_BETWEEN.relative.z-50(v-if='state.anchorList.length>0')
			.flex.flex-grow.flex-wrap.overflow-hidden.h-10
				.anchorItem.mr-1(v-for='(subItem, subIndex) in state.anchorList')
					img.AVATAR.shadow.w-10.h-10.cursor-pointer(:src='subItem.avatar', @error='errorPersonImg', @click='viewLive(subItem.id)')

		.h-10.flex.justify-cneter.items-center(v-else) 
			.w-full.text-center.text-white 暂无主播预约此场赛事
</template>
<script>
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { scheduleList, appointment } from '@/api';
import { onMounted, computed, reactive, toRaw } from 'vue';
import { errorPersonImg, errorTeamImg } from '@/utils';

export default {
	props: ['scheduleData'],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			is_appointment: null,
			anchorList: [],
			currentData: null,
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
			const gameTime = item.begin_date + ' ' + item.begin1;
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
			state.is_appointment = props.scheduleData?.is_appointment;
			state.currentData = props.scheduleData;

			const liveAnchorList = props?.scheduleData?.live_anchor_info || [];
			liveAnchorList.map((item) => {
				item.isLive = 1;
			});
			const anchorList = props?.scheduleData?.anchor_info || [];
			// 陣列中去除重複物件
			const offlineList = anchorList.filter((element) => {
				for (let i in liveAnchorList) {
					if (element.id === liveAnchorList[i].id) {
						return false;
					}
				}
				return true;
			});
			const combinedAnchorList = [...liveAnchorList, ...offlineList];
			state.anchorList = combinedAnchorList;
			// 將combinedAnchorList  塞回 currentData
			state.currentData.anchorList = combinedAnchorList;
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
