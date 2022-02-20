<template lang="pug">
  .myPromotionSection.mt-1(v-if="Promotion")
    i.fas.fa-times-circle.cancel(v-if="trash" @click="openConfirmBox")
    .myPromotionSection__block(@click="openContentCard(card, card.promotionId, card.promotion.data[0].promotionTitle)")
      .myPromotionSection__block__title {{ Promotion.promotionTitle }}
      .myPromotionSection__block__content {{ Promotion.promotionSubTitle }}
      .myPromotionSection__block__remind
        .d-flex.align-items-center.mr-4(:class="{'status': Promotion.promotionApplyMethod.value === 2}")
          i.fas.fa-hourglass-half.mr-2(v-if="Promotion.promotionApplyMethod.value === 2")
          i.fas.fa-fire-alt.mr-2(v-else)
          | {{ Promotion.promotionApplyMethod.display }}参与
        .d-flex.align-items-center
          i.fas.fa-clock.mr-2
          | {{ PromotionStart }} ~ {{ PromotionEnd }}
    .myPromotionSection__button(v-if="PromotionMode.length > 1" @click="openCyclePage(card.promotionId)")
      b-button.w-50.mr-1.receive 待审核({{ card.promotionApplyMode[0].statusCnt }})
      b-button.w-50.check  待领取({{ card.promotionApplyMode[1].statusCnt }})
    .myPromotionSection__button(v-else)
      b-button.w-100(@click="openDetailCard(card.promotionId)" :class="{'check': card.promotionApplyMode[0].value === 2, 'receive': card.promotionApplyMode[0].value === 3}") {{ card.promotionApplyMode[0].display }}
</template>

<script>
export default {
  props: ["card", "trash"],
  methods: {
    openContentCard(card, id, name) {
      // promotionLinkMethod.value===2 時跳新頁籤
      if(card.promotion.data[0].promotionLinkMethod.value===2){
        window.open(card.promotion.data[0].promotionLinkPc, '_blank');
      } else {
        this.$matomo_mypromotion_name(name);
        this.$store.dispatch('promotion/API_PromotionDetail', id).then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            this.$store.dispatch('index/setCardName', {
              card: 'bl_popPromotion',
              id,
            });
            this.$store.dispatch('index/setCardOpen', true);
          }
        })
      }
    },
    openDetailCard(id) {
      this.$store.dispatch('promotion/API_MyPromotionDetail', id).then((res) => {
        this.$store.dispatch('index/setCardName', {
          card: 'bl_popPromotionDetail',
          promotion_detail_id: res.data.data[0].id,
        });
        this.$store.dispatch('promotion/API_PromotionDetailShow', res.data.data[0].id);
      });
    },
    openCyclePage(id) {
      this.$store.dispatch('index/setCardOpen', false);
      this.$router.push({ name: 'cycle', params: { id }}).catch(err => {});
    },
    giveUpPromotion(id) {
      const payload = {};
      payload.promotion_id = id;
      this.$store.dispatch('promotion/API_GiveUpPromotion', payload).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('promotion/API_IndexMyPromotion', 0);
          this.$message({ message: '刪除優惠成功', type: 'success'});
        }
      })
    },
    openConfirmBox() {
      if (this.Promotion.promotionApplyMethod.value === 2) {
        this.$confirm('提醒您！放弃优惠就不能再申请啰！', '优惠提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '按错了',
        }).then(() => {
          this.giveUpPromotion(this.card.promotionId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      } else if (this.Promotion.promotionApplyMethod.value === 1) {
        this.$alert('这个优惠不能放弃唷！', '优惠提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`,
            });
          }
        });
      }
    }
  },
  computed: {
    Promotion() {
      return this.card.promotion.data[0];
    },
    // 是否為週期性
    PromotionCycle() {
      if (this.Promotion) {
        return this.Promotion.promotionCycle;
      }
    },
    PromotionMode() {
      if (this.Promotion) {
        return this.Promotion.promotionApplyMode;
      }
    },
    PromotionStart() {
      if (this.Promotion) {
        return this.Promotion.promotionTimeStart.slice(0,10);
      }
    },
    PromotionEnd() {
      if (this.Promotion) {
        return this.Promotion.promotionTimeEnd.slice(0,10);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.myPromotionSection {
  border: 1px solid $origin_light;
  background-color: white;
  border-radius: 12px;
  margin-bottom: $height-16;
  position: relative;

  .cancel {
    position: absolute;
    right: -5px;
    top: -5px;
    font-size: $text-20;
    color: $origin;
  }

  &__block {
    padding: $height-24 $width-20 $height-16;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid $origin_light;

    &__title {
      color: $navy_dark;
      font-size: $text-16;
      margin-bottom: $height-12;
    }

    &__content {
      color: $navy_light;
      font-size: $text-14;
      margin-bottom: $height-12;
    }

    &__remind {
      color: $origin_dark;
      font-size: $text-12;
      display: flex;
      align-items: center;

      .status {
        color: rgb(248, 123, 9);
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $height-12 $width-20;

    button {
      // width: 100%;
      background-color: $origin_dark;
      border: none;
      font-size: $text-12;
    }
  }
}

// 待審核
.check {
  background-color: rgb(247, 186, 42) !important;
}
// 待領取
.receive {
  background-color: rgb(19, 206, 102) !important;
}
</style>
