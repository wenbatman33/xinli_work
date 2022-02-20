<template lang="pug">
.w-full.FLEX_R
	.loginForm.pt-28.px-12(class='w-1/2')
		h2.text-psV3Red 拍手登入
		.text-xs.text-gray-500 亲爱的用户，欢迎回来
		.flex.justify-center.pt-4
			a-form.w-full(layout='vertical' :model='loginForm', :rules='LoginFormRules', @submit='submitLoginForm')
				a-form-item.my-4(name='user_login', label='手机号码')
					a-input.w-full(v-model:value='loginForm.user_login', :autocomplete='loginForm.remember', placeholder='请输入手机号码')
				a-form-item.my-4(name='user_pass', label='您的密码')
					a-input.w-full(v-model:value='loginForm.user_pass',  :autocomplete='loginForm.remember', type='password', placeholder='请输入密码')
				a-form-item.my-4
					.password_box.BETWEEN
						a-checkbox.font-semibold.text-xs.text-psV3Red(v-model:checked="loginForm.remember" @change="checkedChange") 记住密码
						span.loginFormForgot.font-semibold.text-sm.text-psV3Red.cursor-pointer(@click='forgot') 忘记密码
				a-form-item.my-4.text-center.w-full
					button.w-full.h-11.rounded-lg.bg-psV3Red.text-white(html-type='submit') 登录
				p.text-center 登彔表示您同意 
					span.text-psV3Red(@click='agreement') 用户协议
	.loginDepiction.relative.pt-32(class='w-1/2')
		h2.text-white.text-center 还未有帐号吗？
		h2.text-white.text-center 快加入拍手，体验体育竞技的魅力！
		.text-center.mt-4
			button.w-40.rounded-full.border.border-white.text-white.py-2(@click='gotoRegister') 注册
		.text-sm.text-white.text-center.mt-2 - 点击进入注册流程 -
		.monkey.w-full.text-center.absolute.bottom-0
			img(src='/publicAssets/img/v3/img-wretched-orangutan-2.png', srcset='/publicAssets/img/v3/img-wretched-orangutan-2@2x.png 2x')


</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, toRaw, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { matomo_login_forgot } from '@/matomoEvent';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const showLoginModal = computed(() => store.state.user.showLoginModal);
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
		const loginForm = reactive({
			user_login: '',
			user_pass: '',
			remember: true,
		});
		const LoginFormRules = reactive({
			user_login: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: ['change', 'blur'] },
			],
			user_pass: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(loginForm, LoginFormRules);

		const checkedChange = (e) => {
			loginForm.remember = e.target.checked;
		};
		const agreement = () => {
			router.push({ path: '/about/4' });
			store.commit('user/CLOSE_LOGIN_MODEL');
		};
		const gotoRegister = () => {
			if (showLoginModal.value) {
				emit('change-login-modal', 2);
			} else {
				store.commit('user/CHANGE_LOGIN_MODEL_TYPE', 2);
				router.push('/register');
			}
		};
		const forgot = () => {
			matomo_login_forgot();
			if (showLoginModal.value) {
				emit('change-login-modal', 3);
			} else {
				store.commit('user/CHANGE_LOGIN_MODEL_TYPE', 3);
				router.push('/forgot');
			}
		};

		const submitLoginForm = (e) => {
			e.preventDefault();
			validate()
				.then(() => {
					// toRaw() 還原 reactive ref 物件
					// console.log(toRaw(loginForm));
					const payload = toRaw(loginForm);
					store.dispatch('user/USER_LOGIN', payload).then((res) => {
						if (!loginForm.remember) {
							loginForm.user_login = '';
							loginForm.user_pass = '';
						}
					});
				})
				.catch((error) => {
					console.log('error');
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
			loginForm,
			validateInfos,
			LoginFormRules,
			checkedChange,
			agreement,
			forgot,
			submitLoginForm,
			gotoRegister,
		};
	},
};
</script>

<style lang="scss" scoped>
.loginDepiction {
	min-height: 580px;
	background-image: linear-gradient(to top, #a62337, #d10828);
}
</style>
