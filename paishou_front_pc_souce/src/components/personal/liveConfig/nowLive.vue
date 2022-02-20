<template lang="pug">
.w-full(v-if='state.liveInfo')
	.transition-opacity.bg-psV3Orange.text-center.rounded.p-4.mb-4 
		h5.text-white 建议您使用OBS开播时，请将视频比特率设定在 1200Kbps、FPS=15，以确保您的粉丝能维持观看品质并持续观看直播。
	.w-full.bg-white.rounded.p-4.pb-8
		.grid.grid-cols-3.gap-4
			.col-span-1.bg-gray-50.p-4.rounded-lg.truncate.BETWEEN
				h5.text-psV3Red 直播编号
				span.text-gray-500.float-right {{ state.liveInfo.stream }}
		
			.col-span-1.bg-gray-50.p-4.rounded-lg.truncate.BETWEEN
				h5.text-psV3Red 开播时间
				span.text-gray-500.float-right {{state.liveInfo.starttime}}

			.col-span-1.bg-gray-50.p-4.rounded-lg.truncate.BETWEEN
				h5.text-psV3Red 直播分类
				span.text-gray-500.float-right {{ filterClass(state.liveInfo.liveclassid) }}

			.col-span-3.bg-gray-50.p-4.rounded-lg.truncate.BETWEEN
				h5.text-psV3Red 所属赛事
				span.text-gray-500.float-right {{ state.liveInfo.cn }} {{ state.liveInfo.begin1 }} {{ state.liveInfo.home }} VS {{ state.liveInfo.away }}

			.col-span-3.bg-gray-50.p-4.rounded-lg.truncate.p-4
				.BETWEEN.items-center.my-2
					h5.text-psV3Red
						span 直播间标题
					span.rounded.text-white.float-right.bg-psV3Blue.text-xs.p-2.cursor-pointer(v-if='state.editTitle===false', type='primary', @click='state.editTitle=true') 修改
					span.rounded.text-white.float-right.bg-psV3Blue.text-xs.p-2.cursor-pointer(v-if='state.editTitle===true', type='primary', @click='changeLiveInfo("editTitle")') 确认修改
				a-input.mb-4(:disabled='!state.editTitle', v-model:value='state.liveInfo.title', placeholder='请输入直播间标题')
				
				//- .BETWEEN.items-center.my-2
				//- 	h5.text-psV3Red
				//- 		span 直播公告
				//- 	span.rounded.text-white.float-right.bg-psV3Blue.text-xs.p-2.cursor-pointer(v-if='state.editNotice===false', type='primary', @click='state.editNotice=true') 修改
				//- 	span.rounded.text-white.float-right.bg-psV3Blue.text-xs.p-2.cursor-pointer(v-if='state.editNotice===true', type='primary', @click='changeLiveInfo("editNotice")') 确认修改
				//- a-input.mb-4(:disabled='!state.editNotice', v-model:value='state.liveInfo.notice', placeholder='请输入直播间公告')
			
			.col-span-2.bg-gray-50.p-4.rounded-lg.truncate.p-4

				//- 推流设定(预设)
				a-tabs(default-active-key='1', :animated='false')

					a-tab-pane(:key='1')
						template(#tab)
							span.rounded.bg-psV3Red.test-xs.text-white.p-1.mr-1 主
							span 推流设定(预设)

						.grid.grid-cols-2.gap-4
							.col-span-1.bg-white.border.border-psV3Red.p-4.rounded-lg.cursor-pointer#pushFile(@click='copyTextPushFile(splitUrl(state?.liveInfo?.resource[0].push))', @mouseover='state.showPushFile=true' @mouseleave='state.showPushFile=false')
								.CENTER_BETWEEN
									.flex-grow.truncate
										span.text-psV3Red(v-if='state.showPushFile===false') 推流地址 {{splitUrl(state?.liveInfo?.resource[0].push)}}
										span.text-psV3Red(v-if='state.showPushFile===true') {{splitUrl(state?.liveInfo?.resource[0].push)}}
									.flex-shrink-0
										a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white 
											span.mr-1
												img(src='/publicAssets/img/v3/icon-link.png' , srcset='/publicAssets/img/v3/icon-link@2x.png 2x')
											span 复制

							.col-span-1.bg-white.border.border-psV3Red.p-4.rounded-lg.cursor-pointer#obsPass(@click='copyTextObsPass(splitObsPass(state?.liveInfo?.resource[0].push))', @mouseover='state.showObsPass=true' @mouseleave='state.showObsPass=false')
								.CENTER_BETWEEN
									.flex-grow.truncate
										span.text-psV3Red(v-if='state.showObsPass===false') 推流密钥
										span.text-psV3Red.text-xs(v-if='state.showObsPass===true') {{splitObsPass(state?.liveInfo?.resource[0].push)}}
									.flex-shrink-0
										a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white 
											span.mr-1
												img(src='/publicAssets/img/v3/icon-link.png' , srcset='/publicAssets/img/v3/icon-link@2x.png 2x')
											span 复制

					a-tab-pane(v-if='MULTI_PUSH===1', :key='2')
						template(#tab)
							span.rounded.bg-psV3Red.test-xs.text-white.p-1.mr-1 副
							span 推流设定

						.grid.grid-cols-2.gap-4
							.col-span-1.bg-white.border.border-psV3Red.p-4.rounded-lg.cursor-pointer#pushFile(@click='copyTextPushFile(splitUrl(state?.liveInfo?.resource[1].push))', @mouseover='state.showPushFile=true' @mouseleave='state.showPushFile=false')
								.CENTER_BETWEEN
									.flex-grow.truncate
										span.text-psV3Red(v-if='state.showPushFile===false') 推流地址 {{splitUrl(state?.liveInfo?.resource[1].push)}}
										span.text-psV3Red(v-if='state.showPushFile===true') {{splitUrl(state?.liveInfo?.resource[1].push)}}
									.flex-shrink-0
										a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white 
											span.mr-1
												img(src='/publicAssets/img/v3/icon-link.png' , srcset='/publicAssets/img/v3/icon-link@2x.png 2x')
											span 复制

							.col-span-1.bg-white.border.border-psV3Red.p-4.rounded-lg.cursor-pointer#obsPass(@click='copyTextObsPass(splitObsPass(state?.liveInfo?.resource[1].push))', @mouseover='state.showObsPass=true' @mouseleave='state.showObsPass=false')
								.CENTER_BETWEEN
									.flex-grow.truncate
										span.text-psV3Red(v-if='state.showObsPass===false') 推流密钥
										span.text-psV3Red.text-xs(v-if='state.showObsPass===true') {{splitObsPass(state?.liveInfo?.resource[1].push)}}
									.flex-shrink-0
										a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white 
											span.mr-1
												img(src='/publicAssets/img/v3/icon-link.png' , srcset='/publicAssets/img/v3/icon-link@2x.png 2x')
											span 复制

			.col-span-1.bg-gray-50.p-4.rounded-lg.p-4
				img.mb-2(src='/publicAssets/img/v3/icon_waring.png' , srcset='/publicAssets/img/v3/icon_waring@2x.png 2x')
				.text-xs.text-gray-500 拍手提供多个推流服务，供您使用。避免您的用户所在地区发生观看卡顿的情况，请多加利用。若使用上有问题可洽询客服协助。

			.col-span-3.bg-white.border.border-psV3Red.p-4.rounded-lg.truncate(@mouseover='state.showRoomUrl=true', @mouseleave='state.showRoomUrl=false')
				.CENTER_BETWEEN
					.flex-grow.truncate
						span.text-psV3Red(v-if='state.showRoomUrl===false') 直播间网址
						span.text-psV3Red(v-if='state.showRoomUrl===true') {{state.liveInfo.roomUrl}}
					.flex-shrink-0
						a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white.mr-2(@click='viewLive(UID)')
							img.w-3(src='/publicAssets/img/v3/icon-arrow-jump.png' , srcset='/publicAssets/img/v3/icon-arrow-jump@2x.png 2x')
							span 前往直播间

						a-button.text-xs.text-psV3Red.rounded-full.shadow.bg-white(@click='copyRoomUrl(state.liveInfo.roomUrl)')
							span.mr-1
								img(src='/publicAssets/img/v3/icon-link.png' , srcset='/publicAssets/img/v3/icon-link@2x.png 2x')
							span 复制
		.my-4
			a-button.rounded(block, type='primary', size='large', @click='closeRoom') 关播
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { message, Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw, toRef } from 'vue';
import { CopyOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons-vue';
import { changRoomTitle, addRoomNotice, stopRoom } from '@/api';

export default {
	props: ['dataList'],
	components: {
		CopyOutlined,
		EditOutlined,
		LinkOutlined,
	},
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const MULTI_PUSH = computed(() => store?.state?.user?.userInfo?.host?.multi_push);
		const classList = computed(() => store.state.config.classList);
		const state = reactive({
			liveInfo: null,
			editTitle: false,
			editNotice: false,
			showPushFile: false,
			showObsPass: false,
			showRoomUrl: false,
			resourceTitle: [
				{
					key: '主',
					name: '推流设定(预设)',
				},
				{
					key: '副',
					name: '推流设定',
				},
			],
		});
		const copyTextPushFile = (url) => {
			copyText(url, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		const copyTextObsPass = (url) => {
			copyText(url, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		const copyRoomUrl = (url) => {
			copyText(url, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		const splitUrl = (url) => url.split(state.liveInfo.stream)[0];
		const splitObsPass = (url) => `${state.liveInfo.stream}${url.split(state.liveInfo.stream)[1]}`;

		const changeLiveInfo = (type) => {
			if (type === 'editTitle') {
				// 只修改標題
				changRoomTitle({
					uid: Number(UID.value),
					title: state.liveInfo.title,
				}).then((res) => {
					state.editTitle = false;
					message.success('修改成功');
				});
			} else if (type === 'editNotice') {
				// 只修改公告
				addRoomNotice({
					uid: Number(UID.value),
					notice: state.liveInfo.notice,
				}).then((res) => {
					state.editNotice = false;
					message.success('修改成功');
				});
			}
		};
		const closeRoom = () => {
			Modal.confirm({
				title: '确定要关闭当前直播吗?',
				// content: h => <div style="color:red;">Some descriptions</div>,
				onOk() {
					closeLive();
				},
				onCancel() {},
				class: 'test',
			});
		};
		const closeLive = () => {
			stopRoom({
				uid: Number(UID.value),
				stream: state.liveInfo.stream,
			}).then((res) => {
				if (res.code === 0) {
					state.isLive = false;
					emit('init');
					store.dispatch('user/UPDATE_USER_INFO');
				}
			});
		};
		const viewLive = (liveuid) => {
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		const filterClass = (id) => {
			const game = classList.value.filter((item) => {
				return item.id === id;
			});
			return game[0] ? game[0].name : '';
		};
		onMounted(() => {
			state.liveInfo = toRef(props, 'dataList');
		});
		return {
			MULTI_PUSH,
			router,
			state,
			UID,
			copyTextPushFile,
			copyTextObsPass,
			copyRoomUrl,
			classList,
			filterClass,
			changeLiveInfo,
			closeRoom,
			closeLive,
			viewLive,
			splitUrl,
			splitObsPass,
		};
	},
};
</script>
<style lang="scss" scoped></style>
