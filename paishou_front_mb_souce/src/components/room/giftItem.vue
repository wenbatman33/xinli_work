<template lang="pug">
//- 禮物物件
van-button.w-auto.h-auto.px-1.py-4.mr-2.rouunded.bg-transparent.border-gift-item(:class='{ "selected": selected }', @click='clickGift')
	//- 物件內容
	.flex.flex-col.items-center
		//- 禮物圖示
		.relative.w-12.h-12
			//- 圖示
			img.relative.z-10.w-full.h-full.object-cover(:src='icon', @error='errorIconImg')

			//- 數量
			.absolute.z-20.left-0.right-0.bottom-0.flex.justify-center(v-if='quantity > 0')
				.text-xs.text-quantity.whitespace-nowrap.bg-quantity.p-quantity.rounded {{ quantity }}

		//- 禮物名稱
		.text-xs.text-name.whitespace-nowrap.font-bold.mt-2 {{ name }}
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	props: {
		item: Object,
		selected: Boolean,
	},
	emits: ['click'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// 禮物圖示
		const icon = computed(() => {
			return props?.item?.gifticon || '';
		});

		// 禮物數量
		const quantity = computed(() => {
			if (!store.getters['user/IS_LOGIN']) {
				return 0;
			} else {
				return props?.item?.quantity || 0;
			}
		});

		// 禮物名稱
		const name = computed(() => {
			return props?.item?.giftname || '';
		});

		// 禮物圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-gift-placeholder@3x.png';
		};

        // 點擊禮物
        const clickGift = () => {
            emit('click');
        }
		return {
			icon,
			quantity,
			name,
			errorIconImg,
            clickGift,
		};
	},
};
</script>
<style lang="scss" scoped>
.border-gift-item {
	border: transparent;
	&.selected {
		border: 1px solid #f8b62d;
	}
}
.bg-quantity {
	background: #F8B62D;
}
.p-quantity {
	padding: 1px 6px;
}
.text-quantity {
	font-size: 8px;
	line-height: 8px;
	color: #ffffff;
}
.text-name {
	color: #191919;
}
</style>
