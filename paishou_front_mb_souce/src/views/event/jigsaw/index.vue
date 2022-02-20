<template lang="pug">
.jigsaw-root
    //- 尋找拼圖
    van-pull-refresh(:model-value='state.loading', @refresh='refresh')
        //- 頁面內容
        .flex.flex-col.items-stretch.pt-6.bg-jigsaw
            //- 導覽欄
            .flex.flex-row.justify-between.items-center.px-6
                //- 注意事項
                van-button.w-auto.h-auto.px-2.py-1.rounded-full.bg-notice.border-transparent(@click='clickNotice')
                    .flex.flex-row.items-center
                        img.w-4.h-4(src='/publicAssets/img/event/jigsaw/icon-notice@3x.png')
                        .text-sm.text-white.ml-1 注意事项

                //- 關閉
                van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
                    img.w-full.h-full(src='/publicAssets/img/event/jigsaw/icon-close@3x.png')

            //- 標題
            img.mt-12.mx-3(src='/publicAssets/img/event/jigsaw/icon-title@3x.png')

            //- 活動說明標題
            .text-header.text-base.text-center.font-bold.mt-10.px-6 活动说明

            //- 活動說明內容
            .text-sm.text-center.mt-4.px-6
                span.text-content 拍手散落的拼图掉了，赶紧帮忙拍手一起找寻拼图吧!
                br
                span.text-content 只要完成
                span.text-hightlight1.font-bold 观看直播间赛事10分钟
                br
                span.text-content 就可以获得
                span.text-hightlight1.font-bold 拼图一个 ! 
                br
                br
                span.text-hightlight2.font-bold 一日只會有一塊拼圖。
                br
                span.text-content 用户完成9片后即完成此任务。

            //- 拼圖進度標題
            .text-header.text-base.text-center.font-bold.mt-12.px-6 您的拼图进度

            //- 拼圖列表
            .relative.self-center.mt-4
                //- 拼圖外框
                img.relative.z-10.top-0.lef-0.w-jigsaw-border.h-jigsaw-border(src='/publicAssets/img/event/jigsaw/icon-jigsaw-border@3x.png')

                //- 拼圖底圖
                img.absolute.z-20.top-jigsaw-list.left-jigsaw-list.w-jigsaw-list.h-jigsaw-list(src='/publicAssets/img/event/jigsaw/icon-jigsaw-bg@3x.png')

                //- 拼圖列表
                .absolute.z-30.top-jigsaw-list.left-jigsaw-list.w-jigsaw-list.h-jigsaw-list.grid-jigsaw-list(v-if='isLogin')
                    .reactive
                        img.absolute.object-contain(v-for='item in state.jigsawList', :src='item.img', :class='{ "invisible": !item.get }')

                //- 登入提示
                .absolute.z-30.top-jigsaw-login.left-jigsaw-login.w-jigsaw-login.h-jigsaw-login.grid-jigsaw-login.flex.flex-col.justify-center.items-center.rounded.bg-white(v-else)
                    //- 登入提示標題
                    .text-header.text-base.text-center.font-bold.px-4 请先登录帐号

                    //- 登入提示內容
                    .text-content.text-sm.text-center.px-4.mt-4 未登录无法参与本活动

                    //- 登入提示按鈕
                    van-button.w-login.h-auto.p-2.rounded-full.bg-login.border-transparent.mt-8(@click='clickLogin')
                        .flex.flex-row.items-center
                            img.w-6.h-6(src='/publicAssets/img/event/jigsaw/icon-login@3x.png')
                            .text-base.text-white.font-bold.ml-2 登錄/註冊

            //- 拼圖獎勵標題
            .text-header.text-base.text-center.font-bold.mt-10.px-6 拼图进度奖励

            //- 拼圖獎勵內容
            .text-sm.text-center.mt-3.px-6
                span.text-content 完成拼图即可获得
                br
                span.text-hightlight1.font-bold 拍手大礼包*1
                br
                span.text-content 只要搜集符合进度，系统会自动将奖励放入您的背包

            //- 拼圖獎勵進度
            .grid.grid-cols-1.gap-3.mt-6.px-6
                //- 進度物件
                .grid.grid-cols-progress.gap-3.items-center.p-4.bg-white.rounded.shadow-progress(v-for='item in state.progressList', :class='{ "opacity-20": item.get }')
                    //- 進度圖示
                    img(:src='item.img || ""', @error='errorProgressImg')

                    //- 進度資訊
                    .flex.flex-col.items-stretch
                        .text-progress-title.text-lg.font-bold {{ item.title || '' }}
                        .text-progress-content.text-sm.font-bold.mt-1(v-if='item.bonus') {{ item.bonus || '' }}

                    //- 進度狀態
                    van-button.w-auto.h-auto.p-2.rounded-full.bg-progress-status.border-progress-status.text-progress-status(:class='{ "get": item.get }')
                        .text-sm.font-bold
                            span(v-if='item.get') 已放入背包
                            span(v-else) 待完成

            //- 向上箭頭
            van-button.self-center.w-7.h-7.p-0.rounded-full.mt-12.bg-transparent.border-transparent(@click='clickTop')
                img.w-full.h-full(src='/publicAssets/img/event/jigsaw/icon-top@3x.png')

            //- 版權聲明
            .text-white.text-sm.text-center.p-4.bg-copyright.mt-10 Copyright © paishou 2021
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { event011Info } from '@/api';
import { Dialog } from 'vant';

