<template lang="pug">
.Container.py-8
	loginForm(v-if='showLoginModalType===1', @change-login-modal='showLoginModalHandle')
</template>
<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import loginForm from '@/components/loginModel/loginForm';
import registerForm from '@/components/loginModel/registerForm';
import forgotForm from '@/components/loginModel/forgotForm';
import { matomo_register_login, matomo_login_register } from '@/matomoEvent';

export default {
	components: {
		loginForm,
		registerForm,
		forgotForm,
	},
	setup() {
		const store = useStore();
		const showLoginModal = computed(() => store.state.user.showLoginModal);
		const showLoginModalType = computed(() => store.state.user.showLoginModalType);
		const showLoginModalHandle = (type) => {
			type === 1 ? matomo_register_login() : matomo_login_register();
			store.commit('user/SHOW_LOGIN_MODEL', type);
		};
		const closeModel = () => {
			store.commit('user/CLOSE_LOGIN_MODEL');
		};
		onMounted(() => {
			store.commit('user/CHANGE_LOGIN_MODEL_TYPE', 1);
		});
		return {
			store,
			showLoginModal,
			showLoginModalType,
			showLoginModalHandle,
			closeModel,
		};
	},
};
</script>

<style lang="scss" scoped></style>
