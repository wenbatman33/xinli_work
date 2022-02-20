<template lang="pug">
//- 相同賽事直播物件
van-button.w-28.h-auto.p-2.mr-3.rounded-item.shadow-item.text-item.bg-item.border-transparent(:class='$attrs.class', @click='clickItem')
    //- 物件內容
    .grid.grid-cols-item.gap-2.items-center
        //- 頭像
        img.w-6.h-6.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

        //- 名稱
        .text-xs.text-left.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ name }}
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// User id
		const uid = computed(() => {
			return props?.item?.uid || 0;
		});

		// 頭像
		const avatar = computed(() => {
			return props?.item?.avatar_thumb || '';
		});

		// 名稱
		const name = computed(() => {
			return props?.item?.user_nicename || '';
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊物件
		const clickItem = () => {
			if (route.params.id != uid.value) {
				router
					.replace(`/room/${uid.value}`)
					.then(() => {
						// Disconnect socket
						store.dispatch('socket/DISCONNECT_SOCKET');

						// Reset room info
						store.commit('socket/RESET');

						// Update room uid
						store.dispatch('socket/UPDATE_UID', Number(uid.value));
					})
					.catch(() => {});
			}
		};
		return {
			avatar,
			name,
			errorAvatarImg,
			clickItem,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
}
::v-deep(.van-button__text) {
	width: 100%;
}
.grid-cols-item {
	grid-template-columns: auto 1fr;
}
.rounded-item {
	border-radius: 4px;
}
.shadow-item {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}
.text-item {
	color: #191919;
	&.anchor {
		color: #FFFFFF;
	}
}
.bg-item {
	background: #FFFFFF;
	&.anchor {
		background: #A62337;
	}
}
</style>
