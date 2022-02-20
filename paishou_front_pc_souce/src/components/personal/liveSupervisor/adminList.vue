<template lang="pug">
.adminList
	.topMenu.px-4.text-right(style='margin-top:-66px')
		a-button(type='primary', @click='state.addAdminModal=true') 添加管理员   
	.List.mt-8(v-if='state.adminList.length>0')
		.grid.grid-cols-3.gap-4
			.col-span-1(v-for='(item, index) in state.adminList')
				.w-full.h-full.bg-white.rounded.shadow.p-2
					.BETWEEN.my-2
						img.AVATAR.w-12.h-12(:src='item.avatar' , @error='errorPersonImg')
						.info.FLEX_C.flex-grow.px-4
							div
								span
									img.w-7.mr-1(:src='userLevelThumb(item.level)')
								span.text-psV3Yellow UID:{{item.uid}}
							h6.name {{item.nickname}}
					.settingTime.my-2
						.bg-gray-100.p-2
							span 添加时间
							span.float-right {{item.setting_time}}
					.lastLogiTime.my-2
						.bg-gray-100.p-2
							span 最後登入時間
							span.float-right {{item.last_login_time}}
					.w-full.my-2
						a-button.border-psV3Red.text-psV3Red(block, @click='showConfirm(item)') 撤销

	.min-h-screen.mt-8(v-if='!state.loading && state.adminList.length<=0', style='text-align: center;color: #c6c6c9;')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		p 抱歉！暂无相关名單！

	a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

	a-modal.radiusModal(v-if='state.showModal', :visible='state.showModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showModal=false')
		.CENTER.flex-col.p-12
			.w-20.h-20.rounded-full.overflow-hidden.bg-gray-300
				img.w-full(:src='state.currentItem.avatar' , @error='errorPersonImg')
			div.my-2
				img.w-10(:src='userLevelThumb(state.currentItem.level)')
			h6.name.my-2 {{state.currentItem.nickname}}
			h4.text-psV3Red.my-8.text-center 确定要撤銷管理资格吗？
			.text-center
				a-button.mx-4(@click='state.showModal=false') 取消
				a-button.mx-4(type='primary', @click='setAdminHandle') 确定
	a-modal.radiusModal(v-if='state.addAdminModal', :visible='state.addAdminModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.addAdminModal=false')
		.p-12
			h4.text-psV3Red.my-4 添加管理员
			.mb-20
				h6 管理员昵称
				a-input(v-model:value='state.user_nickname', placeholder='请输入会员昵称')
			
			.grid.grid-cols-3.gap-4
				.col-span-1
					a-button.rounded-lg(block, @click='state.addAdminModal=false') 取消
				.col-span-2
					a-button.rounded-lg(block, type='primary', :loading='state.serchLoading', @click='searchUserHandle') 确认添加

</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { adminListByHost, setadmin, addAdminListByHost, userNameSearch } from '@/api';
import { message } from 'ant-design-vue';
import { userLevelThumb, errorPersonImg } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			adminList: [],
			showModal: false,
			addAdminModal: false,
			currentItem: null,
			loading: false,
			user_nickname: '',
			serchLoading: false,
		});

		const showConfirm = (item) => {
			state.currentItem = toRaw(item);
			state.showModal = true;
		};

		const setAdminHandle = () => {
			addAdminListByHost({
				liveuid: Number(UID.value),
				uid: state.currentItem.uid,
			}).then((res) => {
				state.showModal = false;
				message.success('已撤销管理资格');
				getAdminListByHost();
			});
		};
		const searchUserHandle = () => {
			state.serchLoading = true;
			userNameSearch({
				name: state.user_nickname,
			})
				.then((res) => {
					if (res.data.id) {
						addAdminHandle(res.data.id);
					} else {
						state.serchLoading = false;
					}
				})
				.catch((error) => {
					state.serchLoading = false;
				});
		};
		const addAdminHandle = (id) => {
			addAdminListByHost({
				liveuid: Number(UID.value),
				uid: Number(id),
			})
				.then((res) => {
					state.addAdminModal = false;
					state.serchLoading = false;
					state.user_nickname = '';
					message.success('已添加管理员');
					getAdminListByHost();
				})
				.catch((error) => {
					state.serchLoading = false;
				});
		};
		const getAdminListByHost = () => {
			state.loading = true;
			adminListByHost({
				uid: Number(UID.value),
			}).then((res) => {
				state.loading = false;
				if (res.code === 0 && res.data.list) {
					state.adminList = res?.data?.list || [];
				} else {
					state.adminList = [];
				}
			});
		};
		onMounted(() => {
			getAdminListByHost();
		});
		return {
			store,
			state,
			route,
			router,
			UID,
			getAdminListByHost,
			showConfirm,
			setAdminHandle,
			userLevelThumb,
			errorPersonImg,
			searchUserHandle,
			addAdminHandle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
