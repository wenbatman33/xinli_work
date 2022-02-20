<template lang="pug">
//- 活動
.w-full.flex.flex-col.pb-8
	//- 分隔線
	divider

	//- 下拉刷新
	van-pull-refresh.w-full.px-4.pt-6.pb-8(:model-value='state.isLoading', @refresh='refresh')
		//- 目前沒有活動
		empty.mt-12(v-if='isEmpty', text='目前没有活动')

		//- 活動列表
		.grid.grid-cols-1.gap-4(v-else)
			//- 活動物件
			.campaign-item.col-span-1.rounded(v-for='item in state.campaignList')
				//- 上半部
				.campaign-top
					//- 點擊按鈕
					van-button.campaign-button(@click='clickItem(item)')

					//- 活動狀態
					.compaign-status(:class='getStatusClass(item.event_status)') {{ item.event_status }}

					//- 分享按鈕
					.share.flex.flex-row.justify-end
						//- QQ
						van-button.share-btn.mr-2(@click.stop='clickQQ(item)')
							.flex.justify-center.items-center
								img(src='/publicAssets/img/icon-qq@3x.png')

						//- 微博
						van-button.share-btn.mr-2(@click.stop='clickWeibo(item)')
							.flex.justify-center.items-center
								img(src='/publicAssets/img/icon-weibo@3x.png')

						//- 複製
						van-button.share-btn(@click.stop='clickCopy(item)')
							.flex.justify-center.items-center
								img(src='/publicAssets/img/icon-link@3x.png')

					//- 活動圖片
					img.campaign-img.rounded-t(:src='item.event_pic', @error='errorCampaignImg')

				//- 下半部
				.campaign-bottom.flex.flex-col
					//- 點擊按鈕
					van-button.campaign-button(@click='clickItem(item)')

					//- 活動標題
					.campaign-title.text-lg.font-bold {{item.event_name}}

					//- 活動時間
					.campaign-date.text-xs.font-normal {{formatDate(item.start_at)}}~{{formatDate(item.end_at)}}
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { Notify } from 'vant';
import { event } from '@/api';
import { deepLink } from '@/utils';
import { matomo_campaign_check_event, matomo_campaign_copy_link, matomo_campaign_share_weibo, matomo_campaign_share_qq } from '@/matomoTrackEvent.js'
import divider from '@/components/divider';
import empty from '@/components/empty';
import dayjs from 'dayjs';

export default {
	components: {
		divider,
		empty,
	},
	setup() {
		// Component state
		const state = reactive({
			isLoading: false,
			campaignList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.campaignList || state.campaignList.length === 0;
		});

		// 格式化活動日期
		const formatDate = (date) => {
			try {
				return dayjs(date).format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return date;
			}
		};

		//- 狀態對應的class
		const getStatusClass = (status) => {
			if (status === '进行中') {
				return 'available';
			} else if (status === '即将开始') {
				return 'upcoming';
			} else {
				return 'ending';
			}
		};

		// 取得活動列表
		const getCampaignList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				cid: 0,
			};

			// Get event list
			event(query)
				.then((res) => {
					// Update campaign list
					state.campaignList = res?.data?.list || [];

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// 下拉刷新
		const refresh = () => {
			getCampaignList();
		};

		// 活動圖片讀取失敗
		const errorCampaignImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// 點擊活動物件
		const clickItem = (item) => {
			deepLink(item.event_url);
			matomo_campaign_check_event(item.event_name);
		};

		// 點擊複製
		const clickCopy = (item) => {
			const x = window.scrollX;
			const y = window.scrollY;
			const input = document.createElement('input');
			try {
				document.body.appendChild(input);
				input.type = 'text';
				input.value = item.event_web_url;
				input.focus();
				input.select();
				input.setSelectionRange(0, 99999);
				document.execCommand('copy');
			} catch (err) {}
			document.body.removeChild(input);
			window.scrollTo(x, y);
			Notify({ type: 'success', message: '活动链结复制完成' });
			matomo_campaign_copy_link(item.event_name);
		};

		// 點擊QQ
		const clickQQ = (item) => {
			const shareqqstring = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(item.event_web_url)}&title=${item.event_name}&pics=${item.event_pic}&summary=${item.event_name}`;
			window.open(shareqqstring, '_blank');
			matomo_campaign_share_qq(item.event_name);
		};

		// 點擊微博
		const clickWeibo = (item) => {
			const shareqqstring = `http://service.weibo.com/share/share.php?url=${item.event_web_url}&title=${item.event_name}&pic=${item.event_pic}`;
			window.open(shareqqstring, '_blank');
			matomo_campaign_share_weibo(item.event_name);
		};

		// On component mounted
		onMounted(() => {
			getCampaignList();
		});
		return {
			state,
			isEmpty,
			formatDate,
			getStatusClass,
			refresh,
			errorCampaignImg,
			clickItem,
			clickCopy,
			clickQQ,
			clickWeibo,
		};
	},
};
</script>
<style lang="scss" scoped>
.campaign-item {
	position: relative;
	width: 100%;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
	background-color: #ffffff;
}
.campaign-button {
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0;
	border: transparent;
	background: transparent;
}
.campaign-top {
	position: relative;
	width: 100%;
	height: 0;
	overflow: hidden;
	padding-bottom: 39.06%;
	background: #f8f8f8;
}
.campaign-img {
	width: 100%;
	object-fit: cover;
	object-position: top center;
	-o-object-fit: cover;
	-o-object-position: top center;
}
.compaign-status {
	position: absolute;
	top: 8px;
	left: 12px;
	width: 64px;
	height: 24px;
	line-height: 24px;
	border-radius: 6px;
	font-size: 12px;
	text-align: center;
	font-weight: 600;
	box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
	&.available {
		color: #ffffff;
		background: #000000;
	}
	&.upcoming {
		color: #ffffff;
		background: #f8b62d;
	}
	&.ending {
		color: #a62337;
		background: #ffffff;
	}
}
.share {
	position: absolute;
	bottom: 8px;
	right: 12px;
	.share-btn {
		width: 28px;
		height: 28px;
		padding: 0;
		border: transparent;
		border-radius: 14px;
		background: #ffffff;
		box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
		img {
			width: 24px;
			height: 24px;
		}
	}
}
.campaign-bottom {
	position: relative;
	.campaign-title {
		padding: 12px 14px 0px 14px;
		color: #a62337;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.campaign-date {
		padding: 2px 14px 12px 14px;
		color: #969696;
	}
}
</style>
