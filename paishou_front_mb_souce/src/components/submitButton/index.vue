<template lang="pug">
//- 提交按鈕
van-button.submit-button.rounded-md(:native-type='nativeType || "button"', :loading='loading', :disabled='disabled', @click='onClickSubmit')
	//- 按鈕文字
	.text-base.font-bold.p-2 {{ text }}
	template(#loading)
		.flex.flex-row.items-center.p-2
			van-loading.w-6.h-6(color='#ffffff', type='spinner')
			.text-base.font-bold.ml-2 {{ text }}
</template>
<script>
export default {
	props: ['native-type', 'loading', 'disabled', 'text'],
	emits: ['click'],
	setup(props, { emit }) {
		// 點擊提交按鈕
		const onClickSubmit = () => {
			emit('click');
		};
		return {
			onClickSubmit,
		};
	},
};
</script>
<style lang="scss" scoped>
.submit-button {
	width: 100%;
	height: unset;
	padding: 0;
	color: #ffffff;
	border-color: transparent;
	background: linear-gradient(262deg, #df2f4a, #a62337);
}
</style>