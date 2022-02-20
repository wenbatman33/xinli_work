<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
	.w-full
		nowLive(v-if='state.liveInfo  && state.liveInfo.push!=="" && state.liveInfo.stream!==""', :dataList='state.liveInfo', @init='init')
		createRoom(v-if='state.liveInfo && state.liveInfo.push==="" && state.liveInfo.stream===""', @init='init')
</template>
<script>
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { checkLive } from '@/api';
import nowLive from '@/components/personal/liveConfig/nowLive';
import createRoom from '@/components/personal/liveConfig/createRoom';
import menuList from '@/components/personal/menuList.vue';

export default {
	components: {
		nowLive,
		createRoom,
		menuList,
	},
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			liveclassid: 1,
			activeTab: 1,
			liveInfo: null,
			scheduleList: [],
		});

		const init = () => {
			checkLive().then((res) => {
				state.liveInfo = res.data;
				state.liveInfo.pushFile = res.data.push.split(res.data.stream)[0];
				state.liveInfo.obsPass = res.data.stream + '' + res.data.push.split(res.data.stream)[1];
				state.liveInfo.stream = res.data.stream;
				state.liveInfo.roomUrl = `${window.location.protocol}//${window.location.hostname}/room/${Number(UID.value)}`;
			});
		};

		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			UID,
		};
	},
};
</script>
<style lang="scss" scoped></style>
