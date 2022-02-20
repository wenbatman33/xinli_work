<template lang="pug">
.liveList(v-if='state.rankList')
	.top3List.h-42.mt-8
		.grid.grid-cols-3.gap-4
			//- top2
			.col-span-1.top2.FLEX_C.justify-end.items-center.truncate
				//- rankType===0 主播模式 ------------------------------------------------------------------------------------------------------------
				.liveAvatar.relative(v-if='rankType===0')
					.w-16.h-16.rounded-full.overflow-hidden.shadow.cursor-pointer(@click='viewLive(state.rankList[1]?.uid)')
						img.w-full(v-if='state.rankList[1]?.avatar', :src='state.rankList[1]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-14.left-6.text-center.font-black 2
					.followBtn.w-5.h-5.absolute.top-5.left-14.rounded-full.shadow.cursor-pointer(@click='setFollow(1)')
						img.w-full(src='/publicAssets/img/v3/attention-button-off.png', v-if='state.rankList[1]?.is_follow == false')
						img.w-full(src='/publicAssets/img/v3/attention-button-on.png', v-if='state.rankList[1]?.is_follow == true')
				//-rankType===1 用戶模式--------------------------------------------------------------------------------------------------------------
				.userAvatar.relative(v-if='rankType===1')
					.w-16.h-16.rounded-full.overflow-hidden.shadow
						img.w-full(v-if='state.rankList[1]?.avatar', :src='state.rankList[1]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-14.left-6.text-center.font-black 2
				//- -------------------------------------------------------------------------------------------------------------------------
				.text-center.mt-4
					p
						img.w-8(v-if='rankType===0', :src='levelAnchorbyLevel(state.rankList[1]?.level_anchor_info?.level)')
						img.w-8(v-if='rankType===1', :src='userLevelThumb(state.rankList[1]?.level)')
					img.w-8(v-if='state.rankList[1]?.is_live', src='/publicAssets/img/v3/img-live-b.png')
					h5.truncate {{state.rankList[1]?.user_nicename || "-"}}
					.text-xs(:style='{"color":themeColor}')
						//- StarFilled.w-2.mr-2
						img.relative.left-0.w-3.mr-1(v-if='rankType===0 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-mic.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankType===1 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-money.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankChildID===1', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-star.svg')
						span {{state.rankList[1]?.contribution || "-"}}
			//- top1
			.col-span-1.top1.FLEX_C.pt-4.justify-end.items-center.truncate
				//- rankType===0 主播模式 ------------------------------------------------------------------------------------------------------------
				.liveAvatar.relative(v-if='rankType===0')
					.w-20.h-20.rounded-full.overflow-hidden.shadow.cursor-pointer(@click='viewLive(state.rankList[0]?.uid)')
						img.w-full(v-if='state.rankList[0]?.avatar', :src='state.rankList[0]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.followBtn.w-6.h-6.absolute.top-7.left-16.rounded-full.shadow.cursor-pointer(@click='setFollow(0)')
						img.w-full(src='/publicAssets/img/v3/attention-button-off.png', v-if='state.rankList[0]?.is_follow == false')
						img.w-full(src='/publicAssets/img/v3/attention-button-on.png', v-if='state.rankList[0]?.is_follow == true')
					.top_1.w-8.h-5.absolute.text-center(style='top:-8px;left:26px')
						img.w-8.h-5(src='/publicAssets/img/v3/icon-crown@3x.png')
				//- rankType===1 用戶模式---------------------------------------------------------------------------------------------------------------
				.userAvatar.relative(v-if='rankType===1')
					.w-20.h-20.rounded-full.overflow-hidden.shadow
						img.w-full(v-if='state.rankList[0]?.avatar', :src='state.rankList[0]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.top_1.w-8.h-5.absolute.text-center(style='top:-8px;left:26px')
						img.w-8.h-5(src='/publicAssets/img/v3/icon-crown@3x.png')
				//- -------------------------------------------------------------------------------------------------------------------------
				.text-center.mt-4
					p
						img.w-8(v-if='rankType===0', :src='levelAnchorbyLevel(state.rankList[0]?.level_anchor_info?.level)')
						img.w-8(v-if='rankType===1', :src='userLevelThumb(state.rankList[0]?.level)')
					img.w-8(v-if='state.rankList[0]?.is_live', src='/publicAssets/img/v3/img-live-b.png')
					h5.truncate {{state.rankList[0]?.user_nicename || "-"}}
					.text-xs(:style='{"color":themeColor}')
						//- StarFilled.w-2.mr-1
						img.relative.left-0.w-3.mr-1(v-if='rankType===0 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-mic.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankType===1 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-money.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankChildID===1', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-star.svg')
						span {{state.rankList[0]?.contribution || "-"}}
			//- top3
			.col-span-1.top3.FLEX_C.justify-end.items-center.truncate
				//- rankType===0 主播模式 ------------------------------------------------------------------------------------------------------------
				.liveAvatar.relative(v-if='rankType===0')
					.w-16.h-16.rounded-full.overflow-hidden.shadow.cursor-pointer(@click='viewLive(state.rankList[2]?.uid)')
						img.w-full(v-if='state.rankList[2]?.avatar', :src='state.rankList[2]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-14.left-6.text-center.font-black 3
					.followBtn.w-5.h-5.absolute.top-5.left-14.rounded-full.shadow.cursor-pointer(@click='setFollow(2)')
						img.w-full(src='/publicAssets/img/v3/attention-button-off.png', v-if='state.rankList[2]?.is_follow == false')
						img.w-full(src='/publicAssets/img/v3/attention-button-on.png', v-if='state.rankList[2]?.is_follow == true')
				//- rankType===1 用戶模式-------------------------------------------------------------------------------------------------------------
				.userAvatar.relative(v-if='rankType===1')
					.w-16.h-16.rounded-full.overflow-hidden.shadow
						img.w-full(v-if='state.rankList[2]?.avatar', :src='state.rankList[2]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-14.left-6.text-center.font-black 3
				//- -------------------------------------------------------------------------------------------------------------------------
				.text-center.mt-4
					p
						img.w-8(v-if='rankType===0', :src='levelAnchorbyLevel(state.rankList[2]?.level_anchor_info?.level)')
						img.w-8(v-if='rankType===1', :src='userLevelThumb(state.rankList[2]?.level)')
					img.w-8(v-if='state.rankList[2]?.is_live', src='/publicAssets/img/v3/img-live-b.png')
					h5.truncate {{state.rankList[2]?.user_nicename || "-"}}
					.text-xs(:style='{"color":themeColor}')
						//- StarFilled.w-2.mr-1
						img.relative.left-0.w-3.mr-1(v-if='rankType===0 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-mic.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankType===1 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-money.svg')
						img.relative.left-0.w-3.mr-1(v-if='rankChildID===1', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-star.svg')
						span {{state.rankList[2]?.contribution || "-"}}

	.top10
		.my-4.rounded.shadow(v-for='(dtatItem , dataIndex) in 7')
			.FLEX_R.items-center.p-4
				.avatar.relative.mr-4.cursor-pointer(v-if='rankType===0', @click='viewLive(rankListtOther[dataIndex]?.uid)')
					.w-9.h-9.rounded-full.overflow-hidden.shadow
						img.w-full(v-if='rankListtOther[dataIndex]?.avatar', :src='rankListtOther[dataIndex]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-0.left-6.text-center.font-black {{dataIndex+4}}

				//- rankType===1 用戶模式-------------------------------------------------------------------------------------------------------------
				.avatar.relative.mr-4(v-if='rankType===1')
					.w-9.h-9.rounded-full.overflow-hidden.shadow
						img.w-full(v-if='rankListtOther[dataIndex]?.avatar', :src='rankListtOther[dataIndex]?.avatar' , @error='errorPersonImg')
						img.w-full(v-else, src='/publicAssets/img/v3/img-default-avatar.png', srcset='/publicAssets/img/v3/img-default-avatar@2x.png 2x')
					.ranking.w-5.h-5.rounded-full.bg-white.shadow-lg.absolute.top-0.left-6.text-center.font-black {{dataIndex+4}}

				.FLEX_R.flex-grow.items-center
					.icon
						img.w-6.mr-2(v-if='rankType===0', :src='levelAnchorbyLevel(rankListtOther[dataIndex]?.level_anchor_info?.level)')
						img.w-6.mr-2(v-if='rankType===1', :src='userLevelThumb(rankListtOther[dataIndex]?.level)')
					.flex-grow.truncate
						h5.truncate {{ rankListtOther[dataIndex]?.user_nicename || "-"}}
					.live.w-8
						img(v-if='rankListtOther[dataIndex]?.is_live' src='/publicAssets/img/v3/img-live-b.png')
				.text-xs.px-4(:style='{"color":themeColor}')
					//- StarFilled.w-2.mr-2
					img.relative.left-0.w-3.mr-1(v-if='rankType===0 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-mic.svg')
					img.relative.left-0.w-3.mr-1(v-if='rankType===1 && rankChildID===0', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-money.svg')
					img.relative.left-0.w-3.mr-1(v-if='rankChildID===1', :style='`filter: drop-shadow(1000px 0 0 ${themeColor}); transform: translate(-1000px);`', src='/publicAssets/img/v3/icon-star.svg')
					span {{rankListtOther[dataIndex]?.contribution || "-"}}

				.followBtn.rounded-full.shadow.cursor-pointer(v-if='rankType===0', @click='setFollow(dataIndex+3)')
					img.w-full(src='/publicAssets/img/v3/attention-button-off.png', v-if='rankListtOther[dataIndex]?.is_follow == false')
					img.w-full(src='/publicAssets/img/v3/attention-button-on.png', v-if='rankListtOther[dataIndex]?.is_follow == true')

</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { computed, reactive, toRaw, watch } from 'vue';
import { StarFilled } from '@ant-design/icons-vue';
import { setattent } from '@/api';
import { matomo_rank_view_live, matomo_rank_follow, matomo_rank_unfollow } from '@/matomoEvent';
import { errorPersonImg, userLevelThumb } from '@/utils';

export default {
	components: {
		StarFilled,
	},
	// rankType 0為主播 1為用戶
	props: ['dataList', 'themeColor', 'rankType', 'rankChildID'],
	setup(props) {
		// ---------------------------
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const LEVEL_LIST = computed(() => store.state.config.levelList);
		const LEVEL_ANCHOR = computed(() => store.state.config.levelanchor);
		const UID = computed(() => store.state.user.uid || '');
		const rankListtOther = computed(() => state.rankList.filter((task, index) => index >= 3) || []);
		const levelAnchorbyLevel = (level) => LEVEL_ANCHOR.value.filter((item, index) => item.levelid === level)[0]?.thumb;
		// const  = (level) => LEVEL_LIST.value.filter((item, index) => item.levelid === level)[0]?.thumb;

		const state = reactive({
			rankList: null,
		});

		const init = () => {
			state.rankList = toRaw(props.dataList);
		};
		const setFollow = (index) => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			setattent({
				uid: Number(UID.value),
				touid: Number(state.rankList[index].uid),
			}).then((res) => {
				if (res.data.isattent === 1) {
					matomo_rank_follow(state.rankList[index].uid);
					state.rankList[index].is_follow = true;
				} else {
					matomo_rank_unfollow(state.rankList[index].uid);
					state.rankList[index].is_follow = false;
				}
			});
		};

		const viewLive = (liveuid) => {
			matomo_rank_view_live(liveuid);
			if (props.rankType === 0) {
				const routeUrl = router.resolve(`/room/${liveuid}`);
				window.open(routeUrl.href, '_blank');
			}
		};
		watch(
			() => props.dataList,
			() => {
				init();
			}
		);
		return {
			store,
			UID,
			LEVEL_LIST,
			LEVEL_ANCHOR,
			state,
			route,
			router,
			init,
			rankListtOther,
			errorPersonImg,
			setFollow,
			viewLive,
			levelAnchorbyLevel,
			userLevelThumb,
		};
	},
};
</script>
<style lang="scss" scoped></style>
