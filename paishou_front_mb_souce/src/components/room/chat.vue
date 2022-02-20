<template lang="pug">
//- 聊天室
.absolute.top-0.right-0.bottom-0.left-0.overflow-y-visible
	.relative.z-10.w-full.h-full.grid.grid.grid-cols-live-chat.grid-rows-live-chat
		//- 訊息列表
		message-list

		//- 訊息輸入框
		message-field

	//- 連續送禮列表
	.absolute.z-20.top-0.right-0.bottom-0.left-0.w-full.h-full.pointer-events-none
		combo-list
</template>
<script>
import comboList from '@/components/room/comboList.vue';
import messageList from '@/components/room/messageList.vue';
import messageField from '@/components/room/messageField.vue';

export default {
	components: {
		comboList,
		messageList,
		messageField,
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-live-chat {
	grid-template-columns: 1fr;
}
.grid-rows-live-chat {
	grid-template-rows: minmax(64px, 1fr) auto;
}
</style>
