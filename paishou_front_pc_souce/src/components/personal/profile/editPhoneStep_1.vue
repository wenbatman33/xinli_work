<template lang="pug">
a-form(:model='verifyMobileForm', :rules='verifyMobileFormRules', autocomplete='off', @submit='submitVerifyMobileForm')
	.text-center
		.text-gray-500 为了您的帐号安全，请先执行帐号验证。
	a-form-item.my-4(name='account')
		a-input(v-model:value='verifyMobileForm.account', autocomplete='off', :readonly='state.accountReadonly', @focus='state.accountReadonly=false', placeholder='请输入手机号码')
	a-form-item.my-4(name='password')
		a-input(v-model:value='verifyMobileForm.password', type='password', autocomplete='off', :readonly='state.passwordReadonly', @focus='state.passwordReadonly=false', placeholder='请输入密码')
	.text-center
		a-button.mx-2(@click='backStep0', size='large') 取消
		a-button.mx-2(type='primary', @click='submitVerifyMobileForm' :disabled='state.submitDisabled', size='large') 下一步
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { verifyMobile } from '@/api';
import { matomo_bindPhone_verify } from '@/matomoEvent';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			accountReadonly: true,
			passwordReadonly: true,
			submitDisabled: true,
		});
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			loading: false,
		});
		// validator 需先宣告
		let checkPhone = async (rule, value, callback) => {
			if (value === '') {
				return Promise.reject(new Error('请输手机号'));
			} else if (!/^(1)\d{10}$/.test(value)) {
				return Promise.reject(new Error('请输入正确的手机号'));
			} else {
				return Promise.resolve();
			}
		};
		const verifyMobileForm = reactive({
			account: '',
			password: '',
		});
		const verifyMobileFormRules = reactive({
			account: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: ['change', 'blur'] },
			],
			password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(verifyMobileForm, verifyMobileFormRules);
		//
		const onSelect = () => {
			// console.log('onSelect');
		};
		const backStep0 = () => {
			emit('backStep0');
		};
		watch(
			() => verifyMobileForm,
			(newval, oldval) => {
				newval.account === '' || newval.password === '' ? (state.submitDisabled = true) : (state.submitDisabled = false);
			},
			{ deep: true }
		);
		const submitVerifyMobileForm = (e) => {
			matomo_bindPhone_verify();
			e.preventDefault();
			validate()
				.then(() => {
					// toRaw() 還原 reactive ref 物件
					const payload = toRaw(verifyMobileForm);
					verifyMobile(payload).then((res) => {
						if (res.data.success === true) {
							emit('step2');
							message.success('身份验证成功');
						} else {
							message.error('验证失败');
						}
					});
				})
				.catch((error) => {
					message.error(error.message);
				});
		};
		return {
			store,
			state,
			verifyMobileForm,
			verifyMobileFormRules,
			validateInfos,
			codeState,
			submitVerifyMobileForm,
			backStep0,
			onSelect,
		};
	},
};
</script>
<style lang="scss" scoped>
.editBtn {
	cursor: pointer;
	border-radius: 20px;
	color: #a62337;
	background: #fff;
	padding: 0 8px;
	border: 1px solid #a62337;
	font-size: 12px;
}
.confirmBtn {
	cursor: pointer;
	border-radius: 4px;
	outline: none;
	padding: 5px 20px;
	background: #a62337;
	border: 1px solid #a62337;
	color: #fff;
}
.cancelBtn {
	cursor: pointer;
	border-radius: 4px;
	outline: none;
	padding: 5px 20px;
	background: #fff;
	border: 1px solid #a62337;
	color: #a62337;
}
.bindBtn {
	cursor: pointer;
	border-radius: 20px;
	color: #ff9a00;
	background: #ff9a00;
	padding: 0 8px;
	border: 1px solid #ff9a00;
	font-size: 12px;
	color: #fff;
}
</style>
