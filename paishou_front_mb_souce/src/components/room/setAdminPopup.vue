<template lang="pug">
//- 設為房管彈窗
van-popup(:show='show', class='w-8/12 md:w-6/12', teleport='.popupTeleport', round)
    //- 彈窗內容
    .flex.flex-col.items-stretch.px-6.pt-4.pb-6
        //- 彈窗表頭
        manage-header(:item='item', back, @click-close='clickClose', @click-back='clickBack')

        //- 標題
        .text-xs.text-title.text-center.font-bold.mt-8 {{ isAdmin ? '取消管理员' : '设为管理员'}}

        //- 內容
        .text-sm.text-content.text-center.font-bold.mt-4 {{ isAdmin ? '确定要取消管理员？' : '确定要让此会员成为管理员？' }}

        //- 確認取消
        .grid.grid-cols-2.gap-4.mt-8
            //- 確認
            van-button.w-full.h-auto.p-2.rounded.bg-confirm.border-transparent(:loading='adminLoading', @click='clickConfirm') 
                .text-xs.text-white 确认

            //- 取消
            van-button.w-full.h-auto.p-2.rounded.bg-transparent.border-cancel(@click='clickCancel')
                .text-xs.text-cancel 取消
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { isRoomAdmin } from '@/utils';
import manageHeader from '@/components/room/manageHeader.vue';

export default {
	components: {
		manageHeader,
	},
	props: {
		show: Boolean,
		item: Object,
	},
	emits: ['update:show', 'click-back'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();

		// 設置是否正在設置/取消房管
		const adminLoading = computed(() => {
			return store?.state?.socket?.adminLoading === true;
		});

		// 用戶 uid
		const uid = computed(() => {
			return props?.item?.uid || '';
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

		// 點擊返回
		const clickBack = () => {
			emit('update:show', false);
			emit('click-back');
		};

		// 點擊確認
		const clickConfirm = () => {
			store.dispatch('socket/SET_ADMIN', uid.value).then(() => {
				emit('update:show', false);
			});
		};

		// 點擊取消
		const clickCancel = () => {
			emit('update:show', false);
			emit('click-back');
		};
		return {
			adminLoading,
			isAdmin,
			clickClose,
			clickBack,
			clickConfirm,
			clickCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #a62337;
}
.text-content {
	color: #575759;
}
.bg-confirm {
	background: linear-gradient(90deg, #a62337, #df2f4a);
}
.border-cancel {
	border: 1px solid #a62337;
}
.text-cancel {
	color: #a62337;
}
</style>
