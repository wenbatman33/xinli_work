<template lang="pug">
//- 主播列表
.grid.grid-cols-1.gap-3(:class='$attrs.class')
    anchor-item(v-for='item in list', :item='item', :path='path')
</template>
<script>
import anchorItem from '@/components/schedule/anchorItem.vue';

export default {
    components: {
        anchorItem,
    },
    props: {
        list: Array,
		path: String,
    },
};
</script>