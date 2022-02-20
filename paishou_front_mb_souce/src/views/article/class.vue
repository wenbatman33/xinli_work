<template lang="pug">
//- 文章分類列表
.article-class.flex.flex-col.items-stretch
    //- 導覽欄
    nav-bar(search, @click-logo='clickLogo', @click-search='clickSearch', @click-avatar='clickAvatar', @click-login='clickLogin')

    //- 分類
    van-tabs.w-full(:active='state.activeTab', animated, swipeable, @update:active='updateActive')
        //- 熱門
        van-tab(title='热门', :name='0')
            class-list(:class-id='0', class-name='精選')

        //- 分類列表
        van-tab(v-for='item in state.classList', :title='item.name', :name='item.id')
            class-list(:class-id='item.id', :class-name='item.name')
</template>
<script>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { articleClass } from '@/api';
import { matomo_articleClass_check_class } from '@/matomoTrackEvent.js'
import navBar from '@/components/index/navBar.vue';
import classList from '@/components/article/classList.vue';

export default {
	components: {
		navBar,
		classList,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Captor current tab query
		const initTab = route.query.tab;

		// Component state
		const state = reactive({
			loading: false,
			activeTab: 0,
			classList: [],
		});

		// 更新選擇的分類
		const updateActive = (classId) => {
			// Update active tab
			state.activeTab = classId;

			// Replace query params
			router.replace({
				query: {
					tab: classId,
				},
			});

			// Matomo track
			const className = state?.classList?.find((element) => element.id === classId)?.name || '热门';
			matomo_articleClass_check_class(className, classId);
		};

		// 點擊 Logo
		const clickLogo = () => {
			router.replace('/');
		};
		
		// 點擊搜尋
		const clickSearch = () => {
			router.push('/article/search');
		};

		// 點擊頭像
		const clickAvatar = () => {
			router.push('/personal');
		};

		// 點擊登入
		const clickLogin = () => {
			router.push('/login');
		};

		// On component mounted
		onMounted(() => {
			// Update loading state
			state.loading = true;

			// Get article class list
			articleClass()
				.then((res) => {
					// Update class list
					state.classList = res?.data?.list || [];

					// Revert loading state on finished
					state.loading = false;

					// Update active tab after rendered
					if (/\d+/.test(initTab)) {
						setTimeout(() => {
							state.activeTab = Number(initTab);
						}, 500);
					}
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});
		});
		return {
			state,
			updateActive,
			clickLogo,
			clickSearch,
			clickAvatar,
			clickLogin,
		};
	},
};
</script>
<style lang="scss" scoped>
.article-class {
	width: 100%;
	height: auto;
	padding-bottom: 40px;
	overflow: hidden;
	::v-deep(.van-tab) {
		color: #191919;
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
}
</style>
