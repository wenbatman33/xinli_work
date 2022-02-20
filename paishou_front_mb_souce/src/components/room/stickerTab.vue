<template lang="pug">
//- 貼圖頁籤
van-tab(:name='id')
    //- 頁籤樣式
    template(#title)
        .rounded-full(:class='{ "border-selected": id === active }')
            img.w-tab-img.h-tab-img.rounded-full.object-contain(
                :src='icon'
                :class='{ "filter-grayscale opacity-60": !available }'
                @error='errorIconImg'
            )

    //- 頁籤內容
    .flex.flex-col.items-stretch
        //- 分隔線
        .w-full.h-divider.bg-divider

        //- 貼圖資訊
        .flex.flex-col.items-stretch.px-5.pt-1.pb-2(v-if='available')
            //- 到期日
            .text-xs.text-expired.text-center.pt-3.pb-2(v-if='!perpetual') {{ expiredTime }}

            //- 貼圖列表
            sticker-list(:list='stickers', @update:show='updateShow')

        //- 尚未獲得貼圖
        .flex.flex-col.items-center.py-16.px-6(v-else)
            //- 獲得貼圖
            van-button.w-auto.h-auto.px-3.py-2.rounded-full.bg-transparent.border-shop(@click='clickShop')
                .flex.flex-row.items-center
                    .text-sm.text-shop.font-bold 获得贴图
                    img.w-4.h-4.ml-1.object-contain(src='/publicAssets/img/room/icon-arrow-jump-red@3x.png')

            //- 提示
            .tex-xs.text-shop-hint.mt-2 点击后将会离开直播间
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import stickerList from '@/components/room/stickerList.vue';
import dayjs from 'dayjs';

export default {
	components: {
		stickerList,
	},
	props: {
		item: Object,
		active: Number,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

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
			return permission.value.expire_time || '';
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

		// 貼圖圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-sticker-placeholder@3x.png';
		};

		// 更新貼圖列表顯示狀態
		const updateShow = (show) => {
			emit('update:show', show);
		};

		// 點擊前往貼圖商店
		const clickShop = () => {
			router.push({
				path: '/sticker',
				query: {
					tab: id.value,
				},
			});
		};
		return {
			id,
			stickers,
			icon,
			perpetual,
			available,
			expiredTime,
			errorIconImg,
			updateShow,
			clickShop,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-tab-img {
	width: 30px;
}
.h-tab-img {
	height: 30px;
}
.filter-grayscale {
	filter: grayscale(100%);
}
.border-selected {
	border: 2px solid #ff7a00;
}
.h-divider {
	height: 1px;
}
.bg-divider {
	background: #e1e1e1;
}
.text-expired {
	color: #969696;
}
.border-shop {
	border: 1px solid #a62337;
}
.text-shop {
	color: #a62337;
}
.text-shop-hint {
	color: #969696;
}
</style>
