<template lang="pug">
.CENTER_C.min-h-screen.bg-black
	.FLEX_C.CENTER
		img.my-8(:src='neon')
		img.my-8(:src='logo_for_maintenance')
		p.text-white.text-center {{$t('maintenance_page_desc_line1')}}
		p.text-white.text-center {{$t('maintenance_page_desc_line2')}}
		p.text-white.text-center {{$t('maintenance_page_desc_line3')}}
		p.text-white.text-center {{$t('maintenance_page_desc_line4')}}
		a-button.text-xRed.border-xRed.w-52.my-8(ghsot) {{$t('maintenance_page_button_text')}}


</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const neon = `${window.staticPath}/static/img/maintenance/neon.png`;
	const logo_for_maintenance = `${window.staticPath}/static/img/logo_for_maintenance.png`;
</script>

<style scoped lang="scss"></style>
