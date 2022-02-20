<template lang="pug">
//- 文章頁首
.header(ref='header')
    //- 背景圖
    img.header-bg(:src='pic', @error='errorTopicImg')

    //- 導覽欄
    .header-nav
        //- 漸層
        .gradient

        //- 導覽欄
        nav-bar.bar(hide-underline, left-button='/publicAssets/img/article/icon-left@3x.png', @click-left='clickLeft')

    //- Collapse block
    .headerCollapse(:style='{ "height": `${collapseHeight}px` }')

    //- 頁首內容
    .header-content
        //- 漸層
        .gradient

        //- 類別
        .type.text-sm.font-normal.px-4 精选主题

        //- 列
        .flex.flex-row.justify-between.items-center.px-4
            //- 標題
            .title.text-2xl.font-bold {{ name }}

            //- 下個主題
            van-button.next.rounded-full(v-if='hasNextTopic', @click='clickNext')
                .text-sm.px-2 下个主题

        //- 列
        .flex.flex-row.items-center.px-4.pt-2.pb-8 
            //- 現在時間
            .date.text-sm 更新时间 {{ updateAt }}
            .total.text-sm.ml-2 {{ `此主题有${num}篇文章` }}
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { matomo_articleTopic_check_nextTopic, matomo_articleTopic_back } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import dayjs from 'dayjs';

export default {
	components: {
		navBar,
	},
	props: {
		topicInfo: Object,
		collapseHeight: Number,
	},
	emits: ['refresh'],
	setup(props, { emit }) {
		// Vue router
		const router = useRouter();

		// 圖題圖片
		const pic = computed(() => {
			return props?.topicInfo?.pic || '';
		});

		// 主題名稱
		const name = computed(() => {
			return props?.topicInfo?.name || '';
		});

		// 是否有下一個主題
		const hasNextTopic = computed(() => {
			return props?.topicInfo?.next_id > 0;
		})

		// 更新時間
		const updateAt = computed(() => {
			try {
				return dayjs(props?.topicInfo?.updated_at).format('YYYY/MM/DD');
			} catch (e) {
				return props?.topicInfo?.updated_at || '';
			}
		});

		// 文章數
		const num = computed(() => {
			return props?.topicInfo?.num || 0;
		});

		// 主題圖片讀取失敗
		const errorTopicImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			// Navigate
			router.go(-1);

			// Matomo track
			matomo_articleTopic_back();
		};

		// 點擊下個主題按鈕
		const clickNext = () => {
			// Navigate
			router
				.replace(`/article/topic/${props?.topicInfo?.next_id}`)
				.then(() => {
					emit('refresh');
				})
				.catch(() => {});

			// Matomo track
			matomo_articleTopic_check_nextTopic(props?.topicInfo?.next_id);
		};
		return {
			pic,
			name,
			hasNextTopic,
			updateAt,
			num,
			errorTopicImg,
			clickLeft,
			clickNext,
		};
	},
};
</script>
<style lang="scss" scoped>
.header {
	position: relative;
	width: 100%;
	background: #000000;
}
.header-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 20;
	object-fit: cover;
	object-position: center center;
	-o-object-fit: cover;
	-o-object-position: center center;
}
.header-nav {
	position: relative;
	.gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 40;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
	}
	.bar {
		position: relative;
		z-index: 50;
	}
}
.header-content {
	.gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 0;
		z-index: 40;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
	}
	.type {
		position: relative;
		color: #ffffff;
		z-index: 50;
	}
	.title {
		position: relative;
		color: #ffffff;
		z-index: 50;
	}
	.next {
		position: relative;
		width: unset;
		height: unset;
		padding: 0;
		color: #ffffff;
		border: 1px solid #ffffff;
		background: transparent;
		z-index: 50;
	}
	.date {
		position: relative;
		color: #ffffff;
		z-index: 50;
	}
	.total {
		position: relative;
		color: #ffffff;
		z-index: 50;
	}
}
</style>
