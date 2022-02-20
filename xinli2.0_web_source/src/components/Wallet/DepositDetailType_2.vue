<template lang="pug">
.w-full.pt-4#depositDeatilWrap
	.w-full.px-10
		.my-2.text-xl.font-bold 充值订单已建立
	.w-full.bg-gray-100.border-l-4.border-xRed
		.py-4.px-10
			.grid.grid-cols-3
				.col-span-2
					.WH_FULL.CENTER
				
						.w-full.grid.grid-cols-2.gap-2
							.col-span-2
								.text-xs.text-gray-500 充值渠道
								.text-base.font-bold {{systemStore.depositDeatil.payChannelName}}

							.col-span-1
								.text-xs.text-gray-500 充值金额
								.text-base.font-bold ¥ {{systemStore.depositDeatil.payAmount}}

							.col-span-1
								.text-xs.text-gray-500 实际支付
								.text-base.font-bold ¥ {{systemStore.depositDeatil.amount}}

							.col-span-2
								.text-xs.text-xRed 目标钱包
								.text-base.font-bold.text-xRed {{systemStore.depositDeatil.targetWallet}}

				.col-span-1.CENTER
					qrcode-vue.shadow-lg.my-4(id='QRCODE' :value='systemStore.depositDeatil.url' :margin='4' :size='150')


	.w-full.py-4.px-10
		.grid.grid-cols-2.gap-2
			.col-span-1
				.text-xs.text-gray-500 充值期限
				.text-base.font-bold {{systemStore.depositDeatil.effectiveTime}}

			.col-span-1
				.text-xs.text-gray-500 订单编号
				.text-base.font-bold {{systemStore.depositDeatil.id}}

		.grid.grid-cols-3.gap-4.my-4.mt-12
			.col-span-1
				a-button.w-full(danger @click='cancelOder') 取消订单
			.col-span-1
				a-button.w-full(danger @click='gotoDepositRecord') 查看交易纪录
			.col-span-1
				a-button.w-full(type='primary' @click='downImage') 保存信息截图
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
	import html2canvas from 'html2canvas';

	import QrcodeVue from 'qrcode.vue';

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
	const downImage = () => {
		html2canvas(document.getElementById('depositDeatilWrap') as HTMLElement, {
			logging: false,
			allowTaint: true,
			scale: window.devicePixelRatio,
			scrollY: 0,
			scrollX: 0,
			useCORS: true,
			backgroundColor: '#ffffff',
		}).then(function (canvas) {
			let imgUrl = canvas.toDataURL('image/png');
			var tempLink = document.createElement('a');
			tempLink.style.display = 'none';
			tempLink.href = imgUrl;
			tempLink.setAttribute('download', String(systemStore.depositDeatil.id)); // 给a标签添加下载属性
			if (typeof tempLink.download === 'undefined') {
				tempLink.setAttribute('target', '_blank');
			}
			document.body.appendChild(tempLink);
			tempLink.click();
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(imgUrl);
		});
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
