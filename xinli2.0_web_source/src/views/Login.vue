<template lang="pug">
.fullScreenContainer.CENTER
	//- AnimationBg
	AnimationVideo
	.loginContainer
		.py-8
			img(:src='logo' :srcset="logo_2x" @click='cleanLoginData')
			
		LoginFormNew(v-if='userStore.longinStep===""')
		ForceTwoPhaseForm(v-if='userStore.longinStep==="forceTwoPhase"')
		ForceTwoPhaseSmsForm(v-if='userStore.longinStep==="forceTwoPhaseSms"')
		ForceChangePasswordFormStep1(v-if='userStore.longinStep==="forceChangePasswordStep1"')
		ForceChangePasswordFormStep2(v-if='userStore.longinStep==="forceChangePasswordStep2"')

		.my-8
			p.text-gray-500.text-sm.text-center {{$t('loginForm_officialPartner')}}
			.grid.grid-cols-5
				.col-span-1
					img(:src='sponsor_1' :srcset='sponsor_1_2x')
				.col-span-1.flex.justify-center.items-center
					img(class='h-5' :src='divider')
				.col-span-1
					img(:src='sponsor_2' :srcset='sponsor_2_2x')
				.col-span-1.flex.justify-center.items-center
					img(class='h-5' :src='divider')
				.col-span-1
					img(:src='sponsor_3' :srcset='sponsor_3_2x')
</template>

<script setup lang="ts">
	// import AnimationBg from '@/components/AnimationBg/index.vue';
	import AnimationVideo from '@/components/AnimationVideo/index.vue';
	import LoginFormNew from '@/components/Login/LoginFormNew.vue';
	import ForceTwoPhaseForm from '@/components/Login/ForceTwoPhaseForm.vue';
	import ForceTwoPhaseSmsForm from '@/components/Login/ForceTwoPhaseSmsForm.vue';
	import ForceChangePasswordFormStep1 from '@/components/Login/ForceChangePasswordFormStep1.vue';
	import ForceChangePasswordFormStep2 from '@/components/Login/ForceChangePasswordFormStep2.vue';
	import { UserStore } from '@/store/userStore';
	import { useRouter } from 'vue-router';
	import { cleanLocalStorage } from '@/utils';
	import { onMounted } from 'vue';

	const logo = `${window.staticPath}/static/img/commandLogin/logo.png`;
	const logo_2x = `${window.staticPath}/static/img/commandLogin/logo@2x.png 2x`;
	const sponsor_1 = `${window.staticPath}/static/img/commandLogin/sponsor_1.png`;
	const sponsor_1_2x = `${window.staticPath}/static/img/commandLogin/sponsor_1@2x.png 2x`;
	const sponsor_2 = `${window.staticPath}/static/img/commandLogin/sponsor_2.png`;
	const sponsor_2_2x = `${window.staticPath}/static/img/commandLogin/sponsor_2@2x.png 2x`;
	const sponsor_3 = `${window.staticPath}/static/img/commandLogin/sponsor_3.png`;
	const sponsor_3_2x = `${window.staticPath}/static/img/commandLogin/sponsor_3@2x.png 2x`;
	const divider = `${window.staticPath}/static/img/commandLogin/divider.png`;
	const userStore = UserStore();
	const router = useRouter();
	const cleanLoginData = () => {
		cleanLocalStorage();
		router.push('/');
	};
</script>

<style scoped lang="scss">
	.loginContainer {
		margin: 0 auto;
		width: 320px !important;
		max-width: 350px !important;
		position: relative;
		z-index: 1;
	}
</style>