export default {
	setup() {
		// Vue router
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			loading: false,
			jigsawList: [],
			progressList: [],
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store?.getters['user/IS_LOGIN'] === true;
		});

		// Get jigsaw info
		const getJigsawInfo = () => {
			// Update loading state
			state.loading = true;

			// Get query
			const query = {
				uid: store?.state?.user?.uid || 0,
				token: store?.state?.user?.token || '',
			};

			// Get jigsaw info
			event011Info(query)
				.then((res) => {
					// Revert loading state on finished
					state.loading = false;

					// Update jigsaw list
					state.jigsawList = res?.data?.jigsaws || [];

					// Update progress list
					state.progressList = res?.data?.progress || [];

					// Hardcode progress bonus
					state.progressList.forEach((element, index) => {
						if (index === 0) {
							element.bonus = '香蕉*50';
						} else if (index === 1) {
							element.bonus = '666*2';
						} else if (index === 2) {
							element.bonus = 'LOVE*3';
						} else if (index === 3) {
							element.bonus = '关键一球*5';
						} else if (index === 4) {
							element.bonus = '拍手大礼包';
						}
					});
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});
		};

		// Refresh page
		const refresh = () => {
			getJigsawInfo();
		};

		// 進度圖示讀取失敗
		const errorProgressImg = (e) => {
			e.target.src = '/publicAssets/img/event/jigsaw/icon-progress-placeholder@3x.png';
		};

		// 點擊注意事項
		const clickNotice = () => {
			Dialog.confirm({
				title: '注意事项',
				message: '拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格并扣除本活动所获得奖励。',
				showConfirmButton: false,
				showCancelButton: false,
				closeOnClickOverlay: true,
				teleport: '.jigsaw-root',
			});
		};

		// 點擊關閉
		const clickClose = () => {
			router.replace('/');
		};

		// 點擊登入按鈕
		const clickLogin = () => {
			window.localStorage.setItem('tempUrl', '/event/jigsaw');
			router.push('/login');
		};

		// 點擊向上箭頭
		const clickTop = () => {
			window.scrollTo(0, 0);
		};

		// On component mounted
		onMounted(() => {
			refresh();
		});
		return {
			state,
			isLogin,
			refresh,
			errorProgressImg,
			clickNotice,
			clickClose,
			clickLogin,
			clickTop,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-dialog__header) {
	color: #a62337;
	font-weight: bold;
}
.bg-jigsaw {
	background-image: url('/publicAssets/img/event/jigsaw/icon-bg@3x.png');
	background-position-x: center;
	background-position-y: top;
	background-repeat: no-repeat;
	background-size: cover;
}
.bg-notice {
	background: #191919;
}
.text-header {
	color: #a62337;
}
.text-content {
	color: #969696;
}
.text-hightlight1 {
	color: #f2b026;
}
.text-hightlight2 {
	color: #f87105;
}
.w-jigsaw-border {
	width: 311px;
}
.h-jigsaw-border {
	height: 311px;
}
.w-jigsaw-list {
	width: 291px;
}
.h-jigsaw-list {
	height: 291px;
}
.top-jigsaw-list {
	top: 10px;
}
.left-jigsaw-list {
	left: 10px;
}
.grid-jigsaw-list {
	:nth-child(1) {
		top: 0px;
		left: 0px;
		width: 123px;
		height: 100px;
	}
	:nth-child(2) {
		top: 0px;
		left: 98px;
		width: 124px;
		height: 124px;
	}
	:nth-child(3) {
		top: 0px;
		left: 194px;
		width: 100px;
		height: 123px;
	}
	:nth-child(4) {
		top: 74px;
		left: 0px;
		width: 123px;
		height: 123px;
	}
	:nth-child(5) {
		top: 98px;
		left: 98px;
		width: 99px;
		height: 99px;
	}
	:nth-child(6) {
		top: 98px;
		left: 170px;
		width: 123px;
		height: 123px;
	}
	:nth-child(7) {
		top: 171px;
		left: 0px;
		width: 97px;
		height: 120px;
	}
	:nth-child(8) {
		top: 170px;
		left: 73px;
		width: 123px;
		height: 123px;
	}
	:nth-child(9) {
		top: 194px;
		left: 171px;
		width: 120px;
		height: 97px;
	}
}
.w-jigsaw-login {
	width: 255px;
}
.h-jigsaw-login {
	height: 212px;
}
.top-jigsaw-login {
	top: 49.5px;
}
.left-jigsaw-login {
	left: 28px;
}
.w-login {
    width: 150px;
}
.bg-login {
    background: #a62337;
}
.grid-cols-progress {
	grid-template-columns: 40px 1fr 110px;
}
.shadow-progress {
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
}
.text-progress-title {
	color: #a62337;
}
.text-progress-content {
	color: #191919;
}
.bg-progress-status {
	border: 1px solid #afafaf;
	&.get {
		border: transparent;
	}
}
.border-progress-status {
	background: transparent;
	&.get {
		background: #afafaf;
	}
}
.text-progress-status {
	color: #afafaf;
	&.get {
		color: #ffffff;
	}
}
.bg-copyright {
	background: #202020;
}
</style>
