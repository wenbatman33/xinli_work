<template lang="pug">
//- 獎項物件
.grid.grid-cols-item.gap-2.items-center.p-4.bg-item.rounded-item
    //- 編號
    .text-index {{ index }}

    //- 圖示
    img.w-10.h-10.object-contain(:src='icon', @error='errorIconImg')

    //- 名稱
    .text-name {{ name }}
</template>
<script>
import { computed } from 'vue';

export default {
	props: {
		item: Object,
		index: Number,
	},
	setup(props) {
		// 圖示
		const icon = computed(() => {
			return props?.item?.slide_pic || '';
		});

		// 名稱
		const name = computed(() => {
			return props?.item?.slide_name || '';
		});

		// 圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/event/luckyspin/icon-redpack@3x.png';
		};
		return {
			icon,
			name,
			errorIconImg,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-item {
	grid-template-columns: auto auto 1fr;
}
.bg-item {
	background: #8a0010;
}
.rounded-item {
	border-radius: 8px;
}
.text-index {
	font-family: Impact;
	font-style: normal;
	font-weight: 900;
	font-size: 18px;
	line-height: 18px;
	color: #f8b62d;
}
.text-name {
	font-family: PingFang TC;
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 18px;
	color: #ffffff;
}
</style>
