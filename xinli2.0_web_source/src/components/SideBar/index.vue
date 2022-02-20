<template lang="pug">
.sideBar.h-full.bg-white.fixed.top-0.CENTER_C(v-if='showSideBar' :class='"w-[28px] right-[0px] z-[2]"')
	.my-4.py-4.border-b
		SvgIcon.w-5.h-5.text-paimary.cursor-pointer(:name='"#Client_Service"')
	.my-4.py-4.border-b
		SvgIcon.w-5.h-5.text-paimary.cursor-pointer(:name='"#Wallet"' @click='showWallet')

	.my-12
		SvgIcon.w-5.h-5.text-paimary.cursor-pointer(:name='"#Backtotop"' @click='backTop')

</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { useRoute, useRouter } from 'vue-router';

	const systemStore = SystemStore();
	const route = useRoute();
	const router = useRouter();
	const showSideBar = computed(
		() =>
			route.name !== 'Maintenance' &&
			route.name !== 'Forbidden' &&
			route.name !== 'Network' &&
			route.name !== 'Login' &&
			route.name !== 'Register' &&
			route.name !== 'Forget'
	);
	const showWallet = () => {
		systemStore.walletToggle(true);
	};
	const backTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<style lang="scss" scoped></style>
