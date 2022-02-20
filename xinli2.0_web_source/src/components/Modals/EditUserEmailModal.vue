<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.editUserEmailVisabled'
	width='456px' 
	centered, 
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
		EmailForm(@success='closeModel')
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';

	import EmailForm from '@/components/Personal/Personal/EmailForm.vue';

	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.editUserEmailVisabled = false;
	};
</script>
