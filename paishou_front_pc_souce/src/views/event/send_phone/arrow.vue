<template lang="pug">
.FLEX_R.items-center
    //- 左箭頭
    a-button.w-20.h-20.p-0.rounded-full.border-transparent(v-if='left', ghost, @click='clickArrow')
        img.w-full.h-full(src='/publicAssets/img/event/send_phone/icon-left@3x.png')

    //- 左按鈕
    a-button.w-auto.h-auto.p-1.rounded-md.border-btn(ghost, @click='clickArrow')
        .text-base.text-white.text-center {{ text }}

    //- 右箭頭
    a-button.w-20.h-20.p-0.rounded-full.border-transparent(v-if='right', ghost, @click='clickArrow')
        img.w-full.h-full(src='/publicAssets/img/event/send_phone/icon-right@3x.png')
</template>
<script>
export default {
	props: {
		left: Boolean,
		right: Boolean,
		text: String,
	},
	emits: ['click-arrow'],
	setup(props, { emit }) {
		const clickArrow = () => {
			emit('click-arrow');
		};
		return {
			clickArrow,
		};
	},
};
</script>
<style scoped>
.border-btn {
	border: solid 2px #ffffff;
}
</style>
