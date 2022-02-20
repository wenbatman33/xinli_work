<template lang="pug">
  .transactionLogSection(v-if="card" @click="openCard")
    .transactionLogSection__type.py-1(:class="{'withdraw': card.type.value === 2}") {{ card.type.display }}
    .p-2
      .d-flex.justify-content-between.align-items.center.mb-1
        .transactionLogSection__date {{ card.createdAt }}
        .transactionLogSection__channel {{ card.payChannelServiceId.display }}
      .d-flex.justify-content-between.align-cards.center
        .transactionLogSection__money ¥{{ format(((card.amount * 100) / 100).toFixed(2)) }}
        .transactionLogSection__status1(v-if="card.status.value === 3") {{ card.status.display }}
        .transactionLogSection__status2(v-else-if="card.status.value === 2") {{ card.status.display }}
        .transactionLogSection__status3(v-else) {{ card.status.display }}
</template>

<script>
export default {
  props: ['card'],
  methods: {
    openCard() {
      this.$store.dispatch('payment/API_MemberTransactionLogDetail', {
        params: {
          type: this.card.type.value,
          order_id: this.card.orderId,
        },
      });
      this.$store.dispatch('index/setCardOpen', true);
      this.$store.dispatch('index/setCardName', {
        card: 'bl_TransactionLog',
      });
    },
    // 金錢加上千分位逗號
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return value;
    }
  }
}
</script>

<style lang="scss" scoped>
.transactionLogSection {
  background-color: white;
  border: 1px solid $origin_light;
  border-radius: 12px;
  width: 100%;
  font-size: $text-16;
  display: flex;
  flex-direction: column;
  margin-bottom: $height-12;

  &__type {
    background-color: rgb(19, 206, 102);
    font-size: $text-12;
    color: white;
    padding: 0 $width-18;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: fit-content;
    margin-top: -1px;
    margin-left: -1px;
  }

  &__date {
    font-size: $text-14;
    color: $origin;
  }

  &__channel {
    color: $navy_light;
  }

  &__money {
    color: $navy_dark;
  }

  &__status1 {
    color: rgb(19, 206, 102);
  }

  &__status2 {
    color: rgb(255, 73, 73);
  }

  &__status3 {
    color: rgb(247, 186, 42);
  }
}

.withdraw {
  background-color: rgb(255, 73, 73);
}
</style>
