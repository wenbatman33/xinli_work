<template lang="pug">
//- 賽事彈窗
van-popup(:show='show', round, position='bottom', teleport='.popupTeleport', @click-overlay='clickOverlay')
    //- 彈窗內容
    .w-full.flex.flex-col.pb-8
        //- 關閉按鈕
        van-button.w-full.h-auto.p-4.bg-transparent.border-transparent(@click='clickClose')
            .flex.justify-center.items-center
                img.w-4.h-4(src='/publicAssets/img/event/uefaeuro_2020/icon-bottomarrow@3x.png')

        //- 賽事狀態
        .flex.justify-center.items-center.mt-2.px-4
            .text-live.text-sm.font-bold(v-if='isLive') 赛事进行中
            .text-upcoming.text-sm.font-bold(v-else-if='isUpcoming') 即将开赛
            .text-prepare.text-sm.font-bold(v-else) 未开赛

        //- 賽事名稱
        .flex.justify-center.items-center.mt-1.px-4
            .text-title.text-sm {{ cn }}

        //- 隊伍
        .grid.grid-cols-5.gap-2.mt-4.px-4
            //- 主隊
            .col-span-2.flex.flex-col.items-end
                .flex.flex-col.items-center
                    //- 主隊隊徽
                    img.w-14.h-14(:src='hlog', @error='errorTeamImg')
                    
                    //- 主隊名稱
                    .text-team.text-sm.mt-1 {{ home }}
                    
                    //- 客隊名稱(使左右寬度一致)
                    .text-team.text-sm.h-0.invisible {{ away }}

            //- VS
            .flex.items-center.justify-center
                img.w-10.h-10(src='/publicAssets/img/event/uefaeuro_2020/icon-vs@3x.png')

            //- 客隊
            .col-span-2.flex.flex-col.items-start
                .flex.flex-col.items-center
                    //- 客隊隊徽
                    img.w-14.h-14(:src='alog', @error='errorTeamImg')
                    
                    //- 客隊名稱
                    .text-team.text-sm.mt-1 {{ away }}
                    
                    //- 主隊名稱(使左右寬度一致)
                    .text-team.text-sm.h-0.invisible {{ home }}


        //- 暫無主播開播
        .flex.flex-col.items-center.mt-6.px-4(v-if='anchorListEmpty')
            .header.text-base.font-bold 暂无主播开播
            img.mt-6(class='w-1/2 md:w-1/3', src='/publicAssets/img/event/uefaeuro_2020/icon-null@3x.png')

        //- 選擇賽事主播
        .flex.flex-col.justify-center.flex-stretch.mt-4.px-4(v-else)
            //- 標題
            .text-header.text-base.self-center.font-bold 选择赛事主播
            
            //- 主播列表
            .flex.flex-col.flex-stretch.mt-4
                anchor-item(v-for='item in anchorList', :item='item')
</template>
<script>
import { computed } from 'vue';
import anchorItem from '@/views/event/uefaeuro_2020/anchorItem.vue';
import dayjs from 'dayjs';

export default {
    components: {
        anchorItem,
    },
	props: {
		show: Boolean,
		item: Object,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 開賽時間
		const beginDate = computed(() => {
			const beginDate = props?.item?.begin_date || '';
			const date = props?.item?.date || '';
			const begin1 = props?.item?.begin1 || '';
			const time = props?.item?.time || '';
			try {
				return dayjs(`${beginDate || date} ${begin1 || time}`);
			} catch (e) {
				return dayjs().add();
			}
		});

		// 是否直播中
		const isLive = computed(() => {
			const isEqualsNow = beginDate.value.isSame(dayjs());
			const isBeforeNow = beginDate.value.isBefore(dayjs());
			return isEqualsNow || isBeforeNow;
		});

		// 是否即將開賽
		const isUpcoming = computed(() => {
			const isAfterNow = beginDate.value.isAfter(dayjs());
			const in10Minute = beginDate.value.add(-11, 'minute').isBefore(dayjs());
			return isAfterNow && in10Minute;
		});

		// 賽事名稱
		const cn = computed(() => {
			return props?.item?.cn || '';
		});

		// 主隊名稱
		const home = computed(() => {
			return props?.item?.home || '';
		});

		// 主隊隊徽
		const hlog = computed(() => {
			return props?.item?.hlog || '';
		});

		// 客隊名稱
		const away = computed(() => {
			return props?.item?.away || '';
		});

		// 客隊隊徽
		const alog = computed(() => {
			return props?.item?.alog || '';
		});

		// 主播列表
		const anchorList = computed(() => {
			const liveAnchorList = props?.item?.live_anchor_info || [];
			liveAnchorList.forEach((element) => {
				element.isLive = true;
			});
			const scheduledAnchorList = props?.item?.anchor_info || [];
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
		const anchorListEmpty = computed(() => {
			return anchorList.value.length === 0;
		});

		// 隊徽圖片讀取失敗
		const errorTeamImg = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-team-placeholder-gray@3x.png';
		};

        // 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

        // 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};
		return {
            isLive,
            isUpcoming,
            cn,
            home,
            hlog,
            away,
            alog,
            anchorList,
            anchorListEmpty,
            errorTeamImg,
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
.text-team {
    color: #191919;
}
.text-header {
    color: #191919;
}
</style>