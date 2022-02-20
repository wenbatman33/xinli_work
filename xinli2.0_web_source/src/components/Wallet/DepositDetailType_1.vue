<template lang="pug">
.w-full
	.w-full.px-10
		.my-2.text-xl.font-bold 充值订单已建立
	.w-full.bg-gray-100.border-l-4.border-xRed
		.py-4.px-10
			.BETWEEN.my-4
				.text-xs.text-gray-500 点击信息即可拷贝
			
			.grid.grid-cols-4.gap-2
				.col-span-2.cursor-pointer(@click='copyUrl(String(systemStore.depositDeatil.bankcard))')
					.text-xs.text-gray-500 卡号
					.text-base.font-bold
						span {{systemStore.depositDeatil.bankcard}}
					
				.col-span-1.cursor-pointer(@click='copyUrl(String(systemStore.depositDeatil.payAmount))')
					.text-xs.text-gray-500 充值金额
					.text-base.font-bold ¥ {{systemStore.depositDeatil.payAmount}}

				.col-span-1.cursor-pointer(@click='copyUrl(String(systemStore.depositDeatil.amount))')
					.text-xs.text-gray-500 实际支付
					.text-base.font-bold ¥ {{systemStore.depositDeatil.amount}}

				.col-span-2.cursor-pointer(@click='copyUrl(String(systemStore.depositDeatil.bankcardOwner))')
					.text-xs.text-gray-500 户名
					.text-base.font-bold {{systemStore.depositDeatil.bankcardOwner}}

				.col-span-1.cursor-pointer(@click='copyUrl(String(systemStore.depositDeatil.prompt))')
					.text-xs.text-xRed 附言
					.text-base.font-bold.text-xRed {{systemStore.depositDeatil.prompt}}

				.col-span-1

	.w-full.py-4.px-10
		.border.p-4.my-4.text-xs.leading-6
			.text-xRed 请务必每次充值都获取并充值当前卡，若充值至停用卡号，本公司将无法查收，恕不负责！
			.text-gray-500 若您无同行卡，请使用「跨行转账」并选择「加急」
			.text-gray-500 转账时「备注」栏请填写「附言」
			.text-gray-500 转账金额与填写的充值金额需一致
			.text-gray-500 非本人银行卡充值，请联系《在线客服》提供充值人姓名
		.grid.grid-cols-2.gap-2
			.col-span-1
				.text-xs.text-gray-500 充值渠道
				.text-base.font-bold {{systemStore.depositDeatil.payChannelName}}

			.col-span-1
				.text-xs.text-gray-500 目标钱包
				.text-base.font-bold {{systemStore.depositDeatil.targetWallet}}

			.col-span-1
				.text-xs.text-gray-500 充值期限
				.text-base.font-bold {{systemStore.depositDeatil.effectiveTime}}

			.col-span-1
				.text-xs.text-gray-500 订单编号
				.text-base.font-bold {{systemStore.depositDeatil.id}}

		.grid.grid-cols-3.gap-4.my-4
			.col-span-1
				a-button.w-full(danger @click='cancelOder') 取消订单
			.col-span-1
				a-button.w-full(danger @click='gotoDepositRecord') 查看交易纪录
			.col-span-1
				a-button.w-full(type='primary' @click='closeModel') 完成
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
