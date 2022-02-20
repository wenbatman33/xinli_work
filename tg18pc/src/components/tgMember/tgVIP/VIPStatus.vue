<template lang='pug'>
  .memberStatus
    .memberStatusBarBG
    .memberStatusBar
      .container.h-100.align-items-center
        .row.h-100.justify-content-between.align-items-center
          div.mx-0.my-3.text-center
            img.vipIcon(:src='MemberVIPData.VipImages')
          div.d-flex.flex-column.status
            .row.no-gutters
              .col-4.text-white.pr-2
                .row.no-gutters.my-3
                  .col-6
                    p.px-2
                      span.text-white 您好，{{UserName}}
                    p.px-2
                      span.text-white.float-left 帐户总额 
                      span.text-tgYellow.float-right ¥ {{totalAccount | commaFormat}}
                  .col-6.px-2.text-right
                    //- el-button.btn.btn-outline-tgBlueLight.radiusBtn(@click='WalletTransferAll'  :loading="submitLoading") 一键收回中心钱包
                .row.no-gutters.mt-3
                  .col-6
                    p.px-2
                      span.text-white.float-left 中心钱包 
                      span.text-tgBlueLight.float-right ¥ {{Cash | commaFormat}}
                  .col-6
                    p.text-white.px-2
                      span.text-white.float-left 冻结资金 
                      span.text-tgBlueLight.float-right ¥ {{LockCash | commaFormat}}
              .col-8.text-white.VIPbg
                .row.no-gutters.p-3.h-100
                  .col-8.my-2
                    .d-flex.text-b
                      router-link(to='/vip')
                        .badge.px-2.mx-1
                          span(v-if='MemberVIPData.UserLevel<=1') 铁 
                          i.el-icon-star-on(v-if='MemberVIPData.UserLevel>=2')
                          span(v-if='MemberVIPData.UserLevel>=2') {{ MemberVIPData.UserLevel-1 }} 
                      span.mx-3.mt-1  晋级条件 {{MemberVIPData.PayAmount | commaFormat}} / {{MemberVIPData.VipFullAmount | commaFormat}}
                  .col-4.my-2 
                    //- el-progress.mt-2.VIPprogress(v-if='MemberVIPData.UserLevel<8', :percentage="MemberVIPData.Schedule", :show-text='false')
                    //- el-progress.mt-2.highVIPprogress(v-else, :percentage="MemberVIPData.Schedule", :show-text='false')
                  .col-9.my-2
                    .VIPStatus.d-flex.justify-content-between
                      .VIPBadge(v-for='index in 9')
                        img(v-if='index<=Number(MemberVIPData.UserLevel)', :src='"/static/img/vip/v"+index+".png"')
                        img(v-else, :src='"/static/img/vip/vg"+index+".png"')
                      //- .VIPBadgeprogress
                      //- el-progress.VIPBadgeprogress(percentage="30", :show-text='false')
                      el-progress.VIPBadgeprogress(:percentage='countPercentage(MemberVIPData.UserLevel)', :show-text='false')
                  .col-3.my-2
                    router-link(to='/vip')
                      el-button.btn.btn-outline-tgBlueLight.radiusBtn.float-right VIP 独享权益
</template>
<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      submitLoading: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberVIPData',
    ]),
    Cash() {
      return this.MemberWallet.Cash;
    },
    LockCash() {
      return this.MemberWallet.LockCash;
    },
    totalAccount() {
      const totalAccount = Number(this.MemberWallet.Cash) + Number(this.MemberWallet.LockCash);
      return totalAccount.toFixed(2);
    },
  },
  methods: {
    countPercentage(num) {
      const currentNum = Number(num - 1);
      const Percent = currentNum * (100 / 8);
      return (Percent) || 0;
    },
    WalletTransferAll() {
      const payload = { UserId: this.UserId };
      const vm = this;
      vm.submitLoading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          vm.submitLoading = false;
          if (res.data.status === 1) {
            vm.$message({ message: '已收回中心钱包', type: 'success' });
            vm.transferFinish();
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.transferFinish();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
  .badge{
    color: #fff;
    border-radius: 18px;
    background-color: #1890ff;
    span{
      font-size: 16px;
    }
  }
  .vipIcon{
    width: 84px;
  }
  .status{
    width: 90%;
  }
  .totalAmount{
    width: 160px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  .totalAmountBtns{
    width: 450px;
    text-align: right;
  }
  .memberStatus {
    width: 100%;
    height: 152px;
    background-image: linear-gradient(to right, #002766, #001332);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .memberStatusBarBG{
    width: 100%;
    height: 152px;
    background-image: url('/static/img/bg-member.png');
    background-size: cover;
  }
  .memberStatusBar{
    margin-top: -152px;
    height: 152px;
  }
  .memberPage{
    min-height: 600px;
  }
  .VIPbg{
    height: 120px;
    border-radius: 16px;
    box-shadow: inset 0 0 8px 0 rgba(0, 0, 0, 0.24);
    background-color: rgba(0, 0, 0, 0.2);
  }
  .VIPStatus{
    .VIPBadge{
      position: relative;
      z-index: 3;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      // background:#001D4C;
      // box-shadow: inset 0 0 8px 0 rgba(0,0,0,0.80);
      background-image: url('/static/img/vip/vbg.png');
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
  
  .VIPBadgeprogress{
    position: absolute;
    z-index: 1;
    left: 10px;
    width: 95%;
    height: 2px !important;
    margin-top: 16px;
    background:#001D4C;
    box-shadow: inset 0 0 8px 0 rgba(0,0,0,0.2);
  }
</style>
<style lang="scss">
.VIPBadgeprogress{
  .el-progress-bar__outer{
    height: 2px !important;
    background: rgba(0, 0, 0, 0.5)!important;
  }
  .el-progress-bar__inner{
    background-image: linear-gradient(to right, #00b3ff, #0054d9);
  }
}
.VIPprogress{
  .el-progress-bar{
    .el-progress-bar__outer{
      background: rgba(0, 0, 0, 0.5)!important;
    }
  }
}
.highVIPprogress{
  .el-progress-bar{
    .el-progress-bar__outer{
      background: rgba(0, 0, 0, 0.5)!important;
    }
    .el-progress-bar__inner{
      background-image: linear-gradient(to right, #FADB14, #FDEF2D) !important;
    }
  }
}
</style>
