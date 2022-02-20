<template lang="pug">
.liveChat.w-ful.FLEX_C.flex-grow.overflow-hidden.overflow-y-auto.relative
	//- 禮物combo 要先拿掉 阿孟說的 所以我先隱藏起來
	//- #comboRank.w-full.h-full.absolute.z-20.overflow-hidden.pointer-events-none
	//- 	comboRankList
	#messageList.bg-white.overflow-y-auto.relative.flex-grow
		#messageinner
			.message.text-xs(v-for='(item, index) in MSG_LIST', :key='index')
				.sysMsg.bg-gray-100.text-xs.p-2(v-if='item["_method_"] === "SystemNot"')
					span.break-all.text-psV3Blue 系统提示：
					span.break-all {{ item.ct }}
				.msg.SendMsg(v-if='item["_method_"] === "SendMsg"')
					span.SendMsgIcon 系统
					span.break-all {{ item.action==0 ? '欢迎 ' + item.ct.user_nicename + ' 进入直播间' : item.ct.user_nicename + '离开直播间'}}
				.msg.SendMsg(v-if='item["_method_"] === "SendGift"')
					span.break-all {{ item.ct.content }} 
					img.w-10(:src='item.ct.gifticon')
				.msg.SendMsg(v-if='item["_method_"] === "setAdmin"')
					span.break-all {{ item.ct }}
				.msg.SendMsg(v-if='item["_method_"] === "setAttent"')
					span.break-all {{ item.ct }}
				.msg.SendMsg(v-if='item["_method_"] === "ShutUpUser"')
					span.break-all {{ item.ct }}
				.msg.SendMsg(v-if='item["_method_"] === "KickUser"')
					span.break-all {{ item.ct }}
				.msg.select-none(v-if='item["_method_"] === "SendSticker"')
					.align-middle
						img.w-8.mr-1(v-if='levelList' :src='userLevelThumb(item.level)')
						span.name.font-bold.cursor-pointer.mr-1(:style='{ color: item.userTypeColor }') {{ item.uname}} 
						img.w-20(:src='findSticker(item.ct.code)')

				.msg(v-if='item["_method_"] === "SendBarrage"')
					a-popover(v-if='item', trigger='click',placement='bottom')
						.align-middle
							img.w-8.mr-1(v-if='levelList' :src='userLevelThumb(item.level)')
							span.name.font-bold.cursor-pointer.mr-1(:style='{ color: item.userTypeColor }') {{ item.uname}} 
							span.break-all(:style='{ color: item.msgColor }')  {{ item.ct.content }}
						template(#content,v-if='isRoomHost(item.uid) ||isAdminHost(item.uid)')
							.popContent.text-xs.p-2.bg-white(v-if='!item.isHistory')
								.poptop.mr-1.mb-3(v-if='levelList')
									img.w-8.levelimg.mr-1(:src='userLevelThumb(item.level)')
									span.pop_name.font-bold.mr-1 {{ item.uname }}
								.popset
									span.cursor-pointer(v-if='isRoomHost(item.uid) || isAdminHost(item.uid)', @click='shutUpHandle(item.uid, item.uname)') 添加黑名单
									a-divider(type='vertical')
									span.cursor-pointer(v-if='isRoomHost(item.uid) || isAdminHost(item.uid)', @click='blockIPHandle(item.uid, item.uname)') 添加封禁IP
									span(v-if='isRoomHost(item.uid)')
										a-divider(type='vertical')
										span.cursor-pointer(@click='setAdminHandle(item.uid, Number(item.usertype), item.uname, true)', v-if='checkRoomHost(item.uid)') 取消管理员
										span.cursor-pointer(@click='setAdminHandle(item.uid, Number(item.usertype), item.uname, false)', v-else) 设为管理员
	.inputWrap.FLEX_C.p-2.relative.flex-shrink(style='flex: 0 0 auto')
		.absolute.CENTER.w-full.z-20(v-if='state.newMsgCount >0 && !AUTO_SCROLL', style='top:-36px;')
			.rounded-full.bg-black.bg-opacity-80.text-center.p-2.mx-auto.cursor-pointer(@click='scrollBottom') 
				span.text-white.text-xs.mr-2 有 {{state.newMsgCount}} 条新消息
				img(src='/publicAssets/img/v3/icon-bottomarrow.png' , srcset='/publicAssets/img/v3/icon-bottomarrow@2x.png 2x')
		.CENTER_BETWEEN.mb-2
			.FLEX_R
				chatStickers
				
				a-popover(placement='top', trigger='click', v-model:visible='state.paletteVisible')
					a-tooltip(placement='top')
						template(#title) 
							.text-xs 文字颜色
						img.cursor-pointer.w-8.mx-1(src='/publicAssets/img/v3/icon-color.png' , srcset='/publicAssets/img/v3/icon-color@2x.png 2x')
					template(v-slot:content)
						.w-full.grid.grid-cols-4.gap-4.bg-white.p-4
							.col-span-1(v-for='colorItem in state.paletteColors') 
								.w-6.h-6.rounded-full.cursor-pointer(:style='`background:${colorItem}`', @click='changeColor(colorItem)')
				
				.switchScroll.cursor-pointer.mx-1(@click='switchAutoScroll')
					a-tooltip(placement='top')
						template(#title)
							.text-xs {{AUTO_SCROLL?'禁止滚动':'自动更新'}}
						img.w-8(v-if='AUTO_SCROLL', src='/publicAssets/img/v3/icon-lock-open.png', srcset='/publicAssets/img/v3/icon-lock-open@2x.png 2x')
						img.w-8(v-if='!AUTO_SCROLL', src='/publicAssets/img/v3/icon-lock.png', srcset='/publicAssets/img/v3/icon-lock@2x.png 2x')
				//- 關閉彈幕

				.switchScroll.cursor-pointer.mx-1(@click='switchBarrageHandle')
					img.w-8(v-if='showBarrage', src='/publicAssets/img/v3/icon-barrage-open-r.png', srcset='/publicAssets/img/v3/icon-barrage-open-r@2x.png 2x')
					img.w-8(v-if='!showBarrage', src='/publicAssets/img/v3/icon-barrage-open.png', srcset='/publicAssets/img/v3/icon-barrage-open@2x.png 2x')
				//- 關閉動態
				.switchScroll.cursor-pointer.mx-1(@click='switchGiftAnimationHandle')
					img.w-8(v-if='showGiftAnimation', src='/publicAssets/img/v3/icon-animation-open-r.png', srcset='/publicAssets/img/v3/icon-animation-open-r@2x.png 2x')
					img.w-8(v-if='!showGiftAnimation', src='/publicAssets/img/v3/icon-animation-open.png', srcset='/publicAssets/img/v3/icon-animation-open@2x.png 2x')
			div
				a-tooltip(placement='topRight')
					template(#title) 
						.text-xs 清除聊天室内容
					img.w-8.cursor-pointer(src='/publicAssets/img/v3/icon-delete-g.png' , srcset='/publicAssets/img/v3/icon-delete-g@2x.png 2x', @click='clearMsgList')
		.BETWEEN.text-center
			a-input.w-full(v-model:value='state.inputMessage', @pressEnter='checkSendMessage', placeholder='写点讯息给主播吧', size='default')
			a-button(type='primary', @click='checkSendMessage', :disabled='state.submitBtnDisabled',  :class='{"disabledBtn": state.submitBtnDisabled}') 提交
	
	
	//- -----------------------------------------------------------------------------------------------------
	a-modal(v-model:visible='state.showSetAdminModal', :closable='false', :footer='null', width='300px')
		.text-center.font-bold.my-4
			span(v-if='state.isadmin == 0') 确定要让此会员成为管理员?
			span(v-if='state.isadmin == 1') 确定要取消此会员的管理员?
		.text-center.my-4
			a-button.mx-4(type="primary", @click='setMemberToAdmain') 确定
			a-button.mx-4(@click='state.showSetAdminModal = false') 取消
	//- -----------------------------------------------------------------------------------------------------
	a-modal(v-model:visible='state.showSetShutUpModal', :closable='false', :footer='null', width='300px')
		.text-center.font-bold.my-4
			span 添加黑名单 
			span.text-psV3Yellow {{ state.toname }}
		.BETWEEN
			a-radio-group(v-model:value='state.shutUpOrKicking')
				a-radio(style='display: block', :value='1') 禁止发话
				a-radio(style='display: block', :value='2') 禁止访问
			div 封闭时间
				a-input(v-model:value='state.shut_time', type='number', size='small', style='width: 60px;') 小时
		.text-center.font-bold.my-4
			span 确定要将该会员加入黑名单吗?
		.text-center.my-4
			a-button.mx-4(type="primary", @click='setMemberToBlock') 确定
			a-button.mx-4(@click='state.showSetShutUpModal = false') 取消
	//- -----------------------------------------------------------------------------------------------------
	a-modal(v-model:visible='state.showSetBlockIPModal', :closable='false', :footer='null', width='300px')
		.text-center.font-bold.my-4
			span 添加IP封禁 
			span.text-psV3Yellow {{ state.toname }}
		.BETWEEN
			a-radio-group(v-model:value='state.shutUpOrKicking')
				a-radio(style='display: block', :value='1') 禁止发话
				a-radio(style='display: block', :value='2') 禁止访问
			div 封闭时间
				a-input(v-model:value='state.shut_time', type='number', size='small', style='width: 60px;') 小时
		.text-center.font-bold.my-4
			span 确定要将该会员加入IP封禁名单吗?			
		.text-center.my-4
			a-button.mx-4(type='primary', @click='setMemberToBlockIP') 确定
			a-button.mx-4(@click='state.showSetBlockIPModal = false') 取消
			

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw, watch } from 'vue';
import { setadmin, shutup, kicking, shutupip, kickingip } from '@/api';
import { message } from 'ant-design-vue';
import { matomo_liveRoom_send_chat, matomo_liveRoom_change_chat_color, matomo_liveRoom_clear_chat, matomo_liveRoom_lock_chat, matomo_liveRoom_animate_switch, matomo_liveRoom_barrage_switch } from '@/matomoEvent';
import { userLevelThumb } from '@/utils';
import chatStickers from '@/components/room/chatStickers.vue';
import comboRankList from '@/components/room/combo/comboRankList.vue';

export default {
	components: {
		chatStickers,
		comboRankList,
	},
	props: ['showBarrage', 'showGiftAnimation', 'switchBarrage', 'switchGiftAnimation'],
	setup(props, { emit }) {
		// ---------------------------
		const state = reactive({
			danmaku: true,
			inputMessage: '',
			submitBtnDisabled: false,
			showSetAdminModal: false,
			showSetShutUpModal: false,
			showSetBlockIPModal: false,
			memberStatusType: '',
			shutUpOrKicking: 1,
			shut_time: 1,
			isadmin: 0,
			touid: '',
			toname: '',
			isHistory: true,
			firstSystemNot: false,
			liveChatHeight: 0,
			paletteId: 0,
			stickersVisible: false,
			paletteVisible: false,
			paletteColors: ['#191919', '#a62337', '#e18900', '#031cac', '#ff4d00', '#590090', '#2e8e00'],
			newMsgCount: 0,
			scrollListener: null,
		});
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const currentRoom = route.params.id;
		const levelList = computed(() => store.state.config.levelList);
		const UID = computed(() => store.state.user.uid);
		const userInfo = computed(() => store.state.user.userInfo);
		const identities = computed(() => store.state.user.userInfo.identities || []);
		const MSG_LIST = computed(() => store.state.socket.msgList || '');
		const ROOM_MEMBER_LIST = computed(() => store.state.socket.roomMemberList || '');
		const AUTO_SCROLL = computed(() => store.state.socket.autoScroll || '');
		// ---------------------------
		const ALL_STICKERS = computed(() => store.state.config.allStickers || '');
		const STICKERS_Group = computed(() => store.state.config.stickersGroup || '');
		// ---------------------------
		const isRoomHost = (uid) => {
			try {
				const GET_USER_INFO = JSON.parse(window.localStorage.USERINFO);
				const IDENTITY_LIST = GET_USER_INFO.identities;
				const HOST = IDENTITY_LIST.filter((item) => Number(item.identity) === 4).length > 0;
				const SAME_ID = HOST ? Number(UID.value) === Number(route.params.id) : false;
				// 不可以管理該房主播
				return HOST && SAME_ID && Number(UID.value) != Number(uid) ? true : false;
			} catch (e) {
				return false;
			}
		};
		const clearMsgList = () => {
			matomo_liveRoom_clear_chat();
			store.commit('socket/CLEAR_MSG_LIST');
		};
		const changeColor = (color) => {
			matomo_liveRoom_change_chat_color();
			window.localStorage.setItem('MSG_COLOR', color);
			state.paletteVisible = false;
		};
		const isAdminHost = (uid) => {
			try {
				const GET_USER_INFO = JSON.parse(window.localStorage.USERINFO);
				const IDENTITY_LIST = GET_USER_INFO.identities;
				const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3).length > 0;
				const SAME_ROOM_ID = ADMIN ? IDENTITY_LIST.filter((item) => Number(item.identity) === 3)[0].rooms.indexOf(Number(route.params.id)) >= 0 : false;
				// 不可以禁言自己和該房主播
				return ADMIN && SAME_ROOM_ID && Number(uid) != Number(UID.value) && Number(uid) != Number(route.params.id) ? true : false;
			} catch (e) {
				return false;
			}
		};
		const checkRoomHost = (uid) => {
			const roomMemberList = toRaw(ROOM_MEMBER_LIST.value);
			const HOST = roomMemberList.filter((item) => Number(item.uid) == Number(uid));
			return HOST[0].adminRooms ? HOST[0].adminRooms.indexOf(Number(route.params.id)) >= 0 : false;
		};

		const checkSendMessage = () => {
			if (state.submitBtnDisabled === false) {
				sendMessage();
			}
		};

		const sendMessage = () => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				matomo_liveRoom_send_chat();
				let msg = state.inputMessage;
				store.dispatch('socket/SEND_MSG', msg);
				const IDENTITY_LIST = toRaw(identities.value);
				for (let i = 0; i < IDENTITY_LIST.length; i += 1) {
					if (IDENTITY_LIST[i].identity == 4) {
						// 直播主不限制發話冷卻時間
						state.submitBtnDisabled = false;
						break;
					} else if (IDENTITY_LIST[i].identity == 3) {
						// 房管不限制發話冷卻時間
						state.submitBtnDisabled = false;
						break;
					} else {
						// 其餘身份限制發話時間
						state.submitBtnDisabled = true;
						setTimeout(() => {
							state.submitBtnDisabled = false;
						}, 3000);
					}
				}
				state.inputMessage = '';
			}
		};
		// ------------------------------------------------------------------
		const setAdminHandle = (uid, userType, uname, isAdmin) => {
			state.memberStatusType = 'setAdmin';
			state.showSetAdminModal = true;
			state.touid = uid;
			state.toname = uname;
			if (userType == 3 && isAdmin) {
				state.isadmin = 1;
			} else {
				state.isadmin = 0;
			}
		};
		const setMemberToAdmain = () => {
			setadmin({
				uid: Number(UID.value),
				liveuid: Number(route.params.id),
				touid: Number(state.touid),
			}).then((res) => {
				if (res.code === 0) {
					state.showSetAdminModal = false;
					const roomMemberList = toRaw(ROOM_MEMBER_LIST.value);
					const index = roomMemberList.findIndex((item) => Number(item.uid) == Number(UID.value));
					if (state.isadmin == 0) {
						message.success(`${state.toname} 已被设为管理员`);
						state.isadmin = 1;
						store.commit('socket/SET_ADMIN', { touid: Number(state.touid), toname: state.toname, usertype: 3 });
					} else {
						message.success(`${state.toname} 已被取消管理员`);
						state.isadmin = 0;
						store.commit('socket/SET_ADMIN', { touid: Number(state.touid), toname: state.toname, usertype: 1 });
					}
					// state.isadmin = 1
				} else {
					this.setModel = false;
					message.error('设置失败!');
				}
			});
		};
		// ------------------------------------------------------------------
		const shutUpHandle = (uid, uname) => {
			state.memberStatusType = 'setShutUp';
			state.showSetShutUpModal = true;
			state.touid = uid;
			state.toname = uname;
		};
		const blockIPHandle = (uid, uname) => {
			state.memberStatusType = 'setBlockIP';
			state.showSetBlockIPModal = true;
			state.touid = uid;
			state.toname = uname;
		};
		const setMemberToBlock = () => {
			if (state.shutUpOrKicking === 1) {
				shutup({
					uid: Number(UID.value),
					liveuid: Number(route.params.id),
					touid: Number(state.touid),
					time: Number(state.shut_time),
					type: 1,
				}).then((res) => {
					state.showSetShutUpModal = false;
					message.success(`${state.toname} 已被房管禁言`);
					store.commit('socket/SET_SHUTUP_USER', { toname: state.toname, shut_time: state.shut_time, touid: state.touid });
				});
			} else if (state.shutUpOrKicking === 2) {
				kicking({
					uid: Number(UID.value),
					liveuid: Number(route.params.id),
					touid: Number(state.touid),
					time: Number(state.shut_time),
				}).then((res) => {
					state.showSetShutUpModal = false;
					message.success(`${state.toname} 已被禁入直播间`);
					store.commit('socket/SET_KICK_USER', { toname: state.toname, shut_time: state.shut_time, touid: state.touid });
				});
			}
		};
		const setMemberToBlockIP = () => {
			if (state.shutUpOrKicking === 1) {
				shutupip({
					uid: Number(UID.value),
					liveuid: Number(route.params.id),
					touid: Number(state.touid),
					time: Number(state.shut_time),
				}).then((res) => {
					state.showSetBlockIPModal = false;
					message.success(`${state.toname} 已被房管禁言`);
					store.commit('socket/SET_SHUTUP_USER', { toname: state.toname, shut_time: state.shut_time, touid: state.touid });
				});
			} else if (state.shutUpOrKicking === 2) {
				kickingip({
					uid: Number(UID.value),
					liveuid: Number(route.params.id),
					touid: Number(state.touid),
					time: Number(state.shut_time),
				}).then((res) => {
					state.showSetBlockIPModal = false;
					message.success(`${state.toname} 已被禁入直播间`);
					store.commit('socket/SET_KICK_USER', { toname: state.toname, shut_time: state.shut_time, touid: state.touid });
				});
			}
		};
		const switchBarrageHandle = () => {
			matomo_liveRoom_barrage_switch(!props.showBarrage);
			emit('switchBarrage', !props.showBarrage);
		};
		const switchGiftAnimationHandle = () => {
			matomo_liveRoom_animate_switch(!props.showGiftAnimation);
			emit('switchGiftAnimation', !props.showGiftAnimation);
		};
		const switchAutoScroll = () => {
			matomo_liveRoom_lock_chat();
			store.commit('socket/SWITCH_AUTO_SCROLL');
		};
		const scrollBottom = () => {
			const listView = window.document.querySelector('#messageList');
			listView.scrollTop = listView.scrollHeight;
			state.newMsgCount = 0;
		};
		const checkNewMsgListScroll = () => {
			try {
				window.document.querySelector('#messageList').removeEventListener('scroll', checkNewMsgListScroll);
				state.newMsgCount = 0;
				state.scrollListener = null;
			} catch (error) {
				// console.log(error);
			}
		};
		const checkNewMsgList = (len) => {
			const messageList = window.document.querySelector('#messageList')?.clientHeight;
			const messageInner = window.document.querySelector('#messageinner')?.clientHeight;

			if (!AUTO_SCROLL.value && messageInner > messageList && len > 0) {
				state.newMsgCount += 1;
				if (!state.scrollListener) {
					state.scrollListener = window.document.querySelector('#messageList').addEventListener('scroll', checkNewMsgListScroll);
				}
			} else {
				state.newMsgCount = 0;
			}

			// 聊天室卷軸滾動到最底-------------------------------------------------
			if (AUTO_SCROLL.value === true) {
				// reander需要時間 所以需要延遲捲動
				let listView = window.document.querySelector('#messageList');
				setTimeout(() => {
					listView.scrollTop = listView.scrollHeight;
				}, 500);
			}
			// 聊天室卷軸滾動到最底-------------------------------------------------
		};

		// filter STICKERS 圖片路徑 -------------------------------------------------
		const findSticker = (code) => {
			const result = ALL_STICKERS.value.filter((item) => {
				return item.code === code;
			});
			return result[0].img || '';
		};
		// filter STICKERS 圖片路徑-------------------------------------------------
		watch(
			() => MSG_LIST,
			(newVal) => {
				checkNewMsgList(newVal.value.length);
			},
			{ deep: true }
		);
		onMounted(() => {});
		onUnmounted(() => {});
		// ------------------------------------------------------------------

		return {
			state,
			userInfo,
			identities,
			levelList,
			userLevelThumb,
			isRoomHost,
			isAdminHost,
			currentRoom,
			MSG_LIST,
			AUTO_SCROLL,
			ROOM_MEMBER_LIST,
			ALL_STICKERS,
			STICKERS_Group,
			checkSendMessage,
			sendMessage,
			checkRoomHost,
			setAdminHandle,
			setMemberToAdmain,
			shutUpHandle,
			blockIPHandle,
			setMemberToBlock,
			setMemberToBlockIP,
			changeColor,
			clearMsgList,
			switchAutoScroll,
			checkNewMsgList,
			checkNewMsgListScroll,
			scrollBottom,
			switchBarrageHandle,
			switchGiftAnimationHandle,
			findSticker,
		};
	},
};
</script>
<style lang="scss" scoped>
.msg {
	padding: 4px 8px;
	color: #575759;
	font-size: 14px;
}
.SendMsg {
	background: #e0f8ff;
	.SendMsgIcon {
		font-size: 10px;
		padding: 2px;
		border-radius: 12px;
		margin-right: 6px;
		color: #fff;
		background: #a62337;
	}
}
</style>
