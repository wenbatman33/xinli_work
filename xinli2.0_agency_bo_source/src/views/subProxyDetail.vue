<template lang="pug">
.container.pb-4.FLEX_C
	.px-2
		van-tabs.p-4(v-model:active='activePopTab' animated='' background='black' title-active-color='white' title-inactive-color='#ccc' color='white' line-width='50%' line-height='1')
			van-tab(:title="$t('subProxyDetail_02')")
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_03') }} &#x25C6;
					.text-white.bodoni 999,649,000.00
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_04') }} &#x25C6;
					.text-white.bodoni 99%
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_05') }} &#x25C6;
					.text-white.bodoni 999,999,999.00
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_06') }} &#x25C6;
					.text-white.bodoni 888,888,888
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_07') }} &#x25C6;
					.text-white.bodoni 2021/10/13 00:00:00
			van-tab(:title="$t('subProxyDetail_08')")
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_03') }} &#x25C6;
					.text-red.bodoni -999,649,000.00
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_04') }} &#x25C6;
					.text-white.bodoni 99%
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_05') }} &#x25C6;
					.text-red.bodoni -999,999,999.00
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_06') }} &#x25C6;
					.text-white.bodoni 888,888,888
				.p-4.m-5.rounded-md.cursor-pointer.btnBg.CENTER_C
					.text-primary &#x25C6; {{ $t('subProxyDetail_07') }} &#x25C6;
					.text-white.bodoni 2021/10/13 00:00:00


</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const activePopTab = ref(0);
</script>
<style lang="less" scoped>
	.btnBg {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 98% center;
	}
</style>
