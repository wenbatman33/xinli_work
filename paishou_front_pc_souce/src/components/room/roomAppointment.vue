<template lang="pug">
.w-full(v-if='state.dataList?.length>0')
	.CENTER_BETWEEN
		h3.my-4.text-psV3Red 主播开播赛事
	.grid.grid-cols-3.gap-4
		.col-span-1(v-for='(item, index) in state.dataList', :key='index')
			.relative
				.floatBtn.absolute(style='right: 20px;top: 20px;z-index: 3;')
					//- 正在直播
					//- .CENTER.w-8.h-8.rounded-full.bg-gray-300.shadow.rounded-full.cursor-pointer(v-if='checkGameTime(item)==="gameOnTime"')
					.CENTER.w-8.h-8.rounded-full.bg-gray-300.shadow.rounded-full.cursor-pointer(v-if='checkGameTime(item)==="gameOnTime"')
						img.w-full(src='/publicAssets/img/v3/img-live-a.png', srcset='/publicAssets/img/v3/img-live-a@2x.png 2x')
					//- 取消預約按鈕
					.CENTER.w-8.h-8.rounded-full.bg-psV3Yellow.shadow.rounded-full.cursor-pointer(v-if='checkGameTime(item)!=="gameOnTime" && item.is_appointment===true', @click='unappointmentClickHandle(item.id, item.classid)')
						.w-5
							img.w-full(src='/publicAssets/img/v3/icon-bells.png', srcset='/publicAssets/img/v3/icon-bells@2x.png 2x')
					//- 預約按鈕
					.CENTER.w-8.h-8.rounded-full.bg-white.shadow.rounded-full.cursor-pointer(v-if='checkGameTime(item)!=="gameOnTime"  && item.is_appointment===false' , @click='appointmentClickHandle(item.id, item.classid)')
						.w-5
							img.w-full(src='/publicAssets/img/v3/icon-bells-r.png', srcset='/publicAssets/img/v3/icon-bells-r@2x.png 2x')
				//- 
				//- .gameCard.FLEX_C.justify-between.h-40.rounded-lg.bg-white.shadow.p-4.cursor-pointer(@click='showCurrentGame(item)')
				.gameCard.FLEX_C.justify-between.h-40.rounded-lg.bg-white.shadow.p-4
					h4.truncate.text-center {{item.cn}}						
					.flex.justify-around.my-2
						.CENTER_C(class='w-1/3')
							.w-full.text-center
								img.w-14.h-14(:src='item.hlog', @error='errorTeamImg')
								.home.font-bold.truncate {{item.home}}
						.CENTER_C(class='w-1/3')
							.text-xs {{item.begin_date}}
							h3.text-psV3Yellow(v-if='checkGameTime(item)==="10_mins"') 即将开赛
							h3.text-psV3Red(v-if='checkGameTime(item)==="gameOnTime"') 赛事进行中
							h2.text-gray-500(v-if='checkGameTime(item)==="none"') {{item.begin_time}}
						.CENTER_C(class='w-1/3')
							.w-full.text-center
								img.w-14.h-14(:src='item.alog', @error='errorTeamImg')
								.away.font-bold.truncate {{item.away}}
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, computed } from 'vue';
import { roomAppointment, appointment } from '@/api';
import { RightOutlined } from '@ant-design/icons-vue';
import videoItem from '@/components/videoItem';
import { errorPersonImg, errorTeamImg } from '@/utils';

export default {
	components: {
		RightOutlined,
		videoItem,
	},
	props: ['liveclassid'],
	setup(props) {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			dataList: null,
		});
		const init = () => {
			roomAppointment({
				uid: route.params.id,
			}).then((res) => {
				state.dataList = res.data.list;
			});
		};
		const appointmentClick = (eid) => {
			if (!UID.value) {
				this.$store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			appointment({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: props.liveclassid,
				status: 1,
			}).then((res) => {
				init();
			});
		};
		const delReserved = (eid) => {
			appointment({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: props.liveclassid,
				status: 2,
			}).then((res) => {
				init();
			});
		};
		const checkGameTime = (item) => {
			const gameTime = item.begin_date + ' ' + item.begin_time;
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
		const showCurrentGame = (game) => {
			store.commit('game/SET_CURRENT_GAME', game);
			store.commit('game/SHOW_GAME_MODAL');
		};
		const appointmentClickHandle = (eid, classid) => {
			if (UID.value) {
				appointment({
					uid: Number(UID.value),
					eid: eid,
					liveclassid: classid,
					status: 1,
				}).then((res) => {
					init();
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
					init();
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
			init();
		});
		return {
			store,
			route,
			router,
			state,
			init,
			errorTeamImg,
			appointmentClick,
			delReserved,
			checkGameTime,
			errorPersonImg,
			showCurrentGame,
			appointmentClickHandle,
			unappointmentClickHandle,
			showUserLoginModal,
		};
	},
};
</script>
<style lang="scss" scoped>
.class_head {
	padding: 10px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	p {
		margin: 0;
		font-weight: bolder;
		font-size: 16px;
	}
	span {
		color: #a62337;
		font-size: 12px;
		cursor: pointer;
		img {
			transform: scale(0.7);
			margin-top: -2px;
		}
	}
}
.gameItem {
	width: 100%;
	height: 80px;
	border-radius: 8px;
	background-color: #ffffff;
}
.teamLogo {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	overflow: hidden;
	background: #efefef;
}
.gameTimes {
	// width: 180px;
}
.gameInfo {
	width: 360px;
}
.btn {
	width: 74px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 16px;
	cursor: pointer;
}
.reserveBtn {
	color: #fff;
	background-image: #a62337;
}
.cancelBtn {
	color: #a62337;
	border: solid 1px #a62337;
}
</style>
