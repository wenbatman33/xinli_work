<template lang="pug">
//- 發話顏色選項
.flex.justify-center.items-center
    van-button.w-8.h-8.p-2.rounded-full.border-transparent(:style='{ "background": item }', @click='click')
        img.w-full.h-full(v-if='item === selected', src='/publicAssets/img/room/icon-check-white@3x.png')
</template>
<script>
import { selectedMsgColor } from '@/utils';
import { matomo_room_changeColor } from '@/matomoTrackEvent.js';

export default {
    props: {
        item: String,
        selected: String,
    },
    emits: ['update:selected'],
    setup(props, { emit }) {
		// 點擊顏色按鈕
        const click = () => {
			// Store selected color
			window.localStorage.setItem('MSG_COLOR', props?.item);

            // Update selected color
            emit('update:selected', selectedMsgColor())

			// Matomo track
			matomo_room_changeColor();
        }
        return {
            click,
        };
    },
};
</script>