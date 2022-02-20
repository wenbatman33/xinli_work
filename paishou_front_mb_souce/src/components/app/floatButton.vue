<template lang="pug">
//- 懸浮按鈕
.grid.grid-cols-1.gap-float-button.justify-items-end.position-float-button(:style='{ "bottom": bottom }')
    //- 懸浮拼圖
    float-jigsaw

    //- 懸浮廣告
    float-slide

    //- 懸浮限時任務
    float-limit-task

    //- 懸浮客服
    float-chat

    //- 懸浮競猜推薦
    float-guess-recommend
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import floatChat from '@/components/app/floatChat.vue';
import floatJigsaw from '@/components/app/floatJigsaw.vue';
import floatSlide from '@/components/app/floatSlide.vue';
import floatLimitTask from '@/components/app/floatLimitTask.vue';
import floatGuessRecommend from '@/components/app/floatGuessRecommend.vue';

export default {
    components: {
        floatChat,
        floatJigsaw,
        floatSlide,
        floatLimitTask,
        floatGuessRecommend,
    },
    setup() {
        // Vue router
        const route = useRoute();

        // Bottom position
        const bottom = computed(() => {
            // Retrieve route info
            const path = route?.path || '';
            const query = route?.query || {};
            const tab = query?.tab || '';

            // 直播間主播分頁
            if (/^\/room/.test(path) && tab === 'info') {
                return '24px';
            }

            // 直播間貢獻榜分頁
            else if (/^\/room/.test(path) && tab === 'toplist') {
                return '24px';
            }

            // 直播間任務分頁
            else if (/^\/room/.test(path) && tab === 'tasklist') {
                return '24px';
            }

            // 直播間競猜分頁
            else if (/^\/room/.test(path) && tab === 'guesslist') {
                return '24px';
            }

            // 直播間其他分頁
            else if (/^\/room/.test(path)) {
                return '112px';
            } 
            

            // 文章頁面
            else if (/^\/article\/info/.test(path)) {
                return '128px';
            } 
            
            // 其他頁面
            else {
                return '62px';
            }
        });
        return {
            bottom,
        };
    }
};
</script>
<style lang="scss" scoped>
.position-float-button {
	position: fixed;
	right: 10px;
	z-index: 100;
	padding-bottom: env(safe-area-inset-bottom);
}
.gap-float-button {
    grid-gap: 16px;
}
</style>