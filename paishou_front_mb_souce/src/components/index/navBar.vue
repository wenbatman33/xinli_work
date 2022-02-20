<template lang="pug">
//- 首頁導覽欄
.w-full.flex.flex-col.items-stretch
    //- 導覽欄內容
    .flex.flex-row.justify-between.items-center.px-4.pt-4.pb-2
        //- Logo
        img.h-10.cursor-pointer(:src='logo', @click='clickLogo', @error='errorLogoImg')

        //- 右側按鈕
        .flex.flex-row.justify-start.items-center
            //- 排行榜
            van-button.transparent-button.rounded-full(v-if='contribution', @click='clickContribution')
                .w-8.h-8.flex.justify-center.items-center
                    img.w-6.h-6(src='/publicAssets/img/navbar/icon-trophy@3x.png')

            //- 搜尋
            van-button.transparent-button.rounded-full.ml-2(v-if='search', @click='clickSearch')
                .w-8.h-8.flex.justify-center.items-center
                    img.w-6.h-6(src='/publicAssets/img/navbar/icon-search@3x.png')

            //- 下載拍手
            van-button.w-auto.h-auto.p-2.ml-3.rounded-full.bg-psV3Red.border-none.ml-2(v-if='download', @click='clickDownload')
                .text-xs.text-white.font-download 下载拍手

            //- 頭像
            van-button.transparent-button.ml-3.shadow.rounded-full(v-if='isLogin', @click='clickAvatar')
                img.w-7.h-7.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

            //- 登入註冊
            van-button.w-auto.h-auto.p-2.ml-3.rounded.bg-psV3Red.border-none(v-else, @click='clickLogin')
                .text-xs.text-white 登录/注册

    //- 分隔線
    divider
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		contribution: Boolean,
		search: Boolean,
		download: Boolean,
	},
	emits: ['click-logo', 'click-contribution', 'click-search', 'click-download', 'click-avatar', 'click-login'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Logo
		const logo = computed(() => {
			return store?.state?.config?.config?.logo_h5 || '';
		})

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store.getters['user/IS_LOGIN'];
		});

		// 頭像圖片
		const avatar = computed(() => {
			return store?.state?.user?.userInfo?.avatar || '';
		});

		// Logo圖片讀取失敗
		const errorLogoImg = (e) => {
			e.target.src = '/publicAssets/img/navbar/img-logo@3x.png';
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊 Logo
		const clickLogo = () => {
			emit('click-logo');
		};

		// 點擊排行榜
		const clickContribution = () => {
			emit('click-contribution');
		};

		// 點擊搜尋
		const clickSearch = () => {
			emit('click-search');
		};

		// 點擊下載
		const clickDownload = () => {
			emit('click-download');
		};

		// 點擊頭像
		const clickAvatar = () => {
			emit('click-avatar');
		};

		// 點擊登入
		const clickLogin = () => {
			emit('click-login');
		};
		return {
			logo,
			isLogin,
			avatar,
			errorLogoImg,
			errorAvatarImg,
			clickLogo,
			clickContribution,
			clickSearch,
			clickDownload,
			clickAvatar,
			clickLogin,
		};
	},
};
</script>
<style lang="scss" scoped>
.transparent-button {
	width: unset;
	height: unset;
	padding: 0;
	border: transparent;
	background: transparent;
}
.font-download {
	font-weight: 600;
}
</style>
