<template lang="pug">
  .myPromotion
    .myPromotion__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/my")
        i.fas.fa-chevron-left
      p 我的优惠
      i.far.fa-trash-alt(@click="cancel = !cancel")
    .myPromotion__tag
      .myPromotion__tag__button(@click="changeFinished(false)" :class="{'finished': !finished}") 未完成
      .myPromotion__tag__button(@click="changeFinished(true)" :class="{'finished': finished}") 已完成
    .myPromotion__main(v-if="!finished")
      MyPromotionSection(v-for="item in IndexMyPromotionUnfinished" :card="item" :trash="cancel")
    .myPromotion__main(v-else)
      MyPromotionSection(v-for="item in IndexMyPromotionFinished" :card="item")
</template>

<script>
import { mapState } from 'vuex';
import MyPromotionSection from '@/components/bl_My/bl_MyPromotion/bl_MyPromotionSection.vue';

export default {
  components: {
    MyPromotionSection,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      finished: false,
      cancel: false,
    };
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('promotion', [
      'IndexMyPromotionFinished',
      'IndexMyPromotionUnfinished',
    ]),
  },
  methods: {
    changeFinished(boolean) {
      this.finished = boolean;
      (boolean) ? this.$matomo_mypromotion_type('未完成') : this.$matomo_mypromotion_type('已完成');
    },
  },
  created() {
    this.$store.dispatch('promotion/API_IndexMyPromotion', 0);
    this.$store.dispatch('promotion/API_IndexMyPromotion', 1);
    this.$store.dispatch('promotion/API_IndexPromotion');
  },
};
</script>

<style lang="scss" scoped>
.myPromotion {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-size: cover;

    a {
      color: white;
    }

    p {
      margin: 0;
    }
  }

  &__tag {
    padding: $height-20 $width-24;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $text-16;

    &__button {
      background-color: $origin_light;
      border-radius: 20px;
      padding: $height-12 $width-48;
      color: $origin_darkest;
    }
  }

  &__main {
    padding: 0 $width-24;
    flex: 1;
    overflow: auto;
  }
}

.finished {
  background-color: $theme !important;
  color: white !important;
}
</style>
