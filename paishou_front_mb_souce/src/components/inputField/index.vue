<template lang="pug">
//- 輸入框物件
.input-field.flex.flex-col
	//- 標題
	.label.text-sm.font-bold {{ label }}

	//- 輸入框
	van-field.mt-1(:model-value='modelValue', :type='type || "text"', :name='name', :placeholder='placeholder', :rules='rules', :disabled='disabled', :formatter='formatter', @update:model-value='updateModelValue')
		template(#button, v-if='$slots.button')
			slot(name='button')
</template>
<script>
export default {
	props: {
		modelValue: String,
		type: String,
		label: String,
		name: String,
		placeholder: String,
		rules: Array,
		disabled: Boolean,
		formatter: Function,
	},
	emits: ['update:model-value'],
	setup(props, { emit }) {
		// 更新輸入值
		const updateModelValue = (value) => {
			emit('update:model-value', value);
		};
		return {
			updateModelValue,
		};
	},
};
</script>
<style lang="scss" scoped>
.input-field {
	width: 100%;
	::v-deep(.van-field__control) {
		width: 100%;
		padding: 0.65rem 1rem;
		border: 1.5px solid #f3f3f3;
	}
	::v-deep(.van-field__error-message) {
		padding: 0 1rem;
	}
	::v-deep(.van-field__control) {
		color: #323233 !important;
		-webkit-appearance: none;
	}
	.label {
		color: #323232;
	}
}
</style>