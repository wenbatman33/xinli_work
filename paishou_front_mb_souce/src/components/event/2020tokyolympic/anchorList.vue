<template lang="pug">
//- 主播列表
.grid.grid-cols-1.gap-3(:class='$attrs.class')
    anchor-item(v-for='item in list', :item='item')
</template>
<script>
import anchorItem from '@/components/event/2020tokyolympic/anchorItem.vue';

export default {
    components: {
        anchorItem,
    },
    props: {
        list: Array,
    },
};
</script>