<template lang="pug">
.container.mx-auto(v-if='MemberInfo && MemberData')
  .flex.p-4
    .w-full
      RandomText(TAG='h6', :TXT='"Hi, "+MemberInfo.account',delayTime='0', LoopTime='10000', SIZE='16px', COLOR='#000')
  .floatCard
    .flex.p-4
      .w-full
        .flex
          .flex-grow
            RandomText(TAG='p', TXT='本月交易手续费',delayTime='600', LoopTime='10000', SIZE='14px', COLOR='#330000')
            router-link(to='/oder',v-if='Object.keys(MemberData).length>0')
              RandomText.text-myPurple(TAG='h2', :TXT='"¥ "+MemberData.amount',delayTime='1200', LoopTime='10000', SIZE='40px')
          .flex.items-center
            i.fas.fa-angle-right
    hr
    .flex.p-4.py-8
      .w-full
        .flex(@click='$router.push("/point")')
          .flex-grow
            RandomText(TAG='p', :TXT='"可用点数 "+MemberData.point', delayTime='1800', LoopTime='10000', SIZE='14px', COLOR='#000')
          .flex.items-center
            i.fas.fa-angle-right
  .flex.mt-4.floatCard.p-4.items-center
    div(class='w-1/2')
      .cursorP.flex.flex-col.justify-center.items-center.borderR.text-myPurple.animated(
        :class='{headShake: btn1Hover===true}',
        @mouseover='btn1Hover=true'
        @mouseout='btn1Hover=false'
        @click='assign')
        p.my-4
          i.fas.fa-arrow-alt-circle-up.text-5xl
        p.text-base 上分点数
    div(class='w-1/2')
      .cursorP.flex.flex-col.justify-center.items-center.text-myPurple.animated(
        :class='{headShake: btn2Hover===true}',
        @mouseover='btn2Hover=true'
        @mouseout='btn2Hover=false'
        @click='$router.push("/invite")')
        p.my-4
          i.fas.fa-user-plus.text-5xl
        p.text-base(v-if='MemberInfo.identity.value===2') 邀请代理
        p.text-base(v-if='MemberInfo.identity.value===3') 邀请交易员
  .flex.flex-col.p-4
    .w-full.my-4
      .flex.justify-between.cursorP(@click='$router.push("/tradermanage")')
        span.icon
          i.fas.fa-smile.text-myPurple.text-xl
        span.flex-grow.text-sm.text-gray-800 交易员管理
        span
          span.mx-3.text-sm {{MemberData.count}}
          i.fas.fa-angle-right
    .w-full.my-4
      .flex.justify-between.cursorP(@click='$router.push("/account")')
        span.icon
          i.fas.fa-user-cog.text-myPurple.text-xl
        span.flex-grow.text-sm.text-gray-800 帐号设置
        span
          i.fas.fa-angle-right
    .w-full.my-4 
      .flex.justify-between.cursorP(@click='logout')
        span.icon
          i.fas.fa-sign-out-alt.text-myPurple.text-xl
        span.flex-grow.text-sm.text-gray-800 登出
        span
          i.fas.fa-angle-right
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import Assign from '@/components/DialogComponent/Assign.vue';
import { mapState } from 'vuex';
import { PointAssignAPI } from '@/api';

export default {
  computed: {
    ...mapState('member', ['MemberLogined', 'MemberData', 'MemberInfo']),
  },
  components: {
    RandomText,
  },
  data() {
    return {
      btn1Hover: false,  
      btn2Hover: false,
    };
  },
  methods: {
    assign() {
      console.log('assign');
      this.$store.commit('setting/setDialogShow');
      this.$store.commit('setting/setDialogComponent', Assign);
    },
    logout() {
      this.$store.dispatch('member/MemberLogOut');
    },
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
.borderR{
  border-right:  1px solid #ececec;
}
.icon{
  margin: 0 10px;
  width: 24px;
  height: 24px;
}
</style>
