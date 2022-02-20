<template lang="pug">
//- 賽程彈窗
van-popup(:show='show', position='bottom', round, teleport='.popupTeleport', @click-overlay='clickOverlay')
	//- 彈窗內容
	.flex.flex-col.items-stretch.pb-8
		//- 關閉按鈕
		van-button.w-full.h-auto.p-4.bg-transparent.border-transparent(@click='clickClose')
			img.w-4.h-4(src='/publicAssets/img/schedule/icon-bottomarrow@3x.png')

		//- 賽事狀態
		.flex.flex-col.items-center.mt-2.px-6
			//- 賽事進行中
			.text-live.text-sm.font-bold(v-if='showLiveText') 赛事进行中

			//- 即將開賽
			.text-upcoming.text-sm.font-bold(v-else-if='showUpcomingText') 即将开赛

			//- 未開賽
			.text-prepare.text-sm.font-bold(v-else) 未开赛

		//- 賽事名稱
		.text-title.text-sm.text-center.mt-1.px-6 {{ title }}

		//- 隊伍資訊
		.grid.grid-cols-5.gap-2.mt-4.px-6
			//- 主隊資訊
			.col-span-2.flex.flex-col.items-end
				//- 主隊資訊內容
				.flex.flex-col.items-center
					//- 主隊隊徽
					img.w-14.h-14.object-contain(:src='homeLogo', @error='errorLogoImg')
					
					//- 主隊名稱
					.text-team-name.text-sm.mt-1 {{ homeName }}
					
					//- 客隊名稱(使左右寬度一致)
					.text-team-name.text-sm.h-0.invisible {{ awayName }}

					//- 主隊分數
					.text-team-score.text-lg.font-bold.mt-2(v-if='showScore') {{ homeScore }}

			//- VS
			.flex.items-center.justify-center
				img.w-10.h-10(src='/publicAssets/img/schedule/vs@3x.png')

			//- 客隊資訊
			.col-span-2.flex.flex-col.items-start
				//- 客隊資訊內容
				.flex.flex-col.items-center
					//- 客隊隊徽
					img.w-14.h-14.object-contain(:src='awayLogo', @error='errorLogoImg')
					
					//- 客隊名稱
					.text-team-name.text-sm.mt-1 {{ awayName }}
					
					//- 主隊名稱(使左右寬度一致)
					.text-team-name.text-sm.h-0.invisible {{ homeName }}

					//- 客隊分數
					.text-team-score.text-lg.font-bold.mt-2(v-if='showScore') {{ awayScore }}

		//- 暫無主播開播
		.flex.flex-col.items-center.mt-6.px-6(v-if='combineAnchorListEmpty')
			//- 標題
			.text-empty.text-base.font-bold 暂无主播开播

			//- 圖示
			img.mt-6(class='w-1/2 md:w-1/3', src='/publicAssets/img/icon-null@3x.png')

		//- 主播列表
		.flex.flex-col.items-stretch.mt-2.px-6(v-else)
			//- 標題
			.text-anchor-list.text-base.text-center.font-bold 选择赛事主播
				
			//- 列表
			anchor-list.mt-4(:list='combineAnchorList', :path='path')
</template>
<script>
import { computed } from 'vue';
import { isLive, isUpcoming } from '@/utils';
import anchorList from '@/components/schedule/anchorList.vue';

export default {
	components: {
		anchorList,
	},
	props: {
		show: Boolean,
		data: Object,
		path: String,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 比賽名稱
		const title = computed(() => {
			return props?.data?.cn || props?.data?.title || '';
		});

		// 主隊隊徽
		const homeLogo = computed(() => {
			return props?.data?.hlog || props?.data?.home_logo || '';
		});

		// 主隊名稱
		const homeName = computed(() => {
			return props?.data?.home || props?.data?.home_name || '';
		});

		// 主隊分數
		const homeScore = computed(() => {
			return props?.data?.homescore || 0;
		});

		// 客隊隊徽
		const awayLogo = computed(() => {
			return props?.data?.alog || props?.data?.away_logo || '';
		});

		// 客隊名稱
		const awayName = computed(() => {
			return props?.data?.away || props?.data?.away_name || '';
		});

		// 客隊分數
		const awayScore = computed(() => {
			return props?.data?.awayscore || 0;
		});

		// 是否顯示比分
		const showScore = computed(() => {
			const data = props?.data || {};
			return isLive(data) || isUpcoming(data);
		});
		
		// 是否賽事進行中文字
		const showLiveText = computed(() => {
			return isLive(props?.data || {});
		});

		// 是否即將開賽文字
		const showUpcomingText = computed(() => {
			return isUpcoming(props?.data || {});
		});

		// 主播列表
		const combineAnchorList = computed(() => {
			const liveAnchorList = props?.data?.live_anchor_info || [];
			liveAnchorList.forEach((element) => {
				element.isLive = true;
			});
			const scheduledAnchorList = props?.data?.anchor_info || [];
			const offlineAnchorList = scheduledAnchorList.filter((element) => {
				for (var i = 0; i < liveAnchorList.length; i++) {
					if (element.id === liveAnchorList[i].id) {
						return false;
					}
				}
				return true;
			});
			const combinedAnchorList = liveAnchorList.concat(offlineAnchorList);
			return combinedAnchorList;
		});

		// 主播列表是否為空
		const combineAnchorListEmpty = computed(() => {
			const liveAnchorList = props?.data?.live_anchor_info || [];
			const scheduledAnchorList = props?.data?.anchor_info || [];
			return liveAnchorList.length === 0 && scheduledAnchorList.length === 0;
		});

		// 隊徽圖片讀取失敗
		const errorLogoImg = (event) => {
			event.target.src = '/publicAssets/img/schedule/icon-soccer-gray@3x.png';
		};

		// 點擊遮罩層
		const clickOverlay = (value) => {
			emit('update:show', value);
		};

		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};
		return {
			title,
			homeLogo,
			homeName,
			homeScore,
			awayLogo,
			awayName,
			awayScore,
			showScore,
			showLiveText,
			showUpcomingText,
			combineAnchorList,
			combineAnchorListEmpty,
			errorLogoImg,
			clickOverlay,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-live {
	color: #a62337;
}
.text-upcoming {
	color: #f8b62d;
}
.text-prepare {
	color: #969696;
}
.text-title {
	color: #c8c8c8;
}
.text-team-name {
	color: #191919;
}
.text-team-score {
	color: #191919;
}
.text-empty {
	color: #191919;
}
.text-anchor-list {
	color: #191919;
}
</style>
