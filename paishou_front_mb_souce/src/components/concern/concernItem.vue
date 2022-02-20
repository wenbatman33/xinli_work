<template lang="pug">
//- 關注物件
.concern-item
	.relative.bg-white.rounded-md.shadow.my-2.mx-4
		//- 關注物件點擊按鈕
		van-button.item-button.rounded-md(@click='clickItem(item)')

		//- 關注物件內容
		.flex.flex-row.justify-between.items-center.px-4.py-2
			//- 左側內容
			.flex.flex-row.flex-shrink.items-center.overflow-hidden
				//- 主播頭像
				img.flex-shrink-0.w-14.h-14.object-cover.rounded-full.mr-4(:src='item.avatar', @error='errorAvatarImg')

				//- 主播資訊
				.max-w-full.flex.flex-col.flex-shrink.overflow-hidden
					.flex.flex-row.items-center
						//- 暱稱
						.name.flex-shrink.text-base.font-bold.break-all.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ item.user_nicename }}

						//- 等級
						img.flex-shrink-0.h-4.object-contain.ml-2(:src='item.level_anchor_info?.thumb || ""', @error='errorLevelImg')

					//- 簽名
					.signature.flex-shrink.text-sm.break-all.whitespace-nowrap.overflow-hidden.overflow-ellipsis.mt-1(v-if='item.signature') {{ item.signature }}

			//- 右側內容
			.flex.flex-row.flex-shrink-0.items-center
				//- LIVE
				img.h-4.object-scale-down.ml-2(v-if='item.islive === 1 || item.islive === true || item.is_live === 1 || item.is_live === true', src='/publicAssets/img/concern/icon-live@3x.png')

				//- 關注按鈕
				van-button.follow-button.rounded-full.shadow.ml-2(:loading='item.isLoading', @click='clickFollow(item)')
					img.w-6.h-6(v-if='item.is_follow', src='/publicAssets/img/concern/icon-followed@3x.png')
					img.w-6.h-6(v-else, src='/publicAssets/img/concern/icon-follow@3x.png')
					template(#loading)
						.followed-loading.w-6.h-6.rounded-full.flex.justify-center.items-center(v-if='item.is_follow')
							van-loading.w-4.h-4(color='#ffffff', type='spinner')
						.follow-loading.w-6.h-6.rounded-full.flex.justify-center.items-center(v-else)
							van-loading.w-4.h-4(color='#a62337', type='spinner')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { setattent } from '@/api';
import { matomo_search_watch, matomo_search_unfollow, matomo_search_follow, matomo_concern_follow, matomo_concern_unfollow, matomo_concern_watch, matomo_hotAnchor_follow, matomo_hotAnchor_unfollow, matomo_hotAnchor_watch } from '@/matomoTrackEvent.js';

export default {
	props: {
		path: String,
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// User id
		const uid = computed(() => store?.state?.user?.uid || '');

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 點擊主播物件
		const clickItem = (item) => {
			// Navigate room page
			router.push(`/room/${item?.uid}`);

			// Matomo track
			if (props.path === '/search') {
				matomo_search_watch(item?.user_nicename, item?.uid);
			} else if (props.path === '/concern') {
				matomo_concern_watch(item?.user_nicename, item?.uid);
			} else if (props.path === '/hotAnchor') {
				matomo_hotAnchor_watch(item?.user_nicename, item?.uid);
			}
		};

		// 點擊關注主播
		const clickFollow = (item) => {
			// Update loading state
			item.isLoading = true;

			// Previous follow state
			const isFollow = item.is_follow;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				touid: Number(item.uid),
			};

			// Set attent
			setattent(payload)
				.then((res) => {
					// Update follow state
					item.is_follow = res?.data?.isattent === 1;

					// Revert loading state on finished
					item.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					item.isLoading = false;
				});

			// Matomo track
			if (isFollow) {
				// Unfollow anchor event
				if (props.path === '/search') {
					matomo_search_unfollow(item?.user_nicename, item?.uid);
				} else if (props.path === '/concern') {
					matomo_concern_unfollow(item?.user_nicename, item?.uid);
				} else if (props.path === '/hotAnchor') {
					matomo_hotAnchor_unfollow(item?.user_nicename, item?.uid);
				}
			} else {
				// Follow anchor event
				if (props.path === '/search') {
					matomo_search_follow(item?.user_nicename, item?.uid);
				} else if (props.path === '/concern') {
					matomo_concern_follow(item?.user_nicename, item?.uid);
				} else if (props.path === '/hotAnchor') {
					matomo_hotAnchor_follow(item?.user_nicename, item?.uid);
				}
			}
		};
		return {
			errorAvatarImg,
			errorLevelImg,
			clickItem,
			clickFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.concern-item {
	width: 100%;
	.item-button {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 0;
		border: transparent;
		background-color: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
		}
	}
	.name {
		color: #323232;
	}
	.signature {
		color: #afafaf;
	}
	.follow-button {
		height: unset;
		padding: unset;
		border: transparent;
		background: transparent;
	}
	.follow-loading {
		background: #ffffff;
	}
	.followed-loading {
		background: #f8b62d;
	}
}
</style>