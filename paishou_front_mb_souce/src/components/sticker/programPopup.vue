<template lang="pug">
//- 貼圖購買方案彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', @click-overlay='clickOverlay')
    //- 彈窗內容
    .flex.flex-col.items-center.bg-white.p-6
        //- 圖示
        img.w-20.h-20.object-contain(:src='icon', @error='errorIconImg')

        //- 名稱
        .text-base.text-title.font-bold.mt-3 {{ name }}

        //- 目前沒有方案
        empty.mt-6(v-if='listEmpty', text='目前没有方案')

        //- 方案列表
        program-list.mt-6.self-stretch(
            v-else
            :list='list'
            :loading='loading'
			:buying-program='buyingProgram'
            @update:show='updateShow'
            @update:loading='updateLoading'
            @update:success='updateSuccess'
			@update:buying-program='updateBuyingProgram'
			@update:success-object='updateSuccessObject'
        )

        //- 錢包資訊
        .grid.grid-cols-2.gap-2.items-center.self-stretch.mt-4
            //- 蕉幣資訊
            van-button.w-auto.h-auto.pt-3.pb-2.rounded.bg-transparent.border-transparent(@click='clickCoin')
                .flex.flex-col.items-center
                    //- 蕉幣數量
                    .text-sm.text-coin-value.font-bold {{ coin }}

                    //- 蕉幣標題
                    .flex.flex-row.items-center.mt-2
                        //- 標題圖示
                        img.w-4.h-4.object-contain(src='/publicAssets/img/sticker/icon-plus@3x.png')
                        
                        //- 標題文字
                        .text-xs.text-coin-title.ml-1 蕉币

            //- 香蕉資訊
            van-button.w-auto.h-auto.pt-3.pb-2.rounded.bg-transparent.border-transparent
                .flex.flex-col.items-center
                    //- 香蕉數量
                    .text-sm.text-banana-value.font-bold {{ banana }}
                    
                    //- 香蕉標題
                    .text-xs.text-banana-title.mt-2 香蕉
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { commaFormat } from '@/utils';
import empty from '@/components/empty';
import programList from '@/components/sticker/programList.vue';

export default {
	components: {
		empty,
		programList,
	},
	props: {
		list: Array,
		item: Object,
		show: Boolean,
        loading: Boolean,
		success: Boolean,
		buyingProgram: Object,
		successObject: Object,
	},
	emits: ['update:show', 'update:loading', 'update:success', 'update:buying-program', 'update:success-object'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

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

		// 方案列表是否為空
		const listEmpty = computed(() => {
			return !props?.list || props?.list?.length === 0;
		});

		// 蕉幣數量
		const coin = computed(() => {
			try {
				return commaFormat(store?.state?.user?.userInfo?.coin);
			} catch (e) {
				return store?.state?.user?.userInfo?.coin || 0;
			}
		});

		// 香蕉數量
		const banana = computed(() => {
			try {
				return commaFormat(store?.state?.user?.userInfo?.banana);
			} catch (e) {
				return store?.state?.user?.userInfo?.banana || 0;
			}
		});

		// 貼圖圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/sticker/icon-sticker-placeholder@3x.png';
		};

		// 更新購買方案彈窗顯示
		const updateShow = (show) => {
			emit('update:show', show);
		};

		// 更新方案購買讀取中
		const updateLoading = (loading) => {
			emit('update:loading', loading);
		};

		// 更新方案購買成功
		const updateSuccess = (success) => {
			emit('update:success', success);
		};

		// 更新購買中的方案
		const updateBuyingProgram = (program) => {
			emit('update:buying-program', program);
		};

		// 更新購買成功的返回值
		const updateSuccessObject = (object) => {
			emit('update:success-object', object);
		};

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊蕉幣
		const clickCoin = () => {
			router.push('/recharge');
		};
		return {
			icon,
			name,
			listEmpty,
			coin,
			banana,
			errorIconImg,
			updateShow,
            updateLoading,
			updateSuccess,
			updateBuyingProgram,
			updateSuccessObject,
			clickOverlay,
			clickCoin,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #191919;
}
.coin-value {
	color: #191919;
}
.coin-title {
	color: #f2994a;
}
.banana-value {
	color: #191919;
}
.banana-title {
	color: #969696;
}
</style>
