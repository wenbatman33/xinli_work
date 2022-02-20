<template>
	<div class="container pb-4 FLEX_C">
		<div class="container p-4 FLEX_C loginBox" v-if="showCheck">
			<h5 class="mb-1 ml-4">{{ $t('login_resetPassword_02') }}</h5>
			<van-form @submit="handelCheckSubmit">
				<van-field
					v-model="password"
					type="password"
					name="password"
					:label="$t('login_resetPassword_03')"
					:placeholder="$t('login_resetPassword_03')"
					:rules="[{ required: true, message: $t('login_resetPassword_04') }]"
				/>

				<van-button class="mt-6" round block type="info" native-type="submit">
					{{ $t('login_resetPassword_05') }}
				</van-button>
			</van-form>
		</div>
		<div class="container p-4 FLEX_C loginBox" v-if="showReset">
			<h5 class="mb-1 ml-4">{{ $t('login_resetPassword_01') }}</h5>
			<van-form @submit="handelResetSubmit">
				<van-field
					v-model="newPassword"
					type="password"
					name="newPassword"
					:label="$t('login_resetPassword_06')"
					:placeholder="$t('login_resetPassword_06')"
					:rules="[
						{ required: true, message: $t('login_resetPassword_07') },
						{ validator: validateLength, message: $t('login_resetPassword_08') },
					]"
				/>
				<van-field
					v-model="confirmNewPassword"
					type="password"
					name="confirmNewPassword"
					:label="$t('login_resetPassword_09')"
					:rulesplaceholder="$t('login_resetPassword_09')"
					:rules="[
						{ required: true, message: $t('login_resetPassword_10') },
						{ validator: validatePass, message: $t('login_resetPassword_11') },
					]"
				/>

				<van-button class="mt-6" round block type="info" native-type="submit">{{ $t('login_resetPassword_05') }} </van-button>
			</van-form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { Notify } from 'vant';
	// api
	import { checkPassword, resetPassword } from '@/api';
	// i18n
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	//api
	// ref
	const password = ref('');
	const newPassword = ref('');
	const confirmNewPassword = ref('');
	const showCheck = ref(true);
	const showReset = ref(false);

	// methods
	const handelCheckSubmit = (values) => {
		checkPassword({
			password: values.password,
		}).then((res) => {
			if (res.data.statusCode === 0) {
				showCheck.value = false;
				showReset.value = true;
				Notify({ type: 'success', message: t('login_resetPassword_13') });
			}
		});
	};
	const handelResetSubmit = (values) => {
		resetPassword({
			newPassword: values.newPassword,
			confirmNewPassword: values.confirmNewPassword,
		})
			.then((res) => {
				Notify({ type: 'success', message: t('login_resetPassword_12') });
			})
			.finally(() => {
				{
					showCheck.value = true;
					showReset.value = false;
				}
			});
	};

	const validatePass = async (values) =>
		new Promise((resolve) => {
			if (newPassword.value !== confirmNewPassword.value) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	const validateLength = (values: string) => {
		if (values.length < 8 || values.length > 20) {
			return false;
		}
	};
</script>
<style lang="less" scoped>
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
