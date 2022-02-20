<template lang="pug">
//- 任務列表標題
.task-list-header.flex.flex-col
	//- 標題文字
	.header.text-base.font-bold {{ text }}

	//- 說明文字
	.desc.text-xs.mt-1(v-if='desc') {{ desc }}
</template>
<script>
export default {
    props: ['text', 'desc']
}
</script>
<style lang="scss">
.task-list-header {
	.header {
		color: #a62337;
	}
	.desc {
		color: rgba($color: #202020, $alpha: 0.5);
	}
}
</style>