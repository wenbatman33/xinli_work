<template lang="pug">
.flex.flex-row.items-center(v-if='show')
	//- 關閉按鈕
	van-button.w-close.h-close.z-20.p-0.rounded-full.bg-transparent.border-transparent(@click='clickClose')
		//- 關閉圖示
		img.w-full.h-full.object-contain(src='/publicAssets/img/app/icon-close@3x.png')

	//- 限時任務懸浮按鈕
	van-button.w-button.h-button.z-10.ml-button.p-0.bg-transparent.border-transparent(@click='clickTask')
		//- 任務圖示
		img.w-full.h-full.object-contain(:src='icon', @error='errorIconImg')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { matomo_index_check_limitTask, matomo_schedule_check_limitTask, matomo_concern_check_limitTask, matomo_search_check_limitTask, matomo_room_check_limitTask } from '@/matomoTrackEvent.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

/**
 * 檢查限時任務時間區間
 * @param start_time 起始時間
 * @param end_time 結束時間
 * @returns 現在是否在任務時間區間中
 */
function taskIsBetweenTime(start_time, end_time) {
	const S_DAY = dayjs().format('YYYY-MM-DD') + ' ' + start_time;
	const E_DAY = dayjs().format('YYYY-MM-DD') + ' ' + end_time;
	return dayjs().isBetween(S_DAY, E_DAY);
}

export default {
    setup() {
        // Vue router
		const route = useRoute();
		const router = useRouter();

        // Vuex store
		const store = useStore();

        // 第一筆有效的限時任務
		const limitTask = computed(() => {
			const limitTaskList = store?.state?.tasks?.limitTaskList || [];
			const onTimeLimitTask = limitTaskList.filter((item) => {
				return taskIsBetweenTime(item.start_time, item.end_time);
			});
			const availableLimitTask = onTimeLimitTask.filter((item) => {
				return item.status === 0 || item.status === 1;
			});
			if (availableLimitTask.length > 0) {
				return availableLimitTask[0];
			} else {
				return undefined;
			}
		});

        // 是否顯示
		const show = computed(() => {
			if (store?.state?.config?.hideFloatLimitTask === true) {
				return false;
			} else if (!limitTask.value) {
				return false;
			} else if (route.path === '/') {
				return true;
			} else if (/\/contribution\/\w+\/\w+/.test(route.path)) {
				return true;
			} else if (route.path === '/schedule') {
				return true;
            } else if (/^\/article\/class/.test(route.path)) {
				return true;
			} else if (route.path === '/personal') {
				return true;
			} else if (route.path === '/search') {
				return true;
			} else if (route.path === '/concern') {
				return true;
			} else if (/room\/\d+/.test(route.path)) {
				return true;
			} else {
				return false;
			}
		});

		// 任務圖示
		const icon = computed(() => {
			return limitTask?.value?.icon || '';
		});

        // 任務圖示讀取失敗
		const errorIconImg = (e) => {
            e.target.src = '/publicAssets/img/app/icon-task-placeholder@3x.png';
        };

		// 點擊關閉
		const clickClose = () => {
			store.dispatch('config/HIDE_FLOAT_LIMIT_TASK');
		};

		// 點擊任務
		const clickTask = () => {
			// Navigate tasks page
			router.push({
				path: '/tasks',  
				query: {
					tab: 'limited',
				},
			});

			// Matomo track
			if (route.path === '/') {
				matomo_index_check_limitTask();
			} else if (route.path === '/schedule') {
				matomo_schedule_check_limitTask();
			} else if (route.path === '/concern') {
				matomo_concern_check_limitTask();
			} else if (route.path === '/search') {
				matomo_search_check_limitTask();
			} else if (/\/room\/\w+/.test(route.path)) {
				matomo_room_check_limitTask();
			}
		};

        // On component mounted
        onMounted(() => {
            if (store.getters['user/IS_LOGIN']) {
                store.dispatch('tasks/GET_LIMIT_TASK_LIST');
            }
        });
        return {
            show,
			icon,
            errorIconImg,
			clickClose,
			clickTask,
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
	height: 100%;
}
::v-deep(.van-button__text) {
	width: 100%;
	height: 100%;
}
.w-close {
	width: 24px;
}
.h-close {
	width: 24px;
}
.w-button {
	width: 80px;
}
.h-button {
	height: 80px;
}
.ml-button {
	margin-left: -12px;
}
</style>