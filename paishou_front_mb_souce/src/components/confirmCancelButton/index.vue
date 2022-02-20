<template lang="pug">
//- 確認與取消按鈕
.confirm-cancel.grid.gap-4.px-4(:class='{ "grid-cols-2": confirmText && cancelText }')
	//- 確認按鈕
	van-button.confirm-button.rounded-full.shadow(v-if='confirmText', :native-type='nativeType || "button"', :loading='loading', @click='clickConfirm') 
		.text-sm.p-2 {{ confirmText }}
		template(#loading)
			.flex.flex-row.items-center.p-2
				van-loading.w-4.h-4(color='#ffffff', type='spinner')
				.text-sm.ml-2 {{ confirmText }}

	//- 取消按鈕
	van-button.cancel-button.rounded-full.shadow(v-if='cancelText', @click='clickCancel') 
		.text-sm.p-2 {{ cancelText }}
</template>
<script>
export default {
	props: {
		loading: Boolean,
		nativeType: String,
		confirmText: String,
		cancelText: String,
	},
	emits: ['click-confirm', 'click-cancel'],
	setup(props, { emit }) {
		// 點擊確認按鈕
		const clickConfirm = () => {
			emit('click-confirm');
		};

		// 點擊取消按鈕
		const clickCancel = () => {
			emit('click-cancel');
		};
		return {
			clickConfirm,
			clickCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.confirm-cancel {
	width: 100%;
	.confirm-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #ffffff;
		border: transparent;
		background: #a62337;
	}
	.cancel-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #a62337;
		border: transparent;
		background: transparent;
	}
}
</style>