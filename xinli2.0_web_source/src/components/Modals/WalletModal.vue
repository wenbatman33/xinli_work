<template lang="pug">
a-modal.radiusModal(
	width='650px'
	centered,
	closable='', 
	:bodyStyle='{"padding":"40px", "border-radius": "16px"}',
	:visible='systemStore.walletVisabled'
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
	.rounded-full.bg-gray-100.h-12
		.grid.grid-cols-2
			.col-span-1.tab(:class='{"tabActive": tabCurrentId===0 }'  @click='tabCurrentId=0')
				.CENTER.h-12.cursor-pointer
					SvgIcon.w-5.h-5.mr-2(:name='"#Deposit"')
					span.Subtitle_3 {{t('wallet_deposit')}}
					
			.col-span-1.tab(:class='{"tabActive": tabCurrentId===1 }' @click='tabCurrentId=1')
				.CENTER.h-12.cursor-pointer
					SvgIcon.w-5.h-5.mr-2(:name='"#Withdraw"')
					span.Subtitle_3 {{t('wallet_withdrawal')}}

	DepositForm(v-if='systemStore.walletVisabled && tabCurrentId===0')
	WithdrawForm(v-if='systemStore.walletVisabled && tabCurrentId===1')


</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import DepositForm from '@/components/Wallet/DepositForm.vue';
	import WithdrawForm from '@/components/Wallet/WithdrawForm.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import PhoneForm from '@/components/Personal/Personal/PhoneForm.vue';

	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const tabCurrentId = ref(0);
	watch(
		() => systemStore.walletVisabled,
		(newVal) => {
			if (newVal === true) chseckUserPhoneCert();
		}
	);
	const chseckUserPhoneCert = () => {
		// 檢查是否已驗證手機號
		if (userStore.userInfo.phoneCert === '2') systemStore.editUserPhoneVisabled = true;
	};
	const closeModel = () => systemStore.walletToggle(false);
</script>
<style scoped lang="scss">
	.tab {
		@apply rounded-full h-12 text-xBlue text-opacity-50;
	}
	.tabActive {
		@apply bg-xRed rounded-full h-12 text-white;
	}
</style>
