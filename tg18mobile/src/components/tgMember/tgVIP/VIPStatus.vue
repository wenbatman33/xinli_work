<template lang='pug'>
  .content
    memberState
    section
      .VIPMember
        .VIPMemberBG
        .VIPMemberContent.p-4.pt-5
          .row
            .col-8
              p.text-white 您好，
                router-link(to='/vip')
                  span.badge.px-2
                    span(v-if='MemberVIPData.UserLevel<=1') 铁 
                    i.el-icon-star-on(v-if='MemberVIPData.UserLevel>=2')
                    span(v-if='MemberVIPData.UserLevel>=2') {{ MemberVIPData.UserLevel-1 }} 
              p.UserName.text-white {{UserName}}
              p.info.mt-3 晋级条件 
                br
                | {{MemberVIPData.PayAmount | commaFormat}} / {{MemberVIPData.VipFullAmount | commaFormat}}
            .col-4.text-right
              img.vipIcon(:src='MemberVIPData.VipImages')
          .row
            .col-12
              .mt-3
                el-progress.VIPprogress(v-if='MemberVIPData.UserLevel<8', :percentage="MemberVIPData.Schedule", :show-text='false')
                el-progress.highVIPprogress(v-else, :percentage="MemberVIPData.Schedule", :show-text='false')
          .row
            .col-12
              .my-3
                span.text-white.float-left 中心钱包
                span.totalAccount.float-right ¥ {{parseFloat(totalAccount).toFixed(2) | commaFormat}}
      .VIPFloatButton.text-center
        router-link(to='/vip')
          el-button.VIPButton VIP 独享权益
</template>
<script>
import axios from 'axios';
import memberState from '@/components/tgMember/memberState.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      submitLoading: false,
    };
  },
  components: {
    memberState,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWallet',
      'MemberGameWalletCommon',
      'MemberGameWalletNormal',
      'MemberVIPData',
    ]),
    Cash() {
      return this.MemberWallet.Cash;
    },
    LockCash() {
      return this.MemberWallet.LockCash;
    },
    totalAccount() {
      return (Number(this.MemberWallet.Cash) + Number(this.MemberWallet.LockCash));
    },
    haveGameMoney() {
      let total = 0;
      if (Object.keys(this.MemberGameWallet).length > 0) {
        const vm = this;
        Object.keys(this.MemberGameWallet).map((objectKey, index) => {
          const value = vm.MemberGameWallet[objectKey];
          if (value[1].toString().indexOf(',') >= 0) {
            total += Number(value[1].replace(/,/g, ''));
          } else {
            total += Number(value[1]);
          }
          
          return total;
        });
      } 
      return !(total > 0);
    },
  },
  watch: {
    haveGameMoney(val, oldVal) {
      this.submitLoading = false;
    },
  },
  methods: {
    getAllMoney() {
      this.GA_wallet_takeallmobile();
      this.submitLoading = true;
      const vm = this;
      const payload = { UserId: this.UserId };
      console.log(payload);
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.sendMessage();
            vm.transferFinish();
          } else {
            vm.errorMessage(res.data.error_message);
          }
          vm.submitLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 1500,
        center: true,
      });
    },
    sendMessage() {
      this.$message({
        message: '成功收回中心钱包',
        type: 'success',
        duration: 1500,
        center: true,
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
    // console.log(this.submitLoading)
  },
};
</script>
<style lang="scss" scoped>
/*-- Member --*/
.VIPMember {
  position: relative;
  width: 100%;
  min-height: 240px;
  .VIPMemberBG{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url(/static/img/member_caption.svg) 50% 50% no-repeat, linear-gradient( 302deg, rgba(0,63,163,1), rgba(0,19,50,1));
    background-size: cover;
  }
  .VIPMemberContent{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
.vipIcon{
  width: 100%;
  max-width: 120px;
}
.UserName{
  font-size: 1.3rem;
}
.info {
  color: #1890ff;
  font-size: 1rem; 
}
@media (min-width: 320px) and (max-width:420px){
  .info { font-size: 0.8rem; }
}
@media (min-width: 421px) and (max-width:720px) {
  .info { font-size: 1.2rem; }
}
.badge{
  color: #fff;
  border-radius: 18px;
  background-color: #1890ff;
  font-size: 16px;
  i{
    font-size: 16px;
  }
}
.totalAccount{
  font-size: 1.2rem;
  color: rgba(250,219,20,1);
}
.VIPFloatButton{
  position: absolute;
  width: 100%;
  margin-top: -20px;
}
.VIPButton{
  font-size: 16px !important;
  line-height: 45px !important;
  padding: unset !important;
  border: unset !important;
  display: inline-block;
	width: 70%;
	width: 0 auto;
	background: rgba(0,80,179,1) !important;
	color: rgba(255,255,255,1) !important;
	font-family: 'PingFangTC';
	font-size: 30px;
	line-height: 90px;
	border-radius: 50px;
	box-shadow: 0 8px 30px 0 rgba(0,80,179,0.4);
	cursor: pointer;
}
</style>
<style lang="scss">
.VIPprogress{
  .el-progress-bar{
    .el-progress-bar__outer{
      background: rgba(0, 0, 0, 0.8)!important;
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
.VIPBadgeprogress{
  .el-progress-bar__outer{
    height: 2px !important;
  }
  .el-progress-bar__inner{
    background-color: #BF8329;
  }
}
</style>
