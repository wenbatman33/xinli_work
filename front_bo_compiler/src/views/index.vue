<template lang="pug">
  el-container.vh-100.vw-100
    blSidebar
    el-container
      el-header(height="")
        blHeader.bl-navbar
        //- blTabView
      el-main.p-2.content
        el-tabs#bl--tab.d-flex.flex-column.mh-100(
          v-model="activeTab",
          closable,
          @tab-click="clickTab",
          @tab-remove="removeTab",
          type="border-card",
          ref="blTabs"
        )
          el-tab-pane.bl--tab(
            v-for="tab in openTabs",
            :key="getTabKey(tab.path)",
            :name="tab.path",
            :class="{'is-change': change }"
          )
            span(slot="label") {{ tab.title }}
            template
              el-backtop(:bottom="100", target=".content")
            component(
              :is="tab.component",
              :fieldPerms="field",
              :buttonPerms="tab.button",
              :blockPerms="tab.block"
            )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import blSidebar from '@/components/blSidebar';
import blHeader from '@/components/Header';
import Sortable from 'sortablejs/modular/sortable.core.esm.js';

export default {
  components: {
    blSidebar,
    blHeader,
    dashboard: () => import('@/views/dashboard.vue'),
    // acl
    role: () => import(/* webpackChunkName: "acl" */'@/views/acl/role'),
    roleDetail: () => import(/* webpackChunkName: "acl" */'@/views/acl/role/detail'),
    account: () => import(/* webpackChunkName: "acl" */'@/views/acl/account'),
    roleUserDetailTabs: () => import(/* webpackChunkName: "acl" */'@/views/acl/account/roleUserDetailTabs.vue'),

    // site
    banner: () => import(/* webpackChunkName: "site" */'@/views/site/banner'),
    bannerCreate: () => import(/* webpackChunkName: "site" */'@/views/site/banner/create.vue'),
    news: () => import(/* webpackChunkName: "site" */'@/views/site/news'),
    newsCreate: () => import(/* webpackChunkName: "site" */'@/views/site/news/create.vue'),
    game: () => import(/* webpackChunkName: "site" */'@/views/site/game'),
    gameEdit: () => import(/* webpackChunkName: "site" */'@/views/site/game/edit.vue'),
    gameType: () => import(/* webpackChunkName: "site" */'@/views/site/gameType'),
    gameTypeEdit: () => import(/* webpackChunkName: "site" */'@/views/site/gameType/edit.vue'),
    gameGroup: () => import(/* webpackChunkName: "site" */'@/views/site/gameGroup'),
    gameGroupEdit: () => import(/* webpackChunkName: "site" */'@/views/site/gameGroup/edit.vue'),
    greetings: () => import(/* webpackChunkName: "site" */'@/views/site/greetings'),
    greetingsEdit: () => import(/* webpackChunkName: "site" */'@/views/site/greetings/edit.vue'),
    inbox: () => import(/* webpackChunkName: "site" */'@/views/site/inbox'),
    inboxEdit: () => import(/* webpackChunkName: "site" */'@/views/site/inbox/edit.vue'),
    pushManage: () => import(/* webpackChunkName: "site" */'@/views/site/pushManage'),

    // payment
    payChannel: () => import(/* webpackChunkName: "payment" */'@/views/payment/payChannel'),
    payChannelEdit: () => import(/* webpackChunkName: "payment" */'@/views/payment/payChannel/edit.vue'),
    payChannelLog: () => import(/* webpackChunkName: "payment" */'@/views/payment/payChannel/log'),
    paymentAccount: () => import(/* webpackChunkName: "payment" */'@/views/payment/account'),
    paymentGroup: () => import(/* webpackChunkName: "payment" */'@/views/payment/paymentGroup'),
    paymentGroupDetail: () => import(/* webpackChunkName: "payment" */'@/views/payment/paymentGroup/detail'),
    bankCardGroup: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCardGroup'),
    bankCardGroupDetail: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCardGroup/detail'),
    bankCard: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCard'),
    bankCardDetail: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCard/detail'),
    bankCardLog: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCard/log'),
    bankCardSupplier: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCardSupplier'),
    bankCardSupplierDetail: () => import(/* webpackChunkName: "bankcard" */'@/views/payment/bankCardSupplier/detail'),
    merchant: () => import(/* webpackChunkName: "payment" */'@/views/payment/merchant'),
    merchantEdit: () => import(/* webpackChunkName: "payment" */'@/views/payment/merchant/edit'),
    merchantLog: () => import(/* webpackChunkName: "payment" */'@/views/payment/merchant/log'),

    // member
    member: () => import(/* webpackChunkName: "member" */'@/views/member/member'),
    memberDetail: () => import(/* webpackChunkName: "member" */'@/views/member/member/detail.vue'),
    memberGroupType: () => import(/* webpackChunkName: "member" */'@/views/member/memberGroup/type.vue'),
    memberGroupGroup: () => import(/* webpackChunkName: "member" */'@/views/member/memberGroup/group'),
    memberGroupList: () => import(/* webpackChunkName: "member" */'@/views/member/memberGroup/list.vue'),
    memberGroupTypeList: () => import(/* webpackChunkName: "member" */'@/views/member/memberGroup/typeList.vue'),
    otpList: () => import(/* webpackChunkName: "member" */'@/views/member/otpList'),
    memberLoginLog: () => import(/* webpackChunkName: "member" */'@/views/member/memberLoginLog'),
    cashAdjust: () => import(/* webpackChunkName: "member" */'@/views/member/cashAdjust'),
    reservedWords: () => import(/* webpackChunkName: "member" */'@/views/member/reservedWords'),
    batch: () => import(/* webpackChunkName: "member" */'@/views/member/batch'),

    // promotion
    promotion: () => import(/* webpackChunkName: "promotion" */'@/views/promotion/promotion'),
    promotionEdit: () => import(/* webpackChunkName: "promotion" */'@/views/promotion/promotion/edit.vue'),
    promotionApply: () => import(/* webpackChunkName: "promotion" */'@/views/promotion/apply'),
    promotionApplyDetail: () => import(/* webpackChunkName: "promotion" */'@/views/promotion/apply/detail.vue'),
    event: () => import(/* webpackChunkName: "promotion" */'@/views/promotion/event/index.vue'),

    // capitalFlow
    depositOrderAll: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/depositOrder/all.vue'),
    depositOrderT: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/depositOrder/third.vue'),
    depositOrderD: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/depositOrder/bankCard.vue'),
    withdrawOrder: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/withdrawOrder'),
    checkWithdrawOrder: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/withdrawOrder/check.vue'),
    withdrawalOrder: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/withdrawalOrder'),
    checkWithdrawalOrder: () => import(/* webpackChunkName: "capitalFlow" */'@/views/capitalFlow/withdrawalOrder/check.vue'),

    // sport
    sportBanner: () => import(/* webpackChunkName: "sports" */'@/views/sports/banner'),
    sportBannerCreate: () => import(/* webpackChunkName: "sports" */'@/views/sports/banner/create.vue'),
    sportNews: () => import(/* webpackChunkName: "sports" */'@/views/sports/news'),
    sportNewsCreate: () => import(/* webpackChunkName: "sports" */'@/views/sports/news/create.vue'),
    sportGreetings: () => import(/* webpackChunkName: "sports" */'@/views/sports/greetings'),
    sportGreetingsEdit: () => import(/* webpackChunkName: "sports" */'@/views/sports/greetings/edit.vue'),
    sportInbox: () => import(/* webpackChunkName: "sports" */'@/views/sports/inbox'),
    sportInboxEdit: () => import(/* webpackChunkName: "sports" */'@/views/sports/inbox/edit.vue'),
    sportPushManage: () => import(/* webpackChunkName: "sports" */'@/views/sports/pushManage'),

    // risk
    firstCert: () => import(/* webpackChunkName: "risk" */'@/views/risk/firstCert'),
    weirdMember: () => import(/* webpackChunkName: "risk" */'@/views/risk/weirdMember'),
    riskWithdrawOrder: () => import(/* webpackChunkName: "risk" */'@/views/risk/withdrawOrder'),
    riskCheckWithdrawOrder: () => import(/* webpackChunkName: "risk" */'@/views/risk/withdrawOrder/check'),
    memberRelation: () => import(/* webpackChunkName: "risk" */'@/views/risk/memberRelation/index.vue'),

    // system
    appVersion: () => import(/* webpackChunkName: "system" */'@/views/system/appVersion'),
    sportAppVersion: () => import(/* webpackChunkName: "system" */'@/views/system/sportAppVersion'),
    maintenance: () => import(/* webpackChunkName: "system" */'@/views/system/maintenance'),
    sportMaintenance: () => import(/* webpackChunkName: "system" */'@/views/system/sportMaintenance'),
    domain: () => import(/* webpackChunkName: "system" */'@/views/system/domain'),

    // payChannel
    payChannelDeposit: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/payChannel'),
    payChannelWithdrawal: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/payChannel'),
    depositCardSummary: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/summary'),
    withdrawalCardSummary: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/summary'),
    warehouseCardSummary: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/summary'),
    thirdCardSummary: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/summary'),
    transferCardSummary: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/summary'),
    payChannelReport: () => import(/* webpackChunkName: "payChannel" */'@/views/payChannel/payChannelReport'),

    // reports
    reportBusiness: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportBusiness'),
    reportMember: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportMember'),
    reportWinner: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportWinner'),
    reportVendor: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportVendor'),
    reportDeposit: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportDeposit'),
    reportWithdraw: () => import(/* webpackChunkName: "reports" */'@/views/reports/reportWithdraw'),
    agencyMember: () => import(/* webpackChunkName: "reports" */'@/views/reports/agencyMember'),

    // dreamCity
    task: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/task'),
    taskParticipated: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/task/participated.vue'),
    goods: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/goods'),
    goodsBuyer: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/goods/buyer.vue'),
    order: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/order'),
    bet: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/bet'),
    dreamCashLog: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/cashLog'),
    dreamCashRecord: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/dreamCashRecord'),
    taskRecord: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/taskRecord'),
    betRecord: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/betRecord'),
    dreamCityBanner: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/banner'),
    dreamCityBannerCreate: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/banner/create.vue'),
    dreamCityNews: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/news'),
    dreamCityNewsCreate: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/news/create.vue'),
    rank: () => import(/* webpackChunkName: "dreamCity" */'@/views/dreamCity/rank/index.vue'),

    // vip
    vipSetting: () => import(/* webpackChunkName: "dreamCity" */'@/views/vip/vipSetting'),
    vipSettingEdit: () => import(/* webpackChunkName: "dreamCity" */'@/views/vip/vipSetting/edit'),
    vipReport: () => import(/* webpackChunkName: "dreamCity" */'@/views/vip/vipReport'),

    // 代理
    agency: () => import(/* webpackChunkName: "agency" */'@/views/agency/agency'),
    agencyCashLog: () => import(/* webpackChunkName: "agency" */'@/views/agency/cashLog'),
    agencyApply: () => import(/* webpackChunkName: "agency" */'@/views/agency/apply'),
    agencyLoginLog: () => import(/* webpackChunkName: "agency" */'@/views/agency/loginLog'),
    agencyCommission: () => import(/* webpackChunkName: "agency" */'@/views/agency/commission'),
    agencyOperation: () => import(/* webpackChunkName: "agency" */'@/views/agency/operation'),
    agencyWalletReport: () => import(/* webpackChunkName: "agency" */'@/views/agency/walletReport'),
    agencyReport: () => import(/* webpackChunkName: "agency" */'@/views/agency/agencyReport'),

    // 代理 存提出
    agencyDepositOrderAll: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/depositOrder/all.vue'),
    agencyDepositOrderT: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/depositOrder/third.vue'),
    agencyDepositOrderD: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/depositOrder/bankCard.vue'),
    agencyWithdrawOrder: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/withdrawOrder'),
    checkAgencyWithdrawOrder: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/withdrawOrder/check.vue'),
    agencyWithdrawalOrder: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/withdrawalOrder'),
    checkAgencyWithdrawalOrder: () => import(/* webpackChunkName: "acf" */'@/views/agencyCapitalFlow/withdrawalOrder/check.vue'),
  },
  data() {
    return {
      change: false
    }
  },
  computed: {
    ...mapState('auth', ['googleAuthData']),
    ...mapState('menu', [
      'menuTree',
      'openTabs',
      'isRefresh',
      'exclude',
      'field',
      'activeTab'
    ]),
    ...mapGetters('menu', [
      'getTabKey'
    ]),
    activeTab: {
      get() {
        return this.$store.state.menu.activeTab;
      },
      set(activeTab) {
        if (this.activeTab !== activeTab) {
          this.$store.dispatch('menu/setActiveTab', activeTab);
        }
      }
    }
  },
  created() {
    this.$store.dispatch('menu/getAllPageApi');
  },
  watch: {
    activeTab: {
      handler: function(fullPath) {
        const openTab = this.openTabs.find(tab => tab.path === fullPath);
        const hasLog = openTab && (
          (openTab.button[`${openTab.component}HasLogNeedId`] && this.$route.query.id)
          || openTab.button[`${openTab.component}HasLog`]
        );

        this.$store.dispatch('common/setHasLog', hasLog);
      },
      immediate: true
    }
  },
  mounted() {
    this.$store.subscribe(({ type }) => {
      if (type === 'menu/SET_ACTIVE_TAB') {
        this.change = true;
        setTimeout(() => {
          this.change = false
        }, 100)
      }
    });

    Sortable.create(this.$refs.blTabs.$children[0].$refs.nav, {
      onEnd: event => {
        event.item.click();
      }
    });
  },
  methods: {
    clickTab() {
      if (this.$route.fullPath !== this.activeTab) {
        this.$router.push(this.activeTab);
      }
    },
    removeTab(path) {
      this.$store.dispatch('menu/removeTab', path);
    }
  }
};
</script>

<style lang="scss">
button:focus {
  outline: unset;
}

.el-header {
  padding: 0px;
  padding-bottom: 2px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
}

.bl-navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.content {
  background: #E8EBF4;
  .el-tabs__content {
    height: auto;
    overflow: hidden;
  }
}

.el-pagination {
  text-align: right;
  margin: 8px auto;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#bl--tab {
  .el-tabs__content {
    overflow: auto;
  }

  .bl--tab {
    opacity: 1;
    transition: opacity .4s ease-in-out;
    &.is-change {
      opacity: 0;
    }
  }
}

.c-pointer {
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
}

.member--note {
  display: flex;
  align-items: center;
  width: 100%;
  .member--note--type {
    flex: 0 0 25px;
    text-align: center;
    border: 1px solid;
    padding: 1px;
  }
  .member--note--content {
    flex: 0 0 160px;
    width: calc(100% - 30px);
    .member--note--datetime {
      color: #909399;
      font-size: 13px;
    }
  }
}
</style>
