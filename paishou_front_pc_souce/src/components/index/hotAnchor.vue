<template lang="pug">
.liveBottomWrap.my-4
	h3.my-4.text-psV3Red 
		img(src='/publicAssets/img/v3/icon-activity-red.png', srcset='/publicAssets/img/v3/icon-activity-red@2x.png 2x')
		span 推荐主播
	.CENTER_BETWEEN
		img.cursor-pointer(@click='prev', src='/publicAssets/img/v3/left-red.png', srcset='/publicAssets/img/v3/left-red@2x.png 2x')
		.hotAnchorContainer.flex.flex-grow.overflow-hidden
			.swiper-wrapper
				.swiper-slide(v-for='(item,index) in state.hotAnchour')
					.anchorItem.CENTER_C.py-4.cursor-pointer
						.anchorImg(@click='viewLive(item.uid, item.user_nicename)')
							img(:src='item.avatar',, @error='errorPersonImg')
						//- 等級圖片
						img.h-4.w-full.object-contain.my-2(v-if='item.islive===1', src='/publicAssets/img/v3/img-live-b.png', srcset='/publicAssets/img/v3/img-live-b@2x.png 2x')
						img.h-4.w-full.object-contain.my-2(v-else, :src='item.level_anchor_info?.thumb || ""')
						h4.anchorName.truncate.mb-2 {{ item.user_nicename }}
						.followBtn.px-2.text-white.rounded-full.bg-psV3Yellow.shadow.cursor-pointer(v-if='item.is_follow', @click='setFollow(item)')
							span.text-xs 已关注
						.unFollowBtn.px-2.text-psV3Red.rounded-full.bg-white.shadow.cursor-pointer(v-else, @click='setFollow(item)')
							img(src='/publicAssets/img/v3/icon-heart.png', srcset='/publicAssets/img/v3/icon-heart@2x.png 2x')
							span.text-xs 关注
		img.cursor-pointer(@click='next', src='/publicAssets/img/v3/right.png', srcset='/publicAssets/img/v3/right@2x.png 2x')
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swiper from 'swiper';
import { hotNanchour, setattent } from '@/api';
import { computed, onMounted, onUnmounted, watch, reactive, nextTick } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { matomo_index_hotAnchor } from '@/matomoEvent';
import { errorPersonImg } from '@/utils';

export default {
	components: {
		LeftOutlined,
		RightOutlined,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			swiper: null,
			hotAnchour: [],
		});
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		const init = () => {
			hotNanchour().then((res) => {
				state.hotAnchour = res.data.list;
			});
		};
		const viewLive = (liveuid, name) => {
			matomo_index_hotAnchor(name, liveuid);
			let routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		// 點擊關注按鈕
		const setFollow = (item) => {
			// Check login status
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			// Set attent
			setattent({
				uid: Number(UID.value),
				touid: Number(item.uid),
			}).then((res) => {
				// Update item follow state
				item.is_follow = res?.data?.isattent === 1;
			});
		};
		onMounted(() => {
			state.swiper = new Swiper('.hotAnchorContainer', {
				slidesPerView: 7,
				spaceBetween: 10,
			});
			init();
		});
		onUnmounted(() => {
			state.swiper.destroy();
			state.swiper = null;
		});
		watch(
			() => state.hotAnchour,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		return {
			store,
			UID,
			state,
			next,
			prev,
			viewLive,
			errorPersonImg,
			setFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.anchorItem {
	width: 100%;
	.anchorImg {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
