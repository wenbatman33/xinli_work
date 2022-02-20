<template lang="pug">
//- 線路彈窗
van-popup.source-popup(:show='show', round, position='bottom', teleport='.popupTeleport', @update:show='updateShow')
	//- 導覽欄
	player-popup-nav(:title='title', :left-button='leftButton', :right-button='rightButton', @click-left='clickLeft', @click-right='clickRight')

	//- 主選單
	.flex.flex-col.items-stretch.pb-6(v-if='state.step === "main"')
		van-button.transparent-button(@click='clickSource')
			.flex.flex-row.justify-between.items-center.px-4.py-4
				.text-base.font-bold 线路
				img.w-6.h-6(src='/publicAssets/img/room/right@3x.png')
		divider
		van-button.transparent-button(@click='clickResolution')
			.flex.flex-row.justify-between.items-center.px-4.py-4
				.text-base.font-bold 画质
				img.w-6.h-6(src='/publicAssets/img/room/right@3x.png')
		divider

	//- 線路
	.grid.grid-cols-2.gap-4.px-4.py-6(v-else-if='state.step === "source"')
		van-button.border-button(:class='{ selected: selectedSource === 0 }', :disabled='isSource1Disabled', @click='clickSource1') 
			.py-4.text-base.font-bold 线路1
		van-button.border-button(:class='{ selected: selectedSource === 1 }', :disabled='isSource2Disabled', @click='clickSource2') 
			.py-4.text-base.font-bold 线路2

	//- 畫質
	.grid.grid-cols-3.gap-4.px-4.py-6(v-else-if='state.step === "resolution"')
		van-button.border-button(:class='{ selected: selectedResolution === "p480" }', :disabled='isResolutionP480Disabled', @click='clickResolutionP480') 
			.py-4.text-base.font-bold 流畅
		van-button.border-button(:class='{ selected: selectedResolution === "pull" }', :disabled='isResolutionPullDisabled', @click='clickResolutionPull') 
			.py-4.text-base.font-bold 标准
		van-button.border-button(:class='{ selected: selectedResolution === "p720" }', :disabled='isResolutionP720Disabled', @click='clickResolutionP720') 
			.py-4.text-base.font-bold 清晰
</template>
<script>
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { matomo_room_change_source1, matomo_room_change_source2 } from '@/matomoTrackEvent.js';
import divider from '@/components/divider';
import playerPopupNav from '@/components/psPlayer/playerPopupNav.vue';

