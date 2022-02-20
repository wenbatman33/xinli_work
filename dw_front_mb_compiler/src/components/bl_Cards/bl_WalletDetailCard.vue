<template lang="pug">
  .walletDetail
    .walletDetail__header 钱包明细
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .walletDetail__remind 提醒：仅显示游戏钱包内有余额的项目
    .walletDetail__main
      .walletDetail__main__item(v-for="(item, index) in allGames")
        i.fas.fa-redo.redo(@click="refresh(item.gameGroup.value, index)")
        .title {{ item.gameGroup.display }}
        .money(v-if="item.gameStatus.value === 1") ¥{{ format(((item.gameAmount * 100) / 100).toFixed(2).toString()) }}
        .status(v-else) {{ item.gameStatus.display }}
    button.walletDetail__button(@click="recycle") 一键收回
</template>

<script>
export default {
  data() {
    return {
      allGames: [],
    }
  },
  methods: {
    refresh(value, index) {
      this.$store.dispatch('payment/API_RefreshWalletDetail', {
        'company_tag': value,
      }).then((res) => {
        this.allGames[index] = res.data.data[0];
      });
    },
    recycle() {
      this.$store.dispatch('payment/API_RecyclingAllWallet').then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('payment/API_MemberWallet');
          this.$message({ message: '收回成功', type: 'success' });
        }
      })
    },
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return value;
    }
  },
  created() {
    this.$store.dispatch('payment/API_MemberWalletDetail').then((res) => {
      this.allGames = res.data.data;
    });
  },
}
</script>

<style lang="scss" scoped>
.walletDetail {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__remind {
    color: $origin_darkest;
    margin: $height-28 $width-28;
  }

  &__main {
    overflow: auto;
    padding: 0 $width-28;
    flex: 1;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid $origin_light;
      border-radius: 4px;
      padding: $height-10 0 1vh;
      text-align: center;
      width: 47%;
      height: 70px;
      margin-bottom: $height-8;
      position: relative;

      .redo {
        font-size: 10px;
        position: absolute;
        right: 8px;
        top: 8px;
        color: $theme;
      }

      .title {
        color: $origin_darkest;
        font-size: 16px;
      }

      .money {
        color: $origin;
        font-size: 14px;
      }

      .status {
        font-size: $text-12;
        color: red;
      }
    }
  }

  &__button {
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    font-size: $text-20;
    border: none;
    display: flex;
    justify-content: space-around;
  }
}
</style>
