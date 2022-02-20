<template lang="pug">
//- 目前沒有紀錄
.flex.flex-col.items-center
	//- 圖示
	img(v-if='!hideIcon', class='w-1/2 md:w-1/3', :src='icon || "/publicAssets/img/icon-null@3x.png"')

	//- 標題
	.text-sm.text-title.text-center.whitespace-pre-wrap.mt-6(v-html='text || "目前没有紀錄"')

	//- 按鈕
	van-button.button.rounded-full.mt-6(v-if='button', @click='clickButton')
		.px-4.py-2
			.text-sm.font-bold {{ button }}
</template>
<script>
export default {
	props: {
		icon: String,
		text: String,
		button: String,
		hideIcon: Boolean,
	},
	emits: ['click-button'],
	setup(props, { emit }) {
		const clickButton = () => {
			emit('click-button');
		};
		return {
			clickButton,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #7D7D7D;
}
.button {
	width: unset;
	height: unset;
	padding: 0;
	color: #A62337;
	border: 1px solid #A62337;
	background: transparent;
}
</style>