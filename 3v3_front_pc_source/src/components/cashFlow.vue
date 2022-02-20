<template lang="pug">
  .page(style="flex: 1")
    .headBg
    .p-3.h-100.d-flex.flex-column
      h2.text-white.mt-3
        .icon(:style="`background-image: url(${moneyCollectIcon})`")
        span.ml-2 存提款
      .d-flex.flex-column.pb-4.overflow-auto
        .d-flex
          .tab.col-6.text-center.py-3(
            :class="{ active : type === 'deposit'}"
            @click="type = 'deposit'"
          ) 存款
          .tab.col-6.text-center.py-3(
            :class="{ active : type === 'withdraw'}"
            @click="type = 'withdraw'"
          ) 提款
        .bg-white.text-center.px-5.py-4.main.overflow-auto
          component(:is="type")
</template>

<script>
import deposit from '@/components/deposit.vue';
import withdraw from '@/components/withdraw.vue';

export default {
  components: {
    deposit,
    withdraw,
  },
  data() {
    return {
      moneyCollectIcon: `${process.env.VUE_APP_STATIC}/img/money-collect-white.svg`,
      type: 'deposit',
    };
  },
};
</script>

<style lang="scss" scoped>
  .tab {
    background-color: white;
    font-weight: bold;
    border-radius: 0 8px 0 0;
    border-bottom: 1px solid #ebeef5;

    &:first-of-type {
      border-radius: 8px 0 0 0;
    }

    &.active {
      background-color: #f76b1c;
      color: white;
      border: none;
    }
  }

  .main {
    box-shadow: inset 0 0 4px 0 rgba(0, 172, 171, 0.3);
    border-radius: 0 0 8px 8px;
  }

  .icon {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: cover;
    vertical-align: bottom;
  }
</style>
