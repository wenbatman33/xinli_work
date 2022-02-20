<template lang="pug">
//- 任務物件
.grid.grid-cols-item.gap-2.items-center.bg-item.opacity-item.rounded.p-4(:class='clazz')
    //- 任務圖示
    img.w-10.h-10(:src='icon')

    //- 任務資訊
    .flex.flex-col.items-start
        //- 任務標題
        .text-sm.text-white.font-bold {{ title }}

        //- 水平排列
        .flex.flex-row.items-center
            //- 每日次數
            .text-sm.text-white
                span 每日次数 
                span {{ success }} / {{ times }}
                
            //- 點數圖示
            img.w-4.h-4.ml-2(src='/publicAssets/img/event/uefaeuro_2020/icon-star@3x.png')

            //- 點數數量
            .text-sm.text-white.font-bold.ml-1
                span 点数 
                span {{ point }}


    //- 任務狀態
    van-button.w-auto.h-auto.px-2.py-1.rounded-full.bg-status.border-status(:class='clazz', :loading='state.loading', @click='clickStatus')
        .text-sm.text-status.font-bold(:class='clazz') {{ status }}
        template(#loading)
            van-loading.w-4.h-4(color='#ffffff')
</template>
<script>
import { reactive, computed } from 'vue';
import { event010Received } from '@/api';
import { deepLink } from '@/utils';

export default {
	props: {
		item: Object,
	},
	emits: ['refresh'],
	setup(props, { emit }) {
		// Component state
		const state = reactive({
			loading: false,
		});

		// 任務圖示
		const icon = computed(() => {
			if (props?.item?.id > 0 && props?.item?.id <= 6) {
				return `/publicAssets/img/event/uefaeuro_2020/icon-task${props?.item?.id}@3x.png`;
			} else {
				return '/publicAssets/img/event/uefaeuro_2020/icon-task2@3x.png';
			}
		});

		// 任務標題
		const title = computed(() => {
			return props?.item?.title || '';
		});

		// 完成次數
		const success = computed(() => {
			return props?.item?.success || 0;
		});

		// 任務次數
		const times = computed(() => {
			return props?.item?.times || 0;
		});

		// 任務點數
		const point = computed(() => {
			return props?.item?.point || 0;
		});

		// 任務狀態
		const status = computed(() => {
			return props?.item?.status || '';
		});

		// 任務樣式
		const clazz = computed(() => {
			if (status.value === '去完成') {
				return 'unfinished';
			} else if (status.value === '领取') {
				return 'receive';
			} else if (status.value === '已完成') {
				return 'finished';
			} else {
				return '';
			}
		});

		// 點擊狀態
		const clickStatus = () => {
            if (status.value === '去完成') {
                deepLink(props?.item?.action);
            } else if (status.value === '领取') {
				// Update loading state
				state.loading = true;

				// Post body
				const body = {
					id: props?.item?.id,
				};

				// Receive reward
				event010Received(body)
					.then(() => {
						// Revert loading state on finished
						state.loading = false;

						// Refresh task list
						emit('refresh');
					})
					.catch(() => {
						// Revert loading state on error
						state.loading = false;

						// Refresh task list
						emit('refresh');
					});
			}
		};
		return {
			state,
			icon,
			title,
			success,
			times,
			point,
			status,
			clazz,
			clickStatus,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-item {
	grid-template-columns: auto 1fr auto;
}
.bg-item {
	background: rgba($color: #ffffff, $alpha: 0.3);
}
.opacity-item {
	&.finished {
		opacity: 0.3;
	}
}
.bg-status {
	&.unfinished {
		background: transparent;
	}
	&.receive {
		background: #a62337;
	}
	&.finished {
		background: #e1e1e1;
	}
}
.border-status {
	&.unfinished {
		border: 1px solid #ffffff;
	}
	&.receive {
		border: transparent;
	}
	&.finished {
		border: transparent;
	}
}
.text-status {
	&.unfinished {
		color: #ffffff;
	}
	&.receive {
		color: #ffffff;
	}
	&.finished {
		color: #969696;
	}
}
</style>
