<template lang="pug">
.FLEX_C
	h5 {{t('Personal_detail_password_title')}}
	.mt-8.px-8
		a-steps(:current="currentRef" size="small" labelPlacement="vertical")
			a-step(:title='t("Personal_detail_password_step_1")')
			a-step(:title='t("Personal_detail_password_step_2")')

		.step_1(v-if='currentRef===0')
			VerifyPassword(@success='gotoStep2')

		.step_2(v-if='currentRef===1')
			SetNewPaasword(@success='closeModal' :secretRef='secretRef')
		
</template>

<script setup lang="ts">
	import { reactive, computed, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { putMemberEmail } from '@/api';
	import { notification } from 'ant-design-vue';
	import { useI18n } from 'vue-i18n';

	import { Form, Modal } from 'ant-design-vue';
	import VerifyPassword from '@/components/Personal/Personal/VerifyPassword.vue';
	import SetNewPaasword from '@/components/Personal/Personal/SetNewPaasword.vue';

	const emit = defineEmits(['success']);
	const { t } = useI18n();
	const currentRef = ref(0);
	const secretRef = ref('');

	const closeModal = () => {
		emit('success');
	};
	const gotoStep2 = (secret: string) => {
		currentRef.value = 1;
		secretRef.value = secret;
	};
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
