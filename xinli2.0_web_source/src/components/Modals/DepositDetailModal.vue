<template lang="pug">
a-modal.radiusModal(
	width='650px'
	centered,
	closable='', 
	:bodyStyle='{"padding":"40px 0px", "border-radius": "16px"}',
	:visible='systemStore.depositDeatilVisabled'
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')

	DepositDetailType_1(v-if='systemStore.depositDeatil.cashierType === 1')
	DepositDetailType_2(v-if='systemStore.depositDeatil.cashierType === 2')
	DepositDetailType_3(v-if='systemStore.depositDeatil.cashierType === 3')
	DepositDetailType_4(v-if='systemStore.depositDeatil.cashierType === 4')
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import { toClipboard } from '@soerenmartius/vue3-clipboard';
	import { notification } from 'ant-design-vue';
	import { postPaymentDepositCancel } from '@/api';
	import { useRouter } from 'vue-router';
	import DepositDetailType_1 from '@/components/Wallet/DepositDetailType_1.vue';
	import DepositDetailType_2 from '@/components/Wallet/DepositDetailType_2.vue';
	import DepositDetailType_3 from '@/components/Wallet/DepositDetailType_3.vue';
	import DepositDetailType_4 from '@/components/Wallet/DepositDetailType_4.vue';

	const { t } = useI18n();
	const router = useRouter();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const copyUrl = (str: string) => {
		toClipboard(str);
		notification.success({
			message: t('promotion_save_qr_code_image_success'),
		});
	};
	const gotoDepositRecord = () => {
		router.push('/personal/transaction');
		systemStore.depositDeatilVisabled = false;
	};
	const cancelOder = () => {
		postPaymentDepositCancel({ id: systemStore.depositDeatil.id });
		systemStore.depositDeatilVisabled = false;
	};
	const closeModel = () => {
		systemStore.depositDeatil = {};
		systemStore.depositDeatilVisabled = false;
	};
</script>
<style scoped lang="scss">
	.tab {
		@apply rounded-full h-12 text-xBlue text-opacity-50;
	}
	.tabActive {
		@apply bg-xRed rounded-full h-12 text-white;
	}
</style>
