<template lang="pug">
.giftList.FLEX_R
	.prev.CENTER.w-12.cursor-pointer(@click='prev')
		LeftOutlined.text-psV3Red
	.giftListSwiper.h-16.overflow-hidden(style='width:420px')
		.swiper-wrapper
			.swiper-slide(v-for='(item, index) in state.giftList') 
				.CENTER.bg-gray-200.cursor-pointer.rounded
					a-popover(placement='top', @visibleChange='popoverVisibleChange(index)' , :visible='state.popoverVisibleArray[index]',  trigger='hover')
						.relative.w-12.h-12.rounded-xl
							img.rounded-xl(:src='item.gifticon')
							.absolute.w-full.rounded-full.bg-psV3Yellow.text-white.top-11.shadow.text-center.text-xs(v-if='item.quantity>0') {{item.quantity>9999?'9999+':item.quantity}}
						template(v-slot:content)
							.FLEX_C.w-72.h-40.bg-white.rounded-xl.p-4
								.FLEX_R
									.giftImg.w-12.h-12
										img.w-12.h-12(:src='item.gifticon')
									.giftInfo.FLEX_C.flex-grow.px-2.truncate
										.BETWEEN
											h5 {{ item.giftname }}
											h5.text-psV3Yellow
												img.w-4(src='/publicAssets/img/v3/coin.png')
												span {{item.needcoin}}
										.explain.text-gray-500.text-xs.truncate.my-2 {{ item.giftexplain }}
										.quantity.text-xs 库存：{{ item.quantity }}
										//- p.price {{ item.needcoin }}蕉币
								.BETWEEN.my-2.w-full
									.countGroup
										button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftcount===1}', @click='state.giftcount=1') 1
										button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftcount===10}', @click='state.giftcount=10') 10
										button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftcount===50}', @click='state.giftcount=50') 50
										button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftcount===99}', @click='state.giftcount=99') 99
									.w-20
										a-input-number.text-right(class='hover:border-psV3Yellow focus:border-psV3Yellow', :min='1', size='small', v-model:value='state.giftcount', @input='state.activeMoney', placeholder='自定义')
								.BETWEEN.w-full
									.text-psV3Yellow 总计：{{item.needcoin * state.giftcount}}
									button.bg-psV3Red.text-white.px-4(@click='giveGift(item, index)') 赠送
	.next.CENTER.w-12.cursor-pointer(@click='next')
		RightOutlined.text-psV3Red
	
	.banana.w-12.h-12.CENTER.bg-gray-200.cursor-pointer.rounded.mx-2
		a-popover(placement='top', @visibleChange='popoverVisibleChange("banana")' , :visible='state.bananaVisible',  trigger='hover')
			.relative.w-12.h-12.rounded-xl
				img.rounded-xl(src='/publicAssets/img/v3/banana.png')
				.absolute.w-full.rounded-full.bg-psV3Yellow.text-white.top-11.shadow.text-center.text-xs(v-if='state.banana>0') {{state.banana>9999?'9999+':state.banana}}
			template(v-slot:content)
				.FLEX_C.w-72.h-40.bg-white.rounded-xl.p-4
					.FLEX_R
						.giftImg.w-12.h-12
							img.w-12.h-12(src='/publicAssets/img/v3/banana.png')
						.giftInfo.FLEX_C.flex-grow.px-2.truncate
							.BETWEEN
								h5 香蕉
								h5.text-psV3Yellow
									img.w-4(src='/publicAssets/img/v3/coin.png')
									span 0
							.quantity.text-xs 库存：{{state.banana}}
							//- p.price {{ item.needcoin }}蕉币
					.BETWEEN.my-2.w-full
						.countGroup
							button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftBananaCount===1}', @click='state.giftBananaCount=1') 1
							button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftBananaCount===10}', @click='state.giftBananaCount=10') 10
							button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftBananaCount===50}', @click='state.giftBananaCount=50') 50
							button.w-8.h-auto.bg-gray-300.text-white.mr-1(:class='{"bg-psV3Yellow": state.giftBananaCount===99}', @click='state.giftBananaCount=99') 99
						.w-20
							a-input-number.text-right(class='hover:border-psV3Yellow focus:border-psV3Yellow', :min='1', size='small', v-model:value='state.giftBananaCount', @input='state.activeMoney', placeholder='自定义')
					.BETWEEN.w-full
						.text-psV3Yellow 总计：0
						//- 香蕉ID 720892
						button.bg-psV3Red.text-white.px-4(@click='giveBanana()') 赠送
</template>

<script>
import Swiper from 'swiper';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { giftlistV2, giftSend } from '@/api';
import { Modal, message } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick, ref } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { matomo_liveRoom_send_gift } from '@/matomoEvent';

