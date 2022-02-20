<template lang="pug">
//- 貼圖頁籤
van-tab(:name='id')
	//- 頁籤樣式
	template(#title)
		.rounded-full(:class='{ "border-selected": id === active }')
			img.w-tab-img.h-tab-img.rounded-full.object-contain(:src='icon', @error='errorIconImg')

	//- 頁籤內容
	.flex.flex-col.items-stretch.pb-6
		//- 貼圖說明
		.grid.grid-cols-info.gap-3.items-center.px-6.py-6
			//- 圖示
			img.w-20.h-20.object-contain(:src='icon', @error='errorIconImg')

			//- 說明
			.flex.flex-col.items-stretch
				//- 第一列
				.flex.flex-row.items-center.mb-1
					//- 名稱
					.text-base.text-black.font-bold {{ name }}

					//- 說明
					.text-xs.text-description.ml-2 {{ description }}

				//- 到期日
				.text-xs.text-expired(v-if='available && !perpetual') {{ expiredTime }}

				//- 20級解鎖
				van-button.w-auto.h-auto.p-2.mt-2.self-start.rounded-full(v-if='unlockByLevel20')
					.text-sm.text-unlock.font-bold 用户等级20级 即可解锁

				//- 完成新手任務解鎖
				van-button.w-auto.h-auto.p-2.mt-2.self-start.rounded-full(v-else-if='unlockByNewbileTask', @click='clickTasks')
					.flex.flex-row.items-center
						.text-sm.text-unlock.font-bold 连续七日登入即解锁
						img.w-3.h-3.ml-1.object-contain(src='/publicAssets/img/sticker/icon-arrow-jump@3x.png')

				//- 購買
				van-button.w-auto.h-auto.px-8.py-2.mt-2.self-start.rounded-full.bg-buy.border-transparent(v-else, :loading='state.programLoading', @click='clickBuy')
					.text-sm.text-white.font-bold 购买
					template(#loading)
						van-loading.w-4.h-4(type='spinner', color='#ffffff')

		//- 貼圖列表
		sticker-list(:list='stickers')

//- 購買方案彈窗
program-popup(
    v-model:show='state.showProgramPopup'
    v-model:loading='state.buyLoading'
    v-model:success='state.showBuySuccessPopup'
    v-model:buying-program='state.buyingProgram'
	v-model:success-object='state.successObject'
    :item='item'
    :list='state.programList'
)

//- 購買成功彈窗
buy-success-popup(
    v-model:show='state.showBuySuccessPopup'
    :item='item'
	:buying-program='state.buyingProgram'
    :success-object='state.successObject'
)
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { stickerProgram } from '@/api';
import stickerList from '@/components/sticker/stickerList.vue';
import programPopup from '@/components/sticker/programPopup.vue';
import buySuccessPopup from '@/components/sticker/buySuccessPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		stickerList,
		programPopup,
		buySuccessPopup,
	},
	props: {
		item: Object,
		active: Number,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			programList: [],
			buyingProgram: {},
			successObject: {},
			buyLoading: false,
			programLoading: false,
			showProgramPopup: false,
			showBuySuccessPopup: false,
		});

		// 貼圖編號
		const id = computed(() => {
			return props?.item?.id || -1;
		});

		// 貼圖列表
		const stickers = computed(() => {
			return props?.item?.stickers || [];
		});

		// 貼圖圖示
		const icon = computed(() => {
			const firstSticker = stickers.value[0] || {};
			return firstSticker.img || '';
		});

		// 貼圖名稱
		const name = computed(() => {
			return props?.item?.name || '';
		});

		// 貼圖說明
		const description = computed(() => {
			if (props?.item?.id === 2) {
				return '20格特色表情图';
			} else if (props?.item?.id === 3) {
				return '20格特色表情图';
			} else if (props?.item?.id === 4) {
				return '专属体育贴图';
			} else {
				return '特色表情图';
			}
		});

		// 貼圖權限
		const permission = computed(() => {
			const permissionList = store?.state?.user?.userInfo?.stickers || [];
			return permissionList.find((element) => element.id === id.value) || {};
		});

		// 是否可以永久使用貼圖
		const perpetual = computed(() => {
			return permission.value.perpetual === true;
		});

		// 過期時間字串
		const expiredTimeStr = computed(() => {
			return state?.successObject?.expire_time || permission.value.expire_time || '';
		});

		// 過期時間格式化字串
		const expiredTime = computed(() => {
			try {
				return dayjs(expiredTimeStr.value, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').format('YYYY年MM月DD日到期');
			} catch (e) {
				return `${expiredTimeStr.value}到期`;
			}
		});

		// 是否可以使用貼圖
		const available = computed(() => {
			// Validate perpetual
			if (perpetual.value) {
				return true;
			}

			// Validate expired time
			try {
				return dayjs(expiredTimeStr.value, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').isAfter(dayjs());
			} catch (e) {
				return false;
			}
		});

		// 20級解鎖
		const unlockByLevel20 = computed(() => {
			return id.value === 3;
		});

		// 完成新手任務解鎖
		const unlockByNewbileTask = computed(() => {
			return id.value === 4;
		});

		// 貼圖圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/sticker/icon-sticker-placeholder@3x.png';
		};

		// 點擊任務列表
		const clickTasks = () => {
			router.push('/tasks');
		};

		// 點擊購買按鈕
		const clickBuy = () => {
			// Update loading state
			state.programLoading = true;

			// Query params
			const query = {
				group_id: id.value,
			};

			// Get sticker program list
			stickerProgram(query)
				.then((res) => {
					// Update program list
					state.programList = res?.data?.list || [];

					// Show program popup
					state.showProgramPopup = true;

					// Revert loading state on finished
					state.programLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.programLoading = false;
				});
		};
		return {
			state,
			id,
			icon,
			name,
			description,
			stickers,
			perpetual,
			expiredTime,
			available,
			unlockByLevel20,
			unlockByNewbileTask,
			errorIconImg,
			clickTasks,
			clickBuy,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-tab-img {
	width: 48px;
}
.h-tab-img {
	height: 48px;
}
.border-selected {
	border: 2px solid #ff7a00;
}
.grid-cols-info {
	grid-template-columns: 70px 1fr;
}
.text-description {
	color: #2f80ed;
}
.text-expired {
	color: #a62337;
}
.border-unlock {
	border: 1px solid #969696;
}
.text-unlock {
	color: #969696;
}
.bg-buy {
	background: #a62337;
}
</style>
