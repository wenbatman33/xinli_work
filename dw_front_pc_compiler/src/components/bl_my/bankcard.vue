<template lang="pug">
.wrap.bankWarp
  .content.px-4
    .Breadcrumb
      span.highLight
        router-link(to='/my/detail') 安全中心 
      span / 银行卡管理
    .bankContent
      h6 默认银行卡
      .row
        .col-4.p-3(v-for='(item, index) in currentMemberBankCard')
          .bankCard
            .bankCardBG
              .oval_1
              .oval_2
            .bankCardCentent.p-2.d-flex.flex-row.align-items-center
              .bankLogo.mx-3
              .bankInfo.p-3
                p.m-0 {{ filterBankCodeMappingList(item.memberBankCode) }}
                p.m-0.bankNo {{item.memberBankNo}}
              el-dropdown.bankInfoHandleButton(trigger='click')
                span.el-dropdown-link 操作
                el-dropdown-menu(slot='dropdown')
                  el-dropdown-item(@click.native='changeCardDefault(item.id)', v-if='item.memberDefaultCard.value !==1') 设为默认卡
                  el-dropdown-item(@click.native='changeCardStatus(item.id, "0")') 停用银行卡
              .bankDisabledButton.d-flex.justify-content-center.align-items-center(v-if='item.memberStatus.value==0')
                el-button(type='success', @click='changeCardStatus(item.id, "1")') 启用
      h6 其他银行卡
      .row
        .col-4.p-3(v-for='(item, index) in MemberBankCardList')
          .bankCard.p-2.d-flex.flex-row.align-items-center
            .bankCard
            .bankCardBG
              .oval_1
              .oval_2
            .bankCardCentent.p-2.d-flex.flex-row.align-items-center
              .bankLogo.mx-3
              .bankInfo.p-3
                p.m-0 {{ filterBankCodeMappingList(item.memberBankCode) }}
                p.m-0.bankNo {{item.memberBankNo}}
              el-dropdown.bankInfoHandleButton(trigger='click')
                span.el-dropdown-link 操作
                el-dropdown-menu(slot='dropdown')
                  el-dropdown-item(@click.native='changeCardDefault(item.id)', v-if='item.memberDefaultCard.value !==1') 设为默认卡
                  el-dropdown-item(@click.native='changeCardStatus(item.id, "0")') 停用银行卡
              .bankDisabledButton.d-flex.justify-content-center.align-items-center(v-if='item.memberStatus.value==0')
                el-button(type='success', @click='changeCardStatus(item.id, "1")') 启用
        .col-4.p-3
          .addBankCard.d-flex.flex-column.justify-content-center.align-item-center(@click='openBankFormDialog')
            p.m-0
              i.fas.fa-id-card
            p.m-0 添加 新银行卡
    el-divider
    .des
      p 绑定银行卡说明 ：
      p 1、银行卡必须是同姓名银行卡。
      p 2、推荐用户停用银行卡，即使被盗用帐号，只能操作于您已启用的银行卡。
      p 3、目前暂不支持信用卡的绑定。
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('member', [
      'memberStatus',
    ]),
    ...mapState('wallet', [
      'memberWallet',
      'bankCodeMappingList',
      'memberBankCard',
    ]),
    currentMemberBankCard() {
      const result = this.$store.state.wallet.memberBankCard.filter(item => item.memberDefaultCard.value === 1);
      return result;
    },
    MemberBankCardList() {
      const result = this.$store.state.wallet.memberBankCard.filter(item => item.memberDefaultCard.value !== 1);
      return result;
    },
  },
  methods: {
    filterBankCodeMappingList(bankCode) {
      const result = this.bankCodeMappingList.filter(item => item.bankCode === bankCode);
      return result[0].bankName;
    },
    openBankFormDialog() {
      this.$store.dispatch('dialog/openCommandDialog_level2', { component: 'bl_BankForm' });
    },
    changeCardDefault(id) {
      const vm = this;
      const payload = {};
      payload.id = id;
      payload.default_card = 1;

      vm.$store.dispatch('wallet/patchMemberBankCard', payload)
        .then((res) => {
          //  完成后更新使用者银行卡列表
          vm.$message({ message: '修改成功', type: 'success' });
          vm.$store.dispatch('wallet/getMemberBankCard');
        });
    },
    changeCardStatus(id, status) {
      const vm = this;
      const payload = {};
      payload.id = id;
      payload.status = status;

      vm.$store.dispatch('wallet/patchMemberBankCard', payload)
        .then((res) => {
          //  完成后更新使用者银行卡列表
          vm.$message({ message: '修改成功', type: 'success' });
          vm.$store.dispatch('wallet/getMemberBankCard');
        });
    },
  },
  mounted() {
    // this.$store.dispatch('wallet/getBankCodeMappingList');
    // this.$store.dispatch('wallet/getMemberBankCard');
  },
};
</script>
<style lang="scss" scoped>
.bankWarp{
    .bankCard{
      position: relative;
      color: white;
      height: 130px;
      border-radius: 8px;
      box-shadow: 0 0 6px 0 $balckAlpha_10;
      overflow: hidden;
      .bankCardBG{
        position: absolute;
        z-index: 0;
        color: white;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 0 0 6px 0 $balckAlpha_10;
        background-image: linear-gradient(to bottom, $DW_Color, $DW_ColorDark);
        overflow: hidden;
        .oval_1{
          position: absolute;
          top: -640px;
          left: -200px;
          width: 800px;
          height: 800px;
          border-radius: 100%;
          background: $whiteAlpha_10;
        }
        .oval_2{
          position: absolute;
          top: -200px;
          left: -300px;
          width: 600px;
          height: 600px;
          border-radius: 100%;
          background: $whiteAlpha_10;
        }
      }
      .bankCardCentent{
        position: relative;
        z-index: 1;
        color: white;
        width: 100%;
        height: 100%;
      }
      .bankInfo{
        .bankNo{
          letter-spacing: 5px;
        }
      }
      .bankLogo{
        width: 60px;
        height: 60px;
        border-radius: 100%;
        background: white;
        overflow: hidden;
      }
      .bankInfoHandleButton{
        cursor: pointer;
        color: white;
        width: 72px;
        height: 32px;
        line-height: 32px;
        position: absolute;
        top: 0%;
        right: 0%;
        background: $whiteAlpha_40;
        border-radius: 0px 0px 0px 4px;
        text-align: center;
      }
      .bankDisabledButton{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0%;
        right: 0%;
        background: $balckAlpha_60;
        text-align: center;
      }
    }
    .addBankCard{
      cursor: pointer;
      text-align: center;
      color: $DW_Color;
      height: 130px;
      border-radius: 4px;
      box-shadow: 0 0 6px 0 $balckAlpha_10;
      border: 1px dashed $DW_Color;
      overflow: hidden;
      i{
        font-size: 48px;
        color: $DW_Color;
      }
    }
  }
  .des{
    font-size: 14px;
    line-height: 1.5;
    color: $garyBlue_Dark;
  }
  .Breadcrumb{
    width: 100%;
    height: 64px;
    left: 64px;
    line-height: 64px;
    color: $garyBlue_Dark;
  }
  .highLight{
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: $DW_Color;
    a{
      text-decoration: none;
      color: $DW_Color;
    }
  }
</style>

<style lang="scss">
.MAIN_LIGHT{
  .bankWarp{
    .bankCard{
      .bankCardBG{
        background-image: linear-gradient(to bottom, $L_DW_Color, $L_DW_ColorDark);
      }
    }
    .bankContent{
      // .bankCard{background-image: linear-gradient(to bottom, $L_DW_Color, $L_DW_ColorDark);}
      .addBankCard{
        color: $L_DW_Color; border: 1px dashed $L_DW_Color;
        i{color: $L_DW_Color;}
      }
    }
    .highLight{
      color: $L_DW_Color;
      a{color: $L_DW_Color;}
    }
  }
}
</style>
