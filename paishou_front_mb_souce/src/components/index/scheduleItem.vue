<template lang="pug">
//- 賽程物件
.relative(:class='$attrs.class')
    //- 物件按鈕
    van-button.absolute.w-full.h-full.p-0.rounded-md.bg-transparent.border-transparent(@click='clickItem')

    //- 物件內容
    .flex.flex-col.items-stretch.rounded-md.shadow-item.w-item.px-4.py-3
        //- 賽事資訊
        .grid.grid-cols-info.gap-2.items-center
            //- 賽事分類
            .bg-class-name.rounded.text-sm.text-white.p-2 {{ className }}

            //- 資訊內容
            .flex.flex-col.items-stretch.overflow-hidden
                //- 賽事進行中
                .text-live.text-xs.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-if='showLiveText') 赛事进行中

                //- 賽事日期
                .text-date.text-xs.font-normal.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-else) {{ date }}

                //- 賽事名稱
                .text-title.text-xs.font-normal.whitespace-nowrap.overflow-hidden.overflow-ellipsis(class='mt-0.5') {{ title }}

            //- 按鈕群
            .flex.flex-col.items-center
                //- 直播中按鈕
                van-button.w-8.h-8.p-0.rounded-full.shadow.bg-transparent.border-transparent(v-if='showLiveButton', @click='clickItem')
                    img.w-full.h-full.object-contain(src='/publicAssets/img/index/img-live-a@3x.png') 

                //- 取消預約按鈕
                van-button.w-8.h-8.p-0.rounded-full.shadow.bg-cancel.border-transparent(v-else-if='showCancelButton', :loading='state.isLoading', @click='clickCancel')
                    img.w-full.h-full.object-contain(src='/publicAssets/img/index/bells-button-bells-on@3x.png')
                    template(#loading)
                        .w-full.h-full.flex.justify-center.items-center
                            van-loading.w-4.h-4(color='#ffffff', type='spinner')

                //- 預約賽事按鈕
                van-button.w-8.h-8.p-0.rounded-full.shadow.bg-white.border-transparent(v-else, :loading='state.isLoading', @click='clickAppointment')
                    img.w-full.h-full.object-contain(src='/publicAssets/img/index/bells-button-bells-off@3x.png')
                    template(#loading)
                        .w-full.h-full.flex.justify-center.items-center
                            van-loading.w-4.h-4(color='#a62337', type='spinner')

        //- 主隊資訊
        .grid.grid-cols-team.gap-1.items-center.mt-3
            //- 主隊隊徽
            img.w-4.h-4.object-contain(:src='homeLogo', @error='errorLogoImg')

            //- 主隊名稱
            .text-team-name.text-sm.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ homeName }}

            //- 主隊分數
            .text-team-score.text-base.text-center.font-bold(:class='{ "invisible": !showScore }') {{ homeScore }}

        //- 客隊資訊
        .grid.grid-cols-team.gap-1.items-center.mt-2
            //- 客隊隊徽
            img.w-4.h-4.object-contain(:src='awayLogo', @error='errorLogoImg')

            //- 客隊名稱
            .text-team-name.text-sm.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ awayName }}

            //- 客隊分數
            .text-team-score.text-base.text-center.font-bold(:class='{ "invisible": !showScore }') {{ awayScore }}

