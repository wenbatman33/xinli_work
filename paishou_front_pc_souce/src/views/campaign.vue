<template lang="pug">
.Container.FLEX_C.justify-between.py-8
	//- AD 側區塊
	.w-full.my-4.overflow-hidden
		slideBanner(:slide_cid='5', :autoPlaySpeed='5000')
	//- campaign 左側區塊
	.min-h-screen(v-if='state.campaignList')
		.grid.grid-cols-3.gap-4
			.campaignItem.col-span-1(v-for='item in state.campaignList')
				.campaignImg.cursor-pointer
					.tip(v-if='item.event_status==="进行中"', :style='{ background: "#ff1e74"}') {{item.event_status}}
					.tip(v-if='item.event_status==="即将开始"', :style='{ background: "#a62337"}') {{item.event_status}}
					.tip(v-if='item.event_status==="即将结束"', :style='{ background: "#303133"}') {{item.event_status}}
					.share.FLEX_R.justify-end
						.shareBtn.mr-1.shadow(@click='shraeQQHandle(item)') 
							QqOutlined
						.shareBtn.mr-1.shadow(@click='shraeWeiboHandle(item)')
							WeiboOutlined
						.shareBtn.mr-1.shadow(@click='copyUrl(item.event_web_url)')
							LinkOutlined
					img.w-full(:src='item.event_pic', @click='gotoDeepLink(item.event_url, item.event_name)')
				.FLEX_C.p-2
					.info.FLEX_C.cursor-pointer(@click='gotoDeepLink(item.event_url)')
						h4.campaign_title.text-gray-700 {{item.event_name}}
						.text-xs.text-gray-500 {{formatDate(item.start_at)}}~{{formatDate(item.end_at)}}
	//- campaign 無內容-----------------------------------------------
	.w-full.CENTER.min-h-screen.flex-col(v-if='state.campaignList===null')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		.text-lg.text-gray-500.my-2 抱歉！此分类暂无活动！
</template>
<script>
import { copyText } from 'vue3-clipboard';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { eventCategory, event } from '@/api';
import { message } from 'ant-design-vue';
import { QqOutlined, WeiboOutlined, LinkOutlined } from '@ant-design/icons-vue';
import slideBanner from '@/components/swipers/slideBanner.vue';
import { matomo_campaign_view, matomo_campaign_share, matomo_campaign_copy_link } from '@/matomoEvent';
import { shraeToQQ, shraeToWeibo, deepLink } from '@/utils';

export default {
	components: { QqOutlined, WeiboOutlined, LinkOutlined, slideBanner },
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			cid: null,
			typeList: null,
			campaignList: [],
			adBannerList: null,
		});
		const formatDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
		const changeTab = (val) => {
			state.cid = val;
			getCampaignList();
		};
		const getCampaignList = () => {
			state.campaignList = [];
			event({ cid: state.cid }).then((res) => {
				state.campaignList = res.data.list;
			});
		};
		const getCampaignCategory = () => {
			eventCategory().then((res) => {
				state.typeList = res.data.list;
				state.cid = 0;
				getCampaignList();
			});
		};
		const copyUrl = (url) => {
			matomo_campaign_copy_link();
			copyText(url, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		const shraeQQHandle = (item) => {
			matomo_campaign_share();
			shraeToQQ(encodeURIComponent(item.event_web_url), item.event_name, item.event_pic);
		};
		const gotoDeepLink = (link, name) => {
			matomo_campaign_view(name);
			deepLink(link);
		};
		const shraeWeiboHandle = (item) => {
			matomo_campaign_share();
			shraeToWeibo(encodeURIComponent(item.event_web_url), item.event_name, item.event_pic);
		};
		const init = () => {
			getCampaignCategory();
		};
		onMounted(() => {
			init();
		});
		return {
			init,
			state,
			changeTab,
			getCampaignCategory,
			getCampaignList,
			copyUrl,
			formatDate,
			shraeQQHandle,
			shraeWeiboHandle,
			gotoDeepLink,
		};
	},
};
</script>
<style lang="scss" scoped>
.home_content {
	width: 1200px;
	position: relative;
	min-height: 800px;
	margin: 20px auto;
}
.campaign {
	width: 1200px;
	min-height: 800px;
	margin: 20px auto;
	position: relative;
}
.campaignBanner {
	width: 799px;
	height: 136px;
	border-radius: 8px;
	overflow: hidden;
}
.campaignItem {
	width: 100%;
	// height: 172px;
	border-radius: 8px;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
	background-color: #ffffff;
	overflow: hidden;
	.campaignImg {
		position: relative;
		width: 100%;
		// height: 108px;
		overflow: hidden;
		background: url('/publicAssets/img/v3/campaignImgBg.png');
		background-size: cover;
		background-position: center center;
		.tip {
			position: absolute;
			top: 10px;
			left: 10px;
			width: 54px;
			height: 18px;
			line-height: 18px;
			border-radius: 4px;
			color: #fff;
			font-size: 12px;
			text-align: center;
		}
		.share {
			position: absolute;
			top: 10px;
			right: 10px;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.left {
	width: 182px;
	background: #fff;
	border-radius: 8px;
	padding: 20px;
	position: fixed;
	left: calc((100% - 1200px) / 2);
}
.right {
	width: 182px;
	position: fixed;
	right: calc((100% - 1200px) / 2);
}
.content {
	width: 799px;
}
.campaign_title {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.shareBtn {
	width: 20px;
	height: 20px;
	line-height: 15px;
	text-align: center;
	color: #fff;
	box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
	background-color: #a62337;
	border-radius: 20px;
	cursor: pointer;
}
.no_list {
	display: flex;
	flex-direction: column;
	width: 238px;
	text-align: center;
	margin: 50px auto 0;
	p {
		padding: 10px 0 0 0;
		color: #8e8e93;
	}
}
</style>
