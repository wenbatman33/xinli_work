<template lang="pug">
div.noticePage
	a-tabs( @change='changeTab')
		a-tab-pane(v-for='item in state.typeList', :key='item.id', :tab='item.name')

	.notice(v-if='state.noticeList.length>0', v-for='(item, index) in  state.noticeList', :key='index', @click='details(item.id, index)')
		span.notice_type(:style="{'background': item.name == '直播' ? '#28c163' : item.name == '活动' ? '#ff9a00' : item.name == '系统' ? '#3f91ff' : item.name == '其他' ? '#f1433f' : ''}") {{ item.name }}
		p.notice_content.flex-grow.pl-4 {{ item.title }}
		span.notice_time {{ item.createAt }}
	//- notice 無內容-----------------------------------------------
	.w-full.min-h-screen.CENTER.flex-col(v-if='state.noticeList.length<=0')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		.text-lg.text-gray-500.my-2 抱歉！目前暂无活动！
</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted, computed, watch, toRaw } from 'vue';
import { noticeList } from '@/api';

export default {
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			cate_id: route.query.key ? route.query.key : 0,
			noticeList: [],
			typeList: [],
		});
		const changeTab = (val) => {
			state.cate_id = val;
			getNoticeList();
		};
		const getNoticeList = () => {
			state.noticeList = [];
			noticeList({
				page: 1,
				pagesize: 100,
				cate_id: state.cate_id,
			}).then((res) => {
				if (res.code === 0 && res.data) {
					if (res.data.list) {
						res.data.list.map((data) => {
							data.createAt = dayjs(data.create_at * 1000).format('YYYY-MM-DD HH:mm');
						});
						state.noticeList = res.data.list;
						const frist = { id: 0, name: '全部' };
						state.typeList = [frist, ...res.data.category];
					}
				}
			});
		};
		const details = (id, index) => {
			router.push({ path: '/notice/details', query: { id: id } });
		};
		onMounted(() => {
			getNoticeList();
		});
		return {
			state,
			route,
			router,
			changeTab,
			getNoticeList,
			details,
		};
	},
};
</script>
<style lang="scss" scoped>
.notice_container {
	height: 240px;
	// overflow: auto;
	.notice {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 9px 10px;
		border-radius: 8px;
		font-size: 12px;
		margin-bottom: 6px;
		cursor: pointer;
		span {
			display: inline-block;
		}
		.notice_type {
			width: 36px;
			background: #28c163;
			padding: 2px 0;
			border-radius: 4px;
			color: #fff;
			text-align: center;
		}
		.notice_content {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: left;
		}
		.notice_time {
			width: 120px;
			text-align: center;
			color: #8e8e93;
		}
	}
}
</style>
