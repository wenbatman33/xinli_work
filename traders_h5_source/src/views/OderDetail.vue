<template lang="pug">
.w-full
  .headerBar
    p.text-center 手续费明细
    .backBtn(@click='$router.back(-1)')
      span.mx-2
        i.fas.fa-angle-left
      span Back
  .container.mx-auto(v-if='oderItem')
    .w-full.text-center.p-4
      .font-medium.text-4xl.text-myRed  ¥ {{oderItem.amount}}
    .w-full.mt-4.floatCard.p-4
      .flex.flex-row.justify-between.p-4.border-b
        p 訂單編號
        p.text-gray-500 {{oderItem.order_sn}}
      .flex.flex-row.justify-between.p-4.border-b
        p 訂單金額
        p.text-gray-500 ¥ {{oderItem.amount}}
      .flex.flex-row.justify-between.p-4.border-b
        p 交易手續費
        p.text-gray-500 ¥ {{oderItem.trader_fee_amount}}
      .flex.flex-row.justify-between.p-4.border-b
        p 下線分潤
        p.text-gray-500 {{oderItem.trader_fee}}
      .flex.flex-row.justify-between.p-4.border-b
        p 訂單狀態
        p.text-gray-500 {{oderItem.status.display}}
      .flex.flex-row.justify-between.p-4.border-b
        p 最後更新時間
        p.text-gray-500 {{formatDate(oderItem.created_at)}}
    .row.no-gutters.floatCard.p-3.mb-5
      .col-12.mt-5.text-center 訂單有問題？點此回報 
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import { mapState } from 'vuex';

export default {
  components: {
    RandomText,
  },
  data() {
    return {
      oderItem: '',
    };
  },
  methods: {
    formatDate(time) {
      return this.$dayjs(time).format('YYYY/MM/DD HH:mm');
    },
  },
  mounted() {
    const payload = {
      order_sn: this.$route.query.order_sn,
    };
    this.$store.dispatch('member/getMemberOderList', payload)
      .then((res) => {
        this.oderItem = res.data.data[0];
      });
  },
};
</script>
<style lang="scss" scoped>
.floatCard{
  min-height: 180px;
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}
</style>
