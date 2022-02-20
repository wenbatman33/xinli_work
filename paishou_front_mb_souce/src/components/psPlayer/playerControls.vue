<template lang="pug">
//- 播放控制面板
.player-controls(:class='{ "hidden": state.hidden }', @click='clickRoot')
	//- 導覽欄
	.grid.grid-cols-nav.gap-2.items-center.px-2.pt-2
		//- 返回
		van-button.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickBack)')
			img.w-6.h-6(src='/publicAssets/img/room/icon-arrow-left-white@3x.png')
				
		//- 標題
		.marquee.text-white.text-xs
			p {{ title }}
		
		//- 分享
		van-button.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickShare)')
			img.w-6.h-6(src='/publicAssets/img/room/icon-share@3x.png')

		//- 設定
		van-button.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(:class='{ "hidden": !changeSourceAvailable }', @click.stop='validateHidden(clickChangeSource)')
			img.w-6.h-6(src='/publicAssets/img/room/icon-gear@3x.png')

		//- 更多
		van-button.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickMore)')
			img.w-6.h-6(src='/publicAssets/img/room/icon-more@3x.png')

	//- 直播資訊
	.grid.grid-cols-info.items-center.gap-1.px-13
		//- 房號
		.text-white.text-xs 房号 {{ uid }}

		//- 分隔線
		.h-2.bg-white

		//- 熱度圖示
		img.w-3.h-3(src='/publicAssets/img/room/icon-fire-white@3x.png')

		//- 熱度
		.text-white.text-xs {{ heat }}

	//- 播放控制
	.flex.flex-col.flex-grow.flex-shrink.items-center.justify-center.overflow-hidden
		//- 暫停
		van-button.w-auto.h-auto.p-3.rounded.bg-transparent.border-transparent(v-if='playing', @click.stop='validateHidden(clickPlay)')
			img.w-12.h-12(src='/publicAssets/img/room/icon-pause@3x.png')

		//- 開始
		van-button.w-auto.h-auto.p-3.rounded.bg-transparent.border-transparent(v-else, @click.stop='validateHidden(clickPlay)')
			img.w-12.h-12(src='/publicAssets/img/room/icon-play@3x.png')

	//- 顯示控制
	.flex.flex-row.items-center.p-2
		//- 時間資訊
		.flex.flex-row.flex-grow.flex-shrink.items-center.overflow-hidden(:class='{ "hidden": !videoTime }')
			//- 時間
			.text-white.text-xs.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ videoTime }}

			//- 進度
			van-slider.flex-grow.mx-2(:model-value='currentTime', :max='duration', :button-size='12', @update:model-value='clickTime')

		//- 填補隱藏的時間資訊
		.flex-grow(:class='{ "hidden": videoTime }')

		//- 控制按鈕
		.flex.flex-row.items-center
			//- 音量
			van-button.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickMute)')
				.flex.justify-center.items-center
					img.w-6.h-6(v-if='muted', src='/publicAssets/img/room/icon-volume-off@3x.png')
					img.w-6.h-6(v-else, src='/publicAssets/img/room/icon-volume-up@3x.png')

			//- 彈幕
			van-button.w-auto.h-auto.p-1.ml-3.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickDisplayBarrage)')
				.flex.justify-center.items-center
					img.w-6.h-6(v-if='barrageVisabled', src='/publicAssets/img/room/icon-barrage-on@3x.png')
					img.w-6.h-6(v-else, src='/publicAssets/img/room/icon-barrage-off@3x.png')

			//- 彈幕
			van-button.w-auto.h-auto.p-1.ml-3.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickDisplaySvga)')
				.flex.justify-center.items-center
					img.w-6.h-6(v-if='svgaVisabled', src='/publicAssets/img/room/icon-svga-on@3x.png')
					img.w-6.h-6(v-else, src='/publicAssets/img/room/icon-svga-off@3x.png')

			//- 全螢幕
			van-button.w-auto.h-auto.p-1.ml-3.rounded.bg-transparent.border-transparent(@click.stop='validateHidden(clickFullscreen)')
				.flex.justify-center.items-center
					img.w-6.h-6(src='/publicAssets/img/room/icon-fullscreen@3x.png')


	//- 更多彈窗
	more-popup(v-model:show='state.showMore')

	//- 分享彈窗
	van-share-sheet(v-model:show='state.showShare', title='立即分享给好友', teleport='.popupTeleport', :options='shareOptions', @select='selectShareOption')
