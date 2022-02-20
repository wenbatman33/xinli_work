<template lang="pug">
.AddBankCardForm
	h5.py-8 {{t('personal_atm_add_other_bankcard')}}

	.w-full.h-48.bg-gray-100.CENTER
		.card.bg-white.shadow.rounded.p-4(:class='"w-[250px] h-[120px]"')
			.BETWEEN
				span.Subtitle_4 {{userStore.userInfo.otherBankCardName}}
				img.w-8(:src='bankIcon')
			.cardNO.text-sm.text-gray-400.mt-4 {{cctext?cctext:'**** **** **** ****'}}

	.w-full.my-4
		.text-xs.text-gray-300 
			span {{t('personal_atm_cardholder_Name')}}
			SvgIcon.w-4.h-4.mx-2(:name='"#Info"')
		.Subtitle_3.my-2 {{userStore.userInfo.otherBankCardName}}

	.w-full.my-4
		p.txet-sm
			span.font-black {{t('personal_atm_bankcard_number')}}
			span.text-gray-500.txet-xs.mx-2 {{t('personal_atm_add_bankcard_tips')}}
		.bg-slate-100.text-center.p-1
			input.w-full.bg-transparent.border-none.outline-none(
				name="credit-number" type="tel"
				v-model='cctext'
				maxlength="27" 
				:placeholder='t("personal_atm_input_bankcard_number")'
				@input='getCC_VALUE')
		p.my-4
			a-button.w-full(type='primary' :disabled='cctext.length < 22' @click='onSubmit') {{t('personal_atm_bankcard_verification')}}
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { postMemberBankcardOther } from '@/api';
	import { stringRemoveSpace } from '@/utils';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { notification } from 'ant-design-vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const emit = defineEmits(['success']);
	const { t } = useI18n();
	const bankIcon = `${window.staticPath}/static/img/icon/payment/bank.png`;
	const userStore = UserStore();
	const systemStore = SystemStore();

	const cctext = ref('');
	const getCC_VALUE = () => {
		cctext.value = cctext.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	};
	const onSubmit = () => {
		const payload = {
			bankNo: stringRemoveSpace(cctext.value),
			name: userStore.userInfo.name,
		};
		postMemberBankcardOther(payload)
			.then((res) => {
				notification.success({ message: t('addMember_bank_success') });
				// 發送偵聽事件
				systemStore.AddBankCardSuccessHandle();
				emit('success');
			})
			.catch((err) => {
				notification.error({ message: t('addMember_bank_fail') });
			});
	};
</script>