export default {
	name: 'giftList',
	components: {
		LeftOutlined,
		RightOutlined,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			swiper: null,
			banana: 0,
			giftList: null,
			giftcount: 1,
			giftBananaCount: 1,
			popoverVisibleArray: [],
			bananaVisible: false,
		});
		const UID = computed(() => store.state.user.uid || '');
		const USREINFO = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store?.state?.user?.userInfo?.coin);
		const BANANA = computed(() => store?.state?.user?.userInfo?.banana);

		watch(
			() => state.giftList,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		const popoverVisibleChange = (index) => {
			if (index === 'banana') {
				state.bananaVisible = !state.bananaVisible;
				state.giftBananaCount = 1;
			} else {
				state.popoverVisibleArray[index] = !state.popoverVisibleArray[index];
				state.giftcount = 1;
			}
		};
		const init = () => {
			state.swiper = new Swiper('.giftListSwiper', {
				slidesPerView: 8,
				spaceBetween: 6,
				slidesPerGroup: 8,
			});
			giftlistV2().then((res) => {
				state.giftList = res.data.list;
				state.giftList.forEach((item, index) => {
					state.popoverVisibleArray[index] = false;
				});
				state.banana = res.data.banana;
				state.coin = res.data.coin;
				state.swiper?.update();
			});
		};
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		const giveGift = (item, index) => {
			// console.log((state.giftcount - item.quantity) * item.needcoin);
			state.popoverVisibleArray[index] = false;
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else if (state.giftcount > item.quantity && Number(USREINFO.value.coin) < (state.giftcount - item.quantity) * item.needcoin) {
				Modal.confirm({
					title: '蕉币不足，请至个人中心充值！',
					okText: '去充值',
					cancelText: '取消',
					onOk() {
						store.commit('user/SHOW_RECHARGE_MODEL');
					},
					onCancel() {},
				});
			} else {
				matomo_liveRoom_send_gift(item.giftname, item.id);
				let param = { gift_id: item.id, count: Number(state.giftcount) };
				giftSendHandle(param);
			}
		};

		const giveBananaCombo = () => {
			// 測試function 直播间連續發送香蕉会造成用户无法发送中文字
			setInterval(() => {
				giveBanana();
			}, 2000);
		};
		const giveBanana = () => {
			state.bananaVisible = false;
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else if (state.giftBananaCount > BANANA.value) {
				message.error('香蕉不够，快去做任务！');
			} else {
				let param = { gift_id: 720892, count: state.giftBananaCount };
				giftSendHandle(param);
			}
		};
		const getUserType = () => {
			const IDENTITY_LIST = USREINFO.value.identities;
			const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
			const HOST = IDENTITY_LIST.filter((item) => Number(item.identity) === 4);
			const USER = IDENTITY_LIST.filter((item) => Number(item.identity) === 1);
			if (ADMIN.length > 0) {
				return 3;
			} else if (HOST.length > 0) {
				return 4;
			} else {
				return 1;
			}
		};
		const giftSendHandle = (payload) => {
			if (UID.value === String(route.params.id)) {
				message.error('无法给自己送礼物');
				return;
			} else {
				const userData = {
					uid: UID.value || 0,
					uname: String(USREINFO.value.user_nicename) || '',
					uhead: String(USREINFO.value.avatar),
					level: String(USREINFO.value.level),
					equipment: 'pc',
				};
				const param = {
					uid: Number(route.params.id),
					gift_id: payload.gift_id,
					count: Number(payload.count),
				};
				giftSend(param).then((res) => {
					// 更新資料-----------------------------------------------------------------------------
					store.commit('user/EDIT_INFO', { coin: res?.data?.gift_list?.coin, banana: res?.data?.gift_list?.banana });
					state.giftList = res?.data?.gift_list?.list;
					state.banana = res?.data?.gift_list?.banana;

					// ----------------------------------------------------------------------------------
					const defaultMsg = {
						_method_: 'SendGift',
						action: 0,
						msgtype: 1,
						ct: res?.data?.token,
						usertype: Number(getUserType()),
						roomnum: store.state.socket.stream,
						touid: '',
					};
					// 合併訊息物件--------------
					const msgObj = { ...defaultMsg, ...userData };
					// 合併訊息物件--------------
					let message = {
						msg: [msgObj],
						retcode: '000000',
						retmsg: 'OK',
					};
					// ------------------------------------
					store.commit('socket/SEND_GIFT', message);
					// ------------------------------------
					const roomPayload = {
						donate_total: res?.data?.donate_total,
						room_heat: res?.data?.heat,
					};
					store.commit('socket/SET_ROOM_DATA', roomPayload);
				});
			}
		};
		onUnmounted(() => {
			state.swiper.destroy();
			state.swiper = null;
		});
		onMounted(() => {
			init();
		});
		return {
			store,
			route,
			router,
			state,
			init,
			UID,
			COIN,
			BANANA,
			USREINFO,
			giveGift,
			giveBanana,
			giveBananaCombo,
			next,
			prev,
			popoverVisibleChange,
			giftSendHandle,
			getUserType,
		};
	},
};
</script>

<style lang="scss" scoped></style>
