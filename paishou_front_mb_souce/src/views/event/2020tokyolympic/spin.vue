<template lang="pug">
//- 東奧競猜
.relative.w-full.min-h-full.flex.flex-col.items-stretch.bg-roulette
    //- 底部花紋
    img.absolute.z-0.bottom-0.object.contain(src='/publicAssets/img/event/2020tokyolympic/icon-footer@3x.png')

    //- 導覽欄
    .z-10.grid.grid-cols-nav.gap-2.px-4.mt-8
        //- 東奧標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-logo@3x.png', @click='clickLogo')

        //- 拍手標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-paishou@3x.png', @click='clickPaishou')

    //- 標題
    img.z-10.self-center.w-header.mt-8.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-roulette-header@3x.png')

    //- 轉盤
    .relative.mt-6.overflow-hidden
        //- 底圖
        img.z-10.w-full.h-auto.transform-roulette(ref='rouletteDom', src='/publicAssets/img/event/2020tokyolympic/icon-roulette-base@3x.png')

        //- 外光
        img.absolute.z-20.w-full.h-auto.top-0.left-0(src='/publicAssets/img/event/2020tokyolympic/icon-roulette-ring@3x.png')

        //- 指針
        img.absolute.z-30.w-full.h-auto.top-0.left-0(src='/publicAssets/img/event/2020tokyolympic/icon-roulette-director@3x.png')

        //- 按鈕
        van-button.absolute.z-40.w-spin.h-auto.top-spin.left-spin.rounded-full.p-0.bg-transparent.border-transparent(:disabled='state.spining', @click='clickSpin')
            img.w-full.h-auto(v-if='state.spining', src='/publicAssets/img/event/2020tokyolympic/icon-roulette-spin-disabled@3x.png')
            img.w-full.h-auto(v-else, src='/publicAssets/img/event/2020tokyolympic/icon-roulette-spin@3x.png')

    //- 說明標題
    .z-10.text-lg.text-white.font-bold.mt-8.px-6 活动说明

    //- 說明內容
    .z-10.text-sm.mt-3.px-6
        span.text-highlight 奥运开战天天送，每日登入抢彩金
        br
        span.text-white 1、所有已注册用户皆可参与活动。
        br
        span.text-white 2、每日进入活动都有抽奖机会，转盘的彩金红包立即有效。
        br
        span.text-white 3、中奖后需要即时找小助手登记领取，遇时不候。

    //- 提示標題
    .z-10.text-lg.text-white.font-bold.mt-8.px-6 注意事项

    //- 提示內容
    .z-10.text-sm.text-white.mt-3.px-6 拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。

    //- 填滿空白
    .flex-grow

    //- 版權聲明
    .z-10.flex.flex-col.items-center.text-copyright.pt-12.pb-8.bg-copyright Copyright © paishou 2021

//- 登入彈窗
login-popup(v-model:show='state.showLoginPopup')

//- 獎勵彈窗
reward-popup(v-model:show='state.showRewardPopup', :name='state.rewardName')

//- 次數限制彈窗
limited-popup(v-model:show='state.showLimitedPopup')
</template>
<script>
import { ref, reactive, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import loginPopup from '@/components/event/2020tokyolympic/loginPopup.vue';
import rewardPopup from '@/components/event/2020tokyolympic/rewardPopup.vue';
import limitedPopup from '@/components/event/2020tokyolympic/limitedPopup.vue';
import bezier from '@/utils/bezier.js';
import dayjs from 'dayjs';

const ANIMATION_LENGTH = 3000;
const BEZIER_EASING = bezier(0, 0.69, 0.34, 1);
const REWARD_LIST = [
    {
        name: '588紅包',
        deg: 51,
    },
    {
        name: '888紅包',
        deg: 102,
    },
    {
        name: '58紅包',
        deg: 204,
    },
    {
        name: '108紅包',
        deg: 255,
    },
    {
        name: '288紅包',
        deg: 306,
    },
];

export default {
    components: {
        loginPopup,
        rewardPopup,
        limitedPopup,
    },
    setup() {
        // Roulette dom reference
        const rouletteDom = ref(null);

        // Vue router
        const router = useRouter();

		// Vuex store
		const store = useStore();

        // Component state
        const state = reactive({
            spinning: false,
            showLoginPopup: false,
            showRewardPopup: false,
            showLimitedPopup: false,
            startDeg: 0,
            currentDeg: 0,
            animationFrame: undefined,
            rewardName: undefined,
            targetDeg: undefined,
            startTimestamp: undefined,
        });
        
		// 是否為登入狀態
		const isLogin = computed(() => {
			return store.getters['user/IS_LOGIN'];
		});

		// User id
		const uid = computed(() => {
            return store?.state?.user?.uid || '';
        });

        // 點擊東奧標誌
        const clickLogo = () => {
            router.replace('/event/2020tokyolympic/home');
        };

        // 點擊拍手標誌
        const clickPaishou = () => {
            router.replace('/');
        };

        // Animation frame step
        const step = (timestamp) => {
            if (!state.startTimestamp) {
                state.startTimestamp = timestamp;
            }
            const duration = timestamp - state.startTimestamp;
            const progress = Math.min(duration / ANIMATION_LENGTH, 1);
            const bezierProgress = BEZIER_EASING(progress);
            const nextDeg = state.startDeg + (state.targetDeg - state.startDeg) * bezierProgress;
            state.curentDeg = nextDeg % 360;
            rouletteDom.value.style.transform = `rotate(${state.curentDeg}deg)`;
            if (progress >= 1) {
                state.spinning = false;
                state.showRewardPopup = true;
                state.animationFrame = undefined;
            } else {
                state.animationFrame = requestAnimationFrame(step);
            }
        };

        // 點擊轉盤
        const clickSpin = () => {
            const key = 'Tokyo_Olympic_2020_Roulette_' + uid.value;
            const spinDate = window.localStorage[key];
            const today = dayjs().format('YYYY-MM-DD');

            if (!isLogin.value) {
                state.showLoginPopup = true;
            } else if (!spinDate || dayjs(spinDate).isBefore(today)) {
                const randomRound = Math.floor(Math.random() * 3) + 4;
                const randomIndex = Math.floor(Math.random() * REWARD_LIST.length);
                const rewardItem = REWARD_LIST[randomIndex];

                state.spinning = true;
                state.rewardName = rewardItem.name;
                state.startDeg = state.currentDeg;
                state.targetDeg = rewardItem.deg + 360 * randomRound;
                state.startTimestamp = undefined;
                state.animationFrame = requestAnimationFrame(step);
                window.localStorage.setItem(key, today);
            } else {
                state.showLimitedPopup = true;
            }
        };

        // On component unmounted
        onUnmounted(() => {
            if (state.animationFrame) {
                cancelAnimationFrame(state.animationFrame);
            }
        })
        return {
            rouletteDom,
            state,
            clickLogo,
            clickPaishou,
            clickSpin,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-roulette {
    background: linear-gradient(152.52deg, #0030FB 29.08%, #0007A4 53.87%), #FFFFFF;
}
.grid-cols-nav {
    grid-template-columns: 1fr auto;
}
.w-header {
    width: 64.8%;
}
.transform-roulette {
    transform-origin: 50% 52.33%;
}
.w-spin {
    width: 34%;
}
.left-spin {
    left: 33%;
}
.top-spin {
    top: 33%;
}
.text-highlight {
    color: #F8B62D;
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