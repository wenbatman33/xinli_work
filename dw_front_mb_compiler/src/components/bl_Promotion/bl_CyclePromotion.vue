<template lang="pug">
  .cyclePromotion(v-if="MyPromotionDetail[0]")
    .cyclePromotion__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      a(href="#" @click="back")
        i.fas.fa-chevron-left
      p 活动详情
    .cyclePromotion__title
      p {{ MyPromotionDetail[0].promotion.data[0].promotionTitle }}
      p {{ MyPromotionDetail[0].promotion.data[0].promotionSubTitle }}
    .cyclePromotion__main(v-if="MyPromotionDetail.length > 0")
      CyclePromotionSection(v-for="item in MyPromotionDetail" :card="item" :id="item.id")
    .cyclePromotion__main(v-else)
      img(:src='image1' width="100%")
      .noPromotion 暂无优惠
</template>

<script>
import { mapState } from 'vuex';
import CyclePromotionSection from '@/components/bl_Promotion/bl_CyclePromotionSection.vue';

export default {
  components: {
    CyclePromotionSection,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      image1: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
      backRoute: '',
    };
  },
  methods: {
    back() {
      this.$router.push({ name: this.backRoute }).catch((err) => {});
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('promotion', [
      'MyPromotionDetail',
    ]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 設定返回router 如果直接連到網址上一頁返回首頁
      if (from.name === null) {
        vm.backRoute = 'home';
      } else {
        vm.backRoute = from.name;
      }
    });
  },
  created() {
    this.$store.dispatch('promotion/API_MyPromotionDetail', this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.cyclePromotion {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;

    a {
      position: absolute;
      left: $width-24;
      color: white;
    }

    p {
      margin: 0;
    }
  }

  &__title {
    padding: $height-24 $width-24 $height-20;

    p {
      margin: 0;
      font-size: $text-14;
      color: $origin_dark;

      &:first-child {
        font-size: $text-20;
        color: $navy_dark;
        margin-bottom: $height-12;
      }
    }
  }

  &__main {
    padding: $height-24 $width-24 0;
    flex: 1;
    overflow: auto;
    text-align: center;
  }

  .noPromotion {
    color: $origin_dark;
    font-size: $text-16;
  }
}
</style>
