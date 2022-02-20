<template lang="pug">
footer(v-if='showFooter' class='bg-white footer')
	.w-full
		.container
			a-divider.m-0
	section.footerInfo(v-if='showFooterInfo')
		.container
			.grid.grid-cols-8.gap-4.my-8
				.col-span-2
					section.pagcor
						p.text-center.mb-4
							SvgIcon.w-16.h-16.text-paimary.opacity-40(:name='"#Pagcor"')
						p.Paragraph_2 {{$t('footer_paragraph_1_title')}}
				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_2_title')}}
					p.text-sm.my-4.cursor-pointer(@click='showAppDownload') {{$t('footer_paragraph_2_link_1')}}
					p.text-sm.my-4.cursor-pointer(@click='showAppDownload') {{$t('footer_paragraph_2_link_2')}}
				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_3_title')}}
					p.text-sm.my-4
						a(href='/') {{$t('footer_paragraph_3_link_1')}}
				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_4_title')}}
					img(class='w-[56px]' :src='deJia_logo')

				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_5_title')}}
					.grid.grid-cols-2.gap-4.my-4
						.col-span-1
							a(href='/helpCenter/details/1') {{$t('footer_paragraph_5_link_1')}}
						.col-span-1
							a(href='/helpCenter/details/2') {{$t('footer_paragraph_5_link_2')}}
						.col-span-1
							a(href='/helpCenter/details/3') {{$t('footer_paragraph_5_link_3')}}
						.col-span-1
							a(href='/helpCenter/details/4') {{$t('footer_paragraph_5_link_4')}}
						.col-span-1
							a(href='/helpCenter/details/5') {{$t('footer_paragraph_5_link_5')}}
						.col-span-1
							a(href='/helpCenter/details/6') {{$t('footer_paragraph_5_link_6')}}
						.col-span-1
							a(href='/helpCenter/details/7') {{$t('footer_paragraph_5_link_7')}}
				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_6_title')}}
					p.text-sm.my-4
						a(href='/') {{$t('footer_paragraph_6_link_1')}}
				.col-span-1
					.Subtitle_3.mb-2 {{$t('footer_paragraph_7_title')}}
					p.Paragraph_2.my-4
						a(href='/') {{$t('footer_paragraph_7_link_1')}}
					.FLEX_R.mt-4
						a.text-center.mr-4(href='https://www.google.com/intl/zh-cn/chrome/' target='_blank')
							SvgIcon.w-7.h-7.text-paimary.opacity-40(:name='"#Chrome"')
							p.text-xs Chrome
						a.text-center.mr-4(href='https://www.firefox.com.cn/' target='_blank')
							SvgIcon.w-7.h-7.text-paimary.opacity-40(:name='"#Firefox"')
							p.text-xs Firefox

							
			
	section.h-12.CENTER
		.container
			.BETWEEN_CENTER
				section.FLEX_R
					p.text-xs.mr-2
						a(href='https://about.18xl18xl.com/?hasHeader=false&tab=0' target='_blank') {{$t('footer_subLink_1')}}
					p.text-xs.mr-2
						a(href='/helpCenter') {{$t('footer_subLink_2')}}
					p.text-xs.mr-2
						a(href='https://about.18xl18xl.com/?hasHeader=false&tab=1' target='_blank') {{$t('footer_subLink_3')}}
					p.text-xs.mr-2
						a(href='https://about.18xl18xl.com/?hasHeader=false&tab=2' target='_blank') {{$t('footer_subLink_4')}}
					p.text-xs.mr-2
						a(href='https://about.18xl18xl.com/?hasHeader=false&tab=3' target='_blank') {{$t('footer_subLink_5')}}
				section.FLEX_R_CENTER
					p.text-xs.mr-2.copyright {{$t('footer_copyright')}}
					p.text-xs.mr-2.version ver: {{VER}}
					LanguageSelector.mx-2

</template>
<script setup lang="ts">
	import { computed, onMounted, ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { SystemStore } from '@/store/systemStore';
	import LanguageSelector from '@/components/Nav/LanguageSelector.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import pkg from '../../../package.json';

	const systemStore = SystemStore();
	const deJia_logo = `${window.staticPath}/static/img/deJia-logo.svg`;

	const VER = ref('');
	const route = useRoute();
	const router = useRouter();
	const showFooter = computed(() => systemStore.NO_FOOTER !== false);
	const showFooterInfo = computed(() => route.name !== 'GameLobbyPage');
	const showAppDownload = () => systemStore.appDownloadToggle(true);
	onMounted(() => (VER.value = pkg.version));
</script>
