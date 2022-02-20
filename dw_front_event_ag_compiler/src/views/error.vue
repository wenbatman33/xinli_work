<template lang="pug">
.container-fluid.h-100
  .container.h-100
    .d-flex.d-flex.justify-content-center.h-100
      .d-flex.justify-content-center.align-items-center.text-white.w-100
        el-card.w-100.box-card(shadow="always")
          .text-center 天！本活动已结束，真是太可惜了
          el-divider
          el-button.w-100(type="primary", @click='back') 确认
</template>

<script>
export default {
  methods: {
    back(){
      window.location.href= process.env.VUE_APP_MAINDOMAIN;
    }
  }
  
};
</script>

<style lang="scss" scoped>
</style>


