<template lang="pug">
.w-full(v-if='MemberSubList')
  .headerBar
    p.text-center 交易员管理
    .backBtn
      router-link(to='/')
        span.mx-2
          i.fas.fa-angle-left
        span Back
  .container.mx-auto
    .flex.p-8
      .p-4.text-center.border-r(class='w-1/2')
        p.text-sm.text-gray-500 交易员数
        p.text-2xl {{MemberData.count}}
      .p-4.text-center(class='w-1/2')
        p.text-sm.text-gray-500 交易员管手续费
        p.text-2xl {{AllSum}}
    hr
    .flex.p-4.pb-0
      div(class='w-4/12')
        p.text-sm 交易员帳號
      div.text-center(class='w-3/12')
        p.text-sm 分潤
      div.text-right(class='w-4/12')
        p.text-sm 本月手續費
      div.text-center(class='w-1/12')
        //- i.fas.fa-angle-up
    TraderManageItem(v-for='(item, index) in MemberSubList', :key ='index', :MEMBER='item')

</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import TraderManageItem from '@/components/TraderManage/TraderManageItem.vue';
import { mapState, mapGetters } from 'vuex';
import { MemberSubListAPI } from '@/api';

export default {
  components: {
    RandomText,
    TraderManageItem,
  },
  data() {
    return {
    };
  },
  watch: {
    
  },
  computed: {
    ...mapState('member', ['MemberLogined', 'MemberData', 'MemberInfo', 'MemberSubList']),
    AllSum(val) {
      // 計算下線總和
      return (this.MemberSubList) ? this.MemberSubList.map(member => member.amount).reduce((pre, next) => pre + next) : 0;
    },

  },

};
</script>
<style lang="scss" scoped>
</style>
