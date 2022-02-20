<template lang="pug">
//- 文章物件
.relative.w-full.rounded.shadow.bg-white
	//- 上半部
	.relative.w-full.h-0.p-top.bg-top.overflow-hidden
		//- 點擊按鈕
		van-button.absolute.w-full.h-full.p-0.bg-transparent.border-transparent(@click='clickItem')

		//- 分享按鈕
		.absolute.bottom-2.right-4.grid.grid-cols-3.gap-2
			//- QQ
			van-button.w-auto.h-auto.p-0.shadow.rounded-full.bg-white.border-transparent(@click.stop='clickQQ')
				img.w-7.h-7(src='/publicAssets/img/icon-qq@3x.png')

			//- 微博
			van-button.w-auto.h-auto.p-0.shadow.rounded-full.bg-white.border-transparent(@click.stop='clickWeibo')
				img.w-7.h-7(src='/publicAssets/img/icon-weibo@3x.png')

			//- 複製
			van-button.w-auto.h-auto.p-0.shadow.rounded-full.bg-white.border-transparent(@click.stop='clickCopy')
				img.w-7.h-7(src='/publicAssets/img/icon-link@3x.png')

		//- 文章圖片
		img.w-full.rounded-t.object-cover.object-center-top(:src='pic', @error='errorArticleImg')

	//- 下半部
	.relative
		//- 點擊按鈕
		van-button.absolute.w-full.h-full.p-0.bg-transparent.border-transparent(@click='clickItem')

		//- 內容
		.px-4.py-2
			//- 水平排列
			.flex.flex-row.items-center
				//- 文章日期
				.text-xs.text-date.font-normal {{ releaseTime }}

				//- Dash
				.text-xs.text-date.font-normal.mx-1 -

				//- 文章分類
				.text-xs.text-class.font-normal {{ className }}

			//- 文章標題
			.text-base.text-title.font-bold.mt-1 {{ title }}

			//- 文章資訊
			.flex.flex-row.justify-between.items-center.mt-1
				//- 作者資訊
				.flex.flex-row.items-center.overflow-hidden
					//- 頭像
					img.w-6.h-6.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

					//- 暱稱
					.text-xs.text-name.font-bold.ml-2 {{ name }}

				//- 數量資訊
				.flex.flex-row.items-center
					//- 眼睛圖示
					img.w-4.h-4(src='/publicAssets/img/article/icon-eye@3x.png')

					//- 觀看數量
					.text-xs.text-view-num.font-normal.ml-1 {{ viewNum || 0 }}

					//- 對話框圖示
					img.w-4.h-4.ml-3(src='/publicAssets/img/article/icon-message@3x.png')

					//- 留言數量
					.text-xs.text-message-num.font-normal.ml-1 {{ messageNum || 0 }}
</template>
<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Notify } from 'vant';
import { matomo_articleClass_check_article, matomo_articleTopic_check_article, matomo_articleClass_share_article, matomo_articleTopic_share_article, matomo_articleClass_copy_article, matomo_articleTopic_copy_article } from '@/matomoTrackEvent.js'
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// 日期
		const releaseTime = computed(() => {
			try {
				return dayjs(props?.item?.release_time).format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return props?.item?.release_time;
			}
		});

		// 分類
		const className = computed(() => {
			return props?.item?.class_name || '';
		});

		// 標題
		const pic = computed(() => {
			return props?.item?.pic || '';
		});

		// 標題
		const title = computed(() => {
			return props?.item?.title || '';
		});

		// 網址
		const url = computed(() => {
			return `https://${window.location.host}/article/info/${props?.item?.id}`;
		});

		// 頭像
		const avatar = computed(() => {
			return props?.item?.avatar || '';
		});

		// 暱稱
		const name = computed(() => {
			return props?.item?.nickname || '';
		});

		// 觀看數
		const viewNum = computed(() => {
			return props?.item?.pageview_front || 0;
		});

		// 留言數
		const messageNum = computed(() => {
			return props?.item?.message_num || 0;
		});

		// 作者圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 文章圖片讀取失敗
		const errorArticleImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// 點擊文章物件
		const clickItem = () => {
			// Navigate
			router.push(`/article/info/${props?.item?.id}`);

			// Matomo track
			if (/^\/article\/class/.test(route.path)) {
				matomo_articleClass_check_article(props?.item?.title, props?.item?.id);
			} else if (/^\/article\/topic/.test(route.path)) {
				matomo_articleTopic_check_article(props?.item?.title, props?.item?.id);
			}
		};

		// 點擊複製
		const clickCopy = () => {
			// Copy link
			const x = window.scrollX;
			const y = window.scrollY;
			const input = document.createElement('input');
			try {
				document.body.appendChild(input);
				input.type = 'text';
				input.value = url.value;
				input.focus();
				input.select();
				input.setSelectionRange(0, 99999);
				document.execCommand('copy');
			} catch (err) {}
			document.body.removeChild(input);
			window.scrollTo(x, y);
			Notify({ type: 'success', message: '活动链结复制完成' });

			// Matomo track
			if (/^\/article\/class/.test(route.path)) {
				matomo_articleClass_copy_article(props?.item?.title, props?.item?.id);
			} else if (/^\/article\/topic/.test(route.path)) {
				matomo_articleTopic_copy_article(props?.item?.title, props?.item?.id);
			}
		};

		// 點擊QQ
		const clickQQ = () => {
			// Share QQ
			const shareqqstring = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url.value}&title=${title.value}&pics=${pic.value}&summary=${title.value}`;
			window.open(shareqqstring, '_blank');

			// Matomo track
			if (/^\/article\/class/.test(route.path)) {
				matomo_articleClass_share_article(props?.item?.title, props?.item?.id);
			} else if (/^\/article\/topic/.test(route.path)) {
				matomo_articleTopic_share_article(props?.item?.title, props?.item?.id);
			}
		};

		// 點擊微博
		const clickWeibo = () => {
			// Share Weibo
			const shareqqstring = `http://service.weibo.com/share/share.php?url=${url.value}&title=${title.value}&pic=${pic.value}`;
			window.open(shareqqstring, '_blank');

			// Matomo track
			if (/^\/article\/class/.test(route.path)) {
				matomo_articleClass_share_article(props?.item?.title, props?.item?.id);
			} else if (/^\/article\/topic/.test(route.path)) {
				matomo_articleTopic_share_article(props?.item?.title, props?.item?.id);
			}
		};
		return {
			releaseTime,
			className,
			pic,
			title,
			avatar,
			name,
			viewNum,
			messageNum,
			errorAvatarImg,
			errorArticleImg,
			clickItem,
			clickCopy,
			clickQQ,
			clickWeibo,
		};
	},
};
</script>
<style lang="scss" scoped>
.p-top {
	padding-bottom: 39.06%;
}
.bg-top {
	background: #f8f8f8;
}
.text-date {
	color: #969696;
}
.text-class {
	color: #969696;
}
.text-title {
	color: #191919;
}
.text-name {
	color: #969696;
}
.text-name {
	color: #969696;
}
.text-view-num {
	color: #969696;
}
.text-message-num {
	color: #969696;
}
</style>
