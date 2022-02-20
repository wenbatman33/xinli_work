<template lang="pug">
.articleCrad.rounded.w-full.overflow-hidden.shadow.cursor-pointer
	//- .w-full.overflow-hidden.relative(style='height:130px;')
	.w-full.overflow-hidden.relative(class='h-[130px]')
		.absolute.bg-black.w-full.h-full.bg-cover.bg-center.cursor-pointer.transform.transition.duration-300(class='hover:scale-125', :style='`background-image: url(${articleData.pic}); height:130px;`', @click='gotoInfo(articleData.title, articleData.id)')
		.FLEX_R.absolute.bottom-3.right-2
			.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='shraeWeiboHandle')
				img(src='/publicAssets/img/v3/button-icon-weibo.png' , srcset='/publicAssets/img/v3/button-icon-weibo@2x.png 2x')
			.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='shraeQQHandle')
				img(src='/publicAssets/img/v3/button-icon-qq.png' , srcset='/publicAssets/img/v3/button-icon-qq@2x.png 2x')
			.CENTER.rounded-full.shadow.mr-1.cursor-pointer(@click='copyUrl')
				img(src='/publicAssets/img/v3/button-icon-link.png' , srcset='/publicAssets/img/v3/button-icon-link@2x.png 2x')
	
	.FLEX_C.justify-end.bg-white.z-10.p-4(@click='gotoInfo(articleData.title, articleData.id)')
		.text-xs.text-gray-400.mb-1 {{formatDate(articleData.release_time)}} - {{articleData.class_name}}
		.h-10.font-bold.title.line-clamp-2 {{articleData.title}}
		.CENTER_BETWEEN.text-xs.mt-2
			.FLEX_R
				img.AVATAR.w-5.h-5(:src='articleData.avatar', @error='errorPersonImg')
				span.text-gray-400.mx-2 {{articleData.nickname}}
			.shareBtns.FLEX_R.items-center
				img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-eye-on.png', srcset='/publicAssets/img/v3/icon-eye-on@2x.png 2x')
				span.mr-4.text-gray-400 {{articleData.pageview_front}}
				img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-comments-g.png', srcset='/publicAssets/img/v3/icon-comments-g@2x.png 2x')
				span.text-gray-400 {{articleData.message_num}}
				
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { matomo_article_view_click, matomo_article_share, matomo_article_copy_link } from '@/matomoEvent';
import { matomo_article_topic_view_click, matomo_article_topic_share, matomo_article_topic_copy_link } from '@/matomoEvent';
import { matomo_index_article } from '@/matomoEvent';
import { errorPersonImg, formatDate, shraeToQQ, shraeToWeibo } from '@/utils';

export default {
	props: ['articleData', 'path', 'classID'],
	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const gotoInfo = (title, id) => {
			matomo_article_view_click(title, id);
			if (route.name === 'articleTopic') {
				matomo_article_topic_view_click(title, id);
			} else if (route.name === 'index') {
				matomo_index_article(title, id);
			} else {
				matomo_article_view_click(title, id);
			}
			router.push(`/article/info/${id}`);
		};

		// ----------------------------------------------------------------
		const shraeQQHandle = () => {
			// localhost 會顯示不出來是正常的
			const { title, pic, id } = props.articleData;
			route.name === 'articleTopic' ? matomo_article_topic_share(title, id) : matomo_article_share(title, id);
			shraeToQQ(window.location.href, title, pic);
		};
		const shraeWeiboHandle = () => {
			const { title, pic, id } = props.articleData;
			route.name === 'articleTopic' ? matomo_article_topic_share(title, id) : matomo_article_share(title, id);
			shraeToWeibo(window.location.href, title, pic);
		};
		const copyUrl = () => {
			const { title, pic, id } = props.articleData;
			const URL = `${window.location.origin}/article/info/${id}`;
			route.name === 'articleTopic' ? matomo_article_topic_copy_link(title, id) : matomo_article_copy_link(title, id);
			copyText(URL, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};

		return {
			route,
			router,
			errorPersonImg,
			gotoInfo,
			shraeQQHandle,
			shraeWeiboHandle,
			copyUrl,
			formatDate,
		};
	},
};
</script>
<style lang="scss" scoped></style>
