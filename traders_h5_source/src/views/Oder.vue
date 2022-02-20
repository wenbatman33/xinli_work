<template lang="pug">
.w-full(v-if='MemberData')
  .headerBar
    p.text-center 钱包
    .backBtn(@click='$router.back(-1)')
      span.mx-2
        i.fas.fa-angle-left
      span Back
  .container.mx-auto
    .w-full.floatCard.p-4.text-center
      RandomText.my-3(TAG='h2', :TXT='"¥ "+MemberData.amount',delayTime='0', LoopTime='10000', SIZE='50px', COLOR='#BC9CFF')
      RandomText.my-3(TAG='p', TXT='本月交易手续费',delayTime='600', LoopTime='10000', SIZE='14px', COLOR='#330000')
      hr
      router-link.w-full.p-2(to='/walletwithdraw')
        .flex.justify-between.items-center
          span 
            RandomText.text-right(TAG='p', TXT='全部交易手續費',delayTime='1000', LoopTime='10000', SIZE='14px', COLOR='#000')
          span.text-right.flex-grow.mx-2
            RandomText.text-right(TAG='p', TXT='¥ 5,133.55',delayTime='1200', LoopTime='10000', SIZE='14px', COLOR='#1F2041')
          span
            i.fas.fa-angle-right
    .w-full.mt-4
      .w-full(v-for='(item, index) in MemberOderList')
        router-link(:to='"/oderdetail?order_sn="+item.order_sn')
          .w-full.walletItem.flex.flex-row
            .flex.justify-center.items-center(class='w-2/12')
              i.fas.fa-check-circle.text-3xl.text-myPurple
            .flex.flex-col.justify-center.items-start(class='w-5/12')
              p.text-sm.text-gray-700 訂單金額
              p.font-medium.text-2xl.text-myPurple ¥ {{item.amount}}
              p.text-sm.text-gray-400 {{formatDate(item.created_at)}}
            .flex.flex-col.justify-center.items-end(class='w-5/12')
              p.text-sm.text-gray-700 獲得手續費
              p.font-medium.text-2xl.text-myRed ¥ {{item.trader_fee_amount}}
            .flex.justify-center.items-center(class='w-1/6')
              i.fas.fa-angle-right.text-2xl
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import { mapState } from 'vuex';

export default {
  components: {
    RandomText,
  },
  computed: {
    ...mapState('member', ['MemberData', 'MemberInfo', 'MemberOderList']),
  },
  methods: {
    formatDate(time) {
      return this.$dayjs(time).format('YYYY/MM/DD HH:mm');
    },
  },
  mounted() {
    this.$store.dispatch('member/getMemberOderList');
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
.walletItem{
  cursor: pointer;
  min-height: 90px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.06);
}
</style>
