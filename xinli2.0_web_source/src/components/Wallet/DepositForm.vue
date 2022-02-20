<template lang="pug">
.w-full.CENTER_C
	.w-full.p-2.bg-gray-100.Paragraph_2.overflow-hidden.my-4
		Marquee(v-if='bannerList.length>0' :data='bannerList')

	.w-full.my-2.text-sm.font-bold {{t('wallet_deposit_channel')}}

	.w-full.grid.grid-cols-4.gap-4
		.col-span-1.relative(v-for='item in DepositList')
			.rounded-md.CENTER_C.bg-gray-100.border-2.h-20(
				:class='{"border-xRed": currentPaymentID===item.id, "border-white": currentPaymentID!==item.id, "cursor-pointer": item.maintain===2 }' 
				@click='item.maintain===2 && changePaymentID(item)')

				.absolute.w-full.h-full.z-10(v-if='item.maintain===1') 
					.text-xl.text-xRed.text-center.font-bold.mt-2 维护中
					
				img.w-6(:src='apiImgPath(item.icon)')
				p {{item.name}}
				
				p.Paragraph_2.text-xRed {{item.tooltip}}
				.recommend.w-11.overflow-hidden.inline-block.absolute(:class='"top-[2px] left-[2px]"')
					.w-15.bg-xRed.text-white.h-16.rotate-45.transform.origin-top-right.relative(v-if='item.isRecommend')
						.Paragraph_2.text-white.relative(:class='"rotate-[-90deg] top-[12px] left-[12px]"') {{t('wallet_recommend')}}

	.w-full.my-2
		.text-xs.text-xRed(v-if='currentPayment') {{currentPayment.note}}

	.w-full.grid.grid-cols-2.gap-4.my-2

		.col-span-1
			p
				span.my-2.text-sm.font-bold {{t('wallet_depositAmount')}}
				span.my-2.text-xs.text-gray-500.mx-2(v-if='currentPayment') {{t('wallet_depositLimit')}} ¥ {{currentPayment.lower}}-{{currentPayment.upper}}
			.my-2
				.bg-slate-100.text-center.p-1.FLEX_R.border-b-2(:class='amountOverUpperLimitClass')
					span.border-r-2.px-2 ￥
					.flex-grow.px-2
						input.w-full.bg-transparent.border-none.outline-none(type='number' v-model='depositForm.amount')
			.my-2
				a-button.mr-1(size='small' shape="round" @click='depositForm.amount=100') 100
				a-button.mr-1(size='small' shape="round" @click='depositForm.amount=133') 133
				a-button.mr-1(size='small' shape="round" @click='depositForm.amount=166') 166
				a-button.mr-1(size='small' shape="round" @click='depositForm.amount=200') 200
		.col-span-1
			p
				span.my-2.text-sm.font-bold 存入钱包
				span.my-2.text-xs.text-gray-500.mx-2 余额 ¥ {{userStore.money}}
			.my-2
				.bg-slate-100.text-center.p-1 {{t('nav_center_wallet')}}
		.col-span-2(v-if='showERC')
			div
				span ≈ {{ commaFormatDecimal((depositForm?.amount||0) /exchangeRateERC)}}
				span.text-base.font-semibold.mx-2 USDT
			div
				span 参考汇率
				span 1 USDT ＝ ¥ {{exchangeRateERC}}
				
			.bg-red-100.p-1.my-2
				span.text-xs.text-xRed 我没有虚拟货币，由此购买

			.p-1.my-2(v-if='currentPayment?.docURL')
				.text-center(@click='currentPayment?.docURL && openOutSideLink(currentPayment?.docURL)')
					span.text-xs.underline 虚拟货币教学
					span.mx-1

		.col-span-2(v-if='showTRC')
			div
				span ≈ {{ commaFormatDecimal((depositForm?.amount||0) /exchangeRateTRC)}}
				span.text-base.font-semibold.mx-2 USDT
			div
				span 参考汇率
				span 1 USDT ＝ ¥ {{exchangeRateTRC}}

			.bg-red-100.p-1.my-2
				span.text-xs.text-xRed 我没有虚拟货币，由此购买

			.p-1.my-2(v-if='currentPayment?.docURL')
				.text-center(@click='currentPayment?.docURL && openOutSideLink(currentPayment?.docURL)')
					span.text-xs.underline 虚拟货币教学
					span.mx-1
						SvgIcon.w-4.h-4(:name='"#Help_Center"')
				
		.col-span-2
			.my-4
				a-button.w-full(type='primary' :disabled='disabledButton' @click='onSubmit') 下一步

