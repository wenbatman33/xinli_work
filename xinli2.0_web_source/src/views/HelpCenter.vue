<template lang="pug">
.pageContainer
	.container
		h5.text-center.my-8 {{t('help_greetings')}}
		.my-4.text-center
			a-input(:class='"w-3/4"' placeholder="试试「游戏」" v-model:value="userName")
				template(#prefix)
					SearchOutlined

		.my-8
			h5 {{t('help_game_problem_title')}}
				SvgIcon.w-6.h-6.text-paimary(:name='"#Arrow_Right_Line"')

			.grid.grid-cols-4.gap-4.my-4
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/1')
						img.w-full(:src='video')
						.p-4
							.SubTitle_3.font-bold 影片标题
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/1')
						img.w-full(:src='video')
						.p-4
							.SubTitle_3.font-bold 影片标题
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/1')
						img.w-full(:src='video')
						.p-4
							.SubTitle_3.font-bold 影片标题
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/1')
						img.w-full(:src='video')
						.p-4
							.SubTitle_3.font-bold 影片标题
				
		.my-8
			h5 {{t('help_Questions')}}
			
			.grid.grid-cols-4.gap-4.my-4
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/2')
						.FLEX_C
							.h-32.CENTER
								img.w-24.h-24(:src='FAQ_1')
							.h-32.CENTER_C
								P.Subtitle_2 {{t('help_general_problem')}}
								p {{t('help_general_problem_desc')}}
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/3')
						.FLEX_C
							.h-32.CENTER
								img.w-24.h-24(:src='FAQ_2')
							.h-32.CENTER_C
								P.Subtitle_2 {{t('help_account_problem')}}
								p {{t('help_account_problem_desc')}}
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/4')
						.FLEX_C
							.h-32.CENTER
								img.w-24.h-24(:src='FAQ_3')
							.h-32.CENTER_C
								P.Subtitle_2 {{t('help_funding_problem')}}
								p {{t('help_funding_problem_desc')}}
				.col-span-1.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/5')
						.FLEX_C
							.h-32.CENTER
								img.w-24.h-24(:src='FAQ_4')
							.h-32.CENTER_C
								P.Subtitle_2 {{t('help_browsing_problem')}}
								p {{t('help_browsing_problem_desc')}}

				.col-span-2.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/6')
						.FLEX_R.h-64
							.CENTER(:class='"w-1/2"')
								img.w-24.h-24(:src='FAQ_5')
							.CENTER_C(:class='"w-1/2"')
								P.Subtitle_2 {{t('help_game_problem')}}
								p {{t('help_game_problem_desc')}}
				.col-span-2.hoverJump.rounded-lg.bg-gray-200.cursor-pointer.overflow-hidden
					router-link(to='/helpCenter/details/7')
						.FLEX_R.h-64
							.CENTER(:class='"w-1/2"')
								img.w-24.h-24(:src='FAQ_6')
							.CENTER_C(:class='"w-1/2"')
								P.Subtitle_2 {{t('help_vip_problem')}}
								p {{t('help_vip_problem_desc')}}

</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { SearchOutlined } from '@ant-design/icons-vue';
	import { useI18n } from 'vue-i18n';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const video = `${window.staticPath}/static/img/helpCenter/video.png`;
	const FAQ_1 = `${window.staticPath}/static/img/helpCenter/FAQ_1.svg`;
	const FAQ_2 = `${window.staticPath}/static/img/helpCenter/FAQ_2.svg`;
	const FAQ_3 = `${window.staticPath}/static/img/helpCenter/FAQ_3.svg`;
	const FAQ_4 = `${window.staticPath}/static/img/helpCenter/FAQ_4.svg`;
	const FAQ_5 = `${window.staticPath}/static/img/helpCenter/FAQ_5.svg`;
	const FAQ_6 = `${window.staticPath}/static/img/helpCenter/FAQ_6.svg`;

	const userName = ref('');
</script>

<style scoped lang="scss"></style>
