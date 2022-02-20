<template lang="pug">
  div(v-if="isCreated")
    el-tabs(v-model="activeTab", @tab-click="handleClick")
      el-tab-pane(
        v-for="cardGroup in cardGroups",
        :key="cardGroup.key",
        :label="cardGroup.label",
        :name="cardGroup.key"
      )
      keep-alive
        component.bl--tab(
          :is="activeTab",
          :fieldPerms="fieldPerms",
          :buttonPerms="buttonPerms",
          :blockPerms="blockPerms",
          :class="{'is-change': change }",
          :group="activeTab",
          :account="account",
          :noteRequired="noteRequired"
        )
    el-button.position-absolute.bl-addCardButton(
      v-if="buttonPerms.addBankCard",
      size="mini",
      @click="$router.push('/bankCardDetail?title=新增银行卡')"
    ) 新增银行卡
</template>

<script>
import bankCardTable from './_table.vue';
import { getAccountListAPI } from '@/api/payment/account';

export default {
  components: {
    all: bankCardTable,
    SHOW_TYPE_DEPOSIT: bankCardTable,
    SHOW_TYPE_WITHDRAW: bankCardTable,
    SHOW_TYPE_TRANSFER: bankCardTable,
    SHOW_TYPE_THIRD: bankCardTable,
    SHOW_TYPE_REPOSIT: bankCardTable,
  },
  data() {
    return {
      isCreated: false,
      activeTab: '',
      cardGroups: [],
      change: false,
      account: [],
      noteRequired: []
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showAllBankCard')) {
      this.cardGroups.push({ label: '全部银行卡', key: 'all' });
    }

    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showDepositBankCard')) {
      this.cardGroups.push({ label: '存款卡', key: 'SHOW_TYPE_DEPOSIT' });
    }

    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showWithdrawalBankCard')) {
      this.cardGroups.push({ label: '出款卡', key: 'SHOW_TYPE_WITHDRAW' });
    }

    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showTransferBankCard')) {
      this.cardGroups.push({ label: '中转卡', key: 'SHOW_TYPE_TRANSFER' });
    }

    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showCheckoutBankCard')) {
      this.cardGroups.push({ label: '三方结帐卡', key: 'SHOW_TYPE_THIRD' });
    }

    if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'showStorehouseBankCard')) {
      this.cardGroups.push({ label: '仓库卡', key: 'SHOW_TYPE_REPOSIT' });
    }

    if (this.cardGroups.length === 0) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('您无权限！');
    } else {
      this.activeTab = this.cardGroups[0].key;
      this.isCreated = true;
      getAccountListAPI().then(response => {
        const noteRequired = [];
        this.account = response.data.data.reduce((result, account) => {
          const accountType = account.accTitleType ? account.accTitleType.value: 0;
          result.find(account => account.value === accountType.toString()).children.push({
            value: account.id,
            label: account.accTitleName
          });

          if (account.accTitleRequired && account.accTitleRequired.value) {
            noteRequired.push(account.id);
          }

          return result;
        }, [
          { value: '0', label: '支出', children: [] },
          { value: '1', label: '收入', children: [] }
        ]);

        this.noteRequired = noteRequired;
      });
    }
  },
  methods: {
    handleClick() {
      this.change = true;
      setTimeout(() => {
        this.change = false;
      }, 200);
    }
  }
}
</script>

<style lang="scss" scoped>
.bl-addCardButton {
  top: 10px;
  right: 30px;
}
</style>

<style lang="scss">
.bl--tab {
  opacity: 1;
  transition: opacity .4s ease-in-out;
  &.is-change {
    opacity: 0;
  }
}
</style>
