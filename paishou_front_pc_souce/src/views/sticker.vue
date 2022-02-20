<template lang="pug">
.Container.BETWEEN.py-8
	//- schedule 左側區塊
	.funcBar.w-40.pr-2.flex-shrink-0
		.grid.grid-cols-1.gap-4.p-4
			.col-span-1(v-for='item in STICKERS_Group')
				img.w-20.cursor-pointer(:src='item?.stickers[0]?.img', @click='scollStickerPart(item.id)', :class='{"opacity-50": !checkExpireTime(item)}')
	.min-h-screen
		.FLEX_C.mb-8(v-for='(stickerItem, stickerIndex) in STICKERS_Group', :id='`part_${stickerItem.id}`')
			.FLEX_R.items-center.mb-2
				img.w-40.mr-4(:src='stickerItem?.stickers[0]?.img')
				div
					h3
						span.mx-2 {{stickerItem.name}}
						.inline-block.rounded-full.bg-psV3Blue.text-white.text-xs.p-2 {{state.list[stickerIndex].dec}}
					.rounded.border.border-gray-500.text-gray-500.p-2.text-center.my-2(v-if='state.list[stickerIndex].type==="task"') {{state.list[stickerIndex].bottonText}}
					.rounded.bg-psV3Red.text-white.p-2.text-center.my-2.cursor-pointer(v-if='state.list[stickerIndex].type==="buy"', @click='getStickerProgram(stickerItem, stickerIndex)') {{state.list[stickerIndex].bottonText}}
			.grid.grid-cols-8.gap-4.p-4
				.col-span-1(v-for='sticker in stickerItem.stickers')
					img.w-40(:src='sticker.img' @click='sendSticker(sticker.id)')
	a-modal.radiusModal(v-if='state.showModal', :visible='state.showModal',width='800px' :class='"gameModal"', closable='', :footer='null', @cancel='closeModal')
		.CENTER.FLEX_C.p-4.px-12
			.FLEX_R.items-center
				img.w-20.mr-4(:src='state.currentProgram?.stickers[0]?.img')
				div
					h3 {{state.currentProgram.name}}
					.rounded-full.bg-psV3Blue.text-white.text-xs.p-2 {{state.list[state.currentIndex].dec}}
			.step_1.FLEX_C(v-if='state.buyStep===1')
				.my-8
					.grid.gap-4(:class='`grid-cols-${state.programResult.length}`')
						.col-span-1.rounded(v-for='pItem in state.programResult')
							a-button.bg-psV3Red.text-white.rounded(type='primary', block, size='large', :disabled='checkPrice(pItem)', @click='stickerBuyHandle(pItem)') {{pItem.day}}天使用权
							.text-xs.text-center.my-2 {{pItem.price}}{{pItem.type===1?"香蕉":"蕉币"}}

				.w-full.grid.grid-cols-2.gap-4
					.col-span-1.bg-gray-100.rounded
						.FLEX_R.items-center.p-2
							.icon.mr-2
								img.w-6(src='/publicAssets/img/v3/coin.png', alt='')
							.info.truncate.flex-grow
								.BETWEEN
									div
										h5.text-psV3Yellow.cursor-pointer(@click='showRecharge')  
											span 蕉币
										.text-gray-500 {{ commaFormat(COIN) || 0}}
									.CENTER.bg-psV3Yellow.text-white.text-xs.rounded.p-2.cursor-pointer(@click='showRecharge')  充值
					.col-span-1.bg-gray-100.rounded
						.FLEX_R.items-center.p-2
							.icon.mr-2
								img.w-6(src='/publicAssets/img/v3/banana.png', alt='')
							.info.truncate
								h5 香蕉
								.text-gray-500 {{ commaFormat(BANANA) ||0 }}

			.step_2.FLEX_C.CENTER.text-center(v-if='state.buyStep===2')
				h4.text-gray-500.my-4 {{state.buyProgram.day}}天使用权
				.text-base.text-gray-500.mb-12 {{formatDate(state.expire_time)}} 到期
				a-button.text-psV3Red.border-psV3Red(block, size='large', @click='closeModal') 关闭

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw, watch } from 'vue';
import { stickerProgram, stickerBuy } from '@/api';
import { commaFormat, formatDate } from '@/utils';

export default {
	setup(props, { emit }) {
		// store  ------------
		const userInfo = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store?.state?.user?.userInfo?.coin || 0);
		const BANANA = computed(() => store?.state?.user?.userInfo?.banana);
		// ---------------------------
		const state = reactive({
			showModal: false,
			showResultModal: false,
			currentProgram: null,
			currentIndex: null,
			buyStep: 1,
			buyProgram: null,

			programPriceArray: [],
			expire_time: null,

			list: [
				{
					dec: '20格特色表情图',
					bottonText: '购买',
					type: 'buy',
				},
				{
					dec: '20格特色表情图',
					bottonText: '用户等级20级 即可解锁',
					type: 'task',
				},
				{
					dec: '专属体育用户贴图',
					bottonText: '连续七日登入即解锁',
					type: 'task',
				},
			],
		});
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const currentRoom = route.params.id;
		const UID = computed(() => store.state.user.uid);
		const USREINFO = computed(() => store.state.user.userInfo);
		// ---------------------------
		const ALL_STICKERS = computed(() => store.state.config.allStickers || '');
		const STICKERS_Group = computed(() => (store.state.config.stickersGroup ? store.state.config.stickersGroup.filter((item) => item.id !== 1) : []));
		const USER_STICKERS = computed(() => store.state.user.stickers || '');
		const showRecharge = () => store.commit('user/SHOW_RECHARGE_MODEL');
		const scollStickerPart = (id) => {
			const scrollDiv = window.document.querySelector(`#part_${id}`).offsetTop;
			window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
		};
		const checkPrice = (pItem) => {
			if (pItem.type === 1) {
				return BANANA.value < pItem.price ? true : false;
			} else {
				return COIN.value < pItem.price ? true : false;
			}
		};
		const stickerBuyHandle = (pItem) => {
			state.buyProgram = pItem;
			stickerBuy({ program_id: pItem.id })
				.then((res) => {
					store.dispatch('user/UPDATE_USER_INFO');
					state.buyStep = 2;
					state.expire_time = res.data.expire_time;
				})
				.catch((err) => {
					state.showModal = false;
				});
		};
		const closeModal = (id) => {
			state.currentProgram = null;
			state.currentIndex = null;
			state.programResult = null;
			state.expire_time = null;
			state.showModal = false;
			state.buyStep = 1;
		};
		const getStickerProgram = (item, index) => {
			state.currentProgram = item;
			state.currentIndex = index;
			stickerProgram({ group_id: item.id }).then((res) => {
				state.showModal = true;
				state.buyStep = 1;
				state.programResult = res.data.list;
			});
		};
		// 檢查是否有貼圖＆是否有使用期限＆使用期限是否過期
		const checkExpireTime = (stickerItem) => stickerItem.stickers && stickerItem.expire_time && dayjs().isBefore(dayjs(stickerItem.expire_time));

		// ---------------------------
		// 檢查是否有貼圖＆是否有使用期限＆使用期限是否過期
		onMounted(() => {});
		onUnmounted(() => {});
		// ------------------------------------------------------------------
		return {
			userInfo,
			COIN,
			BANANA,
			state,
			USREINFO,
			ALL_STICKERS,
			STICKERS_Group,
			scollStickerPart,
			getStickerProgram,
			closeModal,
			commaFormat,
			showRecharge,
			checkPrice,
			stickerBuyHandle,
			formatDate,
			checkExpireTime,
		};
	},
};
</script>
<style lang="scss" scoped></style>
