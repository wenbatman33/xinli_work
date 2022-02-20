<template lang="pug">
//- 主播預約賽事物件
.appointment-item.flex.flex-col.items-stretch.shadow.rounded-xl.pl-4.py-4
    //- 賽事資訊
    .flex.flex-row.items-center
        //- 圖示
        img.w-6.h-6.flex-shrink-0(src='/publicAssets/img/room/icon-basketball@3x.png')

        //- 資訊
        .flex.flex-col.flex-grow.ml-2
            .date.text-sm.font-bold {{ date }}
            .name.text-sm.font-normal {{ item.cn }}

        //- 已預約
        van-button.cancel-button.flex-shrink-0.rounded-tl-full.rounded-bl-full(v-if='item?.is_appointment === true', :loading='state.isLoading', @click='clickAppointment')
            .flex.flex-row.items-center.px-3.py-2
                img.w-5.h-5(src='/publicAssets/img/room/icon-bell@3x.png')
                .text-sm.font-normal.ml-2 已预约
            template(#loading)
                .flex.flex-row.items-center.px-3.py-2
                    van-loading.w-5.h-5(type='spinner', color='#ffffff')
                    .text-sm.font-normal.ml-2 已预约

        //- 預約賽事
        van-button.appointment-button.flex-shrink-0.rounded-tl-full.rounded-bl-full(v-else, :loading='state.isLoading', @click='clickAppointment')
            .flex.flex-row.items-center.px-3.py-2
                img.w-5.h-5(src='/publicAssets/img/room/icon-bell-line@3x.png')
                .text-sm.font-normal.ml-2 预约赛事
            template(#loading)
                .flex.flex-row.items-center.px-3.py-2
                    van-loading.w-5.h-5(type='spinner', color='#ffffff')
                    .text-sm.font-normal.ml-2 预约赛事

    //- 主隊
    .flex.flex-row.items-center.mt-4.pr-4
        //- 隊徽
        img.w-6.h-6.flex-shrink-0(:src='item.hlog || ""', @error='errorLogoImg')

        //- 隊名
        .text-sm.font-bold.ml-2 {{ item.home }}

    //- 客隊
    .flex.flex-row.items-center.mt-2.pr-4
        //- 隊徽
        img.w-6.h-6.flex-shrink-0(:src='item.alog || ""', @error='errorLogoImg')

        //- 隊名
        .text-sm.font-bold.ml-2 {{ item.away }}
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { appointment } from '@/api';
import { matomo_room_schedule_appointment } from '@/matomoTrackEvent.js';
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isLoading: false,
		});

		// User id
		const uid = computed(() => {
			return store.state.user.uid || '';
		});

		// Game date
		const date = computed(() => {
			const date = props?.item?.begin_date || '';
			const time = props?.item?.begin_time || '';
			const day = dayjs(`${date} ${time}`);
			const dateOfYear = day.format('YYYY/MM/DD');
			var weekOfDay = '';
			switch (day.day()) {
				case 0:
					weekOfDay = '星期日';
					break;
				case 1:
					weekOfDay = '星期一';
					break;
				case 2:
					weekOfDay = '星期二';
					break;
				case 3:
					weekOfDay = '星期三';
					break;
				case 4:
					weekOfDay = '星期四';
					break;
				case 5:
					weekOfDay = '星期五';
					break;
				case 6:
					weekOfDay = '星期六';
					break;
			}
			const timeOfDay = day.format('h:mm A');
			return `${dateOfYear} ${weekOfDay} ${timeOfDay}`;
		});

        // 隊徽圖片讀取失敗
        const errorLogoImg = (event) => {
			event.target.src = '/publicAssets/img/schedule/icon-soccer-gray@3x.png';
        };

		// 點擊預約
		const clickAppointment = () => {
			// Update loading state
			state.isLoading = true;

			// Previous appointment state
			const isAppointment = props?.item?.is_appointment;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				eid: Number(props?.item?.id),
				liveclassid: props?.item?.classid || 1,
				status: props?.item?.is_appointment ? 2 : 1,
			};

			// Appointment
			appointment(payload)
				.then(() => {
					// Update appointment state
					props.item.is_appointment = !props.item.is_appointment;

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Update appointment state
					props.item.is_appointment = !props.item.is_appointment;

					// Revert loading state on error
					state.isLoading = false;
				});

			// Matomo track
			if (isAppointment) {
				// matomo_room_schedule_cancel();
			} else {
				matomo_room_schedule_appointment(props?.item?.cn, props?.item?.id);
			}
		};
		return {
			state,
            date,
            errorLogoImg,
			clickAppointment,
		};
	},
};
</script>
<style lang="scss" scoped>
.appointment-item {
	.date {
		color: #6d6d6f;
	}
	.name {
		color: #909399;
	}
	.team {
		color: #303133;
	}
	.cancel-button {
		widows: unset;
		height: unset;
        padding: 0;
		color: #ffffff;
		border: transparent;
		background: #aeb8cc;
	}
	.appointment-button {
		widows: unset;
		height: unset;
        padding: 0;
		color: #ffffff;
		border: transparent;
		background: linear-gradient(90deg, #efc81e, #ff8e1d);
	}
}
</style>