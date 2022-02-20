<template lang="pug">
.w-full
	h3.text-psV3Red 相关主播 
	.grid.grid-cols-7.gap-4
		.liverItem.cursor-pointer.col-span-1(v-for='(item, index) in state.liveList', :key='index')
			.anchorItem.CENTER_C.py-4.cursor-pointer.truncate.relative
				img.AVATAR.w-24.h-24(:src='item.avatar',, @error='errorPersonImg', @click='viewLive(item.uid)')
				//- 等級圖片
				img.h-4.w-full.object-contain.my-2(:src='item.level_anchor_info?.thumb || ""')
				h4.w-full.text-center.anchorName.truncate.mb-2 {{ item.user_nicename }}
				.followBtn.px-2.text-white.rounded-full.bg-psV3Yellow.shadow.cursor-pointer(v-if='item.follow', @click='setFollow(item, index)')
					span.text-xs 已关注
				.unFollowBtn.px-2.text-psV3Red.rounded-full.bg-white.shadow.cursor-pointer(v-else, @click='setFollow(item, index)')
					img(src='/publicAssets/img/v3/icon-heart.png', srcset='/publicAssets/img/v3/icon-heart@2x.png 2x')
					span.text-xs 关注
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed, watch, reactive, toRaw } from 'vue';
import { setattent } from '@/api';
import { errorPersonImg } from '@/utils';

export default {
	props: ['dataList'],
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			liveList: [],
			borderColor: ['#f759ab', '#36cfc9', '#9254de', '#faad14', '#ff4d4f', '#36cfc9'],
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
			state.liveList = toRaw(props.dataList);
		};
		const setFollow = (item, key) => {
			setattent({
				uid: Number(UID.value),
				touid: item.uid,
			}).then((res) => {
				if (res.data.isattent === 0) {
					state.liveList[key].follow = false;
				} else {
					state.liveList[key].follow = true;
				}
			});
		};
		const viewLive = (liveuid) => {
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		const errorTeamImg = (e) => (e.target.src = '/publicAssets/img/logo/iconSoccerGray.png');
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			router,
			init,
			isLogin,
			UID,
			setFollow,
			viewLive,
			errorTeamImg,
			errorPersonImg,
		};
	},
};
</script>
<style lang="scss" scoped></style>
