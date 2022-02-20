<template lang='pug'>
  .tgDeposit.p-1.d-flex.flex-column
    .bonusStatus.d-flex.mb-1.flex-column
      .title.p-2
        h6.text-dark 个人红利统计
      .bonusInfo(v-if='MemberWallet')
        .row.no-gutters.h-100
          .col.bonusDiv.d-flex.flex-row.flex-grow-1.BonusDiv
            .col-4.bonusIcon
              .iconMain ¥
            .col-8.bonusData
              p.text-black-50 累积红利
              h6 ¥ {{ Number(MemberWallet.ReturnAmount) + Number(MemberWallet.RescueAmount) + Number(MemberWallet.BonusAmount) }}
          .col.d-flex.flex-row.justify-content-between.flex-grow-1
            .col-4.bonusIcon
              .icon ¥
            .col-8.bonusData
              p.text-black-50 返水
              h6 ¥ {{MemberWallet.ReturnAmount}}
          .col.d-flex.flex-row.justify-content-between.flex-grow-1
            .col-4.bonusIcon
              .icon ¥
            .col-8.bonusData
              p.text-black-50 救援金
              h6 ¥ {{MemberWallet.RescueAmount}}
          .col.d-flex.flex-row.justify-content-between.flex-grow-1
            .col-4.bonusIcon
              .icon ¥
            .col-8.bonusData
              p.text-black-50 其他优惠
              h6 ¥ {{MemberWallet.BonusAmount}}
    el-tabs.w-100(v-model='activeName', type='border-card', @tab-click='handleClick')
      el-tab-pane(name='1')
        span(slot="label") 返水 
          span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.returnCnt>0') {{MemberOfferCount.returnCnt}}
      el-tab-pane( name='2')
        span(slot="label") 救援金 
          span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.rescueCnt>0') {{MemberOfferCount.rescueCnt}}
      el-tab-pane(name='3')
        span(slot="label") 红利 
          span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.bonusCnt>0') {{MemberOfferCount.bonusCnt}}
      router-view
      p.invisible {{getUrlID}}
</template>
<script>
import tgBonus1 from '@/components/tgMember/tgBonus1.vue';
import tgBonus2 from '@/components/tgMember/tgBonus2.vue';
import tgBonus3 from '@/components/tgMember/tgBonus3.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgBonus1,
    tgBonus2,
    tgBonus3,
  },
  data() {
    return {
      activeName: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberOfferCount',
    ]),
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return parHash;
      },
    },
  },
  watch: {
    getUrlID(val, oldVal) {
      this.activeName = val;
    },
  },
  methods: {
    handleClick(tab, event) {
      const path = this.activeName;
      router.push(`/member/bonus/${path}`);
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
  },
};
</script>
<style lang="scss">
  .el-tabs__content{
    min-height: 600px;
    margin: 0;
  }
</style>
<style lang="scss" scoped>
  .bonusStatus{
    width: 100%;
    height: 140px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .title{
      width: 100%;
      height: 36px;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .bonusInfo{
    height: 100px;
  }
  .bonusIcon,.bonusData{
    line-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tgDeposit{
    min-height: 600px;
  }
  .tgDepositMain {
    min-height: 600px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
  }
  .icon{
    width: 40px;
    height: 40px;
    color: #faad14;
    border: 1px solid #faad14;
    border-radius: 100%;
    text-align: center;
    line-height: 40px;
  }
  .iconMain{
    width: 40px;
    height: 40px;
    color: #fff;
    background-image: linear-gradient(to top, #faad14, #fadb14);
    border-radius: 100%;
    text-align: center;
    line-height: 30px;
    border: 5px solid #FAF3C4;
  }
  .BonusDiv{
    border-right: 1px solid #d9d9d9;
  }
</style>
