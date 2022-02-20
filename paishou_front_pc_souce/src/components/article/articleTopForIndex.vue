<template lang="pug">
.articleCrad.rounded.w-full.overflow-hidden.shadow.cursor-pointer(style='height:195px;', @click='gotoInfo(articleData.id)')
	.w-full.overflow-hidden.relative(style='height:195px;')
		.absolute.bg-black.w-full.h-full.bg-cover.bg-center.cursor-pointer.transform.transition.duration-300(class='hover:scale-125', :style='`background-image: url(${articleData.pic}); height:195px;`', @click='gotoInfo(articleData.id)')

		.info.FLEX_C.justify-end.w-full.absolute.bottom-0.z-10.p-4.pointer-events-none
			.text-xs.text-white.mb-1 {{formatDate(articleData.release_time)}} - {{articleData.class_name}}
			.h-10.font-bold.text-white.title.line-clamp-2 {{articleData.title}}
			.CENTER_BETWEEN.text-xs.mt-2
				.FLEX_R
					img.AVATAR.w-5.h-5(:src='articleData.avatar', @error='errorPersonImg')
					span.text-white.mx-2 {{articleData.nickname}}
				.shareBtns.FLEX_R.items-center
					img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-eye-on.png', srcset='/publicAssets/img/v3/icon-eye-on@2x.png 2x')
					span.mr-4.text-white {{articleData.pageview_front}}
					img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-comments-g.png', srcset='/publicAssets/img/v3/icon-comments-g@2x.png 2x')
					span.text-white {{articleData.message_num}}
				
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { errorPersonImg, formatDate, shraeToQQ, shraeToWeibo } from '@/utils';

export default {
	props: ['articleData', 'path', 'classID'],
	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const gotoInfo = (id) => router.push(`/article/info/${id}`);

		// ----------------------------------------------------------------
		const shraeQQHandle = () => {
			// localhost 會顯示不出來是正常的
			const { title, pic } = props.articleData;
			shraeToQQ(window.location.href, title, pic);
		};
		const shraeWeiboHandle = () => {
			const { title, pic } = props.articleData;
			shraeToWeibo(window.location.href, title, pic);
		};
		const copyUrl = () => {
			const URL = `${window.location.origin}/article/info/${props.articleData.id}`;
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
<style lang="scss" scoped>
.info {
	height: 100%;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 1) 100%);
}
</style>
