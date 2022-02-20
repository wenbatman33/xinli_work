<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.editUserNameVisabled'
	width='456px' 
	centered, 
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
		NameForm(@success='closeModel')
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';

	import NameForm from '@/components/Personal/Personal/NameForm.vue';

	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.editUserNameVisabled = false;
	};
</script>
