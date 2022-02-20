<template lang="pug">
//- 首頁(火熱)
.index
	//- 導覽欄
	nav-bar(contribution, search, @click-contribution='clickContribution', @click-search='clickSearch', @click-avatar='clickAvatar', @click-login='clickLogin')

	//- 分類
	van-tabs.w-full(:active='state.activeTab', animated, swipeable, @update:active='updateActive')
		//- 活動
		van-tab(title='活动', name='campaign')
			campaign

		//- 推薦
		van-tab(title='推荐', name='recommend')
			recommend(:class-list='state.classList', @click-more='clickMoreClass')

		//- 分類
		van-tab(v-for='(item, index) in state.classList', :title='item.name', :name='`${item.id}`')
			class-live(:class-id='item.id', :class-name='item.name')
</template>
<script>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { classList } from '@/api';
import { matomo_index_check_campaign, matomo_index_check_class, matomo_index_check_contribution, matomo_index_check_search, matomo_index_check_personal } from '@/matomoTrackEvent.js';
import navBar from '@/components/index/navBar.vue';
import divider from '@/components/divider';
import campaign from '@/components/index/campaign.vue';
import recommend from '@/components/index/recommend.vue';
import classLive from '@/components/index/classLive.vue';

export default {
	components: {
		navBar,
		divider,
		campaign,
		recommend,
		classLive,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Captor current tab query
		const initTab = route.query.tab;

		// Component state
		const state = reactive({
			classList: [],
			activeTab: 'recommend',
		});

		// 點擊頁籤
		const updateActive = (name) => {
			// Update active tab
			state.activeTab = name;

			// Replace query params
			router.replace({
				query: {
					tab: name,
				},
			});

			// Matomo track
			if (name === 'campaign') {
				matomo_index_check_campaign();
			} else if (name === 'recommand') {
				// matomo_index_check_recommend();
			} else {
				const classElement = state?.classList?.find((element) => element.name === name);
				const classId = classElement?.id;
				matomo_index_check_class(name, classId);
			}
		};

		// 點擊排行榜
		const clickContribution = () => {
			router.push('/contribution');
			matomo_index_check_contribution();
		};

		// 點擊搜尋
		const clickSearch = () => {
			router.push('/search');
			matomo_index_check_search();
		};

		// 點擊頭像
		const clickAvatar = () => {
			router.push('/personal');
			matomo_index_check_personal();
		};

        // 點擊登入
        const clickLogin = () => {
			router.push('/login');
        };

		// 點擊更多分類
		const clickMoreClass = (id) => {
			state.activeTab = `${id}`;
		};

        // On component mounted
		onMounted(() => {
			// Get class list
			classList({ filter: 1 }).then((res) => {
				// Update class list
				state.classList = res?.data?.list || [];

				// Update active tab after rendered
				if (initTab) {
					setTimeout(() => {
						state.activeTab = initTab;
					}, 500);
				}
			});
		});
		return {
			state,
			updateActive,
			clickContribution,
			clickSearch,
			clickAvatar,
			clickLogin,
			clickMoreClass,
		};
	},
};
</script>
<style lang="scss" scoped>
.index {
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
