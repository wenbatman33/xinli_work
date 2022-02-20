<template lang="pug">
.footer#footer.bg-gray-900
	.Container
		.footerTop.pt-12.text-gray-500
			.grid.grid-cols-12.gap-4
				.col-span-9
					.grid.grid-cols-12.gap-4
						.col-span-3
							h3.text-gray-100.mb-2 热门频道
							.grid.grid-cols-12.gap-2
								.col-span-4.cursor-pointer(v-for='item in currentClassList', :key='item.id', @click='selectType(item.id, item.name)') {{ item.name }}
						.col-span-3
							h3.text-gray-100.mb-2 帮助中心
							.mb-2
								router-link.mr-4(to='/about/35') 主播教程
								router-link.mr-4(to='/about/196605') 直播工具
							.mb-2
								router-link.mr-4(to='/about/33') 常见问题
								router-link.mr-4(to='/about/3') 隐私政策
						.col-span-3
							h3.text-gray-100.mb-2 联系我们
							.mb-2
								a(v-if='CONFIG?.qq_url', :href='CONFIG?.qq_url', target='_blank') {{CONFIG?.qq}}
								span(v-else) {{CONFIG?.qq_business}}
							.mb-2
								a(v-if='CONFIG?.qq_business_url', :href='CONFIG?.qq_business_url', target='_blank') 
								span(v-else)  {{CONFIG?.qq_business}}
							.mb-2
								a.text-3xl.mr-4(href='https://jq.qq.com/?_wv=1027&k=SGPqJi80', target='_blank')
									QqCircleFilled
								a.text-3xl.mr-4(href='https://weibo.com/paishou88?is_all=1', target='_blank')
									WeiboCircleFilled.mr-4
				.col-span-3.text-center
					.BETWEEN
						.about_us.mx-4(v-if='CONFIG && CONFIG.qrcode')
							//- p {{CONFIG.qrcode}}
							.font-black.title.text-gray-100 关于我们
							.qrcode.my-2
								img.w-20.h-20(:src='CONFIG.qrcode')
								.my-2 {{CONFIG.qrcode_note}}
						.down.mx-4
							.font-black.title.text-gray-100 产品下载
							.qrcode.my-2
								vue-qrcode(v-if='state.PWA_Download_Url', :value='state.PWA_Download_Url', :width='80')
								.my-2 移动端下载
		a-divider.bg-gray-600
		.footer_bottom.text-center.text-gray-500.pb-8
			router-link(to='/about/262212') 关于拍手
			a-divider(type='vertical') 
			router-link(to='/about/37')  版权投诉
			a-divider(type='vertical') 
			router-link(to='/about/41') 联系客服 
			a-divider(type='vertical') 
			a(href='mailto:paishou.live@foxmail.com', target='_blank') 官方信箱 paishou.live@foxmail.com
			a-divider(type='vertical') 
			span Copyright © Paishou {{currentYear}} 
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import VueQrcode from 'vue3-qrcode';
import { QqCircleFilled, WeiboCircleFilled } from '@ant-design/icons-vue';
import { classList } from '@/api';

export default {
	components: {
		VueQrcode,
		QqCircleFilled,
		WeiboCircleFilled,
	},
	setup() {
		const store = useStore();
		const state = reactive({
			PWA_Download_Url: null,
			classList: [],
		});
		const router = useRouter();
		const ver = process.env.VUE_APP_VER;
		const buildTime = process.env.VUE_APP_BUILDTIME;
		const CONFIG = computed(() => store.state?.config?.config);
		const currentClassList = computed(() => store.state.config.currentclassList);
		const currentYear = computed(() => dayjs().format('YYYY'));
		const selectType = (id, name) => {
			router.push({
				path: '/classify',
				query: {
					type: id,
					name: name,
				},
			});
		};
		onMounted(() => {
			state.PWA_Download_Url = process.env.VUE_APP_PWA_URL;
		});
		return {
			state,
			currentClassList,
			selectType,
			ver,
			buildTime,
			currentYear,
			CONFIG,
		};
	},
};
</script>
<style lang="scss" scoped></style>
