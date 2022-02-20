<template lang="pug">
.PromoModal.CENTER_C
	.body.flex-grow.overflow-y-scroll
		img.w-full(:src='apiImgPath(detail?.imageWeb)' @error='errorImg')
		.p-4.bg-white
			h5 {{ detail?.name}}

			p.my-4
				span.rounded.bg-xRed.p-2.text-white.mr-4(v-if='statusText') {{ statusText }}
				span {{ detail?.startTime}}
		.p-4
			.content(v-html='detail?.content')
			
	.footer.flex-shrink-0.CENTER
		.footerContainer.BETWEEN_CENTER(:class='"w-[930px]"')
			.share
				span.mx-1.text-white {{t('promotion_share_to')}}
				span.mx-1.cursor-pointer
					img.w-8(:src='qrcode' :srcset='qrcode_2x' @click='showQrcodeHandle')
				span.mx-1.cursor-pointer
					img.w-8(:src='wechat' :srcset='wechat_2x' @click='shraeWeibo')
				span.mx-1.cursor-pointer
					img.w-8(:src='qq' :srcset='qq_2x' @click='shraeQQ')
				span.mx-1.cursor-pointer
					img.w-8(:src='copy' :srcset='copy_2x' @click='copyUrl')
				
			.action
				span(v-for='item in detail?.promotion')
					a-button.xBlueBtn.px-4(:class='{"opacity-20": item?.applyStatus===2}' type='primary' size='large' @click='promotionApplyHandel(item)') {{ item?.applyStatus===1 ? `${t('promotion_apply')}${item?.name }` :t('promotion_apply_finish')}}

	a-modal.radiusNoPaddingModal(:visible='showQrcode',  width='254px' centered, :footer='null', :mask-closable='false', :keyboard='false', @cancel='closeModal')
		.w-full.CENTER_C.p-8
			p.font-bold {{t('promotion_save_qr_code')}}
			p.font-bold  {{t('promotion_save_qr_code_desc')}}
			qrcode-vue.shadow-lg.my-8(id='QRCODE' :value='currentUrl' :margin='4' :size='150')
			a-button.w-full(type='primary' @click='downQrcode') {{t('promotion_save_qr_code_image')}}

</template>

<script setup lang="ts">
	import { apiImgPath, errorImg } from '@/utils';
	import { useRoute, useRouter } from 'vue-router';
	import { ref, onMounted, computed } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import { getPromotionOne, promotionApply } from '@/api';
	import { shraeToWeibo, shraeToQQ } from '@/utils';
	import { toClipboard } from '@soerenmartius/vue3-clipboard';
	import { notification } from 'ant-design-vue';
	import type { PAYMENTAJAX_PromotionListResponseData } from '@/api/model';
	import { Modal } from 'ant-design-vue';
	import type { PAYMENTAJAX_PromotionApplyResponseData } from '@/api/model';
	import { UserStore } from '@/store/userStore';
	import QrcodeVue from 'qrcode.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const userStore = UserStore();

	const qrcode = `${window.staticPath}/static/img/shareButton/qrcode.png`;
	const qrcode_2x = `${window.staticPath}/static/img/shareButton/qrcode@2x.png 2x`;
	const wechat = `${window.staticPath}/static/img/shareButton/wechat.png`;
	const wechat_2x = `${window.staticPath}/static/img/shareButton/wechat@2x.png 2x`;
	const qq = `${window.staticPath}/static/img/shareButton/qq.png`;
	const qq_2x = `${window.staticPath}/static/img/shareButton/qq@2x.png 2x`;
	const copy = `${window.staticPath}/static/img/shareButton/copy.png`;
	const copy_2x = `${window.staticPath}/static/img/shareButton/copy@2x.png`;
	const route = useRoute();
	const router = useRouter();
	const showQrcode = ref(false);
	const currentUrl = computed(() => window.location.href);
	const showQrcodeHandle = () => (showQrcode.value = true);
	const closeModal = () => (showQrcode.value = false);
	const downQrcode = () => {
		const canvas = document.getElementById('QRCODE');
		const link: HTMLAnchorElement = document.createElement('a');
		link.download = 'QRCODE.png';
		link.href = (canvas as HTMLCanvasElement)?.toDataURL();
		link.click();
		link?.parentNode?.removeChild(link);
	};
	const shraeWeibo = () => {
		const Detail = detail.value;
		const url = window.location.href;
		const title = Detail?.name || '';
		const pic = apiImgPath(Detail.imageWeb) || '';
		shraeToWeibo(url, title, pic);
	};
	const copyUrl = () => {
		const url = window.location.href;
		toClipboard(url);
		notification.success({
			message: t('promotion_save_qr_code_image_success'),
		});
	};
	const shraeQQ = () => {
		const Detail = detail.value;
		const url = window.location.href;
		const title = Detail?.name || '';
		const pic = apiImgPath(Detail.imageWeb) || '';
		shraeToQQ(url, title, pic);
	};
	// 狀態[1即將開始2進行中3已結束]
	const statusText = computed(() => {
		const Detail = detail.value;
		let text = '';
		if (Detail.status === 1) {
			text = t('promotion_status_text_1');
		} else if (Detail.status === 2) {
			text = t('promotion_status_text_2');
		} else if (Detail.status === 3) {
			text = t('promotion_status_text_3');
		}
		return text;
	});
	const detail = ref<PAYMENTAJAX_PromotionListResponseData>({});
	const promotionApplyHandel = (item: PAYMENTAJAX_PromotionApplyResponseData) => {
		// 未完成手機認證與實名認證 需完成才可參加優惠
		const checkUserInfo = userStore.userInfo.name !== '' && userStore.userInfo.phone !== '';
		checkUserInfo ? applyPromotion(item) : alertMessage();
	};
	const alertMessage = () => {
		// 未完成手機認證與實名認證訊息
		Modal.confirm({
			class: 'SSO_ERROR_MODAL',
			title: () => t('promotion_authentication_test'),
			content: () => t('promotion_authentication_test_desc'),
			centered: true,
			okText: t('promotion_authentication_button_text'),
			cancelText: t('promotion_authentication_cancelbutton_text'),
			okButtonProps: { block: true },
			cancelButtonProps: { block: true },
			onOk: () => router.push('/personal/profile'),
		});
	};
	const applyPromotion = (item: PAYMENTAJAX_PromotionApplyResponseData) => {
		// 已完成手機認證與實名認證後續動作
		promotionApply({ promotionID: item?.id })
			.then((res) => {
				console.log(res);
				if (res.data.statusCode === 0) {
					notification.success({ message: t('promotion_apply_status_success') });
					init();
				} else {
					notification.error({ message: t('promotion_apply_status_fail') });
				}
			})
			.catch((err) => {
				notification.error({ message: t('promotion_apply_status_fail') });
			});
	};
	const init = async () => {
		const res = await getPromotionOne({ ID: Number(route.params.id) });
		detail.value = res.data.data || {};
	};
	onMounted(() => {
		init();
	});
</script>
<style lang="scss" scoped>
	.PromoModal {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		// background: rgba(0, 0, 0, 0.6);
		.body {
			width: 930px;
			background-color: #fff;
		}
		.footer {
			width: 100%;
			height: 88px;
			background-color: #181818;
		}
	}
</style>
