<template lang='pug'>
.tgOverview(v-loading="loading")
  h5.px-3 常用钱包
  .row.m-1
    .col-3.mb-3.px-2(v-for="(game, index, key) in MemberGameWalletCommon")
      .bankCard.d-flex.flex-column(:style='{"border-top": "4px solid "+filterProviderColorCode(game[0])}')
        .d-flex.flex-row.flex-grow-1.align-items-center
          div.brand.m-2(:style='{"background": filterProviderColorCode(game[0])}')
            img(:src='filterProviderImg(game[0])', width='40')
          div.d-flex.flex-column
            p.my-1 {{game[0]}} 钱包
              img.ml-2.iconReload(src='/static/img/icon-reload.svg' @click='renewWallet(game[0])')
            p.Amount.my-1  ¥ {{ game[1]}}
        div
          .row.no-gutters
            .col-4
              .btn.bankCardBtn(:index='index' @click='seletePropsWallet(game,index)') 
                span 转账
            .col-4
              .btn.bankCardBtn(:index='index' @click='WalletTransferGame(filterGroupId(game[0]),game[0])')
                i.el-icon-d-arrow-right.rotateUp.text-success
                span.ml-1.text-success 闪入 
            .col-4
              .btn.bankCardBtn(:index='index' @click='WalletTransferAll(filterGroupId(game[0]),game[0])')
                i.el-icon-d-arrow-right.rotateDown.text-danger
                span.ml-1.text-danger 闪提
  h5.px-3 更多钱包
  .row.m-1
    .col-3.mb-3.px-2(v-for="(game, index,key) in MemberGameWalletNormal")
      .bankCard.d-flex.flex-column(:style='{"border-top": "4px solid "+filterProviderColorCode(game[0])}')
        .d-flex.flex-row.flex-grow-1.align-items-center
          div.brand.m-2(:style='{"background": filterProviderColorCode(game[0])}')
            img(:src='filterProviderImg(game[0])', width='40')
          div.d-flex.flex-column
            p.my-1 {{game[0]}} 钱包
              img.ml-2.iconReload(src='/static/img/icon-reload.svg' @click='renewWallet(game[0])')
            p.Amount.my-1  ¥ {{ game[1]}}

        div
          .row.no-gutters
            .col-4
              .btn.bankCardBtn(:index='index' @click='seletePropsWallet(game,index ,game[0])') 
                span 转账
            .col-4
              .btn.bankCardBtn(:index='index' @click='WalletTransferGame(filterGroupId(game[0]),game[0])')
                i.el-icon-d-arrow-right.rotateUp.text-success
                span.ml-1.text-success 闪入 
            .col-4
              .btn.bankCardBtn(:index='index', @click='WalletTransferAll(filterGroupId(game[0]))')
                i.el-icon-d-arrow-right.rotateDown.text-danger
                span.ml-1.text-danger 闪提
  tgError(v-if='showError')
  el-dialog(:visible.sync='cashierDialog_3', width='40%', append-to-body)
    tgCashier3(:propsWallet.sync='propsWallet',:transType.sync='transType' @cashierDialog_3_Hide='cashierDialog_3_Hide')
</template>
<script>
import axios from 'axios';
import tgCashier3 from '@/components/tgMember/tgCashier3.vue';
import tgError from '@/components/tgError/tgError.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      showError: false,
      propsWallet: [],
      transType: 1,
      cashierDialog_3: false,
    };
  },
  components: {
    tgCashier3,
    tgError,
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWalletCommon',
      'MemberGameWalletNormal',
    ]),
    ...mapState('game', [
      'gameGroup',
    ]),
  },
  methods: {
    filterProviderImg(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].Images;
    },
    filterProviderColorCode(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].ColorCode;
    },
    filterGroupId(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].GroupId;
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
    WalletTransferAll(GroupId, GroupName) {
      const payload = { UserId: this.UserId, GameGroupId: GroupId };
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
    WalletTransferGame(GroupId, GroupName) {
      const payload = { UserId: this.UserId, GameGroupId: GroupId, Type: 1 };
      const vm = this;
      vm.submitLoading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferGame`, payload)
        .then((res) => {
          vm.submitLoading = false;
          if (res.data.status === 1) {
            vm.$message({ message: `已转入${GroupName}钱包`, type: 'success' });
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
    seletePropsWallet(game, index, GroupName) {
      const Wallet_1 = {
        gameId: index,
        gameName: game[0],
        Cash: game[1],
        gameImage: this.filterProviderImg(game[0]),
        gameColor: this.filterProviderColorCode(game[0]),
      };
      const Wallet_2 = {
        gameId: 'center',
        gameName: '中心钱包',
        Cash: this.MemberWallet.Cash,
        gameImage: '/static/img/18logo.png',
        gameColor: '#002766',
      };
      this.propsWallet = [Wallet_1, Wallet_2];
      this.transType = 1;
      this.cashierDialog_3 = true;
    },
    init() {
      if (this.UserId) {
        const payload = { UserId: this.UserId };
        this.$store.dispatch('member/MemberGetGameWallet', payload)
          .then((res) => {
            this.loading = false;
            if (res.data.data.length <= 0) {
              this.showError = true;
            }
          });
      }
    },
    renewWallet(gameName) {
      this.GA_wallet_update(gameName);
      const vm = this;
      const GroupID = this.gameGroup.filter((item, index, array) => item.GroupName === gameName)[0].GroupId;			
      axios.post(`${process.env.VUE_APP_GAMEHOST}/Game/GameApi/GetBalance_Api/${this.UserId}/${GroupID}`)
        .then((res) => {
          if (res.data.status === 1) {
            const payload = { id: GroupID, groupName: gameName, cash: res.data.data.Balance };
            vm.$store.commit('member/setMemberGameWalletByOne', payload);
            vm.$message({
              message: `${gameName}钱包更新成功`,
              type: 'success',
              duration: 1500,
              center: true,
            });
          } else {
            vm.$message({
              showClose: true,
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cashierDialog_3_Hide() {
      this.cashierDialog_3 = false;
    },
  },
  mounted() {
    this.init();
    if (this.UserId) {
      let payload = { UserId: this.UserId };
      payload = { Status: 1 };
      this.$store.dispatch('game/API_GameGroup', payload);
    }
  },
};
</script>
<style lang="scss" scoped>
.tgOverview{
  min-height: 600px;
}
.bankCard{
  height: 120px;
  border: solid 1px #d9d9d9;
  .bankCardBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-left: none;
    margin-right:-1px;
    margin-bottom:-1px;
  }
  .brand{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 30px;
  }
}
.PT{
  border-top: 4px solid #2d3478;
  .brand{
    background-color: #2d3478;
  }
}
.PG{
  border-top: 4px solid #000000;
  .brand{
    background-color: #000000;
  }
}
.PP{
  border-top: 4px solid #ff921e;
  .brand{
    background-color: #ff921e;
  }
}
.iconReload{
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.rotateUp{
  transform: rotate(90deg);
}
.rotateDown{
  transform: rotate(-90deg);
}
</style>
