<template lang="pug">
//- 驗證按鈕
van-button.verify-button.rounded-md(:native-type='nativeType || "button"', :loading='loading', :disabled='disabled', @click='onClickVerify')
	.text-sm.p-2 {{ text }}
	template(#loading)
		.flex.flex-row.items-center.p-2
			van-loading.w-4.h-4(color='#ffffff', type='spinner')
			.text-sm.ml-2 {{ text }}
</template>
<script>
export default {
	props: {
		nativeType: String,
		loading: Boolean,
		disabled: Boolean,
		text: String,
	},
	emits: ['click'],
	setup(props, { emit }) {
		// 點擊驗證按鈕
		const onClickVerify = () => {
			emit('click');
		};
		return {
			onClickVerify,
		};
	},
}
</script>
<style lang="scss" scoped>
.verify-button {
    width: 100%;
    height: unset;
    padding: 0;
    color: #ffffff;
    border-color: transparent;
    background: #a62337;
}
</style>