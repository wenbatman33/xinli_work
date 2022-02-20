<template lang="pug">
//- 排行榜列表
.contribution-list.pb-8
	//- 目前暫無紀錄
	empty(v-if='isEmpty')

	//- 貢獻榜列表
	.flex.flex-col(v-else)
		//- 前三名
		.grid.grid-cols-3.gap-2.px-4
			//- 第二名
			contributionTop3(:item='top2', :rank='2', :type='type', :path='path', @click-item='clickItem', @click-follow='clickFollow')

			//- 第一名
			contributionTop3(:item='top1', :rank='1', :type='type', :path='path', @click-item='clickItem', @click-follow='clickFollow')

			//- 第三名
			contributionTop3(:item='top3', :rank='3', :type='type', :path='path', @click-item='clickItem', @click-follow='clickFollow')

		//- 第四名後
		.mt-2
			contribution-item(v-for='(item, index) in after4', :item='item', :rank='index + 4', :type='type', :path='path', @click-item='clickItem', @click-follow='clickFollow')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { setattent } from '@/api';
import { matomo_contribution_follow, matomo_contribution_unfollow, matomo_contribution_watch } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import contributionTop3 from '@/components/contribution/contributionTop3.vue';
import contributionItem from '@/components/contribution/contributionItem.vue';

export default {
	components: {
		empty,
		contributionTop3,
		contributionItem,
	},
	props: {
		type: String,
		path: String,
		list: Array,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// User id
		const uid = computed(() => store?.state?.user?.uid || '');

		// 資料是否為空
		const isEmpty = computed(() => !props.list || props.list.length === 0);

		// 空資料
		const getBlankData = () => {
			return {
				avatar: '/publicAssets/img/contribution/default-grayscale.png',
				is_blank: true,
			};
		};

		// 第一名
		const top1 = computed(() => {
			return props.list[0] || getBlankData();
		});

		// 第二名
		const top2 = computed(() => {
			return props.list[1] || getBlankData();
		});

		// 第三名
		const top3 = computed(() => {
			return props.list[2] || getBlankData();
		});

		// 第四名後
		const after4 = computed(() => {
			const sliceList = props.list?.slice(3) || [];
			while (sliceList.length < 7) {
				sliceList[sliceList.length] = getBlankData();
			}
			return sliceList;
		});

		// 點擊物件
		const clickItem = (item) => {
			// Check list type
			if (props.type === 'user') {
				return;
			}

			// Check blank flag
			if (item.is_blank === true) {
				return;
			}

			// Navigate live room
			router.push(`/room/${item.uid}`);

			// Matomo track
			matomo_contribution_watch(item.user_nicename, item.uid);
		}

		// 點擊關注按鈕
		const clickFollow = (item) => {
			// Check blank flag
			if (item.is_blank === true) {
				return;
			}

			// Update loading state
			item.is_loading = true;

			// Previous follow state
			const isFollow = item.is_follow;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				touid: Number(item.uid),
			};

			// Set attent
			setattent(payload)
				.then((res) => {
					// Update follow state
					item.is_follow = res?.data?.isattent === 1;

					// Revert loading state on finished
					item.is_loading = false;
				})
				.catch(() => {
					// Revert loading state on error
					item.is_loading = false;
				});

			// Matomo track
			if (isFollow) {
				matomo_contribution_unfollow(item.user_nicename, item.uid);
			} else {
				matomo_contribution_follow(item.user_nicename, item.uid);
			}
		};
		return {
			isEmpty,
			top1,
			top2,
			top3,
			after4,
			clickItem,
			clickFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.contribution-list {
	width: 100%;
}
</style>