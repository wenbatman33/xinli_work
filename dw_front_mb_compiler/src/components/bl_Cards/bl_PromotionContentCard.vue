<template lang="pug">
  .promotion(v-if="PromotionDetail[0] !== undefined")
    .promotion__header 优惠内容
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .promotion__main
      .promotion__main__title {{ PromotionDetail[0].promotionTitle }}
      .promotion__main__content(v-html="PromotionDetail[0].promotionContent")
    button.promotion__button(v-if="PromotionMode.length > 1" @click="showCyclePage(PromotionDetail[0].id)") 待审核({{ PromotionMode[0].statusCnt }}) | 待领取({{ PromotionMode[1].statusCnt }})
    button.promotion__button(v-else-if="PromotionMode[0].value === 0 || PromotionMode[0].value === 6" @click="applyPromotion(PromotionMode[0].value)") {{ PromotionMode[0].display}}
    button.promotion__button(v-else @click="showDetailCard(PromotionDetail[0].id)") {{ PromotionMode[0].display}}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  methods: {
    applyPromotion(status) {
      if (window.localStorage.getItem('JWT_TOKEN')) {
        if (status === 0) {
          const payload = {
            "promotion_id": this.PromotionDetail[0].id,
            "check_apply": 1,
          };
          this.$store.dispatch('promotion/API_ApplyPromotion', payload).then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              this.$store.dispatch('promotion/API_PromotionDetail', this.$route.query.id);
              this.$message({ message: '參加成功', type: 'success' });
            }
          });
        }
      } else {
        this.$store.dispatch('index/setCardOpen', false);
        this.$router.push('/login').catch((err) => {});
      }
    },
    showDetailCard(id) {
      this.$store.dispatch('promotion/API_MyPromotionDetail', id).then((res) => {
        this.$store.dispatch('index/setCardName', {
          card: 'bl_popPromotionDetail',
          promotion_detail_id: res.data.data[0].id,
        });
        this.$store.dispatch('promotion/API_PromotionDetailShow', res.data.data[0].id);
      });
    },
    showCyclePage(id) {
      this.$store.dispatch('index/setCardOpen', false);
      this.$router.push({ name: 'cycle', params: { id }}).catch(err => {});
    },
  },
  computed: {
    ...mapState('promotion', [
      'IndexPromotion',
      'PromotionDetail',
    ]),
    ...mapGetters('promotion',[
      'PromotionMethod',
      'PromotionMode',
      'PromotionCycle',
    ]),
  },
  created() {
    this.$store.dispatch('promotion/API_PromotionDetail', this.$route.query.id);
  },
}
</script>

<style lang="scss" scoped>
.promotion {
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

  &__main {
    padding: $width-28 $width-24 0;
    overflow: auto;
    flex: 1;

    &__title {
      font-size: $text-20;
      color: $theme;
      margin-bottom: $width-16;
    }

    &__time {
      font-size: $text-16;
      color: $navy_light;
      margin-bottom: $width-8;
    }

    &__content {
      font-size: $text-16;
      color: $navy_light;

      /deep/ img {
        width: 100%;
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

.disabled {
  background-color: $origin_dark;
}
</style>

<style lang="scss">
.promotion__main__content{
  table{
    border: 1px solid #333333 !important;
    td{
      border: 1px solid #333333 !important;
    }
  }
}
</style>