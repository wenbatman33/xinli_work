<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(index)' ) {{item.title}}

	.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.FLEX_R.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
					.px-2.cursor-pointer(@click='tabChange(index)' )
						.font-black.mr-1 {{item.title}}

		.grid.grid-cols-3.gap-4.my-4(v-if='state.dataList')
			.col-span-1.bg-white.shadow.rounded-lg(v-for='(item, index) in state.dataList', :key='index')
				.p-4.cursor-pointer(@click='showDetail(item)')
					.flex.items-center
						.w-2.h-2.mr-1.unRead.bg-psV3Red.rounded-full(v-if='item.status===0')
						.text-gray-500 {{ item.create_at }}
					h5.mb-12 {{ item.title }}

		.w-full.min-h-screen.CENTER.flex-col(v-if='!state.dataList')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-lg.text-gray-500.my-2 还未有任何消息


		a-modal(v-model:visible='state.isShowDetail', class='inboxModal',  :footer='null', width='650px')
			.p-12
				.BETWEEN
					div
						.text-gray-500 {{ state?.inboxDetail?.create_at }}
						h5.mb-12 {{ state?.inboxDetail?.title }}
					.rounded-lg.w-20.h-8.border.border-psV3Red.p-1
						.text-psV3Red.text-center.cursor-pointer(@click='deleteInbox')
							span.mr-1R
								img(src='/publicAssets/img/v3/icon-delete.png', srcset='/publicAssets/img/v3/icon-delete@2x.png 2x')
							span 删除
				.text-gray-800(v-html='state?.inboxDetail?.content')

			.mt-20
				img.w-36(src='/publicAssets/img/v3/img-logo-a.png')

		a-modal(v-model:visible='state.showModal', class='inboxModal', :closable='false', :footer='null', width='650px')
			.p-12.CENTER.flex-col
				img(src='/publicAssets/img/v3/icon-banana.png', srcset='/publicAssets/img/v3/icon-banana@2x.png 2x')
				h3.text-psV3Red 确认删除此封信件？
				.text-gray-500.text-xs (删除后无法复原)
			.model_btn.my-8.text-center
				a-button.mx-2(@click='state.showModal=false') 取消
				a-button.mx-2(type='primary', @click='deleteConfirm') 确定
</template>
<script>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw, watch } from 'vue';
import { inboxDelete, inboxReaded } from '@/api';
import menuList from '@/components/personal/menuList.vue';

export default {
	components: {
		LeftOutlined,
		menuList,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '全部讯息', value: 0 },
				{ title: '已读', value: 1 },
				{ title: '未读', value: 2 },
			],
			dataList: null,
			returnList: [],
			showModal: false,
			isShowDetail: false,
			inboxDetail: null,
			currentID: '',
		});
		const UID = computed(() => store.state.user.uid || '');
		const userInboxList = computed(() => store.state.user.inboxList || '');

		const userInfo = computed(() => store.state.user.userInfo || '');
		const showDetail = (item) => {
			state.inboxDetail = null;
			// 未讀取狀態時 送開信api
			if (item.status === 0) {
				inboxReaded({
					uid: Number(UID.value),
					inbox_id: item.id,
				}).then((res) => {
					state.currentID = item.id;
					state.isShowDetail = true;
					state.inboxDetail = item;
					store.dispatch('user/GET_INBOX_LIST');
				});
			} else {
				state.currentID = item.id;
				state.isShowDetail = true;
				state.inboxDetail = item;
			}
		};
		const tabChange = (val) => {
			state.tabID = val;
			if (val === 0) {
				state.dataList = userInboxList.value;
			} else if (val === 1) {
				state.dataList = userInboxList.value.filter((item) => item.status === 1);
			} else if (val === 2) {
				state.dataList = userInboxList.value.filter((item) => item.status === 0);
			}
		};
		const closeDetail = () => {
			state.showModal = false;
			state.isShowDetail = false;
			state.inboxDetail = null;
		};
		const deleteInbox = () => {
			state.isShowDetail = false;
			state.showModal = true;
		};
		const deleteConfirm = () => {
			inboxDelete({ inbox_id: state.currentID }).then((res) => {
				store.dispatch('user/GET_INBOX_LIST').then((res) => {
					closeDetail();
				});
			});
		};
		watch(
			() => userInboxList,
			(newVal) => {
				init();
			},
			{ deep: true }
		);
		const init = () => {
			tabChange(0);
		};
		onMounted(() => {
			init();
		});
		return {
			router,
			state,
			UID,
			userInboxList,
			userInfo,
			init,
			showDetail,
			closeDetail,
			deleteInbox,
			deleteConfirm,
			tabChange,
		};
	},
};
</script>
<style lang="scss">
.inboxModal {
	width: 650px;
	border-radius: 20px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
