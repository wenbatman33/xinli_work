<template lang="pug">
a-form(:model='editMobileForm', :rules='editMobileFormRules')
	a-form-item(name='account')
		a-input(v-model:value='editMobileForm.account', autocomplete='off', placeholder='请输入手机号码')
	a-form-item(name='code')
		.BETWEEN
			a-input(v-model:value='editMobileForm.code', placeholder='请输入验证码')
			a-button.getCodeBtn.text-xs(type='primary', :loading='codeState.loading', :disabled='codeState.smsSendBtn', @click='getRegCodeHandle') 
				span(v-if='codeState.smsSendBtn') {{ codeState.time + ' s' }}
				span(v-if='!codeState.smsSendBtn') 获取验证码
	.text-center
		a-button.mx-2(@click='backStep0', size='large') 取消
		a-button.mx-2(type='primary', size='large', @click='changeMobile', :disabled='state.changeMobileDisabled') 确定修改
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { verifyMobileSms, verifyMobileBind } from '@/api';
import { matomo_bindPhone_getCode, matomo_bindPhone_sendCode } from '@/matomoEvent';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			changeMobileDisabled: true,
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
		const editMobileForm = reactive({
			account: '',
			code: '',
		});
		const editMobileFormRules = reactive({
			account: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: ['change', 'blur'] },
			],
			password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(editMobileForm, editMobileFormRules);
		//
		const getRegCodeHandle = () => {
			matomo_bindPhone_getCode();
			checkPhone('', editMobileForm.account, '').then(() => {
				const payload = { account: editMobileForm.account };
				getRegCodeEvent(payload);
			});
		};
		const getRegCodeEvent = (payload) => {
			codeState.loading = false;
			verifyMobileSms(payload)
				.then((res) => {
					codeState.smsSendBtn = true;
					const interval = window.setInterval(() => {
						if (codeState.time-- <= 0) {
							codeState.time = 60;
							codeState.smsSendBtn = false;
							window.clearInterval(interval);
						}
					}, 1000);
				})
				.catch((error) => {
					codeState.loading = false;
					codeState.time = 60;
					codeState.smsSendBtn = false;
					message.error(error.message);
				});
		};
		const backStep0 = () => {
			emit('backStep0');
		};
		const changeMobile = (e) => {
			matomo_bindPhone_sendCode();
			e.preventDefault();
			validate()
				.then(() => {
					// toRaw() 還原 reactive ref 物件
					const payload = toRaw(editMobileForm);
					verifyMobileBind(payload).then((res) => {
						if (res.data.success === true) {
							store.dispatch('user/UPDATE_USER_INFO');
							emit('step4');
						} else {
							message.error('手机号修改失败');
						}
					});
				})
				.catch((error) => {
					message.error(error.message);
				});
		};
		watch(
			() => editMobileForm,
			(newval, oldval) => {
				newval.account === '' || newval.code === '' ? (state.changeMobileDisabled = true) : (state.changeMobileDisabled = false);
			},
			{ deep: true }
		);
		return {
			store,
			state,
			editMobileForm,
			editMobileFormRules,
			validateInfos,
			codeState,
			backStep0,
			getRegCodeHandle,
			getRegCodeEvent,
			changeMobile,
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
