<template lang="pug">
.banList
	.topMenu.px-4.text-right(style='margin-top:-66px')
		a-button(type='primary', @click='state.addBanModal=true') 添加IP封禁   
	.List.mt-8(v-if='state.banList.length>0')
		.grid.grid-cols-3.gap-4
			.col-span-1(v-for='(item, index) in state.banList')
				.w-full.h-full.bg-white.rounded.shadow.p-2
					.FLEX_C.truncate.py-2
						.text-xs.text-gray-500 封禁IP为
						h2.name {{item.name}}
					.blockType.my-2
						.grid.grid-cols-2.gap-4
							.col-span-1.text-center
								.border.border-gray-300.text-gray-300.p-2(:class='{"bg-psV3Red text-white border-psV3Red": item.type==="shut"}') 禁止发话
							.col-span-1.text-center
								.border.border-gray-300.text-gray-300.p-2(:class='{"bg-psV3Red text-white border-psV3Red": item.type==="kick"}')  禁止访问

					.settingTime.my-2
						.bg-gray-100.p-2
							span 封禁解除时间
							span.float-right {{item.cancel_time}}
					.lastLogiTime.my-2
						.bg-gray-100.p-2
							span 操作人
							span.float-right {{item.editor_name}}
					.w-full.my-2
						a-button.border-psV3Red.text-psV3Red(block, @click='showConfirm(item)') 提前解除

	.min-h-screen.mt-8(v-if='!state.loading && state.banList.length<=0', style='text-align: center;color: #c6c6c9;')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		p 抱歉！暂无相关名單！

	a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

	a-modal.radiusModal(v-if='state.showModal', :visible='state.showModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showModal=false')
		.CENTER.flex-col.p-12
			img.AVATAR.w-20.h-20(:src='state.currentItem.avatar' , @error='errorPersonImg')
			div.my-2
				img.w-10(:src='state.currentItem.level?userLevelThumb(state.currentItem.level):userLevelThumb(1)')
			h4.text-psV3Red.my-8.text-center 确认解除此IP封禁？
			h6.name.my-2 {{state.currentItem.name}}
			.text-center
				a-button.mx-4(@click='state.showModal=false') 取消
				a-button.mx-4(type='primary', @click='banCancelByHostHandle') 确定

	a-modal.radiusModal(v-if='state.addBanModal', :visible='state.addBanModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.addBanModal=false')
		.p-12
			h4.text-psV3Red.my-4 添加IP封禁
			.my-4
				h6 封禁会员昵称
				a-input(v-model:value='state.user_nickname', placeholder='请输入会员昵称')
			.my-4
				h6 封闭时间(小时)
				a-input(v-model:value='state.time', style='width: 100%',  placeholder='请输入数字')
			.my-4
				a-radio-group(v-model:value='state.banType')
					a-radio(:value='"shut"') 禁止发话
					a-radio(:value='"kick"') 禁止访问

			
			.grid.grid-cols-3.gap-4
				.col-span-1
					a-button.rounded-lg(block, @click='state.addBanModal=false') 取消
				.col-span-2
					a-button.rounded-lg(block, type='primary', :loading='state.serchLoading', @click='searchUserHandle') 确认添加

</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { banListByHost, banCancelByHost, userNameSearch, shutupip, kickingip } from '@/api';
import { message } from 'ant-design-vue';
import { userLevelThumb, errorPersonImg } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			time: 1,
			banType: 'shut',
			banList: [],
			loading: false,
			showModal: false,
			user_nickname: '',
			currentItem: null,
			addBanModal: false,
			serchLoading: false,
		});

		const showConfirm = (item) => {
			state.currentItem = toRaw(item);
			state.showModal = true;
		};

		const banCancelByHostHandle = () => {
			banCancelByHost({
				live_uid: Number(UID.value),
				row_id: state.currentItem.row_id,
				type: state.currentItem.type,
			}).then((res) => {
				state.showModal = false;
				message.success('已从黑名单移除');
				getBanListByHost();
			});
		};
		const searchUserHandle = () => {
			state.serchLoading = true;
			userNameSearch({
				name: state.user_nickname,
			})
				.then((res) => {
					if (res.data.id) {
						// addAdminHandle(res.data.id);
						state.banType === 'shut' ? setUserShutupIp(res.data.id) : setUserKickingIp(res.data.id);
					} else {
						state.serchLoading = false;
					}
				})
				.catch((error) => {
					state.serchLoading = false;
				});
		};
		const setUserShutupIp = (id) => {
			shutupip({
				liveuid: Number(UID.value),
				touid: Number(id),
				time: Number(state.time),
			})
				.then((res) => {
					const user = state.user_nickname;
					message.success(`${user} 已被禁言`);
					state.serchLoading = false;
					state.addBanModal = false;
					state.user_nickname = '';
					state.time = 1;
					getBanListByHost();
				})
				.catch((error) => {
					state.serchLoading = false;
					state.addBanModal = false;
				});
		};
		const setUserKickingIp = (id) => {
			kickingip({
				liveuid: Number(UID.value),
				touid: Number(id),
				time: Number(state.time),
			})
				.then((res) => {
					const user = state.user_nickname;
					message.success(`${user} 已被禁入直播间`);
					state.serchLoading = false;
					state.addBanModal = false;
					state.user_nickname = '';
					state.time = 1;
					getBanListByHost();
				})
				.catch((error) => {
					state.serchLoading = false;
					state.addBanModal = false;
				});
		};
		const getBanListByHost = () => {
			state.loading = true;
			banListByHost({
				type: 'ip',
			}).then((res) => {
				state.loading = false;
				if (res.code === 0 && res.data.list) {
					state.banList = res?.data?.list || [];
				} else {
					state.banList = [];
				}
			});
		};
		onMounted(() => {
			getBanListByHost();
		});
		return {
			store,
			state,
			route,
			router,
			UID,
			getBanListByHost,
			showConfirm,
			banCancelByHostHandle,
			userLevelThumb,
			errorPersonImg,
			searchUserHandle,
			setUserShutupIp,
			setUserKickingIp,
		};
	},
};
</script>
<style lang="scss" scoped></style>
