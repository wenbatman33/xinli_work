<template lang="pug">
//- 綁定手機
.mobile
    //- 導覽欄
    nav-bar(title='绑定手机', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

    //- 子頁面
    router-view
</template>
<script>
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import navBar from '@/components/navBar';

export default {
	components: {
		navBar,
	},
    setup() {
		// Vue router
		const router = useRouter();

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			Dialog.alert({
				title: '您要放弃此次行为？',
				message: '您确定要取消此次行为离开此页？此次修改将不会覆盖原来的资料。',
				'show-confirm-button': true,
				'show-cancel-button': true,
			}).then(() => {
				router.go(-1);
			});
		};
        return {
            clickLeft,
        }
    }
}
</script>
<style lang="scss" scoped>
.mobile {
    width: 100%;
}
</style>