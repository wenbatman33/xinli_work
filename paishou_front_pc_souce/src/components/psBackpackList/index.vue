<template lang="pug">
.backpackList.FLEX_R
	.prev.CENTER.w-12.cursor-pointer(@click='prev')
		LeftOutlined.text-psV3Red
	.backpackListSwiper.h-16.overflow-hidden(style='width:420px')
		.swiper-wrapper
			.swiper-slide(v-for='(item, index) in state.backpackList')
				.CENTER.bg-gray-200.cursor-pointer.rounded
					a-popover(placement='top', @visibleChange='popoverVisibleChange')
						.relative.w-12.h-12.rounded-xl
							img.rounded-xl(:src='item.gifticon')
							.absolute.w-full.rounded-full.bg-psV3Yellow.text-white.top-11.shadow.text-center.text-xs {{item.quantity>9999?'9999+':item.quantity}}
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
									button.bg-psV3Red.text-white.px-4(@click='giveBackpackGift(item)') 赠送
	.next.CENTER.w-12.cursor-pointer(@click='next')
		RightOutlined.text-psV3Red
</template>

<script>
import Swiper from 'swiper';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { giftSend, backpack, sendGiftBackpack } from '@/api';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick, toRaw } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { matomo_liveRoom_send_gift } from '@/matomoEvent';
import { message } from 'ant-design-vue';

export default {
	name: 'backpackList',
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
			backpackList: null,
			giftcount: 1,
		});
		const UID = computed(() => store.state.user.uid || '');
		const USREINFO = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store?.state?.user?.userInfo?.coin);
		const BANANA = computed(() => store?.state?.user?.userInfo?.banana);
		watch(
			() => state.backpackList,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		const popoverVisibleChange = (e) => {
			if (e) {
				state.giftcount = 1;
			}
		};

		const init = () => {
			state.swiper = new Swiper('.backpackListSwiper', {
				slidesPerView: 8,
				spaceBetween: 6,
			});
			getBackpackData();
		};
		const getBackpackData = () => {
			const payload = {
				// sid 1 是禮物
				sid: 1,
				page: 1,
				pagesize: 9999,
			};
			backpack(payload).then((res) => {
				state.backpackList = res.data.gift_list;
				state.swiper.update();
			});
		};
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
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
		const giveBackpackGift = (item) => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				matomo_liveRoom_send_gift(item.giftname, item.id);
				let param = { gift_id: item.id, count: Number(state.giftcount) };
				backpackSendHandle(param);
			}
		};
		const backpackSendHandle = (payload) => {
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
				// ------------------
				const param = {
					uid: Number(UID.value),
					liveuid: Number(store.state.socket.roomnum),
					stream: store.state.socket.stream,
					giftid: Number(payload.gift_id),
					giftcount: Number(payload.count),
				};
				sendGiftBackpack(param).then((res) => {
					const defaultMsg = {
						_method_: 'SendGift',
						action: 0,
						msgtype: 1,
						ct: res.data.gifttoken,
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
					store.commit('socket/SEND_GIFT', message);
					getBackpackData();
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
			giveBackpackGift,
			next,
			prev,
			popoverVisibleChange,
			backpackSendHandle,
			getUserType,
			getBackpackData,
		};
	},
};
</script>

<style lang="scss" scoped></style>
