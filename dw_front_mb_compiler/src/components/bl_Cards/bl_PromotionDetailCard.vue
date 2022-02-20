<template lang="pug">
  .promotionDetail(v-if="MyPromotionDetailShow[0] !== undefined")
    .promotionDetail__header 优惠明細
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .promotionDetail__title {{ MyPromotionDetailShow[0].promotion.data[0].promotionTitle }}
    .promotionDetail__main
      PromotionDetailForm(v-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 3" :id="PromotionId", :detail="MyPromotionDetailShow[0]")
      PromotionDetailReward(v-else-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 2" :id="PromotionId", :detail="MyPromotionDetailShow[0]")
      PromotionDetailBonus(v-else-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 1" :id="PromotionId", :detail="MyPromotionDetailShow[0]")
</template>

<script>
import { mapState } from "vuex";
import PromotionDetailForm from "@/components/bl_Promotion/bl_PromotionDetailForm.vue";
import PromotionDetailBonus from "@/components/bl_Promotion/bl_PromotionDetailBonus.vue";
import PromotionDetailReward from "@/components/bl_Promotion/bl_PromotionDetailReward.vue";

export default {
  components: {
    PromotionDetailForm,
    PromotionDetailBonus,
    PromotionDetailReward
  },
  computed: {
    ...mapState("promotion", ["MyPromotionDetailShow"]),
    PromotionId() {
      return this.MyPromotionDetailShow[0].promotionId;
    }
  }
};
</script>

<style lang="scss" scoped>
.promotionDetail {
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

  &__title {
    padding: $height-28 $width-24;
    color: $theme;
    font-size: $text-20;
    border-bottom: 1px solid $origin_light;
  }

  &__main {
    overflow: auto;
    flex: 1;
  }
}
</style>
