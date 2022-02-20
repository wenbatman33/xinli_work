<template lang="pug">
//- 領獎彈窗
van-popup(:show='show', round, teleport='.popupTeleport', class='w-10/12 md:w-6/12', @click-overlay='clickOverlay')
    .flex.flex-col.items-center.px-6.py-8
        //- 香蕉圖示
        img.w-16.h-16(src='/publicAssets/img/guess/icon-combo@3x.png')

        //- 標題
        .text-lg.text-title.font-bold.mt-4 是否参加彩金爆击？

        //- 橫列
        .w-full.grid.grid-cols-2.gap-4.mt-8
            //- 不參加
            van-button.w-full.h-auto.p-2.rounded-full.shadow-receive.bg-white.border-transparent(:loading='state.receiveLoading', @click='clickReceive')
                .text-sm.text-receive 不参加

            //- 參加
            van-button.w-full.h-auto.p-2.rounded-full.bg-combo.border-transparent(:disabled='state.receiveLoading', @click='clickCombo')
                .text-sm.text-white 参加
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { guessReceive } from '@/api';

export default {
    props: {
        item: Object,
        show: Boolean,
    },
    emits: ['update:show', 'show-receive-success-popup', 'show-combo-popup'],
    setup(props, { emit }) {
        // Vuex store
        const store = useStore();

        // Component state
        const state = reactive({
            receiveLoading: false,
            showDetailPopup: false,
        });

        // 點擊遮罩層
        const clickOverlay = () => {
            emit('update:show', false);
        };

        // 點擊不參加
        const clickReceive = () => {
            // Update loading state
            state.guessReceive = true;

            // Post body
            const body = {
                bet_id: props?.item?.id,
            };

            // Receive reward
            guessReceive(body)
                .then((res) => {
                    // Validate response code
                    if (res?.code === 0) {
                        // Refresh guess history
                        store.dispatch('user/GET_GUESS_HISTORY');

                        // Update user info
                        store.dispatch('user/GET_USER_INFO');

                        // Show receive success popup
                        emit('show-receive-success-popup');

                        // Hide receive popup
                        emit('update:show', false);
                    }

                    // Revert loading state on finished
                    state.guessReceive = true;
                })
                .catch(() => {
                    // Revert loading state on error
                    state.guessReceive = true;
                });
        };

        // 點擊參加
        const clickCombo = () => {
            emit('update:show', false);
            emit('show-combo-popup');
        };
        return {
            state,
            clickOverlay,
            clickReceive,
            clickCombo,
        };
    },
};
</script>
<style lang="scss" scoped>
.text-title {
    color: #A62337;
}
.shadow-receive {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
.text-receive {
    color: #A62337;
}
.bg-combo {
    background: #A62337;
}
</style>