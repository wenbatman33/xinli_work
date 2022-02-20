<template lang="pug">
.FLEX_C
	.FLEX_R.items-center
		img.AVATAR.w-16.h-16.mr-4.flex-shrink-0(:src='anchorInfo.avatar', @error='errorPersonImg')
		.info.FLEX_C.flex-grow.justify-center
			.liveInfoTop.BETWEEN(v-if='liveInfo?.title')
				.title.FLEX_R.flex-grow
					.flex.flex-shrink-0.w-5.h-5.mr-2.mt-1
						img.w-full(v-if='classListThumb(liveInfo.liveclassid)', :src='classListThumb(liveInfo.liveclassid)')
					.flex.flex-grow
						.title.overflow-hidden.font-bold.text-lg.line-clamp-2 {{ liveInfo?.title }}
			.room_info.FLEX_R.justify-between
				.FLEX_R.flex-grow.items-center
					span.level.mr-2(v-if='levelAnchorThumb')
						img.w-7(:src='levelAnchorThumb')
					span.text-xs.text-gray-500.mr-1 主播
					span.text-xs.text-gray-500.mr-2 {{ anchorInfo.user_nicename }}
					span.text-xs.text-psV3Orange.mr-2  房间号 {{ anchorInfo.id }} 
					span.text-xs.mr-2 
						img.heat.w-3(src='/publicAssets/img/v3/icon-fire.png')
					span.text-xs.text-psV3RedLight.mr-2 {{room_heat}}
					span.text-xs.mr-2
						img.coin.w-3(src='/publicAssets/img/v3/coin.png')
					countNumber.text-psV3Yellow.mr-2(:endNumber='donate_total')
		.flex.flex-shrink-0
			.inline-block.text-centerfolloBtn.rounded.shadow.cursor-pointer.py-1.px-2(v-if='state.isattent == 0', @click='setFollow')
				img.mr-2(src='/publicAssets/img/v3/icon-heart.png')
				span.text-psV3Red 关注
			.inline-block.text-center.unfolloBtn.bg-psV3Yellow.rounded.shadow.cursor-pointer.py-1.px-2(v-if='state.isattent == 1', @click='setFollow')
				img.mr-2(src='/publicAssets/img/v3/icon-heart-solid.png')
				span.text-white 已关注 | {{state.fans}}
</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import countNumber from '@/components/room/countNumber.vue';
import { setattent } from '@/api';
import { matomo_liveRoom_follow, matomo_liveRoom_unfollow } from '@/matomoEvent';
import { errorPersonImg, shraeToQQ, shraeToWeibo } from '@/utils';

export default {
	components: {
		countNumber,
	},
	props: ['liveInfo', 'anchorInfo', 'roomInfo', 'isattent'],
	setup(props) {
		// ---------------------------
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		// ---------------------------
		const state = reactive({
			isattent: 0,
			fans: 0,
		});
		// ---------------------------
		const classList = computed(() => store.state.config.classList);
		const classListThumb = (level) => {
			return classList.value.filter((item) => item.id === level)[0]?.thumb;
		};
		const levelList = computed(() => store.state.config.levelList);
		const userInfo = computed(() => store.state.user.userInfo);
		const NICE_NAME = computed(() => store.state.user.userInfo.user_nicename);
		const room_heat = computed(() => {
			return store.state.socket.roomData.room_heat > 9999 ? (store.state.socket.roomData.room_heat / 10000).toFixed(1) + '万' : store.state.socket.roomData.room_heat;
		});
		const donate_total = computed(() => store.state.socket.roomData.donate_total);
		const UID = computed(() => store.state.user.uid || '');
		const TOKEN = computed(() => store.state.user.token || '');

		// 主播等級圖片網址
		const levelAnchorThumb = computed(() => {
			const levelAnchor = props?.anchorInfo?.level_anchor || 1;
			const levelAnchorList = store?.state?.config?.levelanchor || [];
			return levelAnchorList.find((element) => element.levelid === levelAnchor)?.thumb || '';
		});
		// -------------------------------------------------------------------------------------------
		const reportConfirm = () => {};
		const shraeQQHandle = () => {
			const roomData = toRaw(props.liveInfo);
			// localhost 會顯示不出來是正常的
			shraeToQQ(window.location.href, roomData.title, roomData.thumb);
		};
		const shraeWeiboHandle = () => {
			const roomData = toRaw(props.liveInfo);
			shraeToWeibo(window.location.href, roomData.title, roomData.thumb);
		};
		// -------------------------------------------------------------------------------------------
		const setFollow = () => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
				return;
			}
			if (state.isattent === 0) {
				store.commit('socket/SET_ATTENT', { toname: NICE_NAME.value });
				matomo_liveRoom_follow(NICE_NAME.value, Number(props.liveInfo.uid || route.params.id));
			} else {
				matomo_liveRoom_unfollow(NICE_NAME.value, Number(props.liveInfo.uid || route.params.id));
			}

			setattent({
				uid: Number(UID.value),
				touid: Number(props.liveInfo.uid || route.params.id),
			}).then((res) => {
				state.isattent = res.data.isattent;
				if (res.data.isattent === 1) {
					state.fans += 1;
				} else {
					state.fans -= 1;
				}
			});
		};
		onMounted(() => {
			state.isattent = props.isattent;
			state.fans = props.roomInfo.fans;
		});
		// ---------------------------
		return {
			state,
			route,
			router,
			UID,
			TOKEN,
			classList,
			classListThumb,
			levelList,
			userInfo,
			levelAnchorThumb,
			setFollow,
			reportConfirm,
			shraeQQHandle,
			shraeWeiboHandle,
			errorPersonImg,
			room_heat,
			donate_total,
		};
	},
};
</script>
<style lang="scss" scoped></style>
