<template lang="pug">
//- 競猜物件
.flex.flex-col.items-stretch.rounded-item.bg-item
    //- 賽事資訊
    .grid.grid-cols-game.gap-3.items-center.p-4
        //- 內容
        .flex.flex-col.items-stretch
            //- 標題
            .text-base.text-white.font-bold {{ title }}

            //- 時間
            .text-sm.text-white.mt-2 {{ begin }}

            //- 進行狀態
            .text-status.text-sm.mt-2
                span(v-if='status === "wait"') 竞猜进行中
                span(v-else) 赛事已结束

        //- 主隊
        .flex.flex-col.items-center
            //- 隊徽
            img.w-logo.object-contain(:src='homeLogo', @error='errorLogoImg')

            //- 名稱
            .text-sm.text-white.text-center.font-bold.mt-2 {{ homeName }}

        //- VS
        img.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-vs@3x.png')

        //- 客隊
        .flex.flex-col.items-center
            //- 隊徽
            img.w-logo.object-contain(:src='awayLogo', @error='errorLogoImg')

            //- 名稱
            .text-sm.text-white.text-center.font-bold.mt-2 {{ awayName }}


    //- 結算中
    .flex.flex-col.items-stretch.bg-settle.rounded-item.p-4(v-if='status === "settle"')
        van-button.w-auto.h-auto.p-3.bg-transparent.border-settle
            .text-settle.text-lg.font-bold 结算中

    //- 已結束
    .grid.grid-cols-2.gap-2.items-stretch.bg-end.rounded-item.p-4(v-else-if='status === "end"')
        //- 已結束按鈕
        van-button.w-auto.h-auto.p-3.bg-transparent.border-end
            .text-end.text-lg.font-bold 已结束

        //- 查看明細按鈕
        van-button.w-auto.h-auto.p-3.bg-transparent.border-detail(@click='clickDetail')
            .text-detail.text-lg.font-bold 查看明细

    //- 已取消
    .flex.flex-col.items-stretch.bg-cancel.rounded-item.p-4(v-else-if='status === "cancel"')
        van-button.w-auto.h-auto.p-3.bg-transparent.border-cancel
            .text-cancel.text-lg.font-bold 竞猜已取消

    //- 競猜資訊
    .flex.flex-col.items-stretch.bg-guess.rounded-item.p-4(v-else)
        //- 剩餘時間
        .grid.grid-cols-remaining.gap-4.pb-4.items-center
            //- 標題
            .text-remaining-title.text-sm
                span 距离竞猜结束
                br
                span 时间还有

            //- 時
            .flex.flex-col.items-center
                .text-remaining-value.text-2xl.font-bold {{ remainingHours }}
                .text-remaining-unit.text-xs HOURS

            //- 分隔線
            .bg-split.h-remaining-split

            //- 分
            .flex.flex-col.items-center
                .text-remaining-value.text-2xl.font-bold {{ remainingMinutes }}
                .text-remaining-unit.text-xs MINS

            //- 分隔線
            .bg-split.h-remaining-split

            //- 秒
            .flex.flex-col.items-center
                .text-remaining-value.text-2xl.font-bold {{ remainingSeconds }}
                .text-remaining-unit.text-xs SEC

        //- 分隔線
        .bg-split.h-info-split

        //- 競猜資訊
        .grid.grid-cols-guess.gap-4.items-center.pt-4
            //- 總人數
            .flex.flex-col
                .text-guess-unit.text-xs 参加人数
                .text-lg.text-white.font-bold.mt-1 {{ totalNums }}

            //- 總獎池
            .flex.flex-col
                .text-guess-unit.text-xs 总奖池
                .text-lg.text-white.font-bold.mt-1 {{ totalCoin }}

            //- 參與按鈕
            van-button.w-auto.h-auto.px-4.py-1.rounded.bg-bet.border-transparent(@click='clickBet')
                .text-sm.text-white.font-bold(v-if='selected')
                    span 再次
                    br
                    span 参与
                .text-sm.text-white.font-bold(v-else)
                    span 参加
                    br
                    span 竞猜

//- 競猜彈窗
guess-popup(
    :item='item'
    :show-success-popup='false'
    v-model:show='state.showGuessPopup'
    v-model:selected='state.selectedOption'
    @bet-success='betSuccess'
)
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { guessExpired, guessRemainingMilliseconds, commaFormat } from '@/utils';
import guessPopup from '@/components/room/guessPopup.vue';
import dayjs from 'dayjs';

