<template lang="pug">
//- 貼圖列表
.grid.grid-cols-4.items-center.justify-center
    //- 貼圖物件
    sticker-item(v-for='item in list', :item='item')
</template>
<script>
import stickerItem from '@/components/sticker/stickerItem.vue';

export default {
	components: {
		stickerItem,
	},
	props: {
        list: Array,
	},
};
</script>