//- 賽程彈窗
schedule-popup(v-model:show='state.isShowPopup', :data='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { appointment } from '@/api';
import { isLive, isUpcoming, showLiveIcon } from '@/utils';
import schedulePopup from '@/components/schedule/schedulePopup.vue';
import dayjs from 'dayjs';

export default {
    components: {
		schedulePopup,
    },
    props: {
        item: Object,
    },
    emits: ['update:appointment'],
    setup(props, { emit }) {
		// Vue store
		const store = useStore();

		// Component state
		const state = reactive({
            isLoading: false,
			isShowPopup: false,
		});

		// User id
		const uid = computed(() => {
			return store.state?.user?.uid || '';
		});

		// 賽事分類
		const className = computed(() => {
			const classList = store?.state?.config?.classList || [];
			const classItem = classList.find((element) => element.id === props?.item?.classid);
			return classItem?.name || '';
		});

		// 賽事日期
		const date = computed(() => {
            const value = props?.item?.begin || 0;
            return dayjs(value * 1000).format('MM/DD HH:mm');
        });

		// 賽事名稱
		const title = computed(() => {
			return props?.item?.cn || props?.item?.title || '';
		});

		// 主隊隊徽
		const homeLogo = computed(() => {
			return props?.item?.hlog || props?.item?.home_logo || '';
		});

		// 主隊名稱
		const homeName = computed(() => {
			return props?.item?.home || props?.item?.home_name || '';
		});

		// 主隊分數
		const homeScore = computed(() => {
			return props?.item?.homescore || 0;
		});

		// 客隊隊徽
		const awayLogo = computed(() => {
			return props?.item?.alog || props?.item?.away_logo || '';
		});

		// 客隊名稱
		const awayName = computed(() => {
			return props?.item?.away || props?.item?.away_name || '';
		});

		// 客隊分數
		const awayScore = computed(() => {
			return props?.item?.awayscore || 0;
		});

		// 是否顯示比分
		const showScore = computed(() => {
			const item = props?.item || {};
			return isLive(item) || isUpcoming(item);
		});

		// 是否賽事進行中文字
		const showLiveText = computed(() => {
			return isLive(props?.item || {});
		});

		// 是否即將開賽文字
		const showUpcomingText = computed(() => {
			return isUpcoming(props?.item || {});
		});

		// 是否顯示 LIVE 按鈕
		const showLiveButton = computed(() => {
			return showLiveIcon(props?.item || {});
		});

		// 是否顯示取消預約按鈕
		const showCancelButton = computed(() => {
			return props?.item?.is_appointment === true;
		});

		// 隊徽圖片讀取失敗
		const errorLogoImg = (e) => {
			e.target.src = '/publicAssets/img/schedule/icon-soccer-gray@3x.png';
		};

		// 點擊賽事物件
		const clickItem = () => {
			state.isShowPopup = true;
		};

		// 點擊預約按鈕
		const clickAppointment = () => {
			// Update loading state
			state.isLoading = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				eid: Number(props?.item?.eid),
				liveclassid: Number(props?.item?.classid),
				status: 1,
			};

			// Appointment
			appointment(payload)
				.then(() => {
					// Update appointment state
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: true,
					});

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Update appointment state
					props.item.is_appointment = true;

					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// 點擊取消預約按鈕
		const clickCancel = () => {
			// Update loading state
			state.isLoading = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				eid: Number(props?.item?.eid),
				liveclassid: Number(props?.item?.classid),
				status: 2,
			};

			// Appointment
			appointment(payload)
				.then(() => {
					// Update appointment state
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: false,
					});

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Update appointment state
					emit('update:appointment', { 
						eid: props?.item?.eid,
						is_appointment: false,
					});

					// Revert loading state on error
					state.isLoading = false;
				});
		};
        return {
            state,
            className,
            date,
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
			showLiveButton,
			showCancelButton,
            errorLogoImg,
            clickItem,
            clickAppointment,
            clickCancel,
        };
    },
};
</script>
<style lang="scss" scoped>
.w-item {
    width: 220px;
}
.shadow-item {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}
.grid-cols-info {
    grid-template-columns: auto 1fr auto;
}
.bg-class-name {
    background: #a62337;
}
.text-live {
    color: #a62337;
}
.text-date {
    color: #191919;
}
.text-title {
    color: #c8c8c8;
}
.bg-cancel {
	background: #f2994a;
}
.grid-cols-team {
    grid-template-columns: auto 1fr minmax(2rem, auto);
}
</style>