<template lang="pug">
//- 聊天列表
.relative.w-full.h-full
	//- 訊息列表
	.relative.z-10.top-0.w-full.h-full.overflow-x-hidden.overflow-y-auto.break-all.bg-message-list(ref='messageListDom', @scroll='scroll')
		//- 聊天室公告
		.text-sm.font-bold.bg-notice.px-5.py-3(:class='{ "hidden": noticeEmpty }')
			span.text-notice-title 系统提示：
			span.text-notice {{ notice }}

		//- 訊息物件
		message-item(v-for='item in msgList', :item='item')

	//- 新消息按鈕
	.absolute.z-20.bottom-4.w-full.flex.flex-row.justify-center(v-if='!autoScroll && state.invisibleCount > 0')
		van-button.w-auto.h-auto.px-6.py-1.rounded-full.bg-new-messages.border-transparent(@click='clickNewMessages')
			.flex.flex-row.items-center
				.text-xs.text-white
					span 有
					span.ml-1 {{ state.invisibleCount }}
					span.ml-1 条新消息
				img.w-4.h-4.ml-2(src='/publicAssets/img/room/icon-arrow-bottom@3x.png')
</template>
<script>
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import messageItem from '@/components/room/messageItem.vue';

export default {
	components: {
		messageItem,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Message list dom
		const messageListDom = ref(null);

		// Component state
		const state = reactive({
			prevScrollTop: 0,
			invisibleCount: 0,
			prevLikeListVisibled: store?.state?.socket?.likeListVisibled,
			likeListVisibledTimeout: undefined,
		});

		// 聊天室公告
		const notice = computed(() => {
			return store?.state?.socket?.notice || '';
		});

		// 聊天室公告是否為空
		const noticeEmpty = computed(() => {
			return !notice.value || notice.value.length === 0;
		});

		// Msg list
		const msgList = computed(() => {
			return store?.state?.socket?.msgList || [];
		});

		// Auto scroll
		const autoScroll = computed(() => {
			return store?.state?.socket?.autoScroll === true;
		});

		// Scroll to bottom of message list
		const scrollToBottom = () => {
			const scrollHeight = messageListDom?.value?.scrollHeight || 0;
			const clientHeight = messageListDom?.value?.clientHeight || 0;
			const scrollMax = scrollHeight - clientHeight - 1;
			if (messageListDom.value) {
				messageListDom.value.scrollTop = scrollMax;
			}
		};

		// Compute invisible count
		const computeInvisible = () => {
			const scrollTop = messageListDom?.value?.scrollTop || 0;
			const scrollOffset = scrollTop - state.prevScrollTop;
			const scrollHeight = messageListDom?.value?.scrollHeight || 0;
			const clientHeight = messageListDom?.value?.clientHeight || 0;
			const scrollBottom = scrollTop + clientHeight;
			const scrollMax = scrollHeight - clientHeight - 1;
			const children = messageListDom?.value?.children || [];
			var invisibleCount = 0;
			for (var i = 0; i < children.length; i++) {
				const msg = msgList.value[i] || {};
				const childTop = children[i].offsetTop;
				if (!msg.has_been_visible) {
					if (childTop > scrollBottom) {
						invisibleCount++;
					} else {
						msg.has_been_visible = true;
					}
				}
			}

			if (scrollOffset > 0 || scrollTop >= scrollMax) {
				store.commit('socket/SET_LIKE_LIST_VISIBLED', true);
			} else if (scrollOffset < 0) {
				store.commit('socket/SET_LIKE_LIST_VISIBLED', false);
			}

			if (state.likeListVisibledTimeout) {
				clearTimeout(state.likeListVisibledTimeout);
			}
			state.likeListVisibledTimeout = setTimeout(() => {
				store.commit('socket/SET_LIKE_LIST_VISIBLED', true);
			}, 5000);

			state.prevScrollTop = scrollTop;
			state.invisibleCount = invisibleCount;
		};

		// Message list scrolled
		const scroll = (e) => {
			computeInvisible();
		};

		// Click new messages button
		const clickNewMessages = () => {
			scrollToBottom();
		};

		// Watch message list dom changed
		watch(
			() => messageListDom.value,
			(dom) => {
				if (!dom) {
					return;
				}
				const config = {
					attributes: true,
					childList: true,
					subtree: true,
				};
				const callback = () => {
					const likeListVisibledChanged = state.prevLikeListVisibled !== store?.state?.socket?.likeListVisibled;
					if (autoScroll.value && !likeListVisibledChanged) {
						scrollToBottom();
					}
					if (likeListVisibledChanged) {
						state.prevLikeListVisibled = store?.state?.socket?.likeListVisibled;
					}
					computeInvisible();
				};
				const mutationObserver = new MutationObserver(callback);
				mutationObserver.observe(dom, config);
				
				const resizeObserver = new ResizeObserver(callback);
				resizeObserver.observe(dom);
			}
		);
		return {
			messageListDom,
			state,
			notice,
			noticeEmpty,
			msgList,
			autoScroll,
			scroll,
			clickNewMessages,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-message-list {
	background: #fbfbfb;
}
.bg-new-messages {
	background: #323232;
}
.bg-notice {
	background: #F4F4F4;
}
.text-notice-title {
	color: #083DD9;
}
.text-notice {
	color: #4f4f4f;
}
</style>
