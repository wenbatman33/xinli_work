<template lang="pug">
//- App 版本更新彈窗
van-popup(:show='state.show', round, class='w-10/12 md:w-1/2')
    //- 彈窗內容
    .flex.flex-col.items-stretch.px-5.py-8
        //- 標題
        .text-title.text-lg.text-center.font-bold
            span(v-if='state.force') 升级提示
            span(v-else) 有新版本啦！

        //- 內容
        .text-content.text-xs.text-center.mt-2
            span(v-if='state.force') 侦测到新版本，请先进行更新！
            span(v-else) 侦测到新版本，是否立即升级享受更好的使用体验！

        //- 按鈕
        .grid.gap-2.justify-center.items-center.mt-8(:class='state.force ? "grid-cols-1" : "grid-cols-2"')
            //- 確認
            van-button.w-full.h-auto.px-4.py-2.rounded-full.bg-confirm.border-transparent(@click='clickConfirm')
                .text-confirm.text-sm 确认

            //- 取消
            van-button.w-full.h-auto.px-4.py-2.rounded-full.bg-transparent.border-cancel(v-if='!state.force', @click='clickCancel')
                .text-cancel.text-sm 取消
</template>
<script>
import { reactive, onMounted } from 'vue';
import { appVersion } from '@/api';

export default {
	setup() {
		// Component state
		const state = reactive({
			show: false,
            force: false,
            link: '',
		});

        // 點擊確認按鈕
        const clickConfirm = () => {
            // Open link
            window.location.href = state.link;

            // Hide popup
            if (!state.force) {
                state.show = false;
            }
        };

        // 點擊取消按鈕
        const clickCancel = () => {
            // Hide popup
            if (!state.force) {
                state.show = false;
            }
        };

        // On component mounted
        onMounted(() => {
            if (window?.android?.isAndroidApp() === true) {
                // Android app version before 3.03.001 not contains version() javascript interface
                var version = '';
                if (window?.android?.version) {
                    version = window?.android?.version()
                }

                // Get query
                const query = {
                    device_type: 2,
                    version: version,
                }

                // Check app version
                appVersion(query).then((res) => {
                    // Update link
                    state.link = res?.data?.link || '';

                    // Update force
                    state.force = res?.data?.recommend === 2;

                    // Update show
                    state.show = res?.data?.recommend === 1 || res?.data?.recommend === 2;
                });
            }
        });
		return {
			state,
            clickConfirm,
            clickCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
    color: #A62337;
}
.bg-confirm {
    background: #A62337;
}
.text-confirm {
    color: #ffffff;
}
.border-cancel {
    border: 1px solid #A62337;
}
.text-cancel {
    color: #A62337;
}
</style>
