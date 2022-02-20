<template lang="pug">
a-select.w-28(v-model:value="locale" @change='changeLang' size='small')
	a-select-option(value='cn') 中文
	a-select-option(value='en') English

</template>

<script setup lang="ts">
	import { LangStore } from '@/store/langStore';
	import { useI18n } from 'vue-i18n';

	const { locale } = useI18n();
	const langStore = LangStore();
	const changeLang = (value: string) => {
		langStore.changLang(value);
	};
</script>
