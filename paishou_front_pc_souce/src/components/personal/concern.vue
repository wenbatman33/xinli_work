<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(index)' ) {{item.title}}
	.concern.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.FLEX_R.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
					.px-2.cursor-pointer(@click='tabChange(index)' )
						.font-black.mr-1 {{item.title}}

		a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

		.grid.grid-cols-2.gap-4.my-4(v-if='state?.dataList.length>=1')
			.col-span-1.bg-white.shadow.rounded-lg(v-for='(item, index) in state.dataList', :key='index')
				.liveItem.CENTER_BETWEEN.py-2.px-4.cursor-pointer
					img.AVATAR.w-12.h-12(:src='item.avatar', @error='errorPersonImg', @click='viewLive(item.uid)')
					.flex-col.flex-grow.px-4.truncate(@click='viewLive(item.uid)')
						h5.nicename {{item.user_nicename}}
						.signature.text-xs {{item.signature}}
					.onLive.text-white.px-2.mx-2(v-if='item.is_live===1', @click='viewLive(item.uid)')
						img.h-4.w-full.object-contain.my-2(src='/publicAssets/img/v3/img-live-b.png', srcset='/publicAssets/img/v3/img-live-b@2x.png 2x')
					.btns
						.followBtn.w-10.h-10.CENTER.bg-psV3Yellow.rounded-full.cursor-pointer(v-if='item.follow==true', @click='setFollow(item, index)')
							img.w-3(src='/publicAssets/img/v3/icon-heart-solid.png')
						.unFollowBtn.w-10.h-10.CENTER.cursor-pointer.rounded-full.shadow(v-else, @click='setFollow(item, index)')
							img.w-3(src='/publicAssets/img/v3/icon-heart.png')

		.w-full.min-h-screen.CENTER.flex-col(v-if='state?.dataList.length<=0')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-lg.text-gray-500.my-2 抱歉！目前暂无关注！
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { followsList, followsListV2, setattent } from '@/api';
import videoItem from '@/components/videoItem';
import { matomo_concern_unfollow, matomo_concern_follow } from '@/matomoEvent';
import menuList from '@/components/personal/menuList.vue';
import { errorPersonImg } from '@/utils';

export default {
	components: {
		videoItem,
		menuList,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '全部', value: 0 },
				{ title: '直播中', value: 1 },
			],
			loading: false,
			dataList: [],
			liveDataList: null,
			returnList: [],
			page: 1,
			pagesize: 9999,
		});
		const init = () => {
			state.loading = true;
			followsListV2({
				uid: Number(UID.value),
				page: state.page,
				pagesize: state.pagesize,
			}).then((res) => {
				state.loading = false;
				// 全部
				const allDataLiat = res?.data?.list;
				state.dataList = res?.data?.list;
				allDataLiat?.forEach((item) => {
					item.follow = true;
				});
				// 直播中
				const isLiveArray = state?.dataList?.filter((item) => item?.is_live) || [];
				isLiveArray?.forEach((item) => {
					item.follow = true;
				});
				state.returnList[0] = allDataLiat;
				state.returnList[1] = isLiveArray;
				tabChange();
			});
		};
		const setFollow = (item, index) => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			item?.follow === true ? matomo_concern_unfollow(item.user_nicename, item.uid) : matomo_concern_follow(item.user_nicename, item.uid);
			setattent({
				uid: Number(UID.value),
				touid: item.uid,
			}).then((res) => {
				state.returnList[state.tabID][index].follow = !state.returnList[state.tabID][index].follow;
			});
		};
		const viewLive = (id) => {
			const routeUrl = `/room/${id}`;
			window.open(routeUrl, '_blank');
		};
		const tabChange = (val = 0) => {
			state.tabID = val;
			state.dataList = state?.returnList[val] || [];
		};
		onMounted(() => {
			if (!UID.value) {
				router.push('/');
			} else {
				init();
			}
		});
		return {
			router,
			state,
			init,
			viewLive,
			setFollow,
			errorPersonImg,
			tabChange,
		};
	},
};
</script>
<style lang="scss" scoped></style>
