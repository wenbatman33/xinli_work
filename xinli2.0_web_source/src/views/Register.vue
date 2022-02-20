<template lang="pug">
.fullScreenContainer
	//- AnimationBg
	AnimationVideo
	.registerContainer
		.py-12
			img(:src='logo' :srcset="logo_2x" @click='cleanLoginData')

		RegisterFormNew

		.mt-20
			p.text-gray-500.text-sm.text-center {{t('loginForm_officialPartner')}}
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
	import { ref, defineProps } from 'vue';
	// import AnimationBg from '@/components/AnimationBg/index.vue';
	import AnimationVideo from '@/components/AnimationVideo/index.vue';

	import RegisterFormNew from '@/components/Register/RegisterFormNew.vue';
	import { useRouter } from 'vue-router';
	import { cleanLocalStorage } from '@/utils';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const logo = `${window.staticPath}/static/img/commandLogin/logo.png`;
	const logo_2x = `${window.staticPath}/static/img/commandLogin/logo@2x.png 2x`;
	const sponsor_1 = `${window.staticPath}/static/img/commandLogin/sponsor_1.png`;
	const sponsor_1_2x = `${window.staticPath}/static/img/commandLogin/sponsor_1@2x.png 2x`;
	const sponsor_2 = `${window.staticPath}/static/img/commandLogin/sponsor_2.png`;
	const sponsor_2_2x = `${window.staticPath}/static/img/commandLogin/sponsor_2@2x.png 2x`;
	const sponsor_3 = `${window.staticPath}/static/img/commandLogin/sponsor_3.png`;
	const sponsor_3_2x = `${window.staticPath}/static/img/commandLogin/sponsor_3@2x.png 2x`;
	const divider = `${window.staticPath}/static/img/commandLogin/divider.png`;
	const router = useRouter();

	const cleanLoginData = () => {
		cleanLocalStorage();
		router.push('/');
	};
</script>

<style scoped lang="scss">
	.registerContainer {
		margin: 0 auto;
		width: 320px !important;
		max-width: 350px !important;
		position: relative;
		z-index: 1;
	}
</style>
