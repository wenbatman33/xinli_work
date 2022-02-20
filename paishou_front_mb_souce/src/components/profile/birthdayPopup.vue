<template lang="pug">
//- 生日彈窗
van-popup(:show='show', round, teleport='.popupTeleport', class='w-10/12 md:w-6/12')
	.birthday-popup.pb-6
		//- 日期選擇器
		van-datetime-picker.mx-4.mt-6(v-model='state.selected', type='date', :min-date='minDate', :max-date='maxDate', :show-toolbar='false')

		//- 確認與取消按鈕
		confirm-cancel-button.mt-8(:loading='state.editInfoLoading', confirm-text='确认', cancel-text='取消', @click-confirm='clickConfirm', @click-cancel='clickCancel')
</template>
<script>
import { reactive, computed } from 'vue';
import confirmCancelButton from '@/components/confirmCancelButton';
import dayjs from 'dayjs';

export default {
	components: {
		confirmCancelButton,
	},
	props: {
		show: Boolean,
		selected: Date,
	},
	emits: ['update:show', 'update:selected'],
	setup(props, { emit }) {
		// Component state
		const state = reactive({
			selected: props.selected,
		});

		// 最小可選擇日期
		const minDate = computed(() => dayjs().add(-100, 'y').toDate());

		// 最大可選擇日期
		const maxDate = computed(() => new Date(Date.now()));

		// 點擊儲存按鈕
		const clickConfirm = () => {
			emit('update:selected', state.selected);
			emit('update:show', false);
		};

		// 點擊取消按鈕
		const clickCancel = () => {
			emit('update:show', false);
		};
		return {
			state,
			minDate,
			maxDate,
			clickConfirm,
			clickCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.birthday-popup {
	width: 100%;
}
</style>