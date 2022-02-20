<template lang="pug">
//- 懸浮客服按鈕
van-button.w-button.h-button.p-0.bg-transparent.border-transparent(v-if='show', id='CTA_Button_1', @click='clickChat')
	img.w-full.h-full.object-contain(:src='pic', @error='errorPicImg')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { matomo_floatChat_click } from '@/matomoTrackEvent.js'

export default {
	setup() {
        // Vue router
		const route = useRoute();

		// Vuex store
		const store = useStore();

        // 第一筆客服
        const chat = computed(() => {
            const chatList = store?.state?.config?.floatChatList || [];
            if (chatList.length > 0) {
                return chatList[0];
            } else {
                return undefined;
            }
        });

        // 是否顯示客服
		const show = computed(() => {
            return chat.value !== undefined;
		});

        // 客服圖示
        const pic = computed(() => {
            return chat?.value?.slide_pic || '';
        });

        // 客服圖示讀取失敗
        const errorPicImg = (e) => {
            e.target.src = '/publicAssets/img/app/iconFloatSlidePlaceholder@3x.png';
        };

        // 點擊客服按鈕
        const clickChat = () => {
            window.LiveChatWidget.call('maximize');
            matomo_floatChat_click(route.path);
        };

        // On component mounted
        onMounted(() => {
            store.dispatch('config/GET_FLOAT_CHAT_LIST');
        });
		return {
			show,
			pic,
			errorPicImg,
            clickChat,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-button {
	width: 72px;
}
.h-button {
	height: 72px;
}
</style>