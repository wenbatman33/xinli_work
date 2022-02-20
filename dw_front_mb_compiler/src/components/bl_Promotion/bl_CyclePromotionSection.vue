<template lang="pug">
  .cyclePromotionSection(v-if="card")
    .d-flex.justify-content-between.align-items-center
      .d-flex.flex-column.justify-content-between
        .cyclePromotionSection__title {{ card.promotion.data[0].promotionType.display }}
        .cyclePromotionSection__time.d-flex.align-items-center
          i.fas.fa-clock.mr-2
          | {{ card.promotionDetailUpdatedAt }}
      b-button.cyclePromotionSection__button.check(v-if="card.promotionDetailStatus.value === 2" @click="setCardOpen") {{ card.promotionDetailStatus.display }}
      b-button.cyclePromotionSection__button.receive(v-else-if="card.promotionDetailStatus.value === 3" @click="setCardOpen") {{ card.promotionDetailStatus.display }}
      b-button.cyclePromotionSection__button.received(v-else @click="setCardOpen") {{ card.promotionDetailStatus.display }}
</template>

<script>
export default {
  props: ['card', 'id'],
  methods: {
    setCardOpen() {
      this.$store.dispatch('index/setCardName', {
        card: 'bl_popPromotionDetail',
        promotion_detail_id: this.id,
      });
      this.$store.dispatch('promotion/API_PromotionDetailShow', this.id).then((result) => {
        this.$store.dispatch('index/setCardOpen', true);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.cyclePromotionSection {
  margin-bottom: $height-16;
  background-color: white;
  padding: $height-24 $width-20;
  border: 1px solid $origin_light;
  border-radius: 12px;

  &__title {
    font-size: $text-16;
    color: $navy_dark;
    margin-bottom: $height-12;
    text-align: left;
  }

  &__time {
    font-size: $text-12;
    color: $origin_dark;
  }

  &__button {
    font-size: $text-12;
    padding: $height-8 $width-16;
    border: none;
  }
}
// 待審核
.check {
  background-color: rgb(247, 186, 42);
}
// 待領取
.receive {
  background-color: rgb(19, 206, 102);
}
// 已領取
.received {
  background-color: $origin_dark;
}
</style>

