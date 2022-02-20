<template lang="pug">
//- 公告列表
.w-full.grid.grid-cols-notice.items-center.gap-1.pl-3.pr-4.py-2
	//- 圖示
	img.w-7.h-7.p-1.flex-shrink-0.object-contain(src='/publicAssets/img/room/icon-announcement@3x.png')

	//- 公告內容
	//- 2021/07/29 11:59 公告只會有一則
	.text-xs.text-notice.font-normal.overflow-hidden.overflow-ellipsis(
		:class='{ "whitespace-nowrap h-1rem": !state.expanded }'
		v-html='content'
	)

	//- 展開箭頭
	van-button.w-6.h-6.p-1.flex-shrink-0.rounded-full.bg-transparent.border-transparent(@click='clickExpand')
		img.w-full.h-full.object-contain.transition-transform(
			:class='{ "transform rotate-180": state.expanded }'
			src='/publicAssets/img/room/icon-arrow-down@3x.png'
		)
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			expanded: true,
		});

		// 公告內容
		const content = computed(() => {
			const list = store?.state?.socket?.noticeList || [];
			const item = list[0] || {};
			const defaultContent = `
			  <span>主播专属链接 :</span>
			  <a href="https://mcwc.mc.maaiiconnect.com/app.html#/debbiequeen-1.maaiiconnect.com/staff/wN_pvJSx.bFcYNsQ2Tq0i.6f39.05000000.bWu2i4zf8q3JBSjA/im">请点我</a>
			  <br/>
			  <span>主播特别推荐 : </span>
			  <a href="https://mcwc.mc.maaiiconnect.com/app.html#/debbiequeen-1.maaiiconnect.com/staff/wN_pvJSx.bFcYNsQ2Tq0i.6f39.05000000.bWu2i4zf8q3JBSjA/im">请点我</a>
			  <br/>
			  <span>注册找右下角领取优惠 备注"拍手直播"</span>
			`;
            var notice = item.notice || '';
            if (notice.length === 0) {
                notice = defaultContent;
            }
			const e = document.createElement('textarea');
			e.innerHTML = notice;
			if (e.childNodes.length >= 1) {
				return e.childNodes[0].nodeValue;
			} else {
				return defaultContent;
			}
		});
		// 點擊展開按鈕
		const clickExpand = () => {
			state.expanded = !state.expanded;
		};
		return {
			state,
			content,
			clickExpand,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-notice {
	grid-template-columns: auto 1fr auto;
}
.text-notice {
	color: #a62337;
}
.h-1rem {
	height: 1rem;
}
</style>