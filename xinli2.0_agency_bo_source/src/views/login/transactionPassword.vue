<template>
	<div class="container pb-4 FLEX_C">
		<div class="container p-4 FLEX_C loginBox" v-if="state.showCheck">
			<van-form @submit="onCheckSubmit" validate-trigger="onSubmit">
				<van-field
					v-model="password"
					type="password"
					name="password"
					:label="$t('login_transactionPassword_01')"
					:placeholder="$t('login_transactionPassword_02')"
					:rules="[{ required: true, message: $t('login_transactionPassword_03') }]"
				/>
				<van-field
					v-model="newPassword"
					type="password"
					name="newPassword"
					:label="$t('login_transactionPassword_04')"
					:placeholder="$t('login_transactionPassword_05')"
					:rules="[{ required: true, message: $t('login_transactionPassword_05') }]"
				/>
				<van-field
					v-model="confirmNewPassword"
					type="password"
					name="confirmNewPassword"
					:label="$t('login_transactionPassword_06')"
					:placeholder="$t('login_transactionPassword_07')"
					:rules="[{ required: true, message: $t('login_transactionPassword_07') }]"
				/>
				<van-button class="mt-48" round block type="info" native-type="submit">
					{{ $t('login_transactionPassword_08') }}
				</van-button>
			</van-form>
		</div>
		<div class="container p-4 FLEX_C loginBox" v-if="state.showReset">
			<van-form @submit="onResetSubmit" validate-trigger="onSubmit">
				<van-field
					v-model="transPassword"
					type="password"
					name="transPassword"
					:label="$t('login_transactionPassword_09')"
					:placeholder="$t('login_transactionPassword_10')"
					:rules="[{ required: true, message: $t('login_transactionPassword_10') }]"
				/>
				<van-field
					v-model="newTransPassword"
					type="password"
					name="newTransPassword"
					:label="$t('login_transactionPassword_11')"
					:placeholder="$t('login_transactionPassword_12')"
					:rules="[
						{ required: true, message: $t('login_transactionPassword_12') },
						{ validator: validateLength, message: $t('login_transactionPassword_13') },
					]"
				/>
				<van-field
					v-model="confirmNewTransPassword"
					type="password"
					name="confirmNewTransPassword"
					:label="$t('login_transactionPassword_14')"
					:placeholder="$t('login_transactionPassword_15')"
					:rules="[
						{ required: true, message: $t('login_transactionPassword_15') },
						{ validator: validatePass, message: $t('login_transactionPassword_16') },
					]"
				/>

				<van-button class="mt-48" round block type="info" native-type="submit">
					{{ $t('login_transactionPassword_08') }}
				</van-button>
			</van-form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { checkPassword, reserPassword } from '@/api';
	import { ref, reactive } from 'vue';
	import { Toast } from 'vant';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	const password = ref('');
	const newPassword = ref('');
	const confirmNewPassword = ref('');
	const transPassword = ref('');
	const newTransPassword = ref('');
	const confirmNewTransPassword = ref('');
	const state = reactive({
		showCheck: true,
		showReset: false,
	});
	const onCheckSubmit = async (values) => {
		try {
			ResSuccess(values);
			state.navBarTitle = t('login_transactionPassword_18');
			// Post login
			// const response = await checkPassword({
			//   password: values.password,
			// });
			// console.log("response", response);
			// response.data.data && ResSuccess(response.data.data);
		} catch (e) {
			// Exception handled by interceptors
		} finally {
			// Turn loading off
			// loginLoading.value = false;
		}
	};
	const onResetSubmit = async (values) => {
		try {
			// Post login
			console.log(values);
			Toast({ message: t('login_transactionPassword_19') });
			// const response = await reserPassword({
			//   newPassword: values.newPassword,
			//   confirmNewPassword: values.confirmNewPassword,
			// });
			// console.log("response", response);
		} catch (e) {
			// Exception handled by interceptors
		} finally {
			state.showCheck = true;
			state.showReset = false;
		}
	};
	const ResSuccess = (data: any) => {
		console.log(data);
		state.showCheck = false;
		state.showReset = true;
	};
	const validatePass = async (values) =>
		new Promise((resolve) => {
			if (newTransPassword.value !== confirmNewTransPassword.value) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	const validateLength = (values: string) => {
		if (values.length !== 6) {
			return false;
		}
	};
</script>
<style lang="less" scoped>
	.van-cell {
		display: inherit;
	}
	.loginBox {
		.van-button--info {
			color: #fff;
			background-color: #c60000;
		}
		.van-cell {
			background-color: #fff0;
		}
		.van-field__control {
			color: rgba(255, 255, 255, 0.904);
		}
	}
</style>
