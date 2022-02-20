<template lang="pug">
//- 東奧競猜
.relative.w-full.min-h-full.flex.flex-col.items-stretch.bg-guess
    //- 底部花紋
    img.absolute.z-0.bottom-0.object.contain(src='/publicAssets/img/event/2020tokyolympic/icon-footer@3x.png')

    //- 導覽欄
    .z-20.grid.grid-cols-nav.gap-2.px-4.mt-8
        //- 東奧標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-logo@3x.png', @click='clickLogo')

        //- 拍手標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-paishou@3x.png', @click='clickPaishou')

    //- 標題
    img.z-10.self-center.w-header.mt-8.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-guess-header@3x.png')

    //- 分類
    status-list.z-10.mt-6.mx-4(:selected='state.filter', @update:selected='updateFilter')

    //- 加載中
    .z-10.text-sm.text-white.text-center.p-8(v-if='state.loading') 加载中

    //- 目前沒有紀錄
    .z-10.text-sm.text-white.text-center.p-8(v-else-if='guessListEmpty') 目前没有紀錄

    //- 競猜列表
    guesses-list.z-10.mx-4.mt-6(v-else, :list='filterGuessList', @bet-success='betSuccess')

    //- 填滿空白
    .flex-grow

    //- 版權聲明
    .z-10.flex.flex-col.items-center.text-copyright.pt-12.pb-8.bg-copyright Copyright © paishou 2021

//- 競猜下注成功彈窗
guess-success-popup(v-model:show='state.showSuccessPopup')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { guessOlympicList } from '@/api';
import { guessExpired } from '@/utils';
import statusList from '@/components/event/2020tokyolympic/statusList.vue';
import guessesList from '@/components/event/2020tokyolympic/guessList.vue';
import guessSuccessPopup from '@/components/room/guessSuccessPopup.vue';
import dayjs from 'dayjs';

export default {
    components: {
        statusList,
        guessesList,
        guessSuccessPopup
    },
    setup() {
        // Vue router
        const router = useRouter();

        // Component state
        const state = reactive({
            loading: false,
            showSuccessPopup: false,
            guessList: [],
            filter: 1,
        });

        // 篩選過的競猜列表
        const filterGuessList = computed(() => {
            return state.guessList.filter((element) => {
                var status = 'wait';
                if (element.status === 3) {
                    status = 'end';
                }
                if (element.status === 0) {
                    status = 'cancel';
                }
                if (element.status === 1 && guessExpired(element, dayjs())) {
                    status = 'settle';
                }
                if (state.filter === 1 && status === 'wait') {
                    return true;
                }
                if (state.filter === 2 && status !== 'wait') {
                    return true;
                }
                return false;
            });
        });

        // 競猜列表是否為空
        const guessListEmpty = computed(() => {
            return filterGuessList.value.length === 0;
        });
        
        // 取得競猜列表
        const getGuessList = () => {
            // Update loading state
            state.loading = true;

            // Query params
            const query = {
                start_time: '2021-07-21 00:00:00',
                end_time: '2021-08-08 23:59:59',
            };

            // Fetch guess list
            guessOlympicList(query)
                .then((res) => {
                    // Update guess list
                    state.guessList = res?.data?.list || [];

                    // Revert loading state on finished
                    state.loading = false;
                })
                .catch(() => {
                    // Revert loading state on error
                    state.loading = false;
                })
        };

        // 更新選擇的篩選狀態
        const updateFilter = (filter) => {
            state.filter = filter;
        };

        // 點擊東奧標誌
        const clickLogo = () => {
            router.replace('/event/2020tokyolympic/home');
        };

        // 點擊拍手標誌
        const clickPaishou = () => {
            router.replace('/');
        };

		// 下注成功
		const betSuccess = () => {
            state.showSuccessPopup = true;
            getGuessList();
		};

        // On component mounted
        onMounted(() => {
            getGuessList();
        });
        return {
            state,
            filterGuessList,
            guessListEmpty,
            updateFilter,
            clickLogo,
            clickPaishou,
            betSuccess,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-guess {
    background: linear-gradient(152.52deg, #0030FB 29.08%, #0007A4 53.87%), #FFFFFF;
}
.grid-cols-nav {
    grid-template-columns: 1fr auto;
}
.w-header {
    width: 81.3%
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