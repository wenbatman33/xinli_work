<template lang="pug">
//- 購買方案列表
.grid.grid-cols-1.gap-3.items-stretch.justify-stretch(:class='$attrs.class')
    //- 購買方案物件
    program-item(
        v-for='item in list'
        :item='item'
        :loading='loading'
		:buying-program='buyingProgram'
        @update:show='updateShow'
        @update:loading='updateLoading'
        @update:success='updateSuccess'
		@update:buying-program='updateBuyingProgram'
		@update:success-object='updateSuccessObject'
    )
</template>
<script>
import programItem from '@/components/sticker/programItem.vue';

export default {
	components: {
		programItem,
	},
	props: {
		list: Array,
		loading: Boolean,
		buyingProgram: Object,
	},
	emits: ['update:show', 'update:loading', 'update:success', 'update:buying-program', 'update:success-object'],
	setup(props, { emit }) {
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
		return {
			updateShow,
			updateLoading,
            updateSuccess,
			updateBuyingProgram,
			updateSuccessObject,
		};
	},
};
</script>
