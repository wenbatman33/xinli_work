<template lang="pug">
div
	.details_box.p-4
		.details_head
			.details_title
				p.type(:style="{ 'background': state.data.type_name == '直播' ? '#28c163' : state.data.type_name == '活动' ? '#ff9a00' : state.data.type_name == '系统' ? '#3f91ff' : state.data.type_name == '其他' ? '#f1433f' : '' }") {{ state.data.type_name }}
				p.title {{ state.data.title }}
			p.time {{ parseTime(state.data.create_at) }}
		.details_content(v-html='state.data.content')
	.back_list.mt-4(@click='backList()') 返回公告列表
</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { noticeDetail } from '@/api';
import { reactive, onMounted, computed, watch, toRaw } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

export default {
	components: {
		LeftOutlined,
		RightOutlined,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			index: -1,
			listData: [],
			data: {}, // 当前显示
		});
		const prevData = computed(() => (state.index <= 0 ? null : state.listData[state.index - 1]));
		const nextData = computed(() => (state.index == state.listData[state.index] - 1 ? null : state.listData[state.index + 1]));
		const getNoticeList = () => {
			noticeDetail({
				id: route.query.id,
			}).then((res) => {
				if (res.code === 0 && res.data) {
					state.data = res.data;
				}
			});
		};
		const parseTime = (time) => {
			return dayjs(time * 1000).format('YYYY MM-DD HH:mm');
		};
		const backList = () => {
			router.push({ path: '/notice', query: { key: route.query.key } });
		};
		watch(
			() => state.index,
			(newVal) => {
				state.data = state.listData[state.index];
			},
			{ deep: true }
		);
		onMounted(() => {
			getNoticeList();
		});
		return {
			state,
			route,
			router,
			getNoticeList,
			prevData,
			nextData,
			backList,
			parseTime,
		};
	},
};
</script>
<style lang="scss" scoped>
.cover {
	width: 0 !important;
	height: 0 !important;
	overflow: hidden !important;
}
p {
	margin: 0;
}
.details_box {
	// height: 488px;
	background: #fff;
	padding: 30px;
	.details_head {
		.details_title {
			display: flex;
			align-items: center;
			.type {
				width: 46px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				color: #fff;
				border-radius: 4px;
				margin-right: 15px;
			}
			.title {
				font-size: 16px;
				font-weight: bolder;
			}
		}
		.time {
			padding: 10px 0;
			color: #8e8e93;
		}
	}
	.details_content {
		min-height: 400px;
	}
}
.title_list {
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	> div {
		width: 394px;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border-radius: 8px;
		padding: 0 12px;
		position: relative;
		.prev {
			width: 70px;
			color: #a62337;
			cursor: pointer;
			img {
				margin-right: 5px;
			}
		}
		.next {
			width: 70px;
			text-align: right;
			color: #a62337;
			cursor: pointer;
			img {
				margin-left: 5px;
			}
		}
		.list_title {
			display: flex;
			align-items: center;
			width: 310px;
			.type {
				width: 36px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				color: #fff;
				border-radius: 4px;
				margin-right: 10px;
				font-size: 12px;
			}
			.title {
				width: 250px;
				font-size: 12px;
				font-weight: bolder;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
}
.back_list {
	background: #fff;
	text-align: center;
	color: #a62337;
	font-weight: bolder;
	padding: 10px 0;
	border-radius: 8px;
	border: 1px solid #a62337;
	cursor: pointer;
}
</style>
