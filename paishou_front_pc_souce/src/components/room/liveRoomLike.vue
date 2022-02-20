<template lang="pug">
.w-full.rounded-xl.p-4.my-2(v-if='state.dataList.length>0')
	.CENTER_BETWEEN
		p.my-2.text-gray-500.font-black 
			span.text-psV3Orange.mr-1 {{state.dataList.length}}
			span 位主播正在直播本场赛事
	.grid.grid-cols-4.gap-4
		.col-span-1.bg-white.shadow.rounded(v-for='(item, index) in state.dataList', :key='index')
			.FLEX_R.items-center.p-2.cursor-pointer(@click='viewLive(item.uid)')
				img.AVATAR.w-8.h-8.mr-2(:src='item.avatar_thumb', @error='errorPersonImg')
				.FLEX_C.flex-grow.truncate
					h5.name {{item.user_nicename}}
					.text-xs.text-psV3Red 
						img.heat.w-3(src='/publicAssets/img/v3/icon-fire.png')
						span {{item.room_heat}}

</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import { liveRoomLike } from '@/api';
import { errorPersonImg } from '@/utils';

export default {
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			dataList: [],
		});
		const init = () => {
			liveRoomLike({
				uid: route.params.id,
			}).then((res) => {
				state.dataList = res.data.list.filter((task, index) => index < 8);
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
			route,
			router,
			state,
			init,
			errorPersonImg,
			viewLive,
		};
	},
};
</script>
<style lang="scss" scoped></style>
