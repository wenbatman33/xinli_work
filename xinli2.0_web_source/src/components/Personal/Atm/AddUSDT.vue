<template lang="pug">
.AddBankCardForm
	h5.py-4 提领地址
	.px-12
		a-steps(:current="addUDT_steps" size="small" labelPlacement="vertical")
			a-step(:title='"手机验证"')
			a-step(:title='"提领地址"')
	.p-8
		.step_1(v-if='addUDT_steps===0')
			PhoneForm(v-if='userStore.userInfo.phoneCert==="2"' @success='gotoStep2')
			SmsForm(v-else @success='gotoStep2')

		.step_2(v-if='addUDT_steps===1')
			USDTForm(@success='addUSDTFinish')
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { postMemberBankcard } from '@/api';
	import { stringRemoveSpace } from '@/utils';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { notification } from 'ant-design-vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	import PhoneForm from '@/components/Personal/Personal/PhoneForm.vue';
	import SmsForm from '@/components/Personal/Atm/SmsForm.vue';
	import USDTForm from '@/components/Personal/Atm/USDTForm.vue';

	const emit = defineEmits(['success']);
	const userStore = UserStore();
	const systemStore = SystemStore();

	const addUDT_steps = ref(0);

	const gotoStep2 = () => {
		console.log('gotoStep2');
		addUDT_steps.value = 1;
	};
	const addUSDTFinish = () => {
		// 發送偵聽事件
		systemStore.Add_USDT_SuccessHandle();
		emit('success');
	};
</script>
