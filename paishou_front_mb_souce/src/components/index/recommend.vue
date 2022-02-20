<template lang="pug">
//- 推薦
.w-full.flex.flex-col.pb-8
    //- 分隔線
    divider

    //- 廣告
    home-banner

    //- 公告跑馬燈
    notice-bar(path='/index')

    //- 精彩賽事
    schedule-list(:class-id='null')

    //- 推薦主播
    hot-anchor

    //- 熱門直播
    hot-live

    //- 最新直播
    new-live

    //- 分類直播
    template(v-for='item in classList')
        hot-live-for-class(:class-id='item.id', :class-name='item.name', :limit-count='4', hide-if-empty, more, path='/index/classLive', @click-more='clickMoreClass(item.id)')
</template>
<script>
import divider from '@/components/divider';
import homeBanner from '@/components/index/homeBanner.vue';
import noticeBar from '@/components/index/noticeBar.vue';
import scheduleList from '@/components/index/scheduleList.vue';
import hotAnchor from '@/components/index/hotAnchor.vue';
import hotLive from '@/components/index/hotLive.vue';
import newLive from '@/components/index/newLive.vue';
import hotLiveForClass from '@/components/index/hotLiveForClass.vue';

export default {
    components: {
        divider,
        homeBanner,
        noticeBar,
        scheduleList,
        hotAnchor,
        hotLive,
        newLive,
        hotLiveForClass,
    },
    props: {
        classList: Array,
    },
    emits: ['click-more'],
    setup(props, { emit }) {
		// 點擊更多分類
		const clickMoreClass = (id) => {
            emit('click-more', id);
		};
        return {
            clickMoreClass,
        }
    },
}
</script>