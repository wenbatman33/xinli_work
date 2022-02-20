<template lang="pug">
.container-fluid.h-100
  .memberShip.d-flex.flex-column.h-100
    .memberButtonGroup
      .d-flex.flex-row.justify-content-center.align-items-center
        router-link(to='/my/personal', @click.native='$matomo_my_personal')
          .myNaviButton.mx-3(:class='[link==="/my/personal" ? "active": ""]')
            i.fas.fa-user
          .myNaviButtonTitle 个人资料
        router-link(to='/my/transactionlog', @click.native='$matomo_my_transactionlog')
          .myNaviButton.mx-3(:class='[link==="/my/transactionlog" ? "active": ""]')
            i.fas.fa-coins
          .myNaviButtonTitle 资金纪录
        router-link(to='/my/betting', @click.native='$matomo_my_betting')
          .myNaviButton.mx-3(:class='[link==="/my/betting" ? "active": ""]')
            i.fas.fa-dice-six
          .myNaviButtonTitle 我的投注
        router-link(to='/my/mypromotion', @click.native='$matomo_my_mypromotion')
          .myNaviButton.mx-3(:class='[link==="/my/mypromotion" ? "active": ""]')
            i.fas.fa-gift
          .myNaviButtonTitle 我的优惠
        router-link(to='/my/detail', @click.native='$matomo_my_detail')
          .myNaviButton.mx-3(:class='[link==="/my/detail" ? "active": ""]')
            i.fas.fa-shield-alt
          .myNaviButtonTitle 安全中心
        router-link(to='/my/inbox', @click.native='$matomo_my_inbox')
          .myNaviButton.mx-3(:class='[link==="/my/inbox" ? "active": ""]')
            i.fas.fa-envelope
          .myNaviButtonTitle 我的消息
    .memberShipContent.d-flex.flex-grow-1.justify-content-center.align-content-center
      router-view 
  bl_Footer
</template>

<script>
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';
import router from '@/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Footer,
  },
  data() {
    return {
      link: '',
      bgImage: `${window.CDN_ASSETS}/static/img/upload/CentreCourt.jpg`,
      memberWalletBgImage: `${window.CDN_ASSETS}/static/img/memberWalletBg.png`,
    };
  },
  watch: {
    $route(to, from) {
      this.setLink();
    },
  },
  computed: {
    ...mapState('member', [
      'memberStatus',
      'memberProfile',
      'memberInbox',
      'memberInboxLength',
      'PersonalDetail',
    ]),
    ...mapState('wallet', [
      'memberWallet',
      'bankCodeMappingList',
      'memberBankCard', 
    ]),

    memberPofilePicture() {
      return `${window.CDN_ASSETS}/static/img/memberPofilePicture/avater_${this.PersonalDetail.memberPofilePicture}.png`;
    },
  },
  methods: {
    setLink() {
      this.link = this.$route.path;
    },
    getAllWallet() {
      // const vm = this;
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_AllWallet' } });
    },
    recylingAllWallet() {
      const vm = this;
      this.$store.dispatch('wallet/recylingAllWallet')
        .then((res) => {
          vm.$message({ message: '回收游戏钱包成功', type: 'success' });
          vm.$store.dispatch('wallet/getMemberWallet');
        });
    },
  },
  mounted() {
    this.setLink();
    this.$store.dispatch('wallet/getBankCodeMappingList');
    this.$store.dispatch('wallet/getMemberBankCard');
    this.$store.dispatch('wallet/getMemberWallet');
  },
};
</script>
<style lang="scss">
// my
.wrap{
  width: 100%;
  overflow: auto;
  min-height: 600px;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 $balckAlpha_10;
  border: solid 1px $garyBlue_lightest;
  background-color: white;
}
.nullData {
  min-height: 400px;
  color: $garyBlue_light;
}
.memberShip{
  padding: 0;
  overflow: auto; 
  position: relative;
  .memberButtonGroup {
    width: 100%;
    height: 100px;
    padding: 20px;
    .myNaviButton{
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 12px;
      box-shadow: 0 0 20px 0 $DW_ColorAlpha_40;
      background-color: $DW_ColorAlpha_20;
      color: $DW_Color;
      cursor: pointer;
      border: 1px $DW_Color solid;
    }
    .active{
      background: $DW_Color;
      color: white;
    }
    .myNaviButtonTitle{
      margin: 10px 0;
      text-align: center;
      font-size: 14px;
      color: white;
    }
  }
  .memberShipContent{
    position: relative;
    min-height: 400px;
    padding: 20px 40px;
    overflow: auto;
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .memberShip{
    .memberButtonGroup {
      .myNaviButton{
        box-shadow: 0 0 20px 0 $L_DW_ColorAlpha_40;
        background-color: white;
        color: $L_DW_Color;
        border: 1px $L_DW_Color solid;
      }
      .active{
        color: white;
        background: $L_DW_Color;
      }
      .myNaviButtonTitle{
        margin: 10px 0;
        text-align: center;
        font-size: 14px;
        color: $gray_333;
      }
    }
  }
}
</style>
