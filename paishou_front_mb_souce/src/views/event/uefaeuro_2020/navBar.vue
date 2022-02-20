<template lang="pug">
//- 導覽欄
.grid.grid-cols-nav.items-center.pt-6.pb-4.px-4(:class='$attrs.class')
    //- 菜單按鈕
    van-button.w-10.h-10.p-1.rounded-full.bg-transparent.border-transparent(@click='clickMenu')
        img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-menu@3x.png')

    //- 標題
    .text-base.text-center.text-white.font-bold {{ title }}

    //- 關閉按鈕
    van-button.w-10.h-10.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
        img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-close@3x.png')

//- 菜單彈窗
drawer-popup(v-model:show='state.showMenu')
</template>
<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import drawerPopup from '@/views/event/uefaeuro_2020/drawerPopup.vue';

export default {
	components: {
		drawerPopup,
	},
	props: {
		title: String,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			showMenu: false,
		});

		// 點擊菜單
		const clickMenu = () => {
			state.showMenu = true;
		};

		// 點擊關閉
		const clickClose = () => {
			router.go(-1);
		};
		return {
			state,
			clickMenu,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-nav {
	grid-template-columns: auto 1fr auto;
}
</style>
