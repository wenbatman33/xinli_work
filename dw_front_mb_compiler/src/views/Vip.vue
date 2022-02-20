<template lang="pug">
  .vip
    img.w-100(:src="vip_img")
    .vipPromotion(:style="{ backgroundImage: 'url(' + vip_bg + ')'}")
      img.w-100(:src="vip_promotion_title")
      .tabGroup.mx-4.my-5
        .tab.w-50.py-3.px-4.text-center(@click="changeType('setting')" :class="{ 'active' : type === 'setting' }") VIP条件
        .tab.w-50.py-3.px-4.text-center(@click="changeType('promotion')" :class="{ 'active' : type === 'promotion' }") VIP优惠
      .main
        swiper.h-100.pb-5(:option="swiperOption" v-show="type === 'setting'")
          swiper-slide.text-center(v-for="item in indexVip" :key="item.id")
            .setting
              img.w-100(:src="vip_settingBg_up")
              .content.pt-1.px-4(:style="{ backgroundImage: 'url(' + vip_settingBg_mid +')' }")
                img.w-100(:src="getSettingImage(item.id)")
                img.w-100.mb-2(:src="vip_card_title")
                span 累计存款 / {{ item.vipDepositSum }} 元
                span 累计有效投注 / {{ item.vipBetSum }} 元
                span 保级流水要求 / {{ item.vipKeepBetSum }} 元
              img.w-100(:src="vip_settingBg_down")
        swiper.h-100.pb-5(:option="swiperOption" v-show="type === 'promotion'")
          swiper-slide.text-center(v-for="item in indexVip" :key="item.id")
            .detail
              img.w-100(:src="vip_promotionBg_up")
              .content.pt-1.px-5(:style="{ backgroundImage: 'url(' + vip_promotionBg_mid +')' }")
                img.w-50.mx-auto.mb-3(:src="item.vipImage1")
                p.sign VIP{{ item.id }}
                img.w-100.mb-2(:src="vip_card_dark_title")
                span 晋级礼金 / {{ item.vipLvBonus }} 元
                span 每月红包 / {{ item.vipMonthlyBonus }} 元
                span 生日礼金 / {{ item.vipBirthdayBonus }} 元
                span 春节礼金 / {{ item.vipNewYearBonus }} 元
                span 端午礼金 / {{ item.vipDragonBoatBonus }} 元
                span 中秋礼金 / {{ item.vipMidAutumnBonus }} 元
                span 国庆礼金 / {{ item.vipNationalDayBonus }} 元
                span 晋级梦基金 / {{ item.vipLvFund }} 元
                span 每月梦基金 / {{ item.vipMonthlyFund }} 元
                span 生日梦基金 / {{ item.vipBirthdayFund }} 元
              img.w-100(:src="vip_promotionBg_down")
    .vipRule.text-center(:style="{ backgroundImage: 'url(' + vip_bg_white + ')'}")
      img.w-100(:src="vip_rule_title")
      .main.m-4
        img.w-100(:src="vip_ruleBg_up")
        .content.w-100.pt-1.px-3(:style="{ backgroundImage: 'url(' + vip_ruleBg_mid + ')'}")
          .ruleList
            span(v-html="vipStatement")
        img.w-100(:src="vip_ruleBg_down")
    .copyright.py-3.w-100.text-center
      span Copyright © 2020 梦工厂版权所有
</template>

<script>
export default {
  data() {
    return {
      vip_img: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-banner@2x.png`,
      vip_bg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg@3x.png`,
      vip_promotion_title: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-title-2@3x.png`,
      vip_settingBg_up: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-up-mb@3x.png`,
      vip_settingBg_mid: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-mid-mb@3x.png`,
      vip_settingBg_down: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-down-mb@3x.png`,
      vip_promotionBg_up: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-dark-up-mb@3x.png`,
      vip_promotionBg_mid: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-dark-mid-mb@3x.png`,
      vip_promotionBg_down: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg-dark-down-mb@3x.png`,
      vip_card_title: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-title-mb@3x.png`,
      vip_card_dark_title: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-title-dark-mb@3x.png`,

      // setting
      vip_settingCard_vip1: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-1-mb@3x.png`,
      vip_settingCard_vip2: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-2-mb@3x.png`,
      vip_settingCard_vip3: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-3-mb@3x.png`,
      vip_settingCard_vip4: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-4-mb@3x.png`,
      vip_settingCard_vip5: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-5-mb@3x.png`,
      vip_settingCard_vip6: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-6-mb@3x.png`,
      vip_settingCard_vip7: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-7-mb@3x.png`,
      vip_settingCard_vip8: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-8-mb@3x.png`,
      vip_settingCard_vip9: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-9-mb@3x.png`,
      vip_settingCard_vip10: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-10-mb@3x.png`,

      // rule
      vip_bg_white: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-wbg@3x.png`,
      vip_rule_title: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-title-3@3x.png`,
      vip_ruleBg_up: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-up-pc@3x.png`,
      vip_ruleBg_mid: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-mid-pc@3x.png`,
      vip_ruleBg_down: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-down-pc@3x.png`,
      type: 'setting',
      swiperOption: {
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      indexVip: [],
      vipStatement: '',
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    getSettingImage(id) {
      return this[`vip_settingCard_vip${id}`];
    },
    getData() {
      this.$store.dispatch('index/API_IndexVip').then((res) => {
        this.indexVip = res.data.data.slice(0, 10);
      });
      this.$store.dispatch('index/API_vipStatement').then((res) => {
        this.vipStatement = res.data.data[0].vipStatement;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.vipPromotion {
  background-size: cover;
  padding-top: 8vh;
  display: flex;
  flex-direction: column;

  .tabGroup {
    border-radius: 40px;
    display: flex;
    color: #ba924e;
    background-color: #343434;

    .tab {
      border-radius: 40px;
      &.active {
        background-color: #ffffff;
      }
    }
  }

  .main {

    .setting {
      color: #ba924e;
      display: flex;
      flex-direction: column;
      width: 80%;
      margin: 0 auto;
      height: 100%;

      .content {
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: 30px;
      }
    }

    .detail {
      color: white;
      display: flex;
      flex-direction: column;
      width: 80%;
      margin: 0 auto;
      height: 100%;

      .content {
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: 25px;

        .sign {
          color: #ba924e;
          font-size: 20px;
        }
      }
    }
  }
}

.vipRule {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 11vh;
  background-size: cover;

  .main {
    display: flex;
    flex-direction: column;

    .content {
      background-size: contain;
      overflow: auto;
      color: #ba924e;
      text-align: left;
      line-height: 35px;
    }
  }
}

.copyright {
  background-color: black;
  color: white;
}
</style>
