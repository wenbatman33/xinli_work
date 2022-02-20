<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.editUserPhoneVisabled'
	width='456px' 
	centered, 
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
	PhoneForm(@success='closeModel')
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';

	import PhoneForm from '@/components/Personal/Personal/PhoneForm.vue';

	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.editUserPhoneVisabled = false;
	};
</script>
