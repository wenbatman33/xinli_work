<template lang="pug">
  .promotionDetailForm(v-if="Promotion")
    .promotionDetailForm__main
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 优惠类型
        .promotionDetailForm__main__content.col-9.px-0 {{detail.promotion.data[0].promotionType.display}}
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 优惠奖励
        .promotionDetailForm__main__content.col-9.px-0 ¥ {{format((((detail.promotionWithdrawBetamount * 100) / 100)).toFixed(2))}}
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 提款要求
        .promotionDetailForm__main__content.col-9.px-0 流水达 ¥ {{format((((detail.promotionBonus * 100) / 100)).toFixed(2))}} 元以上
      .d-flex.mb-3
        .promotionDetailForm__main__title.col-3.pl-0 更新时间
        .promotionDetailForm__main__content.col-9.px-0 2019/05/13 13:01
      .d-flex
        .promotionDetailForm__main__title.col-3.pl-0 收货地址
        el-form.promotionDetailForm__main__content.col-9.px-0(v-model="form")
          el-form-item
            el-select.w-100(v-model="form.province" placeholder="选择省份" @change="getCity($event)")
              el-option(v-for="(item, index) in ProvinceName" :label="item.memberProvinceName" :value="item.memberProvinceId" :key="item.memberProvinceId")
          el-form-item
            el-select.w-100(v-model="form.city" placeholder="选择城市" @change="getState($event)")
              el-option(v-for="(item, index) in CityName" :label="item.memberCityName" :value="item.memberCityId" :key="item.memberCityId")
          el-form-item
            el-select.w-100(v-model="form.state" placeholder="选择区县")
              el-option(v-for="(item, index) in StateName" :label="item.memberStateName" :value="item.memberStateId" :key="item.memberStateId")
          el-form-item
            el-input.w-100(v-model="form.address" placeholder="输入详细地址")
          .promotionDetailForm__content__synchronize(@click="checked = !checked")
            i.fas.fa-check-circle.mr-2(:class="checked ? 'active' : 'inactive'")
            span 地址同步更新到个人资料
    button.promotionDetailForm__button(v-if="Promotion.promotionDetailStatus.value === 3" :class="{'disabled':!formValidate}" @click="getBonus" :disabled="!formValidate") {{ Promotion.promotionDetailStatus.display}}
    button.promotionDetailForm__button(v-else :class="Promotion.promotionDetailStatus.value === 2 ? 'waitingCheck' : 'disabled'" disabled) {{ Promotion.promotionDetailStatus.display}}
</template>

<script>
export default {
  props: ['id', 'detail'],
  data() {
    return {
      ProvinceName: [],
      CityName: [],
      StateName: [],
      form: {
        province: '',
        city: '',
        state: '',
        address: '',
      },
      checked: false,
    };
  },
  methods: {
    format(value) {
      if (!Number.isNaN(value) && value !== undefined) {
        return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
      }
      return value;
    },
    getProvince() {
      this.$store.dispatch('member/API_IndexAddress').then((res) => {
        this.ProvinceName = res.data.data;
      })
    },
    getCity(provinceId) {
      this.form.city = '';
      this.form.state = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: provinceId,
        },
      }).then((res) => {
        this.CityName = res.data.data;
      })
    },
    getState(cityId) {
      this.form.state = '';
      this.$store.dispatch('member/API_IndexAddress', {
        params: {
          province_id: this.form.province,
          city_id: cityId,
        },
      }).then((res) => {
        this.StateName = res.data.data;
      })
    },
    getBonus() {
      if (this.Promotion.promotion.data[0].promotionApplyMode[0].value === 6) {
        this.$message({ message: '已放弃的奖励', type: 'error' });
      } else {
        this.form.promotion_detail_id = this.$route.query.promotion_detail_id;
        this.$store.dispatch('promotion/API_MyPromotionBonus', this.form).then((res) => {
          this.$message({ message: '领取成功', type: 'success'});
            if (this.checked) {
              // 如果有勾選同步到地址的話
              this.$store.disabled('member/API_MemberModifyPersonal', this.form).then((result) => {
                this.$store.dispatch('member/API_MemberPersonal');
                this.$message({ message: '地址修改成功', type: 'success'});
                this.$store.dispatch('index/setCardOpen', false);
              }).catch((err) => {
                this.$message({ message: err.response.data.message, type: 'error'});
              })
            } else {
              this.$store.dispatch('index/setCardOpen', false);
            }
        }).catch((err) => {
          this.$message({ message: err.response.data.message, type: 'error'});
        })
      };
    },
  },
  computed: {
    Promotion() {
      return this.$store.state.promotion.MyPromotionDetailShow[0];
    },
    formValidate() {
      if (this.form.address === '' || this.form.province === '' || this.form.city === '' || this.form.state === '') {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getProvince();
  },
}
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

      &__synchronize {
        color: $navy_light;
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
