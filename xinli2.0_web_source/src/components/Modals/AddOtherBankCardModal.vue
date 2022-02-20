<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.AddOtherBankCardVisabled'  
	width='492px' 
	centered, 
	:footer='null', 
	closable='', 
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
	AddOtherBankCardForm(v-if='systemStore.AddOtherBankCardVisabled' @success='closeModel')

</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import AddOtherBankCardForm from '@/components/Personal/Atm/AddOtherBankCardForm.vue';
	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.AddOtherBankCardVisabled = false;
	};
</script>
