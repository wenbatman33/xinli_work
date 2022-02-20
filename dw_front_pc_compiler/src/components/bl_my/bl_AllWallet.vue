<template  lang="pug">
.w-100
  .allWalletTitle 钱包明细
  .allWalletList.px-5.py-3
    .row(v-if='UserGameCash.length<=0')
      .col-12.d-flex.justify-content-center.align-items-center.nullData
        .text-center
          img(:src='nullPoromotion')
          p 暂无纪录
    .row(v-else)
      .col-3.my-2(v-for='(item, index) in UserGameCash')
        .d-flex.flex-column.justify-content-center.align-items-center.walletItem
          .name {{item.gameGroup.display}}
            i.el-icon-refresh.ml-1(@click='refreshCompanyWallet(item.gameGroup.value, index)')
          .amount ¥ {{item.gameAmount | commaFormat}}
          .status(v-if='item.gameStatus.value !== 1', :class='[(item.gameStatus.value !==1 )?"errorText":""]') {{item.gameStatus.display}}
    .row.no-gutters.my-3
      .col-12
        el-button.w-100(type='primary', @click='recylingAllWallet')  一键收回
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      nullPoromotion: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
    };
  },
  computed: {
    ...mapState('wallet', [
      'UserGameCash',
    ]),
  },
  methods: {
    recylingAllWallet() {
      const vm = this;
      this.$store.dispatch('wallet/recylingAllWallet')
        .then((res) => {
          vm.$message({ message: '回收游戏钱包成功', type: 'success' });
          vm.$store.dispatch('wallet/getMemberWallet');
          vm.$store.dispatch('wallet/getUserGameCash');
        });
    },
    refreshCompanyWallet(tag, index) {
      console.log(tag);
      const payload = { company_tag: tag, currentIndex: index };
      this.$store.dispatch('wallet/refreshCompanyWallet', payload);
    },
  },
  mounted() {
    this.$store.dispatch('wallet/getUserGameCash');
  },
};
</script>

<style lang="scss" scoped>
.allWalletTitle{
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  color: white;
  text-align: center;
  background-image: linear-gradient(274deg, $DW_Color, $DW_ColorDark);
}
.name{
  font-size: 14px;
  i{
    cursor: pointer;
    font-weight: 600;
    color: $gray_666;
  }
}
.status{
  text-align: center;
  font-size: 12px;
}
.walletItem{
  min-height: 80px;
  border-radius: 4px;
  border: solid 1px $garyBlue_lightest;
  background-color: white;
}
.errorText{
  color: $DW_orange;
}
</style>
