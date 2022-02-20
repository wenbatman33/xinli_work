<template lang="pug">
//- 歐洲杯首頁
.w-full.min-h-full.bg-home.flex.flex-col.items-center.pb-20
    //- 導覽欄
    navBar.w-full

    //- 標題圖示
    img.w-title.mt-8(src='/publicAssets/img/event/uefaeuro_2020/icon-home-title@3x.png')

    //- 歐洲杯圖示
    img.w-24(src='/publicAssets/img/event/uefaeuro_2020/icon-uefa@3x.png')

    //- 連結列表
    .w-full.flex.flex-row.flex-nowrap.items-center.px-8.mt-8.overflow-x-auto
        //- 連結按鈕
        van-button.w-auto.h-auto.px-4.py-2.mr-2.flex-shrink-0.rounded.bg-link.border-transparent(v-for='item in linkList', @click='clickLink(item)')
            //- 按鈕內容
            .flex.flex-row.items-center
                //- 按鈕圖示
                img.w-8.h-8(:src='item.icon')

                //- 按鈕文字
                .flex.flex-col.items-start.text-sm.text-white.font-bold.ml-2
                    //- 標題
                    span {{ item.title }}
                    
                    //- 副標題
                    span {{ item.subtitle }}
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';

export default {
	components: {
		navBar,
	},
	setup() {
		// Vue router
		const router = useRouter();

        // 連結列表
        const linkList = computed(() => {
            return [
                { 
                    icon: '/publicAssets/img/event/uefaeuro_2020/icon-schedule@3x.png',
                    title: '预约',
                    subtitle: '欧洲杯赛事',
                    link: '/event/uefaeuro_2020/schedule',
                },
                { 
                    icon: '/publicAssets/img/event/uefaeuro_2020/icon-task@3x.png',
                    title: '解任务',
                    subtitle: '换点数',
                    link: '/event/uefaeuro_2020/task',
                },
                { 
                    icon: '/publicAssets/img/event/uefaeuro_2020/icon-login@3x.png',
                    title: '限时',
                    subtitle: '登入领取',
                    link: '/event/uefaeuro_2020/login',
                },
                { 
                    icon: '/publicAssets/img/event/uefaeuro_2020/icon-dice@3x.png',
                    title: '博拼',
                    subtitle: '好运跟着来',
                    link: '/event/uefaeuro_2020/dice',
                },
                { 
                    icon: '/publicAssets/img/event/uefaeuro_2020/icon-turntable@3x.png',
                    title: '转转',
                    subtitle: '好运来',
                    link: '/event/uefaeuro_2020/turntable',
                },
            ]
        });

        // 點擊連結
		const clickLink = (item) => {
            router.push(item.link);
		};
		return {
            linkList,
			clickLink,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-home {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.png');
	background-size: cover;
}
.w-title {
	width: 92%;
}
.bg-link {
    background: rgba($color: #FFFFFF, $alpha: 0.3);
}
</style>
