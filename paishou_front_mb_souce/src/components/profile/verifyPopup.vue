<template lang="pug">
//- 驗證彈窗
van-popup(:show='show', round, teleport='.popupTeleport', class='w-10/12 md:w-6/12')
	.verify-popup.flex.flex-col.items-center.px-6.pt-10.pb-12
		//- 圖示
		img.w-20.h-20(src='/publicAssets/img/profile/icon-shield-exclamation@3x.png')

		//- 標題
		.title.text-xl.font-bold.mt-2 验证密码

		//- 描述
		.desc.text-sm.mt-1 (验证当前帐号安全性)

		//- 表單
		van-form.w-full.mt-6(@submit='submitForm')
			//- 密碼輸入框
			input-field(v-model='verifyForm.password', label='您的密码', type='password', name='password', placeholder='请输入密码', :rules='[{ required: true, message: "请输入密码" }]')

			//- 確認與取消按鈕
			confirm-cancel-button.mt-8(native-type='submit', :loading='state.isVerifying', confirm-text='确认', cancel-text='取消', @click-cancel='clickCancel')
</template>
<script>
import { reactive, computed, toRaw } from 'vue';
import { useStore } from 'vuex';
import { verifyMobile } from '@/api';
import { matomo_bindPhone_verify } from '@/matomoTrackEvent.js';
import inputField from '@/components/inputField';
import confirmCancelButton from '@/components/confirmCancelButton';

export default {
	components: {
		inputField,
		confirmCancelButton,
	},
	props: {
		show: Boolean,
	},
	emits: ['update:show', 'verify-success', 'verify-failed'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isVerifying: false,
		});

		// Verify form
		const verifyForm = reactive({
			password: '',
		});

		// User id
		const uid = computed(() => store.state?.user?.uid || '');

		// Account
		const account = computed(() => store.state?.user?.userInfo?.user_login || '');

		// 點擊取消按鈕
		const clickCancel = () => {
			// Emit update display state
			emit('update:show', false);
		};

		// 提交表單
		const submitForm = () => {
			// Update verify state
			state.isVerifying = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				account: account.value,
				password: verifyForm.password,
			};

			// Verify mobile
			verifyMobile(payload)
				.then((res) => {
					// Emit update display state
					emit('update:show', false);

					// Validate response code
					if (res.code === 0) {
						// Emit verify success
						emit('verify-success');
					} else {
						// Emit verify failed
						emit('verify-failed');
					}

					// Revert verify state on finished
					state.isVerifying = false;
				})
				.catch(() => {
					// Emit update display state
					emit('update:show', false);

					// Emit verify failed
					emit('verify-failed');

					// Revert verify state on error
					state.isVerifying = false;
				});

			// Matomo track
			matomo_bindPhone_verify();
		};
		return {
			state,
			verifyForm,
			clickCancel,
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
.verify-popup {
	width: 100%;
	::v-deep(.van-field__control) {
		width: 100%;
		min-height: 46px;
		padding: 0 14px;
		border: 1.4px solid #f3f3f3;
	}
	::v-deep(.van-field__error-message) {
		padding: 0 10px;
	}
	::v-deep(.van-field__control) {
		color: #323233 !important;
	}
	::v-deep(.van-cell) {
		padding: 0;
	}
	.title {
		color: #a62337;
	}
	.desc {
		color: #7d7d7d;
	}
}
</style>