<template lang="pug">
.w-full(v-if='!state.isEmpty')
	//- 標題
	index-header(icon='/publicAssets/img/index/icon-activity-red@3x.png', text='推荐主播', more, @click-more='onClickMore')

	//- 主播列表
	.w-full.flex.flex-row.overflow-x-auto.px-4.mt-2(:ontouchmove='onTouchMove')
		.relative.mr-2(v-for='item in state.hotAnchourList')
			van-button.anchor-button.rounded-md(@click='onClickAnchor(item)')
			.w-20.flex.flex-col.items-center.m-2
				//- 主播圖片
				img.w-20.h-20.rounded-full.object-cover(:src='item.avatar', @error='onAvatarImgError')

				//- 直播中圖片
				img.h-4.w-full.object-contain.mt-1(v-if='item.islive === 1', src='/publicAssets/img/index/img-live-b@3x.png')

				//- 等級圖片
				img.h-4.w-full.object-contain.mt-1(v-else, :src='item.level_anchor_info?.thumb || ""', @error='onLevelImgError')

				//- 主播名稱
				.anchor-name.text-xs.mt-1 {{ item.user_nicename }}

				//- 取消關注按鈕
				van-button.unfollow-button.rounded-full.shadow.mt-1(v-if='item.is_follow', :loading='item.isLoading', @click='onClickFollow(item)')
					.text-xs.font-normal.my-1 已关注
					template(#loading)
						.flex.flex-row.items-center.my-1
							van-loading.w-4.h-4(type='spinner', color='#ffffff')
							.text-xs.font-normal.ml-1 已关注

				//- 關注按鈕
				van-button.follow-button.rounded-full.shadow.mt-1(v-else, :loading='item.isLoading', @click='onClickFollow(item)')
					.flex.flex-row.items-center.m-1
						img.w-4.h-4(src='/publicAssets/img/index/icon-heart-red@3x.png')
						.text-xs.font-normal.ml-1 关注
					template(#loading)
						.flex.flex-row.items-center.m-1
							van-loading.w-4.h-4(type='spinner', color='#a62337')
							.text-xs.font-normal.ml-1 关注
</template>
<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { hotNanchour, setattent } from '@/api';
import { matomo_index_check_hotAnchor, matomo_index_hotAnchor_follow, matomo_index_hotAnchor_unfollow, matomo_index_hotAnchor_watch } from '@/matomoTrackEvent.js';
import indexHeader from '@/components/index/indexHeader.vue';

export default {
	components: {
		indexHeader,
	},
	setup() {
		// Vue store
		const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			isSearching: false,
			isEmpty: false,
			hotAnchourList: [],
		});

		// Uid
		const uid = computed(() => store?.state?.user?.uid || '');

		// On component mounter
		onMounted(() => {
			// Update searching state
			state.isSearching = true;

			// Get query
			const query = {
				pagesize: 12,
			};

			// Get hot anchor list
			hotNanchour(query).then(
				(res) => {
					// Update data state
					const hotAnchourList = res?.data?.list || [];
					state.hotAnchourList = hotAnchourList.slice(0, 12);
					state.isEmpty = state.hotAnchourList.length === 0;

					// Revert searching state on finished
					state.isSearching = false;
				},
				() => {
					// Revert searching state on error
					state.isSearching = false;
				}
			);
		});

		// 主播圖片讀取失敗
		const onAvatarImgError = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const onLevelImgError = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 觸碰移動
		const onTouchMove = (e) => {
			e.stopPropagation();
		};

		// 點擊更多箭頭
		const onClickMore = () => {
			router.push('hotanchor');
			matomo_index_check_hotAnchor();
		};

		// 點擊主播按鈕
		const onClickAnchor = (item) => {
			router.push(`/room/${item.uid}`);
			matomo_index_hotAnchor_watch(item.user_nicename, item.uid);
		};

		// 點擊關注按鈕
		const onClickFollow = (item) => {
			// Check login status
			if (!uid.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
				return;
			}

			// Update item loading state
			item.isLoading = true;

			// Previous follow state
			const isFollow = item.is_follow;

			// Set attent
			setattent({
				uid: Number(uid.value),
				touid: Number(item.uid),
			}).then(
				(res) => {
					// Update item follow state
					item.is_follow = res?.data?.isattent === 1;

					// Revert item loading state on finished
					item.isLoading = false;
				},
				() => {
					// Revert item loading state on error
					item.isLoading = false;
				}
			);

			// Matomo track
			if (isFollow) {
				matomo_index_hotAnchor_unfollow(item.user_nicename, item.uid);
			} else {
				matomo_index_hotAnchor_follow(item.user_nicename, item.uid);
			}
		};
		return {
			state,
			onAvatarImgError,
			onLevelImgError,
			onTouchMove,
			onClickMore,
			onClickAnchor,
			onClickFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.anchor-button {
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0;
	border: transparent;
	background: transparent;
}
.anchor-name {
	width: 100%;
	color: #191919;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
}
.unfollow-button {
	width: 80%;
	height: unset;
	padding: 0;
	color: #ffffff;
	border: transparent;
	background: #f2994a;
}
.follow-button {
	width: 80%;
	height: unset;
	padding: 0;
	color: #a62337;
	border: transparent;
	background: transparent;
}
</style>
