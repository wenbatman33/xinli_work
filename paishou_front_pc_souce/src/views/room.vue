<template lang="pug">
#room.BETWEEN.h-screen.relative.overflow-hidden
	overLayerForRoom
	.roomMenu.h-screen.bg-white.shadow.flex-shrink-0(:style='`${state.roomMenuOpen?"width:240px":"width:88px"};z-index:500;`')  
		roomMenu(:roomMenuOpen='state.roomMenuOpen', @switch='roomMenuOpenSwitch')

	#roomContent.FLEX_C.flex-grow.overflow-y-scroll
		liveRoomLike
		.live.px-4.rounded.FLEX_C.relative
			.shadow.rounded.bg-white
				.onLive(v-if='state.liveInfo')
					.liveInfo.w-full.p-4(v-if='state.liveInfo')
						liveInfo(v-if='state.roomInfo', :liveInfo='state.liveInfo', :anchorInfo='state.anchorInfo', :roomInfo='state.roomInfo', :isattent='state.isattent')
						a-divider.my-2
						.FLEX_R.justify-between.items-center(v-if='ONLIVE===true')
							span
								span.mr-4(v-if='state.selectStreamQuality')
									span.text-xs.text-gray-500 线路設定：
									a-radio-group.text-xs(v-model:value='state.videoValue_1', @change='changeStream', size='small')
										a-radio-button(:value='"line_1"') 线路1
										a-radio-button(:value='"line_2"') 线路2
										a-radio-button(:value='"line_3"') 线路3
								span.mr-4(v-if='state.selectStreamQuality')
									span.text-xs.text-gray-500 画质設定：
									a-radio-group.text-xs(v-model:value='state.videoValue_2', @change='changeStream', size='small')
										a-radio-button(:value='"hd"') 清晰
										a-radio-button(:value='"p720"') 标准
										a-radio-button(:value='"p480"') 流畅
							.flex
								.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='shraeWeiboHandle')
									img(src='/publicAssets/img/v3/button-icon-weibo.png' , srcset='/publicAssets/img/v3/button-icon-weibo@2x.png 2x')
								.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='shraeQQHandle')
									img(src='/publicAssets/img/v3/button-icon-qq.png' , srcset='/publicAssets/img/v3/button-icon-qq@2x.png 2x')
								.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='copyUrl')
									img(src='/publicAssets/img/v3/button-icon-link.png' , srcset='/publicAssets/img/v3/button-icon-link@2x.png 2x')
			
			.videoContainer.bg-black.w-full(v-if='ONLIVE===true && state.liveInfo', style='min-height:500px')
				psPlayer(:videoDataSrc='state.currentVideoSrc', :videoDataThumb='state.videoDataThumb')
				psBarrage(v-if='state.showBarrage')
				psGiftViewer(v-if='state.showGiftAnimation')
			.offLive.bg-black.p-8(v-if='ONLIVE===false && OFF_LIVE_VIDEOS', style='min-height:500px')
				h4.text-white 节目已结束
				p.text-white 当前节目已结束，造成不便敬请见谅。
				.grid.grid-cols-12.gap-8
					.col-span-4(v-for='(item, index) in OFF_LIVE_VIDEOS', :key='index')
						offLiveItem(:videoData='item')
			.liveGift.bg-white.p-2.my-2(v-if='ONLIVE===true')
				.coinBtn_h.w-full.CENTER.bg-gray-100.rounded.p-2.my-2.cursor-pointer(v-if='COIN', @click='showRecharge')
					.text-xs.text-psV3Orange
						span.mr-1.mt-1 您的蕉币
					.text-xs.text-gray-600 {{commaFormat(COIN)}}
					.bg-psV3Yellow.text-white.text-xs.rounded.p-1.mx-1 充值

				.CENTER_BETWEEN.items-center
					.flex
						.FLEX_R.mr-2
							a-popover(placement='topLeft' , @visibleChange='handleHoverChange')
								button.bg-psV3Yellow.p-2.text-white.rounded 
									img.w-3.h-3.mr-1(src='/publicAssets/img/v3/icon-daily-task-big-b.png')
									span 我的任务
								template(v-slot:content)
									.h-80.overflow-y-auto.bg-white
										allTasksList
						.coinBtn.FLEX_R.items-center.cursor-pointer(@click='showRecharge') 
							.userCoin.bg-gray-100.rounded.FLEX_R.items-center.p-4.mr-2(v-if='COIN')
								.FLEX_C
									.text-xs.text-psV3Orange
										span.mr-1.mt-1 您的蕉币
									.text-xs.text-gray-600 {{commaFormat(COIN)}}
								.bg-psV3Yellow.text-white.text-xs.rounded.p-1.ml-1 充值
					giftList
			guessListForRoom(v-if='state?.liveuid', :liveId='Number(state?.liveuid)')
			campaign
			roomAppointment(:liveclassid='state.liveclassid')
			hotLive

	.roomChat.flex.h-screen.flex-shrink-0(style='width:330px')
		.shadow.w-full.h-screen.bg-white.rounded.FLEX_C
			liveNotice
			//- kanBanList(v-if='state.kanBanList', :dataList='state.kanBanList')
			topList
			liveChat(:showBarrage='state.showBarrage',:showGiftAnimation='state.showGiftAnimation', @switchBarrage='showBarrageHandle', @switchGiftAnimation='showGiftAnimationHandle')
	jigsawFloat
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { enterRoom, roomShare } from '@/api';
import roomMenu from '@/components/room/roomMenu.vue';
import liveInfo from '@/components/room/liveInfo.vue';
import liveNotice from '@/components/room/liveNotice.vue';
import liveChat from '@/components/room/liveChat.vue';
import kanBanList from '@/components/room/kanBanList.vue';
import topList from '@/components/room/topList.vue';
import recommend from '@/components/room/recommend.vue';
import roomAppointment from '@/components/room/roomAppointment.vue';
import countNumber from '@/components/room/countNumber.vue';
// ----------------------------------------------------------------
import psPlayer from '@/components/psPlayer';
// ----------------------------------------------------------------
import psBarrage from '@/components/psBarrage';
import psGiftViewer from '@/components/psGiftViewer';
import giftList from '@/components/psGiftViewer/giftList.vue';
import backpackList from '@/components/backpackList/backpackList.vue';
// ----------------------------------------------------------------
import psBackpackList from '@/components/psBackpackList';
// ----------------------------------------------------------------
import offLiveItem from '@/components/videoItem/offLiveItem.vue';
// ----------------------------------------------------------------
import campaign from '@/components/campaign';
import hotLive from '@/components/room/hotLive.vue';
// ----------------------------------------------------------------
import jigsawFloat from '@/components/room/jigsawFloat.vue';
import liveRoomLike from '@/components/room/liveRoomLike.vue';
// ----------------------------------------------------------------
import allTasksList from '@/components/tasks/allTasksList';
import guessListForRoom from '@/components/guess/guessListForRoom';
// ----------------------------------------------------------------
import overLayerForRoom from '@/components/overLayerBanner/overLayerForRoom';
// ----------------------------------------------------------------
import { message } from 'ant-design-vue';
import { copyText } from 'vue3-clipboard';
import { matomo_liveRoom_tasks } from '@/matomoEvent';
import { commaFormat, shraeToQQ, shraeToWeibo } from '@/utils';

