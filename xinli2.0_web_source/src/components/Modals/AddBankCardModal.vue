<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.AddBankCardVisabled'  
	width='492px' 
	centered, 
	:footer='null', 
	closable='', 
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
	AddBankCardForm(v-if='systemStore.AddBankCardVisabled' @success='closeModel')

</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import AddBankCardForm from '@/components/Personal/Atm/AddBankCardForm.vue';
	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.AddBankCardVisabled = false;
	};
</script>
