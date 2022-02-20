<template lang="pug">
//- 送禮彈窗
van-popup(:show='show', position='bottom', teleport='.popupTeleport', @click-overlay='clickOverlay')
	//- 彈窗內容
	.flex.flex-col.items-stretch
		//- 表頭
		.flex.flex-row.justify-between.items-center.px-4.py-2
			//- 蕉幣資訊
			.flex.flex-row.items-center.pr-2
				//- 蕉幣標題
				.text-xs.text-coin-title 蕉币

				//- 蕉幣數量
				.text-xs.text-coin-value.ml-2 {{ coin }}

				//- 充值按鈕
				van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent.ml-2(@click='clickRecharge')
					img.w-full.h-full.Object-contain(src='/publicAssets/img/room/icon-plus@3x.png')

			//- 關閉按鈕
			van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
				img.w-full.h-full.Object-contain(src='/publicAssets/img/icon-close-gray@3x.png')

		//- 分隔線
		divider

		//- 禮物列表
		.w-full.flex.flex-row.flex-nowrap.overflow-x-auto.mt-4.px-4
			gift-item.flex-shrink-0(v-for='(item, index) in giftList', :item='item', :selected='index === selectedIndex', @click='clickGift(item)')

		//- 數量
		.grid.grid-cols-count.gap-2.px-4.mt-4
			//- 1個
			van-button.w-auto.h-auto.p-2.bg-count.border-transparent(:class='{ "selected": state.selectedQuantity == 1 }', @click='clickQuantity(1)')
				.text-xs.text-white.font-bold 1

			//- 10個
			van-button.w-auto.h-auto.p-2.bg-count.border-transparent(:class='{ "selected": state.selectedQuantity == 10 }', @click='clickQuantity(10)')
				.text-xs.text-white.font-bold 10

			//- 50個
			van-button.w-auto.h-auto.p-2.bg-count.border-transparent(:class='{ "selected": state.selectedQuantity == 50 }', @click='clickQuantity(50)')
				.text-xs.text-white.font-bold 50

			//- 99個
			van-button.w-auto.h-auto.p-2.bg-count.border-transparent(:class='{ "selected": state.selectedQuantity == 99 }', @click='clickQuantity(99)')
				.text-xs.text-white.font-bold 99

			//- 間距
			.bg-transparent

			//- 自定義
			van-field(v-model='state.selectedQuantity', type='number', placeholder='自定义', :formatter='countFormatter')

		//- 表尾
		.grid.grid.cols-footer.gap-2.items-center.px-4.mt-3
			//- 總結
			.grid.grid-cols-sum.gap-y-1.items-center
				//- 禮物名稱
				.text-xs.text-gift-name {{ giftName }}

				//- 蕉幣圖示
				img.w-4.h-4.ml-1(src='/publicAssets/img/coin.png')

				//- 禮物金額及數量
				.text-xs.text-gift-coin.font-bold.ml-1 
					span {{ giftCoin }}
					span.ml-2 X{{ state.selectedQuantity || 0 }}

				//- 金額標題
				.text-xs.text-total-title.font-bold 总计

				//- 蕉幣圖示
				img.w-4.h-4.ml-1(src='/publicAssets/img/coin.png')

				//- 金額數值
				.text-xs.text-total-value.font-bold.ml-1 {{ totalCoin }}

			//- 贈送
			van-button.w-auto.h-auto.p-2.bg-submit.border-transparent(:loading='submitLoading', :disabled='submitDisabled', @click='clickSubmit')
				.text-xs.text-white.font-bold 赠送
				template(#loading)
					van-loading.w-4.h-4(color='#ffffff', type='spinner')

		//- 分隔線
		divider.mt-6
</template>
<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { commaFormat } from '@/utils';
import divider from '@/components/divider';
import giftItem from '@/components/room/giftItem.vue';

export default {
	components: {
		divider,
		giftItem,
	},
	props: {
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			selectedGift: {},
			selectedQuantity: null,
		});

		// 蕉幣數量
		const coin = computed(() => {
			try {
				return commaFormat(store?.state?.user?.userInfo?.coin || 0);
			} catch (e) {
				return store?.state?.user?.userInfo?.coin || 0;
			}
		});

		// 禮物列表
		const giftList = computed(() => {
			return store?.state?.socket?.giftList || [];
		});

		// 選擇的禮物名稱
		const giftName = computed(() => {
			return state?.selectedGift?.giftname || '未选择';
		});

		// 選擇的禮物金額
		const giftCoin = computed(() => {
			try {
				return commaFormat(state?.selectedGift?.needcoin || 0);
			} catch (e) {
				return state?.selectedGift?.needcoin || 0;
			}
		});

		// 總金額
		const totalCoin = computed(() => {
			try {
				return commaFormat((state?.selectedGift?.needcoin || 0) * (state.selectedQuantity || 0));
			} catch (e) {
				return 0;
			}
		});

		// 選擇的禮物位置
		const selectedIndex = computed(() => {
			return giftList?.value?.findIndex((element) => element.id === state?.selectedGift?.id);
		});

        // 是否正在贈送禮物
        const submitLoading = computed(() => {
            return store?.state?.socket?.sendGiftLoading === true;
        });

		// 禁用贈送按鈕
		const submitDisabled = computed(() => {
			return selectedIndex.value < 0 || selectedIndex.value >= giftList.value.length || !state.selectedQuantity || state.selectedQuantity <= 0;
		});

		// 格式化數量
		const countFormatter = (val) => {
			return val.replace(/\D/, '');
		};

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};

		// 點擊充值按鈕
		const clickRecharge = () => {
			router.push('/recharge');
		};

		// 點擊禮物
		const clickGift = (item) => {
			state.selectedGift = item;
			if (!state.selectedQuantity || state.selectedQuantity <= 0) {
				state.selectedQuantity = 1;
			}
		};

		// 點擊數量
		const clickQuantity = (quantity) => {
			state.selectedQuantity = quantity;
		};

        // 點擊贈送
        const clickSubmit = () => {
            const params = {
                id: state.selectedGift.id,
                count: state.selectedQuantity,
            }
            store.dispatch('socket/SEND_GIFT', params).then(() => {
                emit('update:show', false);
            });
        };
		return {
			state,
			coin,
			giftList,
            giftName,
            giftCoin,
            totalCoin,
			selectedIndex,
            submitLoading,
			submitDisabled,
			countFormatter,
			clickOverlay,
			clickClose,
			clickRecharge,
			clickGift,
			clickQuantity,
            clickSubmit,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-cell) {
	padding: 7px 12px;
	font-size: 12px;
	line-height: 12px;
	color: #969696;
	border: 1px solid #e1e1e1;
	border-radius: 4px;
}
.text-coin-title {
	color: #969696;
}
.text-coin-value {
	color: #f8b62d;
}
.grid-cols-count {
	grid-template-columns: 1fr 1fr 1fr 1fr 16px 25%;
}
.grid.cols-footer {
	grid-template-columns: 1fr 40%;
}
.bg-count {
	background: #e1e1e1;
	&.selected {
		background: #f8b62d;
	}
}
.grid-cols-sum {
	grid-template-columns: auto auto 1fr;
}
.text-gift-name {
	color: #191919;
}
.text-gift-coin {
	color: #191919;
}
.text-total-title {
	color: #f8b62d;
}
.text-total-value {
	color: #f8b62d;
}
.bg-submit {
	background: #a62337;
}
</style>
