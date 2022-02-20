<template lang="pug">
//- 文章內容
.flex.flex-col.items-stretch.pb-16
	//- 導覽欄
	nav-bar(title='返回列表', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 下拉刷新
	van-pull-refresh(:model-value='loading', @refresh='refresh')
		//- 作者資訊
		.px-4.mt-4
			.flex.flex-row.items-center.rounded.shadow.my-1.px-4.py-2
				//- 頭像
				img.flex-shrink-0.w-12.h-12.object-contain(:src='avatar', @error='errorAvatarImg')

				//- 詳細資訊
				.flex.flex-col.flex-grow.items-start.overflow-hidden.mx-2
					.flex.flex-row.items-center
						//- 等級
						img.h-3.object-contain(:src='level', @error='errorLevelImg')

						//- 性別
						img.h-3.object-contain.ml-1(:src='gender', @error='errorLevelImg')
						
						//- 星座
						img.h-3.object-contain.ml-1(:src='astrology', @error='errorAstrologyImg')

					//- 暱稱
					.w-full.text-sm.text-name.font-bold.mt-1.overflow-hidden.overflow-ellipsis {{ name }}

				//- 訂閱
				van-button.flex-shrink-0.w-auto.h-auto.px-4.py-1.rounded-full.shadow.bg-transparent.border-transparent(v-if='false', @click='clickSubscribe')
					.text-xs.text-subscribe 订阅

		//- 文章日期
		.text-xs.text-date.px-4.mt-8 {{ `${releaseTime} - ${className}` }}

		//- 文章標題
		.text-2xl.text-title.font-bold.px-4.mt-2 {{ title }}

		//- 數量資訊
		.flex.flex-row.items-center.justify-between.px-4.mt-2
			//- 左側
			.flex.flex-row.items-center
				//- 眼睛圖示
				img.w-4.h-4(src='/publicAssets/img/article/icon-eye@3x.png')

				//- 觀看數量
				.text-xs.text-view-num.font-normal.ml-1 {{ viewNum }}

				//- 對話框圖示
				img.w-4.h-4.ml-3(src='/publicAssets/img/article/icon-message@3x.png')

				//- 留言數量
				.text-xs.text-message-num.font-normal.ml-1 {{ messageNum }}

			//- 右側
			.flex.flex-row.items-center.pl-3
				//- 拍手圖示
				img.w-4.h-4.ml-3(src='/publicAssets/img/article/icon-clappin@3x.png')

				//- 拍手數量
				.text-xs.text-clappin-num.font-normal.ml-1 {{ likeNum }}

		//- 文章內容
		.text-sm.text-content.px-4.mt-4(v-html='content')

		//- 作者其他文章
		article-header.px-4.mt-8(v-if='!otherArticleEmpty') 作者其他文章

		//- 其他文章列表
		div.px-4.mt-4(v-if='!otherArticleEmpty')

		//- 熱門討論
		article-header.px-4.mt-8 热门讨论

		//- 留言輸入框
		.px-4.mt-2
			van-button.w-full.h-auto.px-4.py-2.rounded.border-message.bg-transparent(@click='clickMessage')
				.text-sm.text-message 留下您的想法，一起参与讨论吧！

		//- 分隔線
		divider.mt-4

		//- 目前沒有紀錄
		empty.px-4.mt-4(v-if='messageListEmpty')

		//- 留言列表
		message-list.px-4.mt-4(v-else, :list='state.messageList')

//- 工具列
.fixed.z-50.bottom-20.right-4.pb-tools.transition-tools(:class='{ "hide-tools": state.hideTools }')
	.flex.flex-row.items-center.shaodw.rounded-full.bg-white.border-tools
		//- 拍手按鈕
		van-button.w-auto.h-auto.pl-4.pr-2.py-2.rounded-l-full.bg-transparent.border-transparent(:disabled='state.articleLikeLoading', @click='clickClappin')
			.flex.flex-row.items-center
				//- 拍手圖示
				img.w-5.h-5(src='/publicAssets/img/article/icon-clappin@3x.png', :class='{ "animation-clap": state.clapAnimation }')

				//- Explotion
				img.absolute.w-5.h-5.opacity-0(src='/publicAssets/img/article/icon-explotion@3x.png', :class='{ "animation-explotion": state.clapAnimation }')

				//- 拍手數量
				.text-sm.font-bold.ml-1 {{ likeNum }}

		//- 留言按鈕
		van-button.w-auto.h-auto.pl-2.pr-4.py-2.rounded-r-full.bg-transparent.border-transparent(@click='clickMessage')
			.flex.flex-row.items-center
				//- 對話框圖示
				img.w-5.h-5(src='/publicAssets/img/article/icon-message-tool@3x.png')

				//- 留言數量
				.text-sm.font-bold.ml-1 {{ messageNum }}

//- 留言彈窗
van-popup(v-model:show='state.showMessagePopup', round, position='bottom', teleport='.popupTeleport')
	.flex.flex-col.items-stretch.pt-2
		//- 輸入框
		input-field(v-model='state.messageInput', placeholder='留下您的想法，一起参与讨论吧！', type='textarea')

		//- 按鈕
		.flex.flex-row.items-center.justify-between.px-4.py-2
			//- 表情按鈕
			van-button.w-8.h-8.p-0.rounded-full.bg-transparent.border-transparent(disabled)
				img.w-full.h-full(src='/publicAssets/img/article/icon-emoji@3x.png')

			//- 提交按鈕
			van-button.w-auto.h-auto.px-2.py-1.rounded.bg-msg-submit.border-transparent(:disabled='messageInputEmpty', :loading='state.messageSubmitLoading', @click='clickMessageSubmit')
				.text-sm.text-white 提交
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { articleInfo, articleLike, articleMessageList, articleMessage } from '@/api';
import { Notify } from 'vant';
import { matomo_articleInfo_like, matomo_articleInfo_message, matomo_articleInfo_back } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import inputField from '@/components/inputField';
import articleHeader from '@/components/article/articleHeader.vue';
import messageList from '@/components/article/messageList.vue';
import dayjs from 'dayjs';

export default {
	components: {
		empty,
		navBar,
		divider,
		inputField,
		articleHeader,
		messageList,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			articleInfoLoading: false,
			articleLikeLoading: false,
			otherArticleLoading: false,
			messageListLoading: false,
			messageSubmitLoading: false,
			hideTools: false,
			clapAnimation: false,
			showMessagePopup: false,
			prevScrollY: null,
			messageInput: '',
			articleInfo: {},
			otherArticle: [],
			messageList: [],
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store.getters['user/IS_LOGIN'];
		});

		// 資料是否讀取中
		const loading = computed(() => {
			return state.articleInfoLoading || state.otherArticleLoading || state.messageListLoading;
		});

		// 作者其他文章是否為空
		const otherArticleEmpty = computed(() => {
			return !state.otherArticle || state.otherArticle.length === 0;
		});

		// 留言列表是否為空
		const messageListEmpty = computed(() => {
			return !state.messageList || state.messageList.length === 0;
		});

		// 留言輸入框是否為空
		const messageInputEmpty = computed(() => {
			return !state.messageInput || state.messageInput.length === 0;
		});

		// 作者頭像
		const avatar = computed(() => {
			return state?.articleInfo?.avatar || '';
		});

		// 作者等級
		const level = computed(() => {
			const levelId = state?.articleInfo?.level || 1;
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => element.levelid === levelId);
			return levelItem?.thumb || '';
		});

		// 作者性別
		const gender = computed(() => {
			if (state?.articleInfo?.sex === 1) {
				return '/publicAssets/img/article/icon-male@3x.png';
			} else if (state?.articleInfo?.sex === 2) {
				return '/publicAssets/img/article/icon-female@3x.png';
			} else {
				return '';
			}
		});

		// 作者星座
		const astrology = computed(() => {
			return state?.articleInfo?.start || '';
		});

		// 作者暱稱
		const name = computed(() => {
			return state?.articleInfo?.nickname || '';
		});

		// 時間
		const releaseTime = computed(() => {
			try {
				return dayjs(state?.articleInfo?.release_time).format('YYYY/MM/DD');
			} catch (e) {
				return state?.articleInfo?.release_time || '';
			}
		});

		// 分類
		const className = computed(() => {
			return state?.articleInfo?.class_name || '';
		});

		// 標題
		const title = computed(() => {
			return state?.articleInfo?.title || '';
		});

		// 觀看數
		const viewNum = computed(() => {
			return state?.articleInfo?.pageview_front || 0;
		});

		// 留言數
		const messageNum = computed(() => {
			return state?.articleInfo?.message_num || 0;
		});

		// 拍手數
		const likeNum = computed(() => {
			return state?.articleInfo?.like_num || 0;
		});

		// 內容
		const content = computed(() => {
			const e = document.createElement('textarea');
			e.innerHTML = state?.articleInfo?.content || '';
			if (e.childNodes.length >= 1) {
				return e.childNodes[0].nodeValue;
			} else {
				return '';
			}
		});

		// 取得文章內容
		const getArticleInfo = () => {
			// Update loading state
			state.articleInfoLoading = true;

			// Query params
			const query = {
				id: route.params.id,
			};

			// Get article info
			articleInfo(query)
				.then((res) => {
					// 任務 #5282 文章若無法顯示（隱藏or被刪除），則需導引用戶回文章首頁
					if (res?.code === 1177) {
						router.replace('/article/class');
					}
					
					// Update article data
					state.articleInfo = res?.data || {};

					// Revert loading on finished
					state.articleInfoLoading = false;
				})
				.catch((res) => {
					// 任務 #5282 文章若無法顯示（隱藏or被刪除），則需導引用戶回文章首頁
					if (res?.code === 1177) {
						router.replace('/article/class');
					}

					// Revert loading on error
					state.articleInfoLoading = false;
				});
		};

		// 取得作者其他文章
		const getOtherArticle = () => {
			// Update loading state
			state.otherArticleLoading = true;

			// Update other article list
			state.otherArticle = [];

			// Revert loading state on finished
			state.otherArticleLoading = false;
		};

		// 取得留言列表
		const getMessageList = () => {
			// Update loading state
			state.messageListLoading = true;

			// Query params
			const query = {
				article_id: route.params.id,
			};

			// Get message list
			articleMessageList(query)
				.then((res) => {
					// Update message list
					state.messageList = res?.data?.list || [];

					// Revert loading on finished
					state.messageListLoading = false;
				})
				.catch(() => {
					// Revert loading on error
					state.messageListLoading = false;
				});
		};

		// 刷新資訊
		const refresh = () => {
			getArticleInfo();
			getOtherArticle();
			getMessageList();
		};

		// 作者圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/blank.png';
		};

		// 星座圖片讀取失敗
		const errorAstrologyImg = (e) => {
			e.target.src = '/publicAssets/img/blank.png';
		};


		// 點擊返回按鈕
		const clickLeft = () => {
			// Navigate
			router.go(-1);

			// Matomo track
			matomo_articleInfo_back();
		};

		// 點擊訂閱按鈕
		const clickSubscribe = () => {};

		// 點擊留言按鈕
		const clickMessage = () => {
			// Validate login state
			if (!isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
				return;
			}

			// Show message popup
			state.showMessagePopup = true;
		};

		// 點擊拍手按鈕
		const clickClappin = () => {
			// Validate login state
			if (!isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
				return;
			}

			// Update loading state
			state.articleLikeLoading = true;

			// Post body
			const body = {
				article_id: Number(route.params.id),
			};

			// Like article
			articleLike(body)
				.then((res) => {
					// Validate response code
					if (res?.code === 0) {
						// Plus clap count
						state.articleInfo.like_num = likeNum.value + 1;

						// Start clap animation
						state.clapAnimation = true;

						// Reset clap animation after 500ms
						setTimeout(() => {
							state.clapAnimation = false;
						}, 500);
					}

					// Revert loading state on finished
					state.articleLikeLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.articleLikeLoading = false;
				});

			// Matomo track
			matomo_articleInfo_like(title.value, state?.articleInfo?.id);
		};

		// 點擊提交訊息
		const clickMessageSubmit = () => {
			// Validate login state
			if (!isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
				return;
			}

			// Update loading state
			state.messageSubmitLoading = true;

			// Post body
			const body = {
				article_id: Number(route.params.id),
				message: state.messageInput,
			};

			// Submit message
			articleMessage(body)
				.then((res) => {
					// Validate response code
					if (res?.code === 0) {
						// Notify submit success
						Notify({
							type: 'success',
							message: '恭喜您，成功留言',
						});

						// Hide message popup
						state.showMessagePopup = false;

						// Clear message input
						state.messageInput = '';

						// Update message list
						getMessageList();
					}

					// Revert loading state on finished
					state.messageSubmitLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.messageSubmitLoading = false;
				});

			// Matomo track
			matomo_articleInfo_message();
		};

		// Update tools visible
		const updateToolsVisible = (e) => {
			if (state.prevScrollY) {
				const dist = window.scrollY - state.prevScrollY;
				if (dist > 0) {
					state.hideTools = true;
				} else if (dist < 0) {
					state.hideTools = false;
				}
			}
			state.prevScrollY = window.scrollY;
		};

		// On component mounted
		onMounted(() => {
			refresh();
			document.addEventListener('scroll', updateToolsVisible, true);
		});

		// On component unmounted
		onUnmounted(() => {
			document.removeEventListener('scroll', updateToolsVisible);
		});
		return {
			state,
			loading,
			otherArticleEmpty,
			messageListEmpty,
			messageInputEmpty,
			avatar,
			level,
			gender,
			astrology,
			name,
			releaseTime,
			className,
			title,
			viewNum,
			messageNum,
			likeNum,
			content,
			refresh,
			errorAvatarImg,
			errorLevelImg,
			errorAstrologyImg,
			clickLeft,
			clickSubscribe,
			clickMessage,
			clickClappin,
			clickMessageSubmit,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
}
::v-deep(.van-button__text) {
	width: 100%;
	text-align: start;
}
.text-name {
	color: #191919;
}
.text-subscribe {
	color: #a62337;
}
.text-date {
	color: #969696;
}
.text-title {
	color: #191919;
}
.text-view-num {
	color: #969696;
}
.text-message-num {
	color: #969696;
}
.text-clappin-num {
	color: #a62337;
}
.text-content {
	color: #191919;
}
.text-message {
	color: #e1e1e1;
}
.border-message {
	border: 1px solid #e1e1e1;
}
.pb-tools {
	margin-bottom: env(safe-area-inset-bottom);
}
.border-tools {
	border: 1px solid #e1e1e1;
}
.bg-msg-submit {
	background: #a62337;
}
.transition-tools {
	transition-property: opacity transform;
	transition-duration: 300ms;
	transition-timing-function: ease-out;
}
.hide-tools {
	opacity: 0%;
	transform: translateY(100%);
	pointer-events: none;
}
.animation-clap {
	animation: clap;
	animation-duration: 500ms;
	animation-timing-function: ease-out;
}
@keyframes clap {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.3);
	}
	100% {
		transform: scale(1);
	}
}
.animation-explotion {
	animation: explotion;
	animation-duration: 500ms;
	animation-timing-function: ease-out;
}
@keyframes explotion {
	0% {
		opacity: 0;
		transform: scale(1.5);
	}
	50% {
		opacity: 1;
		transform: scale(2.5);
	}
	100% {
		opacity: 0;
		transform: scale(3.5);
	}
}
</style>
