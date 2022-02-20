<template lang="pug">
.kanBan.w-full(v-if='dataList.length')
	.kanBanContent(v-if='state.showKanBan')
		.kanBanItem(v-for='(item, index) in dataList')
			.CENTER_BETWEEN.p-2
				.text-xs 
					span {{item.title}}
				.functionBtn.text-xs
					a-button.text-xs(:id='"copyBtn"+index', type='primary', size='small', v-if='item.action===2', @click='copyKanbanText(item.content)') 点击复制
					a-button.text-xs(:id='"url_Btn"+index', type='primary', size='small', v-if='item.action===3', @click='gotoUrl(item.content)') 点击前往
	.h-6.text-center.cursor-pointer(@click='state.showKanBan = !state.showKanBan')
		img.transform(:class='{"rotate-180": !state.showKanBan}', src='/publicAssets/img/v3/icon-bottomarrow-r.png', srcset='/publicAssets/img/v3/icon-bottomarrow-r@2x.png 2x')
</template>

<script>
import { copyText } from 'vue3-clipboard';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

export default {
	components: {
		DownOutlined,
	},
	props: ['dataList'],
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			showKanBan: true,
		});
		const copyKanbanText = (text) => {
			copyText(text, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		const gotoUrl = (url) => {
			window.open(url);
		};
		onMounted(() => {
			if (props.dataList) {
				state.showKanBan = true;
			}
		});
		return {
			store,
			state,
			gotoUrl,
			copyKanbanText,
		};
	},
};
</script>
<style lang="scss" scoped>
.kanBan {
	width: 100%;
	height: auto;
	position: relative;
}

.kanBanContent {
	position: relative;
	width: 100%;
	height: auto;
	transition: height 0.5s;
}
.kanBanContentActive {
	height: auto;
	max-height: 200px;
	transition: max-height 0.5s;
}
.kanBanTip {
	position: relative;
	display: inline-block;
	width: 48px;
	height: 16px;
	font-size: 12px;
	border-radius: 0 0 5px 5px;
	background-color: #f4f5f8;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
	z-index: 2000;
}
.kanBanItem {
	border-bottom: 1px solid #f4f5f8;
}
</style>