export default {
    components: {
        guessPopup,
    },
    props: {
        item: Object,
    },
	emits: ['bet-success'],
    setup(props, { emit }) {
		// Vue router
		const router = useRouter();

        // Componet state
        const state = reactive({
			now: dayjs(),
			interval: undefined,
            showGuessPopup: false,
            selectedOption: 0,
        });

        // 標題
        const title = computed(() => {
            return props?.item?.games?.cn || '';
        });

        // 時間
        const begin = computed(() => {
            const beginStr = props?.item?.games?.begin || '';
            try {
                return dayjs(beginStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').format('YYYY/MM/DD HH:mm');
            } catch (e) {
                return beginStr;
            }
        });

		// 狀態
		const status = computed(() => {
			if (props?.item?.status === 3) {
				return 'end';
			}
			if (props?.item?.status === 0) {
				return 'cancel';
			}
			if (props?.item?.status === 1 && guessExpired(props?.item, state.now)) {
				return 'settle';
			}
            return 'wait';
		});

        // 主隊隊徽
        const homeLogo = computed(() => {
            return props?.item?.games?.hlog || '';
        });

        // 主隊名稱
        const homeName = computed(() => {
            return props?.item?.games?.home || '';
        });

        // 客隊隊徽
        const awayLogo = computed(() => {
            return props?.item?.games?.alog || '';
        });

        // 客隊名稱
        const awayName = computed(() => {
            return props?.item?.games?.away || '';
        });

        // 剩餘時長
        const remainingDuration = computed(() => {
            const remainingMilliseconds = guessRemainingMilliseconds(props?.item, state.now);
            return dayjs.duration(remainingMilliseconds);
        });

        // 剩餘時
        const remainingHours = computed(() => {
            if (remainingDuration.value.asDays() > 0) {
                return Math.floor(remainingDuration.value.asHours());
            } else {
                return remainingDuration.value.format('HH');
            }
        });

        // 剩餘分
        const remainingMinutes = computed(() => {
            return remainingDuration.value.format('mm');
        });

        // 剩餘秒
        const remainingSeconds = computed(() => {
            return remainingDuration.value.format('ss');
        });

        // 總人數
        const totalNums = computed(() => {
            const nums = props?.item?.total?.nums || 0;
            try {
                return commaFormat(nums);
            } catch (e) {
                return nums;
            }
        });

        // 總獎池
        const totalCoin = computed(() => {
            const coin = props?.item?.total?.total_bonus || 0;
            try {
                return commaFormat(coin);
            } catch (e) {
                return coin;
            }
        });

        // 是否已選擇
        const selected = computed(() => {
            return props?.item?.item1?.selected || props?.item?.item2?.selected;
        })

        // 隊徽圖片讀取失敗
        const errorLogoImg = (e) => {
			e.target.src = '/publicAssets/img/schedule/icon-soccer-gray@3x.png';
        };

        // 點擊詳細資訊按鈕
        const clickDetail = () => {
			router.push('/guesshistory');
        };

        // 點擊參與按鈕
        const clickBet = () => {
			state.showGuessPopup = true;
        };

		// 下注成功
		const betSuccess = () => {
			emit('bet-success');
		};

		// On component mounted
		onMounted(() => {
			state.interval = setInterval(() => {
				state.now = dayjs();
			}, 1000);
		});

		// On component unmounted
		onUnmounted(() => {
			clearInterval(state.interval);
		});
        return {
            state,
            title,
            begin,
            status,
            homeLogo,
            homeName,
            awayLogo,
            awayName,
            remainingHours,
            remainingMinutes,
            remainingSeconds,
            totalNums,
            totalCoin,
            selected,
            errorLogoImg,
            clickDetail,
            clickBet,
            betSuccess,
        };
    },
};
</script>
<style lang="scss" scoped>
.rounded-item {
    border-radius: 8px;
}
.bg-item {
    background: #001056;
}
.grid-cols-game {
    grid-template-columns: 1fr 64px 24px 64px;
}
.text-status {
    color: #4164FF;
}
.w-logo {
    width: 40px;
}
.bg-guess {
    background: #012FF9;
}
.grid-cols-remaining {
    grid-template-columns: 1fr auto 1px auto 1px auto;
}
.text-remaining-title {
    color: #91A6FF;
}
.text-remaining-value {
    color: #FF7A00;
}
.text-remaining-unit {
    color: #41C6FF;
}
.bg-split {
    background: #4164FF;
}
.h-remaining-split {
    height: 36px;
}
.h-info-split {
    height: 2px;
}
.grid-cols-guess {
    grid-template-columns: 1fr 1fr auto;
}
.text-guess-unit {
    color: #41C6FF;
}
.bg-bet {
    background: linear-gradient(147.53deg, #F99F00 7.97%, #DB3069 82.46%);
}
.bg-settle {
    background: #001880;
}
.border-settle {
    border: 1px solid #FF7A00;
}
.text-settle {
    color: #FF7A00;
}
.bg-end {
    background: #001880;
}
.border-end {
    border: 1px solid #00DA16;
}
.text-end {
    color: #00DA16;
}
.border-detail {
    border: 1px solid #4164FF;
}
.text-detail {
    color: #4164FF;
}
.bg-cancel {
    background: #001880;
}
.border-cancel {
    border: 1px solid #C8C8C8;
}
.text-cancel {
    color: #C8C8C8;
}
</style>