export default {
	components: {
		divider,
		playerPopupNav,
	},
	props: {
		show: Boolean,
		source: String,
	},
	emits: ['update:show', 'update:source'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			step: 'main',
		});


		// 標題
		const title = computed(() => {
			if (state.step === 'main') {
				return '选单';
			} else if (state.step === 'source') {
				return '线路設定';
			} else if (state.step === 'resolution') {
				return '画质';
			} else {
				return '';
			}
		});

		// 左側按鈕
		const leftButton = computed(() => {
			if (state.step === 'source') {
				return '/publicAssets/img/room/icon-arrow-left-gray@3x.png';
			} else if (state.step === 'resolution') {
				return '/publicAssets/img/room/icon-arrow-left-gray@3x.png';
			} else {
				return '';
			}
		});

		// 右側按鈕
		const rightButton = computed(() => {
			return '/publicAssets/img/icon-close-gray@3x.png';
		});

		// 線路列表
		const sourceList = computed(() => {
			return store?.getters['socket/SOURCE_LIST'] || [];
		});

		// 選擇的線路
		const selectedSource = computed(() => {
			for (var i = 0; i < sourceList.value.length; i++) {
				const source = sourceList.value[i] || {};
				const p480 = source.p480 || '';
				const pull = source.pull || '';
				const p720 = source.p720 || '';
				if (props.source === p480 || props.source === pull || props.source === p720) {
					return i;
				}
			}
			return -1;
		});

		// 選擇的畫質
		const selectedResolution = computed(() => {
			for (var i = 0; i < sourceList.value.length; i++) {
				const source = sourceList.value[i] || {};
				const p480 = source.p480 || '';
				const pull = source.pull || '';
				const p720 = source.p720 || '';
				if (props.source === p480) {
					return 'p480';
				}
				if (props.source === pull) {
					return 'pull';
				}
				if (props.source === p720) {
					return 'p720';
				}
			}
			return 'unknown';
		});

		// 是否禁用指定的線路
		const istTargetSourceDisabled = (target) => {
			const source = sourceList.value[target] || {};
			const p480 = source.p480 || '';
			const pull = source.pull || '';
			const p720 = source.p720 || '';
			return p480.length === 0 && pull.length === 0 && p720.length === 0;
		};

		// 是否禁用線路1
		const isSource1Disabled = computed(() => {
			return istTargetSourceDisabled(0);
		});

		// 是否禁用線路2
		const isSource2Disabled = computed(() => {
			return istTargetSourceDisabled(1);
		});

		// 是否禁用指定的畫質
		const isTargetResolutionDisabled = (target) => {
			const source = sourceList.value[selectedSource.value] || {};
			const url = source[`${target}`] || '';
			return url.length === 0;
		};

		// 是否禁用流暢畫質
		const isResolutionP480Disabled = computed(() => {
			return isTargetResolutionDisabled('p480');
		});

		// 是否禁用標準畫質
		const isResolutionPullDisabled = computed(() => {
			return isTargetResolutionDisabled('pull');
		});

		// 是否禁用清晰畫質
		const isResolutionP720Disabled = computed(() => {
			return isTargetResolutionDisabled('p720');
		});

		// 更新顯示狀態
		const updateShow = (value) => {
			emit('update:show', value);
		};

		// 點擊導覽欄返回
		const clickLeft = () => {
			state.step = 'main';
		};

		// 點擊導覽欄關閉
		const clickRight = () => {
			emit('update:show', false);
		};

		// 點擊線路
		const clickSource = () => {
			state.step = 'source';
		};

		// 點擊畫質
		const clickResolution = () => {
			state.step = 'resolution';
		};

		// 點擊指定的線路
		const clickTargetSource = (target) => {
			// Switch to blank first
			emit('update:source', '_blank');

			// Update source delay 500ms
			const source = sourceList.value[target] || {};
			const p480 = source.p480 || '';
			const pull = source.pull || '';
			const p720 = source.p720 || '';
			setTimeout(() => {
				if (p480.length > 0) {
					emit('update:source', p480);
				} else if (pull.length > 0) {
					emit('update:source', pull);
				} else if (p720.length > 0) {
					emit('update:source', p720);
				}
			}, 500);

			// Update step
			state.step = 'resolution';
		};

		// 點擊線路1
		const clickSource1 = () => {
			clickTargetSource(0);
			matomo_room_change_source1();
		};

		// 點擊線路2
		const clickSource2 = () => {
			clickTargetSource(1);
			matomo_room_change_source2();
		};

		// 點擊指定的畫質
		const clickTargetResolution = (target) => {
			// Switch to blank first
			emit('update:source', '_blank');

			// Update source delay 500ms
			const source = sourceList.value[selectedSource.value] || {};
			const url = source[`${target}`];
			setTimeout(() => {
				emit('update:source', url);
			}, 500);

			// Hide popup
			emit('update:show', false);
		};

		// 點擊流暢
		const clickResolutionP480 = () => {
			clickTargetResolution('p480');
		};

		// 點擊標準
		const clickResolutionPull = () => {
			clickTargetResolution('pull');
		};

		// 點擊清晰
		const clickResolutionP720 = () => {
			clickTargetResolution('p720');
		};

		// Watch show state changed
		watch(
			() => props.show,
			() => {
				if (props.show) {
					state.step = 'main';
				}
			}
		);
		return {
			state,
			title,
			leftButton,
			rightButton,
			selectedSource,
			selectedResolution,
			isSource1Disabled,
			isSource2Disabled,
			isResolutionP480Disabled,
			isResolutionPullDisabled,
			isResolutionP720Disabled,
			updateShow,
			clickLeft,
			clickRight,
			clickSource,
			clickResolution,
			clickSource1,
			clickSource2,
			clickResolutionP480,
			clickResolutionPull,
			clickResolutionP720,
		};
	},
};
</script>
<style lang="scss" scoped>
.source-popup {
	.transparent-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #303133;
		border: transparent;
		background: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.border-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #303133;
		border: 1px solid #e8e8e8;
		background: transparent;
		&.selected {
			color: #a62337;
			border: 1px solid #a62337;
		}
	}
}
</style>
