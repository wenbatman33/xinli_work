<template lang="pug">
//- 主播/房管管理彈窗
van-popup(:show='show', class='w-8/12 md:w-6/12', teleport='.popupTeleport', round)
    //- 彈窗內容
    .flex.flex-col.items-stretch.px-6.pt-4.pb-6
        //- 彈窗表頭
        manage-header(:item='item', @click-close='clickClose')

        //- 主播/房管選項
        .grid.grid-cols-2.gap-4.mt-6(v-if='canHostManage || canAdminManage')
            //- 添加黑名單
            van-button.w-full.h-auto.p-2.rounded-full.bg-psV3Red.border-transparent(@click='clickShutup') 
                .text-xs.text-white 添加黑名单

            //- 添加封禁IP
            van-button.w-full.h-auto.p-2.rounded-full.bg-psV3Red.border-transparent(@click='clickBlockIp')
                .text-xs.text-white 添加封禁IP

        //- 主播選項
        .mt-4(v-if='canHostManage')
            van-button.w-full.h-auto.p-2.rounded-full.bg-psV3Yellow.border-transparent(v-if='isAdmin', @click='clickSetAdmin')
                .text-xs.text-white 取消管理员
            van-button.w-full.h-auto.p-2.rounded-full.bg-psV3Yellow.border-transparent(v-else, @click='clickSetAdmin')
                .text-xs.text-white 设为管理员

//- 設為房管彈窗
set-admin-popup(v-model:show='state.showSetAdminPopup', :item='item', @click-back='clickBack')

//- 添加黑名單彈窗
set-shutup-popup(v-model:show='state.showSetShutupPopup', :item='item', type='user', @click-back='clickBack')

//- 添加封禁IP彈窗
set-shutup-popup(v-model:show='state.showSetBlockIpPopup', :item='item', type='ip', @click-back='clickBack')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { hostManage, adminManage, isRoomAdmin } from '@/utils';
import manageHeader from '@/components/room/manageHeader.vue';
import setAdminPopup from '@/components/room/setAdminPopup.vue';
import setShutupPopup from '@/components/room/setShutupPopup.vue';

export default {
	components: {
		manageHeader,
		setAdminPopup,
        setShutupPopup,
	},
	props: {
		show: Boolean,
		item: Object,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			showSetAdminPopup: false,
			showSetShutupPopup: false,
			showSetBlockIpPopup: false,
		});

		// 用戶 uid
		const uid = computed(() => {
			return props?.item?.uid || '';
		});

		// 是否可以對用戶進行直播主管理
		const canHostManage = computed(() => {
			return hostManage(uid.value, route.params.id);
		});

		// 是否可以對用戶進行房間管理
		const canAdminManage = computed(() => {
			return adminManage(uid.value, route.params.id);
		});

		// 用戶是否為房管身份
		const isAdmin = computed(() => {
			const roomMemberList = store?.state?.socket?.roomMemberList || [];
			return isRoomAdmin(uid.value, route.params.id, roomMemberList);
		});

		// 點擊關閉
		const clickClose = () => {
			emit('update:show', false);
		};

		// 點擊添加黑名單
		const clickShutup = () => {
			state.showSetShutupPopup = true;
			emit('update:show', false);
		};

		// 點擊封禁IP
		const clickBlockIp = () => {
			state.showSetBlockIpPopup = true;
			emit('update:show', false);
		};

		// 點擊設為管理員
		const clickSetAdmin = () => {
			state.showSetAdminPopup = true;
			emit('update:show', false);
		};

		// 點擊返回管理彈窗
		const clickBack = () => {
			emit('update:show', true);
		};
		return {
			route,
			state,
			uid,
			canHostManage,
			canAdminManage,
			isAdmin,
			clickClose,
			clickShutup,
			clickBlockIp,
			clickSetAdmin,
			clickBack,
		};
	},
};
</script>
