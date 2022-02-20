<template lang="pug">
.USDTFormForm
	.text-center
		span.text-gray-400 操作时间剩余
		span.text-xRed.mx-1 {{countDownTime}}
		span.text-gray-400 秒
	.w-full.my-2
		p 钱包类型
		.bg-slate-100.text-center.p-1
			select.w-full.bg-transparent.border-none.outline-none(v-model="USDTFrom.type")
				option(:value='1') ERC
				option(:value='2') TRC
	.w-full.my-2
		p 地址昵称
		.bg-slate-100.text-center.p-1
			input.w-full.bg-transparent.border-none.outline-none(v-model="USDTFrom.name" type="text")
	.w-full.my-2
		p 提领地址
		.bg-slate-100.text-center.p-1
			input.w-full.bg-transparent.border-none.outline-none(v-model="USDTFrom.address" type="text")
	.w-full.my-2
		p.my-4
			a-button.w-full(type='primary' @click='onSubmit') {{t('Personal_detail_confirmButton')}}

</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { postMemberBankcard, postMemberUSDT } from '@/api';
	import { stringRemoveSpace } from '@/utils';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { notification } from 'ant-design-vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import PhoneForm from '@/components/Personal/Personal/PhoneForm.vue';

	const { t } = useI18n();

	const timer = ref<number>();
	const systemStore = SystemStore();
	const emit = defineEmits(['success']);
	const currentRef = ref(1);
	const countDownTime = ref(300);
	const addUSDTFinish = () => {
		emit('success');
	};
	const USDTFrom = reactive({
		address: '',
		name: '',
		type: 0,
		secret: systemStore.tempSecret,
	});
	const countDown = () => {
		countDownTime.value -= 1;
	};
	const onSubmit = () => {
		postMemberUSDT(USDTFrom)
			.then((res) => {
				if (res.data.statusCode === 0) {
					notification.success({ message: '编辑成功' });
					emit('success');
				} else {
					notification.error({ message: res?.data?.msg || '' });
				}
			})
			.catch((err) => {
				notification.error({ message: '编辑失敗' });
			});
	};
	onMounted(() => {
		countDownTime.value = 300;
		timer.value = window.setInterval(() => countDown(), 1000);
	});
	onUnmounted(() => {
		console.log('clearInterval');
		clearInterval(timer.value);
	});
</script>
