<template lang="pug">
.w-full
	h3.text-psV3Red.mb-4 绑定邮箱 
	a-form(v-if='state.editEmailStep===1', :model='emailForm', :rules='emailFormRules')
		a-form-item(name='email')
			a-input(v-model:value='emailForm.email', autocomplete='off', placeholder='请输入邮箱', @input='emailToLowerCase')
		a-form-item(name='code')
			.BETWEEN
				a-input(v-model:value='emailForm.code', placeholder='请输入验证码')
				a-button.getCodeBtn.text-xs(type='primary', :loading='codeState.loading', :disabled='codeState.smsSendBtn', @click='getRegCodeHandle') 
					span(v-if='codeState.smsSendBtn') {{ codeState.time + ' s' }}
					span(v-if='!codeState.smsSendBtn') 获取验证信件
		.BETWEEN.my-4.text-center
			div.pr-4(class='w-1/3')
				a-button.w-full.rounded(@click='hideEmailModal', size='large') 取消
			div(class='w-2/3')
				a-button.w-full.rounded(type='primary', :disabled='state.submitDisabled', size='large',  @click='changeEmail') 确认修改
	//- -------------------------------------------------------------------------------------------------------
	.text-center(v-if='state.editEmailStep===0')
		h4.text-psV3Red.my-4 您要放弃此次行为？
		.p.my-4  您确定要取消此次行为离开此页？此次修改将不会覆盖原来的资料。
		.text-center.my-4 
			a-button.mx-2(type='primary', size='large', @click='hideEmailModal') 确定
			a-button.mx-2(@click='state.editEmailStep=1', size='large') 取消
	//- -------------------------------------------------------------------------------------------------------
	.text-center(v-if='state.editEmailStep===2')
		h4.text-psV3Red.my-4(v-if='state.firstEdit===true') 绑定邮箱完成
		h4.text-psV3Red.my-4(v-if='state.firstEdit===false') 修改邮箱完成
		.p.my-4(v-if='state.firstEdit===true')  恭喜您，绑定邮箱已成功！
		.p.my-4(v-if='state.firstEditt===false')  恭喜您，修改邮箱已成功！
		.text-center.my-4 
			a-button.mx-2(type='primary', size='large', @click='hideEmailModal') 确认
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { verifyEmail, verifyEmailSms } from '@/api';
import { matomo_bindEmail_getCode, matomo_personal_edit_email, matomo_bindEmail_sendCode } from '@/matomoEvent';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			showEmailModal: false,
			editEmailStep: 1,
			firstEdit: true,
			submitDisabled: true,
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const UID = computed(() => store.state.user.uid || '');
		const USER_EMAIL = computed(() => userInfo.value.user_email || '');
		const codeState = reactive({
			time: 600,
			smsSendBtn: false,
			loading: false,
		});
		let checkEmail = async (rule, value, callback) => {
			if (value === '') {
				return Promise.reject(new Error('请输邮箱'));
			} else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
				return Promise.reject(new Error('请输入正确邮箱'));
			} else {
				return Promise.resolve();
			}
		};
		const emailForm = reactive({
			email: '',
			code: '',
			uid: Number(UID.value),
		});
		const emailToLowerCase = (val) => {
			const toLowEmail = emailForm.email.toLowerCase();
			emailForm.email = toLowEmail;
		};
		const emailFormRules = reactive({
			email: [
				{ validator: checkEmail, message: '请输入正确邮箱', trigger: ['change', 'blur'] },
				{ required: true, message: '请输入邮箱', trigger: ['change', 'blur'] },
			],
			code: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
		});
		const getRegCodeHandle = () => {
			matomo_bindEmail_getCode();
			USER_EMAIL.value !== '' ? (state.firstEdit = false) : (state.firstEdit = true);
			checkEmail('', emailForm.email, '').then(() => {
				const payload = { email: emailForm.email };
				getRegCodeEvent(payload);
			});
		};
		const getRegCodeEvent = (payload) => {
			codeState.loading = false;
			verifyEmailSms(payload)
				.then((res) => {
					codeState.smsSendBtn = true;
					const interval = window.setInterval(() => {
						if (codeState.time-- <= 0) {
							codeState.time = 600;
							codeState.smsSendBtn = false;
							window.clearInterval(interval);
						}
					}, 1000);
				})
				.catch((error) => {
					codeState.loading = false;
					codeState.time = 600;
					codeState.smsSendBtn = false;
					message.error(error.message);
				});
		};
		const openModal = () => {
			state.showEmailModal = true;
			matomo_personal_edit_email();
		};
		const closeModal = () => {
			emailForm.email = '';
			emailForm.code = '';
			state.showEmailModal = false;
			state.editEmailStep = 1;
		};
		const hideEmailModal = () => {
			emit('hideEmailModal');
		};
		const changeEmail = (e) => {
			matomo_bindEmail_sendCode();
			e.preventDefault();
			validate()
				.then(() => {
					const payload = toRaw(emailForm);
					verifyEmail(payload).then((res) => {
						store.dispatch('user/UPDATE_USER_INFO');
						USER_EMAIL.value === '' ? message.success('绑定成功') : message.success('修改成功');
						state.editEmailStep = 2;
						// state.showEmailModal = false;
					});
				})
				.catch((error) => {
					message.error('请输入正确邮箱');
				});
		};
		const { validate, validateInfos } = useForm(emailForm, emailFormRules);
		watch(
			() => emailForm,
			(newval, oldval) => {
				newval.email === '' || newval.code === '' ? (state.submitDisabled = true) : (state.submitDisabled = false);
			},
			{ deep: true }
		);
		return {
			store,
			state,
			userInfo,
			validateInfos,
			UID,
			USER_EMAIL,
			emailForm,
			emailFormRules,
			changeEmail,
			codeState,
			getRegCodeHandle,
			getRegCodeEvent,
			openModal,
			closeModal,
			emailToLowerCase,
			hideEmailModal,
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
