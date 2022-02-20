<template lang="pug">
.BETWEEN
	.flex-shrink-0
		img.AVATAR.w-8.h-8(:src='msgData.avatar', @error='errorPersonImg')
	.message.flex-grow.px-2
		.BETWEEN
			.flex-grow
				.BETWEEN
					.info
						h5 
							span {{msgData.nickname}}
							img.w-6.ml-2(v-if='userLevelThumb(msgData.level)', :src='userLevelThumb(msgData.level)')
						.text-xs.text-gray-500.mb-2 {{msgData.created_at}}
					.like.flex-shrink-0.cursor-pointer(@click='clickLike')
						span.text-xs(:class='{"text-psV3Red":state.selfLike===true}') {{state.likeNum}}
						img.w-3(v-if='state.selfLike===true', src='/publicAssets/img/v3/icon-like-r.png'  srcset='/publicAssets/img/v3/icon-like-r@2x.png 2x')
						img.w-3(v-else, src='/publicAssets/img/v3/icon-like-b.png'  srcset='/publicAssets/img/v3/icon-like-b@2x.png 2x')
		.content.text-sm {{msgData.content}}
</template>

<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, watch, reactive } from 'vue';
import { articleMessageLike } from '@/api';
import { matomo_article_info_like_comment } from '@/matomoEvent';
import { userLevelThumb, errorPersonImg } from '@/utils';

export default {
	props: ['msgData'],
	setup(props, { emit }) {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();

		const UID = computed(() => store.state.user.uid || '');
		const levelAnchorThumb = computed(() => store?.state?.user?.userInfo?.level_anchor_info?.thumb);

		const state = reactive({
			selfLike: false,
			likeNum: null,
		});

		const clickLike = () => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				const payload = {
					message_id: Number(props?.msgData?.id),
				};

				articleMessageLike(payload).then((res) => {
					if (res?.code === 0) {
						state.likeNum += 1;
						state.selfLike = true;
					}
				});
				matomo_article_info_like_comment(props?.msgData?.id);
			}
		};

		onMounted(() => {
			state.likeNum = props.msgData.like;
		});

		return {
			store,
			route,
			router,
			UID,
			state,
			errorPersonImg,
			levelAnchorThumb,
			userLevelThumb,
			clickLike,
		};
	},
};
</script>
<style lang="scss" scoped></style>
