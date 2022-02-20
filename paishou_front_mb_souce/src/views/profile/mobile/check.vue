<template lang="pug">
//- 綁定手機-確認頁
.mobile-check
	//- 表單
	van-form.mx-4.mt-6
		//- 手機輸入框
		input-field(:model-value='mobile', label='您的手机', name='mobile', disabled)

		//- 下一步按鈕
		submit-button.mt-12(text='更换手机号', @click='clickNext')
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';

export default {
	components: {
		inputField,
		submitButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 手機號碼
		const mobile = computed(() => {
			return store.state?.user?.userInfo?.mobile;
		});

		// 點擊下一步按鈕
		const clickNext = () => {
			router.replace('/profile/mobile/submit');
		};
		return {
			mobile,
			clickNext,
		};
	},
};
</script>
<style lang="scss" scoped>
.mobile-check {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>