</template>

<script setup lang="ts">
	import { ref, reactive, toRaw, onMounted, computed } from 'vue';
	import { DownOutlined } from '@ant-design/icons-vue';
	import { useI18n } from 'vue-i18n';
	import { getPaymentDeposit, postPaymentDeposit, getEventBanner, getPaymentDepositDetail } from '@/api';
	import type { PAYMENTAJAX_GetDepositResponseData, PAYMENTAJAX_CreateDepositRequest, EVENTAJAX_GetBannerResponseData } from '@/api/model';
	import { apiImgPath, openOutSideLink, commaFormatDecimal } from '@/utils';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { notification } from 'ant-design-vue';
	import { Modal } from 'ant-design-vue';

	import Marquee from '@/components/Marquee/index.vue';
	import NameForm from '@/components/Personal/Personal/NameForm.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const showERC = ref(false);
	const showTRC = ref(false);
	const exchangeRateERC = ref(0);
	const exchangeRateTRC = ref(0);
	const currentPaymentID = ref(0);
	const userStore = UserStore();
	const systemStore = SystemStore();
	const currentPayment = ref<PAYMENTAJAX_GetDepositResponseData | undefined>(undefined);
	const DepositList = ref([] as PAYMENTAJAX_GetDepositResponseData[]);
	const bannerList = ref([] as EVENTAJAX_GetBannerResponseData[]);

	const changePaymentID = (item: PAYMENTAJAX_GetDepositResponseData) => {
		if (item?.name && item?.name?.indexOf('ERC') >= 0) {
			showERC.value = true;
			showTRC.value = false;
		} else if (item?.name && item?.name?.indexOf('TRC') >= 0) {
			showERC.value = false;
			showTRC.value = true;
		} else {
			showERC.value = false;
			showTRC.value = false;
		}

		currentPayment.value = item;
		currentPaymentID.value = item.id || 0;
		depositForm.id = item.id;
		if (item.needRealName === true) chseckUserName();
	};

	const depositForm = reactive<PAYMENTAJAX_CreateDepositRequest>({
		/* 線路 id */
		id: 0,
		/* 存款金額 */
		amount: 0,
		/* 真實姓名 */
		realName: userStore.userInfo.name || '',
	});

	const amountOverUpperLimit = computed(() => {
		// 充值是否超出限額
		const amount = depositForm.amount || 0;
		const upper = currentPayment.value?.upper || 0;
		return amount > upper;
	});
	const amountOverUpperLimitClass = computed(() => {
		// 充值是否超出限額警示
		const amount = depositForm.amount || 0;
		const upper = currentPayment.value?.upper || 0;

		return amount > upper ? 'border-xRed' : 'border-block';
	});

	// 充值表單按鈕狀態
	const disabledButton = computed(() => amountOverUpperLimit.value || depositForm.amount === 0 || depositForm.id === 0);

	const chseckUserName = () => {
		// 檢查是否已實名制
		if (userStore.userInfo.name === '') systemStore.editUserNameVisabled = true;
	};

	const onSubmit = () => {
		postPaymentDeposit(depositForm).then((res) => {
			if (res.data.statusCode === 0) {
				notification.success({ message: '充值订单已建立' });
				systemStore.walletToggle(false);
				// systemStore.depositDeatilVisabled = true;
				res.data.data?.id && getDepositDetail(res.data.data?.id);
			}
		});
	};

	const getDepositDetail = (id: string) => {
		getPaymentDepositDetail({ id: id }).then((res) => {
			systemStore.depositDeatil = res.data.data || {};
			systemStore.depositDeatilVisabled = true;
			if (res?.data?.data?.cashierType === 4) window.open(res?.data?.data?.url, '_blank');
		});
	};
	const init = () => {
		getPaymentDeposit().then((res) => {
			DepositList.value = res?.data?.data?.list || [];
			exchangeRateERC.value = res?.data?.data?.exchangeRateERC || 0;
			exchangeRateTRC.value = res?.data?.data?.exchangeRateTRC || 0;
		});
		getEventBanner({ categortyID: 9 }).then((res) => {
			bannerList.value = res.data.data?.list || [];
		});
	};
	onMounted(() => {
		init();
	});
</script>
