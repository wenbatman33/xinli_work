<template lang="pug">
  .promotionDetailForm(v-if="Promotion")
    .promotionDetailForm__main
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 优惠类型
        .promotionDetailForm__main__content.col-9.px-0 {{detail.promotion.data[0].promotionType.display}}
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 优惠奖励
        .promotionDetailForm__main__content.col-9.px-0 ¥ {{format((((detail.promotionBonus * 100) / 100)).toFixed(2))}}
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 提款要求
        .promotionDetailForm__main__content.col-9.px-0 流水达 ¥ {{format((((detail.promotionWithdrawBetamount * 100) / 100)).toFixed(2))}} 元以上
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 更新时间
        .promotionDetailForm__main__content.col-9.px-0 {{detail.promotionDetailUpdatedAt}}
    button.promotionDetailForm__button(v-if="Promotion.promotionDetailStatus.value === 3" @click="getBonus") {{ Promotion.promotionDetailStatus.display}}
    button.promotionDetailForm__button(v-else :class="Promotion.promotionDetailStatus.value === 2 ? 'waitingCheck' : 'disabled'" disabled) {{ Promotion.promotionDetailStatus.display}}
</template>

<script>
export default {
  props: ["id", "detail"],
  data() {
    return {
      form: {}
    };
  },
  methods: {
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value
          .toString()
          .replace(
            /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
            (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
          );
      }
      return value;
    },
    getBonus() {
      if (this.Promotion.promotion.data[0].promotionApplyMode[0].value === 6) {
        this.$message({ message: "已放棄的獎勵", type: "error" });
      } else {
        this.form.promotion_detail_id = this.id;
        this.$store.dispatch("promotion/API_MyPromotionBonus", this.form).then(res => {
          if (res.state === 1) {
            this.$message({ message: res.message, type: "success" });
          } else {
            this.$message({ message: res.message, type: "error" });
          }
        });
      }
    }
  },
  computed: {
    Promotion() {
      return this.$store.state.promotion.MyPromotionDetailShow[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.promotionDetailForm {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__main {
    overflow: auto;
    flex: 1;
    padding: $width-28 $width-24 0;

    &__title {
      color: $origin_dark;
      font-size: $text-16;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    &__content {
      color: $navy_light;
      font-size: $text-16;

      ::placeholder {
        color: $origin;
      }
    }
  }

  &__button {
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    font-size: $text-20;
    border: none;
  }
}

.active {
  color: $theme;
}

.inactive {
  color: $origin;
}

.disabled {
  background-color: $origin_dark;
}

.waitingCheck {
  background-color: $secondaryYellow;
}

.dark_mode {
  .promotionDetailForm {
    &__main {
      &__title {
        color: white;
      }

      &__content {
        color: $origin;
      }
    }
  }
}
</style>
