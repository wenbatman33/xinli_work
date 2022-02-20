<template lang="pug">
//- 連續送禮物件
.grid.grid-cols-item.gap-1.items-center.rounded-full.transition-all.bg-item.shadow-item.animation-item.transform-item.pt-1.pb-1.pr-5.pl-1(:class='[transformStyle, colorStyle, popAnimation]')
    //- 用戶頭像
    img.w-12.h-12.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

    //- 用戶資訊
    .flex.flex-col.items-start.overflow-hidden.pl-1
        //- 等級
        img.h-4.object-conatin(:src='level', @error='errorLevelImg')

        //- 暱稱
        .self-stretch.text-sm.text-white.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis.mt-1 {{ name }}

    //- 禮物圖片
    img.w-14.h-14.object-contain(:src='giftIcon', @error='errorGiftImg')

    //- 次數
    .text-white.italic.text-center.align-bottom.font-bold.font-sans.leading-3.shadow-count.bg-count.px-2(:class='colorStyle')
        span.text-sm X
        span.text-3xl.ml-1 {{ count }}
        br
        span.text-xs COMBO
</template>
<script>
import { reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
            prevUid: undefined,
			intervalId: 0,
			currentTime: dayjs(),
		});

		// 用戶編號
		const uid = computed(() => {
			return props?.item?.Uid || 0;
		});

		// 用戶資訊
		const memberInfo = computed(() => {
			const memberList = store?.state?.socket?.roomMemberList || [];
			const memberItem = memberList.find((element) => element.uid == uid.value);
			return memberItem || {};
		});

		// 頭像圖片
		const avatar = computed(() => {
			return props?.item?.Avatar || '';
		});

		// 等級圖片
		const level = computed(() => {
			const levelId = memberInfo?.value?.level || 0;
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => element.levelid == levelId);
			return levelItem?.thumb || '';
		});

		// 暱稱
		const name = computed(() => {
			return memberInfo?.value?.uname || '';
		});

		// 禮物圖片
		const giftIcon = computed(() => {
			return props?.item?.GiftIcon || '';
		});

		// 次數
		const count = computed(() => {
			return props?.item?.Count || 0;
		});

		// 逾期
		const timeout = computed(() => {
			return props?.item?.Timeout || dayjs();
		});

		// 變形樣式
		const transformStyle = computed(() => {
			if (count.value < 2) {
				return 'transform-hide';
			} else if (state.currentTime.isAfter(timeout.value)) {
				return 'transform-hide';
			} else if (state.currentTime.isSame(timeout.value)) {
				return 'transform-hide';
			} else {
				return 'transform-show';
			}
		});

		// 顏色樣式
		const colorStyle = computed(() => {
			if (count.value <= 29) {
				return 'color-2-29';
			} else if (count.value <= 199) {
				return 'color-30-199';
			} else if (count.value <= 299) {
				return 'color-200-299';
			} else if (count.value >= 300) {
				return 'color-300';
			} else {
				return 'color-2-29';
			}
		});

		// 彈出動畫
		const popAnimation = computed(() => {
            if (state.prevUid === undefined) {
                state.prevUid = uid.value;
                return 'fade-in';
            } else if (count.value % 2 === 1) {
                state.prevUid = uid.value;
				return 'pop-odd';
			} else {
                state.prevUid = uid.value;
				return 'pop-even';
			}
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 禮物圖片讀取失敗
		const errorGiftImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-gift-placeholder@3x.png';
		};

		// Watch transform style changed
		watch(
			() => transformStyle.value,
			(newTransform, oldTransform) => {
				if (oldTransform === 'transform-show' && newTransform === 'transform-hide') {
                    setTimeout(() => {
					    store.commit('socket/REFRESH_COMBO_LIST');
                    }, 400);
				}
			}
		);

		// On component mounted
		onMounted(() => {
			state.intervalId = setInterval(() => {
				state.currentTime = dayjs();
			}, 1000);
		});

		// On component unmounted
		onUnmounted(() => {
			if (state.intervalId) {
				clearInterval(state.intervalId);
			}
		});
		return {
			state,
			avatar,
			level,
			name,
			giftIcon,
			count,
			transformStyle,
			colorStyle,
			popAnimation,
			errorAvatarImg,
			errorLevelImg,
			errorGiftImg,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-item {
	grid-template-columns: auto 1fr auto auto;
}
.shadow-item {
	filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5));
}
.transition-item {
	transition-property: all;
	transition-duration: 800ms;
}
.transform-item {
	&.transform-show {
		opacity: 1;
		transform: translate(0, 0);
	}
	&.transform-hide {
		opacity: 0 !important;
		transform: translate(-100%, 0) !important;
	}
}
.bg-item {
	&.color-2-29 {
		background: linear-gradient(335.83deg, #2ab5f7 2.18%, #4232f3 85.1%);
	}
	&.color-30-199 {
		background: linear-gradient(134.16deg, #1730ce -6.5%, #d72cdd 78.26%);
	}
	&.color-200-299 {
		background: linear-gradient(147.53deg, #f99f00 7.97%, #db3069 82.46%);
	}
	&.color-300 {
		background: linear-gradient(48.89deg, #d600ff 12.12%, #ff0000 87.02%);
	}
}
.animation-item {
    &.fade-in {
        animation: fade-in 0.8s linear 1;
    }
	&.pop-odd {
		animation: pop-odd 0.3s linear 1;
	}
	&.pop-even {
		animation: pop-even 0.3s linear 1;
	}
}
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translate(-100%, 0);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}
@keyframes pop-odd {
	50% {
		transform: scale(1.05);
	}
}
@keyframes pop-even {
	50% {
		transform: scale(1.05);
	}
}
.shadow-count {
	filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
}
.bg-count {
	&.color-2-29 {
		background: -webkit-linear-gradient(335.83deg, #4232f3 2.18%, #2ab5f7 85.1%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-stroke: 6px transparent;
	}
	&.color-30-199 {
		background: linear-gradient(134.16deg, #1730ce -6.5%, #d72cdd 78.26%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-stroke: 6px transparent;
	}
	&.color-200-299 {
		background: linear-gradient(147.53deg, #f99f00 7.97%, #db3069 82.46%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-stroke: 6px transparent;
	}
	&.color-300 {
		background: linear-gradient(48.89deg, #d600ff 12.12%, #ff0000 87.02%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-stroke: 6px transparent;
	}
}
</style>
