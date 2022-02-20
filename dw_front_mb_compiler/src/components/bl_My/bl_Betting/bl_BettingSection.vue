<template lang="pug">
  .bettingSection.mb-2(@click="openCard")
    .d-flex.mb-2.justify-content-between.align-items-center
      .bettingSection__time {{ game.betTime }}
      .bettingSection__status(:class="['danger', 'success', 'failed', 'failed'][game.betLogSatus.value]") {{ game.betLogSatus.display }}
    .bettingSection__title 投注内容
    .d-flex.justify-content-between
      .d-flex.flex-column
        .bettingSection__subTitle.mb-1 投注金額
        .bettingSection__subContent ¥{{ format(((game.betTotalAmount * 100) / 100).toFixed(2)) }}
      .d-flex.flex-column
        .bettingSection__subTitle.mb-1 输赢金额
        .bettingSection__subContent ¥{{ format(((game.betWinAmount * 100) / 100).toFixed(2)) }}
      .d-flex.flex-column
        .bettingSection__subTitle.mb-1 有效流水
        .bettingSection__subContent ¥{{ format(((game.betAmount * 100) / 100).toFixed(2)) }}
</template>

<script>
export default {
  props: ['game', 'company', 'type'],
  methods: {
    openCard() {
      this.$store.dispatch('member/API_MemberBetShow', {
        params: {
          id: this.game.id,
          game_type: this.type,
          company_tag: this.company,
        },
      }).then((res) => {
        this.$store.dispatch('index/setCardOpen', true);
        this.$store.dispatch('index/setCardName', {
          card: 'bl_BettingDetail',
        });
      })
    },
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return value;
    }
  },
}
</script>

<style lang="scss" scoped>
.bettingSection {
  padding: $height-24 $width-20;
  border: 1px solid $origin_light;
  border-radius: 12px;
  background-color: white;
  font-size: $text-14;

  &__time {
    color: $origin_dark;
  }

  &__title {
    font-weight: bold;
    font-size: $text-16;
    color: $navy_dark;
  }

  &__subTitle {
    color: $origin_dark;
    font-size: $text-14;
  }

  &__subContent {
    color: $navy_dark;
    font-size: $text-16;
  }
}

.success {
  color: rgb(19, 206, 102);
}

.pending {
  color: rgb(247, 186, 42);
}

.failed {
  color: rgb(255, 73, 73);
}
</style>

