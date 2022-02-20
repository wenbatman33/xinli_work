<template lang="pug">
//- 領取按鈕
van-button.receive-button.rounded-full(@click='clickButton')
    .text-xs.p-1 领取
    template(#loading) 
        .flex.flex-row.items-center.p-1
            van-loading.w-3.h-3(type='spinner', color='#ffffff')
            .text-xs.ml-1 领取
</template>
<script>
export default {
    emits:['click'],
    setup(props, { emit }) {
        const clickButton = () => {
            emit('click')
        };
        return {
            clickButton,
        };
    },
}
</script>
<style lang="scss">
.receive-button {
    width: unset;
    height: unset;
    min-width: 4rem;
    padding: 0;
    color: #FFFFFF;
    border: transparent;
    background: #A62337;
}
</style>