<template lang="pug">
//- 登入
.login
	//- 背景圖片
	.pic-container
		//- 登入背景
		img.login-pic(src='/publicAssets/img/login/icon-login@3x.png', :class='loginClass')

		//- 註冊背景
		img.register-pic(src='/publicAssets/img/login/icon-register@3x.png', :class='registerClass')

		//- 忘記密碼背景
		img.forget-pic(src='/publicAssets/img/login/icon-forget@3x.png', :class='forgetClass')

	//- 內容
	.content
		//- 導覽欄
		nav-bar(left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft', hide-underline)

		//- 頁籤
		.flex.flex-row.items-center.px-2.mt-6
			//- 登入按鈕
			van-button.tab-button.rounded-md(v-if='isLoginActive || isRegisterActive', @click='clickLogin')
				.text-lg.m-2(:class='loginClass') 登入

			//- 分隔線
			.tab-divider.h-4.mx-1(v-if='isLoginActive || isRegisterActive')

			//- 註冊按鈕
			van-button.tab-button.rounded-md(v-if='isLoginActive || isRegisterActive', @click='clickRegister') 
				.text-lg.m-2(:class='registerClass') 注册

			//- 忘記密碼按鈕
			van-button.tab-button.rounded-md(v-if='isForgetActive')
				.text-lg.m-2(:class='forgetClass') 忘记密码

		//- 登入表單
		login-form.px-4(v-if='isLoginActive', @click-forget='clickForget')

		//- 註冊表單
		register-form.px-4(v-if='isRegisterActive')

		//- 忘記密碼表單
		forget-form.px-4(v-if='isForgetActive')
</template>

<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { matomo_login_forget, matomo_login_register, matomo_forget_cancel, matomo_register_login } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import loginForm from '@/components/login/loginForm.vue';
import registerForm from '@/components/login/registerForm.vue';
import forgetForm from '@/components/login/forgetForm.vue';

export default {
	components: {
		navBar,
		loginForm,
		registerForm,
		forgetForm,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			activeForm: 'login',
		});

		// 是否啟用登入表單
		const isLoginActive = computed(() => {
			return state.activeForm === 'login';
		});

		// 是否啟用註冊表單
		const isRegisterActive = computed(() => {
			return state.activeForm === 'register';
		});

		// 是否啟用忘記密碼表單
		const isForgetActive = computed(() => {
			return state.activeForm === 'forget';
		});

		// 登入元件 classes
		const loginClass = computed(() => {
			return {
				active: isLoginActive.value,
			};
		});

		// 註冊元件 classes
		const registerClass = computed(() => {
			return {
				active: isRegisterActive.value,
			};
		});

		// 忘記密碼元件 classes
		const forgetClass = computed(() => {
			return {
				active: isForgetActive.value,
			};
		});

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			if (state.activeForm === 'forget') {
				state.activeForm = 'login';
				matomo_forget_cancel();
			} else {
				router.go(-1);
			}
		};

		// 點擊註冊
		const clickLogin = () => {
			state.activeForm = 'login';
			matomo_register_login();
		};

		// 點擊登入
		const clickRegister = () => {
			state.activeForm = 'register';
			matomo_login_register();
		};

		// 點擊忘記密碼
		const clickForget = () => {
			state.activeForm = 'forget';
			matomo_login_forget();
		};
		return {
			state,
			isLoginActive,
			isRegisterActive,
			isForgetActive,
			loginClass,
			registerClass,
			forgetClass,
			clickLeft,
			clickLogin,
			clickRegister,
			clickForget,
		};
	},
};
</script>
<style lang="scss" scoped>
.login {
	position: relative;
	width: 100%;
	min-height: 100%;
	background: #fcfcfc;
	.pic-container {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.login-pic {
		position: absolute;
		width: 80%;
		left: 10%;
		bottom: -100%;
		transition: bottom 0.6s;
		&.active {
			bottom: 0%;
		}
	}
	.register-pic {
		position: absolute;
		width: 50%;
		right: -100%;
		transition: right 0.6s;
		&.active {
			right: 0%;
		}
	}
	.forget-pic {
		position: absolute;
		width: 80%;
		left: 10%;
		bottom: -100%;
		transition: bottom 0.6s;
		&.active {
			bottom: 0%;
		}
	}
	.content {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.tab-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #969696;
		border: transparent;
		background: rgba(255, 255, 255, 0.75);
		font-weight: bold;
		.active {
			color: #a62337;
		}
	}
	.tab-divider {
		width: 1px;
		background: #e1e1e1;
	}
}
</style>
