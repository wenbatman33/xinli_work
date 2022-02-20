<template lang='pug'>
  .row.m-1
    tgReturnData
    .col-12
      hr
      ul
        li
          small 1、返水不限平台，最低金额为 1 元。
        li
          small 2、每天 05 点後返水紅利將自動更新显示，请会员当天23:59前申请。
</template>
<script>
import tgReturnData from './tgBonusContent/tgReturnData.vue';

export default {
  components: {
    tgReturnData,
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
</style>
