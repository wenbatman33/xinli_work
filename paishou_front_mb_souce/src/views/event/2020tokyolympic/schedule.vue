<template lang="pug">
//- 東奧競猜
.relative.w-full.min-h-full.flex.flex-col.items-stretch.bg-schedule
    //- 底部花紋
    img.absolute.z-10.bottom-0.object.contain(src='/publicAssets/img/event/2020tokyolympic/icon-footer@3x.png')

    //- 導覽欄
    .z-10.grid.grid-cols-nav.gap-2.px-4.mt-8
        //- 東奧標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-logo@3x.png', @click='clickLogo')

        //- 拍手標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-paishou@3x.png', @click='clickPaishou')

    //- 分類列表
    class-list.mt-4.mx-6(:selected='state.liveClassId', @update:selected='updateClass')

    //- 日期列表
    days-list.mt-8(:list='dayList', :selected='day', @update:selected='updateDay')

    //- 加載中
    .text-sm.text-white.text-center.p-8(v-if='state.loading') 加载中

    //- 目前沒有紀錄
    .text-sm.text-white.text-center.p-8(v-else-if='scheduleListEmpty') 目前没有紀錄

    //- 賽程列表
    schedules-list.mt-6(v-else, :list='state.scheduleList', @update:appointment='updateAppointment')

    //- 填滿空白
    .flex-grow

    //- 版權聲明
    .z-40.flex.flex-col.items-center.text-copyright.pt-12.pb-8.bg-copyright Copyright © paishou 2021
</template>
<script>
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { scheduleList } from '@/api';
import classList from '@/components/event/2020tokyolympic/classList.vue';
import daysList from '@/components/event/2020tokyolympic/dayList.vue';
import schedulesList from '@/components/event/2020tokyolympic/scheduleList.vue';
import dayjs from 'dayjs';

export default {
    components: {
        classList,
        daysList,
        schedulesList,
    },
    setup() {
        // Vue router
        const router = useRouter();

        // Component state
        const state = reactive({
            loading: false,
            scheduleList: [],
            liveClassId: 1,
            selectedDay: undefined,
        });

        // 日期列表
        const dayList = computed(() => {
            // Construct variables
            const list = [];
            const now = dayjs();

            // Compute init date
            var init, count;
            const startTime = dayjs('2021-07-21 00:00:00', 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
            const endTime = dayjs('2021-08-08 23:59:59', 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
            if (now.isBetween(startTime, endTime)) {
                init = now;
            } else {
                init = startTime;
            }

            // Compute item count
            const diffHours = endTime.diff(init, 'hour');
            if (diffHours < (24 * 7)) {
                count = Math.ceil(diffHours / 24);
            } else {
                count = 7;
            }

            // Generate day items
            for (var i = 0; i < count; i++) {
                const day = init.add(i, 'd');
                list.push(day);
            }
            return list;
        });

        // 選擇的時間
        const day = computed(() => {
            if (state.selectedDay) {
                return state.selectedDay;
            } else {
                return dayList.value[0];
            }
        });

		// 取得賽程列表
		const getScheduleList = () => {
			// Update loading state
			state.loading = true;

			// Compute start time
			var startTime = day.value.unix();

			// Compute end time
			const endTime = day.value.set('hour', 23).set('minute', 59).set('second', 0).set('millisecond', 0).unix();

			// Get schedule list
			scheduleList({
				pageSize: 9999,
				page: 1,
				liveclassid: state.liveClassId,
				collaboration: 2,
				start_time: startTime,
				end_time: endTime,
			}).then(
				(res) => {
					// Update schedlue list
                    state.scheduleList = res?.data?.list || [];

					// Revert loading state
					state.loading = false;
				},
				() => {
					// Revert loading state on error
					state.loading = false;
				}
			);
		};

        // 賽事列表是否為空
        const scheduleListEmpty = computed(() => {
            return state.scheduleList.length === 0;
        });

        // 更新選擇的分類
        const updateClass = (liveClassId) => {
            state.liveClassId = liveClassId;
            getScheduleList();
        };

        // 更新選擇的時間
        const updateDay = (day) => {
            state.selectedDay = day;
            getScheduleList();
        };

		// 更新預約狀態
		const updateAppointment = ({ eid, is_appointment }) => {
			state.scheduleList = state.scheduleList.map((element) => {
				if (element.eid === eid) {
					return {
						...element,
						is_appointment,
					}
				} else {
					return element;
				}
			});
		};

        // 點擊東奧標誌
        const clickLogo = () => {
            router.replace('/event/2020tokyolympic/home');
        };

        // 點擊拍手標誌
        const clickPaishou = () => {
            router.replace('/');
        };

        // On component mounted
        onMounted(() => {
            getScheduleList();
        });
        return {
            state,
            dayList,
            day,
            scheduleListEmpty,
            updateClass,
            updateDay,
            updateAppointment,
            clickLogo,
            clickPaishou,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-schedule {
    background: linear-gradient(152.52deg, #0030FB 29.08%, #0007A4 53.87%), #FFFFFF;
}
.grid-cols-nav {
    grid-template-columns: 1fr auto;
}
.bg-copyright {
    background: linear-gradient(360deg, #000467 0%, rgba(1, 7, 164, 0) 100%);
}
.text-copyright {
    color: #FFFFFF;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
}
</style>