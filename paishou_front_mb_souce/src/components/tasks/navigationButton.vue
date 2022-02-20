<template lang="pug">
//- 未完成按鈕
van-button.navigation-button.rounded-full(@click='clickButton')
    .text-xs.p-1 {{ text }}
</template>
<script>
export default {
    props: {
        text: String,
    },
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
.navigation-button {
    width: unset;
    height: unset;
    min-width: 4rem;
    padding: 0;
    color: #F2994A;
    border: 1px solid #F2994A;
    background: #FFFFFF;
}
</style>