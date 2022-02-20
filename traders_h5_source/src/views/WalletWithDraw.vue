<template lang="pug">
.w-full
  .headerBar
    p.text-center 每月交易手续费
    .backBtn(@click='$router.back(-1)')
      span.mx-2
        i.fas.fa-angle-left
      span Back
  .container.mx-auto
    .row.no-gutters.mt-3.p-3
      .col-12.floatCard.my-3
        .DF_BETWEEN.p-3
          div
            p 十月交易手續費
          h3  ¥ 125.00
      .col-12.floatCard.my-3
        .DF_BETWEEN.p-3
          div
            p 九月交易手續費
          h3  ¥ 125.00
      .col-12.floatCard.my-3
        .DF_BETWEEN.p-3
          div
            p 八月交易手續費
          h3  ¥ 125.00
      .col-12.floatCard.my-3
        .DF_BETWEEN.p-3
          div
            p 七月交易手續費
          h3  ¥ 125.00
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import { mapState } from 'vuex';

export default {
  components: {
    RandomText,
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.floatCard{
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}
</style>