export default {
	components: {
		roomMenu,
		liveInfo,
		liveNotice,
		liveChat,
		kanBanList,
		recommend,
		roomAppointment,
		countNumber,
		// -------------
		psPlayer,
		// -------------
		psBarrage,
		psGiftViewer,
		giftList,
		topList,
		backpackList,
		psBackpackList,
		offLiveItem,
		campaign,
		hotLive,
		allTasksList,
		guessListForRoom,
		jigsawFloat,
		liveRoomLike,
		overLayerForRoom,
	},
	setup() {
		// ----------------------------------------------------------------
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		// ----------------------------------------------------------------
		const state = reactive({
			roomMenuOpen: true,
			liveuid: null,
			showClassList: false,
			showBarrage: true,
			showBackpack: false,
			showGiftAnimation: true,
			roomInfo: null,
			anchorInfo: {},
			liveInfo: null,
			videoSrc_pull: '',
			videoSrc_m3u8: '',
			videoSrc_flv: '',
			videoSrc_rtmp: '',
			videoDataThumb: '',
			currentNum: 0,
			isattent: 0,
			kanBanList: null,
			liveclassid: null,
			offLiveList: null,
			// ----------------------------------------------------------------
			selectStreamQuality: true,
			videoList: {},
			videoValue_1: 'line_1',
			videoValue_2: 'hd',
			currentVideoSrc: '',
			// ----------------------------------------------------------------
			offsetTop: 0,
			floatBarPaddingBottom: 0,
			// ----------------------------------------------------------------
			openBackpack: false,
		});
		// ----------------------------------------------------------------
		const UID = computed(() => store.state.user.uid || '');
		const CURRENTURL = computed(() => window.location.href);
		const ONLIVE = computed(() => store.state.socket.onLive);
		const TOKEN = computed(() => store.state.user.token || '');
		const COIN = computed(() => store?.state?.user?.userInfo?.coin);
		const SOCKET = computed(() => store.state.socket.SOCKET || '');
		const MSG_LIST = computed(() => store.state.socket.msgList || '');
		const SHOW_LIVE_SWITCH = computed(() => store.state.user.showLiveSwitch || 0);
		const OFF_LIVE_VIDEOS = computed(() => store.state.socket.offLiveVideos);
		const ROOM_MEMBER_LIST = computed(() => store.state.socket.roomMemberList || '');
		// ----------------------------------------------------------------
		const roomMenuOpenSwitch = () => (state.roomMenuOpen = !state.roomMenuOpen);
		const showBackpack = () => (state.openBackpack = !state.openBackpack);
		const showBarrageHandle = (value) => (state.showBarrage = value);
		const showGiftAnimationHandle = (value) => (state.showGiftAnimation = value);
		const showRecharge = () => store.commit('user/SHOW_RECHARGE_MODEL');
		// ----------------------------------------------------------------
		const changeStream = () => {
			const { videoValue_1, videoValue_2 } = state;
			state.currentVideoSrc = state.videoList[videoValue_1][videoValue_2];
		};
		const enterRoomHandle = () => {
			const payload = { liveuid: route.params.id };
			enterRoom(payload)
				.then((res) => {
					//  room_code 關播代碼
					if (res.data.live.room_code === 1041) {
						store.dispatch('socket/SET_OFF_LIVE');
					}
					state.roomInfo = res.data;
					state.anchorInfo = res.data.anchor;
					state.liveInfo = res.data.live;
					state.liveclassid = res.data.live.liveclassid;
					state.isattent = res.data.isattent;
					// ----------------------------------------------------------------
					state.videoSrc_pull = res.data.live.pull;
					state.videoSrc_m3u8 = res.data.live.pull_m3u8;
					state.videoSrc_flv = res.data.live.pull_flv;
					// ----------------------------------------------------------------
					if (res.data.is_video === 1) {
						// 非直播類影片
						state.selectStreamQuality = false;
						state.videoList = {
							line_1: {
								hd: res.data?.live?.pull,
							},
						};
						changeStream();
					} else {
						if (res.data?.resource.length > 1) {
							state.videoList = {
								line_1: {
									hd: res.data?.resource[0]?.pull?.flv,
									p720: res.data?.resource[0]?.p720?.flv,
									p480: res.data?.resource[0]?.p480?.flv,
								},
								line_2: {
									hd: res.data?.resource[1]?.pull?.flv,
									p720: res.data?.resource[1]?.p720?.flv,
									p480: res.data?.resource[1]?.p480?.flv,
								},
								line_3: {
									hd: res.data?.resource[0]?.pull?.pull,
									p720: res.data?.resource[0]?.p720?.pull,
									p480: res.data?.resource[0]?.p480?.pull,
								},
							};
						} else {
							state.videoList = {
								line_1: {
									hd: res.data?.resource[0]?.pull?.flv,
									p720: res.data?.resource[0]?.p720?.flv,
									p480: res.data?.resource[0]?.p480?.flv,
								},
								line_2: {
									hd: res.data?.resource[0]?.pull?.pull,
									p720: res.data?.resource[0]?.p720?.pull,
									p480: res.data?.resource[0]?.p480?.pull,
								},
								line_3: {
									hd: res.data?.resource[0]?.pull?.m3u8,
									p720: res.data?.resource[0]?.p720?.m3u8,
									p480: res.data?.resource[0]?.p480?.m3u8,
								},
							};
						}
						state.selectStreamQuality = true;
						changeStream();
					}
					// ----------------------------------------------------------------
					// 更換title
					document.title = state.liveInfo.title + ' - 拍手直播 最专业的体育直播平台- Paishou Live ';
					// ----------------------------------------------------------------
					state.videoDataThumb = res.data.live.thumb;
					state.kanBanList = res.data.banner;
					// ----------------------------------------------------------------
					const payload = {
						roomnum: route.params.id,
						chatServer: res.data.chat_server,
						stream: res.data.live.stream,
						uid: Number(UID.value),
						token: TOKEN.value || undefined,
					};
					const roomPayload = {
						donate_total: res.data.live.donate_total || 0,
						room_heat: res.data.live.room_heat || 0,
					};
					store.commit('socket/SET_ROOM_DATA', roomPayload);
					store.dispatch('socket/CONNECT_SCOKET', payload, { root: true });
					// ----------------------------------------------------------------
				})
				.catch((err) => {
					if (err.code === 1041) {
						store.dispatch('socket/SET_OFF_LIVE');
					} else if (err.code === 1040) {
						// 被踢出房間後 導回首頁
						router.push({
							path: '/',
						});
					} else if (err.code === 1039) {
						// 被踢出房間後 導回首頁
						router.push({
							path: '/',
						});
					}
				});
		};

		// ----------------------------------------------------------------
		const shraeQQHandle = () => {
			const roomData = toRaw(state.liveInfo);
			shraeToQQ(window.location.href, roomData.title, roomData.thumb);
			roomShare({ room: Number(route.params.id) });
		};
		const shraeWeiboHandle = () => {
			const roomData = toRaw(state.liveInfo);
			shraeToWeibo(window.location.href, roomData.title, roomData.thumb);
			roomShare({ room: Number(route.params.id) });
		};
		const copyUrl = () => {
			const URL = window.location.href;
			copyText(URL, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};

		const handleHoverChange = (isShow) => {
			if (isShow) matomo_liveRoom_tasks();
		};
		onMounted(() => {
			// 載入歷史訊息後 再取得房間資訊
			state.liveuid = route.params.id;
			const payload = { liveuid: route.params.id };
			store
				.dispatch('socket/GET_CHAT_RECORD', payload, { root: true })
				.then((res) => {
					enterRoomHandle();
				})
				.catch((err) => {
					enterRoomHandle();
				});

			const param = {
				uid: UID.value || '',
				token: TOKEN.value || '',
			};
		});
		onUnmounted(() => {
			store.commit('socket/RESET_ROOM_DATA');
			store.commit('socket/DISCONNECT');
			document.title = '拍手直播';
		});
		// ----------------------------------------------------------------
		return {
			state,
			UID,
			TOKEN,
			COIN,
			commaFormat,
			SOCKET,
			MSG_LIST,
			ONLIVE,
			OFF_LIVE_VIDEOS,
			SHOW_LIVE_SWITCH,
			enterRoomHandle,
			changeStream,
			ROOM_MEMBER_LIST,
			showBarrageHandle,
			showGiftAnimationHandle,
			showBackpack,
			shraeQQHandle,
			shraeWeiboHandle,
			copyUrl,
			CURRENTURL,
			showRecharge,
			roomMenuOpenSwitch,
			handleHoverChange,
		};
	},
};
</script>
<style lang="scss">
#roomContent::-webkit-scrollbar {
	display: none !important;
}

#roomContent {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.coinBtn {
	@media (min-width: 1200px) {
		display: flex;
	}
	@media (max-width: 1201px) {
		display: none;
	}
}

.coinBtn_h {
	@media (min-width: 1200px) {
		display: none;
	}
	@media (max-width: 1201px) {
		display: flex;
	}
}
</style>
