<template lang="pug">
//- 登入拍手抽手機
.w-full.min-h-full.flex.flex-col.px-4.bg-event
    //- 路由子頁面
    router-view.flex-grow
</template>
<script>
import home from '@/views/event/send_phone/home.vue';

export default {
    components: {
        home,
    },
};
</script>
<style lang="scss" scoped>
.bg-event {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('/publicAssets/img/event/send_phone/img-mobile-bg@3x.png');
}
</style>