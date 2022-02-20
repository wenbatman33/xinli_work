<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.Add_USDT_Visabled'  
	width='492px' 
	centered, 
	:footer='null', 
	closable='', 
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
	AddUSDT(@success='closeModel')

</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';

	import AddUSDT from '@/components/Personal/Atm/AddUSDT.vue';

	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.Add_USDT_Visabled = false;
	};
</script>
