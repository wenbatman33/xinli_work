<template lang="pug">
.w-full
	h3.text-psV3Red 相关赛事
	.grid.grid-cols-3.gap-4
		.col-span-1(v-for='(gamesItem, gameskey) in state.gameList')
			gameCard(:scheduleData='gamesItem')

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed, watch, reactive, toRaw, toRef } from 'vue';
import { appointment } from '@/api';
import gameCard from '@/components/searchItems/gameCard.vue';
import { errorPersonImg } from '@/utils';

export default {
	components: {
		gameCard,
	},
	props: ['dataList'],
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			gameList: [],
			tabkey: 1,
			isAppointment: 0,
		});
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const UID = computed(() => store.state.user.uid || '');
		watch(
			() => props.dataList,
			() => {
				init();
			}
		);
		const init = () => {
			state.gameList = toRef(props, 'dataList');
		};
		const appointmentClick = (eid, classid, gameskey, index) => {
			if (!UID.value) {
				this.$store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			appointment({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: classid,
				status: 1,
			}).then((res) => {
				if (res.code === 0) {
					state.gameList[gameskey][index].is_appointment = true;
				}
			});
		};
		const errorTeamImg = (e) => (e.target.src = '/publicAssets/img/logo/iconSoccerGray.png');
		// 取消预约
		const delReserved = (eid, classid, gameskey, index) => {
			appointment({
				uid: Number(UID.value),
				eid: eid,
				liveclassid: classid,
				status: 2,
			}).then((res) => {
				if (res.code === 0) {
					state.gameList[gameskey][index].is_appointment = false;
				}
			});
		};
		const viewLive = (liveuid) => {
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		onMounted(() => {
			init();
		});
		return {
			state,
			router,
			init,
			isLogin,
			UID,
			appointmentClick,
			delReserved,
			errorPersonImg,
			errorTeamImg,
			viewLive,
		};
	},
};
</script>
<style lang="scss" scoped></style>
