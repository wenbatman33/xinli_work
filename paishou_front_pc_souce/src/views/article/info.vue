<template lang="pug">
#articleInfo.Container.FLEX_C.py-4.min-h-screen.pb-8.relative
	//- AD 側區塊
	.w-full.my-4
		slideBanner(:slide_cid='25',  :autoPlaySpeed='5000')

	.BETWEEN
		//- article 左側區塊
		.funcBar.w-40.pr-2.flex-shrink-0
			.text-lg.text-psV3Red.cursor-pointer(@click='gotoPrev')
				span
					img(src='/publicAssets/img/v3/icon-left.png'  srcset='/publicAssets/img/v3/icon-left@2x.png 2x')
				span 返回上层
		.BETWEEN.flex-grow
			.w-full.flex-grow.flex-col.bg-white.rounded.shadow.mr-4.p-4(v-if='state?.infoData')
				.w-full
					//- img.w-full.mb-2(:src='state?.infoData?.pic')
					.text-xs.text-gray-400.mb-1 {{formatDate(state?.infoData?.release_time)}} - {{state?.infoData?.class_name}}
					h3.title.line-clamp-2 {{state?.infoData?.title}}
					.CENTER_BETWEEN.text-xs.my-2
						.des
							img.w-4.h-4.mr-2(src='/publicAssets/img/v3/icon-eye-on.png', srcset='/publicAssets/img/v3/icon-eye-on@2x.png 2x')
							span.mr-4.text-gray-400 {{state?.infoData?.pageview_front}}
							img.w-4.h-4.mr-2(src='/publicAssets/img/v3/icon-comments-g.png', srcset='/publicAssets/img/v3/icon-comments-g@2x.png 2x')
							span.text-gray-400 {{state?.infoData?.message_num}}
						
						.apploud.cursor-pointer(@click='clickArticleLike')
							span.text-gray-400.mr-2(:class='{"text-psV3Red": state?.infoData?.is_like!==0}') {{state?.infoData?.like_num}}
							img.w-4.h-4.mr-2(v-if='state?.infoData?.is_like!==0', src='/publicAssets/img/v3/icon-apploud-red.png', srcset='/publicAssets/img/v3/icon-apploud-red@2x.png 2x')
							img.w-4.h-4.mr-2(v-else, src='/publicAssets/img/v3/icon-apploud.png', srcset='/publicAssets/img/v3/icon-apploud@2x.png 2x')

					.articleWriterInfo.rounded.shadow.flex.items-center.p-2.my-2
						img.AVATAR.inline-block.w-9.h-9.mr-2(:src='state?.infoData?.avatar', @error='errorPersonImg')
						.info
							p 
								img.w-7.mr-1(v-if='userLevelThumb(state?.infoData?.level)', :src='userLevelThumb(state?.infoData?.level)')
								img(v-if='state?.infoData?.sex===1', src='/publicAssets/img/v3/icon-male-little.png'  srcset='/publicAssets/img/v3/icon-male-little@2x.png 2x')
								img(v-if='state?.infoData?.sex===2', src='/publicAssets/img/v3/icon-female-little.png'  srcset='/publicAssets/img/v3/icon-female-little@2x.png 2x')
									//- {{state?.infoData?.level}}_ {{state?.infoData?.sex}}_ {{state?.infoData?.star}}
							h5 {{state?.infoData?.nickname}}
					//- 文章內文
					div(v-if='state.infoData', v-html='htmlDecode')

			.flex-shrink-0.bg-white.rounded.shadow.mr-4.p-4.shadow(style='width:360px')
				h4.text-psV3Red.mb-2 热门讨论
				a-textarea(v-model:value='state.msg', :auto-size='{ minRows: 3, maxRows: 5 }',  placeholder='留下您的想法，一起参与讨论吧！')
				.my-2.text-right
					a-button(type='primary', size='small', :disabled='state.msg===""' @click='addArticleMessage') 提交
				a-divider
				.grid.grid-cols-1.gap-4
					.col-span-9.rounded.bg-white.shadow.p-2(v-for='item in state.messageList') 
						meaageItem(:msgData='item')
	floatBar(:articleData='state?.infoData', @like='clickArticleLike')
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, watch, reactive } from 'vue';
import { articleInfo, articleMessageList, articleMessage, articleLike } from '@/api';
import slideBanner from '@/components/swipers/slideBanner.vue';
import articleCrad from '@/components/article/articleCrad.vue';
import meaageItem from '@/components/article/meaageItem.vue';
import floatBar from '@/components/article/floatBar.vue';
import { matomo_article_info_like, matomo_article_info_comment, matomo_article_info_back } from '@/matomoEvent';
import { userLevelThumb, errorPersonImg, formatDate } from '@/utils';

export default {
	components: {
		slideBanner,
		articleCrad,
		meaageItem,
		floatBar,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const levelAnchorThumb = computed(() => store?.state?.user?.userInfo?.level_anchor_info?.thumb);

		const state = reactive({
			infoData: null,
			articleList: null,
			messageList: null,
			msg: '',
		});

		const getInfo = () => {
			state.articleList = null;
			const payload = {
				id: Number(route.params.id),
			};
			articleInfo(payload)
				.then((res) => {
					state.infoData = res?.data || [];
				})
				.catch((error) => {
					router.push('/article/class');
				});
		};
		const getMessage = () => {
			state.messageList = null;
			const params = {
				article_id: Number(route.params.id),
			};
			articleMessageList(params).then((res) => {
				state.messageList = res?.data.list || [];
			});
		};
		const clickArticleLike = () => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				const { title, id } = state?.infoData;
				const payload = {
					article_id: Number(id),
				};
				articleLike(payload).then((res) => {
					if (res?.code === 0) {
						state.infoData.like_num += 1;
						state.infoData.is_like = true;
					}
				});
				matomo_article_info_like(title, id);
			}
		};

		const init = () => {
			getInfo();
			getMessage();
		};
		const addArticleMessage = () => {
			if (!UID.value) {
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				const payload = {
					article_id: Number(state.infoData?.id),
					message: state.msg,
				};

				articleMessage(payload).then((res) => {
					state.msg = '';
					getMessage();
				});
				matomo_article_info_comment();
			}
			// articleMessage;
		};

		// 內容
		const htmlDecode = computed(() => {
			const html = document.createElement('textarea');
			html.innerHTML = state?.infoData?.content;
			// return decodeURI(state?.infoData?.content);
			return html.value;
		});
		const gotoPrev = () => {
			matomo_article_info_back();
			window.history.length <= 1 ? router.push('/article/class') : router.go(-1);
		};
		watch(
			() => route.params.id,
			(newVal) => {
				if (newVal) init();
			},
			{ deep: true }
		);
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			UID,
			init,
			htmlDecode,
			gotoPrev,
			errorPersonImg,
			levelAnchorThumb,
			userLevelThumb,
			getInfo,
			getMessage,
			addArticleMessage,
			clickArticleLike,
			formatDate,
		};
	},
};
</script>
<style lang="scss" scoped></style>