</template>
<script>
import { reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { roomShare } from '@/api';
import { commaFormat } from '@/utils';
import { matomo_room_share, matomo_room_leave, matomo_room_svga_on, matomo_room_svga_off, matomo_room_barrage_on, matomo_room_barrage_off } from '@/matomoTrackEvent.js';
import morePopup from '@/components/psPlayer/morePopup.vue';
import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {
		morePopup,
	},
	props: {
		playing: Boolean,
		muted: Boolean,
		currentTime: Number,
		duration: Number,
	},
	emits: ['click-play', 'click-time', 'click-mute', 'click-fullscreen', 'click-change-source'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			hidden: true,
			hiddenTimeout: null,
			showMore: false,
			showShare: false,
		});

		// 直播間標題
		const title = computed(() => {
			return store?.state?.socket?.liveInfo?.title || '';
		});

        // 房號
        const uid = computed(() => {
            return store?.state?.socket?.uid || '';
        });

        // 熱度
        const heat = computed(() => {
            try {
                return commaFormat(store?.state?.socket?.heatInfo?.room_heat || 0);
            } catch (e) {
                return store?.state?.socket?.heatInfo?.room_heat || 0;
            }
        });

		// 直播間縮圖
		const thumb = computed(() => {
			return store?.state?.socket?.liveInfo?.thumb || '';
		});

		// 分享選項
		const shareOptions = computed(() => {
			return [
				{ name: 'QQ', icon: 'qq' },
				{ name: '微博', icon: 'weibo' },
				{ name: '复制链接', icon: 'link' },
			];
		});
		
		// 是否允許選擇畫質
		const changeSourceAvailable = computed(() => {
			return store?.state?.socket?.roomInfo?.is_video === 0;
		});

		// 是否顯示彈幕
		const barrageVisabled = computed(() => {
			return store?.state?.socket?.barrageVisabled === true;
		});

		// 是否顯示動畫
		const svgaVisabled = computed(() => {
			return store?.state?.socket?.svgaVisabled === true;
		});

		// 影片進度
		const videoTime = computed(() => {
			const validateTime = (time) => time > 0 && time < Number.POSITIVE_INFINITY;
			const formatSecond = (second) => dayjs.duration(second * 1000).format('HH:mm:ss');
			if (validateTime(props.currentTime) && validateTime(props.duration)) {
				return `${formatSecond(props.currentTime)} / ${formatSecond(props.duration)}`;
			} else {
				return '';
			}
		});

		// 檢驗是否隱藏中
		const validateHidden = (callabck) => {
			if (state.hidden) {
				clickRoot();
			} else {
				callabck();
			}
		};

		// 點擊容器
		const clickRoot = () => {
			if (state.hidden) {
				clearTimeout(state.hiddenTimeout);
				state.hidden = false;
				if (props.playing) {
					state.hiddenTimeout = setTimeout(() => {
						state.hidden = true;
					}, 3250);
				}
			} else {
				clearTimeout(state.hiddenTimeout);
				state.hidden = true;
			}
		};

		// 點擊返回按鈕
		const clickBack = () => {
			router.go(-1);
			matomo_room_leave();
		};

		// 點擊分享按鈕
		const clickShare = () => {
			// Show share popup
			state.showShare = true;

			// Post body
			const body = {
				room: store?.state?.socket?.uid || 0,
			};

			// Notify share clicked
			roomShare(body).then(() => {
				// Do nothing
			});

			// Matomo track
			matomo_room_share();
		};

		// 點擊切換線路按鈕
		const clickChangeSource = () => {
			emit('click-change-source');
		};

		// 點擊更多按鈕
		const clickMore = () => {
			state.showMore = true;
		};

		// 點擊播放
		const clickPlay = () => {
			emit('click-play');
		};

		// 點擊時間
		const clickTime = (time) => {
			validateHidden(() => {
				emit('click-time', time);
			});
		};

		// 點擊靜音
		const clickMute = () => {
			emit('click-mute');
		};

		// 點擊彈幕按鈕
		const clickDisplayBarrage = () => {
			if (barrageVisabled.value) {
				store.dispatch('socket/HIDE_BARRAGE');
				matomo_room_barrage_off();
			} else {
				store.dispatch('socket/SHOW_BARRAGE');
				matomo_room_barrage_on();
			}
		};

		// 點擊動畫按鈕
		const clickDisplaySvga = () => {
			if (svgaVisabled.value) {
				store.dispatch('socket/HIDE_SVGA');
				matomo_room_svga_off();
			} else {
				store.dispatch('socket/SHOW_SVGA');
				matomo_room_svga_on();
			}
		}

		// 點擊全螢幕按鈕
		const clickFullscreen = () => {
			emit('click-fullscreen');
		};

		// 選擇分享選項
		const selectShareOption = (option) => {
			if (option.name === 'QQ') {
				const shareqqstring = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${window.location.href}&title=${title.value}&pics=${thumb.value}&summary=${title.value}`;
				window.open(shareqqstring, '_blank');
			} else if (option.name === '微博') {
				const shareqqstring = `http://service.weibo.com/share/share.php?url=${window.location.href}&title=${title.value}&pic=${thumb.value}`;
				window.open(shareqqstring, '_blank');
			} else if (option.name === '复制链接') {
				const x = window.scrollX;
				const y = window.scrollY;
				const input = document.createElement('input');
				try {
					document.body.appendChild(input);
					input.type = 'text';
					input.value = window.location.href;
					input.focus();
					input.select();
					input.setSelectionRange(0, 99999);
					document.execCommand('copy');
				} catch (err) {}
				document.body.removeChild(input);
				window.scrollTo(x, y);
				Notify({ type: 'success', message: '复制完成' });
			}
		};

		// Watch playing property changed
		watch(
			() => props.playing,
			(playing) => {
				if (!playing) {
					clearTimeout(state.hiddenTimeout);
					state.hidden = false;
				} else {
					clearTimeout(state.hiddenTimeout);
					state.hiddenTimeout = setTimeout(() => {
						state.hidden = true;
					}, 3000);
				}
			}
		);
		return {
			state,
			uid,
			heat,
			title,
			changeSourceAvailable,
			barrageVisabled,
			svgaVisabled,
			shareOptions,
			videoTime,
			validateHidden,
			clickRoot,
			clickBack,
			clickShare,
			clickChangeSource,
			clickMore,
			clickPlay,
			clickTime,
			clickMute,
			clickDisplayBarrage,
			clickDisplaySvga,
			clickFullscreen,
			selectShareOption,
		};
	},
};
</script>
<style lang="scss" scoped>
.player-controls {
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    z-index: 1000;
    background: rgba(0,0,0,.85);
    transition: opacity .25s linear;
	&.hidden {
		opacity: 0;
	}
}
.grid-cols-nav {
	grid-template-columns: auto 1fr auto auto auto;
}
.grid-cols-info {
	grid-template-columns: auto 1px auto 1fr;
}
.px-13 {
	padding-left: 3.25rem;
	padding-right: 3.25rem;
}
.marquee {
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
}
.marquee p {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 10s linear infinite;
}
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}
</style>
