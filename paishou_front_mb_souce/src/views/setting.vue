<template lang="pug">
//- 設定
.setting.flex.flex-col.pb-8
    //- 導航欄
    nav-bar(title='设置', icon='/publicAssets/img/setting/icon-setting@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

    //- 用戶條款
    personal-button.mt-4(icon='icon-feather@3x.png', title='用户条款', @click='clickAgreement')

    //- 清除緩存
    personal-button.mt-2(icon='icon-brush@3x.png', title='清除缓存', @click='clickClear')

    //- 關於我們
    personal-button.mt-2(icon='icon-banana@3x.png', title='关于我们', @click='clickAbout')

    //- 留白
    .flex-grow

    //- 登出
    divider.mt-6
    van-button.logout(@click='clickLogout')
        .p-4.text-base.font-bold 登出
    divider
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Notify } from 'vant';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import personalButton from '@/components/personalButton';

export default {
	components: {
		navBar,
		divider,
		personalButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 點擊導航欄關閉按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 點擊用戶條款按鈕
		const clickAgreement = () => {
			router.push('/about/4');
		};

		// 點擊清除緩存按鈕
		const clickClear = () => {
			caches.keys().then((cacheNames) => {
				cacheNames.forEach((cacheName) => {
					caches.delete(cacheName);
				});
			});
			Notify({ type: 'success', message: '清除缓存成功' });
		};

		// 點擊關於我們按鈕
		const clickAbout = () => {
			router.push('/about/29');
		};

		// 點擊登出按鈕
		const clickLogout = () => {
			store.dispatch('user/RESET_TOKEN');
		};
		return {
			clickRight,
			clickAgreement,
			clickClear,
			clickAbout,
			clickLogout,
		};
	},
};
</script>
<style lang="scss" scoped>
.setting {
	width: 100%;
	min-height: 100%;
	.content {
		width: 100%;
	}
	.logout {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background-color: #ffffff;
		color: #a62337;
	}
}
</style>
