<template lang="pug">
.video-list.grid.grid-cols-2.px-2(class='md:grid-cols-4')
    .px-2.py-2(v-for='item in list')
        video-item(:video-data='item', :path='path', :class-name='className')
</template>
<script>
import videoItem from '@/components/videoItem';

export default {
    components: {
        videoItem,
    },
    props: {
        list: Array,
        path: String,
        className: String,
    },
}
</script>
<style lang="scss" scoped>
.video-list {
	width: 100%;
}
</style>