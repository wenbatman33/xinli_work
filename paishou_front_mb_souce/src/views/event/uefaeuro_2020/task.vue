<template lang="pug">
//- 歐洲杯任務
.w-full.min-h-full.bg-task.flex.flex-col.items-stretch
    //- 2021
    img.absolute.top-52.w-2021.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')
    
    //- 頁面內容
    .flex.flex-col.items-stretch.pb-8
        //- 導覽欄
        navBar(title='解任务换点数')

        //- 點數
        .flex.flex-row.justify-center.items-center.bg-point.rounded.mx-6.p-4
            //- 標題
            .text-sm.text-white.font-bold 您目前拥有点数:

            //- 數量
            .text-sm.text-point.font-bold.ml-1 {{ point }}

            //- 圖示
            img.w-4.h-4.ml-1(src='/publicAssets/img/event/uefaeuro_2020/icon-star@3x.png')

        //- 任務列表
        task-list.mx-6.mt-4(@refresh='refresh')

        //- 說明
        .text-sm.text-desc.text-center.bg-white.rounded.p-4.mx-6.mt-14
            span 每日完成任务即可领取点数兑换转盘机会1次
            br
            span 隔日00:00重置 
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { event010Info } from '@/api';
import { commaFormat } from '@/utils';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';
import taskList from '@/views/event/uefaeuro_2020/taskList.vue';

export default {
	components: {
		navBar,
        taskList,
	},
    setup() {
		// Vuex store
		const store = useStore();

        // Component state
        const state = reactive({
            info: {},
        });

        // 點數
        const point = computed(() => {
			if (!store.getters['user/IS_LOGIN']) {
				return 0;
			}
            try {
                return commaFormat(state?.info?.point);
            } catch (e) {
                return state?.info?.point || 0;
            }
        });

        // 取得資訊
        const getInfo = () => {
			event010Info().then((res) => {
				state.info = res?.data || {};
			});
        };

        // 刷新資訊
        const refresh = () => {
            getInfo();
        };

        // On component mounted
        onMounted(() => {
            refresh();
        });
        return {
            point,
            refresh,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-task {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.png');
	background-size: cover;
}
.bg-point {
	background: #a62337;
}
.text-point {
    color: #FFFF10;
}
.text-desc {
    color: #969696;
}
</style>
