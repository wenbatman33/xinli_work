<template lang="pug">
.FLEX_C.my-4
	a-form.w-full(layout='vertical')
		.text-sm.text-gray-500.my-1 已绑定的手机号
		.text-sm.font-bold {{ userStore.userInfo.phone }}

		.flex.my-4.border-none.bg-gray-100.p-2

			.flex-grow
				a-input.w-full.transparentInput.border-none(v-model:value='getSmsForm.code', :placeholder='t("Personal_detail_phone_Placeholder_2")')
					template(#prefix)
						.w-8.border-r
							SvgIcon.w-5.h-5.text-black(:name='"#Shield_Check"')
							
			.rounded-lg.bg-xRed.text-white.px-4.CENTER(v-if='countDown>0') {{countDown}}{{t('Personal_detail_phone_code_seconds')}}
			a-button.rounded-lg.text-white(v-else type='primary' @click='getCode') {{t('Personal_detail_phone_get_captcha_code')}}
	a-button.rounded-lg.text-white.my-4(type='primary' block  @click='VerifyCode') {{t('Personal_detail_nextButton')}}
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, reactive, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { getMemberSmsSend, postMemberSmsVerify } from '@/api';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const emit = defineEmits(['success']);
	let loop: any;
	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const getSmsForm = reactive({
		phone: userStore.userInfo.phone,
		code: '',
	});
	const countDown = ref(0);
	const secret = ref('');

	const loopTime = (checktime = 60) => {
		countDown.value = checktime;
		loop = setInterval(() => {
			countDown.value -= 1;
			if (countDown.value <= 0) {
				clearInterval(loop);
			}
		}, 1000);
	};

	const VerifyCode = () => {
		postMemberSmsVerify({ code: getSmsForm.code }).then((res) => {
			console.log(res);
			secret.value = res?.data?.data?.secret || '';
			systemStore.tempSecret = res?.data?.data?.secret || '';
			emit('success');
		});
	};
	const getCode = () => {
		getMemberSmsSend({ phone: getSmsForm.phone }).then((res) => {
			if (res.data.status === 'ok') {
				loopTime();
			}
		});
	};
	onMounted(() => {});
	onUnmounted(() => {});
</script>
