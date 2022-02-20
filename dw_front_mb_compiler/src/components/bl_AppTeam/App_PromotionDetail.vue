<template lang="pug">
  .promotionDetail(v-if="Promotion")
    .promotionDetail__header 优惠明細
      i.fas.i.fa.fa-headphones(@click="service")
    .promotionDetail__title {{ MyPromotionDetailShow[0].promotion.data[0].promotionTitle }}
    .promotionDetail__main
      PromotionDetailForm(v-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 3" :id="MyPromotionDetailShow[0].id", :detail="MyPromotionDetailShow[0]")
      PromotionDetailReward(v-else-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 2" :id="MyPromotionDetailShow[0].id", :detail="MyPromotionDetailShow[0]")
      PromotionDetailBonus(v-else-if="MyPromotionDetailShow[0].promotion.data[0].promotionType.value === 1" :id="MyPromotionDetailShow[0].id", :detail="MyPromotionDetailShow[0]")
</template>

<script>
import { mapState } from 'vuex';
import PromotionDetailForm from '@/components/bl_Promotion/bl_PromotionDetailForm.vue';
import PromotionDetailBonus from '@/components/bl_Promotion/bl_PromotionDetailBonus.vue';
import PromotionDetailReward from '@/components/bl_Promotion/bl_PromotionDetailReward.vue';

export default {
  components: {
    PromotionDetailForm,
    PromotionDetailBonus,
    PromotionDetailReward,
  },
  data() {
    return {
      ProvinceName: [],
      CityName: [],
      StateName: [],
      form: {
        promotion_detail_id: '',
        province: '',
        city: '',
        state: '',
        address: '',
      },
      checked: false,
    };
  },
  methods: {
    service() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_service();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_service.postMessage('app_service');
        } catch (error) {
          console.log(error);
        }
      }
    },
    getProvince() {
      this.$store.dispatch('member/API_IndexAddress').then((res) => {
        console.log(res);
        this.ProvinceName = res.data.data;
      });
    },
    getCity(provinceId) {
      this.form.city = '';
      this.form.state = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: provinceId,
        },
      }).then((res) => {
        console.log(res);
        this.CityName = res.data.data;
      });
    },
    getState(cityId) {
      this.form.state = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: this.form.province,
          city_id: cityId,
        },
      }).then((res) => {
        console.log(res);
        this.StateName = res.data.data;
      });
    },
    getBonus() {
      if (this.Promotion.promotion.data[0].promotionApplyMode[0].value === 6) {
        this.$message({ message: '已放棄的獎勵', type: 'error' });
      } else {
        this.form.promotion_detail_id = this.$route.query.id;
        this.$store.dispatch('promotion/API_MyPromotionBonus', this.form).then((res) => {
          if (res.state === 1) {
            if (window.navigator.userAgent.indexOf('Android') > 0) {
              window.android.bonus_success();
            } else {
              try {
                window.webkit.messageHandlers.bonus_success.postMessage('bonus_success');
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            if (window.navigator.userAgent.indexOf('Android') > 0) {
              window.android.bonus_failed();
            } else {
              try {
                window.webkit.messageHandlers.bonus_failed.postMessage('bonus_failed');
              } catch (error) {
                console.log(error);
              }
            }
          }
        });
      }
    },
    // for appteam methods
    token_expired() {
      console.log('token_expired');
    },
    bonus_success() {
      console.log('bonus_success');
    },
    bonus_failed() {
      console.log('bonus_failed');
    },
  },
  computed: {
    ...mapState('promotion', [
      'MyPromotionDetailShow',
    ]),
    Promotion() {
      return this.MyPromotionDetailShow[0];
    },
    formValidate() {
      if (this.form.province === '' || this.form.city === '' || this.form.state === '' || this.form.address === '') {
        return false;
      }
      return true;
    },
  },
  created() {
    window.localStorage.removeItem('JWT_TOKEN');
    window.localStorage.removeItem('Finger');
  },
  mounted() {
    if (this.$route.query.token && this.$route.query.finger && this.$route.query.id) {
      // 黑夜以及白天模式
      if (this.$route.query.mode === 'dark') {
        this.$store.commit('index/setDarkMode', true);
      } else {
        this.$store.commit('index/setDarkMode', false);
      }
      // 帶token & finger
      window.localStorage.setItem('JWT_TOKEN', this.$route.query.token);
      window.localStorage.setItem('Finger', this.$route.query.finger);
      // 拿資料
      this.$store.dispatch('promotion/API_PromotionDetailShow', this.$route.query.id);
      this.getProvince();
    } else if (window.navigator.userAgent.indexOf('Android') > 0) {
      // Android
      window.android.token_expired();
    } else {
      try {
        window.webkit.messageHandlers.token_expired.postMessage('token_expired');
      } catch (error) {
        console.log(error);
      }
    }
    // for appteam methods
    window.token_expired = this.token_expired;
    window.bonus_success = this.bonus_success;
    window.bonus_failed = this.bonus_failed;
  },
  beforeDestroy() {
    window.localStorage.removeItem('JWT_TOKEN');
  },
};
</script>

<style lang="scss" scoped>
.promotionDetail {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $navy_dark;
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

    .promotionDetailForm {
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

        &__synchronize {
          color: $navy_light;
        }
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
  .promotionDetail {
    background-color: $navy_dark;

    &__header {
      border-bottom: 1px solid $navy;
      color: $origin;
    }

    &__title {
      border-bottom: 1px solid $navy;
    }
  }
}
</style>
