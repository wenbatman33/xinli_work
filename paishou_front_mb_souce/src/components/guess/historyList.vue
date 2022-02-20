<template lang="pug">
//- 競猜紀錄
van-pull-refresh(:model-value='guessHistoryLoading', @refresh='refresh')
    //- 排序按鈕
    sort-buttons(v-model:sort='state.sort', v-model:order='state.order')

    //- 目前沒有紀錄
    empty.mt-12(v-if='guessHistoryEmpty')

    //- 紀錄列表
    .grid.grid-cols-1.gap-2.mt-2.px-4(v-else)
        history-item(v-for='item in guessHistory', :item='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import empty from '@/components/empty';
import sortButtons from '@/components/guess/sortButtons.vue';
import historyItem from '@/components/guess/historyItem.vue';
import dayjs from 'dayjs';

export default {
    components: {
        empty,
        sortButtons,
        historyItem,
    },
    props: {
        status: Number,
    },
    setup(props) {
        // Vuex store
        const store = useStore();

        // Component state
        const state = reactive({
            sort: 'amount',
            order: 'asce',
        });

        // 競猜紀錄列表
        const guessHistory = computed(() => {
            const list = store?.state?.user?.guessHistory || [];
            const filterList = list.filter((element) => {
                if (props?.status >= 0) {
                    return element?.status === props?.status;
                } else {
                    return true;
                }
            });
            return filterList.sort((a, b) => {
                if (state.sort === 'amount') {
                    const amountA = a?.guess_bet || 0;
                    const amountB = b?.guess_bet || 0;
                    if (state.order === 'asce') {
                        return amountA - amountB;
                    } else {
                        return amountB - amountA;
                    }
                } else if (state.sort === 'time') {
                    var timeA, timeB;
                    try {
                        timeA = dayjs(a?.bet_time).valueOf();
                    } catch(e) {
                        timeA = 0;
                    }
                    try {
                        timeB = dayjs(b?.bet_time).valueOf();
                    } catch(e) {
                        timeB = 0;
                    }
                    if (state.order === 'asce') {
                        return timeA - timeB;
                    } else {
                        return timeB - timeA;
                    }
                } else {
                    return 0;
                }
            });
        });

        // 競猜紀錄是否為空
        const guessHistoryEmpty = computed(() => {
            return guessHistory.value.length === 0;
        });

        // 競猜紀錄是否讀取中
        const guessHistoryLoading = computed(() => {
            return store?.state?.user?.isGettingGuessHistory === true;
        });

        // 刷新資料
        const refresh = () => {
            store.dispatch('user/GET_GUESS_HISTORY');
        };
        return {
            state,
            guessHistory,
            guessHistoryEmpty,
            guessHistoryLoading,
            refresh,
        };
    },
};
</script>