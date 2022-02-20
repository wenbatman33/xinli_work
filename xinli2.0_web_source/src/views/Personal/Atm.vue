<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#Credit_Card"')
		.title
			h5 {{t('personal_atm_title')}}
	.BETWEEN.w-full.my-4
		p {{t('personal_atm_bankcard_management')}}

		span 
			a-button(type='link' danger :disabled='bankcardsList.length>=15' @click='addBankcard')
				SvgIcon.w-4.h-4.text-xRed.mx-1(:name='"#Deposit"')
				span(v-if='bankcardsList.length>=15') {{t('personal_atm_add_bankcard_max_limit')}}
				span(v-else) {{t('personal_atm_add_bankcard')}}


			a-button(v-if='userStore.userInfo.allowOtherBankCard' :disabled='bankcardsList.length>=15' type='link' danger @click='addOtherBankcard')
				SvgIcon.w-4.h-4.text-xRed.mx-1(:name='"#Deposit"')
				span(v-if='bankcardsList.length>=15') {{t('personal_atm_add_bankcard_max_limit')}}
				span(v-else) {{t('personal_atm_add_other_bankcard')}}

	.w-full.grid.grid-cols-4.gap-4.my-4
		.col-span-1(v-for='item, index in bankcardsListComputed')
			.card.bg-white.drop-shadow-md.rounded.p-4(:class='"h-[112px]"')
				.BETWEEN
					span.Subtitle_4 {{item.bankAccount}}
					img.w-8(:src='bankIcon')
				.cardNO.text-sm.text-gray-400.mt-4 {{ creditCardFormat(item.bankNo)}}
		.col-span-1.bg-gray-100.drop-shadow-md.CENTER(v-if='showMoreItems===16 && bankcardsList.length>=15')
			span {{t('personal_atm_add_bankcard_max_limit')}}
		
	.CENTER.cursor-pointer(@click='toggleMoreItemsHandle')
		SvgIcon.w-4.h-4.mx-1(v-if='showMoreItems===4' :name='"#Arrow_Down_Line"')
		SvgIcon.w-4.h-4.mx-1(v-if='showMoreItems===16' :name='"#Arrow_Up_Line"')
		span {{showMoreItems===4 ? '查看更多': '查看更少'}}

	.BETWEEN.w-full.my-8
		p {{t('personal_atm_cryptocurrency_address')}}
		a-button(type='link' danger @click='addUSDT')
			SvgIcon.w-4.h-4.text-xRed.mx-1(:name='"#Deposit"')
			span {{t('personal_atm_add_cryptocurrency_address')}}

	.my-4
		a-table#bankInfoList(:columns="columns" :data-source='USDTsList' :row-key="(record:any) => record.id" :size='"middle"' )
			template(#type='{text ,record}')
				span(v-if='text===1') ERC
				span(v-if='text===2') TRC
			template(#edit='{text ,record}')
				a-button(type='link' @click="deleteUSDT(record.id)")
					SvgIcon.w-5.h-5(:name='"#Delete"')
					//- a-button(type='link')
					//- 	SvgIcon.w-5.h-5(:name='"#Edit"')

</template>

<script setup lang="ts">
	import { onMounted, ref, watch, computed } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { getMemberBankcards, getMemberUSDTs, postMemberBankcard, deleteMemberUSDT } from '@/api';
	import type { MEMBERAJAX_GetMemberBankCardResponseData, MEMBERAJAX_GetMemberUSDTResponseData } from '@/api/model';
	import { creditCardFormat, stringRemoveSpace } from '@/utils';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { notification } from 'ant-design-vue';

	import NameForm from '@/components/Personal/Personal/NameForm.vue';
	import AddBankCardForm from '@/components/Personal/Atm/AddBankCardForm.vue';
	import AddUSDT from '@/components/Personal/Atm/AddUSDT.vue';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();

	const bankIcon = `${window.staticPath}/static/img/icon/payment/bank.png`;
	const userStore = UserStore();
	const systemStore = SystemStore();

	const cctext = ref('');
	const showMoreItems = ref(4);
	const bankcardsList = ref([] as MEMBERAJAX_GetMemberBankCardResponseData[]);
	const bankcardsListComputed = computed(() => bankcardsList.value.filter((item, index) => index < showMoreItems.value));
	const USDTsList = ref([] as MEMBERAJAX_GetMemberUSDTResponseData[]);
	const columns = [
		{
			title: t('personal_atm_address'),
			dataIndex: 'name',
		},
		{
			title: t('personal_atm_wallet_type'),
			dataIndex: 'type',
			slots: { customRender: 'type' },
		},
		{
			title: t('personal_atm_withdrawal_address'),
			dataIndex: 'address',
		},
		{
			title: t('nav_edit'),
			dataIndex: 'edit',
			slots: { customRender: 'edit' },
		},
	];

	const toggleMoreItemsHandle = () => {
		showMoreItems.value = showMoreItems.value === 4 ? 16 : 4;
	};
	const addBankcard = () => {
		// 添加銀行卡判斷是否實名制認證;
		if (userStore.userInfo.name === '') {
			systemStore.editUserNameVisabled = true;
		} else {
			systemStore.AddBankCardVisabled = true;
		}
	};
	const addOtherBankcard = () => {
		// 添加銀行卡判斷是否實名制認證;
		if (userStore.userInfo.name === '') {
			systemStore.editUserNameVisabled = true;
		} else {
			systemStore.AddOtherBankCardVisabled = true;
		}
	};
	const addUSDT = () => {
		// 添加 USDT
		systemStore.Add_USDT_Visabled = true;
	};

	// 判斷實名制認證完成 event bus
	watch(
		() => systemStore.editUserNameSuccess,
		(newVal) => {
			if (newVal === true) {
				systemStore.AddBankCardVisabled = true;
			}
		}
	);
	// 新增銀行卡後 event bus
	watch(
		() => systemStore.AddBankCardSuccess,
		(newVal) => {
			if (newVal === true) init();
		}
	);
	// 新增USDT後 event bus
	watch(
		() => systemStore.Add_USDT_Success,
		(newVal) => {
			if (newVal === true) init();
		}
	);

	const deleteUSDT = (id: number) => {
		deleteMemberUSDT(id).then((res) => {
			if (res.data.statusCode === 0) {
				notification.success({ message: '刪除成功' });
				init();
			} else {
				notification.error({ message: '刪除失敗' });
			}
		});
	};

	const init = () => {
		getMemberBankcards().then((res) => {
			bankcardsList.value = res?.data?.data?.list || [];
		});
		getMemberUSDTs().then((res) => {
			USDTsList.value = res?.data?.data?.list || [];
		});
	};
	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss">
	::v-deep(#bankInfoList .ant-table-thead th) {
		background-color: #fff !important;
		font-weight: 600;
	}
</style>
