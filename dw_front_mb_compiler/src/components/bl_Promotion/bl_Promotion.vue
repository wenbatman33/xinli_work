<template lang="pug">
  .promotion
    .promotion__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/")
        i.fas.fa-chevron-left
      p 优惠活动
    b-nav.promotion__tabGroup
      b-nav-item.promotion__tab(v-for="(item, index) in type" @click="setActiveType(item, index)" :key="item")
        p {{ index }}
        .promotion__tab--active(v-if="activeType === item")
    .promotion__main
      PromotionSection(v-for="item in IndexPromotion" :card="item" :key="item.id")
    Footer
</template>

<script>
import { mapState } from 'vuex';
import PromotionSection from '@/components/bl_Promotion/bl_PromotionSection.vue';
import Footer from '@/components/bl_Footer/bl_Footer.vue';

export default {
  components: {
    PromotionSection,
    Footer,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      activeType: 0,
      type: {
        全部: 0,
        节日: 1,
        体育: 2,
        真人: 3,
        棋牌: 4,
        电子: 5,
        彩票: 6,
        VIP: 7,
      },
    };
  },
  methods: {
    setActiveType(value, index) {
      this.$matomo_tabBar_promotionGroup(index);
      this.activeType = value;
      this.$store.dispatch('promotion/API_IndexPromotion', {
        params: {
          promotion_group_id: value,
        },
      });
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('promotion', [
      'IndexPromotion',
    ]),
  },
  mounted() {
    document.querySelector('.promotion__main').addEventListener('touchmove', (e) => {
      e.stopPropagation();
    });
  },
  created() {
    this.$store.dispatch('promotion/API_IndexPromotion');
  },
};
</script>

<style lang="scss" scoped>
.promotion {
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

  .el-scrollbar {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);

    .el-scrollbar__thumb {
      display: none;
    }
  }

  &__tabGroup {
    flex-wrap: nowrap;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(255,33,33,0.0);
      border-radius: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 0px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
      background-color: transparent;
    }

    .promotion__tab {
      white-space: nowrap;
      font-size: $text-16;

      a {
        color: $navy_light;
        padding: $height-12 $width-18 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      p {
        margin-bottom: $height-16;
      }

      &--active {
        width: $width-28;
        height: 5px;
        background-color: $theme;
        border-radius: 10px;
      }
    }

    .bar {
      border: 2px solid red;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    padding: $height-20 $width-24 0;
    flex: 1;
    overflow: auto;
    padding-bottom: 70px;
  }
}
</style>
