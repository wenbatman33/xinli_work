<template lang="pug">
  .container-fluid
    tgSmNavi
    VIPStatus
    //- memberStatus
    .member_funciton
      .member_funciton_caption 出納台
      ul
        li
          router-link(to="/member/cashier/1" v-on:click.native='GA_member_savemobile')
            .icon_deposit
            span 存款
        li
          router-link(to="/member/overview" v-on:click.native='GA_member_transfermobile')
            .icon_transfer
            span 转账
        li
          router-link(to="/member/cashier/2" v-on:click.native='GA_member_withdrawmobile')
            .icon_withdrawal
            span 提款
      .member_funciton_caption 领奖
      ul
        li
          el-badge(v-if='MemberLogined && MemberBonusNumber.returnCnt > 0' :value="MemberBonusNumber.returnCnt" :max="99" class="item")
            a(@click="bonusRouter(1)")
              img(src="/static/img/icon-ticket.svg")
              span 返水
          a(v-else @click="bonusRouter(1)")
            img(src="/static/img/icon-ticket.svg")
            span 返水
        li
          el-badge(v-if='MemberLogined && MemberBonusNumber.rescueCnt > 0' :value="MemberBonusNumber.rescueCnt" :max="99" class="item")
            a(@click="bonusRouter(2)")
              img(src="/static/img/icon-coins.svg")
              span 救援金
          a(v-else @click="bonusRouter(2)")
            img(src="/static/img/icon-coins.svg")
            span 救援金
        li
          el-badge(v-if='MemberLogined && MemberBonusNumber.bonusCnt > 0' :value="MemberBonusNumber.bonusCnt" :max="99" class="item")
            a(@click="bonusRouter(3)")
              img(src="/static/img/icon-gift.svg")
              span 红利
          a(v-else @click="bonusRouter(3)")
            img(src="/static/img/icon-gift.svg")
            span 红利
      .member_funciton_caption 交易
      ul
        li
          router-link(:to="{name:'records', query: {type: 1}, params: {switch: 1}}")
            img(src="/static/img/icon-clipboard-list.svg")
            span 资金纪录
        li
          router-link(:to="{name:'betrecords', query: {type: 1}, params: {switch: 1}}")
            img(src="/static/img/icon-chartbar.svg")
            span 流水纪录
      .member_funciton_caption 账户
      ul
        li
          router-link(to="/member/account/1")
            img(src="/static/img/icon-user.svg")
            span 个人资料
        li
          router-link(to="/member/account/2")
            img(src="/static/img/icon-unlick.svg")
            span 修改密码
      .member_funciton_caption 其他
      ul
        li
          router-link(to="/member/overview")
            img(src="/static/img/icon-pocket.svg")
            span 钱包
        li
          router-link(to="/member/inbox")
            img(src="/static/img/icon-comment.svg")
            span 站內信
        li
          div(@click.prevent="logout")
            img(src="/static/img/icon-signout.svg")
            span 退出
    tgFooter
    tgFix
</template>
<script>
import jwt from 'jwt-simple';
import router from '@/router/router';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import memberStatus from '@/components/tgMember/memberStatus.vue';
import VIPStatus from '@/components/tgMember/tgVIP/VIPStatus.vue';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
    ...mapState('member', [
      'MemberLogined',
      'MemberBonusNumber',
    ]),
  },
  methods: {
    logout() {     
      window.localStorage.removeItem('JWT_TOKEN');
      window.location.reload();
    },
    bonusRouter(val) {
      this.$store.state.member.MemberReloadSwitch = true;
      router.push(`/member/bonus/${val}`);
    },
  },
  components: {
    tgSmNavi,
    memberStatus,
    VIPStatus,
    tgFix,
    tgFooter,
  },
  mounted() {
    this.$store.state.index.loginBackUrl = '';
  },
};
</script>
<style lang="scss" scoped>
.member_funciton span{
  color: rgba(0,80,179,1);
}
</style>
