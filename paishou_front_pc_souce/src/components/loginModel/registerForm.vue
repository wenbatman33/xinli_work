<template lang="pug">
.w-full.FLEX_R
	.registerDepiction.relative.pt-32(class='w-1/2')
		h2.text-white.text-center 已有帐号了？
		h2.text-white.text-center 快登入拍手，享受更多会员服务！
		.text-center.mt-4
			button.w-40.rounded-full.border.border-white.text-white.py-2(@click='gotoLogin') 登入
		.text-sm.text-white.text-center.mt-2 - 点击进入登入流程 -
		.monkey.w-full.text-center.absolute.bottom-0
			img(src='/publicAssets/img/v3/img-wretched-orangutan-2.png', srcset='/publicAssets/img/v3/img-wretched-orangutan-2@2x.png 2x')
	.registerForm.pt-16.px-12(class='w-1/2')
		h2.text-psV3Red 拍手注册
		.text-xs.text-gray-500 亲爱的用户，欢迎回来
		.flex.justify-center.pt-4
			a-form.w-full(:model='registerForm', layout='vertical' :rules='RegisterFormRules', @submit='submitRegisterForm')
				.grid.grid-cols-2.gap-2
					.col-span-1
						a-form-item(name='user_login', label='手机号码')
							a-input(v-model:value='registerForm.user_login', :autocomplete='registerForm.remember', placeholder='请输入手机号码')
					.col-span-1
						a-form-item(name='invite_code', label='推荐码(非必填)')
							a-input(v-model:value='registerForm.invite_code', :autocomplete='registerForm.invite_code', placeholder='请输入推荐码(非必填)')
					.col-span-1
						a-form-item(name='user_pass', label='设定密码')
							a-input(v-model:value='registerForm.user_pass', :autocomplete='registerForm.remember', type='password', placeholder='请输入密码')
					.col-span-1
						a-form-item(name='user_pass2', label='确认密码')
							a-input(v-model:value='registerForm.user_pass2', :autocomplete='registerForm.remember', type='password', placeholder='请再次输入密码')
					.col-span-2
						a-form-item.p-0(name='code')
							.BETWEEN
								a-input(v-model:value='registerForm.code', placeholder='请输入验证码')
								button.w-24.bg-psV3Red.text-white.text-xs(type='primary', :loading='codeState.loading', :disabled='codeState.smsSendBtn', @click='getRegCodeHandle') 
									span(v-if='codeState.smsSendBtn') {{ codeState.time + ' s' }}
									span(v-if='!codeState.smsSendBtn') 获取验证码
					.col-span-2
						a-form-item
							.password_box.BETWEEN
								a-checkbox.font-semibold.text-xs.text-psV3Red(v-model:checked="registerForm.remember" @change="checkedChange") 记住密码
								span.login-form-forgot.font-semibold.text-sm.text-psV3Red.cursor-pointer(@click='forgot') 忘记密码
				a-form-item.text-center
					button.w-full.h-11.rounded-lg.bg-psV3Red.text-white(html-type='submit') 注册
				p.text-center.text-xs 注册表示您同意 
					span.text-psV3Red.cursor-pointer(@click='agreement') 用户协议
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, toRaw, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { register, getRegCode, getForgotCode, resetPass } from '@/api';
import { matomo_register_sendCode, matomo_register_forgot, matomo_register_getCode } from '@/matomoEvent';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const showLoginModal = computed(() => store.state.user.showLoginModal);
		// validator 需先宣告
		let checkPhone = async (rule, value) => {
			if (value === '') {
				return Promise.reject(new Error('请输手机号'));
			} else if (!/^(1)\d{10}$/.test(value)) {
				return Promise.reject(new Error('请输入正确的手机号'));
			} else {
				return Promise.resolve();
			}
		};
		let checkPassword = async (rule, value) => {
			if (value !== registerForm.user_pass) {
				return Promise.reject(new Error('两次输入密码不一致'));
			} else {
				return Promise.resolve();
			}
		};
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			loading: false,
		});
		const registerForm = reactive({
			user_login: '',
			user_pass: '',
			user_pass2: '',
			code: '',
			invite_code: '',
			remember: true,
		});
		const RegisterFormRules = reactive({
			user_login: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: 'change' },
			],
			user_pass: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
			user_pass2: [
				{ required: true, message: '请再次输入密码', trigger: ['change', 'blur'] },
				{ validator: checkPassword, trigger: ['change', 'blur'] },
			],
			code: [{ required: true, message: '验证码错误', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(registerForm, RegisterFormRules);

		const submitRegisterForm = (e) => {
			matomo_register_sendCode();
			e.preventDefault();
			validate()
				.then(() => {
					const payload = toRaw(registerForm);
					register(payload).then((res) => {
						store.dispatch('user/USER_LOGIN', payload).then((res) => {
							if (!registerForm.remember) {
								registerForm.user_login = '';
								registerForm.user_pass = '';
							}
						});
					});
				})
				.catch((error) => {
					console.log('error');
				});
		};
		const forgot = () => {
			matomo_register_forgot();
			if (showLoginModal.value) {
				emit('change-login-modal', 3);
			} else {
				store.commit('user/CHANGE_LOGIN_MODEL_TYPE', 3);
				router.push('/forgot');
			}
		};
		const gotoLogin = () => {
			if (showLoginModal.value) {
				emit('change-login-modal', 1);
			} else {
				store.commit('user/CHANGE_LOGIN_MODEL_TYPE', 1);
				router.push('/login');
			}
		};
		const agreement = () => {
			router.push({ path: '/about/4' });
			store.commit('user/CLOSE_LOGIN_MODEL');
		};
		const checkedChange = (e) => {
			registerForm.remember = e.target.checked;
		};
		const getRegCodeHandle = () => {
			matomo_register_getCode();
			checkPhone('', registerForm.user_login).then(() => {
				const payload = { mobile: registerForm.user_login, sign: 'dfgdfffdfddf' };
				getRegCodeEvent(payload);
			});
		};
		const getRegCodeEvent = (payload) => {
			codeState.loading = false;
			getRegCode(payload)
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
		onMounted(() => {
			if (UID.value) {
				router.push('/');
			}
		});
		return {
			UID,
			showLoginModal,
			codeState,
			registerForm,
			validateInfos,
			RegisterFormRules,
			submitRegisterForm,
			checkedChange,
			agreement,
			forgot,
			gotoLogin,
			getRegCodeHandle,
			getRegCodeEvent,
		};
	},
};
</script>

<style lang="scss" scoped>
.registerDepiction {
	min-height: 580px;
	background-image: linear-gradient(to top, #a62337, #d10828);
}
</style>
