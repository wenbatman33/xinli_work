<template lang="pug">
div
	.overLayer(@click="clickOutside")
	.myWaellet#myWaellet.bg-white.absolute.rounded-xl.overflow-hidden.mt-2.shadow.z-10(:class='"w-[280px] h-[440px] z-[999]"')
		.myWaelletTitle.BETWEEN_CENTER.bg-slate-100.h-12.p-4
			.title {{t('nav_myWallet')}}
			.edit.cursor-pointer(@click='getUerMoney')
				SvgIcon.w-5.h-5.text-xBlue(:name='"#Refresh_Regular"')
				span {{t('nav_refresh')}}
		.p-4.border-b(:class='"h-[130px]"')
			.BETWEEN
				div
					p {{t('nav_center_wallet')}} 
					.Subtitle_3.my-4 ¥ {{ userStore.money }}
				div
					a-button(danger @click='gameRecycle') {{t('nav_gameRecycle')}}
			.BETWEEN.text-xs
				span {{t('nav_all_gameWallet')}}
				span ¥ {{userStore.money}}
			.BETWEEN.text-xs
				span {{t('nav_lock_gameWallet')}}
				span ¥ {{userStore.lockMoney}}
		.allWallet.text-xs.overflow-y-auto(:class='"h-[310px]"')
			//- .BETWEEN.border-b.p-4(v-for='item in walletList')
			//- 	span {{item.name}}
			//- 	span ¥ {{item.moeny}}
			.walletItem.border-b.p-4(v-for='item in userStore.wallettypeInfo')
				MyWalletItem(:data='item')
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { postGameRecycle, getBalanceCurrent } from '@/api';
	import { useI18n } from 'vue-i18n';
	import type { GAMEAJAX_GetBalanceResponseData } from '@/api/model';
	import MyWalletItem from '@/components/Wallet/MyWalletItem.vue';

	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const walletList = ref([] as GAMEAJAX_GetBalanceResponseData[]);
	const gameRecycle = async () => {
		const result = await postGameRecycle();
		result && userStore.checkUserInfo();
	};

	const getUerMoney = () => {
		userStore.getUerMoney();
		// init();
	};
	const init = async () => {
		// const res = await getBalanceCurrent();
		// walletList.value = res?.data?.data?.list || [];
	};

	const clickOutside = () => {
		systemStore.hiddenMyWallet();
	};

	onMounted(() => {
		init();
	});
</script>
<style scoped lang="scss">
	.overLayer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 1;
	}
	#myWaellet {
		z-index: 2;
	}
</style>
