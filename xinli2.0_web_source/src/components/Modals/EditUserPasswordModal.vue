<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.editUserPasswordVisabled'
	width='456px' 
	centered, 
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
		PasswordForm(@success='closeModel')
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';

	import PasswordForm from '@/components/Personal/Personal/PasswordForm.vue';

	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.editUserPasswordVisabled = false;
	};
</script>
