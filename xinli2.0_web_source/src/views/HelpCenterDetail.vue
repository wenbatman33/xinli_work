<template lang="pug">
.pageContainer
	.container.min-h-screen.py-8
		.FLEX_R
			.faqMenuLink.flex-shrink-0(:class='"w-[130px]"') 
				.faqMenuLinkItem.h-14( v-for='(item, index) in faqMenuLink')
					router-link(:to='item.path' @click='init(currentID=item.id)')
						.CENTER.h-full.cursor-pointer.border-b.px-8(:class='{ "bg-gray-200": currentID===item.id}')
							.text-center.Subtitle_4.opacity-60 {{item.name}}
			.faq.FLEX_C.flex-grow.ml-4
				.title.mb-4
					router-link(to='/helpCenter') {{t('footer_subLink_2')}}
					span.mx-4 &gt;
					span.font-bold {{currenttTitle}}
				a-collapse.w-full.border-none(v-model:activeKey="activeKey")
					a-collapse-panel(v-for='item in currentJsonData' :header="item?.title")
						//- p(v-if='item.isVideo') {{item.content}}
						video(v-if='item.isVideo' width="320" height="240" controls)
							source(:src="item.videoUrl" type="video/mp4")

						//- p.text-xRed(v-if='item.isVideo===false') {{item.content}}
						.helpCenterDetail.w-full(v-if='item.isVideo===false'  v-html='item.content')
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useI18n } from 'vue-i18n';

	import FAQ_json from '@static/json/faq.json';

	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();

	const currentID = ref(0);
	const currentJsonData = ref([] as any[]);
	const currenttTitle = ref('');
	const activeKey = ref([]);

	const faqMenuLink = ref([
		{ id: 0, path: '/helpCenter', name: t('help_problem_index') },
		{ id: 1, path: '/helpCenter/details/1', name: t('help_game_problem_title') },
		{ id: 2, path: '/helpCenter/details/2', name: t('help_browsing_problem') },
		{ id: 3, path: '/helpCenter/details/3', name: t('help_funding_problem') },
		{ id: 4, path: '/helpCenter/details/4', name: t('help_account_problem') },
		{ id: 5, path: '/helpCenter/details/5', name: t('help_general_problem') },
		{ id: 6, path: '/helpCenter/details/6', name: t('help_game_problem') },
		{ id: 7, path: '/helpCenter/details/7', name: t('help_vip_problem') },
	]);
	const init = (id: number) => {
		currenttTitle.value = faqMenuLink.value[id].name;
		currentID.value = Number(id);
		currentJsonData.value = [];
		activeKey.value = [];
		currentJsonData.value = FAQ_json.data.filter((item) => {
			return item.categoryName.indexOf(faqMenuLink.value[id].name) > 0;
		});
	};
	onMounted(() => {
		init(Number(route.params.id));
	});
</script>

<style lang="scss">
	.helpCenterDetail {
		table {
			border: 1px solid #333 !important;
			border-color: #333 !important;
			tr,
			td {
				border: 1px solid #333 !important;
				border-color: #333 !important;
			}
		}
	}
</style>
